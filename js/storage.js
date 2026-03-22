// ========================================
// GESTIÓN DE ALMACENAMIENTO LOCAL
// ========================================

// Guardar usuario
function saveUser(userData) {
    localStorage.setItem('benjaminUser', JSON.stringify(userData));
}

// Obtener usuario
function getUser() {
    const userData = localStorage.getItem('benjaminUser');
    return userData ? JSON.parse(userData) : null;
}

// Actualizar usuario
function updateUser(updates) {
    const currentUser = getUser();
    if (currentUser) {
        const updatedUser = { ...currentUser, ...updates };
        saveUser(updatedUser);
        return updatedUser;
    }
    return null;
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('benjaminUser');
    window.location.reload();
}

// ========================================
// GESTIÓN DEL CARRITO
// ========================================

// Guardar carrito
function saveCart(cartItems) {
    localStorage.setItem('benjaminCart', JSON.stringify(cartItems));
    updateCartCount();
}

// Obtener carrito
function getCart() {
    const cart = localStorage.getItem('benjaminCart');
    return cart ? JSON.parse(cart) : [];
}

// Agregar al carrito
function addToCart(item) {
    const cart = getCart();
    cart.push({
        ...item,
        id: Date.now(), // ID único para el item del carrito
        fechaAgregado: new Date().toISOString()
    });
    saveCart(cart);
    showNotification('Producto agregado al carrito', 'success');
}

// Eliminar del carrito
function removeFromCart(itemId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== itemId);
    saveCart(newCart);
    showNotification('Producto eliminado del carrito', 'info');
}

// Vaciar carrito
function clearCart() {
    localStorage.removeItem('benjaminCart');
    updateCartCount();
    showNotification('Carrito vaciado', 'info');
}

// Actualizar contador del carrito
function updateCartCount() {
    const cart = getCart();
    const count = cart.length;
    
    const cartBadge = document.getElementById('cartCount');
    const cartBadgeMobile = document.getElementById('cartCountMobile');
    
    if (cartBadge) cartBadge.textContent = count;
    if (cartBadgeMobile) cartBadgeMobile.textContent = count;
}

// ========================================
// GESTIÓN DE PEDIDOS
// ========================================

// Guardar pedido
function savePedido(pedidoData) {
    const user = getUser();
    if (!user) {
        showNotification('Debes iniciar sesión para crear un pedido', 'error');
        return false;
    }

    const pedidos = getPedidos();
    const nuevoPedido = {
        id: Date.now(),
        usuario: user.email,
        fecha: new Date().toISOString(),
        estado: 'por-iniciar',
        ...pedidoData
    };

    pedidos.push(nuevoPedido);
    localStorage.setItem('benjaminPedidos', JSON.stringify(pedidos));

    // Actualizar compras del usuario
    updateUser({ 
        compras: (user.compras || 0) + 1,
        ultimaCompra: new Date().toISOString()
    });

    return nuevoPedido;
}

// Obtener todos los pedidos
function getPedidos() {
    const pedidos = localStorage.getItem('benjaminPedidos');
    return pedidos ? JSON.parse(pedidos) : [];
}

// Obtener pedidos del usuario actual
function getUserPedidos() {
    const user = getUser();
    if (!user) return [];

    const allPedidos = getPedidos();
    return allPedidos.filter(pedido => pedido.usuario === user.email);
}

// Actualizar estado del pedido
function updatePedidoEstado(pedidoId, nuevoEstado) {
    const pedidos = getPedidos();
    const pedidoIndex = pedidos.findIndex(p => p.id === pedidoId);
    
    if (pedidoIndex !== -1) {
        pedidos[pedidoIndex].estado = nuevoEstado;
        pedidos[pedidoIndex].ultimaActualizacion = new Date().toISOString();
        localStorage.setItem('benjaminPedidos', JSON.stringify(pedidos));
        return true;
    }
    return false;
}

// ========================================
// GESTIÓN DE INSIGNIAS
// ========================================

// Calcular insignia actual del usuario
// Respeta override manual del administrador
function calcularInsigniaActual() {
    const user = getUser();
    if (!user) return null;

    // 1. Verificar si el admin asignó una insignia manualmente
    const overrides = JSON.parse(localStorage.getItem('insigniasOverrides') || '{}');
    const cedula = user.cedula || user.email; // intentar por cédula, fallback por email
    if (overrides[cedula]) return { ...overrides[cedula], esManual: true };

    // 2. Buscar por email como clave alternativa
    const porEmail = Object.entries(overrides).find(([k, v]) => k === user.email);
    if (porEmail) return { ...porEmail[1], esManual: true };

    // 3. Cálculo automático por compras
    const compras = user.compras || 0;
    let insigniaActual = insignias[0];
    for (let i = insignias.length - 1; i >= 0; i--) {
        if ((insignias[i].comprasMin || 0) <= compras) {
            insigniaActual = insignias[i];
            break;
        }
    }
    return insigniaActual;
}

// Obtener descuento actual
function getDescuentoActual() {
    const insignia = calcularInsigniaActual();
    return insignia ? insignia.descuento : 0;
}

// Verificar si el usuario tiene una insignia específica
function tieneInsignia(insigniaId) {
    const user = getUser();
    if (!user) return false;

    const insignia = insignias.find(i => i.id === insigniaId);
    if (!insignia) return false;

    const compras = user.compras || 0;
    return insignia.comprasMin ? compras >= insignia.comprasMin : false;
}

// ========================================
// NOTIFICACIONES
// ========================================

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Agregar estilos si no existen
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
                max-width: 400px;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .notification-icon {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 14px;
            }
            .notification-success { border-left: 4px solid #10b981; }
            .notification-success .notification-icon { background: #d1fae5; color: #10b981; }
            .notification-error { border-left: 4px solid #ef4444; }
            .notification-error .notification-icon { background: #fee2e2; color: #ef4444; }
            .notification-info { border-left: 4px solid #3b82f6; }
            .notification-info .notification-icon { background: #dbeafe; color: #3b82f6; }
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Agregar al body
    document.body.appendChild(notification);

    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================================
// INICIALIZACIÓN
// ========================================

// Actualizar nombre de usuario en el header
function updateUserNameDisplay() {
    const user = getUser();
    const userNameElement = document.getElementById('userName');
    
    if (userNameElement) {
        if (user) {
            userNameElement.textContent = user.nombre.split(' ')[0];
        } else {
            userNameElement.textContent = 'Perfil';
        }
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    updateUserNameDisplay();
});