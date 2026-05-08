/* ============================================================
   MENELLI VEÍCULOS — estoque.js
   ============================================================ */
'use strict';

AuthService.requireAuth();

/* ---- Sidebar setup ---- */
const session = AuthService.getSession();
if (session) {
  document.getElementById('sbName').textContent = session.name || session.user;
  document.getElementById('sbAvatar').textContent = (session.name || session.user)[0].toUpperCase();
}
document.getElementById('hamburger').addEventListener('click', () => document.getElementById('sidebar').classList.toggle('open'));

/* ---- State ---- */
let allVehicles = [];
let filtered    = [];
let currentPage = 1;
const PER_PAGE  = 12;
let editingId   = null;
let deleteId    = null;
let vImages     = [];
let vOpcionais  = [];

const QUICK_OPC = ['Multimídia','Câmera de ré','Câmera 360°','Teto Solar','Couro','Sensor','Wireless','ABS','Airbags','4x4','Turbo','IPVA pago','Piloto automático'];
const CATEGORY_LABEL = { zerokm:'0 km', seminovo:'Seminovo', suv:'SUV', caminhonete:'Caminhonete' };
const STATUS_LABEL   = { disponivel:'Disponível', reservado:'Reservado', vendido:'Vendido' };

/* ---- Load ---- */
function load() {
  allVehicles = DataService.getVehicles();
  populateBrandFilter();
  applyFilters();
}

function populateBrandFilter() {
  const brands = [...new Set(allVehicles.map(v => v.brand))].sort();
  const sel = document.getElementById('fBrand');
  sel.innerHTML = '<option value="">Todas as marcas</option>' +
    brands.map(b => `<option>${b}</option>`).join('');
}

function applyFilters() {
  const search   = document.getElementById('fSearch').value.toLowerCase();
  const status   = document.getElementById('fStatus').value;
  const category = document.getElementById('fCategory').value;
  const brand    = document.getElementById('fBrand').value;
  const feat     = document.getElementById('fFeatured').value;

  filtered = allVehicles.filter(v => {
    if (search && !(`${v.brand} ${v.name}`).toLowerCase().includes(search)) return false;
    if (status   && v.status   !== status)   return false;
    if (category && v.category !== category) return false;
    if (brand    && v.brand    !== brand)    return false;
    if (feat === '1' && !v.featured) return false;
    return true;
  });

  currentPage = 1;
  renderTable();
  updateSidebarCounts();
}

function clearFilters() {
  document.getElementById('fSearch').value = '';
  document.getElementById('fStatus').value = '';
  document.getElementById('fCategory').value = '';
  document.getElementById('fBrand').value = '';
  document.getElementById('fFeatured').value = '';
  applyFilters();
}

