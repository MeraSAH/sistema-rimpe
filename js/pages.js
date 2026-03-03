// ========================================
// RENDERIZADO DE PÁGINAS
// ========================================

// Página de Inicio
function renderInicio() {
    return `
        <div class="fade-in">
            <!-- Hero -->
            <div class="hero">
                <div class="hero-content">
                    <div class="logo-large">
                        <div class="logo-icon-large">B</div>
                    </div>
                    <h1>Calidad y Seguridad<br/>para tu Hogar</h1>
                    <p>Más de 20 años creando espacios únicos en Quito, Ecuador</p>
                    <div class="hero-badges">
                        <div class="badge">
                            <i data-lucide="shield"></i>
                            <span>Garantía Total</span>
                        </div>
                        <div class="badge">
                            <i data-lucide="star"></i>
                            <span>Maestro Artesano</span>
                        </div>
                        <div class="badge">
                            <i data-lucide="wrench"></i>
                            <span>Instalación Incluida</span>
                        </div>
                    </div>
                    <button onclick="navigateTo('catalogo-muebleria-interior')" class="btn btn-primary btn-large">
                        Ver Catálogo Completo
                        <i data-lucide="chevron-right"></i>
                    </button>
                </div>
            </div>

            <!-- Servicios -->
            <div class="grid grid-3 mb-4">
                <div class="service-card service-amber" onclick="navigateTo('catalogo-muebleria-interior')">
                    <i data-lucide="sofa"></i>
                    <h3>Mueblería Interior</h3>
                    <p>Puertas, cocinas, baños, closets y más</p>
                    <i data-lucide="chevron-right" class="service-arrow"></i>
                </div>
                <div class="service-card service-dark" onclick="navigateTo('catalogo-muebleria-exterior')">
                    <i data-lucide="door-open"></i>
                    <h3>Mueblería Exterior</h3>
                    <p>Puertas principales y portones de madera</p>
                    <i data-lucide="chevron-right" class="service-arrow"></i>
                </div>
                <div class="service-card service-slate" onclick="navigateTo('catalogo-cerrajeria')">
                    <i data-lucide="lock"></i>
                    <h3>Cerrajería Exterior</h3>
                    <p>Seguridad completa con puertas mixtas y rejas</p>
                    <i data-lucide="chevron-right" class="service-arrow"></i>
                </div>
            </div>

            <!-- Testimonios Mini -->
            <div class="section">
                <h2 class="section-title text-center">Lo Que Dicen Nuestros Clientes</h2>
                <div class="grid grid-3">
                    ${testimonios.slice(0, 3).map(t => createTestimonialCard(t)).join('')}
                </div>
                <div class="text-center mt-3">
                    <button onclick="navigateTo('testimonios')" class="btn btn-secondary">
                        Ver Todos los Testimonios
                        <i data-lucide="arrow-right"></i>
                    </button>
                </div>
            </div>

            <!-- CTA Insignias -->
            <div class="cta-box">
                <i data-lucide="award" class="cta-icon"></i>
                <h2>Sistema de Insignias y Recompensas</h2>
                <p>Gana beneficios exclusivos, descuentos y guías con cada compra</p>
                <button onclick="navigateTo('perfil')" class="btn btn-primary">
                    ${getUser() ? 'Ver Mis Insignias' : 'Registrarme Ahora'}
                </button>
            </div>
        </div>
    `;
}

