/* ============================================
   MENELLI VEÍCULOS — catalogo.js
   ============================================ */

const vehicles = [
  { id:1, brand:"Toyota", model:"Corolla XEi 2.0 Flex", category:"seminovo", year:2023, km:"28.500", fuel:"Flex", color:"Prata", transmission:"Automático", priceNum:139900, price:"R$ 139.900", priceOld:"R$ 148.900", parcel:"R$ 2.399/mês", image:"../imagens/corolla.png", description:"Corolla XEi 2.0 Flex Automático, completo. Único dono, IPVA pago, revisado em concessionária Toyota." },
  { id:2, brand:"Jeep", model:"Compass Limited 2.0", category:"suv", year:2024, km:"0", fuel:"Diesel", color:"Branco", transmission:"Automático", priceNum:289990, price:"R$ 289.990", priceOld:null, parcel:"R$ 4.899/mês", image:"../imagens/jeep-compass.jpeg", description:"Compass Limited 4x4 Diesel 2024, teto solar panorâmico, couro, ADAS completo." },
  { id:3, brand:"Volkswagen", model:"T-Cross Highline TSI", category:"suv", year:2023, km:"15.200", fuel:"Gasolina", color:"Azul", transmission:"Automático", priceNum:135500, price:"R$ 135.500", priceOld:"R$ 142.000", parcel:"R$ 2.290/mês", image:"../imagens/t-cross.jpeg", description:"T-Cross Highline TSI Automático, único dono. Completo com teto, couro, multimídia." },
  { id:4, brand:"Chevrolet", model:"S10 High Country 2.8", category:"caminhonete", year:2023, km:"32.000", fuel:"Diesel", color:"Preto", transmission:"Automático", priceNum:318900, price:"R$ 318.900", priceOld:"R$ 340.000", parcel:"R$ 5.299/mês", image:"../imagens/s10.jpeg", description:"S10 High Country 4x4 CD Diesel 2023, completa, couro, câmera 360°." },
  { id:5, brand:"Honda", model:"HR-V EX CVT", category:"suv", year:2024, km:"0", fuel:"Flex", color:"Vermelho", transmission:"CVT", priceNum:178590, price:"R$ 178.590", priceOld:null, parcel:"R$ 2.999/mês", image:"../imagens/hrv.jpeg", description:"HR-V EX 0km 2024, multimídia 9\" Honda Connect, lane watch, câmera traseira." },
  { id:6, brand:"Hyundai", model:"HB20S Diamond Plus", category:"seminovo", year:2022, km:"41.000", fuel:"Flex", color:"Cinza", transmission:"Automático", priceNum:89900, price:"R$ 89.900", priceOld:"R$ 98.000", parcel:"R$ 1.499/mês", image:"../imagens/hb20.jpeg", description:"HB20S Diamond Plus 1.0 Turbo Automático. Completo, multimídia, câmera." },
  { id:7, brand:"Toyota", model:"Hilux SRX 2.8 4x4", category:"caminhonete", year:2024, km:"0", fuel:"Diesel", color:"Branco", transmission:"Automático", priceNum:399990, price:"R$ 399.990", priceOld:null, parcel:"R$ 6.799/mês", image:"../imagens/hillux-srx.jpeg", description:"Hilux SRX 0km 2024 com teto solar, couro bege, câmera 360°, multimídia 8\"." },
  { id:8, brand:"Volkswagen", model:"Polo Track 1.0", category:"zerokm", year:2024, km:"0", fuel:"Flex", color:"Branco", transmission:"Manual", priceNum:79990, price:"R$ 79.990", priceOld:null, parcel:"R$ 1.299/mês", image:"../imagens/polo.jpeg", description:"Polo Track 1.0 Flex 0km 2024. Conectividade wireless, câmera de ré, freios ABS." },
  { id:9, brand:"Jeep", model:"Renegade Sport 1.3", category:"zerokm", year:2024, km:"0", fuel:"Flex", color:"Azul", transmission:"Automático", priceNum:149990, price:"R$ 149.990", priceOld:null, parcel:"R$ 2.499/mês", image:"../imagens/jeep-renegade.jpeg", description:"Renegade Sport 1.3 T270 0km 2024. Turbo, automático 6 marchas, multimídia 7\"." },
  { id:10, brand:"Honda", model:"Civic EXL 2.0 Flex", category:"seminovo", year:2022, km:"38.000", fuel:"Flex", color:"Preto", transmission:"CVT", priceNum:154900, price:"R$ 154.900", priceOld:"R$ 168.000", parcel:"R$ 2.699/mês", image:"https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80", description:"Civic EXL Sedan 2022, Honda Sensing, couro bege, câmera 360°, teto solar." },
  { id:11, brand:"Nissan", model:"Kicks Advance CVT", category:"suv", year:2023, km:"22.000", fuel:"Flex", color:"Cinza", transmission:"CVT", priceNum:149500, price:"R$ 149.500", priceOld:"R$ 162.000", parcel:"R$ 2.499/mês", image:"https://images.unsplash.com/photo-1593055357429-62b0ef1f1f76?w=600&q=80", description:"Kicks Advance 1.6 CVT 2023, câmera 360°, ProPILOT, couro, teto solar." },
  { id:12, brand:"Chevrolet", model:"Tracker Midnight 1.2", category:"zerokm", year:2024, km:"0", fuel:"Flex", color:"Preto", transmission:"Automático", priceNum:161990, price:"R$ 161.990", priceOld:null, parcel:"R$ 2.699/mês", image:"https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80", description:"Tracker Midnight 0km 2024, motor turbo, multimídia 8\", wireless, câmeras laterais." },
  { id:13, brand:"Ford", model:"Ranger XLS 2.2 4x4", category:"caminhonete", year:2023, km:"45.000", fuel:"Diesel", color:"Prata", transmission:"Manual", priceNum:215000, price:"R$ 215.000", priceOld:"R$ 235.000", parcel:"R$ 3.699/mês", image:"https://images.unsplash.com/photo-1589750602846-60028879da09?w=600&q=80", description:"Ranger XLS 4x4 Diesel 2023, revisada, câmera de ré, ar condicionado, direção hidráulica." },
  { id:14, brand:"Mitsubishi", model:"Eclipse Cross 1.5T", category:"suv", year:2023, km:"18.000", fuel:"Gasolina", color:"Vermelho", transmission:"CVT", priceNum:199900, price:"R$ 199.900", priceOld:"R$ 219.000", parcel:"R$ 3.399/mês", image:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80", description:"Eclipse Cross 1.5T CVT 2023, couro, teto solar, multimídia 8\", câmera 360°." }
];

