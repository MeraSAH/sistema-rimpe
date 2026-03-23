// ========================================
// CATÁLOGO DE PRODUCTOS - RIMPE
// ========================================

// Categorías principales del negocio
const categorias = {
    carpinteria: {
        nombre: 'Carpintería de Madera',
        descripcion: 'Trabajos personalizados en madera de alta calidad',
        icono: '🪵'
    },
    cerrajeria: {
        nombre: 'Cerrajería de Seguridad',
        descripcion: 'Puertas de tol y sistemas de seguridad',
        icono: '🔒'
    },
    estructuras: {
        nombre: 'Estructuras Metálicas',
        descripcion: 'Techos, cerramientos y soportes industriales',
        icono: '🏗️'
    }
};

// ========================================
// SISTEMA DE CÓDIGOS DE MODELO
// Formato: XXX000
//   P = Puerta   | M = Madera   | T = Tol/Metal
//   D = Dormitorio | B = Baño  | C = Cocina
//   E = Exterior | G = General | I = Interior
// Colores: C001, C002... (se actualizarán con códigos nativos)
// ========================================
const codigosColor = {
    'C001': { nombre: 'Natural',         hex: '#C8A96E' },
    'C002': { nombre: 'Café Oscuro',      hex: '#4A2C17' },
    'C003': { nombre: 'Blanco',           hex: '#F8F8F8' },
    'C004': { nombre: 'Gris Ceniza',      hex: '#9CA3AF' },
    'C005': { nombre: 'Caoba',            hex: '#722F37' },
    'C006': { nombre: 'Wengue',           hex: '#3D2314' },
    'C007': { nombre: 'Nogal',            hex: '#8B5E3C' },
    'C008': { nombre: 'Negro Mate',       hex: '#1C1C1E' },
    'C009': { nombre: 'Gris Oscuro',      hex: '#374151' },
    'C010': { nombre: 'Bronce',           hex: '#CD7F32' },
    'C011': { nombre: 'Gris Industrial',  hex: '#6B7280' },
    'C012': { nombre: 'Negro + Natural',  hex: '#1C1C1E' },
};

// Obtener nombre de color desde código
function getNombreColor(codigo) {
    return codigosColor[codigo]?.nombre || codigo;
}

