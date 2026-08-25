// French/English translation engine
const translations = {
  'Voir le Menu': 'View Menu',
  "Retour à l'accueil": 'Back to Home',
  'Bonamoussadi, Face Lion Gate': 'Bonamoussadi, Opposite Lion Gate',
  'Logpom - Carrefour Andem': 'Logpom - Andem Junction',
  'Grillades au feu de bois': 'Wood-Fire Grilling',
  'Bienvenue chez': 'Welcome to',
  'Des grillades savoureuses et généreuses, préparées avec passion. Retrouvez-nous à Bonamoussadi (Face Lion Gate) et à Logpom - Carrefour Andem.':
    'Tasty, generous grilled dishes, prepared with passion. Find us in Bonamoussadi (Opposite Lion Gate) and Logpom - Andem Junction.',
  'Contact': 'Contact',
  'Nos Adresses': 'Our Locations',
  'Suivez-nous': 'Follow Us',
  'Tous droits réservés.': 'All rights reserved.',
  'Notre Menu': 'Our Menu',
  'Rechercher un plat, une boisson...': 'Search a dish, a drink...',
  'Aucun résultat trouvé. Essayez un autre mot-clé.': 'No results found. Try another keyword.',
  'Poulet': 'Chicken',
  'Viande de Bœuf & Mouton': 'Beef & Mutton',
  'Poisson': 'Fish',
  'Accompagnement': 'Side Dish',
  'Jus Naturelle': 'Fresh Juice',
  'Smoothies Mix': 'Smoothies',
  'Jus Détoxbio': 'Detox Juice',
  'Milkshakes': 'Milkshakes',
  'Boissons Classiques & Bières': 'Classic Drinks & Beers',
  'Boissons Chaudes': 'Hot Drinks',
  'Menu': 'Menu',
  'Servi avec accompagnement': 'Served with a side',
  'Frites & Riz': 'Fries & Rice',
  'Nos Boissons': 'Our Drinks',
  'Entier': 'Whole',
  'Demi': 'Half',
  'Braisé': 'Grilled',
  'Petit': 'Small',
  'Grand': 'Large',
  'Poulet Mayo': 'Chicken Mayo',
  'Poulet Yassa': 'Chicken Yassa',
  'Poulet DG': 'Chicken DG',
  'Poulet Pané': 'Breaded Chicken',
  'Poulet Braisé': 'Grilled Chicken',
  'Viande de Bœuf Braisé (Soya)': 'Grilled Beef (Soya Style)',
  "Viande de Bœuf Cuit à l'Étouffé": 'Slow-Cooked Beef',
  'Viande de Mouton Braisée': 'Grilled Mutton',
  'Sauté de Patte et Gésiers de Poulet (20 pattes, 10 gésiers)':
    'Sautéed Chicken Feet & Gizzards (20 feet, 10 gizzards)',
  'Shawarma': 'Shawarma',
  'Shawarma au Fromage': 'Cheese Shawarma',
  'Boyaux de Mouton': 'Mutton Tripe',
  'Bar': 'Sea Bass',
  'Carpe': 'Carp',
  'Maquereau': 'Mackerel',
  'Silule': 'Silule (Catfish)',
  'Plantains': 'Plantains',
  'Pommes': 'Potato Fries',
  'Bobolo': 'Bobolo',
  'Fried Rice': 'Fried Rice',
  'Une sélection de jus frais pressés au choix : Orange, Ananas, Gingembre, Cassimango, Papaye, Pastèque, Mangue, Passion, Pomme, Citron, Carotte...':
    'A selection of fresh pressed juices to choose from: Orange, Pineapple, Ginger, Cassimango, Papaya, Watermelon, Mango, Passion Fruit, Apple, Lemon, Carrot...',
  'Folére': 'Folére',
  'Ananas & Mangue': 'Pineapple & Mango',
  'Ananas & Passion': 'Pineapple & Passion Fruit',
  'Ananas & Papaye': 'Pineapple & Papaya',
  'Mélange au Choix': 'Mix of Your Choice',
  'Fruits de Saison': 'Seasonal Fruits',
  'Ananas - Concombre - Pomme': 'Pineapple - Cucumber - Apple',
  'Ananas - Gingembre - Citron': 'Pineapple - Ginger - Lemon',
  'Milkshake': 'Milkshake',
  'Menthe au Lait': 'Mint Milk',
  'Sirop de Menthe': 'Mint Syrup',
  'Coca-Cola (canette)': 'Coca-Cola (can)',
  'Fanta (canette)': 'Fanta (can)',
  'Sprite (canette)': 'Sprite (can)',
  'Eau Minérale': 'Mineral Water',
  'Malta': 'Malta',
  'Guinness': 'Guinness',
  'Ice': 'Ice',
  'Heineken': 'Heineken',
  'Redbull': 'Redbull',
  'Booster (canette)': 'Booster (can)',
  'Bavaria': 'Bavaria',
  'Beaufort Lager': 'Beaufort Lager',
  'Beaufort Light': 'Beaufort Light',
  'Castel': 'Castel',
  'Castle Milk Stout': 'Castle Milk Stout',
  'Mutzig': 'Mutzig',
  '33 Export': '33 Export',
  'Skøll': 'Skøll',
  'Guinness Smooth': 'Guinness Smooth',
  'Kadji Beer': 'Kadji Beer',
  'Manyan': 'Manyan',
  'Chill Citron': 'Chill Citron',
  'Thé': 'Tea',
  'Chaï': 'Chai Tea',
  'Café': 'Coffee',
  'Photo à venir': 'Photo coming soon',
  'Votre Panier': 'Your Cart',
  'Votre panier est vide.': 'Your cart is empty.',
  'Vider le panier': 'Clear Cart',
  'Commander Maintenant': 'Order Now',
  'Total': 'Total',
  'Commander': 'Order',
  'Voir': 'View',
  'Ajouter au panier pour commander': 'Add to Cart to Order',
  'Ajouté ✓': 'Added ✓',
  'Bonjour Alex Braise, je voudrais commander :': 'Hello Alex Braise, I would like to order:',
};

