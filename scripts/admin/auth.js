/* ============================================================
   MENELLI VEÍCULOS — AuthService
   Autenticação simples (sessionStorage) — pronto para JWT/API
   ============================================================ */

const AUTH_KEY = 'menelli_admin_session';

/*
 * BACKEND MIGRATION:
 * AuthService.login()  → POST /api/auth/login  (retorna { token, user })
 * AuthService.logout() → POST /api/auth/logout
 * AuthService.isAuthenticated() → verificar JWT/cookie de sessão
 */
const AuthService = {

  /* Credenciais locais (substituir pela chamada à API) */
  _credentials: [
    { username: 'admin', password: 'menelli2024', role: 'super', name: 'Administrador' },
  ],

  login(username, password) {
    /* Future: return fetch('/api/auth/login', { method:'POST', body: JSON.stringify({username,password}) }) */
    const user = this._credentials.find(
      c => c.username === username && c.password === password
    );
    if (!user) return { ok: false, message: 'Usuário ou senha incorretos.' };

    const session = {
      user: user.username,
      name: user.name,
      role: user.role,
      loginAt: new Date().toISOString(),
      /* token: 'jwt_aqui' ← adicionar ao migrar */
    };
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return { ok: true, session };
  },

  logout() {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.href = 'index.html';
  },

  getSession() {
    try { return JSON.parse(sessionStorage.getItem(AUTH_KEY)); }
    catch { return null; }
  },

  isAuthenticated() {
    const s = this.getSession();
    return !!(s && s.user);
  },

  /* Chame no topo de cada página protegida */
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'index.html';
    }
  },
};

window.AuthService = AuthService;