// ========================================
// PRODUCTOS con código de modelo
// imagen: URL o emoji — se puede subir desde admin
// colores: array de códigos C001, C002...
// ========================================
const productos = {

    // --- MUEBLERÍA INTERIOR ---
    muebleriaInterior: [
        {
            id: 1,
            codigo: 'PMD001',  // P=Puerta M=Madera D=Dormitorio
            nombre: 'Puerta Interior de Madera',
            categoria: 'Mueblería Interior',
            descripcion: 'Puerta interior en madera maciza con diseño personalizado, ideal para dormitorios, baños y oficinas.',
            imagen: '🚪',
            imagenUrl: '',
            precio: 135,
            colores: ['C001','C002','C003','C004'],
            acabados: ['Lacado Brillante', 'Lacado Mate', 'Barnizado'],
            materiales: ['MDF 15mm', 'Madera Sólida (Laurel)', 'Triplex Marino']
        },
        {
            id: 2,
            codigo: 'CMI002',  // C=Closet M=Madera I=Interior
            nombre: 'Closet Empotrado',
            categoria: 'Mueblería Interior',
            descripcion: 'Closet empotrado a medida con divisiones internas, cajones y sistema de puertas corredizas.',
            imagen: '🗄️',
            imagenUrl: '',
            precio: 420,
            colores: ['C003','C006','C007','C001'],
            acabados: ['Lacado Mate', 'Melamínico', 'Barnizado'],
            materiales: ['MDF 18mm', 'Aglomerado Melamínico', 'Madera Sólida']
        },
        {
            id: 3,
            codigo: 'KMI003',  // K=Cocina M=Madera I=Interior
            nombre: 'Mueble de Cocina',
            categoria: 'Mueblería Interior',
            descripcion: 'Cocina integral modular con gabinetes superiores e inferiores, cubierta y herrajes de calidad.',
            imagen: '🍳',
            imagenUrl: '',
            precio: 850,
            colores: ['C003','C004','C001','C008'],
            acabados: ['Lacado Brillante', 'Lacado Mate', 'Melamínico'],
            materiales: ['MDF 18mm', 'Aglomerado Melamínico', 'Tablero Marino']
        },
        {
            id: 4,
            codigo: 'BMB004',  // B=Baño M=Madera B=Baño
            nombre: 'Mueble de Baño',
            categoria: 'Mueblería Interior',
            descripcion: 'Vanitory de baño con lavabo integrado, espejo y cajones resistentes a la humedad.',
            imagen: '🛁',
            imagenUrl: '',
            precio: 280,
            colores: ['C003','C001','C004','C008'],
            acabados: ['Lacado Brillante', 'Lacado Mate', 'Melamínico Antihumedad'],
            materiales: ['MDF Hidrófugo', 'Tablero Marine', 'PVC']
        },
        {
            id: 5,
            codigo: 'EMI005',  // E=Estantería M=Madera I=Interior
            nombre: 'Estantería / Biblioteca',
            categoria: 'Mueblería Interior',
            descripcion: 'Biblioteca empotrada a medida con estantes regulables y puertas con vidrio templado opcional.',
            imagen: '📚',
            imagenUrl: '',
            precio: 320,
            colores: ['C003','C007','C006','C001'],
            acabados: ['Lacado Mate', 'Barnizado', 'Melamínico'],
            materiales: ['MDF 18mm', 'Aglomerado', 'Madera Sólida']
        }
    ],

    // --- MUEBLERÍA EXTERIOR ---
    muebleriaExterior: [
        {
            id: 10,
            codigo: 'PME010',  // P=Puerta M=Madera E=Exterior
            nombre: 'Puerta Principal de Madera Maciza',
            categoria: 'Mueblería Exterior',
            descripcion: 'Puerta principal en madera maciza de cedro o laurel, con tallados decorativos y herrajes de lujo.',
            imagen: '🚪',
            imagenUrl: '',
            precio: 480,
            colores: ['C001','C002','C005','C008'],
            acabados: ['Barnizado Exterior', 'Lacado UV', 'Impregnado Protector'],
            materiales: ['Cedro Nacional', 'Laurel', 'Teca Importada']
        },
        {
            id: 11,
            codigo: 'PTE011',  // P=Portón M=Madera E=Exterior
            nombre: 'Portón de Madera Doble Hoja',
            categoria: 'Mueblería Exterior',
            descripcion: 'Portón vehicular de madera maciza con doble hoja, estructura reforzada y cerradura de seguridad.',
            imagen: '🏠',
            imagenUrl: '',
            precio: 950,
            colores: ['C001','C002','C005'],
            acabados: ['Barnizado Exterior', 'Impregnado Protector', 'Lacado UV'],
            materiales: ['Cedro Nacional', 'Laurel', 'Eucalipto Tratado']
        },
        {
            id: 12,
            codigo: 'PMX012',  // P=Puerta M=Mixta X=Exterior
            nombre: 'Puerta Mixta Madera-Hierro',
            categoria: 'Mueblería Exterior',
            descripcion: 'Puerta exterior con estructura de hierro forjado y paneles de madera, combina seguridad y elegancia.',
            imagen: '🚧',
            imagenUrl: '',
            precio: 620,
            colores: ['C012','C008','C009'],
            acabados: ['Pintura Electrostática + Barniz', 'Anticorrosivo + Lacado'],
            materiales: ['Hierro Cuadrado + Cedro', 'Hierro + Laurel']
        }
    ],

    // --- CERRAJERÍA EXTERIOR ---
    cerrajeriaExterior: [
        {
            id: 20,
            codigo: 'PTE020',  // P=Puerta T=Tol E=Exterior
            nombre: 'Puerta de Tol Residencial',
            categoria: 'Cerrajería Exterior',
            descripcion: 'Puerta de seguridad en tol calibre 18 con refuerzos internos y acabado en pintura electrostática.',
            imagen: '🔒',
            imagenUrl: '',
            precio: 320,
            colores: ['C008','C003','C009','C002'],
            acabados: ['Pintura Electrostática', 'Anticorrosivo', 'Galvanizado'],
            materiales: ['Tol Calibre 18 (1.2mm)', 'Tol Calibre 16 (1.5mm)']
        },
        {
            id: 21,
            codigo: 'PTI021',  // P=Puerta T=Tol I=Industrial
            nombre: 'Puerta de Tol Industrial',
            categoria: 'Cerrajería Exterior',
            descripcion: 'Puerta reforzada calibre 14 para uso industrial y comercial, con sistema antipánico opcional.',
            imagen: '🏭',
            imagenUrl: '',
            precio: 550,
            colores: ['C008','C011','C003'],
            acabados: ['Pintura Electrostática', 'Pintura Epóxica', 'Anticorrosivo Industrial'],
            materiales: ['Tol Calibre 14 (2.0mm)', 'Tol Calibre 12 (2.5mm)']
        },
        {
            id: 22,
            codigo: 'RTE022',  // R=Reja T=Tol E=Exterior
            nombre: 'Reja Metálica de Seguridad',
            categoria: 'Cerrajería Exterior',
            descripcion: 'Reja perimetral en varilla cuadrada o tubo, con diseños decorativos y acabado anticorrosivo.',
            imagen: '⛓️',
            imagenUrl: '',
            precio: 180,
            colores: ['C008','C010','C009'],
            acabados: ['Pintura Anticorrosiva', 'Galvanizado en Caliente', 'Pintura Electrostática'],
            materiales: ['Varilla Cuadrada 1/2"', 'Tubo Cuadrado 1"', 'Hierro Forjado']
        },
        {
            id: 23,
            codigo: 'PCE023',  // P=Portón C=Corredizo E=Exterior
            nombre: 'Portón Corredizo de Tol',
            categoria: 'Cerrajería Exterior',
            descripcion: 'Portón corredizo en tol calibre 16 con sistema de rieles de acero y motor automático opcional.',
            imagen: '🚧',
            imagenUrl: '',
            precio: 780,
            colores: ['C008','C004','C003'],
            acabados: ['Pintura Electrostática', 'Anticorrosivo', 'Galvanizado'],
            materiales: ['Tol Calibre 16 (1.5mm)', 'Tol Calibre 14 (2.0mm)']
        }
    ],

    // Productos históricos (mantener compatibilidad)
    puertasTol: [
        {
            id: 'PT001',
            nombre: 'Puerta de Tol Residencial',
            categoria: 'cerrajeria',
            descripcion: 'Puerta de seguridad en tol calibre 18, con refuerzos internos y acabado en pintura electrostática',
            imagen: '🚪',
            caracteristicas: ['Calibre 18 (1.2mm)', 'Refuerzos de seguridad', 'Pintura anticorrosiva', 'Chapa de seguridad incluida', 'Garantía 2 años'],
            medidas: 'A medida según espacio',
            precioReferencia: 'Consultar cotización',
            tiempoFabricacion: '7-10 días'
        }
    ],
    estructurasMetalicas: [
        {
            id: 'EM001',
            nombre: 'Techo Metálico Industrial',
            categoria: 'estructuras',
            descripcion: 'Estructura metálica para techos industriales, comerciales y residenciales',
            imagen: '🏗️',
            caracteristicas: ['Perfiles de acero estructural', 'Cálculo de cargas incluido', 'Soldadura certificada', 'Pintura anticorrosiva'],
            medidas: 'A medida según proyecto',
            precioReferencia: 'Consultar cotización',
            tiempoFabricacion: '20-30 días'
        }
    ],
    carpinteria: [
        {
            id: 'CM001',
            nombre: 'Puerta de Madera Maciza',
            categoria: 'carpinteria',
            descripcion: 'Puerta en madera maciza con acabados personalizados',
            imagen: '🚪',
            caracteristicas: ['Madera de cedro o laurel', 'Diseño personalizado', 'Barnizado o lacado', 'Herrajes de calidad', 'Instalación incluida'],
            medidas: 'A medida según espacio',
            precioReferencia: 'Consultar cotización',
            tiempoFabricacion: '10-15 días'
        }
    ]
};

