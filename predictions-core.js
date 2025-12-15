// predictions-core.js
// Shared prediction logic used by index.html, predictions.html, and spots-map.html.
// Pure functions only (no DOM, no i18n).

/**
 * Approximate moon phase fraction [0..1).
 * 0 = new moon, 0.5 = full moon (approx).
 */
export function getApproxMoonPhase(date) {
  const lp = 2551443; // lunar period (seconds)
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const diff = date.getTime() - knownNewMoon;
  const phase = (diff / 1000) % lp;
  let frac = phase / lp;
  if (frac < 0) frac += 1;
  return frac;
}

/**
 * Score forecast conditions against the user's historic catches (with saved weather).
 * Returns average score across usable catches, or null if none are usable.
 *
 * Pressure logic: tolerance + linear scaling 
 */
export function computePredictionScoreForDay(
  catches,
  forecastTemp,
  forecastWindMs,
  forecastPressHpa,
  forecastMoonPhase,
  options = {}
) {
  const opts = {
    tempTolC: 5,
    tempPenaltyPerC: 2,
    windTolMs: 4,
    windPenaltyPerMs: 3,
    pressTolHpa: 6,              // 6–8 recommended
    pressPenaltyPerHpa: 1.8,     // tune 0.8–2.0
    moonPenaltyFactor: 40,       // legacy behavior
    ...options
  };

  const usable = (catches || []).filter(c =>
    typeof c.weatherTemp === "number" &&
    typeof c.weatherWindMs === "number" &&
    typeof c.weatherPressure === "number"
  );
  if (!usable.length) return null;

  const scores = usable.map(c => {
    let penalty = 0;

    // Temperature
    if (typeof forecastTemp === "number") {
      const tempDiff = Math.abs(c.weatherTemp - forecastTemp);
      if (tempDiff > opts.tempTolC) penalty += (tempDiff - opts.tempTolC) * opts.tempPenaltyPerC;
    }

    // Wind
    if (typeof forecastWindMs === "number") {
      const windDiff = Math.abs(c.weatherWindMs - forecastWindMs);
      if (windDiff > opts.windTolMs) penalty += (windDiff - opts.windTolMs) * opts.windPenaltyPerMs;
    }

    // Pressure (tolerance + scaling)
    if (typeof forecastPressHpa === "number") {
      const pressDiff = Math.abs(c.weatherPressure - forecastPressHpa);
      if (pressDiff > opts.pressTolHpa) penalty += (pressDiff - opts.pressTolHpa) * opts.pressPenaltyPerHpa;
    }

    // Moon phase (if catch has moon saved)
    if (typeof c.moonPhase === "number" && typeof forecastMoonPhase === "number") {
      const moonDiff = Math.abs(c.moonPhase - forecastMoonPhase);
      penalty += moonDiff * opts.moonPenaltyFactor;
    }

    let score = 100 - penalty;
    if (score < 0) score = 0;
    if (score > 100) score = 100;
    return score;
  });

  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

/**
 * Internal: build date string YYYY-MM-DD for offset (local timezone).
 */
export function dateStrForOffset(offset) {
  const base = new Date();
  base.setDate(base.getDate() + offset);
  const yyyy = base.getFullYear();
  const mm = String(base.getMonth() + 1).padStart(2, "0");
  const dd = String(base.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Compute a day score using ALL hours between sunrise-pad and sunset+pad.
 * Requires Open-Meteo response containing:
 *   data.hourly.time, data.hourly.temperature_2m, data.hourly.wind_speed_10m, data.hourly.pressure_msl
 *   data.daily.time, data.daily.sunrise, data.daily.sunset
 *
 * mode:
 *  - "avgTopN": average of the best N hourly scores
 *  - "max": best hourly score
 */
export function computeDayScoreFromForecast(
  data,
  catches,
  dayOffset,
  {
    mode = "avgTopN",
    topN = 8,
    daylightPadHours = 1,
    scoreOptions = {}
  } = {}
) {
  const hourly = data?.hourly || {};
  const times = hourly.time || [];
  const temps = hourly.temperature_2m || [];
  const winds = hourly.wind_speed_10m || [];
  const presses = hourly.pressure_msl || [];

  const daily = data?.daily || {};
  const dailyTimes = daily.time || [];
  const sunriseArr = daily.sunrise || [];
  const sunsetArr = daily.sunset || [];

  if (!times.length || !temps.length || !winds.length || !presses.length) return null;

  const dateStr = dateStrForOffset(dayOffset);
  const dayIdx = dailyTimes.findIndex(d => d === dateStr);
  if (dayIdx === -1) return null;

  const sunriseRaw = sunriseArr[dayIdx];
  const sunsetRaw = sunsetArr[dayIdx];
  if (!sunriseRaw || !sunsetRaw) return null;

  const sunrise = new Date(sunriseRaw);
  const sunset  = new Date(sunsetRaw);

  const padMs = daylightPadHours * 60 * 60 * 1000;
  const allowedStart = new Date(sunrise.getTime() - padMs);
  const allowedEnd   = new Date(sunset.getTime() + padMs);

  const scores = [];
  for (let i = 0; i < times.length; i++) {
    if (!times[i].startsWith(dateStr)) continue;

    const dt = new Date(times[i]);
    if (dt < allowedStart || dt > allowedEnd) continue;

    const score = computePredictionScoreForDay(
      catches,
      temps[i],
      winds[i],
      presses[i],
      getApproxMoonPhase(dt),
      scoreOptions
    );

    if (typeof score === "number") scores.push(score);
  }

  if (!scores.length) return null;

  scores.sort((a, b) => b - a);
  if (mode === "max") return scores[0];

  const n = Math.max(1, Math.min(topN, scores.length));
  const top = scores.slice(0, n);
  return top.reduce((s, v) => s + v, 0) / n;
}

/**
 * Convenience: compute next 3 days (offsets 1..3) using computeDayScoreFromForecast.
 * Returns array of { offset, score }.
 */
export function computeNext3DayScores(data, catches, opts = {}) {
  const out = [];
  for (let offset = 1; offset <= 3; offset++) {
    out.push({ offset, score: computeDayScoreFromForecast(data, catches, offset, opts) });
  }
  return out;
}

/**
 * Compute top hourly "hot times" for a given dayOffset, within sunrise-pad..sunset+pad.
 * Returns array of { dateObj, score } sorted desc, limited.
 */
export function computeHotHoursFromForecast(
  data,
  catches,
  dayOffset,
  {
    limit = 5,
    daylightPadHours = 1,
    scoreOptions = {}
  } = {}
) {
  const hourly = data?.hourly || {};
  const times = hourly.time || [];
  const temps = hourly.temperature_2m || [];
  const winds = hourly.wind_speed_10m || [];
  const presses = hourly.pressure_msl || [];

  const daily = data?.daily || {};
  const dailyTimes = daily.time || [];
  const sunriseArr = daily.sunrise || [];
  const sunsetArr = daily.sunset || [];

  if (!times.length || !temps.length || !winds.length || !presses.length) return [];

  const dateStr = dateStrForOffset(dayOffset);
  const dayIdx = dailyTimes.findIndex(d => d === dateStr);
  if (dayIdx === -1) return [];

  const sunriseRaw = sunriseArr[dayIdx];
  const sunsetRaw = sunsetArr[dayIdx];
  if (!sunriseRaw || !sunsetRaw) return [];

  const sunrise = new Date(sunriseRaw);
  const sunset  = new Date(sunsetRaw);

  const padMs = daylightPadHours * 60 * 60 * 1000;
  const allowedStart = new Date(sunrise.getTime() - padMs);
  const allowedEnd   = new Date(sunset.getTime() + padMs);

  const results = [];
  for (let i = 0; i < times.length; i++) {
    if (!times[i].startsWith(dateStr)) continue;

    const dt = new Date(times[i]);
    if (dt < allowedStart || dt > allowedEnd) continue;

    const score = computePredictionScoreForDay(
      catches,
      temps[i],
      winds[i],
      presses[i],
      getApproxMoonPhase(dt),
      scoreOptions
    );
    if (typeof score === "number") results.push({ dateObj: dt, score });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
