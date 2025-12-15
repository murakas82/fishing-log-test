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
      "home.logOut": "Log out",

      // Stats labels (keep WITHOUT trailing ":" because HTML adds punctuation)
      "home.statsTotalCatches": "Total catches",
      "home.biggestFish": "Biggest",
      "home.statsAverageWeight": "Average weight",

      // Buttons
      "home.openSpot": "Open spot",
      "home.AddCatch": "Add catch",
      "home.predictions": "Predictions",
      "home.googleMaps": "Google Maps",

      // Empty states used in index.html
      "home.spotStatsNa": "No catches yet.",
      "home.noCatchesYet": "No catches yet.",
      "home.noSpotsYet": "No spots yet. Add your first fishing spot.",

      // Weather/pred rows
      "home.weatherNow": "Weather now",
      "home.predictionNext3Days": "Prediction (next 3 days)",
      "home.loading": "loading…",
      "home.failedToLoad": "failed to load.",
      "home.locationMissing": "location missing.",
      "home.unavailable": "unavailable.",
      "home.notEnoughDataYet": "not enough data yet.",
      "home.na": "n/a",

      // Units + wind label
      "home.wind": "wind",
      "home.unitCelsius": "°C",
      "home.unitMetersPerSecond": "m/s",

      // Weekdays (short)
      "home.weekdaySun": "Sun.",
      "home.weekdayMon": "Mon.",
      "home.weekdayTue": "Tue.",
      "home.weekdayWed": "Wed.",
      "home.weekdayThu": "Thu.",
      "home.weekdayFri": "Fri.",
      "home.weekdaySat": "Sat.",

      // Weather conditions
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

      // Auth (index.html dynamic auth UI)
      "auth.title": "Log in or sign up",
      "auth.emailPlaceholder": "Email",
      "auth.passwordPlaceholder": "Password",
      "auth.logIn": "Log in",
      "auth.signUp": "Sign up",
      "auth.or": "or",
      "auth.continueWithGoogle": "Continue with Google",

      // Auth error prefixes/messages
      "auth.loginFailedPrefix": "Login failed:",
      "auth.signUpFailedPrefix": "Sign up failed:",
      "auth.googleFailedPrefix": "Google sign-in failed:",
      "auth.enterEmailPassword": "Enter email & password, then press Sign up.",

      // Add-spot translations
      "spotAdd.namePlaceholder": "Paunküla, Peipsi, etc.",
      "spotAdd.searchPlaceholder": "Search place (town, lake, address, etc.)",
      "spotAdd.unnamedPlace": "Unnamed place",
      "spotAdd.locationSetFromSearch": "Location set from search:",
      "spotAdd.searchingLocation": "Searching location…",
      "spotAdd.noResultsFound": "No results found for that search.",
      "spotAdd.searchFailed": "Search failed:",
      "spotAdd.geoNotAvailable": "Geolocation not available.",
      "spotAdd.gettingLocation": "Getting your current location…",
      "spotAdd.couldNotGetLocation": "Could not get location:",
      "spotAdd.mustBeLoggedIn": "You must be logged in.",
      "spotAdd.nameRequired": "Spot name is required.",
      "spotAdd.pleaseSetLocation": "Please set the location.",
      "spotAdd.saving": "Saving…",
      "spotAdd.duplicateName": "You already have a spot with this name (ignoring case & spaces).",
      "spotAdd.savedRedirecting": "Spot saved. Redirecting…",
      "spotAdd.errorSaving": "Error saving spot:",
      "spotAdd.saveButtonLabelFallback": "Save fishing spot",
      "spotAdd.unknownUser": "unknown user",

      // spots-map translations
      "spotsMap.legendMarkerColor": "Marker color (tomorrow)",
      "spotsMap.legendGood": "good",
      "spotsMap.legendMedium": "medium",
      "spotsMap.legendPoor": "poor",
      "spotsMap.legendPopupShows": "Popup shows live weather now and predictions for the next 3 days.",

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

      "catch.speciesPlaceholder": "pike, perch, etc.",
      "catch.lurePlaceholder": "Spinner, jig, worm…",
      "catch.notesPlaceholder": "Weather, behavior, etc.",
      "catch.weatherNotLoadedInline": "(not loaded yet)",

      "catch.noSpotsYetOption": "No spots yet – create one first.",
      "catch.chooseSpotOption": "Choose a fishing spot…",
      "catch.unnamedSpotOption": "Unnamed spot",

      "catch.geoNotAvailable": "Geolocation not available.",
      "catch.gettingLocation": "Getting your location…",
      "catch.couldNotGetLocation": "Could not get location:",
      "catch.mustBeLoggedIn": "You must be logged in.",
      "catch.chooseSpotRequired": "Please choose a fishing spot.",
      "catch.enterValidWeight": "Please enter a valid weight.",
      "catch.defaultSpecies": "fish",
      "catch.saving": "Saving…",
      "catch.savedRedirecting": "Catch saved. Redirecting…",
      "catch.errorSaving": "Error saving catch:",

      "catch.confirmDuplicateSave":
        "This looks like a duplicate catch (same spot, same day, same species/weight/lure). Save anyway?",
      "catch.duplicateBlocked":
        "Duplicate catch was not saved.",

      // Catches list
      "catches.title": "Your Catches",
      "catches.subtitle": "All catches for your account.",
      "catches.needLogin": "You need to be logged in to see your catches.",
      "catches.back": "Back to main page",
      "catches.loading": "Loading catches…",

      // Add spot (base)
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

      // spot.html extra strings
      "spotPage.locationLabel": "Location:",
      "spotPage.locationNotSet": "not set",
      "spotPage.noSpotSelected": "No spot selected",
      "spotPage.missingSpotId": "Missing spot id in URL.",
      "spotPage.spotNotFound": "Spot not found",
      "spotPage.spotDoesNotExist": "This spot does not exist.",
      "spotPage.accessDenied": "Access denied",
      "spotPage.belongsToAnotherUser": "This spot belongs to another user.",
      "spotPage.unnamedSpot": "Unnamed spot",
      "spotPage.noCatchesYet": "No catches at this spot yet.",
      "spotPage.lureLabel": "Lure",
      "spotPage.depthLabel": "Depth",
      "spotPage.waterTempLabel": "Water temp",
      "spotPage.weatherAtCatchLabel": "Weather at time of catch",
      "spotPage.noWeatherData": "no weather data",
      "spotPage.deleteCatch": "Delete catch",
      "spotPage.confirmDeleteCatch": "Delete this catch permanently?",
      "spotPage.errorDeletingCatch": "Error deleting catch:",
      "spotPage.confirmDeleteSpot": "Delete this spot and all catches at this spot? This cannot be undone.",
      "spotPage.deleting": "Deleting…",
      "spotPage.spotDeleted": "Spot and its catches deleted.",
      "spotPage.errorDeletingSpot": "Error deleting spot:",
      "spotPage.deleteButtonFallback": "Delete spot",

      // Spots map
      "spotsMap.title": "My fishing spots – map",
      "spotsMap.subtitle":
        "See all your spots on an interactive map with live weather & predictions.",
      "spotsMap.overview": "Spots overview",
      "spotsMap.legendDescription":
        "• Marker color (tomorrow): ● good (≥70%), ● medium (40–69%), ● poor (<40%).\n• Popup shows live weather now and predictions for the next 3 days.",

      // Predictions (existing)
      "pred.title": "Predictions",
      "pred.subtitle": "Forecast match vs your past catches at this spot.",
      "pred.loadingSpot": "Loading spot…",
      "pred.fetchingData": "Fetching data…",
      "pred.next3Days": "Next 3 days",
      "pred.hotTimesTomorrow": "Hot times tomorrow",
      "pred.hotTimesExplain":
        "Times are between 1 hour before sunrise and 1 hour after sunset, based on your catches with weather data.",
      "pred.debugTitle": "Debug view (why these scores?)",

      // Predictions (NEW)
      "pred.noSpotSelected": "No spot selected",
      "pred.missingSpotId": "Missing spotId in URL.",
      "pred.spotNotFound": "Spot not found",
      "pred.unableToLoadSpot": "Unable to load this spot.",
      "pred.loadingCatchesAndForecast": "Loading catches and forecast…",
      "pred.spotCatchSummary": "{total} total catches at this spot, {withWeather} with weather data saved.",
      "pred.noGpsNoPrediction": "This spot has no GPS coordinates, so forecast-based prediction is not available.",
      "pred.failedToCompute": "Failed to compute predictions.",
      "pred.noForecastData": "No forecast data available.",
      "pred.avgScoreSummary": "Average score for the next 3 days: {avg}% (based on {usable} catches with weather data).",
      "pred.noUsableCatchesYet": "No usable catches with weather data yet – predictions are not available.",
      "pred.tagGood": "Good",
      "pred.tagMedium": "Medium",
      "pred.tagPoor": "Poor",
      "pred.tagNoData": "No data",
      "pred.weatherFog": "Fog",
      "pred.weatherFailedToLoad": "Weather: failed to load",
      "pred.weatherNotAvailable": "Weather now: not available",

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
        "Jälgi oma püütud kalu igal pool – koos sisselogimise, püügikohtade, ilma ja ennustustega.",
      "home.statsTitle": "Statistika",
      "home.spotsTitle": "Minu püügikohad",
      "home.mapView": "Kaardivaade",
      "home.addNewSpot": "Lisa uus püügikoht",
      "home.loadingApp": "Rakendus laadib…",
      "home.settings": "Seaded",
      "home.logOut": "Logi välja",

      // Stats labels
      "home.statsTotalCatches": "Püütud kalad",
      "home.biggestFish": "Suurim",
      "home.statsAverageWeight": "Keskmine kaal",

      // Buttons
      "home.openSpot": "Ava koht",
      "home.AddCatch": "Lisa kala",
      "home.predictions": "Ennustused",
      "home.googleMaps": "Google Maps",

      // Empty states
      "home.spotStatsNa": "Püütud kalad puuduvad",
      "home.noCatchesYet": "Püütud kalad puuduvad",
      "home.noSpotsYet": "Püügikohti veel pole. Lisa oma esimene püügikoht.",

      // Weather/pred rows
      "home.weatherNow": "Ilm praegu",
      "home.predictionNext3Days": "Prognoos (järgmised 3 päeva)",
      "home.loading": "laadimine…",
      "home.failedToLoad": "laadimine ebaõnnestus.",
      "home.locationMissing": "asukoht puudub.",
      "home.unavailable": "pole saadaval.",
      "home.notEnoughDataYet": "andmeid pole veel piisavalt.",
      "home.na": "puudub",

      // Units + wind label
      "home.wind": "tuul",
      "home.unitCelsius": "°C",
      "home.unitMetersPerSecond": "m/s",

      // Weekdays (short)
      "home.weekdaySun": "P",
      "home.weekdayMon": "E",
      "home.weekdayTue": "T",
      "home.weekdayWed": "K",
      "home.weekdayThu": "N",
      "home.weekdayFri": "R",
      "home.weekdaySat": "L",

      // Weather conditions
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

      // Auth
      "auth.title": "Logi sisse või loo konto",
      "auth.emailPlaceholder": "E-post",
      "auth.passwordPlaceholder": "Parool",
      "auth.logIn": "Logi sisse",
      "auth.signUp": "Loo konto",
      "auth.or": "või",
      "auth.continueWithGoogle": "Jätka Google’iga",

      // Auth errors
      "auth.loginFailedPrefix": "Sisselogimine ebaõnnestus:",
      "auth.signUpFailedPrefix": "Konto loomine ebaõnnestus:",
      "auth.googleFailedPrefix": "Google’i sisselogimine ebaõnnestus:",
      "auth.enterEmailPassword": "Sisesta e-post ja parool ning vajuta „Loo konto“.",

      // Add-spot translations
      "spotAdd.namePlaceholder": "Paunküla, Peipsi jne.",
      "spotAdd.searchPlaceholder": "Otsi kohta (linn, järv, aadress jne.)",
      "spotAdd.unnamedPlace": "Nimetu koht",
      "spotAdd.locationSetFromSearch": "Asukoht seatud otsingust:",
      "spotAdd.searchingLocation": "Asukoha otsing…",
      "spotAdd.noResultsFound": "Otsingule ei leitud tulemusi.",
      "spotAdd.searchFailed": "Otsing ebaõnnestus:",
      "spotAdd.geoNotAvailable": "Geolokatsioon pole saadaval.",
      "spotAdd.gettingLocation": "Otsin sinu asukohta…",
      "spotAdd.couldNotGetLocation": "Asukohta ei õnnestunud saada:",
      "spotAdd.mustBeLoggedIn": "Pead olema sisse logitud.",
      "spotAdd.nameRequired": "Koha nimi on kohustuslik.",
      "spotAdd.pleaseSetLocation": "Palun määra asukoht.",
      "spotAdd.saving": "Salvestan…",
      "spotAdd.duplicateName": "Sul on juba sama nimega koht (tõstutundetu ja tühikuid ignoreerides).",
      "spotAdd.savedRedirecting": "Koht salvestatud. Suunan tagasi…",
      "spotAdd.errorSaving": "Koha salvestamine ebaõnnestus:",
      "spotAdd.saveButtonLabelFallback": "Salvesta püügikoht",
      "spotAdd.unknownUser": "tundmatu kasutaja",

      // spots-map translations
      "spotsMap.legendMarkerColor": "Markeri värv (homne päev)",
      "spotsMap.legendGood": "hea",
      "spotsMap.legendMedium": "keskmine",
      "spotsMap.legendPoor": "nõrk",
      "spotsMap.legendPopupShows": "Hüpikaken näitab hetke ilma ja ennustusi järgmiseks 3 päevaks.",

      // Common
      "common.backToMain": "← Tagasi avalehele",
      "common.backToMainPage": "Tagasi avalehele",
      "common.loggedInAs": "Sisse logitud kui …",
      "common.useMyLocation": "Kasuta minu asukohta",
      "common.loading": "Laadimine…",
      "common.loadingSpot": "Koha laadimine…",

      // Add catch
      "catch.title": "Lisa kala",
      "catch.subtitle":
        "Salvesta püütud kala koos püügikoha, kaalu, ilma ja märkmetega.",
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

      "catch.speciesPlaceholder": "haug, ahven jne.",
      "catch.lurePlaceholder": "Spinner, jig, uss…",
      "catch.notesPlaceholder": "Ilm, käitumine jne.",
      "catch.weatherNotLoadedInline": "(pole veel laaditud)",

      "catch.noSpotsYetOption": "Püügikohti pole – loo enne üks.",
      "catch.chooseSpotOption": "Vali püügikoht…",
      "catch.unnamedSpotOption": "Nimetu püügikoht",

      "catch.geoNotAvailable": "Geolokatsioon pole saadaval.",
      "catch.gettingLocation": "Otsin sinu asukohta…",
      "catch.couldNotGetLocation": "Asukohta ei õnnestunud saada:",
      "catch.mustBeLoggedIn": "Pead olema sisse logitud.",
      "catch.chooseSpotRequired": "Palun vali püügikoht.",
      "catch.enterValidWeight": "Palun sisesta korrektne kaal.",
      "catch.defaultSpecies": "kala",
      "catch.saving": "Salvestan…",
      "catch.savedRedirecting": "Saak salvestatud. Suunan tagasi…",
      "catch.errorSaving": "Saagi salvestamine ebaõnnestus:",

      "catch.confirmDuplicateSave":
        "See tundub olevat duplikaatsaak (sama koht, sama päev, sama liik/kaal/lant). Kas salvestan ikkagi?",
      "catch.duplicateBlocked":
        "Duplikaatsaaki ei salvestatud.",

      // Catches list
      "catches.title": "Sinu saagid",
      "catches.subtitle": "Kõik sinu konto saagid.",
      "catches.needLogin": "Saagide nägemiseks pead olema sisse loginud.",
      "catches.back": "Tagasi avalehele",
      "catches.loading": "Saakide laadimine…",

      // Add spot (base)
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
      "spotPage.subtitle": "Vaata selle koha andmeid ja püütud kalu.",
      "spotPage.addCatch": "Lisa kala",
      "spotPage.predictions": "Ennustused",
      "spotPage.edit": "Muuda",
      "spotPage.delete": "Kustuta koht",
      "spotPage.catchesTitle": "Selle koha kalad",
      "spotPage.loading": "Laadimine…",

      // spot.html extra strings
      "spotPage.locationLabel": "Asukoht:",
      "spotPage.locationNotSet": "määramata",
      "spotPage.noSpotSelected": "Püügikohta pole valitud",
      "spotPage.missingSpotId": "URL-is puudub koha ID.",
      "spotPage.spotNotFound": "Püügikohta ei leitud",
      "spotPage.spotDoesNotExist": "Seda püügikohta ei eksisteeri.",
      "spotPage.accessDenied": "Ligipääs keelatud",
      "spotPage.belongsToAnotherUser": "See püügikoht kuulub teisele kasutajale.",
      "spotPage.unnamedSpot": "Nimetu püügikoht",
      "spotPage.noCatchesYet": "Selles kohas pole kala.",
      "spotPage.lureLabel": "Lant",
      "spotPage.depthLabel": "Sügavus",
      "spotPage.waterTempLabel": "Vee temp",
      "spotPage.weatherAtCatchLabel": "Ilm saagi ajal",
      "spotPage.noWeatherData": "ilmaandmed puuduvad",
      "spotPage.deleteCatch": "Kustuta kala",
      "spotPage.confirmDeleteCatch": "Kas kustutada see kala jäädavalt?",
      "spotPage.errorDeletingCatch": "Saagi kustutamine ebaõnnestus:",
      "spotPage.confirmDeleteSpot": "Kas kustutada see püügikoht ja kõik selle koha saagid? Seda ei saa tagasi võtta.",
      "spotPage.deleting": "Kustutan…",
      "spotPage.spotDeleted": "Püügikoht ja selle saagid kustutati.",
      "spotPage.errorDeletingSpot": "Püügikoha kustutamine ebaõnnestus:",
      "spotPage.deleteButtonFallback": "Kustuta koht",

      // Spots map
      "spotsMap.title": "Minu püügikohad – kaart",
      "spotsMap.subtitle":
        "Vaata kõiki oma püügikohti interaktiivsel kaardil koos ilma ja ennustustega.",
      "spotsMap.overview": "Kohtade ülevaade",
      "spotsMap.legendDescription":
        "• Markeri värv (homne päev): ● hea (≥70%), ● keskmine (40–69%), ● nõrk (<40%).\n• Hüpikaken näitab hetke ilma ja ennustusi järgmiseks 3 päevaks.",

      // Predictions (existing)
      "pred.title": "Ennustused",
      "pred.subtitle":
        "Ilmaprognoosi sobivus sinu varasemate selle koha püütud kaladega.",
      "pred.loadingSpot": "Koha laadimine…",
      "pred.fetchingData": "Andmete toomine…",
      "pred.next3Days": "Järgmised 3 päeva",
      "pred.hotTimesTomorrow": "Parimad ajad homseks",
      "pred.hotTimesExplain":
        "Ajad on vahemikus tund enne päikesetõusu kuni tund pärast päikeseloojangut, põhinedes sinu ilmaandmetega kaladel.",
      "pred.debugTitle": "Silumisvaade (miks sellised skoorid?)",

      // Predictions (NEW)
      "pred.noSpotSelected": "Püügikohta pole valitud",
      "pred.missingSpotId": "URL-is puudub spotId.",
      "pred.spotNotFound": "Püügikohta ei leitud",
      "pred.unableToLoadSpot": "Seda püügikohta ei õnnestunud laadida.",
      "pred.loadingCatchesAndForecast": "Laen saake ja prognoosi…",
      "pred.spotCatchSummary": "Selles kohas kokku {total} kala, neist {withWeather} salvestatud ilmaandmetega.",
      "pred.noGpsNoPrediction": "Sellel püügikohal puuduvad GPS-koordinaadid, seega prognoosipõhine ennustus pole saadaval.",
      "pred.failedToCompute": "Ennustuse arvutamine ebaõnnestus.",
      "pred.noForecastData": "Prognoosiandmed pole saadaval.",
      "pred.avgScoreSummary": "Järgmise 3 päeva keskmine skoor: {avg}% (põhineb {usable} ilmaandmetega saagil).",
      "pred.noUsableCatchesYet": "Ilmaandmetega kalu pole veel piisavalt – ennustus pole saadaval.",
      "pred.tagGood": "Hea",
      "pred.tagMedium": "Keskmine",
      "pred.tagPoor": "Nõrk",
      "pred.tagNoData": "Andmeid pole",
      "pred.weatherFog": "Udu",
      "pred.weatherFailedToLoad": "Ilm: laadimine ebaõnnestus",
      "pred.weatherNotAvailable": "Ilm praegu: pole saadaval",

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

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      const btnLang = btn.getAttribute("data-lang");
      if (btnLang === lang) btn.classList.add("lang-active");
      else btn.classList.remove("lang-active");
    });
  }

  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    saveLang(lang);
    applyTranslations();
  }

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
