// ============================================================
// CATÁLOGO VIP — Mueblería y Cerrajería "Benjamín"
// Acceso: Clientes Premium (Esmeralda+) y Elite (Platino+)
// Carga: DESPUÉS de data.js y storage.js, ANTES de pages.js
// ============================================================

const productosVIP = [

    // ─── NIVEL PREMIUM (Esmeralda, Zafiro, Rubí, Diamante) ───

    {
        id: 'V001',
        codigo: 'PMT-V01',
        nombre: 'Puerta Principal — Madera de Teca Importada',
        categoria: 'Mueblería Exterior VIP',
        descripcion: 'Puerta en madera de teca certificada sin nudos, con aceite natural protector de 5 capas y herrajes de acero inoxidable 316 marino. Resistente a intemperie y humedad por décadas.',
        imagen: '🚪',
        imagenUrl: '',
        precio: 1850,
        nivelRequerido: 'Premium',
        colores: ['C001', 'C002', 'C005'],
        acabados: ['Aceite de Teca Natural', 'Barniz UV Exterior Premium', 'Impregnado Protector Pro'],
        materiales: ['Teca Indonesia 1ra Calidad', 'Teca Myanmar Premium'],
        caracteristicasVIP: [
            'Madera sin nudos certificada',
            'Herrajes Acero Inox 316 marino',
            'Tratamiento antihumedad 5 capas',
            'Garantía extendida 5 años'
        ],
        tiempoFabricacion: '20–25 días hábiles',
        precioLabel: 'desde'
    },
    {
        id: 'V002',
        codigo: 'CVS-V02',
        nombre: 'Vestidor Completo con Iluminación LED',
        categoria: 'Mueblería Interior VIP',
        descripcion: 'Vestidor a medida con iluminación LED integrada, cajones con cierre amortiguado, barras telescópicas y sistema de organización modular de hasta 4 metros lineales.',
        imagen: '👔',
        imagenUrl: '',
        precio: 2200,
        nivelRequerido: 'Premium',
        colores: ['C003', 'C006', 'C007', 'C008'],
        acabados: ['Lacado Mate Premium 2K', 'Melamínico Soft-Touch', 'Madera Natural Barnizada'],
        materiales: ['MDF 18mm Premium', 'Tablero Marino Tropical', 'Madera Maciza Cedro'],
        caracteristicasVIP: [
            'Herrajes Blum importados (Austria)',
            'Iluminación LED con sensor de movimiento',
            'Cajones con cierre amortiguado',
            'Diseño 3D personalizado incluido'
        ],
        tiempoFabricacion: '15–20 días hábiles',
        precioLabel: 'desde'
    },
    {
        id: 'V003',
        codigo: 'KCB-V03',
        nombre: 'Cocina Integral — Herrajes Blum + Cuarzo',
        categoria: 'Mueblería Interior VIP',
        descripcion: 'Cocina integral completa con cubierta en cuarzo engineered o granito natural, sistema herrajes Blum Austria (Clip Top, Tandembox, Movento) y organización interior premium.',
        imagen: '🍽️',
        imagenUrl: '',
        precio: 3800,
        nivelRequerido: 'Premium',
        colores: ['C003', 'C008', 'C004', 'C007'],
        acabados: ['Lacado Alto Brillo 2K', 'Lacado Mate Premium', 'Madera Natural', 'Melamínico Textured'],
        materiales: ['MDF 18mm + Cuarzo Engineered', 'MDF Hidrófugo + Granito Natural'],
        caracteristicasVIP: [
            'Sistema herrajes Blum Austria completo',
            'Cubierta cuarzo / granito natural',
            'Bisagras Clip Top 110°',
            'Cajones Tandembox extraíble total',
            'Garantía 3 años en herrajes Blum'
        ],
        tiempoFabricacion: '25–30 días hábiles',
        precioLabel: 'desde'
    },
    {
        id: 'V004',
        codigo: 'PSB-V04',
        nombre: 'Puerta de Seguridad Blindada 3mm',
        categoria: 'Cerrajería VIP',
        descripcion: 'Puerta blindada con lámina tol 3mm, marco perimetral tubo 50×50, cerradura multipunto 5 anclajes, mirilla gran angular 200° y aislamiento acústico incorporado.',
        imagen: '🔐',
        imagenUrl: '',
        precio: 1200,
        nivelRequerido: 'Premium',
        colores: ['C008', 'C003', 'C004', 'C009'],
        acabados: ['Pintura Electrostática Premium', 'Powder Coating Industrial', 'Pintura Forja Decorativa'],
        materiales: ['Tol 3mm + Marco 50×50', 'Tol 3.5mm + Marco 60×60'],
        caracteristicasVIP: [
            '5 puntos de anclaje antipalanca',
            'Cerradura importada alta seguridad',
            'Marco perimetral reforzado 360°',
            'Mirilla 200° gran angular incluida'
        ],
        tiempoFabricacion: '10–15 días hábiles',
        precioLabel: 'desde'
    },
    {
        id: 'V005',
        codigo: 'PAM-V05',
        nombre: 'Portón Automático 500N + Telecomando',
        categoria: 'Cerrajería VIP',
        descripcion: 'Portón corredizo automatizado con motor 500N importado Italia, 2 telecomandos, sensor fotoeléctrico, batería respaldo 8 horas para cortes de luz y control app opcional.',
        imagen: '🚗',
        imagenUrl: '',
        precio: 2100,
        nivelRequerido: 'Premium',
        colores: ['C008', 'C004', 'C003'],
        acabados: ['Pintura Electrostática', 'Galvanizado + Pintura Epóxica'],
        materiales: ['Tol 2mm + Motor Nice Italia', 'Tol 2mm + Motor Came Italia'],
        caracteristicasVIP: [
            'Motor 500N importado Italia',
            'Sensor fotoeléctrico de seguridad',
            'Batería respaldo 8h (corte de luz)',
            '2 telecomandos incluidos'
        ],
        tiempoFabricacion: '12–18 días hábiles',
        precioLabel: 'desde'
    },
    {
        id: 'V006',
        codigo: 'BMV-V06',
        nombre: 'Suite de Baño Completa Flotante',
        categoria: 'Mueblería Interior VIP',
        descripcion: 'Baño completo a medida: vanitory flotante, columna de almacenaje, espejo retroiluminado LED táctil y accesorios acero inoxidable 304 premium.',
        imagen: '🛁',
        imagenUrl: '',
        precio: 1650,
        nivelRequerido: 'Premium',
        colores: ['C003', 'C008', 'C007', 'C001'],
        acabados: ['Lacado Mate Antihumedad 2K', 'Melamínico Hidrófugo Premium', 'PVC Alta Densidad'],
        materiales: ['MDF Hidrófugo + Cuarzo', 'Tablero Marine + Porcelana'],
        caracteristicasVIP: [
            'Espejo LED retroiluminado táctil',
            'Materiales antihumedad certificados',
            'Accesorios Acero Inox 304',
            'Diseño personalizado con render 3D'
        ],
        tiempoFabricacion: '15–20 días hábiles',
        precioLabel: 'desde'
    },
    {
        id: 'V007',
        codigo: 'HOF-V07',
        nombre: 'Estación Home Office Modular Premium',
        categoria: 'Mueblería Interior VIP',
        descripcion: 'Escritorio ergonómico con cajonera de seguridad con llave, biblioteca superior con puertas de vidrio templado, organizador de cables integrado y bandeja para teclado extraíble.',
        imagen: '🖥️',
        imagenUrl: '',
        precio: 980,
        nivelRequerido: 'Premium',
        colores: ['C003', 'C008', 'C006', 'C007'],
        acabados: ['Lacado Mate Premium', 'Melamínico Textured', 'Mixto Madera + Acero'],
        materiales: ['MDF 18mm + Vidrio Templado', 'Madera Maciza + Perfilería Metal'],
        caracteristicasVIP: [
            'Cajonera con cerradura de seguridad',
            'Organizador de cables integrado',
            'Puertas biblioteca vidrio templado',
            'Bandeja teclado extraíble regulable'
        ],
        tiempoFabricacion: '10–14 días hábiles',
        precioLabel: 'desde'
    },

    // ─── NIVEL ELITE (Platino, Maestro Benjamín) ──────────────

    {
        id: 'V008',
        codigo: 'PAB-E08',
        nombre: 'Puerta Acorazada Elite — Tol 4mm + 7 Puntos',
        categoria: 'Cerrajería Elite',
        descripcion: 'Puerta acorazada de máxima seguridad: tol 4mm, perfil estructural HEB, cerradura Mottura 7 puntos importada Italia, antipalanca perimetral 360° y aislamiento acústico 42dB.',
        imagen: '🏰',
        imagenUrl: '',
        precio: 2800,
        nivelRequerido: 'Elite',
        colores: ['C008', 'C003', 'C010'],
        acabados: ['Powder Coating Premium', 'Pintura Forja Anticuada', 'Acero Cepillado Natural'],
        materiales: ['Tol 4mm + Perfil HEB 100', 'Tol 4mm + Tubo 80×80 Estructural'],
        caracteristicasVIP: [
            'Tol calibre 4mm — máximo disponible',
            '7 puntos de anclaje antipalanca',
            'Cerradura Mottura importada Italia',
            'Aislamiento acústico 42dB certificado',
            'Antipalanca perimetral 360°',
            'Garantía de por vida en estructura'
        ],
        tiempoFabricacion: '20–25 días hábiles',
        precioLabel: 'desde'
    },
    {
        id: 'V009',
        codigo: 'EMF-E09',
        nombre: 'Escalera Flotante — Madera Maciza + LED',
        categoria: 'Mueblería Elite',
        descripcion: 'Escalera floating arquitectónica en madera maciza (cedro, teca o nogal) con zancas de acero estructural certificado, iluminación LED integrada por escalón y pasamanos personalizado.',
        imagen: '🏛️',
        imagenUrl: '',
        precio: 4500,
        nivelRequerido: 'Elite',
        colores: ['C001', 'C002', 'C005', 'C007'],
        acabados: ['Barniz Marino Premium UV', 'Aceite Danés Natural', 'Lacado Poliuretano UV'],
        materiales: ['Cedro Nacional + Acero Estructural A36', 'Teca + Acero Inoxidable 304'],
        caracteristicasVIP: [
            'Diseño arquitectónico personalizado',
            'Zancas acero estructural certificado',
            'LED por escalón (regulable e intensidad)',
            'Pasamanos madera o acero inoxidable',
            'Cálculo estructural de cargas incluido',
            'Instalación por técnico especializado'
        ],
        tiempoFabricacion: '35–45 días hábiles',
        precioLabel: 'desde'
    },
    {
        id: 'V010',
        codigo: 'PRY-E10',
        nombre: 'Proyecto Integral de Vivienda — Paquete Elite',
        categoria: 'Paquete Elite',
        descripcion: 'Amoblamiento completo de vivienda: sala, comedor, dormitorio principal, cocina integral y baños. Incluye diseño de interiores, renders 3D fotorrealistas, fabricación e instalación coordinada.',
        imagen: '🏡',
        imagenUrl: '',
        precio: 12000,
        nivelRequerido: 'Elite',
        colores: ['C001', 'C003', 'C007', 'C008'],
        acabados: ['Definido en diseño personalizado'],
        materiales: ['MDF Premium + Madera Maciza + Tol + Cuarzo'],
        caracteristicasVIP: [
            'Diseño de interiores completo',
            'Renders 3D fotorrealistas previos',
            'Coordinación con todos los gremios',
            'Garantía integral 2 años',
            'Gerencia de proyecto dedicada',
            'Financiamiento disponible'
        ],
        tiempoFabricacion: 'Según alcance del proyecto',
        precioLabel: 'desde'
    },
];

