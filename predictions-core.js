// predictions-core.js
// Shared prediction logic for all pages.
// Focus: personal catch matching + pressure trend + wind direction + cloud cover.

//
// ---------- Utilities ----------
//

export function getApproxMoonPhase(date) {
  const lp = 2551443; // lunar period (seconds)
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const diff = date.getTime() - knownNewMoon;
  let frac = ((diff / 1000) % lp) / lp;
  if (frac < 0) frac += 1;
  return frac;
}

export function dateStrForOffset(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Smallest angle between two directions (degrees)
function angularDiffDeg(a, b) {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

//
// ---------- Core scoring ----------
//

export function computePredictionScoreForDay(
  catches,
  forecast,
  options = {}
) {
  const opts = {
    tempTolC: 5,
    tempPenaltyPerC: 2,

    windTolMs: 4,
    windPenaltyPerMs: 3,

    pressTolHpa: 8,
    pressPenaltyPerHpa: 1.2,

    pressTrendTolHpa: 3,
    pressTrendPenaltyPerHpa: 2.0,

    windDirTolDeg: 45,
    windDirPenaltyPerDeg: 0.25,

    cloudPrefWeight: 12, // how strongly cloud cover affects score

    moonPenaltyFactor: 40,

    ...options
  };

  const usable = catches.filter(c =>
    typeof c.weatherTemp === "number" &&
    typeof c.weatherWindMs === "number" &&
    typeof c.weatherPressure === "number"
  );
  if (!usable.length) return null;

  const scores = usable.map(c => {
    let penalty = 0;

    // --- Temperature ---
    if (typeof forecast.temp === "number") {
      const diff = Math.abs(c.weatherTemp - forecast.temp);
      if (diff > opts.tempTolC) penalty += (diff - opts.tempTolC) * opts.tempPenaltyPerC;
    }

    // --- Wind speed ---
    if (typeof forecast.windMs === "number") {
      const diff = Math.abs(c.weatherWindMs - forecast.windMs);
      if (diff > opts.windTolMs) penalty += (diff - opts.windTolMs) * opts.windPenaltyPerMs;
    }

    // --- Pressure absolute ---
    if (typeof forecast.pressure === "number") {
      const diff = Math.abs(c.weatherPressure - forecast.pressure);
      if (diff > opts.pressTolHpa) {
        penalty += (diff - opts.pressTolHpa) * opts.pressPenaltyPerHpa;
      }
    }

    // --- Pressure trend (NEW) ---
    if (
      typeof c.weatherPressure === "number" &&
      typeof forecast.pressureTrend === "number"
    ) {
      const diff = Math.abs(forecast.pressureTrend);
      if (diff > opts.pressTrendTolHpa) {
        penalty += (diff - opts.pressTrendTolHpa) * opts.pressTrendPenaltyPerHpa;
      }
    }

    // --- Wind direction relative to spot (NEW) ---
    if (
      typeof forecast.windDir === "number" &&
      typeof forecast.spotBearing === "number"
    ) {
      const relDiff = angularDiffDeg(
        forecast.windDir,
        forecast.spotBearing
      );
      if (relDiff > opts.windDirTolDeg) {
        penalty += (relDiff - opts.windDirTolDeg) * opts.windDirPenaltyPerDeg;
      }
    }

    // --- Cloud cover / light conditions (NEW) ---
    if (typeof forecast.cloudCover === "number") {
      // Mid–high cloud is often good; extremes less so
      const cloud = forecast.cloudCover;
      if (cloud < 15) penalty += (15 - cloud) * 0.3;
      if (cloud > 85) penalty += (cloud - 85) * 0.3;
    }

    // --- Moon ---
    if (
      typeof c.moonPhase === "number" &&
      typeof forecast.moonPhase === "number"
    ) {
      const diff = Math.abs(c.moonPhase - forecast.moonPhase);
      penalty += diff * opts.moonPenaltyFactor;
    }

    let score = 100 - penalty;
    if (score < 0) score = 0;
    if (score > 100) score = 100;
    return score;
  });

  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

//
// ---------- Daylight window aggregation ----------
//

export function computeDayScoreFromForecast(
  data,
  catches,
  dayOffset,
  {
    mode = "avgTopN",
    topN = 8,
    daylightPadHours = 1,
    spotBearing = null,
    scoreOptions = {}
  } = {}
) {
  const hourly = data.hourly;
  const daily = data.daily;
  if (!hourly || !daily) return null;

  const dateStr = dateStrForOffset(dayOffset);
  const dayIdx = daily.time.findIndex(d => d === dateStr);
  if (dayIdx === -1) return null;

  const sunrise = new Date(daily.sunrise[dayIdx]);
  const sunset = new Date(daily.sunset[dayIdx]);
  const padMs = daylightPadHours * 3600000;

  const start = new Date(sunrise.getTime() - padMs);
  const end = new Date(sunset.getTime() + padMs);

  const scores = [];

  for (let i = 0; i < hourly.time.length; i++) {
    if (!hourly.time[i].startsWith(dateStr)) continue;

    const t = new Date(hourly.time[i]);
    if (t < start || t > end) continue;

    const forecast = {
      temp: hourly.temperature_2m[i],
      windMs: hourly.wind_speed_10m[i],
      windDir: hourly.wind_direction_10m?.[i],
      pressure: hourly.pressure_msl[i],
      pressureTrend:
        i >= 3
          ? hourly.pressure_msl[i] - hourly.pressure_msl[i - 3]
          : 0,
      cloudCover: hourly.cloudcover?.[i],
      moonPhase: getApproxMoonPhase(t),
      spotBearing
    };

    const s = computePredictionScoreForDay(catches, forecast, scoreOptions);
    if (typeof s === "number") scores.push(s);
  }

  if (!scores.length) return null;

  scores.sort((a, b) => b - a);

  if (mode === "max") return scores[0];

  const n = Math.min(topN, scores.length);
  return scores.slice(0, n).reduce((a, b) => a + b, 0) / n;
}

export function computeNext3DayScores(data, catches, opts = {}) {
  return [1, 2, 3].map(offset => ({
    offset,
    score: computeDayScoreFromForecast(data, catches, offset, opts)
  }));
}

export function computeHotHoursFromForecast(
  data,
  catches,
  dayOffset,
  {
    limit = 5,
    daylightPadHours = 1,
    spotBearing = null,
    scoreOptions = {}
  } = {}
) {
  const hourly = data.hourly;
  const daily = data.daily;
  if (!hourly || !daily) return [];

  const dateStr = dateStrForOffset(dayOffset);
  const dayIdx = daily.time.findIndex(d => d === dateStr);
  if (dayIdx === -1) return [];

  const sunrise = new Date(daily.sunrise[dayIdx]);
  const sunset = new Date(daily.sunset[dayIdx]);
  const padMs = daylightPadHours * 3600000;

  const start = new Date(sunrise.getTime() - padMs);
  const end = new Date(sunset.getTime() + padMs);

  const results = [];

  for (let i = 0; i < hourly.time.length; i++) {
    if (!hourly.time[i].startsWith(dateStr)) continue;

    const t = new Date(hourly.time[i]);
    if (t < start || t > end) continue;

    const forecast = {
      temp: hourly.temperature_2m[i],
      windMs: hourly.wind_speed_10m[i],
      windDir: hourly.wind_direction_10m?.[i],
      pressure: hourly.pressure_msl[i],
      pressureTrend:
        i >= 3
          ? hourly.pressure_msl[i] - hourly.pressure_msl[i - 3]
          : 0,
      cloudCover: hourly.cloudcover?.[i],
      moonPhase: getApproxMoonPhase(t),
      spotBearing
    };

    const s = computePredictionScoreForDay(catches, forecast, scoreOptions);
    if (typeof s === "number") results.push({ dateObj: t, score: s });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
