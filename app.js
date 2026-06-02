// =====================================
// LUMIOS PRICE TRACKER – app.js
// =====================================

// ─────────────────────────────────────
// BASE DE DONNÉES DES PRIX
// À mettre à jour manuellement ou via une API future
// ─────────────────────────────────────
const PRICE_DATA = {
  lastUpdate: "2026-06-02T10:30:00",
  threshold: 40.00, // Seuil d'alerte en €
  stores: [
    {
      id: "antretemps",
      name: "L'Antre des Temps",
      domain: "antretemps.com",
      emoji: "🏪",
      type: "specialist",
      basePrice: 34.99,
      shipping: {
        standard: 7.00,
        pickup: 0.00,
        pickupAvailable: true,
        note: "Port offert en retrait magasin"
      },
      url: "https://www.antretemps.com/lumios-gigamic/",
      promo: true,
      promoNote: "Prix promo (affiché sur Google : 34,99€ + 7€ port — mais retrait GRATUIT !)"
    },
    {
      id: "espritjeu",
      name: "Esprit Jeu",
      domain: "espritjeu.com",
      emoji: "🎲",
      type: "specialist",
      basePrice: 39.23,
      shipping: {
        standard: 4.90,
        free_from: 69,
        pickup: null,
        pickupAvailable: false,
        note: "Port offert dès 69€"
      },
      url: "https://www.espritjeu.com/",
      promo: false,
      promoNote: null
    },
    {
      id: "philibert",
      name: "Philibert",
      domain: "philibertnet.com",
      emoji: "♟️",
      type: "specialist",
      basePrice: 39.23,
      shipping: {
        standard: 1.95,
        free_from: 60,
        pickup: null,
        pickupAvailable: false,
        note: "Frais de port 1,95€ (offert dès 60€)"
      },
      url: "https://www.philibertnet.com/",
      promo: false,
      promoNote: null
    },
    {
      id: "fairplay",
      name: "Fairplay Jeux",
      domain: "fairplay-jeux.com",
      emoji: "🃏",
      type: "specialist",
      basePrice: 39.90,
      shipping: {
        standard: 4.90,
        free_from: 50,
        pickup: null,
        pickupAvailable: false,
        note: "Port offert dès 50€"
      },
      url: "https://www.fairplay-jeux.com/",
      promo: false,
      promoNote: null
    },
    {
      id: "monsieurde",
      name: "Monsieur Dé",
      domain: "monsieurde.com",
      emoji: "🎯",
      type: "specialist",
      basePrice: 39.90,
      shipping: {
        standard: 4.95,
        free_from: 65,
        pickup: null,
        pickupAvailable: false,
        note: "Port offert dès 65€"
      },
      url: "https://www.monsieurde.com/",
      promo: false,
      promoNote: null
    },
    {
      id: "playin",
      name: "Play-in",
      domain: "play-in.com",
      emoji: "🕹️",
      type: "specialist",
      basePrice: 39.90,
      shipping: {
        standard: 1.90,
        free_from: 50,
        pickup: 0.00,
        pickupAvailable: true,
        note: "Relais 1,90€ / Port offert dès 50€ / Retrait gratuit"
      },
      url: "https://www.play-in.com/",
      promo: false,
      promoNote: null
    },
    {
      id: "joueclub",
      name: "JouéClub",
      domain: "joueclub.fr",
      emoji: "🧸",
      type: "general",
      basePrice: 39.99,
      shipping: {
        standard: null,
        free_from: null,
        pickup: 0.00,
        pickupAvailable: true,
        note: "Retrait magasin gratuit (Indisponible en livraison)"
      },
      url: "https://www.joueclub.fr/",
      promo: false,
      promoNote: null
    },
    {
      id: "cultura",
      name: "Cultura",
      domain: "cultura.com",
      emoji: "🖼️",
      type: "general",
      basePrice: 39.99,
      shipping: {
        standard: 4.99,
        free_from: 30,
        pickup: 0.00,
        pickupAvailable: true,
        note: "Retrait magasin gratuit"
      },
      url: "https://www.cultura.com/",
      promo: false,
      promoNote: null
    },
    {
      id: "fnac",
      name: "Fnac",
      domain: "fnac.com",
      emoji: "📦",
      type: "general",
      basePrice: 39.99,
      shipping: {
        standard: 3.99,
        free_from: 25,
        pickup: 0.00,
        pickupAvailable: true,
        note: "Retrait magasin gratuit (ou livraison offerte dès 25€ selon vendeur)"
      },
      url: "https://www.fnac.com/",
      promo: false,
      promoNote: null
    },
    {
      id: "amazon",
      name: "Amazon",
      domain: "amazon.fr",
      emoji: "📫",
      type: "general",
      basePrice: 39.99,
      shipping: {
        standard: 0.00,
        free_from: 25,
        pickup: null,
        pickupAvailable: false,
        note: "Livraison gratuite (Prime ou dès 25€)"
      },
      url: "https://www.amazon.fr/s?k=lumios+gigamic",
      promo: false,
      promoNote: null
    },
    {
      id: "decompte",
      name: "Le Décompte",
      domain: "ledecompte.fr",
      emoji: "💰",
      type: "specialist",
      basePrice: 39.90,
      shipping: {
        standard: 5.50,
        free_from: 60,
        pickup: null,
        pickupAvailable: false,
        note: "Port offert dès 60€"
      },
      url: "https://www.ledecompte.fr/",
      promo: false,
      promoNote: null
    },
    {
      id: "poissondavril",
      name: "Boutique Poisson d'Avril",
      domain: "boutiquepoissondavril.com",
      emoji: "🐟",
      type: "specialist",
      basePrice: 40.20,
      shipping: {
        standard: 5.90,
        free_from: 80,
        pickup: 0.00,
        pickupAvailable: true,
        note: "Port offert dès 80€ / Retrait boutique"
      },
      url: "https://www.boutiquepoissondavril.com/",
      promo: false,
      promoNote: null
    }
  ]
};