/* ---- Render table ---- */
function renderTable() {
  const start = (currentPage - 1) * PER_PAGE;
  const page  = filtered.slice(start, start + PER_PAGE);
  const tbody = document.getElementById('vehicleTableBody');

  document.getElementById('stockCount').textContent = `${filtered.length} veículo(s) encontrado(s)`;

  if (page.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-car"></i><p>Nenhum veículo encontrado</p><button class="btn btn--gold btn--sm" onclick="openVehicleModal()"><i class="fas fa-plus"></i> Adicionar veículo</button></div></td></tr>`;
    renderPagination();
    return;
  }

  tbody.innerHTML = page.map(v => {
    const img = v.images?.[0] || '';
    const imgSrc = img.startsWith('http') ? img : `../../${img}`;
    const margin = v.custoAquisicao && v.priceRaw ? ((v.priceRaw - v.custoAquisicao)).toLocaleString('pt-BR', {style:'currency',currency:'BRL'}) : '—';
    return `
    <tr data-id="${v.id}">
      <td><img class="thumb" src="${imgSrc}" alt="${v.name}" onerror="this.style.background='#333';this.src=''" /></td>
      <td>
        <div style="font-weight:600;font-size:13px;">${v.brand} ${v.name}</div>
        <div style="font-size:11px;color:var(--muted);">${v.price}${v.tag ? ` · <span style="color:var(--gold);">${v.tag}</span>` : ''}</div>
      </td>
      <td><span class="badge badge--${v.category}">${CATEGORY_LABEL[v.category]||v.category}</span></td>
      <td><div>${v.year}</div><div style="font-size:11px;color:var(--muted);">${v.km === '0' ? '0 km' : v.km + ' km'}</div></td>
      <td>
        <div style="font-weight:600;">${v.price}</div>
        ${v.priceOld ? `<div style="font-size:11px;color:var(--muted);text-decoration:line-through;">${v.priceOld}</div>` : ''}
        <div style="font-size:10px;color:var(--success);">Margem: ${margin}</div>
      </td>
      <td><span class="badge badge--${v.status}">${STATUS_LABEL[v.status]||v.status}</span></td>
      <td style="text-align:center;">
        ${v.featured ? '<i class="fas fa-star" style="color:var(--gold);font-size:16px;" title="Em destaque"></i>' : '<i class="far fa-star" style="color:var(--border2);font-size:16px;"></i>'}
      </td>
      <td>
        <div class="action-btns">
          <button class="btn-icon" title="Editar" onclick="openVehicleModal('${v.id}')"><i class="fas fa-pen"></i></button>
          <button class="btn-icon" title="Duplicar" onclick="duplicateVehicle('${v.id}')"><i class="fas fa-copy"></i></button>
          <a href="../../pages/produto.html?id=${v.id}" target="_blank" class="btn-icon" title="Ver no site"><i class="fas fa-external-link-alt"></i></a>
          <button class="btn-icon btn-icon--danger" title="Excluir" onclick="openConfirmModal('${v.id}')"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');

  renderPagination();
}

function renderPagination() {
  const total = Math.ceil(filtered.length / PER_PAGE);
  const info  = document.getElementById('paginationInfo');
  const btns  = document.getElementById('pageBtns');
  info.textContent = `Página ${currentPage} de ${total || 1} · ${filtered.length} registros`;

  btns.innerHTML = '';
  for (let i = 1; i <= total; i++) {
    const b = document.createElement('button');
    b.className = `page-btn${i === currentPage ? ' active' : ''}`;
    b.textContent = i;
    b.addEventListener('click', () => { currentPage = i; renderTable(); });
    btns.appendChild(b);
  }
}

function updateSidebarCounts() {
  document.getElementById('sbVehicles').textContent = allVehicles.length;
  const novos = DataService.getLeads().filter(l => l.status === 'novo').length;
  const sbL = document.getElementById('sbLeads');
  sbL.textContent = novos;
  sbL.style.display = novos > 0 ? 'inline-flex' : 'none';
}

/* ---- Modal ---- */
function openVehicleModal(id = null) {
  editingId  = id;
  vImages    = [];
  vOpcionais = [];

  document.getElementById('modalVehicleTitle').textContent = id ? 'Editar Veículo' : 'Novo Veículo';
  resetForm();

  if (id) {
    const v = DataService.getVehicle(id);
    if (!v) return;
    fillForm(v);
  } else {
    document.getElementById('vDataEntrada').value = new Date().toISOString().split('T')[0];
  }

  renderImagePreviews();
  renderOpcionais();
  renderQuickOpcionais();

  // Ativa 1ª aba
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelector('.tab[data-tab="tab-divulgacao"]').classList.add('active');
  document.getElementById('tab-divulgacao').classList.add('active');

  document.getElementById('vehicleModal').classList.add('open');
}

function fillForm(v) {
  document.getElementById('vBrand').value       = v.brand || '';
  document.getElementById('vName').value        = v.name || '';
  document.getElementById('vCategory').value    = v.category || 'seminovo';
  document.getElementById('vYear').value        = v.year || '';
  document.getElementById('vKm').value          = v.km || '0';
  document.getElementById('vFuel').value        = v.fuel || 'Flex';
  document.getElementById('vTransmission').value = v.transmission || 'Automático';
  document.getElementById('vColor').value       = v.color || '';
  document.getElementById('vPrice').value       = v.price || '';
  document.getElementById('vPriceOld').value    = v.priceOld || '';
  document.getElementById('vParcel').value      = v.parcel || '';
  document.getElementById('vTag').value         = v.tag || '';
  document.getElementById('vDescCurta').value   = v.descricaoCurta || '';
  document.getElementById('vDescription').value = v.description || '';
  document.getElementById('vMeta').value        = v.metaDescription || '';
  document.getElementById('vFeatured').checked  = !!v.featured;
  document.getElementById('vStatus').value      = v.status || 'disponivel';
  document.getElementById('vDataEntrada').value = v.dataEntrada || '';
  document.getElementById('vProcedencia').value = v.procedencia || '0km';
  document.getElementById('vCusto').value       = v.custoAquisicao || '';
  document.getElementById('vObs').value         = v.observacoesInternas || '';
  vImages    = v.images ? [...v.images] : [];
  vOpcionais = v.opcionais ? [...v.opcionais] : [];
  updateMarginCalc();
}

function resetForm() {
  ['vBrand','vName','vYear','vKm','vColor','vPrice','vPriceOld','vParcel','vDescCurta','vDescription','vMeta','vObs'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.getElementById('vCategory').value = 'seminovo';
  document.getElementById('vFuel').value = 'Flex';
  document.getElementById('vTransmission').value = 'Automático';
  document.getElementById('vTag').value = '';
  document.getElementById('vStatus').value = 'disponivel';
  document.getElementById('vProcedencia').value = '0km';
  document.getElementById('vFeatured').checked = false;
  document.getElementById('vCusto').value = '';
  document.getElementById('marginCalc').textContent = '—';
}

function closeVehicleModal() {
  document.getElementById('vehicleModal').classList.remove('open');
  editingId = null;
}

/* ---- Save ---- */
function saveVehicle() {
  const brand = document.getElementById('vBrand').value.trim();
  const name  = document.getElementById('vName').value.trim();
  const year  = document.getElementById('vYear').value;
  const price = document.getElementById('vPrice').value.trim();

  if (!brand || !name || !year || !price) {
    showToast('Preencha os campos obrigatórios: Marca, Modelo, Ano e Preço.', 'error');
    return;
  }

  const priceRaw = parseInt(price.replace(/\D/g, '')) || 0;

  const data = {
    id: editingId || null,
    brand, name,
    category:    document.getElementById('vCategory').value,
    year:        parseInt(year),
    km:          document.getElementById('vKm').value || '0',
    fuel:        document.getElementById('vFuel').value,
    transmission:document.getElementById('vTransmission').value,
    color:       document.getElementById('vColor').value,
    price,
    priceRaw,
    priceOld:    document.getElementById('vPriceOld').value || null,
    parcel:      document.getElementById('vParcel').value,
    tag:         document.getElementById('vTag').value || null,
    featured:    document.getElementById('vFeatured').checked,
    descricaoCurta:   document.getElementById('vDescCurta').value,
    description:      document.getElementById('vDescription').value,
    metaDescription:  document.getElementById('vMeta').value,
    images:      vImages,
    opcionais:   vOpcionais,
    status:      document.getElementById('vStatus').value,
    dataEntrada: document.getElementById('vDataEntrada').value,
    procedencia: document.getElementById('vProcedencia').value,
    custoAquisicao: parseInt(document.getElementById('vCusto').value) || 0,
    observacoesInternas: document.getElementById('vObs').value,
  };

  DataService.saveVehicle(data);
  closeVehicleModal();
  load();
  showToast(editingId ? 'Veículo atualizado!' : 'Veículo cadastrado com sucesso!', 'success');
}

/* ---- Duplicate ---- */
function duplicateVehicle(id) {
  const v = DataService.getVehicle(id);
  if (!v) return;
  const copy = { ...v, id: null, name: v.name + ' (Cópia)', status: 'disponivel' };
  DataService.saveVehicle(copy);
  load();
  showToast('Veículo duplicado!', 'info');
}

/* ---- Delete ---- */
function openConfirmModal(id) {
  deleteId = id;
  document.getElementById('confirmModal').classList.add('open');
  document.getElementById('confirmDeleteBtn').onclick = () => {
    DataService.deleteVehicle(deleteId);
    closeConfirmModal();
    load();
    showToast('Veículo excluído.', 'error');
  };
}
function closeConfirmModal() {
  document.getElementById('confirmModal').classList.remove('open');
  deleteId = null;
}

/* ---- Images ---- */
function addImageUrl() {
  const inp = document.getElementById('imgUrlInput');
  const url = inp.value.trim();
  if (!url) return;
  vImages.push(url);
  inp.value = '';
  renderImagePreviews();
}

function removeImage(i) {
  vImages.splice(i, 1);
  renderImagePreviews();
}

function renderImagePreviews() {
  const grid = document.getElementById('imgPreviewGrid');
  if (!vImages.length) {
    grid.innerHTML = '<div style="color:var(--muted);font-size:13px;padding:12px 0;">Nenhuma imagem adicionada</div>';
    return;
  }
  grid.innerHTML = vImages.map((url, i) => `
    <div class="img-preview-item">
      <img src="${url}" alt="img ${i+1}" onerror="this.style.background='#333'" />
      <div class="remove" onclick="removeImage(${i})"><i class="fas fa-times"></i></div>
      ${i === 0 ? '<div style="position:absolute;bottom:2px;left:2px;background:var(--gold);color:#000;font-size:9px;font-weight:700;padding:1px 4px;border-radius:2px;">PRINCIPAL</div>' : ''}
    </div>`).join('');
}

/* ---- Opcionais ---- */
function addOpcional(val = null) {
  const inp = document.getElementById('opcionalInput');
  const v = val || inp.value.trim();
  if (!v || vOpcionais.includes(v)) return;
  vOpcionais.push(v);
  if (!val) inp.value = '';
  renderOpcionais();
}

function removeOpcional(i) {
  vOpcionais.splice(i, 1);
  renderOpcionais();
}

function renderOpcionais() {
  document.getElementById('opcionaisList').innerHTML = vOpcionais.map((op, i) => `
    <div class="tag">${op} <span class="tag-remove" onclick="removeOpcional(${i})"><i class="fas fa-times"></i></span></div>`).join('');
}

function renderQuickOpcionais() {
  document.getElementById('quickOpcionais').innerHTML = QUICK_OPC.map(op => `
    <button onclick="addOpcional('${op}')" class="btn btn--outline btn--sm" style="font-size:11px;">${op}</button>`).join('');
}

/* ---- Margin calc ---- */
function updateMarginCalc() {
  const priceRaw = parseInt((document.getElementById('vPrice').value||'').replace(/\D/g,'')) || 0;
  const custo    = parseInt(document.getElementById('vCusto').value) || 0;
  const el = document.getElementById('marginCalc');
  if (!priceRaw || !custo) { el.textContent = '—'; el.style.color = 'var(--gold)'; return; }
  const margin = priceRaw - custo;
  el.textContent = margin.toLocaleString('pt-BR', {style:'currency',currency:'BRL'}) + ` (${Math.round(margin/custo*100)}%)`;
  el.style.color = margin > 0 ? 'var(--success)' : 'var(--danger)';
}

/* ---- Export ---- */
function exportVehicles() {
  const blob = new Blob([JSON.stringify(allVehicles, null, 2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `estoque-menelli-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  showToast('Exportação concluída!', 'success');
}

/* ---- Toast ---- */
function showToast(msg, type = 'info') {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  t.innerHTML = `<i class="fas fa-${type==='success'?'check-circle':type==='error'?'times-circle':'info-circle'}"></i> ${msg}`;
  c.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3000);
}

/* ---- Event listeners ---- */
document.addEventListener('DOMContentLoaded', () => {
  load();

  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Filters
  ['fSearch','fStatus','fCategory','fBrand','fFeatured'].forEach(id => {
    document.getElementById(id).addEventListener('input', applyFilters);
    document.getElementById(id).addEventListener('change', applyFilters);
  });

  // Margin calc
  document.getElementById('vPrice').addEventListener('input', updateMarginCalc);
  document.getElementById('vCusto').addEventListener('input', updateMarginCalc);

  // Modal overlay click
  document.getElementById('vehicleModal').addEventListener('click', e => {
    if (e.target === document.getElementById('vehicleModal')) closeVehicleModal();
  });
  document.getElementById('confirmModal').addEventListener('click', e => {
    if (e.target === document.getElementById('confirmModal')) closeConfirmModal();
  });

  // Enter na imagem
  document.getElementById('imgUrlInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); addImageUrl(); }
  });

  // Enter no opcional
  document.getElementById('opcionalInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); addOpcional(); }
  });
});

window.openVehicleModal   = openVehicleModal;
window.closeVehicleModal  = closeVehicleModal;
window.saveVehicle        = saveVehicle;
window.duplicateVehicle   = duplicateVehicle;
window.openConfirmModal   = openConfirmModal;
window.closeConfirmModal  = closeConfirmModal;
window.addImageUrl        = addImageUrl;
window.removeImage        = removeImage;
window.addOpcional        = addOpcional;
window.removeOpcional     = removeOpcional;
window.clearFilters       = clearFilters;
window.exportVehicles     = exportVehicles;
