// predictions-core.js
// Shared prediction logic for all pages.
// Personal-catch matching + daylight-hour scoring + pressure tolerance + trend direction + (optional) wind direction + cloud cover heuristics.

//
// ---------- Utilities ----------
//

export function getApproxMoonPhase(date) {
  const lp = 2551443; // lunar period (seconds)
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const diff = date.getTime() - knownNewMoon;
  let frac = ((diff / 1000) % lp) / lp;
  if (frac < 0) frac += 1;
  return frac; // 0..1
}

export function dateStrForOffset(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

// Smallest difference between two angles in degrees (0..180)
function angleDiffDeg(a, b) {
  if (typeof a !== "number" || typeof b !== "number") return null;
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

// Cloud cover helps most during bright mid-day; neutral near dawn/dusk.
// Returns score delta (can be negative).
function cloudLightDelta(localDate, cloudCoverPct, sunrise, sunset, opts) {
  if (typeof cloudCoverPct !== "number" || !localDate || !sunrise || !sunset) return 0;

  const hour = localDate.getHours() + localDate.getMinutes() / 60;
  const sr = sunrise.getHours() + sunrise.getMinutes() / 60;
  const ss = sunset.getHours() + sunset.getMinutes() / 60;

  // Brightness: 0 near sunrise/sunset, 1 near mid-day.
  const mid = (sr + ss) / 2;
  const half = Math.max(1, (ss - sr) / 2);
  const brightness = 1 - Math.min(1, Math.abs(hour - mid) / half);

  // Target cloud: ~60% mid-day
  const target = 60;
  const diff = Math.abs(cloudCoverPct - target);
  const normalized = clamp(diff / 60, 0, 1);
  const penalty = normalized * brightness;

  let delta = 0;
  if (cloudCoverPct < 20) {
    delta -= opts.cloudClearPenalty * brightness;       // strongest negative
  } else if (cloudCoverPct >= 35 && cloudCoverPct <= 85) {
    delta += opts.cloudComfortBonus * brightness;       // strongest positive
  } else {
    delta -= opts.cloudAwayFromTargetPenalty * penalty; // mild negative
  }

  return delta;
}

//
// ---------- Core scoring ----------
//
// forecast expects:
// { temp, windMs, pressure, pressureTrend, windDir, cloudCover, moonPhase, spotBearing, sunrise, sunset, time }
//
// catch expects (your Firestore catchDoc already has these):
// { weatherTemp, weatherWindMs, weatherPressure, moonPhase } plus optional weatherWindDirDeg
//

export function computePredictionScoreForDay(catches, forecast, options = {}) {
  const opts = {
    // Temperature matching
    tempTolC: 5,
    tempPenaltyPerC: 2,

    // Wind speed matching
    windTolMs: 4,
    windPenaltyPerMs: 3,

    // Pressure absolute: tolerance 6–8 hPa with scaling
    pressTolHpa: 8,
    pressPenaltyPerHpa: 1.2,

    // Pressure trend (3h delta). Asymmetric:
    // Falling pressure -> small bonus; rapid rise -> stronger penalty
    pressFallTolHpa: 2.5,
    pressFallBonusPerHpa: 0.8,
    pressRiseTolHpa: 2.5,
    pressRisePenaltyPerHpa: 2.4,

    // Wind direction support (optional)
    windDirTolDeg: 45,
    windDirPenaltyPerDeg: 0.25,
    onshoreBonusMax: 6, // only used if spotBearing is provided

    // Moon phase (optional)
    moonPenaltyFactor: 40,

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

    // --- Pressure absolute (tolerance + scaling) ---
    if (typeof forecast.pressure === "number") {
      const diff = Math.abs(c.weatherPressure - forecast.pressure);
      if (diff > opts.pressTolHpa) penalty += (diff - opts.pressTolHpa) * opts.pressPenaltyPerHpa;
    }

    // --- Pressure trend (direction-aware) ---
    if (typeof forecast.pressureTrend === "number") {
      const tr = forecast.pressureTrend; // positive=rising, negative=falling
      if (tr >= 0) {
        if (tr > opts.pressRiseTolHpa) penalty += (tr - opts.pressRiseTolHpa) * opts.pressRisePenaltyPerHpa;
      } else {
        const fall = Math.abs(tr);
        if (fall > opts.pressFallTolHpa) penalty -= (fall - opts.pressFallTolHpa) * opts.pressFallBonusPerHpa;
      }
    }

    // --- Wind direction (optional, two paths) ---
    // 1) Personal matching if catch has weatherWindDirDeg
    if (typeof forecast.windDir === "number" && typeof c.weatherWindDirDeg === "number") {
      const d = angleDiffDeg(c.weatherWindDirDeg, forecast.windDir);
      if (d != null && d > opts.windDirTolDeg) penalty += (d - opts.windDirTolDeg) * opts.windDirPenaltyPerDeg;
    } else if (typeof forecast.windDir === "number" && typeof forecast.spotBearing === "number") {
      // 2) Heuristic: onshore wind can help (bait pushed toward structure)
      // spotBearing = direction from spot toward open water (optional field you can add later)
      const onshoreDir = (forecast.spotBearing + 180) % 360; // wind "from" open water
      const d = angleDiffDeg(forecast.windDir, onshoreDir);
      if (d != null) {
        const onshoreStrength = clamp((90 - d) / 90, 0, 1);
        penalty -= onshoreStrength * opts.onshoreBonusMax;
      }
    }

    // --- Moon phase (optional) ---
    if (typeof c.moonPhase === "number" && typeof forecast.moonPhase === "number") {
      const diff = Math.abs(c.moonPhase - forecast.moonPhase);
      penalty += diff * opts.moonPenaltyFactor;
    }

    return clamp(100 - penalty, 0, 100);
  });

  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

//
// ---------- Day & multi-day helpers ----------
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
  const hourly = data?.hourly;
  const daily = data?.daily;
  if (!hourly || !daily) return null;

  const dateStr = dateStrForOffset(dayOffset);
  const sunriseStr = daily.sunrise?.[dayOffset] || daily.sunrise?.[0];
  const sunsetStr = daily.sunset?.[dayOffset] || daily.sunset?.[0];
  if (!sunriseStr || !sunsetStr) return null;

  const sunrise = new Date(sunriseStr);
  const sunset = new Date(sunsetStr);

  const start = new Date(sunrise);
  start.setHours(start.getHours() - daylightPadHours);

  const end = new Date(sunset);
  end.setHours(end.getHours() + daylightPadHours);

  const scores = [];

  for (let i = 0; i < hourly.time.length; i++) {
    if (!hourly.time[i].startsWith(dateStr)) continue;

    const t = new Date(hourly.time[i]);
    if (t < start || t > end) continue;

    const forecast = {
      temp: hourly.temperature_2m?.[i],
      windMs: hourly.wind_speed_10m?.[i],
      windDir: hourly.wind_direction_10m?.[i],
      pressure: hourly.pressure_msl?.[i],
      pressureTrend:
        (i >= 3 && typeof hourly.pressure_msl?.[i] === "number" && typeof hourly.pressure_msl?.[i - 3] === "number")
          ? (hourly.pressure_msl[i] - hourly.pressure_msl[i - 3])
          : 0,
      cloudCover: hourly.cloudcover?.[i],
      moonPhase: getApproxMoonPhase(t),
      spotBearing,
      sunrise,
      sunset,
      time: t
    };

    let s = computePredictionScoreForDay(catches, forecast, scoreOptions);
    if (typeof s !== "number") continue;

    // Cloud cover factor (light conditions)
    const delta = cloudLightDelta(t, forecast.cloudCover, sunrise, sunset, {
      cloudClearPenalty: 8,
      cloudComfortBonus: 5,
      cloudAwayFromTargetPenalty: 4
    });

    scores.push(clamp(s + delta, 0, 100));
  }

  if (!scores.length) return null;

  scores.sort((a, b) => b - a);
  if (mode === "max") return scores[0];

  const n = Math.min(topN, scores.length);
  return scores.slice(0, n).reduce((a, b) => a + b, 0) / n;
}

export function computeNext3DayScores(
  catches,
  data,
  { mode = "avgTopN", topN = 8, daylightPadHours = 1, spotBearing = null, scoreOptions = {} } = {}
) {
  const out = [];
  for (let offset = 1; offset <= 3; offset++) {
    const s = computeDayScoreFromForecast(data, catches, offset, { mode, topN, daylightPadHours, spotBearing, scoreOptions });
    const d = new Date();
    d.setDate(d.getDate() + offset);
    if (typeof s === "number") out.push({ dateObj: d, score: s });
  }
  return out;
}

export function computeHotHoursFromForecast(
  data,
  catches,
  dayOffset = 1,
  { limit = 8, daylightPadHours = 1, spotBearing = null, scoreOptions = {} } = {}
) {
  const hourly = data?.hourly;
  const daily = data?.daily;
  if (!hourly || !daily) return [];

  const dateStr = dateStrForOffset(dayOffset);
  const sunriseStr = daily.sunrise?.[dayOffset] || daily.sunrise?.[0];
  const sunsetStr = daily.sunset?.[dayOffset] || daily.sunset?.[0];
  if (!sunriseStr || !sunsetStr) return [];

  const sunrise = new Date(sunriseStr);
  const sunset = new Date(sunsetStr);

  const start = new Date(sunrise);
  start.setHours(start.getHours() - daylightPadHours);

  const end = new Date(sunset);
  end.setHours(end.getHours() + daylightPadHours);

  const results = [];

  for (let i = 0; i < hourly.time.length; i++) {
    if (!hourly.time[i].startsWith(dateStr)) continue;

    const t = new Date(hourly.time[i]);
    if (t < start || t > end) continue;

    const forecast = {
      temp: hourly.temperature_2m?.[i],
      windMs: hourly.wind_speed_10m?.[i],
      windDir: hourly.wind_direction_10m?.[i],
      pressure: hourly.pressure_msl?.[i],
      pressureTrend:
        (i >= 3 && typeof hourly.pressure_msl?.[i] === "number" && typeof hourly.pressure_msl?.[i - 3] === "number")
          ? (hourly.pressure_msl[i] - hourly.pressure_msl[i - 3])
          : 0,
      cloudCover: hourly.cloudcover?.[i],
      moonPhase: getApproxMoonPhase(t),
      spotBearing,
      sunrise,
      sunset,
      time: t
    };

    let s = computePredictionScoreForDay(catches, forecast, scoreOptions);
    if (typeof s !== "number") continue;

    const delta = cloudLightDelta(t, forecast.cloudCover, sunrise, sunset, {
      cloudClearPenalty: 8,
      cloudComfortBonus: 5,
      cloudAwayFromTargetPenalty: 4
    });

    results.push({ dateObj: t, score: clamp(s + delta, 0, 100) });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}
