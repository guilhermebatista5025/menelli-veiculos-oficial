/* ============================================================
   MENELLI VEÍCULOS — UserAuthService
   Autenticação de usuários públicos do site
   ============================================================ */

const USER_SESSION_KEY = 'menelli_user_session';
const USERS_KEY        = 'menelli_users';

/*
 * BACKEND MIGRATION:
 * UserAuthService.register() → POST /api/users/register
 * UserAuthService.login()    → POST /api/users/login  (retorna JWT)
 * UserAuthService.logout()   → DELETE /api/users/session
 */
const UserAuthService = {

  /* ---- Admin check (delega ao AuthService) --------------- */
  isAdmin(username, password) {
    const result = AuthService.login(username, password);
    if (result.ok) { AuthService.logout(); } // limpa sessão admin
    return result.ok;
  },

  /* ---- Registro ------------------------------------------ */
  register({ nome, email, telefone, password }) {
    const users = this._getUsers();
    if (users.find(u => u.email === email)) {
      return { ok: false, message: 'Este e-mail já está cadastrado.' };
    }
    const user = {
      id: 'u' + Date.now().toString(36),
      nome,
      email,
      telefone,
      passwordHash: btoa(password), // ⚠️ Apenas para frontend; backend deve usar bcrypt
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    this._saveUsers(users);
    this._setSession(user);
    return { ok: true, user };
  },

  /* ---- Login --------------------------------------------- */
  login(email, password) {
    const users = this._getUsers();
    const user  = users.find(u => u.email === email && u.passwordHash === btoa(password));
    if (!user) return { ok: false, message: 'E-mail ou senha incorretos.' };
    this._setSession(user);
    return { ok: true, user };
  },

  /* ---- Logout -------------------------------------------- */
  logout() {
    sessionStorage.removeItem(USER_SESSION_KEY);
    window.location.href = '../index.html';
  },

  /* ---- Session ------------------------------------------- */
  getSession() {
    try { return JSON.parse(sessionStorage.getItem(USER_SESSION_KEY)); }
    catch { return null; }
  },

  isAuthenticated() {
    return !!this.getSession();
  },

  requireAuth(redirectTo = 'login.html') {
    if (!this.isAuthenticated()) {
      window.location.href = redirectTo;
    }
  },

  /* ---- Atualizar perfil ---------------------------------- */
  updateProfile(changes) {
    const session = this.getSession();
    if (!session) return;
    const users = this._getUsers();
    const idx   = users.findIndex(u => u.id === session.id);
    if (idx < 0) return;
    Object.assign(users[idx], changes);
    this._saveUsers(users);
    this._setSession(users[idx]);
  },

  /* ---- Helpers ------------------------------------------- */
  _getUsers()      { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; } },
  _saveUsers(u)    { localStorage.setItem(USERS_KEY, JSON.stringify(u)); },
  _setSession(u)   {
    const safe = { id: u.id, nome: u.nome, email: u.email, telefone: u.telefone };
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(safe));
  },
};

window.UserAuthService = UserAuthService;
