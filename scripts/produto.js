/* ============================================
   MENELLI VEÍCULOS — produto.js
   ============================================ */

const vehicles = [
  { id: 1, brand: "Toyota", model: "Corolla XEi 2.0 Flex", category: "seminovo", year: 2023, km: "28.500", fuel: "Flex", color: "Prata", transmission: "Automático", priceNum: 139900, price: "R$ 139.900", priceOld: "R$ 148.900", parcel: "R$ 2.399/mês", image: "../imagens/corolla.png", description: "Corolla XEi 2.0 Flex Automático, completo. Único dono, IPVA pago, revisado em concessionária Toyota. Pneus novos. Aceita financiamento e troca.", features: ["Air-bag duplo", "ABS + EBD", "Multimídia Toyota", "Câmera de ré", "Couro", "Sensor de estacionamento", "IPVA pago", "Único dono"] },
  { id: 2, brand: "Jeep", model: "Compass Limited 2.0", category: "suv", year: 2024, km: "0", fuel: "Diesel", color: "Branco", transmission: "Automático", priceNum: 289990, price: "R$ 289.990", priceOld: null, parcel: "R$ 4.899/mês", image: "../imagens/jeep-compass.jpeg", description: "Compass Limited 4x4 Diesel 2024, equipamento completo, teto solar panorâmico, couro, ADAS completo. Pronto para entrega.", features: ["Teto solar panorâmico", "Bancos em couro", "4x4", "ADAS completo", "Multimídia 10\"", "Câmera 360°", "ACC", "Lane Keeping"] },
  { id: 3, brand: "Volkswagen", model: "T-Cross Highline TSI", category: "suv", year: 2023, km: "15.200", fuel: "Gasolina", color: "Azul", transmission: "Automático", priceNum: 135500, price: "R$ 135.500", priceOld: "R$ 142.000", parcel: "R$ 2.290/mês", image: "../imagens/t-cross.jpeg", description: "T-Cross Highline TSI Automático, único dono. Completo com teto, couro, central multimídia. IPVA pago.", features: ["Teto solar", "Bancos em couro", "Multimídia 10\"", "Câmera traseira", "Wireless", "Único dono", "IPVA pago", "Sensor de chuva"] },
  { id: 4, brand: "Chevrolet", model: "S10 High Country 2.8", category: "caminhonete", year: 2023, km: "32.000", fuel: "Diesel", color: "Preto", transmission: "Automático", priceNum: 318900, price: "R$ 318.900", priceOld: "R$ 340.000", parcel: "R$ 5.299/mês", image: "../imagens/s10.jpeg", description: "S10 High Country 4x4 CD Diesel 2023, completa, couro, multimídia 8\", câmera 360°. Garantia de fábrica.", features: ["4x4", "Bancos em couro", "Multimídia 8\"", "Câmera 360°", "Garantia fábrica", "Sensor traseiro", "Capota marítima", "Estribo lateral"] },
  { id: 5, brand: "Honda", model: "HR-V EX CVT", category: "suv", year: 2024, km: "0", fuel: "Flex", color: "Vermelho", transmission: "CVT", priceNum: 178590, price: "R$ 178.590", priceOld: null, parcel: "R$ 2.999/mês", image: "../imagens/hrv.jpeg", description: "HR-V EX 0km 2024, multimídia 9\" Honda Connect, lane watch, câmera traseira, carregador wireless.", features: ["Multimídia 9\"", "Lane Watch", "Carregador wireless", "Câmera traseira", "Honda Sensing", "Controle de cruzeiro", "Start/Stop", "0 km"] },
  { id: 6, brand: "Hyundai", model: "HB20S Diamond Plus", category: "seminovo", year: 2022, km: "41.000", fuel: "Flex", color: "Cinza", transmission: "Automático", priceNum: 89900, price: "R$ 89.900", priceOld: "R$ 98.000", parcel: "R$ 1.499/mês", image: "../imagens/hb20.jpeg", description: "HB20S Diamond Plus 1.0 Turbo Automático. Completo, multimídia, câmera, sensor de estacionamento.", features: ["Motor turbo", "Multimídia", "Câmera de ré", "Sensor dianteiro", "Ar condicionado", "Direção elétrica", "Alarme", "Revisado"] },
  { id: 7, brand: "Toyota", model: "Hilux SRX 2.8 4x4", category: "caminhonete", year: 2024, km: "0", fuel: "Diesel", color: "Branco", transmission: "Automático", priceNum: 399990, price: "R$ 399.990", priceOld: null, parcel: "R$ 6.799/mês", image: "../imagens/hillux-srx.jpeg", description: "Hilux SRX 0km 2024 com teto solar, couro bege, câmera 360°, multimídia 8\", ACC, LDWS.", features: ["Teto solar", "Couro bege", "Câmera 360°", "Multimídia 8\"", "ACC", "LDWS", "4x4 Diesel", "0 km"] },
  { id: 8, brand: "Volkswagen", model: "Polo Track 1.0", category: "zerokm", year: 2024, km: "0", fuel: "Flex", color: "Branco", transmission: "Manual", priceNum: 79990, price: "R$ 79.990", priceOld: null, parcel: "R$ 1.299/mês", image: "../imagens/polo.jpeg", description: "Polo Track 1.0 Flex 0km 2024. Conectividade wireless, câmera de ré, freios ABS, airbags.", features: ["Wireless Android/Apple", "Câmera de ré", "Freios ABS", "6 airbags", "Controle de estabilidade", "Ar condicionado", "0 km", "Garantia fábrica"] },
  { id: 9, brand: "Jeep", model: "Renegade Sport 1.3", category: "zerokm", year: 2024, km: "0", fuel: "Flex", color: "Azul", transmission: "Automático", priceNum: 149990, price: "R$ 149.990", priceOld: null, parcel: "R$ 2.499/mês", image: "../imagens/jeep-renegade.jpeg", description: "Renegade Sport 1.3 T270 0km 2024. Turbo, automático 6 marchas, multimídia 7\", câmera de ré.", features: ["Motor turbo", "Câmbio automático 6v", "Multimídia 7\"", "Câmera de ré", "Tração 4x2", "Controle de cruzeiro", "Entrega imediata", "0 km"] },
  { id: 10, brand: "Honda", model: "Civic EXL 2.0 Flex", category: "seminovo", year: 2022, km: "38.000", fuel: "Flex", color: "Preto", transmission: "CVT", priceNum: 154900, price: "R$ 154.900", priceOld: "R$ 168.000", parcel: "R$ 2.699/mês", image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80", description: "Civic EXL Sedan 2022, Honda Sensing, couro bege, câmera 360°, teto solar. Revisado e com garantia.", features: ["Honda Sensing", "Couro bege", "Câmera 360°", "Teto solar", "CVT", "Revisado", "Garantia 6 meses", "Laudo cautelar"] },
  { id: 11, brand: "Nissan", model: "Kicks Advance CVT", category: "suv", year: 2023, km: "22.000", fuel: "Flex", color: "Cinza", transmission: "CVT", priceNum: 149500, price: "R$ 149.500", priceOld: "R$ 162.000", parcel: "R$ 2.499/mês", image: "https://images.unsplash.com/photo-1593055357429-62b0ef1f1f76?w=600&q=80", description: "Kicks Advance 1.6 CVT 2023, câmera 360°, ProPILOT, couro, teto solar. Revisada e com laudo cautelar.", features: ["ProPILOT", "Câmera 360°", "Teto solar", "Bancos em couro", "CVT", "Laudo cautelar", "Único dono", "IPVA pago"] },
  { id: 12, brand: "Chevrolet", model: "Tracker Midnight 1.2", category: "zerokm", year: 2024, km: "0", fuel: "Flex", color: "Preto", transmission: "Automático", priceNum: 161990, price: "R$ 161.990", priceOld: null, parcel: "R$ 2.699/mês", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80", description: "Tracker Midnight 0km 2024, edição especial. Motor turbo, multimídia 8\", wireless, câmeras laterais.", features: ["Edição Midnight", "Motor turbo", "Multimídia 8\"", "Wireless", "Câmeras laterais", "Câmera traseira", "0 km", "Garantia fábrica"] },
  { id: 13, brand: "Ford", model: "Ranger XLS 2.2 4x4", category: "caminhonete", year: 2023, km: "45.000", fuel: "Diesel", color: "Prata", transmission: "Manual", priceNum: 215000, price: "R$ 215.000", priceOld: "R$ 235.000", parcel: "R$ 3.699/mês", image: "https://images.unsplash.com/photo-1589750602846-60028879da09?w=600&q=80", description: "Ranger XLS 4x4 Diesel 2023, revisada, câmera de ré, ar condicionado, direção hidráulica.", features: ["4x4 Diesel", "Câmera de ré", "Ar condicionado", "Direção hidráulica", "Vidros elétricos", "Travamento central", "Revisado", "Laudo cautelar"] },
  { id: 14, brand: "Mitsubishi", model: "Eclipse Cross 1.5T", category: "suv", year: 2023, km: "18.000", fuel: "Gasolina", color: "Vermelho", transmission: "CVT", priceNum: 199900, price: "R$ 199.900", priceOld: "R$ 219.000", parcel: "R$ 3.399/mês", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80", description: "Eclipse Cross 1.5T CVT 2023, couro, teto solar, multimídia 8\", câmera 360°.", features: ["Teto solar", "Bancos em couro", "Multimídia 8\"", "Câmera 360°", "Motor turbo", "CVT", "Único dono", "Revisado"] }
];

const WHATSAPP = '5527999849266';
let currentCar = null;

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  loadVehicle();
  initModals();
  initBackTop();
});

