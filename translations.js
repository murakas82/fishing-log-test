// translations.js
// Simple EN/ET translation helper for My Fishing Log

(function () {
  const STORAGE_KEY = "fishinglog_lang";

  // Translation dictionary
  const TRANSLATIONS = {
    en: {
      // Home / index.html
      "home.title": "My Fishing Log",
      "home.subtitle":
        "Track your catches anywhere – with login, spots, weather & predictions.",
      "home.statsTitle": "Stats",
      "home.spotsTitle": "My fishing spots",
      "home.mapView": "Map view",
      "home.addNewSpot": "Add new spot",
      "home.loadingApp": "Loading app…",
      "home.settings": "Settings",
      "home.logOut": "Log Out",

      // Common
      "common.backToMain": "← Back to main",
      "common.backToMainPage": "Back to main page",
      "common.loggedInAs": "Logged in as …",
      "common.useMyLocation": "Use my location",
      "common.loading": "Loading…",
      "common.loadingSpot": "Loading spot…",

      // Add catch
      "catch.title": "Add catch",
      "catch.subtitle": "Log a new catch with spot, weight, weather & notes.",
      "catch.speciesLabel": "Species",
      "catch.weightLabel": "Weight (kg)",
      "catch.spotLabel": "Fishing spot (required)",
      "catch.lureLabel": "Lure",
      "catch.depthLabel": "Water depth (m)",
      "catch.waterTempLabel": "Water temperature (°C)",
      "catch.latLabel": "Latitude (auto from spot or GPS)",
      "catch.lonLabel": "Longitude (auto from spot or GPS)",
      "catch.weatherNowLabel": "Weather now:",
      "catch.weatherNotLoaded": "(not loaded yet)",
      "catch.notesLabel": "Notes",
      "catch.saveButton": "Save catch",

      // Catches list
      "catches.title": "Your Catches",
      "catches.subtitle": "All catches for your account.",
      "catches.needLogin": "You need to be logged in to see your catches.",
      "catches.back": "Back to main page",
      "catches.loading": "Loading catches…",

      // Add spot
      "spotAdd.title": "Add a fishing spot",
      "spotAdd.subtitle": "Save a named spot with GPS coordinates.",
      "spotAdd.nameLabel": "Spot name",
      "spotAdd.latLabel": "Latitude",
      "spotAdd.lonLabel": "Longitude",
      "spotAdd.saveButton": "Save fishing spot",

      // Edit spot
      "spotEdit.title": "Edit fishing spot",
      "spotEdit.subtitle": "Change the name and GPS coordinates of this spot.",
      "spotEdit.saveButton": "Save changes",

      // Single spot page
      "spotPage.title": "Fishing spot",
      "spotPage.subtitle": "See details and catches for this spot.",
      "spotPage.addCatch": "Add catch",
      "spotPage.predictions": "Predictions",
      "spotPage.edit": "Edit",
      "spotPage.delete": "Delete spot",
      "spotPage.catchesTitle": "Catches at this spot",
      "spotPage.loading": "Loading…",

      // Spots map
      "spotsMap.title": "My fishing spots – map",
      "spotsMap.subtitle":
        "See all your spots on an interactive map with live weather & predictions.",
      "spotsMap.overview": "Spots overview",
      "spotsMap.legendDescription":
        "• Marker color (tomorrow): ● good (≥70%), ● medium (40–69%), ● poor (<40%).\n• Popup shows live weather now and predictions for the next 3 days.",

      // Predictions
      "pred.title": "Predictions",
      "pred.subtitle": "Forecast match vs your past catches at this spot.",
      "pred.loadingSpot": "Loading spot…",
      "pred.fetchingData": "Fetching data…",
      "pred.next3Days": "Next 3 days",
      "pred.hotTimesTomorrow": "Hot times tomorrow",
      "pred.hotTimesExplain":
        "Times are between 1 hour before sunrise and 1 hour after sunset, based on your catches with weather data.",
      "pred.debugTitle": "Debug view (why these scores?)",

      // Settings
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

      // Privacy
      "privacy.title": "Privacy Policy",
      "privacy.subtitle": "How this fishing log app handles your data.",

      // Cookie banner
      "cookie.text":
        "This app uses essential cookies and local storage for secure login and basic functionality.",
      "cookie.noAds": "No advertising or tracking cookies are used.",
      "cookie.policyLinkText": "privacy policy",
      "cookie.ok": "OK",
      "cookie.later": "Later",
    },

    et: {
      // Home / index.html
      "home.title": "Minu kalapüügipäevik",
      "home.subtitle":
        "Jälgi oma saake igal pool – koos sisselogimise, püügikohtade, ilma ja ennustustega.",
      "home.statsTitle": "Statistika",
      "home.spotsTitle": "Minu püügikohad",
      "home.mapView": "Kaardivaade",
      "home.addNewSpot": "Lisa uus püügikoht",
      "home.loadingApp": "Rakendus laadib…",
      "home.settings": "Seaded",
      "home.logOut": "Seaded",

      // Common
      "common.backToMain": "← Tagasi avalehele",
      "common.backToMainPage": "Tagasi avalehele",
      "common.loggedInAs": "Sisse logitud kui …",
      "common.useMyLocation": "Kasuta minu asukohta",
      "common.loading": "Laadimine…",
      "common.loadingSpot": "Koha laadimine…",

      // Add catch
      "catch.title": "Lisa saak",
      "catch.subtitle":
        "Salvesta uus saak koos püügikoha, kaalu, ilma ja märkmetega.",
      "catch.speciesLabel": "Kalaliik",
      "catch.weightLabel": "Kaal (kg)",
      "catch.spotLabel": "Püügikoht (kohustuslik)",
      "catch.lureLabel": "Lant",
      "catch.depthLabel": "Sügavus (m)",
      "catch.waterTempLabel": "Veetemperatuur (°C)",
      "catch.latLabel": "Laiuskraad (automaatselt kohast või GPS-ist)",
      "catch.lonLabel": "Pikkuskraad (automaatselt kohast või GPS-ist)",
      "catch.weatherNowLabel": "Praegune ilm:",
      "catch.weatherNotLoaded": "(pole veel laaditud)",
      "catch.notesLabel": "Märkmed",
      "catch.saveButton": "Salvesta saak",

      // Catches list
      "catches.title": "Sinu saagid",
      "catches.subtitle": "Kõik sinu konto saagid.",
      "catches.needLogin": "Saagide nägemiseks pead olema sisse loginud.",
      "catches.back": "Tagasi avalehele",
      "catches.loading": "Saakide laadimine…",

      // Add spot
      "spotAdd.title": "Lisa püügikoht",
      "spotAdd.subtitle": "Salvesta nimega püügikoht koos GPS-koordinaatidega.",
      "spotAdd.nameLabel": "Koha nimi",
      "spotAdd.latLabel": "Laiuskraad",
      "spotAdd.lonLabel": "Pikkuskraad",
      "spotAdd.saveButton": "Salvesta püügikoht",

      // Edit spot
      "spotEdit.title": "Muuda püügikohta",
      "spotEdit.subtitle": "Muuda selle koha nime ja GPS-koordinaate.",
      "spotEdit.saveButton": "Salvesta muudatused",

      // Single spot page
      "spotPage.title": "Püügikoht",
      "spotPage.subtitle": "Vaata selle koha andmeid ja saake.",
      "spotPage.addCatch": "Lisa saak",
      "spotPage.predictions": "Ennustused",
      "spotPage.edit": "Muuda",
      "spotPage.delete": "Kustuta koht",
      "spotPage.catchesTitle": "Selle koha saagid",
      "spotPage.loading": "Laadimine…",

      // Spots map
      "spotsMap.title": "Minu püügikohad – kaart",
      "spotsMap.subtitle":
        "Vaata kõiki oma püügikohti interaktiivsel kaardil koos ilma ja ennustustega.",
      "spotsMap.overview": "Kohtade ülevaade",
      "spotsMap.legendDescription":
        "• Markeri värv (homne päev): ● hea (≥70%), ● keskmine (40–69%), ● nõrk (<40%).\n• Hüpikaken näitab hetke ilma ja ennustusi järgmiseks 3 päevaks.",

      // Predictions
      "pred.title": "Ennustused",
      "pred.subtitle":
        "Ilmaprognoosi sobivus sinu varasemate selle koha saakidega.",
      "pred.loadingSpot": "Koha laadimine…",
      "pred.fetchingData": "Andmete toomine…",
      "pred.next3Days": "Järgmised 3 päeva",
      "pred.hotTimesTomorrow": "Parimad ajad homseks",
      "pred.hotTimesExplain":
        "Ajad on vahemikus tund enne päikesetõusu kuni tund pärast päikeseloojangut, põhinedes sinu ilmaandmetega saakidel.",
      "pred.debugTitle": "Silumisvaade (miks sellised skoorid?)",

      // Settings
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

      // Privacy
      "privacy.title": "Privaatsuspoliitika",
      "privacy.subtitle":
        "Kuidas see kalapüügipäeviku rakendus sinu andmeid käitleb.",

      // Cookie banner
      "cookie.text":
        "See rakendus kasutab olulisi küpsiseid ja kohaliku salvestuse andmeid turvaliseks sisselogimiseks ja põhiliseks toimimiseks.",
      "cookie.noAds": "Reklaami- ega jälgimisküpsiseid ei kasutata.",
      "cookie.policyLinkText": "privaatsuspoliitika",
      "cookie.ok": "Olgu",
      "cookie.later": "Hiljem",
    },
  };

  function detectInitialLang() {
    // 1) Stored choice
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && TRANSLATIONS[stored]) return stored;
    } catch (e) {
      // ignore
    }

    // 2) Browser language
    const navLang = (navigator.language || navigator.userLanguage || "en")
      .slice(0, 2)
      .toLowerCase();
    if (TRANSLATIONS[navLang]) return navLang;

    // 3) Fallback
    return "en";
  }

  function getCurrentLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && TRANSLATIONS[stored]) return stored;
    } catch (e) {
      // ignore
    }
    return detectInitialLang();
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // ignore
    }
  }

  function applyTranslations() {
    const lang = getCurrentLang();
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

    // Set <html lang="">
    document.documentElement.setAttribute("lang", lang);

    // Basic text nodes: data-i18n="key"
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = dict[key];
      if (!value) return;
      // Preserve simple line breaks
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

    // Placeholders: data-i18n-placeholder="key"
    document
      .querySelectorAll("[data-i18n-placeholder]")
      .forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        const value = dict[key];
        if (value) {
          el.setAttribute("placeholder", value);
        }
      });

    // Title attribute: data-i18n-title="key"
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      const value = dict[key];
      if (value) {
        el.setAttribute("title", value);
      }
    });

    // Language switch buttons UI feedback (used on Settings page)
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      const btnLang = btn.getAttribute("data-lang");
      if (btnLang === lang) {
        btn.classList.add("lang-active");
      } else {
        btn.classList.remove("lang-active");
      }
    });
  }

  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    saveLang(lang);
    applyTranslations();
  }

  // Expose helpers globally so other scripts (like cookie-consent.js or settings.html) can use them
  window.fishingLogI18n = {
    getCurrentLang,
    setLanguage,
    applyTranslations,
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
