/* ============================================
   MENELLI VEÍCULOS — script.js
   ============================================ */

// ============================================
// DADOS DOS VEÍCULOS
// ============================================
const vehicles = [
  {
    id: 1,
    brand: "Toyota",
    name: "Corolla XEi 2.0 Flex",
    category: "seminovo",
    year: 2023,
    km: "28.500",
    fuel: "Flex",
    color: "Prata",
    transmission: "Automático",
    priceOld: "R$ 148.900",
    price: "R$ 139.900",
    parcel: "R$ 2.399/mês",
    image: "imagens/corolla.png",
    description: "Corolla XEi 2.0 Flex Automático, completo. Único dono, IPVA pago, revisado em concessionária Toyota. Pneus novos. Aceita financiamento e troca."
  },
  {
    id: 2,
    brand: "Jeep",
    name: "Compass Limited 2.0",
    category: "suv",
    year: 2024,
    km: "0",
    fuel: "Diesel",
    color: "Branco",
    transmission: "Automático",
    priceOld: null,
    price: "R$ 289.990",
    parcel: "R$ 4.899/mês",
    image: "imagens/jeep-compass.jpeg",
    description: "Compass Limited 4x4 Diesel 2024, equipamento completo, teto solar panorâmico, couro, ADAS completo. Pronto para entrega."
  },
  {
    id: 3,
    brand: "Volkswagen",
    name: "T-Cross Highline TSI",
    category: "suv",
    year: 2023,
    km: "15.200",
    fuel: "Gasolina",
    color: "Azul",
    transmission: "Automático",
    priceOld: "R$ 142.000",
    price: "R$ 135.500",
    parcel: "R$ 2.290/mês",
    image: "imagens/t-cross.jpeg",
    description: "T-Cross Highline TSI Automático, único dono. Completo com teto, couro, central multimídia. IPVA pago. Financiamento facilitado."
  },
  {
    id: 4,
    brand: "Chevrolet",
    name: "S10 High Country 2.8",
    category: "caminhonete",
    year: 2023,
    km: "32.000",
    fuel: "Diesel",
    color: "Preto",
    transmission: "Automático",
    priceOld: "R$ 340.000",
    price: "R$ 318.900",
    parcel: "R$ 5.299/mês",
    image: "imagens/s10.jpeg",
    description: "S10 High Country 4x4 CD Diesel 2023, completa, couro, multimídia 8\", câmera 360°. Garantia de fábrica. Aceita troca."
  },
  {
    id: 5,
    brand: "Honda",
    name: "HR-V EX CVT",
    category: "suv",
    year: 2024,
    km: "0",
    fuel: "Flex",
    color: "Vermelho",
    transmission: "CVT",
    priceOld: null,
    price: "R$ 178.590",
    parcel: "R$ 2.999/mês",
    image: "imagens/hrv.jpeg",
    description: "HR-V EX 0km 2024, multimídia 9\" Honda Connect, lane watch, câmera traseira, carregador wireless. Todas as cores disponíveis."
  },
  {
    id: 6,
    brand: "Hyundai",
    name: "HB20S Diamond Plus",
    category: "seminovo",
    year: 2022,
    km: "41.000",
    fuel: "Flex",
    color: "Cinza",
    transmission: "Automático",
    priceOld: "R$ 98.000",
    price: "R$ 89.900",
    parcel: "R$ 1.499/mês",
    image: "imagens/hb20.jpeg",
    description: "HB20S Diamond Plus 1.0 Turbo Automático. Completo, multimídia, câmera, sensor de estacionamento. Excelente estado."
  },
  {
    id: 7,
    brand: "Toyota",
    name: "Hilux SRX 2.8 4x4",
    category: "caminhonete",
    year: 2024,
    km: "0",
    fuel: "Diesel",
    color: "Branco",
    transmission: "Automático",
    priceOld: null,
    price: "R$ 399.990",
    parcel: "R$ 6.799/mês",
    image: "imagens/hillux-srx.jpeg",
    description: "Hilux SRX 0km 2024 com teto solar, couro bege, câmera 360°, multimídia 8\", ACC, LDWS. A rainha das picapes ainda mais sofisticada."
  },
  {
    id: 8,
    brand: "Volkswagen",
    name: "Polo Track 1.0",
    category: "zerokm",
    year: 2024,
    km: "0",
    fuel: "Flex",
    color: "Branco",
    transmission: "Manual",
    priceOld: null,
    price: "R$ 79.990",
    parcel: "R$ 1.299/mês",
    image: "imagens/polo.jpeg",
    description: "Polo Track 1.0 Flex 0km 2024. Conectividade wireless, câmera de ré, freios ABS, airbags, controle de estabilidade. Perfeito para o dia a dia."
  },
  {
    id: 9,
    brand: "Jeep",
    name: "Renegade Sport 1.3",
    category: "zerokm",
    year: 2024,
    km: "0",
    fuel: "Flex",
    color: "Azul",
    transmission: "Automático",
    priceOld: null,
    price: "R$ 149.990",
    parcel: "R$ 2.499/mês",
    image: "imagens/jeep-renegade.jpeg",
    description: "Renegade Sport 1.3 T270 0km 2024. Turbo, automático 6 marchas, multimídia 7\", câmera de ré, ACC. Entrega imediata."
  },
  {
    id: 10,
    brand: "Honda",
    name: "Civic EXL 2.0 Flex",
    category: "seminovo",
    year: 2022,
    km: "38.000",
    fuel: "Flex",
    color: "Preto",
    transmission: "CVT",
    priceOld: "R$ 168.000",
    price: "R$ 154.900",
    parcel: "R$ 2.699/mês",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80",
    description: "Civic EXL Sedan 2022, completo. Honda Sensing, couro bege, câmera 360°, teto solar. Revisado e com garantia de 6 meses."
  },
  {
    id: 11,
    brand: "Nissan",
    name: "Kicks Advance CVT",
    category: "suv",
    year: 2023,
    km: "22.000",
    fuel: "Flex",
    color: "Cinza",
    transmission: "CVT",
    priceOld: "R$ 162.000",
    price: "R$ 149.500",
    parcel: "R$ 2.499/mês",
    image: "https://images.unsplash.com/photo-1593055357429-62b0ef1f1f76?w=600&q=80",
    description: "Kicks Advance 1.6 CVT 2023, único dono. Câmera 360°, ProPILOT, couro, teto solar. Revisada e com laudo cautelar."
  },
  {
    id: 12,
    brand: "Chevrolet",
    name: "Tracker Midnight 1.2",
    category: "zerokm",
    year: 2024,
    km: "0",
    fuel: "Flex",
    color: "Preto",
    transmission: "Automático",
    priceOld: null,
    price: "R$ 161.990",
    parcel: "R$ 2.699/mês",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80",
    description: "Tracker Midnight 0km 2024, edição especial. Motor turbo, multimídia 8\", wireless, câmeras laterais e traseira. Design exclusivo."
  }
];