let currentLang = 'fr';

const t = (frText) => (currentLang === 'en' ? (translations[frText] || frText) : frText);

const I18N_SELECTORS = [
  '.eyebrow',
  '.hero-inner p',
  '.i18n-plain',
  '.nav-actions .btn-primary',
  '.btn-liquid-label',
  '.location-item span',
  '.footer-col h3',
  '.footer-address span',
  '.menu-banner h1',
  '.menu-shortcuts a',
  '#menu-no-results',
  '.section-heading h2',
  '.section-heading-sub h3',
  '.section-sub',
  '.menu-card-tag',
  '.menu-card-body h3',
  '.menu-card-photo span',
  '.drink-paragraph',
  '#cart-title',
  '#cart-empty',
  '#cart-clear',
  '.whatsapp-float span',
  '.btn-voir',
  '.btn-add-cart',
].join(', ');

const applyLanguage = () => {
  document.documentElement.lang = currentLang;

  document.querySelectorAll(I18N_SELECTORS).forEach((el) => {
    if (!el.dataset.fr) el.dataset.fr = el.textContent.trim();
    el.textContent = t(el.dataset.fr);
  });

  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) {
    if (!searchInput.dataset.fr) searchInput.dataset.fr = searchInput.placeholder;
    searchInput.placeholder = t(searchInput.dataset.fr);
  }

  document.querySelectorAll('.lang-toggle').forEach((btn) => {
    btn.textContent = currentLang === 'en' ? 'Français' : 'English';
  });
};

const toggleLanguage = () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  applyLanguage();
};