// ============================================
// HEADER
// ============================================
function initHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));
  const hb = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hb) hb.addEventListener('click', () => { hb.classList.toggle('open'); nav.classList.toggle('open'); });
}

// ============================================
// LOAD VEHICLE
// ============================================
function loadVehicle() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const car = vehicles.find(v => v.id === id);

  if (!car) {
    document.getElementById('produtoLoading').innerHTML = `
      <div style="text-align:center;padding:60px 20px;">
        <i class="fas fa-exclamation-triangle" style="font-size:48px;color:var(--gold);display:block;margin-bottom:16px;"></i>
        <h2 style="color:var(--white);margin-bottom:10px;">Veículo não encontrado</h2>
        <a href="catalogo.html" class="btn btn--gold">Ver catálogo</a>
      </div>`;
    return;
  }

  currentCar = car;
  document.getElementById('produtoLoading').style.display = 'none';
  document.getElementById('produtoContent').style.display = 'grid';

  // SEO
  document.getElementById('pageTitle').textContent = `${car.brand} ${car.model} ${car.year} — Menelli Veículos`;
  document.getElementById('pageDesc').content = `${car.brand} ${car.model} ${car.year} por ${car.price}. ${car.description}`;
  document.getElementById('breadcrumbName').textContent = car.model;

  // Galeria
  buildGallery(car);

  // Info
  document.getElementById('produtoBreadtag').innerHTML = `
    <span class="produto-brand-label">${car.brand}</span>
    <span class="produto-cat-label">${getCatLabel(car.category)}</span>`;
  document.getElementById('produtoNome').textContent = car.model;
  document.getElementById('produtoYearTag').innerHTML = `
    <span class="year-badge">${car.year}</span>
    <span class="km-badge"><i class="fas fa-tachometer-alt"></i> ${car.km === '0' ? '0 km' : car.km + ' km'}</span>`;

  // Preço
  if (car.priceOld) document.getElementById('produtoPrecoOld').textContent = car.priceOld;
  document.getElementById('produtoPreco').textContent = car.price;
  document.getElementById('produtoParcel').innerHTML = `ou <strong>${car.parcel}</strong>`;

  // Specs
  document.getElementById('produtoSpecsGrid').innerHTML = [
    { icon: 'fa-calendar-alt', val: car.year, label: 'Ano' },
    { icon: 'fa-tachometer-alt', val: car.km === '0' ? '0 km' : car.km + ' km', label: 'Quilometragem' },
    { icon: 'fa-gas-pump', val: car.fuel, label: 'Combustível' },
    { icon: 'fa-cog', val: car.transmission, label: 'Câmbio' },
    { icon: 'fa-palette', val: car.color, label: 'Cor' },
    { icon: 'fa-tag', val: car.parcel, label: 'Parcela' }
  ].map(s => `<div class="p-spec"><i class="fas ${s.icon}"></i><strong>${s.val}</strong><span>${s.label}</span></div>`).join('');

  // Descrição
  document.getElementById('produtoDesc').textContent = car.description;

  // Features
  if (car.features && car.features.length) {
    document.getElementById('produtoFeatures').innerHTML = `
      <h4>Equipamentos e Opcionais</h4>
      <ul class="features-list">
        ${car.features.map(f => `<li class="feature-item"><i class="fas fa-check-circle"></i>${f}</li>`).join('')}
      </ul>`;
  }

  // WhatsApp
  const waMsg = encodeURIComponent(`Olá! Tenho interesse no ${car.brand} ${car.model} ${car.year} — ${car.price}`);
  document.getElementById('btnWhatsappProduto').href = `https://wa.me/${WHATSAPP}?text=${waMsg}`;

  // Favorito
  const favBtn = document.getElementById('galleryFav');
  const favs = JSON.parse(localStorage.getItem('menelli_favs') || '[]');
  if (favs.includes(car.id)) { favBtn.classList.add('active'); favBtn.querySelector('i').className = 'fas fa-heart'; }
  favBtn.addEventListener('click', () => {
    let f = JSON.parse(localStorage.getItem('menelli_favs') || '[]');
    if (f.includes(car.id)) { f = f.filter(x => x !== car.id); favBtn.classList.remove('active'); favBtn.querySelector('i').className = 'far fa-heart'; }
    else { f.push(car.id); favBtn.classList.add('active'); favBtn.querySelector('i').className = 'fas fa-heart'; }
    localStorage.setItem('menelli_favs', JSON.stringify(f));
  });

  // Share
  document.getElementById('galleryShare').addEventListener('click', () => {
    if (navigator.share) navigator.share({ title: car.model, url: window.location.href });
    else { navigator.clipboard.writeText(window.location.href); showToast('🔗 Link copiado!'); }
  });

  // Relacionados
  buildRelacionados(car);

  // Financiamento modal car info
  document.getElementById('finModalCar').innerHTML = `<strong>${car.brand} ${car.model} ${car.year}</strong><span>${car.price}</span>`;
  document.getElementById('finValorCar').textContent = car.price;
  updateFinCalc();
}

