// ========================================
// GESTOR DE IMÁGENES — Mueblería Benjamín
// ========================================
// Centraliza todas las imágenes del sitio.
// Para usar una imagen real en lugar del emoji,
// sube la foto a tu repositorio en /img/
// y reemplaza la ruta aquí.
//
// Formatos recomendados:
//   - Fotos de productos:  WebP, 800×600px, < 200KB
//   - Galería de proyectos: WebP, 1200×800px, < 400KB
//   - Logo / marca:        PNG con transparencia
//   - Hero / banner:       WebP, 1920×600px, < 500KB
// ========================================

const imagenesConfig = {

    // ─── MARCA ──────────────────────────────────────────────
    logo: {
        principal: '/img/logo/logo-benjamin.png',
        favicon:   '/img/logo/favicon.ico',
        fallback:  'B'          // letra que se muestra si no carga la imagen
    },

    // ─── HERO / BANNER ──────────────────────────────────────
    hero: {
        inicio:    '/img/hero/taller-principal.webp',
        catalogo:  '/img/hero/catalogo-banner.webp',
        fallback:  null         // sin imagen = fondo de color CSS
    },

    // ─── GALERÍA DE PROYECTOS ───────────────────────────────
    // Añade aquí cada proyecto con su foto real.
    // Sube las fotos a /img/galeria/
    galeria: [
        {
            id: 1,
            foto:     '/img/galeria/puerta-tol-001.webp',
            thumb:    '/img/galeria/thumbs/puerta-tol-001.webp',
            emoji:    '🚪',     // se muestra si la foto no carga
            alt:      'Puerta de tol calibre 18 con soldadura de precisión'
        },
        {
            id: 2,
            foto:     '/img/galeria/techo-metalico-001.webp',
            thumb:    '/img/galeria/thumbs/techo-metalico-001.webp',
            emoji:    '🏗️',
            alt:      'Estructura metálica para techo industrial 200m²'
        },
        {
            id: 3,
            foto:     '/img/galeria/porton-corredizo-001.webp',
            thumb:    '/img/galeria/thumbs/porton-corredizo-001.webp',
            emoji:    '🚧',
            alt:      'Portón corredizo automatizado 5m'
        }
        // Agrega más: copiar el bloque de arriba y cambiar id, rutas y alt
    ],

    // ─── CATÁLOGO DE PRODUCTOS ──────────────────────────────
    // Añade fotos reales de tus productos.
    // Sube las fotos a /img/productos/
    productos: {
        // Mueblería Interior
        1:  { foto: '/img/productos/puerta-interior-001.webp', emoji: '🚪' },
        2:  { foto: '/img/productos/closet-001.webp',          emoji: '🗄️' },
        3:  { foto: '/img/productos/cocina-001.webp',           emoji: '🍳' },
        4:  { foto: '/img/productos/banio-001.webp',            emoji: '🛁' },
        5:  { foto: '/img/productos/estanteria-001.webp',       emoji: '📚' },
        // Mueblería Exterior
        10: { foto: '/img/productos/puerta-madera-001.webp',   emoji: '🚪' },
        11: { foto: '/img/productos/porton-madera-001.webp',   emoji: '🏠' },
        12: { foto: '/img/productos/puerta-mixta-001.webp',    emoji: '🚧' },
        // Cerrajería
        20: { foto: '/img/productos/puerta-tol-res-001.webp',  emoji: '🔒' },
        21: { foto: '/img/productos/puerta-tol-ind-001.webp',  emoji: '🏭' },
        22: { foto: '/img/productos/reja-001.webp',            emoji: '⛓️' },
        23: { foto: '/img/productos/porton-corredizo-001.webp',emoji: '🚧' },
    },

    // ─── EQUIPO / TALLER ────────────────────────────────────
    equipo: {
        maestro:   '/img/equipo/maestro-benjamin.webp',
        taller:    '/img/equipo/taller-exterior.webp',
        fallback:  '👨‍🔧'
    },

    // ─── BLOG ───────────────────────────────────────────────
    // Las miniaturas de los artículos del blog
    blog: {
        1: { foto: '/img/blog/calibres-tol.webp',     emoji: '🔧' },
        2: { foto: '/img/blog/mantenimiento.webp',     emoji: '🛠️' },
        3: { foto: '/img/blog/soldadura.webp',         emoji: '⚡' },
    }
};

// ========================================
// FUNCIÓN HELPER — obtener imagen con fallback
// ========================================
// Uso: getImagen('galeria', 1) → devuelve URL o emoji si no hay foto
function getImagen(seccion, id) {
    if (!imagenesConfig[seccion]) return '📦';
    if (Array.isArray(imagenesConfig[seccion])) {
        const item = imagenesConfig[seccion].find(i => i.id == id);
        return item?.foto || item?.emoji || '📦';
    }
    const item = imagenesConfig[seccion][id];
    return item?.foto || item?.emoji || '📦';
}

// Crear elemento img con fallback a emoji si la imagen no carga
function crearImagen(src, alt, emoji, clases = '') {
    const wrapper = document.createElement('div');
    wrapper.className = clases;
    if (!src || src.includes('TU_') || src.startsWith('/img/')) {
        // Imagen aún no subida → mostrar emoji
        wrapper.style.cssText = 'display:flex;align-items:center;justify-content:center;font-size:3rem;background:var(--color-gray-100);min-height:150px;border-radius:8px';
        wrapper.textContent = emoji || '📦';
    } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt || '';
        img.loading = 'lazy';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:8px';
        img.onerror = () => {
            wrapper.style.cssText = 'display:flex;align-items:center;justify-content:center;font-size:3rem;background:var(--color-gray-100);min-height:150px;border-radius:8px';
            wrapper.textContent = emoji || '📦';
        };
        wrapper.appendChild(img);
    }
    return wrapper;
}

// ========================================
// ESTRUCTURA DE CARPETAS RECOMENDADA
// ========================================
// /img/
// ├── logo/
// │   ├── logo-benjamin.png
// │   └── favicon.ico
// ├── hero/
// │   ├── taller-principal.webp
// │   └── catalogo-banner.webp
// ├── galeria/
// │   ├── thumbs/          ← versiones pequeñas (400×300)
// │   ├── puerta-tol-001.webp
// │   └── techo-metalico-001.webp
// ├── productos/
// │   ├── puerta-interior-001.webp
// │   └── ...
// ├── blog/
// │   └── ...
// └── equipo/
//     └── maestro-benjamin.webp
//
// HERRAMIENTAS GRATUITAS PARA OPTIMIZAR FOTOS:
//   • Convertir a WebP:  https://squoosh.app
//   • Comprimir JPG/PNG: https://tinypng.com
//   • Redimensionar:     https://www.birme.net
// ========================================