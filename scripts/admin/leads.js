/* ============================================================
   MENELLI VEÍCULOS — leads.js
   ============================================================ */
'use strict';

buildSidebar('leads');
setTopbarDate();

const PER_PAGE = 15;
let allLeads = [], filtered = [], currentPage = 1, editingId = null;

const STATUS_LABEL = { novo:'Novo', atendendo:'Em Atendimento', finalizado:'Finalizado' };
const STATUS_CSS   = { novo:'badge--novo', atendendo:'badge--atendendo', finalizado:'badge--finalizado' };

function load() {
  allLeads = DataService.getLeads();
  applyFilters();
  loadKPIs();
}

function loadKPIs() {
  document.getElementById('kNovos').textContent     = allLeads.filter(l => l.status === 'novo').length;
  document.getElementById('kAtendendo').textContent = allLeads.filter(l => l.status === 'atendendo').length;
  document.getElementById('kFinalizado').textContent= allLeads.filter(l => l.status === 'finalizado').length;
  document.getElementById('kTotal').textContent     = allLeads.length;
}

function applyFilters() {
  const search = document.getElementById('fSearch').value.toLowerCase();
  const status = document.getElementById('fStatus').value;
  const inter  = document.getElementById('fInteresse').value;
  const dIni   = document.getElementById('fDataInicio').value;
  const dFim   = document.getElementById('fDataFim').value;

  filtered = allLeads.filter(l => {
    if (search && !(`${l.nome||''} ${l.telefone||''} ${l.email||''}`).toLowerCase().includes(search)) return false;
    if (status && l.status !== status) return false;
    if (inter  && l.interesse !== inter) return false;
    if (dIni && l.createdAt && l.createdAt < dIni) return false;
    if (dFim && l.createdAt && l.createdAt.split('T')[0] > dFim) return false;
    return true;
  });
  currentPage = 1;
  renderTable();
}

