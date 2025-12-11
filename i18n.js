// i18n.js – simple EN / ET translations for static texts + JS helpers

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

    // Footer
    footer_privacy: "Privacy Policy",

    // Auth / header (JS)
    auth_title: "Log in or sign up",
    auth_email_placeholder: "Email",
    auth_password_placeholder: "Password",
    auth_login: "Log in",
    auth_signup: "Sign up",
    auth_or: "or",
    auth_continue_google: "Continue with Google",
    auth_login_failed_prefix: "Login failed:",
    auth_signup_failed_prefix: "Sign up failed:",
    auth_enter_email_password: "Enter email & password, then press Sign up.",
    auth_google_failed_prefix: "Google sign-in failed:",

    header_logged_in_as: "Logged in as",
    header_settings: "Settings",
    header_logout: "Log out",

    // Stats (JS)
    stats_no_catches_overall: "No catches yet.",
    stats_total_catches_label: "Total catches",
    stats_biggest_fish_label: "Biggest fish",
    stats_avg_weight_label: "Average weight",

    // Spots list & spot stats (JS)
    spots_no_spots: "No spots yet. Add your first fishing spot.",
    spot_no_catches: "No catches yet.",
    // {total}, {weight}, {species}
    spot_stats_line: "Total catches: {total} • Biggest: {weight} kg {species}",

    // Weather & predictions (JS)
    weather_now_prefix: "Weather now:",
    weather_location_missing: "location missing.",
    weather_loading: "loading…",
    weather_failed_suffix: "failed to load.",
    predictions_prefix: "Prediction (next 3 days):",
    predictions_unavailable: "unavailable.",
    predictions_loading: "loading…",
    predictions_not_enough: "not enough data yet.",

    // Buttons created via JS
    btn_open_spot: "Open spot",
    btn_add_catch: "Add catch",
    btn_predictions: "Predictions",
    btn_google_maps: "Google Maps",

    // Settings page
    settings_title: "Settings",
    settings_subtitle: "Choose your language for the app.",
    settings_language_label: "Language",
    settings_language_en: "English",
    settings_language_et: "Estonian",
    settings_save_button: "Save settings",
    settings_back_main: "← Back to main"

      // Spot page
    spot_title: "Fishing spot",
spot_subtitle: "See details and catches for this spot.",
btn_back_main: "← Back to main",

spot_location_label: "Location",
spot_location_unknown: "Unknown",
spot_not_found: "Spot not found",
spot_no_name: "Unnamed spot",
spot_load_error: "Error loading spot.",
spot_catches_title: "Catches at this spot",
spot_no_catches: "No catches yet.",

btn_add_catch: "Add catch",
btn_predictions: "Predictions",
btn_edit_spot: "Edit",
btn_delete_spot: "Delete spot",
btn_delete_catch: "Delete catch",

confirm_delete_spot: "Delete this spot (and its catches)?",
error_delete_spot: "Error deleting spot.",
confirm_delete_catch: "Delete this catch?",
error_delete_catch: "Error deleting catch.",