// ========================================
// SISTEMA DE INSIGNIAS
// Niveles: Simple | Premium | Elite
// Campos: id, nombre, nivel, icono, requisito, comprasMin, descuento, beneficios[]
// ========================================
const insignias = [
    // --- NIVEL SIMPLE ---
    {
        id: 'bronce',
        nombre: 'Cliente Bronce',
        nivel: 'Simple',
        icono: '🥉',
        requisito: 'Registro en el sistema',
        comprasMin: 0,
        descuento: 0,
        beneficios: [
            'Acceso al catálogo completo',
            'Cotización personalizada por WhatsApp',
            'Atención preferencial'
        ]
    },
    {
        id: 'plata',
        nombre: 'Cliente Plata',
        nivel: 'Simple',
        icono: '🥈',
        requisito: '1 compra realizada',
        comprasMin: 1,
        descuento: 5,
        beneficios: [
            '5% de descuento en próximos pedidos',
            'Prioridad en agenda de instalación',
            'Acceso a guías de mantenimiento'
        ]
    },
    {
        id: 'oro',
        nombre: 'Cliente Oro',
        nivel: 'Simple',
        icono: '🥇',
        requisito: '3 compras realizadas',
        comprasMin: 3,
        descuento: 10,
        beneficios: [
            '10% de descuento permanente',
            'Guía de mantenimiento gratuita (PDF)',
            'Agenda prioritaria de instalación',
            'Asesoría de diseño sin costo'
        ]
    },
    // --- NIVEL PREMIUM ---
    {
        id: 'esmeralda',
        nombre: 'Cliente Esmeralda',
        nivel: 'Premium',
        icono: '💚',
        requisito: '5 compras realizadas',
        comprasMin: 5,
        descuento: 12,
        beneficios: [
            '12% de descuento permanente',
            'Revisión y ajuste gratuito (1 vez/año)',
            'Diseño personalizado sin costo extra',
            'Acceso a materiales premium'
        ]
    },
    {
        id: 'zafiro',
        nombre: 'Cliente Zafiro',
        nivel: 'Premium',
        icono: '💙',
        requisito: '8 compras realizadas',
        comprasMin: 8,
        descuento: 15,
        beneficios: [
            '15% de descuento permanente',
            'Garantía extendida en todos los trabajos',
            'Instalación express (prioridad máxima)',
            'Catálogo exclusivo de diseños'
        ]
    },
    {
        id: 'rubí',
        nombre: 'Cliente Rubí',
        nivel: 'Premium',
        icono: '❤️',
        requisito: '12 compras realizadas',
        comprasMin: 12,
        descuento: 18,
        beneficios: [
            '18% de descuento permanente',
            'Mantenimiento anual sin costo',
            'Diseños exclusivos no disponibles al público',
            'Revisiones periódicas gratuitas'
        ]
    },
    {
        id: 'diamante',
        nombre: 'Cliente Diamante',
        nivel: 'Premium',
        icono: '💎',
        requisito: '15 compras realizadas',
        comprasMin: 15,
        descuento: 20,
        beneficios: [
            '20% de descuento permanente',
            'Atención VIP personalizada',
            'Acceso a catálogo de lujo',
            'Garantía de por vida en estructura'
        ]
    },
    // --- NIVEL ELITE ---
    {
        id: 'platino',
        nombre: 'Cliente Platino',
        nivel: 'Elite',
        icono: '🌟',
        requisito: '20 compras realizadas',
        comprasMin: 20,
        descuento: 22,
        beneficios: [
            '22% de descuento permanente',
            'Línea directa con el Maestro Benjamín',
            'Proyectos a costo de materiales',
            'Diseño y presupuesto en 24h',
            'Placa conmemorativa de cliente fiel'
        ]
    },
    {
        id: 'maestro',
        nombre: 'Maestro Benjamín',
        nivel: 'Elite',
        icono: '👑',
        requisito: '30+ compras — Título Honorífico',
        comprasMin: 30,
        descuento: 25,
        beneficios: [
            '25% de descuento — el máximo posible',
            'Título honorífico de cliente ejemplar',
            'Mención en nuestro taller',
            'Acceso de por vida a todos los beneficios',
            'Proyectos colaborativos con el maestro'
        ]
    }
];

