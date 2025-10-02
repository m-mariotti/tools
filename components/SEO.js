import Head from 'next/head';

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  structuredData
}) {
  const baseUrl = 'https://mariottimauro.eu';
  const fullTitle = title ? `${title} | Tools Portal` : 'Free Online Tools & Calculators | Tools Portal';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={`${baseUrl}${ogImage}`} />}
      <meta property="og:site_name" content="Tools Portal" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />}

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}
