'use client'
import { ArrowLeft, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import AdBanner from './AdBanner';
import Footer from './Footer';

/**
 * Template Layout per le pagine dei tools con banner pubblicitari ottimizzati
 * 
 * Posizionamento strategico degli annunci:
 * - Sidebar sinistra: Skyscraper verticale (160x600 o 300x600)
 * - Sidebar destra: Skyscraper verticale (160x600 o 300x600)
 * - Banner superiore: Leaderboard (728x90 o responsive)
 * - Banner inferiore: Leaderboard (728x90 o responsive)
 * 
 * Uso:
 * <ToolPageLayout
 *   title="Investment Calculator"
 *   icon={TrendingUpIcon}
 *   iconBgColor="bg-emerald-500"
 *   language={language}
 *   changeLanguage={changeLanguage}
 *   backText="Back to Home"
 * >
 *   {/* Contenuto del tool *}
 * </ToolPageLayout>
 */

export default function ToolPageLayout({
  children,
  title,
  subtitle,
  icon: Icon,
  iconBgColor = 'bg-indigo-600',
  language = 'en',
  changeLanguage,
  backText = 'Back to Home',
  backHref = '/',
  footerTranslations,
  // Configurazione Ad Slots
  topAdSlot = 'TOP_BANNER_SLOT',
  leftAdSlot = 'LEFT_SIDEBAR_SLOT',
  rightAdSlot = 'RIGHT_SIDEBAR_SLOT',
  bottomAdSlot = 'BOTTOM_BANNER_SLOT',
  showTopAd = true,
  showLeftAd = true,
  showRightAd = true,
  showBottomAd = true
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link 
            href={backHref}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {backText}
          </Link>

          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <button
              onClick={() => changeLanguage?.('en')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                language === 'en' 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage?.('it')}
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

      {/* Top Banner Ad - Sopra il contenuto */}
      {showTopAd && (
        <section className="max-w-7xl mx-auto px-6 pt-6">
          <AdBanner 
            dataAdSlot={topAdSlot}
            dataAdFormat="horizontal"
            className="min-h-[90px] md:min-h-[90px]"
          />
        </section>
      )}

      {/* Main Content con Sidebar Ads */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6 relative">
          {/* Left Sidebar Ad - Fisso durante lo scroll */}
          {showLeftAd && (
            <aside className="hidden xl:block w-[160px] flex-shrink-0">
              <div className={`${isScrolled ? 'fixed top-20' : 'relative'} transition-all duration-200`}>
                <AdBanner 
                  dataAdSlot={leftAdSlot}
                  dataAdFormat="vertical"
                  className="min-h-[600px] w-[160px]"
                />
              </div>
            </aside>
          )}

          {/* Contenuto Principale */}
          <div className="flex-1 min-w-0">
            {/* Tool Header */}
            {(title || Icon) && (
              <div className="text-center mb-12">
                {Icon && (
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${iconBgColor} rounded-2xl mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                )}
                {title && (
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xl text-gray-600">{subtitle}</p>
                )}
              </div>
            )}

            {/* Contenuto del Tool */}
            {children}
          </div>

          {/* Right Sidebar Ad - Fisso durante lo scroll */}
          {showRightAd && (
            <aside className="hidden xl:block w-[160px] flex-shrink-0">
              <div className={`${isScrolled ? 'fixed top-20' : 'relative'} transition-all duration-200`}>
                <AdBanner 
                  dataAdSlot={rightAdSlot}
                  dataAdFormat="vertical"
                  className="min-h-[600px] w-[160px]"
                />
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* Bottom Banner Ad - Sotto il contenuto */}
      {showBottomAd && (
        <section className="max-w-7xl mx-auto px-6 pb-8">
          <AdBanner 
            dataAdSlot={bottomAdSlot}
            dataAdFormat="horizontal"
            className="min-h-[90px] md:min-h-[90px]"
          />
        </section>
      )}

      {/* Footer */}
      {footerTranslations && <Footer translations={footerTranslations} />}
    </div>
  );
}