/**
 * Configurazione AdSense - I tuoi 4 banner
 */

export const adSlots = {
  // ===== HOME PAGE =====
  home: {
    topBanner: '2829281922',      // Banner TOP sopra i tools
    gridBanner: '2829281922',     // Banner nella griglia (riusa TOP)
    bottomBanner: '1843503316'    // Banner BOTTOM in fondo
  },

  // ===== TOOLS PAGES =====
  tools: {
    top: '2829281922',      // Banner TOP orizzontale
    left: '9524899820',     // Sidebar LEFT
    right: '7890036914',    // Sidebar RIGHT
    bottom: '1843503316'    // Banner BOTTOM orizzontale
  },

  // ===== POLICY PAGES =====
  policy: {
    top: '2829281922',      // Banner TOP
    bottom: '1843503316'    // Banner BOTTOM
  }
};

/**
 * Publisher ID
 */
export const adsenseId = 'ca-pub-6354488123983671';

/**
 * Helper per verificare la configurazione
 */
export const validateAdSlots = () => {
  console.log('✅ AdSense configurato con 4 banner:');
  console.log('  - Banner TOP:', adSlots.home.topBanner);
  console.log('  - Banner BOTTOM:', adSlots.home.bottomBanner);
  console.log('  - Banner LEFT:', adSlots.tools.left);
  console.log('  - Banner RIGHT:', adSlots.tools.right);
  return true;
};

export default adSlots;