// Página Sobre Nosotros
function renderSobreNosotros() {
    return `
        <div class="fade-in container-small">
            <div class="page-header">
                <h1>Nuestra Historia</h1>
                <p>Más de 20 años de experiencia y pasión por la ebanistería</p>
            </div>

            <div class="grid grid-2 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">
                            <i data-lucide="sparkles"></i>
                            El Maestro
                        </h2>
                        <p>Con más de 20 años de experiencia en el arte de la ebanistería, nuestro Maestro fundador tuvo una idea brillante: crear un taller especializado en el sector de Guamaní, Quito-Ecuador, donde la calidad y la dedicación se fusionan en cada pieza de madera y metal.</p>
                        <p>Cada proyecto es una obra de arte, elaborada con técnicas tradicionales y herramientas modernas, garantizando durabilidad, belleza y funcionalidad.</p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">
                            <i data-lucide="heart"></i>
                            Nuestra Misión
                        </h2>
                        <p>Transformar espacios en hogares seguros y acogedores mediante muebles y sistemas de cerrajería de la más alta calidad, diseñados y fabricados con pasión artesanal.</p>
                        <p>Nos comprometemos con cada cliente, ofreciendo soluciones personalizadas que combinan funcionalidad, estética y seguridad.</p>
                    </div>
                </div>
            </div>

            <div class="valores-section">
                <h2 class="section-title text-center">🏆 Nuestros Valores</h2>
                <div class="grid grid-4">
                    <div class="valor-card">
                        <div class="valor-icon">🤝</div>
                        <h3>Confianza</h3>
                        <p>Relaciones duraderas basadas en honestidad</p>
                    </div>
                    <div class="valor-card">
                        <div class="valor-icon">💎</div>
                        <h3>Calidad</h3>
                        <p>Materiales premium y acabados impecables</p>
                    </div>
                    <div class="valor-card">
                        <div class="valor-icon">🎨</div>
                        <h3>Artesanía</h3>
                        <p>Técnicas tradicionales con toque moderno</p>
                    </div>
                    <div class="valor-card">
                        <div class="valor-icon">⚡</div>
                        <h3>Compromiso</h3>
                        <p>Cumplimos lo que prometemos</p>
                    </div>
                </div>
            </div>

            <div class="card ubicacion-card">
                <div class="card-body">
                    <h2 class="card-title">
                        <i data-lucide="map-pin"></i>
                        Nuestra Ubicación
                    </h2>
                    <p><strong>Matriz:</strong> Sector Guamaní, Quito - Ecuador</p>
                    <p>Nuestro taller está estratégicamente ubicado para atender a toda la ciudad de Quito y sus alrededores. Contamos con instalaciones equipadas para proyectos de cualquier escala.</p>
                    <a href="${contactInfo.mapa}" target="_blank" class="btn btn-primary mt-2">
                        <i data-lucide="map-pin"></i>
                        Ver en Google Maps
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Página de Catálogo
function renderCatalogo(tipo) {
    let productosActuales = [];
    let titulo = '';
    let descripcion = '';
    
    if (tipo === 'muebleria-interior') {
        productosActuales = productos.muebleriaInterior;
        titulo = 'Mueblería Interior';
        descripcion = 'Puertas, cocinas, baños y más para el interior de tu hogar';
    } else if (tipo === 'muebleria-exterior') {
        productosActuales = productos.muebleriaExterior;
        titulo = 'Mueblería Exterior';
        descripcion = 'Puertas principales y portones de madera premium';
    } else if (tipo === 'cerrajeria') {
        productosActuales = productos.cerrajeriaExterior;
        titulo = 'Cerrajería Exterior';
        descripcion = 'Seguridad completa para tu hogar';
    }

    return `
        <div class="fade-in">
            <div class="page-header text-center">
                <h1>${titulo}</h1>
                <p>${descripcion}</p>
            </div>

            <div class="grid grid-3">
                ${productosActuales.map(p => createProductCard(p)).join('')}
            </div>
        </div>
    `;
}

// Página de Perfil
function renderPerfil() {
    const user = getUser();
    
    if (!user) {
        return `
            <div class="fade-in container-small">
                <div class="page-header text-center">
                    <i data-lucide="user" class="page-icon"></i>
                    <h1>Únete a Benjamín</h1>
                    <p>Regístrate y comienza a ganar insignias y beneficios exclusivos</p>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h2 class="mb-3">Crear Cuenta</h2>
                        <div id="registerForm">
                            <div class="form-group">
                                <label class="form-label">Nombre Completo *</label>
                                <input type="text" id="regNombre" class="form-input" placeholder="Juan Pérez" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email *</label>
                                <input type="email" id="regEmail" class="form-input" placeholder="correo@ejemplo.com" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Teléfono *</label>
                                <input type="tel" id="regTelefono" class="form-input" placeholder="0999999999" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Dirección</label>
                                <input type="text" id="regDireccion" class="form-input" placeholder="Calle Principal y Secundaria">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Ciudad</label>
                                <input type="text" id="regCiudad" class="form-input" placeholder="Quito" value="Quito">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Referencia</label>
                                <input type="text" id="regReferencia" class="form-input" placeholder="Frente al parque">
                            </div>
                            <button onclick="handleRegister()" class="btn btn-primary w-full">
                                Registrarme Ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    const insigniaActual = calcularInsigniaActual();
    const descuento = getDescuentoActual();
    const pedidos = getUserPedidos();

    return `
        <div class="fade-in">
            <div class="perfil-header">
                <div>
                    <h1>¡Hola, ${user.nombre}! 👋</h1>
                    <p>${user.email}</p>
                    <p class="perfil-date">Miembro desde ${formatDate(user.fechaRegistro || new Date().toISOString())}</p>
                </div>
                <div class="perfil-insignia-icon">${insigniaActual?.icono || '🟤'}</div>
            </div>

            <div class="grid grid-2 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">
                            <i data-lucide="award"></i>
                            Tu Insignia Actual
                        </h2>
                        ${insigniaActual ? `
                            <div class="insignia-actual">
                                <div class="insignia-icon-large">${insigniaActual.icono}</div>
                                <h3>${insigniaActual.nombre}</h3>
                                <div class="insignia-nivel">${insigniaActual.nivel}</div>
                                ${descuento > 0 ? `<div class="descuento-badge">🎉 ${descuento}% de descuento activo</div>` : ''}
                                <div class="beneficios-list">
                                    <strong>Beneficios:</strong>
                                    ${insigniaActual.beneficios.map(b => `
                                        <div class="beneficio-item">
                                            <i data-lucide="check-circle"></i>
                                            <span>${b}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">
                            <i data-lucide="trending-up"></i>
                            Estadísticas
                        </h2>
                        <div class="estadisticas">
                            <div class="estadistica-item">
                                <span>Compras Realizadas:</span>
                                <strong>${user.compras || 0}</strong>
                            </div>
                            <div class="estadistica-item">
                                <span>Descuento Activo:</span>
                                <strong class="text-success">${descuento}%</strong>
                            </div>
                            <div class="estadistica-item">
                                <span>Pedidos Activos:</span>
                                <strong>${pedidos.length}</strong>
                            </div>
                        </div>
                        <button onclick="logout()" class="btn btn-secondary w-full mt-3">
                            <i data-lucide="log-out"></i>
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">🏅 Sistema de Insignias Completo</h2>
                    
                    <h3 class="insignias-subtitle">Nivel Simple</h3>
                    <div class="grid grid-3 mb-3">
                        ${insignias.filter(i => i.nivel === 'Simple').map(ins => 
                            createInsigniaCard(ins, (user.compras || 0) >= (ins.comprasMin || 0))
                        ).join('')}
                    </div>

                    <h3 class="insignias-subtitle">Nivel Premium</h3>
                    <div class="grid grid-4 mb-3">
                        ${insignias.filter(i => i.nivel === 'Premium').map(ins => 
                            createInsigniaCard(ins, (user.compras || 0) >= (ins.comprasMin || 0))
                        ).join('')}
                    </div>

                    <h3 class="insignias-subtitle">Nivel Elite</h3>
                    <div class="grid grid-3">
                        ${insignias.filter(i => i.nivel === 'Elite').map(ins => 
                            createInsigniaCard(ins, false)
                        ).join('')}
                    </div>

                    <div class="maestro-benjamin">
                        <div class="maestro-icon">👑</div>
                        <h3>Maestro Benjamín</h3>
                        <p>Título honorífico único - Máxima distinción como cliente ejemplar</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Página de Carrito
function renderCarrito() {
    const cart = getCart();
    const descuento = getDescuentoActual();
    const subtotal = cart.reduce((sum, item) => sum + item.precioTotal, 0);
    const totalConDescuento = subtotal * (1 - descuento / 100);
    const cantidadPuertas = cart.filter(item => item.nombre.toLowerCase().includes('puerta')).reduce((sum, item) => sum + item.config.cantidad, 0);

    if (cart.length === 0) {
        return `
            <div class="fade-in">
                <div class="empty-cart">
                    <i data-lucide="shopping-cart" class="empty-icon"></i>
                    <h2>Tu carrito está vacío</h2>
                    <p>Explora nuestro catálogo y encuentra productos increíbles</p>
                    <button onclick="navigateTo('catalogo-muebleria-interior')" class="btn btn-primary">
                        Explorar Catálogo
                    </button>
                </div>
            </div>
        `;
    }

    return `
        <div class="fade-in">
            <div class="page-header text-center">
                <h1>Tu Carrito de Cotización</h1>
                <p>Precio aproximado - Confirmación final por WhatsApp</p>
            </div>

            <div class="cart-items">
                ${cart.map(item => createCartItem(item)).join('')}
            </div>

            ${cantidadPuertas >= 5 ? `
                <div class="alert alert-success">
                    <i data-lucide="sparkles"></i>
                    <div>
                        <strong>¡Descuento Especial por Volumen!</strong>
                        <p>Tienes ${cantidadPuertas} puertas. Aplica descuento adicional (confirmación por WhatsApp)</p>
                    </div>
                </div>
            ` : ''}

            <div class="cart-summary">
                <h3>Resumen de Cotización</h3>
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                ${descuento > 0 ? `
                    <div class="summary-row text-success">
                        <span>Descuento por Insignia (${descuento}%):</span>
                        <span>-$${(subtotal - totalConDescuento).toFixed(2)}</span>
                    </div>
                ` : ''}
                <div class="summary-total">
                    <span>TOTAL APROXIMADO:</span>
                    <span>$${totalConDescuento.toFixed(2)}</span>
                </div>
                <div class="alert alert-warning">
                    <i data-lucide="alert-circle"></i>
                    <p>Precio final se confirma por WhatsApp según especificaciones exactas y condiciones del proyecto.</p>
                </div>
                <button onclick="generateWhatsAppMessage()" class="btn btn-success w-full btn-large">
                    <i data-lucide="message-circle"></i>
                    Realizar Pedido por WhatsApp
                </button>
            </div>
        </div>
    `;
}

// Página de Testimonios
function renderTestimonios() {
    return `
        <div class="fade-in">
            <div class="page-header text-center">
                <i data-lucide="star" class="page-icon"></i>
                <h1>Lo Que Dicen Nuestros Clientes</h1>
                <p>Testimonios reales de personas que confiaron en nosotros</p>
            </div>

            <div class="grid grid-3">
                ${testimonios.map(t => createTestimonialCard(t)).join('')}
            </div>
        </div>
    `;
}

// Página de Galería
function renderGaleria() {
    return `
        <div class="fade-in">
            <div class="page-header text-center">
                <i data-lucide="image" class="page-icon"></i>
                <h1>Galería de Proyectos</h1>
                <p>Conoce algunos de nuestros trabajos realizados</p>
            </div>

            <div class="grid grid-3">
                ${proyectos.map(p => createProjectCard(p)).join('')}
            </div>
        </div>
    `;
}

// Página de Blog
function renderBlog() {
    return `
        <div class="fade-in">
            <div class="page-header text-center">
                <i data-lucide="book-open" class="page-icon"></i>
                <h1>Blog y Guías</h1>
                <p>Consejos, tendencias y guías para el cuidado de tus muebles</p>
            </div>

            <div class="grid grid-3">
                ${articulos.map(a => createArticleCard(a)).join('')}
            </div>
        </div>
    `;
}

// Página de Contacto
function renderContacto() {
    return `
        <div class="fade-in container-small">
            <div class="page-header text-center">
                <i data-lucide="phone" class="page-icon"></i>
                <h1>Contáctanos</h1>
                <p>Estamos aquí para ayudarte</p>
            </div>

            <div class="grid grid-2">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">
                            <i data-lucide="mail"></i>
                            Información de Contacto
                        </h2>
                        <div class="contacto-info">
                            <div class="contacto-item">
                                <i data-lucide="phone"></i>
                                <div>
                                    <strong>Teléfono / WhatsApp</strong>
                                    <p>+593 98 599 8615</p>
                                    <a href="https://wa.me/${contactInfo.whatsapp}" target="_blank" class="btn btn-success mt-1">
                                        <i data-lucide="message-circle"></i>
                                        Chatear por WhatsApp
                                    </a>
                                </div>
                            </div>
                            <div class="contacto-item">
                                <i data-lucide="mail"></i>
                                <div>
                                    <strong>Email</strong>
                                    <p>${contactInfo.email}</p>
                                </div>
                            </div>
                            <div class="contacto-item">
                                <i data-lucide="map-pin"></i>
                                <div>
                                    <strong>Dirección</strong>
                                    <p>${contactInfo.direccion}</p>
                                    <a href="${contactInfo.mapa}" target="_blank" class="btn btn-secondary mt-1">
                                        <i data-lucide="map-pin"></i>
                                        Ver en Google Maps
                                    </a>
                                </div>
                            </div>
                            <div class="contacto-item">
                                <i data-lucide="clock"></i>
                                <div>
                                    <strong>Horario de Atención</strong>
                                    <p style="white-space: pre-line;">${contactInfo.horario}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title">
                            <i data-lucide="send"></i>
                            Envíanos un Mensaje
                        </h2>
                        <div id="contactForm">
                            <div class="form-group">
                                <label class="form-label">Nombre *</label>
                                <input type="text" id="contactNombre" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email *</label>
                                <input type="email" id="contactEmail" class="form-input" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Teléfono</label>
                                <input type="tel" id="contactTelefono" class="form-input">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Mensaje *</label>
                                <textarea id="contactMensaje" class="form-textarea" rows="5" required></textarea>
                            </div>
                            <button onclick="handleContactSubmit()" class="btn btn-primary w-full">
                                <i data-lucide="send"></i>
                                Enviar Mensaje
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Página de Consulta de Notas (Pública - Por Cédula)
function renderConsultaNotas() {
    return `
        <div class="fade-in container-small">
            <div class="page-header text-center">
                <i data-lucide="file-text" class="page-icon"></i>
                <h1>Consultar Mis Notas de Venta</h1>
                <p>Ingresa tu número de cédula para ver tus documentos</p>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="form-group">
                        <label class="form-label">Número de Cédula *</label>
                        <input 
                            type="text" 
                            id="consultaCedula" 
                            class="form-input" 
                            placeholder="1234567890"
                            maxlength="10"
                        >
                    </div>
                    <button onclick="buscarNotasCliente()" class="btn btn-primary w-full">
                        <i data-lucide="search"></i>
                        Buscar Mis Notas
                    </button>
                </div>
            </div>

            <div id="resultadosBusqueda" class="mt-4"></div>
        </div>
    `;
}

// Buscar notas del cliente
function buscarNotasCliente() {
    const cedula = document.getElementById('consultaCedula').value.trim();
    
    if (!cedula || cedula.length !== 10) {
        showNotification('Ingresa una cédula válida de 10 dígitos', 'error');
        return;
    }
    
    const notasCliente = buscarNotaPorCedula(cedula);
    const resultadosDiv = document.getElementById('resultadosBusqueda');
    
    if (notasCliente.length === 0) {
        resultadosDiv.innerHTML = `
            <div class="alert alert-warning">
                <i data-lucide="alert-circle"></i>
                <p>No se encontraron notas de venta para esta cédula.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }
    
    resultadosDiv.innerHTML = `
        <h3 class="mb-3">Notas de Venta Encontradas (${notasCliente.length})</h3>
        <div class="grid grid-2">
            ${notasCliente.map(nota => `
                <div class="card">
                    <div class="card-body">
                        <div class="nota-header">
                            <h4>Nota ${nota.numeroNota}</h4>
                            <span class="nota-estado ${nota.estado}">${estadosNota[nota.estado].nombre}</span>
                        </div>
                        <p class="nota-fecha"><strong>Fecha:</strong> ${nota.fechaEmision}</p>
                        <p class="nota-total"><strong>Total:</strong> ${nota.total.toFixed(2)}</p>
                        <div class="nota-items">
                            <strong>Detalle:</strong>
                            <ul>
                                ${nota.items.map(item => `<li>${item.cantidad}x ${item.descripcion}</li>`).join('')}
                            </ul>
                        </div>
                        <button onclick="verDetalleNota(${nota.id})" class="btn btn-secondary w-full mt-2">
                            <i data-lucide="eye"></i>
                            Ver Detalle
                        </button>
                        <button onclick="descargarNotaPDF(${nota.id})" class="btn btn-primary w-full mt-2">
                            <i data-lucide="download"></i>
                            Descargar PDF
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    lucide.createIcons();
}

// Ver detalle de nota
function verDetalleNota(notaId) {
    const notas = getNotasVenta();
    const nota = notas.find(n => n.id === notaId);
    
    if (!nota) {
        showNotification('Nota no encontrada', 'error');
        return;
    }
    
    generarPDFNotaVenta(nota);
}

// Descargar nota como PDF
function descargarNotaPDF(notaId) {
    const notas = getNotasVenta();
    const nota = notas.find(n => n.id === notaId);
    
    if (!nota) {
        showNotification('Nota no encontrada', 'error');
        return;
    }
    
    generarPDFNotaVenta(nota);
    showNotification('Abriendo nota en nueva ventana para descargar', 'success');
}

// Página de Login Administrador
function renderAdminLogin() {
    if (isAdminAuthenticated()) {
        navigateTo('admin-panel');
        return '';
    }
    
    return `
        <div class="fade-in container-small">
            <div class="admin-login-container">
                <div class="admin-login-header">
                    <i data-lucide="lock" class="admin-icon"></i>
                    <h1>Panel de Administración</h1>
                    <p>Acceso restringido solo para el propietario</p>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label">Usuario</label>
                            <input 
                                type="text" 
                                id="adminUsername" 
                                class="form-input" 
                                placeholder="Ingresa tu usuario"
                            >
                        </div>
                        <div class="form-group">
                            <label class="form-label">Contraseña</label>
                            <input 
                                type="password" 
                                id="adminPassword" 
                                class="form-input" 
                                placeholder="Ingresa tu contraseña"
                            >
                        </div>
                        <button onclick="handleAdminLogin()" class="btn btn-primary w-full">
                            <i data-lucide="log-in"></i>
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Manejar login de administrador
function handleAdminLogin() {
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value.trim();
    
    if (adminLogin(username, password)) {
        showNotification('Bienvenido al panel de administración', 'success');
        navigateTo('admin-panel');
    } else {
        showNotification('Usuario o contraseña incorrectos', 'error');
    }
}

// Panel de Administración Principal
function renderAdminPanel() {
    if (!isAdminAuthenticated()) {
        navigateTo('admin-login');
        return '';
    }
    
    const stats = obtenerEstadisticasPanel();
    const ingresosAnuales = calcularIngresosAnuales();
    
    return `
        <div class="fade-in">
            <div class="admin-header">
                <div>
                    <h1>Panel de Administración</h1>
                    <p>Gestión de Notas de Venta - RIMPE Negocio Popular</p>
                </div>
                <button onclick="adminLogout()" class="btn btn-secondary">
                    <i data-lucide="log-out"></i>
                    Cerrar Sesión
                </button>
            </div>

            <!-- Alerta RIMPE -->
            ${stats.enRiesgo ? `
                <div class="alert alert-warning mb-4">
                    <i data-lucide="alert-triangle"></i>
                    <div>
                        <strong>⚠️ ALERTA: Cerca del límite RIMPE</strong>
                        <p>Has alcanzado el ${stats.porcentajeRIMPE.toFixed(1)}% del límite anual (${infoNegocio.limiteAnual})</p>
                    </div>
                </div>
            ` : ''}

            <!-- Estadísticas Principales -->
            <div class="grid grid-4 mb-4">
                <div class="stat-card stat-primary">
                    <i data-lucide="dollar-sign"></i>
                    <div>
                        <h3>${stats.totalIngresos.toFixed(2)}</h3>
                        <p>Ingresos Anuales</p>
                        <small>${stats.porcentajeRIMPE.toFixed(1)}% del límite RIMPE</small>
                    </div>
                </div>
                <div class="stat-card stat-success">
                    <i data-lucide="trending-up"></i>
                    <div>
                        <h3>${stats.ingresosMes.toFixed(2)}</h3>
                        <p>Ingresos del Mes</p>
                    </div>
                </div>
                <div class="stat-card stat-info">
                    <i data-lucide="file-text"></i>
                    <div>
                        <h3>${stats.totalNotas}</h3>
                        <p>Notas Emitidas</p>
                    </div>
                </div>
                <div class="stat-card stat-warning">
                    <i data-lucide="clock"></i>
                    <div>
                        <h3>${stats.notasPendientes}</h3>
                        <p>Pagos Pendientes</p>
                    </div>
                </div>
            </div>

            <!-- Menú de Acciones -->
            <div class="grid grid-3 mb-4">
                <div class="action-card" onclick="navigateTo('admin-nueva-nota')">
                    <i data-lucide="plus-circle"></i>
                    <h3>Nueva Nota de Venta</h3>
                    <p>Generar nota RIMPE para un cliente</p>
                </div>
                <div class="action-card" onclick="navigateTo('admin-historial')">
                    <i data-lucide="list"></i>
                    <h3>Ver Historial</h3>
                    <p>Todas las notas emitidas</p>
                </div>
                <div class="action-card" onclick="navigateTo('admin-estadisticas')">
                    <i data-lucide="bar-chart"></i>
                    <h3>Estadísticas</h3>
                    <p>Reportes e ingresos mensuales</p>
                </div>
            </div>

            <!-- Gráfico de Progreso RIMPE -->
            <div class="card">
                <div class="card-body">
                    <h3 class="mb-3">Progreso RIMPE ${new Date().getFullYear()}</h3>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(stats.porcentajeRIMPE, 100)}%"></div>
                    </div>
                    <p class="text-center mt-2">
                        ${stats.totalIngresos.toFixed(2)} de ${infoNegocio.limiteAnual} 
                        (${stats.porcentajeRIMPE.toFixed(1)}%)
                    </p>
                    <p class="text-center">
                        Margen disponible: ${ingresosAnuales.margenDisponible.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Página para crear nueva nota de venta
function renderNuevaNota() {
    if (!isAdminAuthenticated()) {
        navigateTo('admin-login');
        return '';
    }
    
    return `
        <div class="fade-in container-small">
            <div class="page-header">
                <h1>Nueva Nota de Venta</h1>
                <p>Genera una nota RIMPE para tu cliente</p>
            </div>

            <div class="card">
                <div class="card-body">
                    <h3 class="mb-3">Datos del Cliente</h3>
                    <div class="grid grid-2">
                        <div class="form-group">
                            <label class="form-label">Nombre Completo *</label>
                            <input type="text" id="clienteNombre" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Cédula/RUC *</label>
                            <input type="text" id="clienteCedula" class="form-input" maxlength="13" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Teléfono</label>
                            <input type="tel" id="clienteTelefono" class="form-input">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" id="clienteEmail" class="form-input">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Dirección</label>
                        <input type="text" id="clienteDireccion" class="form-input">
                    </div>

                    <hr class="my-4">

                    <h3 class="mb-3">Detalle del Trabajo</h3>
                    <div id="itemsContainer">
                        <div class="item-row" data-item="1">
                            <div class="grid grid-4">
                                <div class="form-group">
                                    <label class="form-label">Cantidad *</label>
                                    <input type="number" class="form-input item-cantidad" min="1" value="1" required>
                                </div>
                                <div class="form-group" style="grid-column: span 2">
                                    <label class="form-label">Descripción *</label>
                                    <input type="text" class="form-input item-descripcion" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Precio Unitario *</label>
                                    <input type="number" class="form-input item-precio" min="0" step="0.01" required>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onclick="agregarItemNota()" class="btn btn-secondary mb-3">
                        <i data-lucide="plus"></i>
                        Agregar Otro Item
                    </button>

                    <div class="form-group">
                        <label class="form-label">Descuento (opcional)</label>
                        <input type="number" id="descuento" class="form-input" min="0" step="0.01" value="0">
                    </div>

                    <div class="form-group">
                        <label class="form-label">Observaciones</label>
                        <textarea id="observaciones" class="form-textarea" rows="3"></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Estado de Pago</label>
                        <select id="estadoPago" class="form-select">
                            <option value="pendiente">Pendiente de Pago</option>
                            <option value="pagada">Pagada</option>
                            <option value="parcial">Pago Parcial</option>
                        </select>
                    </div>

                    <div class="nota-preview mt-4 p-4 bg-gray-50 rounded">
                        <h4>Vista Previa del Total</h4>
                        <p id="previewSubtotal">Subtotal: $0.00</p>
                        <p id="previewDescuento">Descuento: $0.00</p>
                        <p id="previewTotal" class="text-xl font-bold">TOTAL: $0.00</p>
                    </div>

                    <button onclick="generarNota()" class="btn btn-primary w-full mt-4">
                        <i data-lucide="file-text"></i>
                        Generar Nota de Venta
                    </button>
                </div>
            </div>
        </div>
    `;
}

let itemCounter = 1;

function agregarItemNota() {
    itemCounter++;
    const container = document.getElementById('itemsContainer');
    const newItem = document.createElement('div');
    newItem.className = 'item-row';
    newItem.setAttribute('data-item', itemCounter);
    newItem.innerHTML = `
        <div class="grid grid-4">
            <div class="form-group">
                <label class="form-label">Cantidad *</label>
                <input type="number" class="form-input item-cantidad" min="1" value="1" required>
            </div>
            <div class="form-group" style="grid-column: span 2">
                <label class="form-label">Descripción *</label>
                <input type="text" class="form-input item-descripcion" required>
            </div>
            <div class="form-group">
                <label class="form-label">Precio Unitario *</label>
                <input type="number" class="form-input item-precio" min="0" step="0.01" required>
            </div>
        </div>
        <button onclick="this.parentElement.remove()" class="btn btn-remove mb-3">
            <i data-lucide="trash-2"></i>
            Eliminar Item
        </button>
    `;
    container.appendChild(newItem);
    lucide.createIcons();
}

function generarNota() {
    // Validar datos del cliente
    const clienteNombre = document.getElementById('clienteNombre').value.trim();
    const clienteCedula = document.getElementById('clienteCedula').value.trim();
    
    if (!clienteNombre || !clienteCedula) {
        showNotification('Complete los datos obligatorios del cliente', 'error');
        return;
    }
    
    // Recolectar items
    const itemRows = document.querySelectorAll('.item-row');
    const items = [];
    let subtotal = 0;
    
    itemRows.forEach(row => {
        const cantidad = parseFloat(row.querySelector('.item-cantidad').value) || 0;
        const descripcion = row.querySelector('.item-descripcion').value.trim();
        const precioUnitario = parseFloat(row.querySelector('.item-precio').value) || 0;
        
        if (cantidad > 0 && descripcion && precioUnitario > 0) {
            const total = cantidad * precioUnitario;
            items.push({
                cantidad,
                descripcion,
                precioUnitario,
                total
            });
            subtotal += total;
        }
    });
    
    if (items.length === 0) {
        showNotification('Agregue al menos un item al detalle', 'error');
        return;
    }
    
    const descuento = parseFloat(document.getElementById('descuento').value) || 0;
    const total = subtotal - descuento;
    
    // Crear nota
    const notaData = {
        cliente: {
            nombre: clienteNombre,
            cedula: clienteCedula,
            telefono: document.getElementById('clienteTelefono').value.trim(),
            email: document.getElementById('clienteEmail').value.trim(),
            direccion: document.getElementById('clienteDireccion').value.trim()
        },
        items,
        subtotal,
        descuento,
        total,
        estado: document.getElementById('estadoPago').value,
        observaciones: document.getElementById('observaciones').value.trim(),
        montoPagado: document.getElementById('estadoPago').value === 'pagada' ? total : 0
    };
    
    const nota = saveNotaVenta(notaData);
    showNotification('Nota de venta generada exitosamente', 'success');
    
    // Generar PDF automáticamente
    setTimeout(() => {
        generarPDFNotaVenta(nota);
        navigateTo('admin-panel');
    }, 500);
}

// Historial de Notas
function renderAdminHistorial() {
    if (!isAdminAuthenticated()) {
        navigateTo('admin-login');
        return '';
    }
    
    const notas = getNotasVenta().reverse(); // Más recientes primero
    
    return `
        <div class="fade-in">
            <div class="page-header">
                <h1>Historial de Notas de Venta</h1>
                <p>Total de notas emitidas: ${notas.length}</p>
            </div>

            ${notas.length === 0 ? `
                <div class="alert alert-warning">
                    <i data-lucide="alert-circle"></i>
                    <p>No hay notas de venta registradas aún.</p>
                </div>
            ` : `
                <div class="table-responsive">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>No. Nota</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Cédula</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${notas.map(nota => `
                                <tr>
                                    <td><strong>${nota.numeroNota}</strong></td>
                                    <td>${nota.fechaEmision}</td>
                                    <td>${nota.cliente.nombre}</td>
                                    <td>${nota.cliente.cedula}</td>
                                    <td class="text-success"><strong>${nota.total.toFixed(2)}</strong></td>
                                    <td>
                                        <span class="badge badge-${nota.estado}">
                                            ${estadosNota[nota.estado].nombre}
                                        </span>
                                    </td>
                                    <td>
                                        <button onclick="descargarNotaPDF(${nota.id})" class="btn-icon" title="Descargar PDF">
                                            <i data-lucide="download"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `}
        </div>
    `;
}
    const nombre = document.getElementById('regNombre').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const telefono = document.getElementById('regTelefono').value.trim();
    const direccion = document.getElementById('regDireccion').value.trim();
    const ciudad = document.getElementById('regCiudad').value.trim();
    const referencia = document.getElementById('regReferencia').value.trim();

    if (!nombre || !email || !telefono) {
        showNotification('Por favor completa todos los campos obligatorios', 'error');
        return;
    }

    const userData = {
        nombre,
        email,
        telefono,
        direccion,
        ciudad,
        referencia,
        compras: 0,
        fechaRegistro: new Date().toISOString(),
        pedidos: []
    };

    saveUser(userData);
    showNotification('¡Registro exitoso! Bienvenido a Benjamín', 'success');
    navigateTo('perfil');
}

function handleContactSubmit() {
    const nombre = document.getElementById('contactNombre').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const telefono = document.getElementById('contactTelefono').value.trim();
    const mensaje = document.getElementById('contactMensaje').value.trim();

    if (!nombre || !email || !mensaje) {
        showNotification('Por favor completa todos los campos obligatorios', 'error');
        return;
    }

    const whatsappMsg = `Hola, mi nombre es ${nombre}.\nEmail: ${email}\n${telefono ? `Teléfono: ${telefono}\n` : ''}\n\nMensaje:\n${mensaje}`;
    const encoded = encodeURIComponent(whatsappMsg);
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encoded}`, '_blank');
    
    showNotification('Redirigiendo a WhatsApp...', 'success');
    
    // Limpiar formulario
    document.getElementById('contactNombre').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactTelefono').value = '';
    document.getElementById('contactMensaje').value = '';
}