import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

// Enable dark mode
document.documentElement.classList.add('cc--darkmode');

function loadGoogleAnalytics() {
  // Check if Google Analytics script is already loaded
  if (!window.gaInitialized) {
    var script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-L0V74G0Q65";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-L0V74G0Q65');
      window.gaInitialized = true;
    };
  }
}

function disableGoogleAnalytics() {
  // Clear the dataLayer
  if (window.dataLayer) {
    window.dataLayer = [];
  }
  // Optionally, you can also disable analytics cookies if they were already set
  document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const cc = CookieConsent.run({
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom left",
      equalWeightButtons: false,
      flipButtons: false
    },
    preferencesModal: {
      layout: "box",
      position: "right",
      equalWeightButtons: true,
      flipButtons: false
    }
  },
  categories: {
    necessary: {
      readOnly: true
    },
    analytics: {}
  },
  language: {
    default: "en",
    autoDetect: "browser",
    translations: {
      en: {
        consentModal: {
          title: "Hello traveller, it's cookie time!",
          description: "I use cookies to enhance your browsing experience, analyse site traffic. By continuing to use my site, you consent to the use of cookies.",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          showPreferencesBtn: "Manage preferences",
          footer: ""
        },
        preferencesModal: {
          title: "Consent Preferences Center",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close modal",
          serviceCounterLabel: "Service|Services",
          sections: [
            {
              title: "Cookie Usage",
              description: "We use different types of cookies to optimise your experience on our site. You can choose which categories of cookies you allow below."
            },
            {
              title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
              description: "",
              linkedCategory: "necessary"
            },
            {
              title: "Analytics Cookies",
              description: "To work out what content everyone likes",
              linkedCategory: "analytics"
            }
          ]
        }
      }
    }
  },
  onAccept: (cookie) => {
    if (cookie.categories.analytics) {
      loadGoogleAnalytics();
    }
  },
  onChange: (cookie, changedPreferences) => {
    if (changedPreferences.includes('analytics')) {
      if (cookie.categories.analytics) {
        loadGoogleAnalytics();
      } else {
        disableGoogleAnalytics();
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CookieConsent !== 'undefined' && CookieConsent.getUserPreferences) {
    const userPreferences = CookieConsent.getUserPreferences();
    if (userPreferences && userPreferences.categories && userPreferences.categories.analytics) {
      loadGoogleAnalytics();
    }
  }
});