// ============================================
// GALERIA
// ============================================
function buildGallery(car) {
  const extras = [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=60',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=60',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=60',
    'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=600&q=60'
  ];
  const images = [car.image, ...extras];
  const main = document.getElementById('galleryMain');
  main.src = car.image;
  main.alt = car.model;

  // Badge
  document.getElementById('galleryBadges').innerHTML = `
    <span class="car-card__badge badge--${car.category}">${getCatLabel(car.category)}</span>
    ${car.km === '0' ? '<span class="car-card__badge badge--0km" style="left:auto;margin-left:8px;">0 km</span>' : ''}`;

  // Thumbs
  const thumbsEl = document.getElementById('galleryThumbs');
  thumbsEl.innerHTML = images.map((img, i) => `
    <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}">
      <img src="${img}" alt="${car.model} ${i + 1}" loading="lazy" />
    </div>`).join('');

  thumbsEl.querySelectorAll('.gallery-thumb').forEach(t => {
    t.addEventListener('click', () => {
      thumbsEl.querySelectorAll('.gallery-thumb').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      main.src = images[parseInt(t.dataset.idx)];
    });
  });
}

// ============================================
// RELACIONADOS
// ============================================
function buildRelacionados(car) {
  const rel = vehicles.filter(v => v.id !== car.id && (v.brand === car.brand || v.category === car.category)).slice(0, 4);
  if (!rel.length) { document.getElementById('relacionados').style.display = 'none'; return; }
  document.getElementById('relacionadosGrid').innerHTML = rel.map(v => `
    <div class="car-card" onclick="window.location.href='produto.html?id=${v.id}'" style="cursor:pointer;">
      <div class="car-card__img">
        <img src="${v.image}" alt="${v.model}" loading="lazy" />
        <span class="car-card__badge badge--${v.category}">${getCatLabel(v.category)}</span>
      </div>
      <div class="car-card__body">
        <div class="car-card__brand">${v.brand}</div>
        <div class="car-card__name">${v.model}</div>
        <div class="car-card__specs">
          <span class="car-card__spec"><i class="fas fa-calendar"></i> ${v.year}</span>
          <span class="car-card__spec"><i class="fas fa-tachometer-alt"></i> ${v.km === '0' ? '0 km' : v.km + ' km'}</span>
        </div>
        <div class="car-card__price-block">
          ${v.priceOld ? `<div class="car-card__price-old">${v.priceOld}</div>` : ''}
          <div class="car-card__price">${v.price}</div>
        </div>
      </div>
    </div>`).join('');
}

