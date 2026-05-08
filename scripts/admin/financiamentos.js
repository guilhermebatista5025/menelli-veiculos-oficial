/* ============================================================
   MENELLI VEÍCULOS — financiamentos.js
   ============================================================ */
'use strict';

buildSidebar('financiamentos');
setTopbarDate();

const PER_PAGE = 15;
let allSims = [], filtered = [], currentPage = 1;

function fmt(n) { return Number(n||0).toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); }

function load() {
  allSims = DataService.getSimulations();
  applyFilters();
  loadKPIs();
}

function loadKPIs() {
  const today = new Date().toISOString().split('T')[0];
  const hoje  = allSims.filter(s => s.createdAt?.startsWith(today)).length;
  const vals  = allSims.map(s => s.valorVeiculo || 0).filter(v => v > 0);
  const ents  = allSims.map(s => s.entradaPct || 0).filter(v => v > 0);
  const media = vals.length ? vals.reduce((a,b) => a+b,0) / vals.length : 0;
  const ent   = ents.length ? ents.reduce((a,b) => a+b,0) / ents.length : 0;

  document.getElementById('kTotal').textContent       = allSims.length;
  document.getElementById('kMediaValor').textContent  = media ? fmt(media) : '—';
  document.getElementById('kMediaEntrada').textContent= ents.length ? Math.round(ent) + '%' : '—';
  document.getElementById('kHoje').textContent        = hoje;
}

function applyFilters() {
  const search = document.getElementById('fSearch').value.toLowerCase();
  const parc   = document.getElementById('fParcelas').value;
  const dIni   = document.getElementById('fDataInicio').value;
  const dFim   = document.getElementById('fDataFim').value;

  filtered = allSims.filter(s => {
    if (search && !(s.veiculo||'').toLowerCase().includes(search) && !(s.nome||'').toLowerCase().includes(search)) return false;
    if (parc && s.parcelas !== parc) return false;
    if (dIni && s.createdAt && s.createdAt < dIni) return false;
    if (dFim && s.createdAt && s.createdAt.split('T')[0] > dFim) return false;
    return true;
  });
  currentPage = 1;
  renderTable();
}

function clearFilters() {
  ['fSearch','fDataInicio','fDataFim'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fParcelas').value = '';
  applyFilters();
}

function renderTable() {
  const start = (currentPage - 1) * PER_PAGE;
  const page  = filtered.slice(start, start + PER_PAGE);
  const tbody = document.getElementById('finTableBody');

  if (!page.length) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><i class="fas fa-calculator"></i><p>Nenhuma simulação registrada ainda.<br>As simulações feitas no site aparecem aqui automaticamente.</p></div></td></tr>`;
    renderPagination();
    return;
  }

  tbody.innerHTML = page.map(s => {
    const valor      = s.valorVeiculo || 0;
    const entPct     = s.entradaPct || 0;
    const entValor   = valor * entPct / 100;
    const financiado = valor - entValor;
    return `<tr>
      <td>
        <div style="font-weight:600;font-size:13px;">${s.veiculo || 'Simulação Geral'}</div>
        ${s.nome ? `<div style="font-size:11px;color:var(--muted);">${s.nome}</div>` : ''}
      </td>
      <td style="font-weight:600;">${fmt(valor)}</td>
      <td>${entPct}% <span style="font-size:11px;color:var(--muted);">(${fmt(entValor)})</span></td>
      <td>${fmt(financiado)}</td>
      <td><span class="badge badge--tag">${s.parcelas || '—'}</span></td>
      <td style="font-weight:700;color:var(--gold);">${s.parcelaMensal || '—'}</td>
      <td style="font-size:12px;color:var(--muted);white-space:nowrap;">${fmtDateTime(s.createdAt)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-icon btn-icon--danger" title="Excluir" onclick="deleteSim('${s.id}')"><i class="fas fa-trash"></i></button>
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

function deleteSim(id) {
  adminConfirm('Excluir simulação?', 'Esta simulação será removida do histórico.', () => {
    DataService.deleteSimulation(id);
    load();
    adminToast('Simulação excluída.', 'error');
  });
}

function clearAll() {
  adminConfirm('Limpar todo o histórico?', 'Todas as simulações serão removidas permanentemente.', () => {
    DataService.getSimulations().forEach(s => DataService.deleteSimulation(s.id));
    load();
    adminToast('Histórico limpo.', 'info');
  });
}

function exportCSV() {
  const headers = ['Veiculo','Valor','Entrada%','Valor Entrada','Financiado','Parcelas','Parcela Mensal','Data'];
  const rows = allSims.map(s => {
    const v = s.valorVeiculo || 0;
    const e = s.entradaPct || 0;
    const ev = v * e / 100;
    return [s.veiculo, fmt(v), e+'%', fmt(ev), fmt(v-ev), s.parcelas, s.parcelaMensal, fmtDateTime(s.createdAt)]
      .map(x => `"${(x||'').replace(/"/g,'""')}"`).join(',');
  });
  const csv = [headers.join(','), ...rows].join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['\ufeff'+csv], { type:'text/csv;charset=utf-8' }));
  a.download = `financiamentos-menelli-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  adminToast('CSV exportado!', 'success');
}

document.addEventListener('DOMContentLoaded', () => {
  load();
  ['fSearch','fParcelas','fDataInicio','fDataFim'].forEach(id =>
    document.getElementById(id).addEventListener('input', applyFilters)
  );
});

window.deleteSim    = deleteSim;
window.clearAll     = clearAll;
window.exportCSV    = exportCSV;
window.clearFilters = clearFilters;
