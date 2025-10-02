import { useState, useEffect } from 'react';

/**
 * Custom hook for managing language state with localStorage persistence
 * @param {string} defaultLanguage - Default language if none is saved
 * @returns {Object} { language, changeLanguage }
 */
export function useLanguage(defaultLanguage = 'en') {
  const [language, setLanguage] = useState(defaultLanguage);

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('siteLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Listen for language changes from other components
  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Change language and persist to localStorage
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('siteLanguage', lang);

    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: lang }
    }));
  };

  return { language, changeLanguage };
}
