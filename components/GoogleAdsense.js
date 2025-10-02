import Script from 'next/script';

export default function GoogleAdsense() {
  // Mostra gli annunci solo in produzione
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  // Debug: verifica che la variabile sia caricata
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  
  if (!adsenseId || adsenseId === 'undefined') {
    console.error('⚠️ ERRORE: NEXT_PUBLIC_ADSENSE_ID non configurato correttamente!');
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}