let filteredVehicles = [...vehicles];
let displayCount = 6;
let currentSlide = 0;
let slideInterval;

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHeroSlider();
  initCards();
  initFilterTabs();
  initSearchBar();
  initModal();
  initFinanceCalc();
  initContactForm();
  initBackTop();
  initFavorites();
  initLoadMore();
  initMobileNav();
  initAnimations();
});

// ============================================
// HEADER — sticky + scroll class
// ============================================
function initHeader() {
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  });
}

// ============================================
// MOBILE NAV
// ============================================
function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    nav.classList.toggle("open");
  });

  // Dropdown no mobile
  document.querySelectorAll(".has-dropdown .nav__link").forEach(link => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = link.nextElementSibling;
        if (dropdown) dropdown.classList.toggle("open");
      }
    });
  });

  // Fechar ao clicar em link
  document.querySelectorAll(".nav__link:not(.has-dropdown .nav__link), .dropdown li a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove("open");
        nav.classList.remove("open");
      }
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(l => {
      l.classList.remove("active");
      if (l.getAttribute("href") === "#" + current) l.classList.add("active");
    });
  });
}

// ============================================
// HERO SLIDER
// ============================================
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero__slide");
  const dots = document.querySelectorAll(".dot");

  function goTo(idx) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (idx + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  document.getElementById("heroNext").addEventListener("click", () => {
    goTo(currentSlide + 1);
    resetInterval();
  });
  document.getElementById("heroePrev").addEventListener("click", () => {
    goTo(currentSlide - 1);
    resetInterval();
  });

  dots.forEach((dot, i) => dot.addEventListener("click", () => { goTo(i); resetInterval(); }));

  function startInterval() {
    slideInterval = setInterval(() => goTo(currentSlide + 1), 5500);
  }
  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }
  startInterval();
}

