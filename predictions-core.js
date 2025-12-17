// predictions-core.js
// Shared prediction logic for all pages.
// Personal-catch matching + daylight-hour scoring + pressure tolerance + trend direction + cloud cover + optional wind direction.

//
// ---------- Utilities ----------
//

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

export function getApproxMoonPhase(date) {
  const lp = 2551443;
  const knownNewMoon = Date.UTC(2000, 0, 6, 18, 14);
  const diff = date.getTime() - knownNewMoon;
  let frac = ((diff / 1000) % lp) / lp;
  if (frac < 0) frac += 1;
  return frac;
}

function angleDiffDeg(a, b) {
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

// Cloud cover effect depending on daylight brightness
function cloudDelta(hourDate, cloudPct, sunrise, sunset) {
  if (typeof cloudPct !== "number") return 0;

  const h = hourDate.getHours() + hourDate.getMinutes() / 60;
  const sr = sunrise.getHours() + sunrise.getMinutes() / 60;
  const ss = sunset.getHours() + sunset.getMinutes() / 60;

  const mid = (sr + ss) / 2;
  const half = Math.max(1, (ss - sr) / 2);
  const brightness = 1 - Math.min(1, Math.abs(h - mid) / half);

  if (cloudPct < 20) return -8 * brightness;
  if (cloudPct >= 35 && cloudPct <= 85) return 5 * brightness;
  return -4 * brightness;
}

//
// ---------- Core scoring ----------
//
// forecast expects:
// { temp, windMs, pressure, pressureTrend, windDir, cloudCover, moonPhase, sunrise, sunset }
// catch expects:
// { weatherTemp, weatherWindMs, weatherPressure, moonPhase } plus optional weatherWindDirDeg
//

export function computePredictionScoreForDay(catches, forecast) {
  const usable = (catches || []).filter(c =>
    typeof c.weatherTemp === "number" &&
    typeof c.weatherWindMs === "number" &&
    typeof c.weatherPressure === "number"
  );
  if (!usable.length) return null;

  const scores = usable.map(c => {
    let penalty = 0;

    // Temperature
    const tDiff = Math.abs(c.weatherTemp - forecast.temp);
    if (tDiff > 5) penalty += (tDiff - 5) * 2;

    // Wind speed
    const wDiff = Math.abs(c.weatherWindMs - forecast.windMs);
    if (wDiff > 4) penalty += (wDiff - 4) * 3;

    // Pressure absolute (tolerance + scaling)
    const pDiff = Math.abs(c.weatherPressure - forecast.pressure);
    if (pDiff > 8) penalty += (pDiff - 8) * 1.2;

    // Pressure trend (direction aware: rising penalized more than falling rewarded)
    if (typeof forecast.pressureTrend === "number") {
      if (forecast.pressureTrend > 2.5) {
        // rapid rise (post-front) -> negative
        penalty += (forecast.pressureTrend - 2.5) * 2.4;
      } else if (forecast.pressureTrend < -2.5) {
        // falling (pre-front) -> small bonus
        penalty -= (Math.abs(forecast.pressureTrend) - 2.5) * 0.8;
      }
    }

    // Wind direction personal matching (optional)
    if (
      typeof forecast.windDir === "number" &&
      typeof c.weatherWindDirDeg === "number"
    ) {
      const d = angleDiffDeg(forecast.windDir, c.weatherWindDirDeg);
      if (d > 45) penalty += (d - 45) * 0.25;
    }

    // Moon phase (optional)
    if (typeof c.moonPhase === "number") {
      penalty += Math.abs(c.moonPhase - forecast.moonPhase) * 40;
    }

    return clamp(100 - penalty, 0, 100);
  });

  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

//
// ---------- Day helpers ----------
//

export function computeDayScoreFromForecast(data, catches, dayOffset) {
  const hourly = data?.hourly;
  const daily = data?.daily;
  if (!hourly || !daily) return null;

  const sunriseStr = daily.sunrise?.[dayOffset];
  const sunsetStr  = daily.sunset?.[dayOffset];
  if (!sunriseStr || !sunsetStr) return null;

  const sunrise = new Date(sunriseStr);
  const sunset  = new Date(sunsetStr);

  const start = new Date(sunrise);
  start.setHours(start.getHours() - 1);

  const end = new Date(sunset);
  end.setHours(end.getHours() + 1);

  const dateStr = sunriseStr.slice(0, 10);
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
        (i >= 3 &&
          typeof hourly.pressure_msl?.[i] === "number" &&
          typeof hourly.pressure_msl?.[i - 3] === "number")
          ? (hourly.pressure_msl[i] - hourly.pressure_msl[i - 3])
          : 0,
      cloudCover: hourly.cloudcover?.[i],
      moonPhase: getApproxMoonPhase(t),
      sunrise,
      sunset
    };

    let s = computePredictionScoreForDay(catches, forecast);
    if (typeof s !== "number") continue;

    s += cloudDelta(t, forecast.cloudCover, sunrise, sunset);
    scores.push(clamp(s, 0, 100));
  }

  if (!scores.length) return null;
  scores.sort((a, b) => b - a);

  // avgTopN (top 8)
  const n = Math.min(8, scores.length);
  return scores.slice(0, n).reduce((a, b) => a + b, 0) / n;
}

export function computeHotHoursFromForecast(data, catches, dayOffset = 1) {
  const hourly = data?.hourly;
  const daily = data?.daily;
  if (!hourly || !daily) return [];

  const sunriseStr = daily.sunrise?.[dayOffset];
  const sunsetStr  = daily.sunset?.[dayOffset];
  if (!sunriseStr || !sunsetStr) return [];

  const sunrise = new Date(sunriseStr);
  const sunset  = new Date(sunsetStr);

  const start = new Date(sunrise);
  start.setHours(start.getHours() - 1);

  const end = new Date(sunset);
  end.setHours(end.getHours() + 1);

  const dateStr = sunriseStr.slice(0, 10);
  const out = [];

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
        (i >= 3 &&
          typeof hourly.pressure_msl?.[i] === "number" &&
          typeof hourly.pressure_msl?.[i - 3] === "number")
          ? (hourly.pressure_msl[i] - hourly.pressure_msl[i - 3])
          : 0,
      cloudCover: hourly.cloudcover?.[i],
      moonPhase: getApproxMoonPhase(t),
      sunrise,
      sunset
    };

    let s = computePredictionScoreForDay(catches, forecast);
    if (typeof s !== "number") continue;

    s += cloudDelta(t, forecast.cloudCover, sunrise, sunset);
    out.push({ dateObj: t, score: clamp(s, 0, 100) });
  }

  return out.sort((a, b) => b.score - a.score).slice(0, 8);
}
