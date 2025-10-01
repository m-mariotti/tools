'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AdBanner({ 
  dataAdSlot, 
  dataAdFormat = 'auto',
  dataFullWidthResponsive = true,
  className = ''
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Inizializza l'annuncio quando il componente si monta o cambia pagina
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [pathname]); // Si ricarica quando cambia pagina

  // Non mostrare in development
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-500 font-medium">Ad Space (Development Mode)</p>
        <p className="text-xs text-gray-400 mt-2">Ads will appear here in production</p>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: 'block' }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive}
    />
  );
}