function clearFilters() {
  ['fSearch','fDataInicio','fDataFim'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fStatus').value = '';
  document.getElementById('fInteresse').value = '';
  applyFilters();
}

function renderTable() {
  const start = (currentPage - 1) * PER_PAGE;
  const page  = filtered.slice(start, start + PER_PAGE);
  const tbody = document.getElementById('leadsTableBody');
  const cfg   = DataService.getConfig();

  if (!page.length) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><i class="fas fa-users"></i><p>Nenhum lead encontrado</p></div></td></tr>`;
    renderPagination();
    return;
  }

  tbody.innerHTML = page.map(l => {
    const waMsg = encodeURIComponent(`Olá ${l.nome||''}! Entrando em contato sobre seu interesse em: ${l.interesse||''}${l.veiculo ? ' — ' + l.veiculo : ''}.`);
    return `<tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:34px;height:34px;border-radius:50%;background:var(--gold-dim);color:var(--gold);display:grid;place-items:center;font-weight:700;font-size:13px;flex-shrink:0;">
            ${(l.nome||'?')[0].toUpperCase()}
          </div>
          <div>
            <div style="font-weight:600;font-size:13px;">${l.nome||'—'}</div>
            <div style="font-size:11px;color:var(--muted);">${l.email||''}</div>
          </div>
        </div>
      </td>
      <td>
        <div style="font-size:13px;">${l.telefone||'—'}</div>
        ${l.mensagem ? `<div style="font-size:11px;color:var(--muted);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${l.mensagem}">${l.mensagem}</div>` : ''}
      </td>
      <td><span style="font-size:12px;color:var(--text);">${l.interesse||'—'}</span></td>
      <td style="font-size:12px;color:var(--muted);">${l.veiculo||'—'}</td>
      <td style="font-size:12px;color:var(--muted);white-space:nowrap;">${fmtDateTime(l.createdAt)}</td>
      <td>
        <select class="form-control" style="padding:5px 8px;font-size:12px;background:var(--card2);" onchange="changeStatus('${l.id}', this.value)">
          <option value="novo"      ${l.status==='novo'      ?'selected':''}>Novo</option>
          <option value="atendendo" ${l.status==='atendendo' ?'selected':''}>Em Atendimento</option>
          <option value="finalizado"${l.status==='finalizado'?'selected':''}>Finalizado</option>
        </select>
      </td>
      <td>
        <div class="action-btns">
          <button class="btn-icon" title="Ver detalhes" onclick="openLeadDetail('${l.id}')"><i class="fas fa-eye"></i></button>
          <a class="btn-icon btn-icon--success" title="WhatsApp" href="https://wa.me/${cfg.whatsapp}?text=${waMsg}" target="_blank"><i class="fab fa-whatsapp"></i></a>
          <button class="btn-icon" title="Editar" onclick="openAddLeadModal('${l.id}')"><i class="fas fa-pen"></i></button>
          <button class="btn-icon btn-icon--danger" title="Excluir" onclick="deleteLead('${l.id}')"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');

  renderPagination();
}

function renderPagination() {
  const total = Math.ceil(filtered.length / PER_PAGE);
  document.getElementById('paginationInfo').textContent = `Página ${currentPage} de ${total||1} · ${filtered.length} registros`;
  const btns = document.getElementById('pageBtns');
  btns.innerHTML = '';
  for (let i = 1; i <= total; i++) {
    const b = document.createElement('button');
    b.className = `page-btn${i===currentPage?' active':''}`;
    b.textContent = i;
    b.addEventListener('click', () => { currentPage = i; renderTable(); });
    btns.appendChild(b);
  }
}

/* ---- Status change inline ---- */
function changeStatus(id, status) {
  DataService.updateLead(id, { status });
  load();
  adminToast(`Status atualizado para "${STATUS_LABEL[status]}"`, 'success');
}

/* ---- Modal Add/Edit ---- */
function openAddLeadModal(id = null) {
  editingId = id;
  document.getElementById('leadModalTitle').textContent = id ? 'Editar Lead' : 'Novo Lead';
  if (id) {
    const l = allLeads.find(l => l.id === id);
    if (l) {
      document.getElementById('lNome').value      = l.nome || '';
      document.getElementById('lTelefone').value  = l.telefone || '';
      document.getElementById('lEmail').value     = l.email || '';
      document.getElementById('lInteresse').value = l.interesse || 'Comprar veículo';
      document.getElementById('lVeiculo').value   = l.veiculo || '';
      document.getElementById('lObs').value       = l.mensagem || '';
    }
  } else {
    ['lNome','lTelefone','lEmail','lVeiculo','lObs'].forEach(id => document.getElementById(id).value = '');
  }
  document.getElementById('leadModal').classList.add('open');
}
function closeLeadModal() { document.getElementById('leadModal').classList.remove('open'); editingId = null; }

function saveLead() {
  const nome = document.getElementById('lNome').value.trim();
  if (!nome) { adminToast('Informe o nome do cliente.', 'error'); return; }
  const data = {
    nome,
    telefone:  document.getElementById('lTelefone').value.trim(),
    email:     document.getElementById('lEmail').value.trim(),
    interesse: document.getElementById('lInteresse').value,
    veiculo:   document.getElementById('lVeiculo').value.trim(),
    mensagem:  document.getElementById('lObs').value.trim(),
  };
  if (editingId) {
    DataService.updateLead(editingId, data);
    adminToast('Lead atualizado!', 'success');
  } else {
    DataService.saveLead(data);
    adminToast('Lead adicionado!', 'success');
  }
  closeLeadModal();
  load();
}

/* ---- Lead detail ---- */
function openLeadDetail(id) {
  const l = allLeads.find(l => l.id === id);
  if (!l) return;
  const cfg = DataService.getConfig();
  const waMsg = encodeURIComponent(`Olá ${l.nome}! Entrando em contato sobre seu interesse em: ${l.interesse||''}${l.veiculo?' — '+l.veiculo:''}.`);
  document.getElementById('leadDetailBody').innerHTML = `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;">
      <div style="width:48px;height:48px;border-radius:50%;background:var(--gold-dim);color:var(--gold);display:grid;place-items:center;font-weight:700;font-size:20px;flex-shrink:0;">${(l.nome||'?')[0].toUpperCase()}</div>
      <div><div style="font-size:16px;font-weight:700;">${l.nome||'—'}</div><span class="badge ${STATUS_CSS[l.status]||'badge--novo'}">${STATUS_LABEL[l.status]||'Novo'}</span></div>
    </div>
    ${row('fas fa-phone',    'Telefone',   l.telefone)}
    ${row('fas fa-envelope', 'E-mail',     l.email)}
    ${row('fas fa-tag',      'Interesse',  l.interesse)}
    ${row('fas fa-car',      'Veículo',    l.veiculo)}
    ${row('fas fa-clock',    'Recebido',   fmtDateTime(l.createdAt))}
    ${l.mensagem ? `<div style="margin-top:14px;padding:12px;background:var(--card2);border-radius:6px;font-size:13px;color:var(--muted);">${l.mensagem}</div>` : ''}
    <div style="margin-top:16px;">
      <label style="font-size:12px;color:var(--muted);font-weight:500;display:block;margin-bottom:6px;">Atualizar status</label>
      <select class="form-control" onchange="changeStatus('${l.id}',this.value);closeLeadDetail();">
        <option value="novo"       ${l.status==='novo'      ?'selected':''}>Novo</option>
        <option value="atendendo"  ${l.status==='atendendo' ?'selected':''}>Em Atendimento</option>
        <option value="finalizado" ${l.status==='finalizado'?'selected':''}>Finalizado</option>
      </select>
    </div>`;
  document.getElementById('detailWaBtn').href = `https://wa.me/${cfg.whatsapp}?text=${waMsg}`;
  document.getElementById('leadDetailModal').classList.add('open');
}
function closeLeadDetail() { document.getElementById('leadDetailModal').classList.remove('open'); }
function row(icon, label, value) {
  return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border2);">
    <i class="${icon}" style="width:16px;color:var(--gold);font-size:13px;"></i>
    <span style="font-size:12px;color:var(--muted);width:80px;flex-shrink:0;">${label}</span>
    <span style="font-size:13px;">${value||'—'}</span>
  </div>`;
}

/* ---- Delete ---- */
function deleteLead(id) {
  adminConfirm('Excluir este lead?', 'Esta ação não pode ser desfeita.', () => {
    DataService.deleteLead(id);
    load();
    adminToast('Lead excluído.', 'error');
  });
}

/* ---- Export CSV ---- */
function exportLeads() {
  const headers = ['Nome','Telefone','Email','Interesse','Veiculo','Status','Data'];
  const rows = allLeads.map(l => [l.nome,l.telefone,l.email,l.interesse,l.veiculo,l.status,fmtDateTime(l.createdAt)].map(v => `"${(v||'').replace(/"/g,'""')}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['\ufeff'+csv], { type:'text/csv;charset=utf-8' }));
  a.download = `leads-menelli-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  adminToast('CSV exportado!', 'success');
}

/* ---- Events ---- */
document.addEventListener('DOMContentLoaded', () => {
  load();
  ['fSearch','fStatus','fInteresse','fDataInicio','fDataFim'].forEach(id =>
    document.getElementById(id).addEventListener('input', applyFilters)
  );
  document.getElementById('leadModal').addEventListener('click', e => { if (e.target === document.getElementById('leadModal')) closeLeadModal(); });
  document.getElementById('leadDetailModal').addEventListener('click', e => { if (e.target === document.getElementById('leadDetailModal')) closeLeadDetail(); });
});

window.openAddLeadModal = openAddLeadModal;
window.closeLeadModal   = closeLeadModal;
window.saveLead         = saveLead;
window.openLeadDetail   = openLeadDetail;
window.closeLeadDetail  = closeLeadDetail;
window.changeStatus     = changeStatus;
window.deleteLead       = deleteLead;
window.exportLeads      = exportLeads;
window.clearFilters     = clearFilters;
