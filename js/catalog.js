(function () {
  "use strict";

  var shopGrid = document.getElementById("shopGrid");
  if (!shopGrid) return;

  var WHATSAPP_NUMBER = "5511912251681";
  var CART_KEY = "evstart_cart_v1";

  /* ---------- Ícones (SVG inline, zero requisições externas) ---------- */
  var STROKE = ' stroke="#c7cad2" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  var ACCENT = ' fill="#4d68ff"';

  var ICONS = {
    case: '<rect x="95" y="55" width="110" height="190" rx="26"' + STROKE + '/><circle cx="176" cy="80" r="7"' + ACCENT + '/>',
    shield: '<path d="M150 55 210 78v55c0 46-25 83-60 100-35-17-60-54-60-100V78z"' + STROKE + '/><path d="M120 150l20 18 40-46"' + STROKE + '/>',
    plug: '<rect x="118" y="55" width="64" height="85" rx="10"' + STROKE + '/><path d="M135 140v18a15 15 0 0 0 30 0v-18"' + STROKE + '/><path d="M150 158v52"' + STROKE + '/><path d="M138 85v18M162 85v18"' + STROKE + '/>',
    bolt: '<path d="M168 50 100 165h42l-18 85 96-120h-48z"' + ACCENT + '/>',
    wireless: '<rect x="75" y="185" width="150" height="14" rx="7"' + ACCENT + '/><circle cx="150" cy="118" r="48"' + STROKE + '/><path d="M150 92v48M130 112l20-20 20 20"' + STROKE + '/>',
    cable: '<path d="M85 105c30 0 30 40 65 40s35-40 65-40"' + STROKE + '/><rect x="62" y="93" width="28" height="22" rx="5"' + ACCENT + '/><rect x="210" y="93" width="28" height="22" rx="5"' + ACCENT + '/>',
    adapter: '<rect x="108" y="108" width="84" height="62" rx="10"' + STROKE + '/><path d="M128 108V82M172 108V82"' + STROKE + '/><path d="M128 170v26M172 170v26"' + STROKE + '/><circle cx="150" cy="139" r="10"' + ACCENT + '/>',
    headphones: '<path d="M83 168v-18a67 67 0 0 1 134 0v18"' + STROKE + '/><rect x="68" y="163" width="32" height="52" rx="13"' + STROKE + '/><rect x="200" y="163" width="32" height="52" rx="13"' + STROKE + '/>',
    earbuds: '<rect x="92" y="98" width="38" height="66" rx="18"' + STROKE + '/><rect x="170" y="98" width="38" height="66" rx="18"' + STROKE + '/><path d="M111 98c0-24 18-42 39-42"' + STROKE + '/><path d="M189 98c0-24-18-42-39-42"' + STROKE + '/>',
    speaker: '<rect x="92" y="78" width="116" height="144" rx="20"' + STROKE + '/><circle cx="150" cy="128" r="30"' + STROKE + '/><circle cx="150" cy="186" r="13"' + STROKE + '/>',
    watch: '<rect x="103" y="93" width="94" height="114" rx="22"' + STROKE + '/><path d="M128 93v-26h44v26M128 207v26h44v-26"' + STROKE + '/><circle cx="150" cy="150" r="4"' + ACCENT + '/>',
    battery: '<rect x="93" y="82" width="94" height="140" rx="14"' + STROKE + '/><rect x="123" y="60" width="34" height="22" rx="5"' + STROKE + '/><path d="M155 108l-24 40h22l-18 46 46-56h-24z"' + ACCENT + '/>',
    sdcard: '<path d="M100 65h68l32 32v138a10 10 0 0 1-10 10h-90a10 10 0 0 1-10-10V75a10 10 0 0 1 10-10z"' + STROKE + '/><path d="M118 65v34h64"' + STROKE + '/><path d="M118 130v55M138 130v55M158 130v55"' + STROKE + '/>',
    usbdrive: '<rect x="112" y="58" width="76" height="42" rx="8"' + STROKE + '/><rect x="132" y="100" width="36" height="122" rx="14"' + STROKE + '/><path d="M142 58v-14M158 58v-14"' + STROKE + '/>',
    stand: '<path d="M85 215h130"' + STROKE + '/><path d="M105 215 130 118h40l25 97"' + STROKE + '/><rect x="120" y="65" width="60" height="90" rx="10"' + STROKE + '/>',
    popsocket: '<circle cx="150" cy="112" r="46"' + STROKE + '/><path d="M150 158v60"' + STROKE + '/><ellipse cx="150" cy="226" rx="32" ry="10"' + STROKE + '/>',
    box: '<path d="M90 108 150 78 210 108v92l-60 30-60-30z"' + STROKE + '/><path d="M90 108l60 30 60-30"' + STROKE + '/><path d="M150 138v92"' + STROKE + '/>'
  };

  var imageCache = {};
  function productImageSrc(iconKey) {
    if (imageCache[iconKey]) return imageCache[iconKey];
    var inner = ICONS[iconKey] || ICONS.box;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">' +
      '<rect width="300" height="300" fill="#14171f"/>' +
      '<circle cx="150" cy="150" r="98" fill="rgba(43,71,255,0.14)"/>' +
      inner +
      '</svg>';
    var src = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
    imageCache[iconKey] = src;
    return src;
  }

  /* ---------- Categorias ---------- */
  var CATEGORIES = [
    { key: "capinhas", label: "Capinhas", icon: "case" },
    { key: "peliculas-vidro", label: "Películas de Vidro", icon: "shield" },
    { key: "peliculas-3d", label: "Películas 3D", icon: "shield" },
    { key: "peliculas-privacidade", label: "Películas de Privacidade", icon: "shield" },
    { key: "carregadores", label: "Carregadores", icon: "plug" },
    { key: "carregadores-turbo", label: "Carregadores Turbo", icon: "bolt" },
    { key: "carregadores-sem-fio", label: "Carregadores Sem Fio", icon: "wireless" },
    { key: "cabos-usb-c", label: "Cabos USB-C", icon: "cable" },
    { key: "cabos-lightning", label: "Cabos Lightning", icon: "cable" },
    { key: "cabos-micro-usb", label: "Cabos Micro USB", icon: "cable" },
    { key: "fontes", label: "Fontes", icon: "plug" },
    { key: "adaptadores", label: "Adaptadores", icon: "adapter" },
    { key: "fones-com-fio", label: "Fones com Fio", icon: "headphones" },
    { key: "fones-bluetooth", label: "Fones Bluetooth", icon: "earbuds" },
    { key: "caixas-de-som", label: "Caixas de Som Bluetooth", icon: "speaker" },
    { key: "smartwatches", label: "Smartwatches", icon: "watch" },
    { key: "power-banks", label: "Power Banks", icon: "battery" },
    { key: "cartoes-memoria", label: "Cartões de Memória", icon: "sdcard" },
    { key: "pen-drives", label: "Pen Drives", icon: "usbdrive" },
    { key: "suportes-celular", label: "Suportes para Celular", icon: "stand" },
    { key: "popsockets", label: "PopSockets", icon: "popsocket" },
    { key: "outros-acessorios", label: "Outros Acessórios", icon: "box" }
  ];

  /* ---------- Produtos (dados de exemplo — substituir por catálogo real) ---------- */
  var PRODUCTS = [
    { id: "p1", name: "Capinha Anti-Impacto iPhone 15", categoryKey: "capinhas", price: 39.9, badge: "novo" },
    { id: "p2", name: "Capinha Silicone Samsung Galaxy A54", categoryKey: "capinhas", price: 34.9 },
    { id: "p3", name: "Película de Vidro iPhone", categoryKey: "peliculas-vidro", price: 24.9 },
    { id: "p4", name: "Película de Vidro Samsung Galaxy", categoryKey: "peliculas-vidro", price: 22.9, oldPrice: 29.9, badge: "promo" },
    { id: "p5", name: "Película 3D Cerâmica Universal", categoryKey: "peliculas-3d", price: 34.9, bestseller: true },
    { id: "p6", name: "Película 3D Borda Preta iPhone", categoryKey: "peliculas-3d", price: 39.9 },
    { id: "p7", name: "Película de Privacidade iPhone", categoryKey: "peliculas-privacidade", price: 44.9 },
    { id: "p8", name: "Película de Privacidade Samsung", categoryKey: "peliculas-privacidade", price: 44.9, badge: "novo" },
    { id: "p9", name: "Carregador Padrão USB-C 20W", categoryKey: "carregadores", price: 39.9 },
    { id: "p10", name: "Carregador Padrão Duplo USB", categoryKey: "carregadores", price: 34.9 },
    { id: "p11", name: "Carregador Turbo 33W USB-C", categoryKey: "carregadores-turbo", price: 59.9, bestseller: true, featured: true },
    { id: "p12", name: "Carregador Turbo 65W GaN", categoryKey: "carregadores-turbo", price: 129.9, badge: "novo", featured: true },
    { id: "p13", name: "Carregador Sem Fio 15W", categoryKey: "carregadores-sem-fio", price: 79.9 },
    { id: "p14", name: "Base Carregadora Sem Fio 3 em 1", categoryKey: "carregadores-sem-fio", price: 149.9, oldPrice: 189.9, badge: "promo", featured: true },
    { id: "p15", name: "Cabo USB-C 1m Reforçado", categoryKey: "cabos-usb-c", price: 24.9 },
    { id: "p16", name: "Cabo USB-C para USB-C 2m", categoryKey: "cabos-usb-c", price: 32.9 },
    { id: "p17", name: "Cabo Lightning MFi 1m", categoryKey: "cabos-lightning", price: 34.9, bestseller: true },
    { id: "p18", name: "Cabo Lightning Reforçado 2m", categoryKey: "cabos-lightning", price: 44.9 },
    { id: "p19", name: "Cabo Micro USB 1m", categoryKey: "cabos-micro-usb", price: 19.9 },
    { id: "p20", name: "Cabo Micro USB Reforçado 2m", categoryKey: "cabos-micro-usb", price: 26.9 },
    { id: "p21", name: "Fonte Carregador 20W USB-C", categoryKey: "fontes", price: 44.9 },
    { id: "p22", name: "Fonte Carregador 2 Portas USB", categoryKey: "fontes", price: 39.9 },
    { id: "p23", name: "Adaptador USB-C para P2", categoryKey: "adaptadores", price: 29.9 },
    { id: "p24", name: "Adaptador Lightning para P2", categoryKey: "adaptadores", price: 34.9, badge: "novo" },
    { id: "p25", name: "Fone com Fio P2 Estéreo", categoryKey: "fones-com-fio", price: 19.9 },
    { id: "p26", name: "Fone com Fio USB-C", categoryKey: "fones-com-fio", price: 24.9 },
    { id: "p27", name: "Fone Bluetooth TWS Pro", categoryKey: "fones-bluetooth", price: 89.9, bestseller: true, featured: true },
    { id: "p28", name: "Fone Bluetooth Gamer", categoryKey: "fones-bluetooth", price: 99.9, oldPrice: 129.9, badge: "promo" },
    { id: "p29", name: "Caixa de Som Bluetooth Portátil", categoryKey: "caixas-de-som", price: 79.9 },
    { id: "p30", name: "Caixa de Som Bluetooth à Prova d'Água", categoryKey: "caixas-de-som", price: 119.9, badge: "novo" },
    { id: "p31", name: "Smartwatch Fitness Pro", categoryKey: "smartwatches", price: 149.9, bestseller: true },
    { id: "p32", name: "Smartwatch Tela AMOLED", categoryKey: "smartwatches", price: 219.9, badge: "novo", featured: true },
    { id: "p33", name: "Power Bank 10.000mAh", categoryKey: "power-banks", price: 89.9 },
    { id: "p34", name: "Power Bank 20.000mAh Turbo", categoryKey: "power-banks", price: 129.9, oldPrice: 159.9, badge: "promo", featured: true },
    { id: "p35", name: "Cartão de Memória 64GB Classe 10", categoryKey: "cartoes-memoria", price: 39.9 },
    { id: "p36", name: "Cartão de Memória 128GB Ultra", categoryKey: "cartoes-memoria", price: 64.9, bestseller: true, featured: true },
    { id: "p37", name: "Pen Drive 32GB", categoryKey: "pen-drives", price: 29.9 },
    { id: "p38", name: "Pen Drive 64GB Metálico", categoryKey: "pen-drives", price: 44.9 },
    { id: "p39", name: "Suporte de Celular para Mesa", categoryKey: "suportes-celular", price: 24.9 },
    { id: "p40", name: "Suporte de Celular Veicular", categoryKey: "suportes-celular", price: 34.9 },
    { id: "p41", name: "PopSocket Clássico", categoryKey: "popsockets", price: 19.9 },
    { id: "p42", name: "PopSocket com Suporte de Carro", categoryKey: "popsockets", price: 29.9, badge: "novo" },
    { id: "p43", name: "Kit Limpeza para Celular", categoryKey: "outros-acessorios", price: 24.9 },
    { id: "p44", name: "Suporte + Anel de Led Selfie", categoryKey: "outros-acessorios", price: 39.9, oldPrice: 49.9, badge: "promo" }
  ];

  /* ---------- Estado ---------- */
  var state = {
    cart: loadCart(),
    activeCategory: "todos",
    searchTerm: ""
  };

  function loadCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }
  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(state.cart)); } catch (e) { /* localStorage indisponível */ }
  }

  /* ---------- Helpers ---------- */
  function getProduct(id) {
    return PRODUCTS.filter(function (p) { return p.id === id; })[0];
  }
  function categoryLabel(key) {
    var match = CATEGORIES.filter(function (c) { return c.key === key; })[0];
    return match ? match.label : "";
  }
  function categoryIcon(key) {
    var match = CATEGORIES.filter(function (c) { return c.key === key; })[0];
    return match ? match.icon : "box";
  }
  function formatBRL(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
  function debounce(fn, wait) {
    var timer;
    return function () {
      var args = arguments, ctx = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function filteredProducts() {
    var term = state.searchTerm.trim().toLowerCase();
    return PRODUCTS.filter(function (p) {
      if (state.activeCategory === "mais-vendidos" && !p.bestseller) return false;
      if (state.activeCategory !== "todos" && state.activeCategory !== "mais-vendidos" && p.categoryKey !== state.activeCategory) return false;
      if (!term) return true;
      var cat = categoryLabel(p.categoryKey).toLowerCase();
      return p.name.toLowerCase().indexOf(term) !== -1 || cat.indexOf(term) !== -1;
    });
  }

  /* ---------- Render: catálogo ---------- */
  function productCardHtml(product) {
    var badgesHtml = "";
    if (product.badge === "novo") badgesHtml += '<span class="badge badge-new">Novo</span>';
    if (product.badge === "promo") badgesHtml += '<span class="badge badge-sale">Promoção</span>';

    var priceHtml = "";
    if (product.oldPrice) priceHtml += '<span class="price-old">' + formatBRL(product.oldPrice) + "</span>";
    priceHtml += '<span class="price-current">' + formatBRL(product.price) + "</span>";

    return (
      '<article class="product-card" data-id="' + product.id + '">' +
        '<div class="product-media">' +
          '<img src="' + productImageSrc(categoryIcon(product.categoryKey)) + '" alt="' + escapeHtml(product.name) + '" width="300" height="300" loading="lazy" decoding="async">' +
          (badgesHtml ? '<div class="product-badges">' + badgesHtml + "</div>" : "") +
        "</div>" +
        '<div class="product-body">' +
          '<p class="product-category">' + escapeHtml(categoryLabel(product.categoryKey)) + "</p>" +
          '<h3 class="product-name">' + escapeHtml(product.name) + "</h3>" +
          '<div class="product-price">' + priceHtml + "</div>" +
          '<button type="button" class="btn btn-primary btn-sm add-to-cart-btn" data-id="' + product.id + '">Adicionar ao Carrinho</button>' +
        "</div>" +
      "</article>"
    );
  }

  function renderCategories() {
    var wrap = document.getElementById("shopCategories");
    if (!wrap) return;
    var chips = [{ key: "todos", label: "Todos" }, { key: "mais-vendidos", label: "Mais vendidos" }]
      .concat(CATEGORIES.map(function (c) { return { key: c.key, label: c.label }; }));

    wrap.innerHTML = chips.map(function (c) {
      var active = c.key === state.activeCategory;
      return '<button type="button" class="chip' + (active ? " is-active" : "") +
        '" data-category="' + c.key + '" role="tab" aria-selected="' + active + '">' +
        escapeHtml(c.label) + "</button>";
    }).join("");
  }

  function renderFeatured() {
    var strip = document.getElementById("featuredStrip");
    if (!strip) return;
    var items = PRODUCTS.filter(function (p) { return p.featured; });
    strip.innerHTML = items.map(productCardHtml).join("");
  }

  function renderGrid() {
    var grid = document.getElementById("shopGrid");
    var empty = document.getElementById("shopEmpty");
    if (!grid) return;
    var items = filteredProducts();
    grid.innerHTML = items.map(productCardHtml).join("");
    if (empty) empty.hidden = items.length !== 0;
  }

  /* ---------- Carrinho ---------- */
  function cartTotals() {
    var subtotal = state.cart.reduce(function (sum, item) {
      var product = getProduct(item.id);
      return product ? sum + product.price * item.qty : sum;
    }, 0);
    var count = state.cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    return { subtotal: subtotal, total: subtotal, count: count };
  }

  function updateCartCount() {
    var countEl = document.getElementById("cartCount");
    if (countEl) countEl.textContent = String(cartTotals().count);
  }

  function renderCart() {
    var itemsEl = document.getElementById("cartItems");
    var subtotalEl = document.getElementById("cartSubtotal");
    var totalEl = document.getElementById("cartTotal");
    var checkoutBtn = document.getElementById("cartCheckoutBtn");
    if (!itemsEl) return;

    if (!state.cart.length) {
      itemsEl.innerHTML = '<p class="cart-empty">Seu carrinho está vazio. Adicione produtos para continuar.</p>';
    } else {
      itemsEl.innerHTML = state.cart.map(function (item) {
        var product = getProduct(item.id);
        if (!product) return "";
        var lineTotal = product.price * item.qty;
        return (
          '<div class="cart-item" data-id="' + product.id + '">' +
            '<img src="' + productImageSrc(categoryIcon(product.categoryKey)) + '" alt="" width="56" height="56" loading="lazy">' +
            "<div>" +
              '<p class="cart-item-name">' + escapeHtml(product.name) + "</p>" +
              '<p class="cart-item-price">' + formatBRL(product.price) + " cada &middot; " + formatBRL(lineTotal) + "</p>" +
              '<div class="qty-stepper">' +
                '<button type="button" data-action="decrease" data-id="' + product.id + '" aria-label="Diminuir quantidade">&minus;</button>' +
                "<span>" + item.qty + "</span>" +
                '<button type="button" data-action="increase" data-id="' + product.id + '" aria-label="Aumentar quantidade">+</button>' +
              "</div>" +
            "</div>" +
            '<button type="button" class="cart-item-remove" data-action="remove" data-id="' + product.id + '">Remover</button>' +
          "</div>"
        );
      }).join("");
    }

    var totals = cartTotals();
    if (subtotalEl) subtotalEl.textContent = formatBRL(totals.subtotal);
    if (totalEl) totalEl.textContent = formatBRL(totals.total);
    if (checkoutBtn) checkoutBtn.disabled = totals.count === 0;
  }

  function addToCart(id) {
    var entry = state.cart.filter(function (i) { return i.id === id; })[0];
    if (entry) entry.qty += 1;
    else state.cart.push({ id: id, qty: 1 });
    saveCart();
    renderCart();
    updateCartCount();
  }
  function removeFromCart(id) {
    state.cart = state.cart.filter(function (i) { return i.id !== id; });
    saveCart();
    renderCart();
    updateCartCount();
  }
  function setQty(id, qty) {
    if (qty <= 0) { removeFromCart(id); return; }
    var entry = state.cart.filter(function (i) { return i.id === id; })[0];
    if (entry) entry.qty = qty;
    saveCart();
    renderCart();
    updateCartCount();
  }

  /* ---------- Drawer ---------- */
  function openCart() {
    var drawer = document.getElementById("cartDrawer");
    var overlay = document.getElementById("cartOverlay");
    if (!drawer || !overlay) return;
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    var closeBtn = document.getElementById("cartCloseBtn");
    if (closeBtn) closeBtn.focus();
  }
  function closeCart() {
    var drawer = document.getElementById("cartDrawer");
    var overlay = document.getElementById("cartOverlay");
    if (!drawer || !overlay) return;
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
  }

  /* ---------- Toast ---------- */
  var toastTimer;
  function showToast(message) {
    var toast = document.getElementById("cartToast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 2200);
  }

  /* ---------- Checkout via WhatsApp ---------- */
  function buildCheckoutMessage() {
    var lines = state.cart.map(function (item) {
      var product = getProduct(item.id);
      if (!product) return "";
      return "• " + item.qty + "x " + product.name + " - " + formatBRL(product.price * item.qty);
    }).filter(function (line) { return line; });

    var totals = cartTotals();

    return (
      "Olá! Gostaria de comprar os seguintes produtos:\n\n" +
      lines.join("\n") +
      "\n\nTotal do Pedido:\n" + formatBRL(totals.total) +
      "\n\nMeu nome é: \n\nGostaria de combinar a retirada ou entrega."
    );
  }

  function checkout() {
    if (!state.cart.length) {
      showToast("Seu carrinho está vazio.");
      return;
    }
    var message = buildCheckoutMessage();
    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
  }

  /* ---------- Inicialização ---------- */
  function init() {
    renderCategories();
    renderFeatured();
    renderGrid();
    renderCart();
    updateCartCount();

    var categoriesWrap = document.getElementById("shopCategories");
    if (categoriesWrap) {
      categoriesWrap.addEventListener("click", function (event) {
        var btn = event.target.closest(".chip");
        if (!btn) return;
        state.activeCategory = btn.dataset.category;
        renderCategories();
        renderGrid();
      });
    }

    var searchInput = document.getElementById("shopSearch");
    if (searchInput) {
      searchInput.addEventListener("input", debounce(function () {
        state.searchTerm = searchInput.value;
        renderGrid();
      }, 150));
    }

    document.addEventListener("click", function (event) {
      var addBtn = event.target.closest(".add-to-cart-btn");
      if (!addBtn) return;
      var id = addBtn.dataset.id;
      addToCart(id);
      addBtn.classList.remove("is-added");
      void addBtn.offsetWidth;
      addBtn.classList.add("is-added");
      var product = getProduct(id);
      showToast((product ? product.name : "Produto") + " adicionado ao carrinho");
    });

    var cartItemsEl = document.getElementById("cartItems");
    if (cartItemsEl) {
      cartItemsEl.addEventListener("click", function (event) {
        var btn = event.target.closest("button[data-action]");
        if (!btn) return;
        var id = btn.dataset.id;
        var action = btn.dataset.action;
        var entry = state.cart.filter(function (i) { return i.id === id; })[0];
        if (action === "increase" && entry) setQty(id, entry.qty + 1);
        if (action === "decrease" && entry) setQty(id, entry.qty - 1);
        if (action === "remove") removeFromCart(id);
      });
    }

    var openBtn = document.getElementById("cartOpenBtn");
    var closeBtn = document.getElementById("cartCloseBtn");
    var overlay = document.getElementById("cartOverlay");
    var continueBtn = document.getElementById("cartContinueBtn");
    var checkoutBtn = document.getElementById("cartCheckoutBtn");

    if (openBtn) openBtn.addEventListener("click", openCart);
    if (closeBtn) closeBtn.addEventListener("click", closeCart);
    if (overlay) overlay.addEventListener("click", closeCart);
    if (continueBtn) continueBtn.addEventListener("click", closeCart);
    if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeCart();
    });
  }

  init();
})();
