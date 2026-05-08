/* ============================================================
   MENELLI VEÍCULOS — session-ui.js
   Identifica admin ou cliente logado e atualiza a nav do site
   ============================================================ */

const SessionUI = {

  init() {
    document.addEventListener('DOMContentLoaded', () => this._render());
  },

  _render() {
    const adminSession = (typeof AuthService !== 'undefined') ? AuthService.getSession() : null;
    const userSession  = (typeof UserAuthService !== 'undefined') ? UserAuthService.getSession() : null;

    const link  = document.getElementById('navUserLink');
    const label = document.getElementById('navUserLabel');
    const icon  = document.getElementById('navUserIcon');
    if (!link || !label) return;

    if (adminSession) {
      // Admin logado
      link.href = (link.dataset.adminPath || 'pages/admin/dashboard.html');
      label.textContent = adminSession.name || 'Admin';
      if (icon) { icon.className = 'fas fa-shield-alt'; icon.style.color = '#ff9700'; }
      link.style.color = '#ff9700';
      this._addDropdown(link, adminSession.name, 'Admin', [
        { icon: 'fas fa-chart-pie', label: 'Dashboard', href: link.dataset.adminPath || 'pages/admin/dashboard.html' },
        { icon: 'fas fa-car',       label: 'Estoque',   href: (link.dataset.adminPath || 'pages/admin/') + 'estoque.html' },
        { icon: 'fas fa-users',     label: 'Leads',     href: (link.dataset.adminPath || 'pages/admin/') + 'leads.html' },
        null, // divider
        { icon: 'fas fa-sign-out-alt', label: 'Sair', action: () => AuthService.logout(), danger: true },
      ]);

    } else if (userSession) {
      // Cliente logado
      const firstName = userSession.nome.split(' ')[0];
      link.href = (link.dataset.contaPath || 'pages/minha-conta.html');
      label.textContent = firstName;
      if (icon) icon.className = 'fas fa-user-circle';
      link.style.color = '#ff9700';
      this._addDropdown(link, userSession.nome, 'Cliente', [
        { icon: 'fas fa-heart',      label: 'Favoritos',    href: link.dataset.contaPath || 'pages/minha-conta.html' },
        { icon: 'fas fa-calculator', label: 'Simulações',   href: link.dataset.contaPath || 'pages/minha-conta.html' },
        { icon: 'fas fa-user-cog',   label: 'Meu Perfil',   href: link.dataset.contaPath || 'pages/minha-conta.html' },
        null,
        { icon: 'fas fa-sign-out-alt', label: 'Sair', action: () => UserAuthService.logout(), danger: true },
      ]);

    } else {
      // Não logado
      link.href = (link.dataset.loginPath || 'pages/login.html');
      label.textContent = 'Entrar';
      if (icon) icon.className = 'fas fa-user-circle';
    }
  },

  _addDropdown(trigger, name, role, items) {
    trigger.style.position = 'relative';
    trigger.style.cursor   = 'pointer';

    const menu = document.createElement('div');
    menu.className = 'session-dropdown';
    menu.innerHTML = `
      <div class="sd-header">
        <div class="sd-avatar">${name[0].toUpperCase()}</div>
        <div><div class="sd-name">${name}</div><div class="sd-role">${role}</div></div>
      </div>
      <div class="sd-divider"></div>
      ${items.map(item => item === null
        ? '<div class="sd-divider"></div>'
        : `<button class="sd-item${item.danger ? ' sd-item--danger' : ''}" data-href="${item.href||''}" data-action="${item.action ? '1' : ''}">
             <i class="${item.icon}"></i> ${item.label}
           </button>`
      ).join('')}
    `;

    // Append to body to avoid clipping
    document.body.appendChild(menu);
    let visible = false;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      visible = !visible;
      const rect = trigger.getBoundingClientRect();
      menu.style.top  = (rect.bottom + window.scrollY + 8) + 'px';
      menu.style.right = (window.innerWidth - rect.right) + 'px';
      menu.style.left = 'auto';
      menu.classList.toggle('open', visible);
    });

    document.addEventListener('click', (e) => {
      if (!trigger.contains(e.target) && !menu.contains(e.target)) {
        visible = false; menu.classList.remove('open');
      }
    });

    // Bind item actions
    menu.querySelectorAll('.sd-item').forEach((btn, i) => {
      const real = items.filter(x => x !== null)[i];
      btn.addEventListener('click', () => {
        menu.classList.remove('open');
        if (real.action) real.action();
        else if (real.href) window.location.href = real.href;
      });
    });

    // Inject styles once
    if (!document.getElementById('session-ui-style')) {
      const style = document.createElement('style');
      style.id = 'session-ui-style';
      style.textContent = `
        .session-dropdown {
          position: absolute;
          min-width: 220px;
          background: #161616;
          border: 1px solid rgba(255,151,0,0.15);
          border-radius: 10px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          z-index: 9999;
          opacity: 0;
          transform: translateY(-8px);
          pointer-events: none;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }
        .session-dropdown.open { opacity:1; transform:translateY(0); pointer-events:all; }
        .sd-header { display:flex; align-items:center; gap:10px; padding:14px 14px 10px; }
        .sd-avatar { width:36px; height:36px; border-radius:50%; background:rgba(255,151,0,0.15); border:1px solid rgba(255,151,0,0.3); color:#ff9700; display:grid; place-items:center; font-weight:700; font-size:15px; flex-shrink:0; }
        .sd-name  { font-size:13px; font-weight:700; color:#fff; }
        .sd-role  { font-size:11px; color:rgba(255,255,255,0.35); margin-top:1px; }
        .sd-divider { height:1px; background:rgba(255,255,255,0.06); margin:2px 0; }
        .sd-item  { display:flex; align-items:center; gap:10px; width:100%; padding:10px 14px; background:none; border:none; color:rgba(255,255,255,0.65); font-size:13px; font-weight:500; cursor:pointer; transition:all 0.15s; font-family:inherit; }
        .sd-item i { width:16px; text-align:center; font-size:13px; color:rgba(255,151,0,0.6); }
        .sd-item:hover { background:rgba(255,151,0,0.06); color:#fff; }
        .sd-item--danger { color:rgba(229,62,62,0.7); }
        .sd-item--danger i { color:rgba(229,62,62,0.6); }
        .sd-item--danger:hover { background:rgba(229,62,62,0.08); color:#fc8181; }
      `;
      document.head.appendChild(style);
    }
  },
};

SessionUI.init();
window.SessionUI = SessionUI;
