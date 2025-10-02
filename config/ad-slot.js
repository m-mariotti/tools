/**
 * Configurazione centralizzata degli Ad Slots per Google AdSense
 * 
 * IMPORTANTE: Sostituisci i placeholder con i tuoi veri Slot ID da Google AdSense!
 * 
 * Come trovare gli Slot ID:
 * 1. Vai su https://adsense.google.com
 * 2. Vai su Annunci > Panoramica
 * 3. Clicca su "Per unità pubblicitaria"
 * 4. Copia l'ID dello slot (numero a 10 cifre)
 */

export const adSlots = {
  // ===== HOME PAGE =====
  home: {
    // Banner sopra i tools (728x90 o responsive)
    topBanner: process.env.NEXT_PUBLIC_AD_HOME_TOP || 'XXXXXXXXXX',
    
    // Banner nella griglia dei tools (ogni 3 tools)
    gridBanner: process.env.NEXT_PUBLIC_AD_HOME_GRID || 'YYYYYYYYYY',
    
    // Banner in fondo alla pagina (728x90 o responsive)
    bottomBanner: process.env.NEXT_PUBLIC_AD_HOME_BOTTOM || 'ZZZZZZZZZZ'
  },

  // ===== TOOLS PAGES (Investment, Future tools, etc.) =====
  tools: {
    // Banner orizzontale in alto (728x90 o responsive)
    top: process.env.NEXT_PUBLIC_AD_TOOLS_TOP || '1234567890',
    
    // Sidebar sinistra (160x600 o 300x600) - Sticky
    left: process.env.NEXT_PUBLIC_AD_TOOLS_LEFT || '2345678901',
    
    // Sidebar destra (160x600 o 300x600) - Sticky
    right: process.env.NEXT_PUBLIC_AD_TOOLS_RIGHT || '3456789012',
    
    // Banner orizzontale in basso (728x90 o responsive)
    bottom: process.env.NEXT_PUBLIC_AD_TOOLS_BOTTOM || '4567890123'
  },

  // ===== POLICY PAGES (Privacy, Cookie, Terms, Contact) =====
  policy: {
    // Banner in alto nelle pagine policy
    top: process.env.NEXT_PUBLIC_AD_POLICY_TOP || '5678901234',
    
    // Banner in fondo nelle pagine policy
    bottom: process.env.NEXT_PUBLIC_AD_POLICY_BOTTOM || '6789012345'
  }
};

/**
 * Configurazione dei formati degli annunci
 */
export const adFormats = {
  // Formati orizzontali
  leaderboard: {
    format: 'horizontal',
    sizes: '728x90',
    description: 'Banner orizzontale standard'
  },
  
  // Formati verticali
  skyscraper: {
    format: 'vertical',
    sizes: '160x600',
    description: 'Skyscraper verticale standard'
  },
  
  wideSkyscraper: {
    format: 'vertical',
    sizes: '300x600',
    description: 'Wide skyscraper verticale'
  },
  
  // Responsive
  responsive: {
    format: 'auto',
    sizes: 'responsive',
    description: 'Si adatta automaticamente allo spazio disponibile'
  }
};

/**
 * Helper per verificare se gli Ad Slots sono configurati
 */
export const validateAdSlots = () => {
  const issues = [];
  
  // Verifica Home
  if (adSlots.home.topBanner === 'XXXXXXXXXX') {
    issues.push('Home Top Banner non configurato');
  }
  if (adSlots.home.gridBanner === 'YYYYYYYYYY') {
    issues.push('Home Grid Banner non configurato');
  }
  if (adSlots.home.bottomBanner === 'ZZZZZZZZZZ') {
    issues.push('Home Bottom Banner non configurato');
  }
  
  // Verifica Tools
  if (adSlots.tools.top === '1234567890') {
    issues.push('Tools Top Banner non configurato');
  }
  if (adSlots.tools.left === '2345678901') {
    issues.push('Tools Left Sidebar non configurato');
  }
  if (adSlots.tools.right === '3456789012') {
    issues.push('Tools Right Sidebar non configurato');
  }
  if (adSlots.tools.bottom === '4567890123') {
    issues.push('Tools Bottom Banner non configurato');
  }
  
  // Verifica Policy
  if (adSlots.policy.top === '5678901234') {
    issues.push('Policy Top Banner non configurato');
  }
  if (adSlots.policy.bottom === '6789012345') {
    issues.push('Policy Bottom Banner non configurato');
  }
  
  if (issues.length > 0) {
    console.warn('⚠️ AdSense Configuration Issues:');
    issues.forEach(issue => console.warn(`  - ${issue}`));
    console.warn('\n🔧 Per configurare gli Ad Slots:');
    console.warn('  1. Crea i tuoi Ad Units su Google AdSense');
    console.warn('  2. Aggiungi gli Slot ID nel file .env.local');
    console.warn('  3. Oppure modifica direttamente config/ad-slots.js\n');
  } else {
    console.log('✅ Tutti gli Ad Slots sono configurati correttamente');
  }
  
  return issues.length === 0;
};

/**
 * Export default per compatibilità
 */
export default adSlots;