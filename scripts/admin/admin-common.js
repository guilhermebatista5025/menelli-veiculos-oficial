/* ============================================================
   MENELLI VEÍCULOS — admin-common.js
   Funções compartilhadas por todas as páginas admin
   ============================================================ */
'use strict';

/* ---- Sidebar HTML (injetado em todas as páginas admin) ---- */
function buildSidebar(activePage) {
  AuthService.requireAuth();
  const session = AuthService.getSession();
  const name    = session?.name || 'Admin';
  const pages   = [
    { id:'dashboard',      icon:'fa-chart-pie',       label:'Dashboard',      href:'dashboard.html' },
    { id:'estoque',        icon:'fa-car',              label:'Estoque',        href:'estoque.html',      badge:'sbVehicles' },
    { id:'leads',          icon:'fa-users',            label:'Leads',          href:'leads.html',        badge:'sbLeads',  badgeDanger:true },
    { id:'financiamentos', icon:'fa-calculator',       label:'Financiamentos', href:'financiamentos.html' },
    { id:'depoimentos',    icon:'fa-star',             label:'Depoimentos',    href:'depoimentos.html' },
    { id:'configuracoes',  icon:'fa-cog',              label:'Configurações',  href:'configuracoes.html' },
  ];

  const navItems = pages.map(p => `
    <a href="${p.href}" class="sidebar__item${p.id === activePage ? ' active' : ''}">
      <i class="fas ${p.icon}"></i> ${p.label}
      ${p.badge ? `<span class="sidebar__badge-count" id="${p.badge}" ${p.badgeDanger ? 'style="background:var(--danger);"' : ''}>0</span>` : ''}
    </a>`).join('');

  const html = `
    <div class="sidebar__brand">
      <div style="width:36px;height:36px;border-radius:8px;background:var(--gold-dim);border:1px solid var(--gold);display:grid;place-items:center;color:var(--gold);font-size:18px;flex-shrink:0;">
        <i class="fas fa-car"></i>
      </div>
      <div>
        <div style="font-size:13px;font-weight:700;">Menelli</div>
        <div class="sidebar__brand-text">Admin</div>
      </div>
    </div>
    <nav class="sidebar__nav">
      <div class="sidebar__section">Painel</div>
      <a href="dashboard.html" class="sidebar__item${activePage==='dashboard'?' active':''}"><i class="fas fa-chart-pie"></i> Dashboard</a>
      <div class="sidebar__section">Gestão</div>
      ${navItems.split('<a href="dashboard').slice(1).join('<a href="dashboard')}
      <div class="sidebar__section">Sistema</div>
      <a href="configuracoes.html" class="sidebar__item${activePage==='configuracoes'?' active':''}"><i class="fas fa-cog"></i> Configurações</a>
      <a href="../../index.html" class="sidebar__item" target="_blank"><i class="fas fa-external-link-alt"></i> Ver site</a>
    </nav>
    <div class="sidebar__footer">
      <div class="sidebar__user">
        <div class="sidebar__avatar">${name[0].toUpperCase()}</div>
        <div>
          <div class="sidebar__user-name">${name}</div>
          <div class="sidebar__user-role">Administrador</div>
        </div>
      </div>
      <button class="sidebar__logout" onclick="AuthService.logout()">
        <i class="fas fa-sign-out-alt"></i> Sair
      </button>
    </div>`;

  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.innerHTML = html;

  // Hamburger
  const hbg = document.getElementById('hamburger');
  if (hbg) hbg.addEventListener('click', () => sidebar.classList.toggle('open'));

  // Fechar sidebar ao clicar fora (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar &&
        !sidebar.contains(e.target) && !hbg?.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // Atualizar badges
  updateSidebarBadges();
}

function updateSidebarBadges() {
  const vehicles = DataService.getVehicles();
  const leads    = DataService.getLeads();
  const novos    = leads.filter(l => l.status === 'novo').length;

  const sbV = document.getElementById('sbVehicles');
  const sbL = document.getElementById('sbLeads');
  if (sbV) sbV.textContent = vehicles.length;
  if (sbL) { sbL.textContent = novos; sbL.style.display = novos > 0 ? 'inline-flex' : 'none'; }
}

/* ---- Topbar date ---- */
function setTopbarDate(elementId = 'topDate') {
  const el = document.getElementById(elementId);
  if (el) el.textContent = new Date().toLocaleDateString('pt-BR', {
    weekday:'long', day:'numeric', month:'long', year:'numeric'
  });
}

/* ---- Toast ---- */
function adminToast(msg, type = 'info') {
  const c = document.getElementById('toastContainer');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast toast--${type}`;
  const icons = { success:'check-circle', error:'times-circle', info:'info-circle', warning:'exclamation-triangle' };
  t.innerHTML = `<i class="fas fa-${icons[type]||'info-circle'}"></i> ${msg}`;
  c.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3200);
}

/* ---- Confirm modal genérico ---- */
function adminConfirm(title, subtitle, onConfirm) {
  let overlay = document.getElementById('genericConfirmOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'genericConfirmOverlay';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal modal--sm">
        <div class="modal__body" style="text-align:center;padding:32px;">
          <div style="font-size:44px;color:var(--danger);margin-bottom:12px;"><i class="fas fa-exclamation-triangle"></i></div>
          <h3 id="gcTitle" style="margin-bottom:8px;"></h3>
          <p  id="gcSub"   style="color:var(--muted);font-size:14px;margin-bottom:24px;"></p>
          <div style="display:flex;gap:10px;justify-content:center;">
            <button class="btn btn--outline" onclick="document.getElementById('genericConfirmOverlay').classList.remove('open')">Cancelar</button>
            <button class="btn btn--danger"  id="gcConfirmBtn"><i class="fas fa-trash"></i> Confirmar</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
  }
  document.getElementById('gcTitle').textContent = title;
  document.getElementById('gcSub').textContent   = subtitle;
  document.getElementById('gcConfirmBtn').onclick = () => {
    overlay.classList.remove('open');
    onConfirm();
  };
  overlay.classList.add('open');
}

/* ---- Format date ---- */
function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric' });
}
function fmtDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('pt-BR', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

window.buildSidebar        = buildSidebar;
window.updateSidebarBadges = updateSidebarBadges;
window.setTopbarDate       = setTopbarDate;
window.adminToast          = adminToast;
window.adminConfirm        = adminConfirm;
window.fmtDate             = fmtDate;
window.fmtDateTime         = fmtDateTime;