// Estado
let filtered = [...vehicles];
let displayCount = 9;
let viewMode = 'grid';
let activeFilters = {
  search: '',
  brand: '',
  tipos: [],
  modelo: '',
  anoMin: '',
  anoMax: '',
  priceMin: 0,
  priceMax: 500000,
  combustiveis: [],
  cambios: []
};

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initURLParams();
  populateModeloSelect();
  updateTotalCount();
  renderSkeletons();
  setTimeout(() => { applyFilters(); initPriceRange(); }, 200);
  initFilters();
  initSort();
  initViewToggle();
  initMobileFilter();
  initBackTop();
  initLoadMore();
});

function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));
  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger) hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });
}

function initURLParams() {
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get('tipo');
  const marca = params.get('marca');
  if (tipo) {
    activeFilters.tipos = [tipo];
    const cb = document.querySelector(`#filterTipo input[value="${tipo}"]`);
    if (cb) cb.checked = true;
  }
  if (marca) {
    activeFilters.brand = marca;
    document.querySelectorAll('.brand-pill').forEach(p => {
      p.classList.toggle('active', p.dataset.brand === marca || (p.dataset.brand === '' && !marca));
    });
  }
}

// ============================================
// POPULATE MODELO SELECT
// ============================================
function populateModeloSelect(brand = '') {
  const sel = document.getElementById('filterModelo');
  const models = brand
    ? [...new Set(vehicles.filter(v => v.brand === brand).map(v => v.model))]
    : [...new Set(vehicles.map(v => v.model))].sort();
  sel.innerHTML = '<option value="">Todos os modelos</option>';
  models.forEach(m => {
    const o = document.createElement('option');
    o.value = m; o.textContent = m;
    sel.appendChild(o);
  });
}

