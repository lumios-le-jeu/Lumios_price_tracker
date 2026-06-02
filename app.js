// =====================================
// LUMIOS PRICE TRACKER – app.js
// =====================================

// ─────────────────────────────────────
// BASE DE DONNÉES DES PRIX
// À mettre à jour manuellement ou via une API future
// ─────────────────────────────────────
const PRICE_DATA = {
  lastUpdate: "2026-06-02",
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
        standard: 5.90,
        free_from: 50,
        pickup: null,
        pickupAvailable: false,
        note: "Port offert dès 50€"
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
        standard: 4.99,
        free_from: 49,
        pickup: 0.00,
        pickupAvailable: true,
        note: "Retrait magasin gratuit (Drive 1h)"
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
      basePrice: 39.90,
      shipping: {
        standard: 5.90,
        free_from: 59,
        pickup: null,
        pickupAvailable: false,
        note: "Port offert dès 59€"
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
    const shippingCost = store.shipping.standard || 0;
    const pickupCost = store.shipping.pickupAvailable ? (store.shipping.pickup || 0) : null;
    const totalDelivery = store.basePrice + shippingCost;
    const totalPickup = pickupCost !== null ? store.basePrice + pickupCost : null;
    const bestTotal = pickupCost !== null
      ? Math.min(totalDelivery, totalPickup)
      : totalDelivery;

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
  if (store.shippingCost === 0) {
    shippingDisplay = `<span class="amount free">GRATUIT</span>`;
  } else {
    shippingDisplay = `<span class="amount paid">+${fmt(store.shippingCost)}</span>`;
  }

  // Pickup display
  let pickupInfo = '';
  if (store.hasPickup) {
    pickupInfo = `<br><span class="amount pickup">ou retrait gratuit 🏪</span>`;
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
  document.getElementById('lastUpdateDate').textContent = d.toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
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
// REFRESH (SIMULATION)
// ─────────────────────────────────────
function refreshData() {
  const btn = document.getElementById('refreshBtn');
  btn.style.opacity = '0.6';
  btn.style.pointerEvents = 'none';

  // Simuler un chargement
  const tbody = document.getElementById('tableBody');
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    row.style.opacity = '0.4';
    row.style.transition = 'opacity 0.3s';
  });

  setTimeout(() => {
    // Dans une vraie app, on ferait un fetch() ici
    rows.forEach(row => { row.style.opacity = '1'; });
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
    showToast('✅ Données à jour !');
  }, 1200);
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
  style.textContent = `@keyframes slideUp { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }`;
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
  computedStores = computeStorePrices();
  updateStats();
  renderTable();
}

document.addEventListener('DOMContentLoaded', init);