// ============================================
// RENDER CARDS
// ============================================
function getCategoryLabel(cat) {
  const map = { zerokm: "0 km", seminovo: "Seminovo", suv: "SUV", caminhonete: "Caminhonete" };
  return map[cat] || cat;
}

function renderCards() {
  const grid = document.getElementById("cardsGrid");
  const toShow = filteredVehicles.slice(0, displayCount);
  grid.innerHTML = "";

  if (toShow.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:60px 20px; color:var(--gray);">
      <i class="fas fa-car" style="font-size:48px; color:var(--gold-dim); margin-bottom:16px; display:block;"></i>
      <p>Nenhum veículo encontrado com esses filtros.</p>
    </div>`;
    return;
  }

  toShow.forEach((car, i) => {
    const favorites = getFavorites();
    const isFav = favorites.includes(car.id);
    const card = document.createElement("div");
    card.className = "car-card";
    card.style.animationDelay = `${i * 0.07}s`;
    card.dataset.id = car.id;
    card.innerHTML = `
      <div class="car-card__img">
        <img src="${car.image}" alt="${car.name}" loading="lazy" />
        <span class="car-card__badge badge--${car.category}">${getCategoryLabel(car.category)}</span>
        <button class="car-card__fav ${isFav ? "active" : ""}" data-id="${car.id}" title="Favoritar">
          <i class="${isFav ? "fas" : "far"} fa-heart"></i>
        </button>
      </div>
      <div class="car-card__body">
        <div class="car-card__brand">${car.brand}</div>
        <div class="car-card__name">${car.name}</div>
        <div class="car-card__specs">
          <span class="car-card__spec"><i class="fas fa-calendar"></i> ${car.year}</span>
          <span class="car-card__spec"><i class="fas fa-tachometer-alt"></i> ${car.km === "0" ? "0 km" : car.km + " km"}</span>
          <span class="car-card__spec"><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
          <span class="car-card__spec"><i class="fas fa-cog"></i> ${car.transmission}</span>
        </div>
        <div class="car-card__price-block">
          ${car.priceOld ? `<div class="car-card__price-old">${car.priceOld}</div>` : ""}
          <div class="car-card__price">${car.price}</div>
          <div class="car-card__price-parcel">ou ${car.parcel}</div>
        </div>
        <div class="car-card__actions">
          <button class="btn btn--gold btn-ver-mais" data-id="${car.id}">
            <i class="fas fa-eye"></i> Ver mais
          </button>
          <a href="https://wa.me/5511940020800?text=Olá! Tenho interesse no ${encodeURIComponent(car.brand + ' ' + car.name + ' ' + car.year)}" 
             target="_blank" class="btn--whatsapp-card">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Eventos "Ver mais"
  document.querySelectorAll(".btn-ver-mais").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(parseInt(btn.dataset.id));
    });
  });

  // Clique no card
  document.querySelectorAll(".car-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".car-card__fav") && !e.target.closest(".btn--whatsapp-card") && !e.target.closest(".btn-ver-mais")) {
        openModal(parseInt(card.dataset.id));
      }
    });
  });

  // Favoritos
  document.querySelectorAll(".car-card__fav").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(parseInt(btn.dataset.id));
    });
  });

  // Botão load more
  const loadMoreBtn = document.getElementById("loadMore");
  if (loadMoreBtn) {
    loadMoreBtn.style.display = displayCount >= filteredVehicles.length ? "none" : "inline-flex";
  }
}

function initCards() { renderCards(); }

// ============================================
// FILTER TABS
// ============================================
function initFilterTabs() {
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      filteredVehicles = filter === "all" ? [...vehicles] : vehicles.filter(v => v.category === filter);
      displayCount = 6;
      renderCards();
    });
  });
}