// ============================================
// PRICE RANGE
// ============================================
function initPriceRange() {
  const minR = document.getElementById('priceRangeMin');
  const maxR = document.getElementById('priceRangeMax');
  const minL = document.getElementById('priceMinLabel');
  const maxL = document.getElementById('priceMaxLabel');
  const fill = document.getElementById('priceRangeFill');

  function update(e) {
    let vMin = parseInt(minR.value), vMax = parseInt(maxR.value);
    const gap = 5000;
    
    if (vMax - vMin < gap) {
      if (e && e.target.id === 'priceRangeMin') {
        minR.value = vMax - gap;
        vMin = parseInt(minR.value);
      } else if (e && e.target.id === 'priceRangeMax') {
        maxR.value = vMin + gap;
        vMax = parseInt(maxR.value);
      } else {
        [minR.value, maxR.value] = [vMax, vMin];
        vMin = parseInt(minR.value);
        vMax = parseInt(maxR.value);
      }
    }
    
    const range = parseInt(maxR.max) - parseInt(minR.min);
    const leftPct = ((vMin - parseInt(minR.min)) / range) * 100;
    const rightPct = ((parseInt(maxR.max) - vMax) / range) * 100;
    fill.style.left = leftPct + '%';
    fill.style.right = rightPct + '%';
    minL.textContent = 'R$ ' + vMin.toLocaleString('pt-BR');
    maxL.textContent = vMax >= 500000 ? 'R$ 500.000+' : 'R$ ' + vMax.toLocaleString('pt-BR');
    activeFilters.priceMin = vMin;
    activeFilters.priceMax = vMax;
  }
  minR.addEventListener('input', update);
  maxR.addEventListener('input', update);
  update();
}

// ============================================
// INIT FILTERS
// ============================================
function initFilters() {
  // Brand pills
  document.querySelectorAll('.brand-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.brand-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilters.brand = pill.dataset.brand;
      populateModeloSelect(pill.dataset.brand);
      activeFilters.modelo = '';
      document.getElementById('filterModelo').value = '';
    });
  });

  // Search input (live)
  const searchInput = document.getElementById('catSearch');
  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { activeFilters.search = searchInput.value.trim(); applyFilters(); }, 300);
  });

  // Tipo checkboxes
  document.querySelectorAll('#filterTipo input').forEach(cb => {
    cb.addEventListener('change', () => {
      activeFilters.tipos = [...document.querySelectorAll('#filterTipo input:checked')].map(i => i.value);
    });
  });

  // Modelo
  document.getElementById('filterModelo').addEventListener('change', e => { activeFilters.modelo = e.target.value; });

  // Ano
  document.getElementById('filterAnoMin').addEventListener('change', e => { activeFilters.anoMin = e.target.value; });
  document.getElementById('filterAnoMax').addEventListener('change', e => { activeFilters.anoMax = e.target.value; });

  // Combustível
  document.querySelectorAll('#filterCombustivel input').forEach(cb => {
    cb.addEventListener('change', () => {
      activeFilters.combustiveis = [...document.querySelectorAll('#filterCombustivel input:checked')].map(i => i.value);
    });
  });

  // Câmbio
  document.querySelectorAll('#filterCambio input').forEach(cb => {
    cb.addEventListener('change', () => {
      activeFilters.cambios = [...document.querySelectorAll('#filterCambio input:checked')].map(i => i.value);
    });
  });

  // Apply button
  document.getElementById('btnApplyFilters').addEventListener('click', () => {
    applyFilters();
    closeMobileSidebar();
  });

  // Clear filters
  document.getElementById('btnClearFilters').addEventListener('click', clearFilters);
}