catch_lure_label: "Lure",
catch_depth_label: "Depth",
catch_watertemp_label: "Water temp",
catch_weather_label: "Weather at time of catch",
catch_weather_unknown: "No weather data",
species_unknown: "fish",

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

    // Footer
    footer_privacy: "Privaatsustingimused",

    // Auth / header (JS)
    auth_title: "Logi sisse või loo konto",
    auth_email_placeholder: "E-post",
    auth_password_placeholder: "Parool",
    auth_login: "Logi sisse",
    auth_signup: "Loo konto",
    auth_or: "või",
    auth_continue_google: "Jätka Google'iga",
    auth_login_failed_prefix: "Sisselogimine ebaõnnestus:",
    auth_signup_failed_prefix: "Konto loomine ebaõnnestus:",
    auth_enter_email_password: "Sisesta e-post ja parool, seejärel vajuta \"Loo konto\".",
    auth_google_failed_prefix: "Google'i sisselogimine ebaõnnestus:",

    header_logged_in_as: "Sisse logitud kui",
    header_settings: "Seaded",
    header_logout: "Logi välja",

    // Stats (JS)
    stats_no_catches_overall: "Saake veel pole.",
    stats_total_catches_label: "Saakide arv",
    stats_biggest_fish_label: "Suurim kala",
    stats_avg_weight_label: "Keskmine kaal",

    // Spots list & spot stats (JS)
    spots_no_spots: "Ühtegi püügikohta pole. Lisa oma esimene püügikoht.",
    spot_no_catches: "Selles kohas pole saake.",
    // {total}, {weight}, {species}
    spot_stats_line: "Saake kokku: {total} • Suurim: {weight} kg {species}",

    // Weather & predictions (JS)
    weather_now_prefix: "Hetke ilm:",
    weather_location_missing: "asukoht puudub.",
    weather_loading: "laetakse…",
    weather_failed_suffix: "laadimine ebaõnnestus.",
    predictions_prefix: "Prognoos (järgmised 3 päeva):",
    predictions_unavailable: "pole saadaval.",
    predictions_loading: "laetakse…",
    predictions_not_enough: "prognoosi jaoks pole veel piisavalt andmeid.",

    // Buttons created via JS
    btn_open_spot: "Ava koht",
    btn_add_catch: "Lisa saak",
    btn_predictions: "Prognoosid",
    btn_google_maps: "Google Maps",

    // Settings page
    settings_title: "Seaded",
    settings_subtitle: "Vali rakenduse keel.",
    settings_language_label: "Keel",
    settings_language_en: "Inglise",
    settings_language_et: "Eesti",
    settings_save_button: "Salvesta seaded",
    settings_back_main: "← Tagasi avalehele"

  // spot page
  spot_title: "Kalakoht",
spot_subtitle: "Vaata koha andmeid ja saake.",
btn_back_main: "← Tagasi avalehele",

spot_location_label: "Asukoht",
spot_location_unknown: "Teadmata",
spot_not_found: "Kohta ei leitud",
spot_no_name: "Nimetu koht",
spot_load_error: "Viga koha laadimisel.",
spot_catches_title: "Saagid selles kohas",
spot_no_catches: "Saake veel pole.",

btn_add_catch: "Lisa saak",
btn_predictions: "Prognoosid",
btn_edit_spot: "Muuda kohta",
btn_delete_spot: "Kustuta koht",
btn_delete_catch: "Kustuta saak",

confirm_delete_spot: "Kas kustutada see koht ja kõik selle saagid?",
error_delete_spot: "Viga koha kustutamisel.",
confirm_delete_catch: "Kas kustutada see saak?",
error_delete_catch: "Viga saagi kustutamisel.",

catch_lure_label: "Lant",
catch_depth_label: "Sügavus",
catch_watertemp_label: "Vee temp",
catch_weather_label: "Ilm püügi hetkel",
catch_weather_unknown: "Ilmaandmeid pole",
species_unknown: "kala",

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

// Translation with optional {placeholders}
function translate(key, vars = {}) {
  const lang = getStoredLanguage();
  const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY.en;
  let str = dict[key] || I18N_DICTIONARY.en[key] || key;

  // Replace {placeholders}
  for (const k in vars) {
    if (!Object.prototype.hasOwnProperty.call(vars, k)) continue;
    const value = String(vars[k]);
    str = str.replace(new RegExp(`\\{${k}\\}`, "g"), value);
  }
  return str;
}

function applyLanguage(lang) {
  const langCode = lang === "et" ? "et" : "en";
  const dict = I18N_DICTIONARY[langCode] || I18N_DICTIONARY.en;

  document.documentElement.setAttribute("lang", langCode);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const value = dict[key];
    if (typeof value === "string") {
      el.textContent = value;
    }
  });
}

// Expose helpers globally so other scripts can use them
window.getStoredLanguage = getStoredLanguage;
window.setStoredLanguage = setStoredLanguage;
window.applyLanguage = applyLanguage;
window.t = translate;

// Initialize language on page load
(function initI18n() {
  const lang = getStoredLanguage();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyLanguage(lang));
  } else {
    applyLanguage(lang);
  }
})();