// Auto-update footer copyright year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Add shadow to header once the page is scrolled
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// Live search across the menu page
const menuSearchInput = document.getElementById('menu-search-input');
if (menuSearchInput) {
  const normalize = (text) =>
    text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const noResultsEl = document.getElementById('menu-no-results');
  const cards = Array.from(document.querySelectorAll('.menu-card'));
  const grids = Array.from(document.querySelectorAll('.menu-grid'));
  const sections = Array.from(document.querySelectorAll('.menu-section'));

  menuSearchInput.addEventListener('input', () => {
    const query = normalize(menuSearchInput.value.trim());
    let visibleCount = 0;

    cards.forEach((card) => {
      const text = normalize(card.textContent);
      const matches = query === '' || text.includes(query);
      card.classList.toggle('is-hidden', !matches);
      if (matches) visibleCount++;
    });

    grids.forEach((grid) => {
      const hasVisibleCard = grid.querySelector('.menu-card:not(.is-hidden)');
      grid.classList.toggle('is-hidden', !hasVisibleCard);
      const heading = grid.previousElementSibling;
      if (heading && heading.classList.contains('section-heading')) {
        heading.classList.toggle('is-hidden', !hasVisibleCard);
      }
    });

    sections.forEach((section) => {
      const hasVisibleGrid = section.querySelector('.menu-grid:not(.is-hidden)');
      section.classList.toggle('is-hidden', !hasVisibleGrid);
    });

    if (noResultsEl) noResultsEl.hidden = visibleCount !== 0;
  });
}

