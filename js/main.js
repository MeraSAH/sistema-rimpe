// ========================================
// SISTEMA DE NAVEGACIÓN
// ========================================

let currentPage = 'inicio';

// Navegar a una página
function navigateTo(page, param = null) {
    currentPage = page;
    
    // Cerrar menú mobile si está abierto
    closeMobileMenu();
    
    // Scroll al top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Renderizar página
    const mainContent = document.getElementById('mainContent');
    
    let content = '';
    
    switch(page) {
        case 'inicio':
            content = renderInicio();
            break;
        case 'sobre-nosotros':
            content = renderSobreNosotros();
            break;
        case 'catalogo-muebleria-interior':
            content = renderCatalogo('muebleria-interior');
            break;
        case 'catalogo-muebleria-exterior':
            content = renderCatalogo('muebleria-exterior');
            break;
        case 'catalogo-cerrajeria':
            content = renderCatalogo('cerrajeria');
            break;
        case 'perfil':
            content = renderPerfil();
            break;
        case 'carrito':
            content = renderCarrito();
            break;
        case 'testimonios':
            content = renderTestimonios();
            break;
        case 'galeria':
            content = renderGaleria();
            break;
        case 'blog':
            content = renderBlog();
            break;
        case 'contacto':
            content = renderContacto();
            break;
        case 'consulta-notas':
            content = renderConsultaNotas();
            break;
        case 'admin-login':
            content = renderAdminLogin();
            break;
        case 'admin-panel':
            content = renderAdminPanel();
            break;
        case 'admin-nueva-nota':
            content = renderNuevaNota();
            break;
        case 'admin-historial':
            content = renderAdminHistorial();
            break;
        case 'admin-productos':
            content = renderAdminProductos();
            break;
        case 'admin-clientes':
            content = renderAdminClientes();
            break;
        default:
            content = renderInicio();
    }
    
    mainContent.innerHTML = content;
    
    // Reinicializar iconos de Lucide
    lucide.createIcons();
    
    // Actualizar estado de la navegación
    updateNavState();
}

// Actualizar estado visual de la navegación
function updateNavState() {
    // Opcional: agregar clase 'active' a enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
}

// ========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ========================================

function initApp() {
    console.log('🏗️ Inicializando Mueblería y Cerrajería Benjamín...');
    
    // Verificar si hay usuario guardado
    const user = getUser();
    if (user) {
        console.log('👤 Usuario encontrado:', user.nombre);
    }
    
    // Cargar contador del carrito
    updateCartCount();
    
    // Actualizar nombre de usuario
    updateUserNameDisplay();
    
    // Cargar página inicial
    navigateTo('inicio');
    
    console.log('✅ Aplicación inicializada correctamente');
}

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// ========================================
// MANEJO DE ERRORES GLOBALES
// ========================================

window.addEventListener('error', (event) => {
    console.error('Error en la aplicación:', event.error);
});

// ========================================
// COMPATIBILIDAD CON NAVEGACIÓN DEL NAVEGADOR
// ========================================

// Guardar estado en el historial
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
        navigateTo(event.state.page);
    }
});

// ========================================
// FUNCIONES AUXILIARES GLOBALES
// ========================================

// Copiar texto al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copiado al portapapeles', 'success');
    }).catch(err => {
        showNotification('Error al copiar', 'error');
    });
}

// Compartir (Web Share API)
function shareContent(title, text, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).then(() => {
            showNotification('Compartido exitosamente', 'success');
        }).catch(err => {
            console.log('Error al compartir:', err);
        });
    } else {
        copyToClipboard(url);
    }
}

// ========================================
// UTILIDADES DE DESARROLLO
// ========================================

// Función para datos de prueba (solo desarrollo)
function loadTestData() {
    if (confirm('¿Cargar datos de prueba? Esto creará un usuario de ejemplo.')) {
        const testUser = {
            nombre: 'Juan Pérez',
            email: 'juan@ejemplo.com',
            telefono: '0999999999',
            direccion: 'Calle Principal 123',
            ciudad: 'Quito',
            referencia: 'Frente al parque',
            compras: 5,
            fechaRegistro: new Date().toISOString(),
            pedidos: []
        };
        
        saveUser(testUser);
        showNotification('Datos de prueba cargados', 'success');
        navigateTo('perfil');
    }
}

// Función para limpiar todos los datos
function clearAllData() {
    if (confirm('¿Estás seguro de que quieres borrar TODOS los datos? Esta acción no se puede deshacer.')) {
        localStorage.clear();
        showNotification('Todos los datos han sido eliminados', 'info');
        location.reload();
    }
}

// Hacer funciones disponibles globalmente para debugging
if (typeof window !== 'undefined') {
    window.benjaminApp = {
        loadTestData,
        clearAllData,
        navigateTo,
        getUser,
        getCart,
        getPedidos,
        productos,
        insignias
    };
    
    console.log('💡 Tip: Usa benjaminApp en la consola para debugging');
}