// ============================================
// SEARCH BAR
// ============================================
function initSearchBar() {
  document.getElementById("btnBuscar").addEventListener("click", applySearch);
  document.getElementById("filterSearch").addEventListener("keydown", (e) => {
    if (e.key === "Enter") applySearch();
  });
}

function applySearch() {
  const tipo = document.getElementById("filterTipo").value.toLowerCase();
  const marca = document.getElementById("filterMarca").value.toLowerCase();
  const precoMax = parseInt(document.getElementById("filterPreco").value) || Infinity;
  const search = document.getElementById("filterSearch").value.toLowerCase();

  const tipoMap = { "0 km": "zerokm", "seminovo": "seminovo", "caminhonete": "caminhonete", "suv": "suv" };
  const filterCat = tipoMap[tipo] || "";

  filteredVehicles = vehicles.filter(v => {
    const matchTipo = !filterCat || v.category === filterCat;
    const matchMarca = !marca || v.brand.toLowerCase() === marca;
    const priceNum = parseInt(v.price.replace(/\D/g, ""));
    const matchPreco = priceNum <= precoMax;
    const matchSearch = !search || v.name.toLowerCase().includes(search) || v.brand.toLowerCase().includes(search);
    return matchTipo && matchMarca && matchPreco && matchSearch;
  });

  displayCount = 6;

  // Reset tabs
  document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
  document.querySelector(".filter-tab[data-filter='all']").classList.add("active");

  // Scroll para estoque
  const sec = document.getElementById("estoque");
  if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });

  renderCards();
}

// ============================================
// LOAD MORE
// ============================================
function initLoadMore() {
  const btn = document.getElementById("loadMore");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    displayCount += 3;
    renderCards();
    if (displayCount >= filteredVehicles.length) btn.style.display = "none";
  });
}