// ─────────────────────────────────────
// ÉTAT DE L'APPLICATION
// ─────────────────────────────────────
let currentFilter = 'all';
let currentSort = 'total-asc';
let computedStores = [];

// ─────────────────────────────────────
// CALCUL DES PRIX
// ─────────────────────────────────────
function computeStorePrices() {
  return PRICE_DATA.stores.map(store => {
    const shippingCost = store.shipping.standard !== null && store.shipping.standard !== undefined ? store.shipping.standard : null;
    const pickupCost = store.shipping.pickupAvailable ? (store.shipping.pickup || 0) : null;
    
    const totalDelivery = shippingCost !== null ? store.basePrice + shippingCost : null;
    const totalPickup = pickupCost !== null ? store.basePrice + pickupCost : null;
    
    let bestTotal;
    if (totalDelivery !== null && totalPickup !== null) {
      bestTotal = Math.min(totalDelivery, totalPickup);
    } else if (totalDelivery !== null) {
      bestTotal = totalDelivery;
    } else if (totalPickup !== null) {
      bestTotal = totalPickup;
    } else {
      bestTotal = store.basePrice;
    }

    return {
      ...store,
      shippingCost,
      pickupCost,
      totalDelivery,
      totalPickup,
      bestTotal,
      isUnder40: bestTotal <= PRICE_DATA.threshold,
      isFreeShipping: shippingCost === 0,
      hasPickup: store.shipping.pickupAvailable
    };
  });
}

// ─────────────────────────────────────
// FORMAT PRIX
// ─────────────────────────────────────
function fmt(price) {
  if (price === null || price === undefined) return '—';
  return price.toFixed(2).replace('.', ',') + ' €';
}

// ─────────────────────────────────────
// BADGE STATUT
// ─────────────────────────────────────
function getStatusBadge(store) {
  const badges = [];

  if (store.bestTotal <= PRICE_DATA.threshold) {
    if (store.bestTotal === Math.min(...computedStores.map(s => s.bestTotal))) {
      badges.push(`<span class="badge badge--best">🏆 MEILLEUR PRIX</span>`);
    } else {
      badges.push(`<span class="badge badge--hot">🔥 BEST DEAL</span>`);
    }
  }

  if (store.hasPickup) {
    badges.push(`<span class="badge badge--pickup">🏪 RETRAIT GRATUIT</span>`);
  } else if (store.isFreeShipping) {
    badges.push(`<span class="badge badge--free">🚚 PORT OFFERT</span>`);
  } else if (!store.isUnder40) {
    badges.push(`<span class="badge badge--normal">💳 Standard</span>`);
  }

  if (store.promo) {
    badges.push(`<span class="badge badge--warning">🏷️ PROMO</span>`);
  }

  return badges.join('<br style="margin: 3px 0;" />');
}

