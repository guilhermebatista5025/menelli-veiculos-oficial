/* ============================================================
   MENELLI VEÍCULOS — DataService
   Camada de abstração de dados (localStorage → pronto para API)
   Para migrar ao backend: trocar apenas o corpo dos métodos.
   ============================================================ */

const KEYS = {
  VEHICLES: 'menelli_vehicles',
  LEADS: 'menelli_leads',
  SIMULATIONS: 'menelli_simulations',
  TESTIMONIALS: 'menelli_testimonials',
  CONFIG: 'menelli_config',
  FAVORITES: 'menelli_favs',
  VIEWS: 'menelli_views',
};

/* ---------- Dados iniciais ---------------------------------- */
const DEFAULT_VEHICLES = [
  { id:'v1', brand:'Toyota', name:'Corolla XEi 2.0 Flex', category:'seminovo', year:2023, km:'28.500', fuel:'Flex', color:'Prata', transmission:'Automático', priceOld:'R$ 148.900', price:'R$ 139.900', priceRaw:139900, parcel:'R$ 2.399/mês', images:['imagens/corolla.png'], descricaoCurta:'Único dono, IPVA pago, revisado em concessionária Toyota.', description:'Corolla XEi 2.0 Flex Automático, completo. Único dono, IPVA pago, revisado em concessionária Toyota. Pneus novos. Aceita financiamento e troca.', opcionais:['Multimídia','Câmera de ré','Couro','Controle de estabilidade'], featured:true, tag:'Oferta', status:'disponivel', dataEntrada:'2024-01-10', custoAquisicao:115000, procedencia:'troca', observacoesInternas:'', metaDescription:'Toyota Corolla XEi 2023 seminovo em Linhares-ES — Menelli Veículos' },
  { id:'v2', brand:'Jeep', name:'Compass Limited 2.0', category:'suv', year:2024, km:'0', fuel:'Diesel', color:'Branco', transmission:'Automático', priceOld:null, price:'R$ 289.990', priceRaw:289990, parcel:'R$ 4.899/mês', images:['imagens/jeep-compass.jpeg'], descricaoCurta:'Teto solar panorâmico, couro, ADAS completo. Pronto para entrega.', description:'Compass Limited 4x4 Diesel 2024, equipamento completo, teto solar panorâmico, couro, ADAS completo. Pronto para entrega.', opcionais:['Teto Solar','Couro','ADAS','Câmera 360°'], featured:true, tag:'Novo', status:'disponivel', dataEntrada:'2024-02-05', custoAquisicao:255000, procedencia:'0km', observacoesInternas:'', metaDescription:'Jeep Compass Limited 2024 0km em Linhares-ES — Menelli Veículos' },
  { id:'v3', brand:'Volkswagen', name:'T-Cross Highline TSI', category:'suv', year:2023, km:'15.200', fuel:'Gasolina', color:'Azul', transmission:'Automático', priceOld:'R$ 142.000', price:'R$ 135.500', priceRaw:135500, parcel:'R$ 2.290/mês', images:['imagens/t-cross.jpeg'], descricaoCurta:'Único dono. Teto, couro, central multimídia. IPVA pago.', description:'T-Cross Highline TSI Automático, único dono. Completo com teto, couro, central multimídia. IPVA pago. Financiamento facilitado.', opcionais:['Teto Solar','Couro','Multimídia'], featured:false, tag:null, status:'disponivel', dataEntrada:'2024-01-20', custoAquisicao:112000, procedencia:'troca', observacoesInternas:'', metaDescription:'VW T-Cross Highline 2023 seminovo em Linhares-ES — Menelli Veículos' },
  { id:'v4', brand:'Chevrolet', name:'S10 High Country 2.8', category:'caminhonete', year:2023, km:'32.000', fuel:'Diesel', color:'Preto', transmission:'Automático', priceOld:'R$ 340.000', price:'R$ 318.900', priceRaw:318900, parcel:'R$ 5.299/mês', images:['imagens/s10.jpeg'], descricaoCurta:'Completa, couro, multimídia 8", câmera 360°. Garantia de fábrica.', description:'S10 High Country 4x4 CD Diesel 2023, completa, couro, multimídia 8", câmera 360°. Garantia de fábrica. Aceita troca.', opcionais:['Câmera 360°','Couro','Multimídia 8"','4x4'], featured:true, tag:'Mais Vendido', status:'disponivel', dataEntrada:'2024-01-15', custoAquisicao:280000, procedencia:'troca', observacoesInternas:'', metaDescription:'Chevrolet S10 High Country 2023 em Linhares-ES — Menelli Veículos' },
  { id:'v5', brand:'Honda', name:'HR-V EX CVT', category:'suv', year:2024, km:'0', fuel:'Flex', color:'Vermelho', transmission:'CVT', priceOld:null, price:'R$ 178.590', priceRaw:178590, parcel:'R$ 2.999/mês', images:['imagens/hrv.jpeg'], descricaoCurta:'0km 2024. Multimídia 9" Honda Connect, carregador wireless.', description:'HR-V EX 0km 2024, multimídia 9" Honda Connect, lane watch, câmera traseira, carregador wireless. Todas as cores disponíveis.', opcionais:['Multimídia 9"','Wireless','Lane Watch','Câmera'], featured:false, tag:'Novo', status:'disponivel', dataEntrada:'2024-02-10', custoAquisicao:155000, procedencia:'0km', observacoesInternas:'', metaDescription:'Honda HR-V EX 2024 0km em Linhares-ES — Menelli Veículos' },
  { id:'v6', brand:'Hyundai', name:'HB20S Diamond Plus', category:'seminovo', year:2022, km:'41.000', fuel:'Flex', color:'Cinza', transmission:'Automático', priceOld:'R$ 98.000', price:'R$ 89.900', priceRaw:89900, parcel:'R$ 1.499/mês', images:['imagens/hb20.jpeg'], descricaoCurta:'1.0 Turbo Automático. Multimídia, câmera, sensor de estacionamento.', description:'HB20S Diamond Plus 1.0 Turbo Automático. Completo, multimídia, câmera, sensor de estacionamento. Excelente estado.', opcionais:['Multimídia','Câmera','Sensor de estacionamento','Turbo'], featured:false, tag:null, status:'disponivel', dataEntrada:'2024-01-08', custoAquisicao:72000, procedencia:'troca', observacoesInternas:'', metaDescription:'Hyundai HB20S Diamond Plus 2022 em Linhares-ES — Menelli Veículos' },
  { id:'v7', brand:'Toyota', name:'Hilux SRX 2.8 4x4', category:'caminhonete', year:2024, km:'0', fuel:'Diesel', color:'Branco', transmission:'Automático', priceOld:null, price:'R$ 399.990', priceRaw:399990, parcel:'R$ 6.799/mês', images:['imagens/hillux-srx.jpeg'], descricaoCurta:'Teto solar, couro bege, câmera 360°, multimídia 8", ACC.', description:'Hilux SRX 0km 2024 com teto solar, couro bege, câmera 360°, multimídia 8", ACC, LDWS. A rainha das picapes ainda mais sofisticada.', opcionais:['Teto Solar','Couro','Câmera 360°','ACC','LDWS'], featured:true, tag:'Novo', status:'disponivel', dataEntrada:'2024-02-15', custoAquisicao:350000, procedencia:'0km', observacoesInternas:'', metaDescription:'Toyota Hilux SRX 2024 0km em Linhares-ES — Menelli Veículos' },
  { id:'v8', brand:'Volkswagen', name:'Polo Track 1.0', category:'zerokm', year:2024, km:'0', fuel:'Flex', color:'Branco', transmission:'Manual', priceOld:null, price:'R$ 79.990', priceRaw:79990, parcel:'R$ 1.299/mês', images:['imagens/polo.jpeg'], descricaoCurta:'Conectividade wireless, câmera de ré, ABS, airbags.', description:'Polo Track 1.0 Flex 0km 2024. Conectividade wireless, câmera de ré, freios ABS, airbags, controle de estabilidade.', opcionais:['Wireless','Câmera de ré','ABS','Airbags'], featured:false, tag:null, status:'disponivel', dataEntrada:'2024-02-01', custoAquisicao:68000, procedencia:'0km', observacoesInternas:'', metaDescription:'VW Polo Track 2024 0km em Linhares-ES — Menelli Veículos' },
  { id:'v9', brand:'Jeep', name:'Renegade Sport 1.3', category:'zerokm', year:2024, km:'0', fuel:'Flex', color:'Azul', transmission:'Automático', priceOld:null, price:'R$ 149.990', priceRaw:149990, parcel:'R$ 2.499/mês', images:['imagens/jeep-renegade.jpeg'], descricaoCurta:'Turbo, automático 6 marchas, multimídia 7". Entrega imediata.', description:'Renegade Sport 1.3 T270 0km 2024. Turbo, automático 6 marchas, multimídia 7", câmera de ré, ACC. Entrega imediata.', opcionais:['Turbo','Multimídia 7"','Câmera de ré','ACC'], featured:false, tag:null, status:'disponivel', dataEntrada:'2024-02-12', custoAquisicao:128000, procedencia:'0km', observacoesInternas:'', metaDescription:'Jeep Renegade Sport 2024 0km em Linhares-ES — Menelli Veículos' },
  { id:'v10', brand:'Honda', name:'Civic EXL 2.0 Flex', category:'seminovo', year:2022, km:'38.000', fuel:'Flex', color:'Preto', transmission:'CVT', priceOld:'R$ 168.000', price:'R$ 154.900', priceRaw:154900, parcel:'R$ 2.699/mês', images:['https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80'], descricaoCurta:'Honda Sensing, couro bege, câmera 360°, teto solar. 6 meses de garantia.', description:'Civic EXL Sedan 2022, completo. Honda Sensing, couro bege, câmera 360°, teto solar. Revisado e com garantia de 6 meses.', opcionais:['Honda Sensing','Couro','Câmera 360°','Teto Solar'], featured:false, tag:'Oferta', status:'disponivel', dataEntrada:'2024-01-25', custoAquisicao:130000, procedencia:'troca', observacoesInternas:'', metaDescription:'Honda Civic EXL 2022 seminovo em Linhares-ES — Menelli Veículos' },
  { id:'v11', brand:'Nissan', name:'Kicks Advance CVT', category:'suv', year:2023, km:'22.000', fuel:'Flex', color:'Cinza', transmission:'CVT', priceOld:'R$ 162.000', price:'R$ 149.500', priceRaw:149500, parcel:'R$ 2.499/mês', images:['https://images.unsplash.com/photo-1593055357429-62b0ef1f1f76?w=600&q=80'], descricaoCurta:'Câmera 360°, ProPILOT, couro, teto solar. Com laudo cautelar.', description:'Kicks Advance 1.6 CVT 2023, único dono. Câmera 360°, ProPILOT, couro, teto solar. Revisada e com laudo cautelar.', opcionais:['ProPILOT','Câmera 360°','Couro','Teto Solar'], featured:false, tag:null, status:'disponivel', dataEntrada:'2024-01-18', custoAquisicao:125000, procedencia:'troca', observacoesInternas:'', metaDescription:'Nissan Kicks Advance 2023 em Linhares-ES — Menelli Veículos' },
  { id:'v12', brand:'Chevrolet', name:'Tracker Midnight 1.2', category:'zerokm', year:2024, km:'0', fuel:'Flex', color:'Preto', transmission:'Automático', priceOld:null, price:'R$ 161.990', priceRaw:161990, parcel:'R$ 2.699/mês', images:['https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80'], descricaoCurta:'Edição especial. Turbo, multimídia 8", wireless, câmeras laterais.', description:'Tracker Midnight 0km 2024, edição especial. Motor turbo, multimídia 8", wireless, câmeras laterais e traseira. Design exclusivo.', opcionais:['Turbo','Multimídia 8"','Wireless','Câmeras Laterais'], featured:false, tag:null, status:'disponivel', dataEntrada:'2024-02-08', custoAquisicao:138000, procedencia:'0km', observacoesInternas:'', metaDescription:'Chevrolet Tracker Midnight 2024 0km em Linhares-ES — Menelli Veículos' },
];