// ============================================
// MODAL VEÍCULO
// ============================================
function initModal() {
  const overlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("modalClose");

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openModal(id) {
  const car = vehicles.find(v => v.id === id);
  if (!car) return;
  const body = document.getElementById("modalBody");
  body.innerHTML = `
    <img class="modal-car__img" src="${car.image}" alt="${car.name}" />
    <div class="modal-car__info">
      <div class="modal-car__brand">${car.brand} · ${getCategoryLabel(car.category)}</div>
      <div class="modal-car__name">${car.name} — ${car.year}</div>
      <div class="modal-car__specs-grid">
        <div class="modal-spec">
          <i class="fas fa-calendar-alt"></i>
          <strong>${car.year}</strong>
          <span>Ano</span>
        </div>
        <div class="modal-spec">
          <i class="fas fa-tachometer-alt"></i>
          <strong>${car.km === "0" ? "0 km" : car.km + " km"}</strong>
          <span>Quilometragem</span>
        </div>
        <div class="modal-spec">
          <i class="fas fa-gas-pump"></i>
          <strong>${car.fuel}</strong>
          <span>Combustível</span>
        </div>
        <div class="modal-spec">
          <i class="fas fa-cog"></i>
          <strong>${car.transmission}</strong>
          <span>Câmbio</span>
        </div>
        <div class="modal-spec">
          <i class="fas fa-palette"></i>
          <strong>${car.color}</strong>
          <span>Cor</span>
        </div>
        <div class="modal-spec">
          <i class="fas fa-tag"></i>
          <strong>${car.parcel}</strong>
          <span>Parcela</span>
        </div>
      </div>
      <div class="modal-car__price">${car.price}</div>
      ${car.priceOld ? `<p style="font-size:13px; color:var(--gray); text-decoration:line-through; margin-bottom:8px;">${car.priceOld}</p>` : ""}
      <p class="modal-car__description">${car.description}</p>
      <div class="modal-car__actions">
        <button class="btn btn--gold" onclick="closeModal()">
          <i class="fas fa-arrow-left"></i> Voltar ao estoque
        </button>
        <a href="https://wa.me/5511940020800?text=Olá! Tenho interesse no ${encodeURIComponent(car.brand + ' ' + car.name + ' ' + car.year + ' — ' + car.price)}" 
           target="_blank" class="btn--whatsapp">
          <i class="fab fa-whatsapp"></i> Tenho interesse
        </a>
      </div>
    </div>
  `;
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ============================================
// FAVORITOS (localStorage)
// ============================================
function getFavorites() {
  return JSON.parse(localStorage.getItem("menelli_favs") || "[]");
}

function setFavorites(favs) {
  localStorage.setItem("menelli_favs", JSON.stringify(favs));
}

function toggleFavorite(id) {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
  } else {
    favs.push(id);
    showToast("❤️ Adicionado aos favoritos!");
  }
  setFavorites(favs);
  renderCards();
}

function initFavorites() { /* Favoritos inicializados no renderCards */ }

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(msg) {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--black-card);
    border: 1px solid rgba(201,168,76,0.35);
    color: var(--white);
    padding: 12px 24px;
    border-radius: 30px;
    font-family: var(--font-ui);
    font-size: 14px;
    font-weight: 500;
    z-index: 3000;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    pointer-events: none;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(-12px)";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ============================================
// CALCULADORA DE FINANCIAMENTO
// ============================================
function initFinanceCalc() {
  const slider = document.getElementById("calcEntrada");
  const label = document.getElementById("calcEntradaVal");
  const calcBtn = document.getElementById("btnCalc");
  const valorInput = document.getElementById("calcValor");

  if (!slider) return;

  slider.addEventListener("input", () => {
    label.textContent = slider.value + "%";
  });

  // Máscara monetária
  valorInput.addEventListener("input", () => {
    let raw = valorInput.value.replace(/\D/g, "");
    if (!raw) { valorInput.value = ""; return; }
    let num = parseInt(raw, 10);
    valorInput.value = "R$ " + num.toLocaleString("pt-BR");
  });

  calcBtn.addEventListener("click", () => {
    const rawVal = valorInput.value.replace(/\D/g, "");
    if (!rawVal) { showToast("⚠️ Informe o valor do veículo."); return; }

    const valor = parseInt(rawVal, 10);
    const entrada = parseInt(slider.value, 10) / 100;
    const parcStr = document.getElementById("calcParcelas").value;
    const parc = parseInt(parcStr.replace("x", ""), 10);
    const taxa = 0.0079; // 0,79% ao mês
    const financiado = valor * (1 - entrada);

    // Price formula
    const parcelaMensal = financiado * (taxa * Math.pow(1 + taxa, parc)) / (Math.pow(1 + taxa, parc) - 1);
    const entradaValor = valor * entrada;

    const result = document.getElementById("calcResult");
    result.innerHTML = `
      <div>
        <div style="font-family:var(--font-ui); font-size:11px; color:var(--gray); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:4px;">Parcela estimada (${parc}x)</div>
        <div style="font-family:var(--font-ui); font-size:11px; color:var(--gray);">Entrada: R$ ${entradaValor.toLocaleString("pt-BR", {maximumFractionDigits:0})}</div>
      </div>
      <strong style="font-family:var(--font-ui); font-size:22px; color:var(--gold-light);">
        R$ ${parcelaMensal.toLocaleString("pt-BR", {minimumFractionDigits:2, maximumFractionDigits:2})}
      </strong>
    `;
    showToast("✅ Cálculo realizado! Taxa: 0,79% a.m.");
  });
}

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.textContent = "Enviando...";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    setTimeout(() => {
      btn.textContent = "Enviar Mensagem";
      btn.disabled = false;
      btn.style.opacity = "1";
      const success = document.getElementById("formSuccess");
      success.classList.add("show");
      form.reset();
      setTimeout(() => success.classList.remove("show"), 5000);
    }, 1500);
  });
}

// ============================================
// BACK TO TOP
// ============================================
function initBackTop() {
  const btn = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 400);
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================================
// ANIMAÇÕES DE ENTRADA (Intersection Observer)
// ============================================
function initAnimations() {
  const targets = document.querySelectorAll(
    ".stat-card, .service-card, .testi-card, .about__image, .about__text, .contact__info, .contact__form, .section-header"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        entry.target.style.transitionDelay = `${(i % 4) * 0.1}s`;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    observer.observe(el);
  });
}