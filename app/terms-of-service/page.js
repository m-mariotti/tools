'use client'
import { useState, useEffect } from 'react';
import { ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';
import { privacyTranslations } from '../../locales/privacy-translations';
import { translations } from '../../locales/translations';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
  const [language, setLanguage] = useState('en');
  
  // Carica la lingua salvata
  useEffect(() => {
    const savedLanguage = localStorage.getItem('siteLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Funzione per cambiare lingua
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('siteLanguage', lang);
    
    // Emetti evento per notificare il cambio lingua
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: lang } 
    }));
  };
  
  const t = privacyTranslations[language];
  const footerT = translations[language];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t.backToHome}
          </Link>

          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <button
              onClick={() => changeLanguage('en')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                language === 'en' 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('it')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                language === 'it' 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              IT
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-gray-600 mb-8">{t.lastUpdated}: {new Date().toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.section1.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t.section1.content1}</p>
              <p className="text-gray-700 leading-relaxed">{t.section1.content2}</p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.section2.title}</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{t.section2.subtitle1}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{t.section2.content1}</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                {t.section2.list1.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">{t.section2.subtitle2}</h3>
              <p className="text-gray-700 leading-relaxed">{t.section2.content2}</p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.section3.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t.section3.content}</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {t.section3.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.section4.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t.section4.content1}</p>
              <p className="text-gray-700 leading-relaxed mb-4">{t.section4.content2}</p>
              <p className="text-gray-700 leading-relaxed">
                {t.section4.content3}{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">
                  {t.section4.linkText}
                </a>
                .
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.section5.title}</h2>
              <p className="text-gray-700 leading-relaxed">{t.section5.content}</p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.section6.title}</h2>
              <p className="text-gray-700 leading-relaxed">{t.section6.content}</p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.section7.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t.section7.content}</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                {t.section7.rights.map((right, index) => (
                  <li key={index}>
                    <strong>{right.title}</strong> {right.desc}
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.section8.title}</h2>
              <p className="text-gray-700 leading-relaxed">{t.section8.content}</p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.section9.title}</h2>
              <p className="text-gray-700 leading-relaxed">{t.section9.content}</p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.section10.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{t.section10.content}</p>
              <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                <p>{t.section10.email}</p>
                <p>{t.section10.website}</p>
              </div>
            </section>
          </div>
        </div> 
      </main>

      {/* Footer */}
      <Footer translations={footerT} />
    </div>
  );
}