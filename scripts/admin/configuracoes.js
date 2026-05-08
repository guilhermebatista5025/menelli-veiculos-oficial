/* ============================================================
   MENELLI VEÍCULOS — configuracoes.js
   ============================================================ */
'use strict';

buildSidebar('configuracoes');
setTopbarDate();

const FIELDS = {
  whatsapp:       'cWhatsapp',
  whatsappDisplay:'cWhatsappDisplay',
  telefone:       'cTelefone',
  email:          'cEmail',
  endereco:       'cEndereco',
  cidade:         'cCidade',
  cnpj:           'cCnpj',
  horarioSemana:  'cHorarioSemana',
  horarioSabado:  'cHorarioSabado',
  instagram:      'cInstagram',
  facebook:       'cFacebook',
  youtube:        'cYoutube',
  heroTitulo:     'cHeroTitulo',
  heroSub:        'cHeroSub',
};

/* ---- Load ---- */
function loadConfig() {
  const cfg = DataService.getConfig();
  Object.entries(FIELDS).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) el.value = cfg[key] || '';
  });
  document.getElementById('cOnlineAgora').checked = !!(cfg.onlineAgora ?? true);
  updateHeroPreview();
}

/* ---- Save all ---- */
function saveAll() {
  const updates = {};
  Object.entries(FIELDS).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) updates[key] = el.value.trim();
  });
  updates.onlineAgora = document.getElementById('cOnlineAgora').checked;
  DataService.saveConfig(updates);
  adminToast('Configurações salvas com sucesso!', 'success');
}

/* ---- Reset ---- */
function resetConfig() {
  adminConfirm(
    'Restaurar configurações padrão?',
    'Todos os campos serão preenchidos com os valores originais da Menelli Veículos.',
    () => {
      DataService.resetConfig();
      loadConfig();
      adminToast('Configurações restauradas!', 'info');
    }
  );
}

/* ---- Hero preview ---- */
function updateHeroPreview() {
  const title = document.getElementById('cHeroTitulo')?.value || '';
  const sub   = document.getElementById('cHeroSub')?.value   || '';
  const pt    = document.getElementById('heroPreviewTitle');
  const ps    = document.getElementById('heroPreviewSub');
  if (pt) pt.textContent = title;
  if (ps) ps.textContent = sub;
}

/* ---- Change password ---- */
function changePassword() {
  const np  = document.getElementById('cNewPass').value;
  const cp  = document.getElementById('cConfirmPass').value;
  if (!np || np.length < 6) { adminToast('A senha deve ter no mínimo 6 caracteres.', 'error'); return; }
  if (np !== cp)             { adminToast('As senhas não coincidem.', 'error'); return; }
  /* BACKEND MIGRATION: POST /api/auth/change-password */
  /* Por enquanto atualiza o credential local do AuthService */
  const cred = AuthService._credentials[0];
  if (cred) { cred.password = np; }
  document.getElementById('cNewPass').value    = '';
  document.getElementById('cConfirmPass').value = '';
  adminToast('Senha alterada com sucesso!', 'success');
}

/* ---- Events ---- */
document.addEventListener('DOMContentLoaded', () => {
  loadConfig();

  document.getElementById('cHeroTitulo').addEventListener('input', updateHeroPreview);
  document.getElementById('cHeroSub').addEventListener('input',    updateHeroPreview);

  // Auto-save toggle
  document.getElementById('cOnlineAgora').addEventListener('change', () => {
    DataService.saveConfig({ onlineAgora: document.getElementById('cOnlineAgora').checked });
    adminToast(document.getElementById('cOnlineAgora').checked ? 'Indicador online ativado.' : 'Indicador online desativado.', 'info');
  });
});

window.saveAll        = saveAll;
window.resetConfig    = resetConfig;
window.changePassword = changePassword;
