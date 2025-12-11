
<script>
// --- Simple i18n for static HTML pages --------------------------------------

const TRANSLATIONS = {
  en: {
    common: {
      backToMain: "Back to main",
      save: "Save"
    },
    settings: {
      title: "Settings",
      subtitle: "Personalize how your name appears in the app.",
      language: "Language",
      languageEnglish: "English",
      languageEstonian: "Estonian",
      displayName: "Display name",
      saveSettings: "Save settings"
    }
  },
  et: {
    common: {
      backToMain: "Tagasi avalehele",
      save: "Salvesta"
    },
    settings: {
      title: "Seaded",
      subtitle: "Kohanda, kuidas sinu nimi rakenduses kuvatakse.",
      language: "Keel",
      languageEnglish: "Inglise",
      languageEstonian: "Eesti",
      displayName: "Kuvatav nimi",
      saveSettings: "Salvesta seaded"
    }
  }
};

// Detect user language: URL ?lng= → localStorage → browser → fallback "en"
function detectLanguage() {
  const urlLng = new URLSearchParams(window.location.search).get('lng');
  const saved = localStorage.getItem('lang');
  const nav = (navigator.language || 'en').toLowerCase();
  const guess = nav.startsWith('et') ? 'et' : 'en';
  return (urlLng && ['en','et'].includes(urlLng)) ? urlLng :
         (saved && ['en','et'].includes(saved)) ? saved : guess;
}

function setHtmlLang(lng) {
  document.documentElement.setAttribute('lang', lng);
}

function translatePage(lng) {
  const dict = TRANSLATIONS[lng] || TRANSLATIONS.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n'); // e.g. "settings.title"
    const text = key.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), dict);
    if (typeof text === 'string') {
      if (el.dataset.i18nHtml === '1') el.innerHTML = text;
      else el.textContent = text;
    } else {
      console.warn('Missing i18n key:', key);
    }
  });
  // Keep any <select> with data-lang-select in sync
  document.querySelectorAll('[data-lang-select]').forEach(sel => {
    sel.value = lng;
  });
}

function setLanguage(lng) {
  localStorage.setItem('lang', lng);
  setHtmlLang(lng);
  translatePage(lng);
  // Optional: visually disable the active language buttons if you add them
  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.toggleAttribute('disabled', btn.dataset.langBtn === lng);
  });
}

function getLanguage() {
  return localStorage.getItem('lang') || detectLanguage();
}

window.i18n = { setLanguage, getLanguage };

document.addEventListener('DOMContentLoaded', () => {
  const lng = detectLanguage();
  setLanguage(lng);

  // Wire any language <select data-lang-select>
  document.querySelectorAll('[data-lang-select]').forEach(sel => {
    sel.value = lng;
    sel.addEventListener('change', e => setLanguage(e.target.value));
  });
});
</script>