// ========================================
// SISTEMA DE NOTAS DE VENTA - RIMPE
// ========================================

const estadosNota = {
    pendiente: { nombre: 'Pendiente de Pago', color: '#eab308', icono: '⏳' },
    pagada:    { nombre: 'Pagada',             color: '#10b981', icono: '✓'  },
    parcial:   { nombre: 'Pago Parcial',       color: '#f59e0b', icono: '💰' },
    cancelada: { nombre: 'Cancelada',          color: '#ef4444', icono: '✕'  }
};

// ========================================
// INFORMACIÓN DEL NEGOCIO - RIMPE
// ========================================

const infoNegocio = {
    nombreComercial: 'MUEBLERÍA Y CERRAJERÍA "BENJAMÍN"',
    propietario: 'MERA MOREIRA GREGORIO MARCIAL',
    especialidad: 'Carpintería y Cerrajería en general',
    ruc: '1311617086001',
    regimen: 'Contribuyente Negocio Popular - RÉGIMEN RIMPE',
    direccion: 'Av. Maldonado 552-62 Leonidas Dubles',
    ciudad: 'Quito - Ecuador',
    telefono: '0985998615',
    email: 'mycbenjamin@gmail.com',
    whatsapp: '593985998615',
    limiteAnual: 20000,
    añoFiscal: 2024,
    serie: 'S 001-001-00',
    autorizacionSRI: '1133211394',
    secuencialActual: 313,
    imprenta: {
        nombre: 'Imprenta Grafila',
        propietario: 'Vilana Asgui Carmen Jeanneth',
        ruc: '1715148183001',
        autorizacion: '14053',
        rangoNotas: 'Del 0000301 al 0000325',
        fechaAutorizacion: '06 / Enero / 2026',
        fechaCaducidad: '06 / Enero / 2027'
    }
};