function clearFilters() {
  activeFilters = { search:'', brand:'', tipos:[], modelo:'', anoMin:'', anoMax:'', priceMin:0, priceMax:500000, combustiveis:[], cambios:[] };
  document.getElementById('catSearch').value = '';
  document.querySelectorAll('.brand-pill').forEach(p => p.classList.toggle('active', p.dataset.brand === ''));
  document.querySelectorAll('#filterTipo input, #filterCombustivel input, #filterCambio input').forEach(cb => cb.checked = false);
  document.getElementById('filterModelo').value = '';
  document.getElementById('filterAnoMin').value = '';
  document.getElementById('filterAnoMax').value = '';
  document.getElementById('priceRangeMin').value = 0;
  document.getElementById('priceRangeMax').value = 500000;
  initPriceRange();
  populateModeloSelect();
  applyFilters();
}

// ============================================
// APPLY FILTERS
// ============================================
function applyFilters() {
  filtered = vehicles.filter(v => {
    if (activeFilters.search) {
      const q = activeFilters.search.toLowerCase();
      if (!v.model.toLowerCase().includes(q) && !v.brand.toLowerCase().includes(q)) return false;
    }
    if (activeFilters.brand && v.brand !== activeFilters.brand) return false;
    if (activeFilters.tipos.length && !activeFilters.tipos.includes(v.category)) return false;
    if (activeFilters.modelo && v.model !== activeFilters.modelo) return false;
    if (activeFilters.anoMin && v.year < parseInt(activeFilters.anoMin)) return false;
    if (activeFilters.anoMax && v.year > parseInt(activeFilters.anoMax)) return false;
    if (v.priceNum < activeFilters.priceMin || v.priceNum > activeFilters.priceMax) return false;
    if (activeFilters.combustiveis.length && !activeFilters.combustiveis.includes(v.fuel)) return false;
    if (activeFilters.cambios.length && !activeFilters.cambios.includes(v.transmission)) return false;
    return true;
  });

  applySort();
  displayCount = 9;
  renderCards();
  updateResultsCount();
  renderActiveFilterChips();
}

// ============================================
// SORT
// ============================================
function initSort() {
  document.getElementById('catSort').addEventListener('change', () => { applySort(); renderCards(); });
}

function applySort() {
  const val = document.getElementById('catSort').value;
  filtered = [...filtered];
  if (val === 'price-asc') filtered.sort((a,b) => a.priceNum - b.priceNum);
  else if (val === 'price-desc') filtered.sort((a,b) => b.priceNum - a.priceNum);
  else if (val === 'year-desc') filtered.sort((a,b) => b.year - a.year);
  else if (val === 'year-asc') filtered.sort((a,b) => a.year - b.year);
  else if (val === 'km-asc') filtered.sort((a,b) => parseInt(a.km.replace(/\D/g,'') || 0) - parseInt(b.km.replace(/\D/g,'') || 0));
}

// ============================================
// RENDER CARDS
// ============================================
function getCatLabel(cat) {
  return { zerokm:'0 km', seminovo:'Seminovo', suv:'SUV', caminhonete:'Caminhonete' }[cat] || cat;
}