// ── Control de acceso ─────────────────────────────────────────

function puedeVerVIP() {
    const user = typeof getUser === 'function' ? getUser() : null;
    if (!user) return false;
    const ins = typeof calcularInsigniaActual === 'function' ? calcularInsigniaActual() : null;
    return ins && ['Premium', 'Elite'].includes(ins.nivel);
}

function puedeVerVIPElite() {
    const user = typeof getUser === 'function' ? getUser() : null;
    if (!user) return false;
    const ins = typeof calcularInsigniaActual === 'function' ? calcularInsigniaActual() : null;
    return ins && ins.nivel === 'Elite';
}

function getNivelVIPUsuario() {
    const ins = typeof calcularInsigniaActual === 'function' ? calcularInsigniaActual() : null;
    return ins?.nivel || null;
}

function getProductosVIPAccesibles() {
    const nivel = getNivelVIPUsuario();
    const todos  = getProductosVIPAdmin();
    if (nivel === 'Elite')   return todos;
    if (nivel === 'Premium') return todos.filter(p => p.nivelRequerido === 'Premium');
    return [];
}

function getProductosVIPBloqueados() {
    const nivel = getNivelVIPUsuario();
    const todos  = getProductosVIPAdmin();
    if (nivel === 'Elite')   return [];
    if (nivel === 'Premium') return todos.filter(p => p.nivelRequerido === 'Elite');
    return todos;
}

// ── CRUD Admin ────────────────────────────────────────────────
const VIP_KEY = 'productosVIPCustom';

function getProductosVIPAdmin() {
    const custom = localStorage.getItem(VIP_KEY);
    return custom ? JSON.parse(custom) : JSON.parse(JSON.stringify(productosVIP));
}

function saveProductosVIPAdmin(lista) {
    localStorage.setItem(VIP_KEY, JSON.stringify(lista));
}

function addProductoVIPAdmin(prod) {
    const lista  = getProductosVIPAdmin();
    const nuevo  = { ...prod, id: 'V' + String(Date.now()).slice(-6) };
    lista.push(nuevo);
    saveProductosVIPAdmin(lista);
    return nuevo;
}

function updateProductoVIPAdmin(id, updates) {
    const lista = getProductosVIPAdmin();
    const idx   = lista.findIndex(p => p.id === id);
    if (idx === -1) return false;
    lista[idx]  = { ...lista[idx], ...updates };
    saveProductosVIPAdmin(lista);
    return true;
}

function deleteProductoVIPAdmin(id) {
    saveProductosVIPAdmin(getProductosVIPAdmin().filter(p => p.id !== id));
    return true;
}