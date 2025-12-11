// i18n.js – simple EN / ET translations for static texts

const I18N_DICTIONARY = {
  en: {
    // Index / main
    app_title: "My Fishing Log",
    app_subtitle: "Track your catches anywhere – with login, spots, weather & predictions.",
    stats_title: "Stats",
    spots_title: "My fishing spots",
    btn_map_view: "Map view",
    btn_add_spot: "Add new spot",
    loading_app: "Loading app…",

    // Settings page
    settings_title: "Settings",
    settings_subtitle: "Choose your language for the app.",
    settings_language_label: "Language",
    settings_language_en: "English",
    settings_language_et: "Estonian",
    settings_save_button: "Save settings",
    settings_back_main: "← Back to main",

    // Generic
    footer_privacy: "Privacy Policy"
  },

  et: {
    // Index / main
    app_title: "Minu kalapüügipäevik",
    app_subtitle: "Jälgi oma saake kõikjal – sisselogimine, püügikohad, ilm ja prognoosid.",
    stats_title: "Statistika",
    spots_title: "Minu kalastuskohad",
    btn_map_view: "Kaardivaade",
    btn_add_spot: "Lisa uus koht",
    loading_app: "Rakendus laeb…",

    // Settings page
    settings_title: "Seaded",
    settings_subtitle: "Vali rakenduse keel.",
    settings_language_label: "Keel",
    settings_language_en: "Inglise",
    settings_language_et: "Eesti",
    settings_save_button: "Salvesta seaded",
    settings_back_main: "← Tagasi avalehele",

    // Generic
    footer_privacy: "Privaatsustingimused"
  }
};

function getStoredLanguage() {
  try {
    const v = localStorage.getItem("fishinglog_language");
    if (v === "en" || v === "et") return v;
  } catch (e) {
    // ignore
  }
  return "en";
}

function setStoredLanguage(lang) {
  try {
    localStorage.setItem("fishinglog_language", lang);
  } catch (e) {
    // ignore
  }
}

function applyLanguage(lang) {
  const langCode = lang === "et" ? "et" : "en";
  const dict = I18N_DICTIONARY[langCode] || I18N_DICTIONARY.en;

  // Set <html lang="...">
  document.documentElement.setAttribute("lang", langCode);

  // Replace text in all data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const value = dict[key];
    if (typeof value === "string") {
      el.textContent = value;
    }
  });
}

// Expose helpers globally so other scripts (settings) can call them
window.getStoredLanguage = getStoredLanguage;
window.setStoredLanguage = setStoredLanguage;
window.applyLanguage = applyLanguage;

// Initialize language on page load
(function initI18n() {
  const lang = getStoredLanguage();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyLanguage(lang));
  } else {
    applyLanguage(lang);
  }
})();
