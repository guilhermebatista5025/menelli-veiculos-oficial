/* ============================================================
   MENELLI VEÍCULOS — depoimentos.js
   ============================================================ */
'use strict';

buildSidebar('depoimentos');
setTopbarDate();

let allTestis = [], currentFilter = 'all', editingId = null, currentStar = 5;

function load() {
  allTestis = DataService.getTestimonials();
  document.getElementById('cntAtivos').textContent = allTestis.filter(t => t.ativo).length;
  document.getElementById('cntTotal').textContent  = allTestis.length;
  renderCards();
}

function filterCards(f) {
  currentFilter = f;
  ['all','active','inactive'].forEach(id => {
    document.getElementById('filter'+id.charAt(0).toUpperCase()+id.slice(1))?.classList.remove('btn--gold');
  });
  document.getElementById('filter'+f.charAt(0).toUpperCase()+f.slice(1))?.classList.add('btn--gold');
  renderCards();
}

function renderCards() {
  const list = allTestis.filter(t => {
    if (currentFilter === 'active')   return t.ativo;
    if (currentFilter === 'inactive') return !t.ativo;
    return true;
  });
  const grid = document.getElementById('testiGrid');
  if (!list.length) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><i class="fas fa-star"></i><p>Nenhum depoimento encontrado</p><button class="btn btn--gold btn--sm" onclick="openModal()"><i class="fas fa-plus"></i> Adicionar</button></div>`;
    return;
  }
  grid.innerHTML = list.map(t => {
    const stars = Array.from({length:5}, (_,i) =>
      `<i class="fas fa-star" style="color:${i < t.nota ? 'var(--gold)' : '#333'};"></i>`).join('');
    return `
    <div class="testi-preview-card${t.ativo ? '' : ' inactive'}">
      <div class="card-actions">
        <button class="btn-icon" title="${t.ativo ? 'Desativar' : 'Ativar'}" onclick="toggleActive('${t.id}')">
          <i class="fas fa-${t.ativo ? 'eye-slash' : 'eye'}"></i>
        </button>
        <button class="btn-icon" title="Editar" onclick="openModal('${t.id}')"><i class="fas fa-pen"></i></button>
        <button class="btn-icon btn-icon--danger" title="Excluir" onclick="deleteT('${t.id}')"><i class="fas fa-trash"></i></button>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <div class="stars">${stars}</div>
        <span class="badge ${t.ativo ? 'badge-active' : 'badge-inactive'}">${t.ativo ? 'Ativo' : 'Inativo'}</span>
      </div>
      <p class="quote">"${t.texto}"</p>
      <div class="author">
        <div class="avatar">${t.nome[0].toUpperCase()}</div>
        <div>
          <div class="author-name">${t.nome}</div>
          <div class="author-city"><i class="fas fa-map-marker-alt" style="font-size:10px;color:var(--gold);margin-right:3px;"></i>${t.cidade||''}</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ---- Toggle active ---- */
function toggleActive(id) {
  const t = allTestis.find(t => t.id === id);
  if (!t) return;
  DataService.saveTestimonial({ ...t, ativo: !t.ativo });
  load();
  adminToast(t.ativo ? 'Depoimento ocultado do site.' : 'Depoimento ativado no site!', t.ativo ? 'info' : 'success');
}

/* ---- Modal ---- */
function openModal(id = null) {
  editingId = id;
  document.getElementById('testiModalTitle').textContent = id ? 'Editar Depoimento' : 'Novo Depoimento';
  if (id) {
    const t = allTestis.find(t => t.id === id);
    if (t) {
      document.getElementById('tNome').value   = t.nome   || '';
      document.getElementById('tCidade').value = t.cidade || '';
      document.getElementById('tTexto').value  = t.texto  || '';
      document.getElementById('tAtivo').checked = !!t.ativo;
      currentStar = t.nota || 5;
    }
  } else {
    ['tNome','tCidade','tTexto'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('tAtivo').checked = true;
    currentStar = 5;
  }
  document.getElementById('tNota').value = currentStar;
  updateStars(currentStar);
  document.getElementById('testiModal').classList.add('open');
}
function closeModal() { document.getElementById('testiModal').classList.remove('open'); editingId = null; }

function saveTestimonial() {
  const nome  = document.getElementById('tNome').value.trim();
  const texto = document.getElementById('tTexto').value.trim();
  if (!nome || !texto) { adminToast('Preencha o nome e o depoimento.', 'error'); return; }
  DataService.saveTestimonial({
    id:     editingId || null,
    nome,
    cidade: document.getElementById('tCidade').value.trim(),
    texto,
    nota:   parseInt(document.getElementById('tNota').value) || 5,
    ativo:  document.getElementById('tAtivo').checked,
  });
  closeModal();
  load();
  adminToast(editingId ? 'Depoimento atualizado!' : 'Depoimento criado!', 'success');
}

function deleteT(id) {
  adminConfirm('Excluir depoimento?', 'O depoimento será removido permanentemente.', () => {
    DataService.deleteTestimonial(id);
    load();
    adminToast('Depoimento excluído.', 'error');
  });
}

/* ---- Star rating ---- */
function updateStars(n) {
  document.querySelectorAll('#starRating i').forEach((star, i) => {
    star.style.color = i < n ? 'var(--gold)' : '#333';
  });
}

/* ---- Events ---- */
document.addEventListener('DOMContentLoaded', () => {
  load();
  filterCards('all');

  document.querySelectorAll('#starRating i').forEach(star => {
    star.addEventListener('click', () => {
      currentStar = parseInt(star.dataset.star);
      document.getElementById('tNota').value = currentStar;
      updateStars(currentStar);
    });
    star.addEventListener('mouseenter', () => updateStars(parseInt(star.dataset.star)));
    star.addEventListener('mouseleave', () => updateStars(currentStar));
  });

  document.getElementById('testiModal').addEventListener('click', e => {
    if (e.target === document.getElementById('testiModal')) closeModal();
  });
});

window.openModal        = openModal;
window.closeModal       = closeModal;
window.saveTestimonial  = saveTestimonial;
window.toggleActive     = toggleActive;
window.deleteT          = deleteT;
window.filterCards      = filterCards;
