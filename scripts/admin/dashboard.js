/* ============================================================
   MENELLI VEÍCULOS — dashboard.js
   ============================================================ */
'use strict';

AuthService.requireAuth();

const session = AuthService.getSession();
if (session) {
  document.getElementById('sbName').textContent = session.name || session.user;
  document.getElementById('sbAvatar').textContent = (session.name || session.user)[0].toUpperCase();
}

// Data atual
document.getElementById('topDate').textContent = new Date().toLocaleDateString('pt-BR', {
  weekday:'long', day:'numeric', month:'long', year:'numeric'
});

// Hamburger
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

/* ---- KPIs ---- */
function loadKPIs() {
  const s = DataService.getStats();

  animateCounter('kpiTotal',      s.totalVehicles);
  animateCounter('kpiLeads',      s.totalLeads);
  animateCounter('kpiSims',       s.totalSimulations);
  animateCounter('kpiFavs',       s.totalFavorites);
  animateCounter('kpiDisponivel', s.disponiveis);
  animateCounter('kpiReservado',  s.reservados);

  document.getElementById('kpiDisp').textContent    = `${s.disponiveis} disponíveis`;
  document.getElementById('kpiLeadsHoje').textContent = `${s.leadsHoje} hoje`;

  // sidebar badges
  document.getElementById('sbVehicles').textContent = s.totalVehicles;
  const novos = s.leadsNovos;
  const sbL = document.getElementById('sbLeads');
  sbL.textContent = novos;
  sbL.style.display = novos > 0 ? 'inline-flex' : 'none';
}

function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const step = Math.ceil(target / 30);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start.toLocaleString('pt-BR');
    if (start >= target) clearInterval(timer);
  }, 40);
}