// ─────────────────────────────────────
// RENDU D'UNE LIGNE
// ─────────────────────────────────────
function renderRow(store, index) {
  const rowClass = store.isUnder40 ? 'row--hot' : '';

  // Shipping display
  let shippingDisplay = '';
  if (store.shippingCost === null) {
    shippingDisplay = `<span class="amount no-shipping" style="color:var(--text-muted);font-size:12px;font-style:italic;">Pas de livraison</span>`;
  } else if (store.shippingCost === 0) {
    shippingDisplay = `<span class="amount free">GRATUIT</span>`;
  } else {
    shippingDisplay = `<span class="amount paid">+${fmt(store.shippingCost)}</span>`;
  }

  // Pickup display
  let pickupInfo = '';
  if (store.hasPickup) {
    if (store.shippingCost === null) {
      pickupInfo = `<br><span class="amount pickup">Retrait gratuit 🏪</span>`;
    } else {
      pickupInfo = `<br><span class="amount pickup">ou retrait gratuit 🏪</span>`;
    }
  }

  // Total color class
  let totalClass = 'normal';
  if (store.bestTotal === Math.min(...computedStores.map(s => s.bestTotal))) {
    totalClass = 'best';
  } else if (store.isUnder40) {
    totalClass = 'hot';
  }

  // Total display
  let totalDisplay = '';
  if (store.hasPickup && store.bestTotal === store.totalPickup) {
    totalDisplay = `
      <div class="price-total">
        <span class="amount ${totalClass}">${fmt(store.bestTotal)}</span>
        <br><span style="font-size:11px;color:var(--text-muted);">sans livraison (retrait)</span>
      </div>`;
  } else {
    totalDisplay = `
      <div class="price-total">
        <span class="amount ${totalClass}">${fmt(store.bestTotal)}</span>
        <br><span style="font-size:11px;color:var(--text-muted);">livré</span>
      </div>`;
  }

  const animDelay = `animation-delay: ${index * 0.04}s;`;

  return `
    <tr class="${rowClass}" style="${animDelay}" data-total="${store.bestTotal}" data-base="${store.basePrice}" data-name="${store.name}">
      <td>
        <div class="site-cell">
          <div class="site-favicon">
            <img src="https://www.google.com/s2/favicons?domain=${store.domain}&sz=32" alt="${store.name}" onerror="this.style.display='none'; this.parentElement.textContent='${store.emoji}'" />
          </div>
          <div>
            <div class="site-name">${store.name}</div>
            <div class="site-domain">${store.domain}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="type-badge type-badge--${store.type}">
          ${store.type === 'specialist' ? '🎲 Spécialisé' : '🏬 Généraliste'}
        </span>
      </td>
      <td class="price-base" style="text-align:center;">
        <span class="amount">${fmt(store.basePrice)}</span>
        ${store.promo ? '<br><span style="font-size:10px;color:var(--accent-orange);">PROMO</span>' : ''}
      </td>
      <td class="price-shipping" style="text-align:center;">
        ${shippingDisplay}
        ${pickupInfo}
        <br><span style="font-size:10px;color:var(--text-muted);">${store.shipping.note || ''}</span>
      </td>
      <td style="text-align:center;">${totalDisplay}</td>
      <td style="text-align:center;">${getStatusBadge(store)}</td>
      <td class="action-cell">
        <a href="${store.url}" target="_blank" rel="noopener" class="btn-visit" id="visit-${store.id}">
          Voir
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </a>
      </td>
    </tr>`;
}

// ─────────────────────────────────────
// FILTRAGE
// ─────────────────────────────────────
function getFilteredStores() {
  let stores = [...computedStores];

  if (currentFilter === 'under40') {
    stores = stores.filter(s => s.isUnder40);
  } else if (currentFilter === 'free') {
    stores = stores.filter(s => s.isFreeShipping || s.hasPickup);
  }

  // Sort
  if (currentSort === 'total-asc') {
    stores.sort((a, b) => a.bestTotal - b.bestTotal);
  } else if (currentSort === 'total-desc') {
    stores.sort((a, b) => b.bestTotal - a.bestTotal);
  } else if (currentSort === 'base-asc') {
    stores.sort((a, b) => a.basePrice - b.basePrice);
  } else if (currentSort === 'name-asc') {
    stores.sort((a, b) => a.name.localeCompare(b.name));
  }

  return stores;
}

// ─────────────────────────────────────
// RENDU DU TABLEAU
// ─────────────────────────────────────
function renderTable() {
  const tbody = document.getElementById('tableBody');
  const filtered = getFilteredStores();

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            <div class="empty-state-icon">🔍</div>
            <div class="empty-state-text">Aucun site ne correspond à ce filtre</div>
          </div>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((store, idx) => renderRow(store, idx)).join('');
}