const DEFAULT_TESTIMONIALS = [
  { id:'t1', nome:'Ricardo Almeida', cidade:'Guarapari – ES', texto:'Experiência incrível do começo ao fim! Me ajudaram a encontrar o HRV perfeito dentro do meu orçamento. Financiamento aprovado em menos de 2 horas.', nota:5, ativo:true },
  { id:'t2', nome:'Fernanda Costa', cidade:'Jacupemba – ES', texto:'Comprei meu Corolla seminovo e fui muito bem atendida. Transparência total, nenhuma surpresa. Recomendo de olhos fechados para toda a família!', nota:5, ativo:true },
  { id:'t3', nome:'Marcos Oliveira', cidade:'Aracruz – ES', texto:'Fui trocar minha Hilux e recebi um valor justo na avaliação. O processo foi simples e rápido. Saí com um veículo novo no mesmo dia. Parabéns à equipe!', nota:5, ativo:true },
];

const DEFAULT_CONFIG = {
  whatsapp: '5527999849266',
  whatsappDisplay: '(27) 99984-9266',
  telefone: '(27) 99984-9266',
  email: 'contato@menelliveiculos.com.br',
  endereco: 'Av. Vitória Nº 1706 - Centro, Linhares - ES, 29900-081',
  cidade: 'Linhares - ES',
  horarioSemana: 'Seg–Sex: 08h–18h',
  horarioSabado: 'Sáb: 08h–13h',
  instagram: 'https://instagram.com/menelliveiculos',
  facebook: '#',
  youtube: '#',
  onlineAgora: true,
  heroTitulo: 'Realize o sonho do seu carro ideal',
  heroSubtitulo: 'As melhores condições de financiamento com taxa a partir de 0,79% ao mês',
  cnpj: '00.000.000/0001-00',
};