/* ---- Gráfico: Categorias (Donut) ---- */
function drawDonut() {
  const s = DataService.getStats();
  const canvas = document.getElementById('chartCategoria');
  const ctx = canvas.getContext('2d');
  canvas.width  = canvas.offsetWidth || 300;
  canvas.height = 200;

  const labels = { zerokm:'0 km', seminovo:'Seminovos', suv:'SUVs', caminhonete:'Caminhonetes' };
  const colors = { zerokm:'#3182ce', seminovo:'#f6ad55', suv:'#b794f4', caminhonete:'#68d391' };
  const data = Object.entries(s.byCategory).filter(([,v]) => v > 0);
  if (data.length === 0) { ctx.fillStyle = '#333'; ctx.fillRect(0,0,canvas.width,canvas.height); return; }

  const total = data.reduce((a,[,v]) => a+v, 0);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const R = Math.min(cx, cy) - 10;
  const r = R * 0.55;
  let angle = -Math.PI / 2;

  data.forEach(([cat, val]) => {
    const slice = (val / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, R, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = colors[cat] || '#888';
    ctx.fill();
    angle += slice;
  });

  // Hole
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--card').trim() || '#161616';
  ctx.fill();

  // Center text
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${Math.floor(R*0.3)}px Inter`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(total, cx, cy - 6);
  ctx.font = `${Math.floor(R*0.16)}px Inter`;
  ctx.fillStyle = '#888';
  ctx.fillText('veículos', cx, cy + R*0.18);

  // Legend
  const legend = document.getElementById('legendCategoria');
  legend.innerHTML = data.map(([cat, val]) => `
    <div class="legend-item">
      <div class="legend-dot" style="background:${colors[cat]||'#888'}"></div>
      ${labels[cat]||cat}: <strong style="color:#fff;margin-left:3px;">${val}</strong>
    </div>`).join('');
}

/* ---- Gráfico: Leads por dia (Barras) ---- */
function drawLeadsChart() {
  const s = DataService.getStats();
  const canvas = document.getElementById('chartLeads');
  const ctx = canvas.getContext('2d');
  canvas.width  = canvas.offsetWidth || 300;
  canvas.height = 200;

  const entries = Object.entries(s.leadsPorDia);
  const values  = entries.map(([,v]) => v);
  const maxVal  = Math.max(...values, 1);
  const pad = 36;
  const chartH = canvas.height - pad * 2;
  const barW   = (canvas.width - pad * 2) / entries.length;
  const gap    = barW * 0.25;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Grid lines
  for (let i = 0; i <= 4; i++) {
    const y = pad + chartH - (i / 4) * chartH;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    ctx.moveTo(pad, y); ctx.lineTo(canvas.width - pad, y);
    ctx.stroke();
    ctx.fillStyle = '#555';
    ctx.font = '10px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round((i / 4) * maxVal), pad - 4, y + 3);
  }

  entries.forEach(([date, val], i) => {
    const x = pad + i * barW + gap / 2;
    const bW = barW - gap;
    const bH = (val / maxVal) * chartH;
    const y  = pad + chartH - bH;

    // Bar
    const grad = ctx.createLinearGradient(0, y, 0, pad + chartH);
    grad.addColorStop(0, '#ff9700');
    grad.addColorStop(1, 'rgba(255,151,0,0.2)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, bW, bH, [3, 3, 0, 0]);
    ctx.fill();

    // Label (day abbrev)
    const d = new Date(date + 'T12:00:00');
    const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    ctx.fillStyle = '#888';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(days[d.getDay()], x + bW / 2, pad + chartH + 16);

    // Value label
    if (val > 0) {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px Inter';
      ctx.fillText(val, x + bW / 2, y - 5);
    }
  });
}

/* ---- Top Veículos ---- */
function loadTopVehicles() {
  const s = DataService.getStats();
  const el = document.getElementById('topVehicles');
  if (!s.topVehicles.length) return;
  el.innerHTML = s.topVehicles.map((item, i) => `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border2);">
      <div style="width:24px;height:24px;border-radius:50%;background:var(--gold-dim);color:var(--gold);display:grid;place-items:center;font-size:11px;font-weight:700;flex-shrink:0;">${i+1}</div>
      <img src="../../${item.vehicle.images?.[0]||''}" alt="" style="width:52px;height:36px;object-fit:cover;border-radius:4px;background:#222;flex-shrink:0;">
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.vehicle.name}</div>
        <div style="font-size:11px;color:var(--muted);">${item.vehicle.brand} · ${item.vehicle.year}</div>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <div style="font-size:13px;font-weight:700;color:var(--gold);">${item.count}</div>
        <div style="font-size:10px;color:var(--muted);">views</div>
      </div>
    </div>`).join('');
}

/* ---- Leads Recentes ---- */
function loadRecentLeads() {
  const leads = DataService.getLeads().slice(0, 5);
  const el = document.getElementById('recentLeads');
  if (!leads.length) return;

  const statusMap = { novo:'badge--novo', atendendo:'badge--atendendo', finalizado:'badge--finalizado' };
  const statusLabel = { novo:'Novo', atendendo:'Atendendo', finalizado:'Finalizado' };

  el.innerHTML = leads.map(l => `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border2);">
      <div style="width:36px;height:36px;border-radius:50%;background:var(--gold-dim);color:var(--gold);display:grid;place-items:center;font-weight:700;font-size:14px;flex-shrink:0;">${(l.nome||'?')[0].toUpperCase()}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;font-weight:600;">${l.nome||'—'}</div>
        <div style="font-size:11px;color:var(--muted);">${l.telefone||''} · ${l.interesse||''}</div>
      </div>
      <span class="badge ${statusMap[l.status]||'badge--novo'}">${statusLabel[l.status]||'Novo'}</span>
    </div>`).join('');
}

/* ---- Export ---- */
function exportData() {
  const blob = new Blob([JSON.stringify({
    vehicles: DataService.getVehicles(),
    leads: DataService.getLeads(),
    simulations: DataService.getSimulations(),
    config: DataService.getConfig(),
    exportedAt: new Date().toISOString(),
  }, null, 2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `menelli-backup-${new Date().toISOString().split('T')[0]}.json`;
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

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  loadKPIs();
  setTimeout(() => { drawDonut(); drawLeadsChart(); }, 100);
  loadTopVehicles();
  loadRecentLeads();
});

window.exportData = exportData;
