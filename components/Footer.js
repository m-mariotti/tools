'use client'
import Link from 'next/link';

export default function Footer({ translations }) {
  return (
    <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-500">
            {translations.footer.copyright}
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Link 
              href="/privacy-policy" 
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {translations.footer.privacyPolicy}
            </Link>
            <Link 
              href="/terms-of-service" 
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {translations.footer.termsOfService}
            </Link>
            <Link 
              href="/cookie-policy" 
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {translations.footer.cookiePolicy}
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
            >
              {translations.footer.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}