// "Voir" button on every menu item, opening an enlarged preview modal
const menuModal = document.getElementById('menu-modal');
if (menuModal) {
  document.querySelectorAll('.menu-card-body').forEach((body) => {
    const voirBtn = document.createElement('button');
    voirBtn.type = 'button';
    voirBtn.className = 'btn-voir';
    voirBtn.textContent = 'Voir';
    body.appendChild(voirBtn);

    const cartBtn = document.createElement('button');
    cartBtn.type = 'button';
    cartBtn.className = 'btn-add-cart';
    cartBtn.textContent = 'Ajouter au panier pour commander';
    body.appendChild(cartBtn);
  });

  const modalPhoto = document.getElementById('menu-modal-photo');
  const modalTag = document.getElementById('menu-modal-tag');
  const modalTitle = document.getElementById('menu-modal-title');
  const modalPrice = document.getElementById('menu-modal-price');
  const modalDesc = document.getElementById('menu-modal-desc');

  const openMenuModal = (card) => {
    const photo = card.querySelector('.menu-card-photo');
    const tag = card.querySelector('.menu-card-tag');
    const title = card.querySelector('h3');
    const price = card.querySelector('.menu-card-price');
    const desc = card.querySelector('.drink-paragraph');

    modalPhoto.innerHTML = photo ? photo.innerHTML : '';
    modalTag.textContent = tag ? tag.textContent : '';
    modalTitle.textContent = title ? title.textContent : '';
    modalPrice.textContent = price ? price.textContent : '';
    modalDesc.textContent = desc ? desc.textContent : '';

    menuModal.classList.add('is-open');
    menuModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeMenuModal = () => {
    menuModal.classList.remove('is-open');
    menuModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  document.addEventListener('click', (e) => {
    const voirBtn = e.target.closest('.btn-voir');
    const photo = e.target.closest('.menu-card-photo');
    if (voirBtn || photo) {
      const card = (voirBtn || photo).closest('.menu-card');
      if (card) openMenuModal(card);
      return;
    }
    if (e.target.closest('[data-modal-close]')) {
      closeMenuModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal.classList.contains('is-open')) {
      closeMenuModal();
    }
  });
}

// Shopping cart: add items, view/remove in a popup, order via WhatsApp
const cartModal = document.getElementById('cart-modal');
if (cartModal) {
  const CART_KEY = 'alexbraise_cart';
  const WHATSAPP_NUMBER = '237682122185';

  const loadCart = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
      return [];
    }
  };

  const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

  const parsePrice = (text) => {
    const match = text.replace(/\s/g, '').match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const formatPrice = (n) => n.toLocaleString('fr-FR') + ' FCFA';

  const cartBadge = document.getElementById('cart-badge');
  const cartItemsEl = document.getElementById('cart-items');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartTotalEl = document.getElementById('cart-total');
  const cartOrderBtn = document.getElementById('cart-order');

  const updateBadge = () => {
    const count = loadCart().reduce((sum, item) => sum + item.qty, 0);
    if (count > 0) {
      cartBadge.textContent = count;
      cartBadge.hidden = false;
    } else {
      cartBadge.hidden = true;
    }
  };

  const renderCart = () => {
    const cart = loadCart();
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
      cartEmptyEl.hidden = false;
      cartOrderBtn.classList.add('is-disabled');
    } else {
      cartEmptyEl.hidden = true;
      cartOrderBtn.classList.remove('is-disabled');

      cart.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'cart-item';

        const nameEl = document.createElement('span');
        nameEl.className = 'cart-item-name';
        nameEl.textContent = item.qty > 1 ? `${item.name} x${item.qty}` : item.name;

        const priceEl = document.createElement('span');
        priceEl.className = 'cart-item-price';
        priceEl.textContent = formatPrice(item.price * item.qty);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'cart-item-remove';
        removeBtn.setAttribute('aria-label', 'Retirer cet article');
        removeBtn.dataset.removeIndex = String(index);
        removeBtn.innerHTML = '&times;';

        row.append(nameEl, priceEl, removeBtn);
        cartItemsEl.appendChild(row);
      });
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartTotalEl.textContent = formatPrice(total);

    const lines = [t('Bonjour Alex Braise, je voudrais commander :'), ''];
    cart.forEach((item) => {
      lines.push(`- ${item.name} x${item.qty} : ${formatPrice(item.price * item.qty)}`);
    });
    lines.push('', `${t('Total')} : ${formatPrice(total)}`);
    cartOrderBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;

    updateBadge();
  };

  const addToCart = (name, price) => {
    const cart = loadCart();
    const existing = cart.find((item) => item.name === name);
    if (existing) existing.qty += 1;
    else cart.push({ name, price, qty: 1 });
    saveCart(cart);
    renderCart();
  };

  const removeFromCart = (index) => {
    const cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  };

  const clearCart = () => {
    saveCart([]);
    renderCart();
  };

  const openCart = () => {
    renderCart();
    cartModal.classList.add('is-open');
    cartModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  };

  const closeCart = () => {
    cartModal.classList.remove('is-open');
    cartModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  };

  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.btn-add-cart');
    if (addBtn) {
      const card = addBtn.closest('.menu-card');
      if (card) {
        const tag = card.querySelector('.menu-card-tag');
        const title = card.querySelector('h3');
        const priceEl = card.querySelector('.menu-card-price');
        const name = tag ? `${title.textContent} (${tag.textContent})` : title.textContent;
        const price = parsePrice(priceEl ? priceEl.textContent : '0');
        addToCart(name, price);

        addBtn.classList.add('is-added');
        addBtn.textContent = t('Ajouté ✓');
        setTimeout(() => {
          addBtn.classList.remove('is-added');
          addBtn.textContent = t('Ajouter au panier pour commander');
        }, 1200);
      }
      return;
    }

    if (e.target.closest('#cart-float')) {
      openCart();
      return;
    }

    if (e.target.closest('[data-cart-close]')) {
      closeCart();
      return;
    }

    if (e.target.closest('#cart-clear')) {
      clearCart();
      return;
    }

    const removeBtn = e.target.closest('.cart-item-remove');
    if (removeBtn) {
      removeFromCart(parseInt(removeBtn.dataset.removeIndex, 10));
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal.classList.contains('is-open')) {
      closeCart();
    }
  });

  updateBadge();
}

// Language toggle: wire the button(s) and run the initial pass now that
// every dynamically-created element (Voir / Ajouter au panier buttons) exists
document.querySelectorAll('.lang-toggle').forEach((btn) => {
  btn.addEventListener('click', toggleLanguage);
});
applyLanguage();
