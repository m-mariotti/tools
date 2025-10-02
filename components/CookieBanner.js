'use client'
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { cookieBannerTranslations } from '../locales/cookie-banner-translations';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState('en');
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    advertising: false
  });

  // Carica la lingua salvata
  useEffect(() => {
    const savedLanguage = localStorage.getItem('siteLanguage') || 'en';
    setLanguage(savedLanguage);
  }, []);

  // Ascolta i cambi di lingua
  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const t = cookieBannerTranslations[language];

  useEffect(() => {
    // Controlla se l'utente ha già dato il consenso
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Mostra il banner dopo 1 secondo
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Carica le preferenze salvate
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
        loadScripts(savedPreferences);
      } catch (e) {
        console.error('Error loading cookie preferences:', e);
      }
    }
  }, []);

  const loadScripts = (prefs) => {
    // Qui caricheresti gli script esterni basandoti sulle preferenze
    // Per ora log di esempio
    if (prefs.advertising) {
      console.log('✅ Advertising cookies enabled - Google AdSense will load');
      // Gli script AdSense sono già nel layout, questo controllo è per analytics esterni
    }
    if (prefs.analytics) {
      console.log('✅ Analytics cookies enabled');
      // Qui caricheresti Google Analytics se lo avessi
    }
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    loadScripts(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      analytics: false,
      advertising: false
    };
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setPreferences(onlyNecessary);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    loadScripts(preferences);
    setShowBanner(false);
    setShowModal(false);
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Non modificabile
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Banner Cookie */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-indigo-600 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {t.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.description}{' '}
                <Link href="/cookie-policy" className="text-indigo-600 hover:text-indigo-700 underline font-medium">
                  {t.learnMore}
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                {t.customize}
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 text-sm font-semibold text-gray-700 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
              >
                {t.rejectAll}
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg shadow-lg transition-all"
              >
                {t.acceptAll}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Personalizzazione */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {t.modalTitle}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">{t.modalDescription}</p>

              {/* Cookie Necessari */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{t.necessary.title}</h3>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    {t.necessary.alwaysActive}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{t.necessary.description}</p>
              </div>

              {/* Cookie Funzionali */}
              <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{t.functional.title}</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => togglePreference('functional')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">{t.functional.description}</p>
              </div>

              {/* Cookie Analitici */}
              <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{t.analytics.title}</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => togglePreference('analytics')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">{t.analytics.description}</p>
              </div>

              {/* Cookie Pubblicitari */}
              <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{t.advertising.title}</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.advertising}
                      onChange={() => togglePreference('advertising')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">{t.advertising.description}</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 text-sm font-semibold text-gray-700 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
                >
                  {t.rejectAll}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-lg shadow-lg transition-all"
                >
                  {t.savePreferences}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}