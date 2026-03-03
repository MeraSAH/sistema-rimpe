// ========================================
// COMPONENTES DE UI
// ========================================

// Crear tarjeta de producto
function createProductCard(producto) {
    return `
        <div class="card product-card">
            <div class="card-header">
                <div class="product-icon">${producto.imagen}</div>
                <h3>${producto.nombre}</h3>
                <p class="product-category">${producto.categoria}</p>
            </div>
            <div class="card-body">
                <div class="product-price">
                    $<span id="price-${producto.id}">135</span>
                    <span class="price-label">aprox.</span>
                </div>

                <div class="form-group">
                    <label class="form-label">Cantidad:</label>
                    <input type="number" id="cantidad-${producto.id}" class="form-input" value="1" min="1" onchange="updateProductPrice(${producto.id})">
                </div>

                <div class="form-group">
                    <label class="form-label">Color:</label>
                    <select id="color-${producto.id}" class="form-select">
                        ${producto.colores.map(c => `<option value="${c}">${c}</option>`).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Acabado:</label>
                    <select id="acabado-${producto.id}" class="form-select">
                        ${producto.acabados.map(a => `<option value="${a}">${a}</option>`).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Material:</label>
                    <select id="material-${producto.id}" class="form-select">
                        ${producto.materiales.map(m => `<option value="${m}">${m}</option>`).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Tipo de Entrega:</label>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input type="radio" name="entrega-${producto.id}" value="terminada" checked onchange="updateProductPrice(${producto.id})">
                            <div class="radio-content">
                                <strong>Terminada</strong>
                                <small>Incluye instalación + toma medidas</small>
                            </div>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="entrega-${producto.id}" value="rustica" onchange="updateProductPrice(${producto.id})">
                            <div class="radio-content">
                                <strong>Rústica (-15%)</strong>
                                <small>Retiro en taller, sin instalación</small>
                            </div>
                        </label>
                    </div>
                </div>

                <button onclick="addProductToCart(${producto.id})" class="btn btn-primary w-full">
                    <i data-lucide="shopping-cart"></i>
                    Agregar al Carrito
                </button>
            </div>
        </div>
    `;
}

// Actualizar precio del producto en tiempo real
function updateProductPrice(productoId) {
    const producto = findProductById(productoId);
    if (!producto) return;

    const cantidad = parseInt(document.getElementById(`cantidad-${productoId}`).value) || 1;
    const tipoEntrega = document.querySelector(`input[name="entrega-${productoId}"]:checked`).value;
    
    let precio = producto.precio * cantidad;
    if (tipoEntrega === 'rustica') {
        precio *= 0.85;
    }

    document.getElementById(`price-${productoId}`).textContent = precio.toFixed(2);
}

// Buscar producto por ID
function findProductById(id) {
    for (let categoria in productos) {
        const producto = productos[categoria].find(p => p.id === id);
        if (producto) return producto;
    }
    return null;
}

// Agregar producto al carrito
function addProductToCart(productoId) {
    const producto = findProductById(productoId);
    if (!producto) return;

    const cantidad = parseInt(document.getElementById(`cantidad-${productoId}`).value) || 1;
    const color = document.getElementById(`color-${productoId}`).value;
    const acabado = document.getElementById(`acabado-${productoId}`).value;
    const material = document.getElementById(`material-${productoId}`).value;
    const tipoEntrega = document.querySelector(`input[name="entrega-${productoId}"]:checked`).value;

    const config = {
        cantidad,
        color,
        acabado,
        material,
        tipoEntrega
    };

    let precioTotal = producto.precio * cantidad;
    if (tipoEntrega === 'rustica') {
        precioTotal *= 0.85;
    }

    const item = {
        ...producto,
        config,
        precioTotal: parseFloat(precioTotal.toFixed(2))
    };

    addToCart(item);
    
    // Reinicializar iconos después de agregar
    setTimeout(() => lucide.createIcons(), 100);
}

// Crear tarjeta de testimonio
function createTestimonialCard(testimonio) {
    const stars = '★'.repeat(testimonio.calificacion) + '☆'.repeat(5 - testimonio.calificacion);
    
    return `
        <div class="card testimonial-card">
            <div class="card-body">
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${testimonio.imagen}</div>
                    <div>
                        <h4>${testimonio.nombre}</h4>
                        <div class="testimonial-stars">${stars}</div>
                    </div>
                </div>
                <p class="testimonial-text">"${testimonio.texto}"</p>
                <div class="testimonial-footer">
                    <span class="testimonial-project">${testimonio.proyecto}</span>
                    <span class="testimonial-date">${formatDate(testimonio.fecha)}</span>
                </div>
            </div>
        </div>
    `;
}

// Crear tarjeta de proyecto
function createProjectCard(proyecto) {
    return `
        <div class="card project-card">
            <div class="project-image">
                <div class="project-icon">${proyecto.imagen}</div>
            </div>
            <div class="card-body">
                <div class="project-category">${proyecto.categoria}</div>
                <h3>${proyecto.titulo}</h3>
                <p>${proyecto.descripcion}</p>
                <div class="project-date">
                    <i data-lucide="calendar"></i>
                    ${formatDate(proyecto.fecha)}
                </div>
            </div>
        </div>
    `;
}

