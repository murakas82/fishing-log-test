// translations.js
// Simple EN/ET translation helper for My Fishing Log

(function () {
  const STORAGE_KEY = "fishinglog_lang";
  const THEME_KEY = "fishinglog_theme";

  const ALLOWED_THEMES = new Set(["dark", "light"]);

  function getTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored && ALLOWED_THEMES.has(stored)) return stored;
      return "dark";
    } catch (e) {
      return "dark";
    }
  }

  function setTheme(theme) {
    const t = (theme && ALLOWED_THEMES.has(theme)) ? theme : "dark";
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch (e) {
      // ignore
    }
  }

  function applyTheme(theme = getTheme()) {
    const t = (theme && ALLOWED_THEMES.has(theme)) ? theme : "dark";
    document.body.setAttribute("data-theme", t);
  }

  const TRANSLATIONS = {
    en: {
      "home.title": "My Fishing Log",
      "home.subtitle":
        "Track your catches anywhere – with login, spots, weather & predictions.",
      "home.statsTitle": "Stats",
      "home.spotsTitle": "My fishing spots",
      "home.mapView": "Map view",
      "home.addNewSpot": "Add new spot",
      "home.loadingApp": "Loading app…",
      "home.settings": "Settings",
      "home.logOut": "Log out",

      "home.statsTotalCatches": "Total catches",
      "home.biggestFish": "Biggest",
      "home.statsAverageWeight": "Average weight",

      "home.openSpot": "Open spot",
      "home.AddCatch": "Add catch",
      "home.predictions": "Predictions",
      "home.googleMaps": "Google Maps",

      "home.spotStatsNa": "No catches yet.",
      "home.noCatchesYet": "No catches yet.",
      "home.noSpotsYet": "No spots yet. Add your first fishing spot.",

      "home.weatherNow": "Weather now",
      "home.predictionNext3Days": "Prediction (next 3 days)",
      "home.loading": "loading…",
      "home.failedToLoad": "failed to load.",
      "home.locationMissing": "location missing.",
      "home.unavailable": "unavailable.",
      "home.notEnoughDataYet": "not enough data yet.",
      "home.na": "n/a",

      "home.wind": "wind",
      "home.unitCelsius": "°C",
      "home.unitMetersPerSecond": "m/s",

      "home.weekdaySun": "Sun.",
      "home.weekdayMon": "Mon.",
      "home.weekdayTue": "Tue.",
      "home.weekdayWed": "Wed.",
      "home.weekdayThu": "Thu.",
      "home.weekdayFri": "Fri.",
      "home.weekdaySat": "Sat.",

      "home.weatherClear": "Clear",
      "home.weatherMainlyClear": "Mainly clear",
      "home.weatherPartlyCloudy": "Partly cloudy",
      "home.weatherOvercast": "Overcast",
      "home.weatherDrizzle": "Drizzle",
      "home.weatherRain": "Rain",
      "home.weatherSnow": "Snow",
      "home.weatherRainShowers": "Rain showers",
      "home.weatherSnowShowers": "Snow showers",
      "home.weatherThunderstorm": "Thunderstorm",
      "home.weatherThunderstormHail": "Thunderstorm with hail",
      "home.weatherUnknown": "Unknown",

      "auth.title": "Log in or sign up",
      "auth.emailPlaceholder": "Email",
      "auth.passwordPlaceholder": "Password",
      "auth.logIn": "Log in",
      "auth.signUp": "Sign up",
      "auth.or": "or",
      "auth.continueWithGoogle": "Continue with Google",

      "auth.loginFailedPrefix": "Login failed:",
      "auth.signUpFailedPrefix": "Sign up failed:",
      "auth.googleFailedPrefix": "Google sign-in failed:",
      "auth.enterEmailPassword": "Enter email & password, then press Sign up.",

      "spotsMap.title": "My fishing spots – map",
      "spotsMap.subtitle":
        "See all your spots on an interactive map with live weather & predictions.",
      "spotsMap.overview": "Spots overview",
      "spotsMap.legendDescription":
        "• Marker color (tomorrow): ● good (≥70%), ● medium (40–69%), ● poor (<40%).\n• Popup shows live weather now and predictions for the next 3 days.",

      "common.backToMain": "← Back to main",
      "common.backToMainPage": "Back to main page",
      "common.loggedInAs": "Logged in as …",
      "common.useMyLocation": "Use my location",
      "common.loading": "Loading…",
      "common.loadingSpot": "Loading spot…",

      "pred.title": "Predictions",
      "pred.subtitle": "Forecast match vs your past catches at this spot.",
      "pred.loadingSpot": "Loading spot…",
      "pred.fetchingData": "Fetching data…",
      "pred.next3Days": "Next 3 days",
      "pred.hotTimesTomorrow": "Hot times tomorrow",
      "pred.hotTimesExplain":
        "Times are between 1 hour before sunrise and 1 hour after sunset, based on your catches with weather data.",

      "settings.title": "Settings",
      "settings.subtitle": "Personalize how your name appears in the app.",
      "settings.displayNameLabel": "Display name",
      "settings.displayNamePlaceholder": "What should the app call you?",
      "settings.saveButton": "Save settings",
      "settings.saved": "Settings saved.",
      "settings.saveFailed": "Failed to save settings.",

      "settings.languageLabel": "Language",
      "settings.languageDescription":
        "Choose the language for the app. This setting is saved on this device.",
      "settings.languageEnglish": "English",
      "settings.languageEstonian": "Estonian",
      "settings.languageSaved": "Language preference saved.",

      "settings.themeLabel": "Theme",
      "settings.themeDescription": "Choose light or dark mode. This setting is saved on this device.",
      "settings.themeDark": "Dark",
      "settings.themeLight": "Light",
      "settings.themeSaved": "Theme preference saved.",
    },

    et: {
      "home.title": "Minu kalapüügipäevik",
      "home.subtitle":
        "Jälgi oma püütud kalu igal pool – koos sisselogimise, püügikohtade, ilma ja ennustustega.",
      "home.statsTitle": "Statistika",
      "home.spotsTitle": "Minu püügikohad",
      "home.mapView": "Kaardivaade",
      "home.addNewSpot": "Lisa uus püügikoht",
      "home.loadingApp": "Rakendus laadib…",
      "home.settings": "Seaded",
      "home.logOut": "Logi välja",

      "home.statsTotalCatches": "Püütud kalad",
      "home.biggestFish": "Suurim",
      "home.statsAverageWeight": "Keskmine kaal",

      "home.openSpot": "Ava koht",
      "home.AddCatch": "Lisa kala",
      "home.predictions": "Ennustused",
      "home.googleMaps": "Google Maps",

      "home.spotStatsNa": "Püütud kalad puuduvad",
      "home.noCatchesYet": "Püütud kalad puuduvad",
      "home.noSpotsYet": "Püügikohti veel pole. Lisa oma esimene püügikoht.",

      "home.weatherNow": "Ilm praegu",
      "home.predictionNext3Days": "Prognoos (järgmised 3 päeva)",
      "home.loading": "laadimine…",
      "home.failedToLoad": "laadimine ebaõnnestus.",
      "home.locationMissing": "asukoht puudub.",
      "home.unavailable": "pole saadaval.",
      "home.notEnoughDataYet": "andmeid pole veel piisavalt.",
      "home.na": "puudub",

      "home.wind": "tuul",
      "home.unitCelsius": "°C",
      "home.unitMetersPerSecond": "m/s",

      "home.weekdaySun": "P",
      "home.weekdayMon": "E",
      "home.weekdayTue": "T",
      "home.weekdayWed": "K",
      "home.weekdayThu": "N",
      "home.weekdayFri": "R",
      "home.weekdaySat": "L",

      "home.weatherClear": "Selge",
      "home.weatherMainlyClear": "Peamiselt selge",
      "home.weatherPartlyCloudy": "Vahelduv pilvisus",
      "home.weatherOvercast": "Pilves",
      "home.weatherDrizzle": "Uduvihm",
      "home.weatherRain": "Vihm",
      "home.weatherSnow": "Lumi",
      "home.weatherRainShowers": "Vihmahood",
      "home.weatherSnowShowers": "Lumehood",
      "home.weatherThunderstorm": "Äike",
      "home.weatherThunderstormHail": "Äike rahega",
      "home.weatherUnknown": "Teadmata",

      "auth.title": "Logi sisse või loo konto",
      "auth.emailPlaceholder": "E-post",
      "auth.passwordPlaceholder": "Parool",
      "auth.logIn": "Logi sisse",
      "auth.signUp": "Loo konto",
      "auth.or": "või",
      "auth.continueWithGoogle": "Jätka Google’iga",

      "auth.loginFailedPrefix": "Sisselogimine ebaõnnestus:",
      "auth.signUpFailedPrefix": "Konto loomine ebaõnnestus:",
      "auth.googleFailedPrefix": "Google’i sisselogimine ebaõnnestus:",
      "auth.enterEmailPassword": "Sisesta e-post ja parool ning vajuta „Loo konto“.",

      "spotsMap.title": "Minu püügikohad – kaart",
      "spotsMap.subtitle":
        "Vaata kõiki oma püügikohti interaktiivsel kaardil koos ilma ja ennustustega.",
      "spotsMap.overview": "Kohtade ülevaade",
      "spotsMap.legendDescription":
        "• Markeri värv (homne päev): ● hea (≥70%), ● keskmine (40–69%), ● nõrk (<40%).\n• Hüpikaken näitab hetke ilma ja ennustusi järgmiseks 3 päevaks.",

      "common.backToMain": "← Tagasi avalehele",
      "common.backToMainPage": "Tagasi avalehele",
      "common.loggedInAs": "Kasutaja: ",
      "common.useMyLocation": "Kasuta minu asukohta",
      "common.loading": "Laadimine…",
      "common.loadingSpot": "Koha laadimine…",

      "pred.title": "Ennustused",
      "pred.subtitle":
        "Ilmaprognoosi sobivus sinu varasemate selle koha püütud kaladega.",
      "pred.loadingSpot": "Koha laadimine…",
      "pred.fetchingData": "Andmete toomine…",
      "pred.next3Days": "Järgmised 3 päeva",
      "pred.hotTimesTomorrow": "Parimad ajad homseks",
      "pred.hotTimesExplain":
        "Ajad on vahemikus tund enne päikesetõusu kuni tund pärast päikeseloojangut, põhinedes sinu ilmaandmetega kaladel.",

      "settings.title": "Seaded",
      "settings.subtitle":
        "Kohanda, kuidas sinu nimi rakenduses kuvatakse.",
      "settings.displayNameLabel": "Kuvatav nimi",
      "settings.displayNamePlaceholder":
        "Kuidas rakendus peaks sind kutsuma?",
      "settings.saveButton": "Salvesta seaded",
      "settings.saved": "Seaded on salvestatud.",
      "settings.saveFailed": "Seadete salvestamine ebaõnnestus.",

      "settings.languageLabel": "Keel",
      "settings.languageDescription":
        "Vali rakenduse keel. See eelistus salvestatakse sellesse seadmesse.",
      "settings.languageEnglish": "Inglise keel",
      "settings.languageEstonian": "Eesti keel",
      "settings.languageSaved": "Keele-eelistus on salvestatud.",

      "settings.themeLabel": "Teema",
      "settings.themeDescription": "Vali hele või tume režiim. See seadistus salvestatakse sellesse seadmesse.",
      "settings.themeDark": "Tume",
      "settings.themeLight": "Hele",
      "settings.themeSaved": "Teema eelistus salvestatud.",
    },
  };

  function detectInitialLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && TRANSLATIONS[stored]) return stored;
    } catch (e) {}

    const navLang = (navigator.language || navigator.userLanguage || "en")
      .slice(0, 2)
      .toLowerCase();
    if (TRANSLATIONS[navLang]) return navLang;

    return "en";
  }

  function getCurrentLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && TRANSLATIONS[stored]) return stored;
    } catch (e) {}
    return detectInitialLang();
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function applyTranslations() {
    const lang = getCurrentLang();
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = dict[key];
      if (!value) return;

      if (value.indexOf("\n") >= 0) {
        el.innerHTML = "";
        value.split("\n").forEach((line, idx) => {
          if (idx > 0) el.appendChild(document.createElement("br"));
          el.appendChild(document.createTextNode(line));
        });
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = dict[key];
      if (value) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      const value = dict[key];
      if (value) el.setAttribute("title", value);
    });
  }

  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    saveLang(lang);
    applyTranslations();
  }

  // Apply saved theme ASAP (so there is no flash)
  try { applyTheme(); } catch (e) {}

  window.fishingLogTheme = { getTheme, setTheme, applyTheme };

  window.fishingLogI18n = {
    getCurrentLang,
    setLanguage,
    applyTranslations,
    getLanguage() { return getCurrentLang(); },
    t(key) {
      const lang = getCurrentLang();
      const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return dict[key] || key;
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTranslations);
  } else {
    applyTranslations();
  }
})();