/* ---------- Utilitários ------------------------------------ */
function _read(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function _write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function _uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/* ---------- DataService ------------------------------------ */
/*
 * BACKEND MIGRATION GUIDE:
 * Cada método está comentado com o endpoint REST equivalente.
 * Para migrar: substituir o corpo com fetch() para sua API.
 * O padrão de assinatura (parâmetros e retorno) NÃO muda.
 */
const DataService = {

  /* ---- VEHICLES ----------------------------------------- */
  // GET /api/vehicles
  getVehicles() {
    const stored = _read(KEYS.VEHICLES);
    if (!stored) {
      _write(KEYS.VEHICLES, DEFAULT_VEHICLES);
      return [...DEFAULT_VEHICLES];
    }
    return stored;
  },

  // GET /api/vehicles/:id
  getVehicle(id) {
    return this.getVehicles().find(v => v.id === id) || null;
  },

  // POST /api/vehicles
  saveVehicle(data) {
    const vehicles = this.getVehicles();
    if (!data.id) {
      data.id = 'v' + _uid();
      data.dataEntrada = data.dataEntrada || new Date().toISOString().split('T')[0];
      vehicles.push(data);
    } else {
      const idx = vehicles.findIndex(v => v.id === data.id);
      if (idx >= 0) vehicles[idx] = data;
      else vehicles.push(data);
    }
    _write(KEYS.VEHICLES, vehicles);
    return data;
  },

  // DELETE /api/vehicles/:id
  deleteVehicle(id) {
    const vehicles = this.getVehicles().filter(v => v.id !== id);
    _write(KEYS.VEHICLES, vehicles);
  },

  /* ---- LEADS -------------------------------------------- */
  // GET /api/leads
  getLeads() {
    return _read(KEYS.LEADS) || [];
  },

  // POST /api/leads
  saveLead(data) {
    const leads = this.getLeads();
    data.id = 'l' + _uid();
    data.createdAt = new Date().toISOString();
    data.status = 'novo';
    leads.unshift(data);
    _write(KEYS.LEADS, leads);
    return data;
  },

  // PATCH /api/leads/:id
  updateLead(id, changes) {
    const leads = this.getLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx >= 0) { leads[idx] = { ...leads[idx], ...changes }; _write(KEYS.LEADS, leads); }
  },

  // DELETE /api/leads/:id
  deleteLead(id) {
    _write(KEYS.LEADS, this.getLeads().filter(l => l.id !== id));
  },

  /* ---- SIMULATIONS -------------------------------------- */
  // GET /api/simulations
  getSimulations() {
    return _read(KEYS.SIMULATIONS) || [];
  },

  // POST /api/simulations
  saveSimulation(data) {
    const sims = this.getSimulations();
    data.id = 's' + _uid();
    data.createdAt = new Date().toISOString();
    sims.unshift(data);
    _write(KEYS.SIMULATIONS, sims);
    return data;
  },

  // DELETE /api/simulations/:id
  deleteSimulation(id) {
    _write(KEYS.SIMULATIONS, this.getSimulations().filter(s => s.id !== id));
  },

  /* ---- TESTIMONIALS ------------------------------------- */
  // GET /api/testimonials
  getTestimonials() {
    const stored = _read(KEYS.TESTIMONIALS);
    if (!stored) { _write(KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS); return [...DEFAULT_TESTIMONIALS]; }
    return stored;
  },

  // POST /api/testimonials
  saveTestimonial(data) {
    const list = this.getTestimonials();
    if (!data.id) { data.id = 't' + _uid(); list.push(data); }
    else { const idx = list.findIndex(t => t.id === data.id); if (idx >= 0) list[idx] = data; else list.push(data); }
    _write(KEYS.TESTIMONIALS, list);
    return data;
  },

  // DELETE /api/testimonials/:id
  deleteTestimonial(id) {
    _write(KEYS.TESTIMONIALS, this.getTestimonials().filter(t => t.id !== id));
  },

  /* ---- CONFIG ------------------------------------------- */
  // GET /api/config
  getConfig() {
    return { ...DEFAULT_CONFIG, ...(_read(KEYS.CONFIG) || {}) };
  },

  // PUT /api/config
  saveConfig(data) {
    _write(KEYS.CONFIG, data);
    return data;
  },

  /* ---- VIEWS (analytics simples) ------------------------ */
  trackView(vehicleId) {
    const views = _read(KEYS.VIEWS) || {};
    views[vehicleId] = (views[vehicleId] || 0) + 1;
    _write(KEYS.VIEWS, views);
  },

  getViews() {
    return _read(KEYS.VIEWS) || {};
  },

  /* ---- FAVORITES ---------------------------------------- */
  getFavorites() {
    return _read(KEYS.FAVORITES) || [];
  },

  /* ---- STATS (dashboard) -------------------------------- */
  getStats() {
    const vehicles   = this.getVehicles();
    const leads      = this.getLeads();
    const sims       = this.getSimulations();
    const views      = this.getViews();
    const favs       = this.getFavorites();
    const today      = new Date().toISOString().split('T')[0];

    const byCategory = vehicles.reduce((acc, v) => {
      acc[v.category] = (acc[v.category] || 0) + 1;
      return acc;
    }, {});

    const leadsHoje = leads.filter(l => l.createdAt && l.createdAt.startsWith(today)).length;
    const leadsNovos = leads.filter(l => l.status === 'novo').length;

    // Últimos 7 dias de leads
    const leadsPorDia = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      leadsPorDia[key] = 0;
    }
    leads.forEach(l => {
      const d = l.createdAt ? l.createdAt.split('T')[0] : null;
      if (d && leadsPorDia[d] !== undefined) leadsPorDia[d]++;
    });

    // Top veículos mais vistos
    const topVehicles = Object.entries(views)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, count]) => ({ vehicle: this.getVehicle(id), count }))
      .filter(e => e.vehicle);

    return {
      totalVehicles: vehicles.length,
      disponiveis: vehicles.filter(v => v.status === 'disponivel').length,
      reservados: vehicles.filter(v => v.status === 'reservado').length,
      vendidos: vehicles.filter(v => v.status === 'vendido').length,
      totalLeads: leads.length,
      leadsHoje,
      leadsNovos,
      totalSimulations: sims.length,
      totalFavorites: favs.length,
      byCategory,
      leadsPorDia,
      topVehicles,
    };
  },
};

/* Expõe globalmente */
window.DataService = DataService;
