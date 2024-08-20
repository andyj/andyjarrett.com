import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

// Enable dark mode
document.documentElement.classList.add('cc--darkmode');

function loadGoogleAnalytics() {
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
  if (window.dataLayer) {
    window.dataLayer = [];
  }
  document.cookie = "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function loadClarity() {
  if (!window.clarityInitialized) {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "nqaz84w4hd");
    window.clarityInitialized = true;
  }
}

function disableClarity() {
  // Clarity doesn't provide a straightforward way to disable it once initialized.
  // You can, however, prevent further interactions by not sending any events or possibly reloading the page.
  // Alternatively, you could inform users about Clarity in the preferences and leave the script loaded by default.
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
      loadClarity();
    }
  },
  onChange: (cookie, changedPreferences) => {
    if (changedPreferences.includes('analytics')) {
      if (cookie.categories.analytics) {
        loadGoogleAnalytics();
        loadClarity();
      } else {
        disableGoogleAnalytics();
        disableClarity();
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  if (typeof CookieConsent !== 'undefined' && CookieConsent.getUserPreferences) {
    const userPreferences = CookieConsent.getUserPreferences();
    if (userPreferences && userPreferences.categories && userPreferences.categories.analytics) {
      loadGoogleAnalytics();
      loadClarity();
    }
  }
});