function renderCards() {
  const grid = document.getElementById('catGrid');
  const toShow = filtered.slice(0, displayCount);
  grid.innerHTML = '';

  if (toShow.length === 0) {
    grid.innerHTML = `<div class="cat-empty">
      <i class="fas fa-car-side"></i>
      <h3>Nenhum veículo encontrado</h3>
      <p>Tente ajustar os filtros para encontrar mais opções.</p>
      <button class="btn btn--gold-outline" onclick="clearFilters()"><i class="fas fa-undo"></i> Limpar Filtros</button>
    </div>`;
    document.getElementById('catLoadMore').style.display = 'none';
    document.getElementById('catPageInfo').textContent = '';
    return;
  }

  toShow.forEach((car, i) => {
    const el = document.createElement('div');
    el.className = 'car-card';
    el.style.animationDelay = `${i * 0.05}s`;
    el.innerHTML = `
      <div class="car-card__img">
        <img src="${car.image}" alt="${car.model}" loading="lazy" />
        <span class="car-card__badge badge--${car.category}">${getCatLabel(car.category)}</span>
        <button class="car-card__fav" data-id="${car.id}" title="Favoritar">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="car-card__body">
        <div class="car-card__brand">${car.brand}</div>
        <div class="car-card__name">${car.model}</div>
        <div class="car-card__specs">
          <span class="car-card__spec"><i class="fas fa-calendar"></i> ${car.year}</span>
          <span class="car-card__spec"><i class="fas fa-tachometer-alt"></i> ${car.km === '0' ? '0 km' : car.km + ' km'}</span>
          <span class="car-card__spec"><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
          <span class="car-card__spec"><i class="fas fa-cog"></i> ${car.transmission}</span>
        </div>
        <div class="car-card__price-block">
          ${car.priceOld ? `<div class="car-card__price-old">${car.priceOld}</div>` : ''}
          <div class="car-card__price">${car.price}</div>
          <div class="car-card__price-parcel">ou ${car.parcel}</div>
        </div>
        <div class="car-card__actions">
          <a href="produto.html?id=${car.id}" class="btn btn--gold" style="font-size:12px; padding:10px 14px; justify-content:center;">
            <i class="fas fa-eye"></i> Ver detalhes
          </a>
          <a href="https://wa.me/5527999849266?text=Olá! Tenho interesse no ${encodeURIComponent(car.brand + ' ' + car.model + ' ' + car.year)}" target="_blank" class="btn--whatsapp-card">
            <i class="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>`;
    el.querySelector('.car-card__img img, .car-card__body .car-card__name').addEventListener && el.addEventListener('click', e => {
      if (!e.target.closest('.car-card__fav') && !e.target.closest('.btn--whatsapp-card') && !e.target.closest('.btn')) {
        window.location.href = `produto.html?id=${car.id}`;
      }
    });
    grid.appendChild(el);
  });

  // Favoritos
  document.querySelectorAll('.car-card__fav').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const favs = JSON.parse(localStorage.getItem('menelli_favs') || '[]');
    if (favs.includes(id)) { btn.classList.add('active'); btn.querySelector('i').className = 'fas fa-heart'; }
    btn.addEventListener('click', e => {
      e.stopPropagation();
      let f = JSON.parse(localStorage.getItem('menelli_favs') || '[]');
      if (f.includes(id)) { f = f.filter(x => x !== id); btn.classList.remove('active'); btn.querySelector('i').className = 'far fa-heart'; }
      else { f.push(id); btn.classList.add('active'); btn.querySelector('i').className = 'fas fa-heart'; }
      localStorage.setItem('menelli_favs', JSON.stringify(f));
    });
  });

  // Load more
  const btn = document.getElementById('catLoadMore');
  const info = document.getElementById('catPageInfo');
  if (displayCount >= filtered.length) {
    btn.style.display = 'none';
  } else {
    btn.style.display = 'inline-flex';
  }
  info.textContent = `Exibindo ${Math.min(displayCount, filtered.length)} de ${filtered.length} veículos`;
}