// Crear tarjeta de insignia
function createInsigniaCard(insignia, desbloqueada = false) {
    return `
        <div class="card insignia-card ${desbloqueada ? 'desbloqueada' : 'bloqueada'}">
            <div class="insignia-icon">${insignia.icono}</div>
            <h4>${insignia.nombre}</h4>
            <div class="insignia-nivel">${insignia.nivel}</div>
            <p class="insignia-requisito">${insignia.requisito}</p>
            ${insignia.descuento > 0 ? `<div class="insignia-descuento">${insignia.descuento}% OFF</div>` : ''}
            <div class="insignia-beneficios">
                ${insignia.beneficios.map(b => `
                    <div class="insignia-beneficio">
                        <i data-lucide="check-circle"></i>
                        <span>${b}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Crear item del carrito
function createCartItem(item, index) {
    return `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-icon">${item.imagen}</div>
                <div class="cart-item-details">
                    <h3>${item.config.cantidad}x ${item.nombre}</h3>
                    <div class="cart-item-specs">
                        <span><strong>Color:</strong> ${item.config.color}</span>
                        <span><strong>Acabado:</strong> ${item.config.acabado}</span>
                        <span><strong>Material:</strong> ${item.config.material}</span>
                        <span><strong>Entrega:</strong> ${item.config.tipoEntrega === 'terminada' ? 'Terminada' : 'Rústica'}</span>
                    </div>
                    ${item.config.tipoEntrega === 'terminada' ? `
                        <div class="cart-item-included">
                            <i data-lucide="check-circle"></i>
                            Incluye instalación y toma de medidas
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="cart-item-price">$${item.precioTotal.toFixed(2)}</div>
                <button onclick="removeCartItem(${item.id})" class="btn-remove">
                    <i data-lucide="trash-2"></i>
                    Eliminar
                </button>
            </div>
        </div>
    `;
}

// Remover item del carrito
function removeCartItem(itemId) {
    removeFromCart(itemId);
    navigateTo('carrito'); // Recargar la página del carrito
}

// Crear tarjeta de artículo del blog
function createArticleCard(articulo) {
    return `
        <div class="card article-card" onclick="navigateTo('blog-detalle', ${articulo.id})">
            <div class="article-icon">${articulo.imagen}</div>
            <div class="card-body">
                <div class="article-category">${articulo.categoria}</div>
                <h3>${articulo.titulo}</h3>
                <p>${articulo.resumen}</p>
                <div class="article-footer">
                    <span class="article-date">
                        <i data-lucide="calendar"></i>
                        ${formatDate(articulo.fecha)}
                    </span>
                    <span class="article-link">
                        Leer más <i data-lucide="arrow-right"></i>
                    </span>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// FUNCIONES AUXILIARES
// ========================================

// Formatear fecha
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
}

// Generar mensaje de WhatsApp
function generateWhatsAppMessage() {
    const cart = getCart();
    const user = getUser();
    const descuento = getDescuentoActual();
    
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }

    let mensaje = `¡Hola! He visitado el Sitio Web de Mueblería y Cerrajería "Benjamín" y quiero realizar un pedido:\n\n`;
    
    let total = 0;
    cart.forEach((item, index) => {
        mensaje += `${index + 1}. ${item.config.cantidad}x ${item.nombre}\n`;
        mensaje += `   - Color: ${item.config.color} | Acabado: ${item.config.acabado}\n`;
        mensaje += `   - Material: ${item.config.material}\n`;
        mensaje += `   - Entrega: ${item.config.tipoEntrega === 'terminada' ? 'Terminada (incluye instalación)' : 'Rústica (retiro en taller)'}\n`;
        mensaje += `   - Subtotal: $${item.precioTotal}\n\n`;
        total += item.precioTotal;
    });

    if (descuento > 0) {
        const totalConDescuento = total * (1 - descuento / 100);
        mensaje += `Subtotal: $${total.toFixed(2)}\n`;
        mensaje += `Descuento (${descuento}%): -$${(total - totalConDescuento).toFixed(2)}\n`;
        total = totalConDescuento;
    }

    mensaje += `\nTOTAL APROXIMADO: $${total.toFixed(2)}\n`;
    mensaje += `\n⚠️ Precio final se confirma según especificaciones exactas.\n`;
    
    if (user) {
        mensaje += `\n--- DATOS DEL CLIENTE ---\n`;
        mensaje += `Nombre: ${user.nombre}\n`;
        mensaje += `Email: ${user.email}\n`;
        mensaje += `Teléfono: ${user.telefono}\n`;
        if (user.direccion) mensaje += `Dirección: ${user.direccion}\n`;
        if (user.ciudad) mensaje += `Ciudad: ${user.ciudad}\n`;
    }

    const encoded = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encoded}`, '_blank');

    // Guardar el pedido
    savePedido({
        items: cart,
        total: total,
        descuento: descuento,
        mensaje: mensaje
    });

    // Limpiar carrito después de enviar
    clearCart();
    
    showNotification('Pedido enviado a WhatsApp. Te contactaremos pronto!', 'success');
}

// ========================================
// MENÚ MOBILE
// ========================================

function toggleMobileMenu() {
    const navMobile = document.getElementById('navMobile');
    const menuToggle = document.getElementById('menuToggle');
    
    navMobile.classList.toggle('active');
    
    // Cambiar icono
    const icon = menuToggle.querySelector('i');
    if (navMobile.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    
    lucide.createIcons();
}

function closeMobileMenu() {
    const navMobile = document.getElementById('navMobile');
    const menuToggle = document.getElementById('menuToggle');
    
    navMobile.classList.remove('active');
    
    const icon = menuToggle.querySelector('i');
    icon.setAttribute('data-lucide', 'menu');
    
    lucide.createIcons();
}

// ========================================
// SCROLL HEADER
// ========================================

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========================================
// INICIALIZACIÓN DE EVENTOS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Menú mobile
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
});