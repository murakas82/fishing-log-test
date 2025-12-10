// cookie-consent.js
// Simple, non-intrusive cookie banner for the fishing log app.
// Shows once until the user accepts. Uses only localStorage.

(function () {
  const STORAGE_KEY = "fishinglog_cookie_consent_v1";

  function hasConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "yes";
    } catch (e) {
      return false;
    }
  }

  function setConsent() {
    try {
      localStorage.setItem(STORAGE_KEY, "yes");
    } catch (e) {
      // ignore
    }
  }

  function createStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .fl-cookie-banner {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 16px;
        max-width: 640px;
        width: calc(100% - 24px);
        background: rgba(15,23,42,0.96); /* dark slate */
        border: 1px solid rgba(148,163,184,0.7);
        border-radius: 999px;
        box-shadow: 0 24px 60px rgba(0,0,0,0.8);
        padding: 10px 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        backdrop-filter: blur(10px);
        font-size: 14px;
      }

      .fl-cookie-banner-text {
        flex: 1;
        color: #e5e7eb;
      }

      .fl-cookie-banner-text a {
        color: #60a5fa;
        text-decoration: underline;
      }

      .fl-cookie-banner-btn {
        border-radius: 999px;
        border: 1px solid #60a5fa;
        background: #1d4ed8;
        color: #e5e7eb;
        padding: 6px 16px;
        font-size: 14px;
        cursor: pointer;
        white-space: nowrap;
      }

      .fl-cookie-banner-btn:hover {
        background: #2563eb;
      }

      .fl-cookie-banner-dismiss {
        border-radius: 999px;
        border: 1px solid rgba(148,163,184,0.5);
        background: transparent;
        color: #9ca3af;
        padding: 6px 10px;
        font-size: 14px;
        cursor: pointer;
        white-space: nowrap;
      }

      .fl-cookie-banner-dismiss:hover {
        background: rgba(15,23,42,0.9);
        color: #e5e7eb;
      }

      @media (max-width: 480px) {
        .fl-cookie-banner {
          border-radius: 18px;
          flex-direction: column;
          align-items: flex-start;
        }
        .fl-cookie-banner-actions {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function showBanner() {
    if (hasConsent()) return;

    createStyles();

    const banner = document.createElement("div");
    banner.className = "fl-cookie-banner";

    const text = document.createElement("div");
    text.className = "fl-cookie-banner-text";
    text.innerHTML =
      'This app uses essential cookies and local storage for secure login and basic functionality. ' +
      'No advertising or tracking cookies are used. See the ' +
      '<a href="privacy.html" target="_blank" rel="noopener noreferrer">privacy policy</a>.';

    const actions = document.createElement("div");
    actions.className = "fl-cookie-banner-actions";

    const acceptBtn = document.createElement("button");
    acceptBtn.className = "fl-cookie-banner-btn";
    acceptBtn.textContent = "OK";
    acceptBtn.addEventListener("click", () => {
      setConsent();
      banner.remove();
    });

    const dismissBtn = document.createElement("button");
    dismissBtn.className = "fl-cookie-banner-dismiss";
    dismissBtn.textContent = "Later";
    dismissBtn.addEventListener("click", () => {
      // Do not store consent, just hide for this page load
      banner.remove();
    });

    actions.appendChild(dismissBtn);
    actions.appendChild(acceptBtn);

    banner.appendChild(text);
    banner.appendChild(actions);

    document.body.appendChild(banner);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showBanner);
  } else {
    showBanner();
  }
})();