function getCatLabel(cat) {
  return { zerokm: '0 km', seminovo: 'Seminovo', suv: 'SUV', caminhonete: 'Caminhonete' }[cat] || cat;
}

// ============================================
// MODAIS
// ============================================
function initModals() {
  // Abrir modal saber mais
  document.getElementById('btnSaberMais').addEventListener('click', () => openInfoModal());
  document.getElementById('btnFinanciar').addEventListener('click', () => openFinModal());
  document.getElementById('infoModalClose').addEventListener('click', closeInfoModal);
  document.getElementById('finModalClose').addEventListener('click', closeFinModal);

  document.getElementById('infoModalOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeInfoModal(); });
  document.getElementById('finModalOverlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeFinModal(); });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeInfoModal(); closeFinModal(); } });

  // Form submit
  document.getElementById('infoForm').addEventListener('submit', handleInfoSubmit);

  // Troca group
  document.getElementById('infoInteresse').addEventListener('change', e => {
    document.getElementById('trocaGroup').style.display = e.target.value === 'troca' ? 'flex' : 'none';
  });

  // Fin slider
  const finSlider = document.getElementById('finEntrada');
  const finLabel = document.getElementById('finEntradaVal');
  finSlider.addEventListener('input', () => { finLabel.textContent = finSlider.value + '%'; updateFinCalc(); });
  document.getElementById('finParcelas').addEventListener('change', updateFinCalc);

  // Confirm fin
  document.getElementById('btnFinConfirm').addEventListener('click', () => {
    if (!currentCar) return;
    const msg = encodeURIComponent(`Olá! Quero financiar o ${currentCar.brand} ${currentCar.model} ${currentCar.year} (${currentCar.price}). Entrada: ${finLabel.textContent}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  });
}

function openInfoModal() {
  if (!currentCar) return;
  document.getElementById('infoModalPreview').innerHTML = `<img src="${currentCar.image}" alt="${currentCar.model}" />`;
  document.getElementById('infoModalTitle').textContent = `${currentCar.brand} ${currentCar.model} ${currentCar.year}`;
  document.getElementById('infoModalPrice').textContent = currentCar.price;
  document.getElementById('infoModalOverlay').classList.add('open');
  document.getElementById('infoSuccess').classList.remove('show');
  document.getElementById('infoForm').style.display = 'flex';
  document.getElementById('infoForm').style.flexDirection = 'column';
  document.body.style.overflow = 'hidden';
}

function closeInfoModal() {
  document.getElementById('infoModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function openFinModal() {
  document.getElementById('finModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  updateFinCalc();
}

function closeFinModal() {
  document.getElementById('finModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function updateFinCalc() {
  if (!currentCar) return;
  const entrada = parseInt(document.getElementById('finEntrada').value) / 100;
  const parcStr = document.getElementById('finParcelas').value;
  const parc = parseInt(parcStr.replace('x', ''));
  const taxa = 0.0079;
  const entradaVal = currentCar.priceNum * entrada;
  const financiado = currentCar.priceNum - entradaVal;
  const parcela = financiado * (taxa * Math.pow(1 + taxa, parc)) / (Math.pow(1 + taxa, parc) - 1);

  document.getElementById('finValorEntrada').textContent = 'R$ ' + entradaVal.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  document.getElementById('finValorParcela').textContent = `R$ ${parcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${parcStr})`;
}

// ============================================
// FORM SUBMIT
// ============================================
function handleInfoSubmit(e) {
  e.preventDefault();
  let valid = true;

  const nome = document.getElementById('infoNome');
  const tel = document.getElementById('infoTelefone');
  const terms = document.getElementById('infoTerms');

  document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.info-form-group input, .info-form-group textarea').forEach(el => el.classList.remove('error'));

  if (!nome.value.trim()) { document.getElementById('errNome').textContent = 'Informe seu nome.'; nome.classList.add('error'); valid = false; }
  if (!tel.value.trim() || tel.value.length < 8) { document.getElementById('errTelefone').textContent = 'Telefone inválido.'; tel.classList.add('error'); valid = false; }
  if (!terms.checked) { document.getElementById('errTerms').textContent = 'Aceite para continuar.'; valid = false; }
  if (!valid) return;

  const btn = document.getElementById('infoSubmitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

  setTimeout(() => {
    // Monta mensagem WhatsApp
    const interesse = document.getElementById('infoInteresse').value;
    const contato = document.getElementById('infoContato').value;
    const msg = document.getElementById('infoMensagem').value;
    const troca = document.getElementById('infoVeiculoTroca').value;
    let waText = `Olá! Meu nome é ${nome.value}.\nTenho interesse em: ${currentCar.brand} ${currentCar.model} ${currentCar.year} (${currentCar.price})\nInteresse: ${interesse}\nContato preferido: ${contato}\nTelefone: ${tel.value}`;
    if (msg) waText += `\nMensagem: ${msg}`;
    if (troca) waText += `\nVeículo para troca: ${troca}`;

    // Exibe sucesso
    document.getElementById('infoForm').style.display = 'none';
    document.getElementById('infoSuccess').classList.add('show');

    // Abre WhatsApp
    setTimeout(() => { window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(waText)}`, '_blank'); }, 800);

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar minha solicitação';
  }, 1200);
}

// ============================================
// TOAST + BACK TOP
// ============================================
function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--black-card);border:1px solid rgba(201,168,76,.35);color:var(--white);padding:12px 24px;border-radius:30px;font-family:var(--font-ui);font-size:14px;z-index:3000;opacity:0;transition:all .3s ease;pointer-events:none;';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(0)'; });
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2500);
}

function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
