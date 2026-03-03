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

// Productos de exhibición (trabajos realizados)
const productos = {
    puertasTol: [
        {
            id: 'PT001',
            nombre: 'Puerta de Tol Residencial',
            categoria: 'cerrajeria',
            descripcion: 'Puerta de seguridad en tol calibre 18, con refuerzos internos y acabado en pintura electrostática',
            imagen: '🚪',
            caracteristicas: [
                'Calibre 18 (1.2mm)',
                'Refuerzos de seguridad',
                'Pintura anticorrosiva',
                'Chapa de seguridad incluida',
                'Garantía 2 años'
            ],
            medidas: 'A medida según espacio',
            precioReferencia: 'Consultar cotización',
            tiempoFabricacion: '7-10 días'
        },
        {
            id: 'PT002',
            nombre: 'Puerta de Tol Industrial',
            categoria: 'cerrajeria',
            descripcion: 'Puerta reforzada calibre 14 para uso industrial y comercial',
            imagen: '🚪',
            caracteristicas: [
                'Calibre 14 (2.0mm)',
                'Extra reforzada',
                'Sistema antipánico opcional',
                'Acabado industrial',
                'Cerradura de alta seguridad'
            ],
            medidas: 'A medida según espacio',
            precioReferencia: 'Consultar cotización',
            tiempoFabricacion: '10-15 días'
        },
        {
            id: 'PT003',
            nombre: 'Portón de Tol Corredizo',
            categoria: 'cerrajeria',
            descripcion: 'Portón corredizo en tol con sistema de rieles y motor opcional',
            imagen: '🚧',
            caracteristicas: [
                'Calibre 16 (1.5mm)',
                'Sistema de rieles de acero',
                'Motor automático opcional',
                'Pintura de alta resistencia',
                'Control remoto incluido (con motor)'
            ],
            medidas: 'A medida (hasta 6m de ancho)',
            precioReferencia: 'Consultar cotización',
            tiempoFabricacion: '15-20 días'
        }
    ],
    
    estructurasMetalicas: [
        {
            id: 'EM001',
            nombre: 'Techo Metálico Industrial',
            categoria: 'estructuras',
            descripcion: 'Estructura metálica para techos industriales, comerciales y residenciales',
            imagen: '🏗️',
            caracteristicas: [
                'Perfiles de acero estructural',
                'Cálculo de cargas incluido',
                'Soldadura certificada',
                'Pintura anticorrosiva',
                'Cubiertas opcionales (zinc, policarbonato)'
            ],
            medidas: 'A medida según proyecto',
            precioReferencia: 'Consultar cotización',
            tiempoFabricacion: '20-30 días'
        },
        {
            id: 'EM002',
            nombre: 'Cerramiento Metálico',
            categoria: 'estructuras',
            descripcion: 'Cerramientos perimetrales en estructura metálica con malla o tol',
            imagen: '⚙️',
            caracteristicas: [
                'Columnas de acero',
                'Soldadura de alta resistencia',
                'Opciones: malla, tol, policarbonato',
                'Acabado en pintura',
                'Instalación incluida'
            ],
            medidas: 'A medida según perímetro',
            precioReferencia: 'Consultar cotización',
            tiempoFabricacion: '15-25 días'
        },
        {
            id: 'EM003',
            nombre: 'Mezzanine Metálico',
            categoria: 'estructuras',
            descripcion: 'Entrepisos metálicos para optimización de espacios',
            imagen: '🏢',
            caracteristicas: [
                'Estructura de acero A36',
                'Capacidad de carga certificada',
                'Piso opcional (deck, madera)',
                'Escaleras de acceso',
                'Barandas de seguridad'
            ],
            medidas: 'A medida según espacio',
            precioReferencia: 'Consultar cotización',
            tiempoFabricacion: '25-35 días'
        }
    ],
    
    carpinteria: [
        {
            id: 'CM001',
            nombre: 'Puerta de Madera Maciza',
            categoria: 'carpinteria',
            descripcion: 'Puerta en madera maciza con acabados personalizados',
            imagen: '🚪',
            caracteristicas: [
                'Madera de cedro o laurel',
                'Diseño personalizado',
                'Barnizado o lacado',
                'Herrajes de calidad',
                'Instalación incluida'
            ],
            medidas: 'A medida según espacio',
            precioReferencia: 'Consultar cotización',
            tiempoFabricacion: '10-15 días'
        }
    ]
};