// ─────────────────────────────────────
// MISE À JOUR DES STATS
// ─────────────────────────────────────
function updateStats() {
  const totals = computedStores.map(s => s.bestTotal);
  const minTotal = Math.min(...totals);
  const avgTotal = totals.reduce((a, b) => a + b, 0) / totals.length;
  const under40 = computedStores.filter(s => s.isUnder40);

  document.getElementById('bestPrice').textContent = fmt(minTotal);
  document.getElementById('avgPrice').textContent = fmt(avgTotal);
  document.getElementById('alertCount').textContent = under40.length;
  document.getElementById('siteCount').textContent = computedStores.length;
  document.getElementById('under40Count').textContent = under40.length;

  // Alert banner
  const banner = document.getElementById('alertBanner');
  const bannerText = document.getElementById('alertBannerText');
  if (under40.length > 0) {
    bannerText.textContent = under40.length;
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }

  // Last update
  const d = new Date(PRICE_DATA.lastUpdate);
  const dateStr = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
  document.getElementById('lastUpdateDate').textContent = `${dateStr} à ${timeStr}`;
}

// ─────────────────────────────────────
// FILTRES & TRI
// ─────────────────────────────────────
function setFilter(filter) {
  currentFilter = filter;
  // Update tabs
  ['all', 'under40', 'free'].forEach(id => {
    document.getElementById(`tab-${id}`).classList.toggle('active', id === filter);
  });
  renderTable();
}

function sortTable() {
  currentSort = document.getElementById('sortSelect').value;
  renderTable();
}

// ─────────────────────────────────────
// SCRAPING & PARSING
// ─────────────────────────────────────
function parsePrice(html) {
  const regex = /(\d{1,3})[.,](\d{2})\s*€/g;
  let match;
  let prices = [];
  while ((match = regex.exec(html)) !== null) {
    const val = parseFloat(match[1] + '.' + match[2]);
    if (val > 10 && val < 80) { // Filtre pour ignorer les prix aberrants
      prices.push(val);
    }
  }
  
  if (prices.length > 0) {
    const freq = {};
    let maxFreq = 0;
    let mostFreqPrice = prices[0];
    for (const p of prices) {
      freq[p] = (freq[p] || 0) + 1;
      if (freq[p] > maxFreq) {
        maxFreq = freq[p];
        mostFreqPrice = p;
      }
    }
    return mostFreqPrice;
  }
  return null;
}

async function fetchAndParsePrice(url) {
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    return parsePrice(data.contents);
  } catch(e) {
    return null;
  }
}

// ─────────────────────────────────────
// REFRESH (AUTOMATISÉ)
// ─────────────────────────────────────
async function refreshData() {
  const btn = document.getElementById('refreshBtn');
  if (btn.classList.contains('loading')) return;

  btn.style.opacity = '0.6';
  btn.style.pointerEvents = 'none';
  btn.classList.add('loading');

  const tbody = document.getElementById('tableBody');
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    row.style.opacity = '0.4';
    row.style.transition = 'opacity 0.3s';
  });

  showToast('🔄 Scraping des prix en cours...');

  let livePrices = {};
  try {
    livePrices = JSON.parse(localStorage.getItem('lumios_live_prices') || '{}');
  } catch(e) {}
  
  const promises = PRICE_DATA.stores.map(async store => {
    try {
      const price = await fetchAndParsePrice(store.url);
      if (price !== null) {
        store.basePrice = price;
        livePrices[store.id] = price;
      }
    } catch(e) {
      console.error("Erreur scraping " + store.id, e);
    }
  });

  await Promise.allSettled(promises);

  try {
    localStorage.setItem('lumios_live_prices', JSON.stringify(livePrices));
  } catch(e) {}
  
  const now = new Date();
  PRICE_DATA.lastUpdate = now.toISOString();

  computedStores = computeStorePrices();
  updateStats();
  renderTable();

  btn.style.opacity = '1';
  btn.style.pointerEvents = 'auto';
  btn.classList.remove('loading');
  showToast('✅ Tous les prix sont à jour !');
}

// ─────────────────────────────────────
// MODAL AJOUT MANUEL
// ─────────────────────────────────────
function openAddModal() {
  document.getElementById('addSiteModal').classList.add('active');
  document.getElementById('modalErrorBox').style.display = 'none';
  document.getElementById('modalLoading').style.display = 'none';
  document.getElementById('newSiteUrl').value = '';
}

function closeAddModal() {
  document.getElementById('addSiteModal').classList.remove('active');
}