// ========================================
// TESTIMONIOS
// ========================================

// Testimonios de ejemplo — se muestran solo si no hay testimonios aprobados en la BD
// Para eliminarlos del sitio: el admin puede gestionar todos los testimonios desde
// Admin → Testimonios (los de la BD tienen prioridad sobre estos)
const testimonios = [];

// ========================================
// GALERÍA DE PROYECTOS
// ========================================

const proyectos = [
    {
        id: 1,
        titulo: 'Puerta de Tol con Soldadura de Precisión',
        categoria: 'Cerrajería de Seguridad',
        descripcion: 'Puerta residencial calibre 18 con refuerzos internos y acabado en pintura electrostática negra.',
        imagen: '🚪',
        fecha: '2024-11',
        medidas: '2.10m x 0.90m',
        material: 'Tol calibre 18'
    },
    {
        id: 2,
        titulo: 'Estructura Metálica para Techo Industrial',
        categoria: 'Estructuras Metálicas',
        descripcion: 'Techo industrial de 200m² con estructura de acero y cubierta de zinc.',
        imagen: '🏗️',
        fecha: '2024-10',
        medidas: '20m x 10m',
        material: 'Acero estructural A36'
    },
    {
        id: 3,
        titulo: 'Portón Corredizo Automatizado',
        categoria: 'Cerrajería de Seguridad',
        descripcion: 'Portón corredizo de 5m con motor y control remoto.',
        imagen: '🚧',
        fecha: '2024-09',
        medidas: '5m x 2.5m',
        material: 'Tol calibre 16'
    }
];

// ========================================
// ARTÍCULOS DEL BLOG
// ========================================

const articulos = [
    {
        id: 1,
        titulo: 'Calibres de Tol: ¿Cuál elegir para tu puerta?',
        resumen: 'Guía completa sobre los diferentes calibres de lámina de tol y su aplicación en puertas de seguridad.',
        contenido: 'Los calibres más comunes son 18, 16 y 14. A menor número, mayor grosor y resistencia...',
        fecha: '2024-11-15',
        categoria: 'Guías Técnicas',
        imagen: '🔧'
    },
    {
        id: 2,
        titulo: 'Mantenimiento de Estructuras Metálicas',
        resumen: 'Consejos para prolongar la vida útil de tus techos y cerramientos metálicos.',
        contenido: 'El mantenimiento preventivo es clave para evitar oxidación y daños estructurales...',
        fecha: '2024-10-20',
        categoria: 'Mantenimiento',
        imagen: '🛠️'
    },
    {
        id: 3,
        titulo: 'Soldadura de Calidad: Lo que debes saber',
        resumen: 'Características de una buena soldadura en estructuras y puertas metálicas.',
        contenido: 'Una soldadura profesional garantiza la durabilidad y seguridad de la estructura...',
        fecha: '2024-12-01',
        categoria: 'Calidad',
        imagen: '⚡'
    }
];

// ========================================
// INFORMACIÓN DE CONTACTO
// ========================================

const contactInfo = {
    whatsapp: '593985998615',
    email: 'mycbenjamin@gmail.com',
    direccion: 'Guamaní, Quito - Ecuador',
    mapa: 'https://maps.app.goo.gl/4ay1g87buAnreQvR7',
    horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM\nSábados: 9:00 AM - 2:00 PM',
    redesSociales: {
        facebook:  'https://facebook.com',
        instagram: 'https://instagram.com',
        youtube:   'https://youtube.com',
        tiktok:    'https://tiktok.com/@mycbenjamin',
        twitter:   'https://twitter.com/mycbenjamin'
    }
};

// ========================================
// CREDENCIALES DE ADMINISTRADOR
// ========================================

const adminCredentials = {
    username: 'admin',
    password: 'benjamin2024',
    sessionTimeout: 3600000
};