// ========================================
// SISTEMA DE NOTAS DE VENTA - RIMPE
// ========================================

// Estados de notas de venta
const estadosNota = {
    pendiente: { nombre: 'Pendiente de Pago', color: '#eab308', icono: '⏳' },
    pagada: { nombre: 'Pagada', color: '#10b981', icono: '✓' },
    parcial: { nombre: 'Pago Parcial', color: '#f59e0b', icono: '💰' },
    cancelada: { nombre: 'Cancelada', color: '#ef4444', icono: '✕' }
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
    limiteAnual: 20000, // Límite RIMPE en USD
    añoFiscal: 2024,
    
    // Datos para notas de venta (según tu talonario)
    serie: 'S 001-001-00',
    autorizacionSRI: '1133211394',
    secuencialActual: 313, // Último número usado: 0000313
    
    // Datos de la imprenta (aparece en el pie)
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

const testimonios = [
    {
        id: 1,
        nombre: 'María Rodríguez',
        proyecto: 'Puerta de Tol Residencial',
        calificacion: 5,
        texto: 'Excelente trabajo en la puerta de seguridad. La soldadura es impecable y la instalación fue perfecta.',
        fecha: '2024-11',
        imagen: '👩'
    },
    {
        id: 2,
        nombre: 'Carlos Mendoza',
        proyecto: 'Techo Metálico Comercial',
        calificacion: 5,
        texto: 'Construyeron el techo de mi local comercial. Trabajo de primera, muy profesionales.',
        fecha: '2024-10',
        imagen: '👨'
    },
    {
        id: 3,
        nombre: 'Ana Flores',
        proyecto: 'Cerramiento Perimetral',
        calificacion: 5,
        texto: 'El cerramiento quedó excelente. Estructura sólida y buen acabado.',
        fecha: '2024-12',
        imagen: '👩'
    }
];

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
        material: 'Tol calibre 18',
        antes: 'Espacio sin protección',
        despues: 'Puerta de seguridad instalada'
    },
    {
        id: 2,
        titulo: 'Estructura Metálica para Techo Industrial',
        categoria: 'Estructuras Metálicas',
        descripcion: 'Techo industrial de 200m² con estructura de acero y cubierta de zinc.',
        imagen: '🏗️',
        fecha: '2024-10',
        medidas: '20m x 10m',
        material: 'Acero estructural A36',
        antes: 'Área descubierta',
        despues: 'Techo completo instalado'
    },
    {
        id: 3,
        titulo: 'Portón Corredizo Automatizado',
        categoria: 'Cerrajería de Seguridad',
        descripcion: 'Portón corredizo de 5m con motor y control remoto.',
        imagen: '🚧',
        fecha: '2024-09',
        medidas: '5m x 2.5m',
        material: 'Tol calibre 16',
        antes: 'Ingreso sin portón',
        despues: 'Portón automático funcionando'
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
        facebook: 'https://facebook.com', // Actualizar con tu página real
        instagram: 'https://instagram.com', // Actualizar con tu perfil real
        youtube: 'https://youtube.com' // Actualizar con tu canal real
    }
};

// ========================================
// CREDENCIALES DE ADMINISTRADOR
// ========================================

const adminCredentials = {
    username: 'admin',
    password: 'benjamin2024', // CAMBIAR en producción
    sessionTimeout: 3600000 // 1 hora en milisegundos
};