async function validateAndAddSite() {
  const urlInput = document.getElementById('newSiteUrl').value.trim();
  const errorBox = document.getElementById('modalErrorBox');
  const loadingBox = document.getElementById('modalLoading');
  const confirmBtn = document.getElementById('confirmAddBtn');

  errorBox.style.display = 'none';

  if (!urlInput) {
    errorBox.textContent = 'Veuillez entrer une URL valide.';
    errorBox.style.display = 'block';
    return;
  }

  let domain = '';
  try {
    const urlObj = new URL(urlInput);
    domain = urlObj.hostname.replace('www.', '');
  } catch(e) {
    errorBox.textContent = 'URL invalide. Ex: https://www.boutique.com/...';
    errorBox.style.display = 'block';
    return;
  }

  if (PRICE_DATA.stores.some(s => s.domain === domain)) {
    errorBox.textContent = 'Ce site est déjà dans la liste !';
    errorBox.style.display = 'block';
    return;
  }

  loadingBox.style.display = 'flex';
  confirmBtn.disabled = true;

  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(urlInput)}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    const html = data.contents;

    if (!html) throw new Error("Impossible de lire la page");

    const htmlLower = html.toLowerCase();
    if (!htmlLower.includes('lumios')) {
      errorBox.textContent = 'Le mot "Lumios" n\'a pas été trouvé sur cette page. Êtes-vous sûr que c\'est le bon article ?';
      errorBox.style.display = 'block';
      loadingBox.style.display = 'none';
      confirmBtn.disabled = false;
      return;
    }

    const price = parsePrice(html);
    if (price === null) {
      errorBox.textContent = 'Impossible de détecter un prix sur cette page automatiquement.';
      errorBox.style.display = 'block';
      loadingBox.style.display = 'none';
      confirmBtn.disabled = false;
      return;
    }

    const shippingStr = document.getElementById('newSiteShipping').value;
    const freeFromStr = document.getElementById('newSiteFreeFrom').value;
    const hasPickup = document.getElementById('newSitePickup').checked;

    const shipping = parseFloat(shippingStr) || 0;
    const freeFrom = parseFloat(freeFromStr) || null;

    const newStore = {
      id: domain.replace(/[^a-z0-9]/g, ''),
      name: domain.charAt(0).toUpperCase() + domain.slice(1).split('.')[0],
      domain: domain,
      emoji: "🛒",
      type: "specialist",
      basePrice: price,
      shipping: {
        standard: shipping,
        free_from: freeFrom,
        pickup: hasPickup ? 0.00 : null,
        pickupAvailable: hasPickup,
        note: `Ajouté manuellement`
      },
      url: urlInput,
      promo: false,
      promoNote: null
    };

    PRICE_DATA.stores.push(newStore);
    
    try {
      const savedStores = JSON.parse(localStorage.getItem('lumios_custom_stores') || '[]');
      savedStores.push(newStore);
      localStorage.setItem('lumios_custom_stores', JSON.stringify(savedStores));
    } catch(e) {}

    computedStores = computeStorePrices();
    updateStats();
    renderTable();

    closeAddModal();
    showToast(`✅ ${newStore.name} ajouté avec succès !`);

  } catch(e) {
    errorBox.textContent = 'Erreur lors de l\'analyse du lien. Le site bloque peut-être notre proxy.';
    errorBox.style.display = 'block';
  }

  loadingBox.style.display = 'none';
  confirmBtn.disabled = false;
}

// ─────────────────────────────────────
// TOAST NOTIFICATION
// ─────────────────────────────────────
function showToast(msg) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    right: 32px;
    background: var(--bg-card);
    border: 1px solid var(--border-glow);
    color: var(--text-primary);
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    z-index: 9999;
    animation: slideUp 0.3s ease;
    font-family: var(--font-main);
  `;

  const style = document.createElement('style');
  style.textContent = '@keyframes slideUp { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }';
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ─────────────────────────────────────
// INIT
// ─────────────────────────────────────
function init() {
  try {
    const savedStores = localStorage.getItem('lumios_custom_stores');
    if (savedStores) {
      try {
        const parsed = JSON.parse(savedStores);
        parsed.forEach(s => {
          if (!PRICE_DATA.stores.find(ext => ext.id === s.id)) {
            PRICE_DATA.stores.push(s);
          }
        });
      } catch(e) {}
    }
    
    const savedPrices = localStorage.getItem('lumios_live_prices');
    if (savedPrices) {
      try {
        const parsedPrices = JSON.parse(savedPrices);
        PRICE_DATA.stores.forEach(s => {
          if (parsedPrices[s.id] !== undefined) {
            s.basePrice = parsedPrices[s.id];
          }
        });
      } catch(e) {}
    }
  } catch(e) {
    console.warn("Accès au localStorage bloqué (normal si ouvert via un fichier local double-cliqué)", e);
  }

  computedStores = computeStorePrices();
  updateStats();
  renderTable();
}

document.addEventListener('DOMContentLoaded', init);