// ============================================
// SKELETON LOADERS
// ============================================
function renderSkeletons() {
  const grid = document.getElementById('catGrid');
  grid.innerHTML = Array(6).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton-line skeleton-line--short"></div>
        <div class="skeleton-line skeleton-line--med"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>`).join('');
}

// ============================================
// LOAD MORE
// ============================================
function initLoadMore() {
  document.getElementById('catLoadMore').addEventListener('click', () => {
    displayCount += 6;
    renderCards();
    window.scrollBy({ top: 300, behavior: 'smooth' });
  });
}

// ============================================
// RESULTADOS COUNT + CHIPS
// ============================================
function updateTotalCount() {
  document.getElementById('totalVehicles').textContent = vehicles.length;
}

function updateResultsCount() {
  document.getElementById('resultsCount').textContent = filtered.length;
}

function renderActiveFilterChips() {
  const container = document.getElementById('activeFilters');
  container.innerHTML = '';
  const chips = [];
  if (activeFilters.brand) chips.push({ label: activeFilters.brand, key: 'brand' });
  activeFilters.tipos.forEach(t => chips.push({ label: getCatLabel(t), key: 'tipo_' + t }));
  if (activeFilters.modelo) chips.push({ label: activeFilters.modelo, key: 'modelo' });
  if (activeFilters.anoMin) chips.push({ label: 'De ' + activeFilters.anoMin, key: 'anoMin' });
  if (activeFilters.anoMax) chips.push({ label: 'Até ' + activeFilters.anoMax, key: 'anoMax' });
  activeFilters.combustiveis.forEach(c => chips.push({ label: c, key: 'comb_' + c }));
  activeFilters.cambios.forEach(c => chips.push({ label: c, key: 'camb_' + c }));

  chips.forEach(chip => {
    const el = document.createElement('span');
    el.className = 'filter-chip';
    el.innerHTML = `${chip.label} <button onclick="removeChip('${chip.key}')"><i class="fas fa-times"></i></button>`;
    container.appendChild(el);
  });
}

function removeChip(key) {
  if (key === 'brand') { activeFilters.brand = ''; document.querySelectorAll('.brand-pill').forEach(p => p.classList.toggle('active', p.dataset.brand === '')); populateModeloSelect(); }
  else if (key === 'modelo') { activeFilters.modelo = ''; document.getElementById('filterModelo').value = ''; }
  else if (key === 'anoMin') { activeFilters.anoMin = ''; document.getElementById('filterAnoMin').value = ''; }
  else if (key === 'anoMax') { activeFilters.anoMax = ''; document.getElementById('filterAnoMax').value = ''; }
  else if (key.startsWith('tipo_')) {
    const t = key.replace('tipo_', '');
    activeFilters.tipos = activeFilters.tipos.filter(x => x !== t);
    const cb = document.querySelector(`#filterTipo input[value="${t}"]`);
    if (cb) cb.checked = false;
  } else if (key.startsWith('comb_')) {
    const c = key.replace('comb_', '');
    activeFilters.combustiveis = activeFilters.combustiveis.filter(x => x !== c);
    const cb = document.querySelector(`#filterCombustivel input[value="${c}"]`);
    if (cb) cb.checked = false;
  } else if (key.startsWith('camb_')) {
    const c = key.replace('camb_', '');
    activeFilters.cambios = activeFilters.cambios.filter(x => x !== c);
    const cb = document.querySelector(`#filterCambio input[value="${c}"]`);
    if (cb) cb.checked = false;
  }
  applyFilters();
}

// ============================================
// VIEW TOGGLE
// ============================================
function initViewToggle() {
  document.getElementById('viewGrid').addEventListener('click', () => {
    viewMode = 'grid';
    document.getElementById('catGrid').classList.remove('list-view');
    document.getElementById('viewGrid').classList.add('active');
    document.getElementById('viewList').classList.remove('active');
  });
  document.getElementById('viewList').addEventListener('click', () => {
    viewMode = 'list';
    document.getElementById('catGrid').classList.add('list-view');
    document.getElementById('viewList').classList.add('active');
    document.getElementById('viewGrid').classList.remove('active');
  });
}

// ============================================
// MOBILE SIDEBAR
// ============================================
function initMobileFilter() {
  const btn = document.getElementById('btnFilterMobile');
  const sidebar = document.getElementById('catSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (btn) btn.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  if (overlay) overlay.addEventListener('click', closeMobileSidebar);
}

function closeMobileSidebar() {
  document.getElementById('catSidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================
// BACK TO TOP
// ============================================
function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
