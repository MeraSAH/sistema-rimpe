// ========================================
// COMPONENTES DE UI — v2.0
// ========================================

// ─── Imagen de producto (URL o emoji fallback) ────────────────────────────────
function renderProductImg(producto, size = '100%') {
    if (producto.imagenUrl && producto.imagenUrl.trim()) {
        return `<img src="${producto.imagenUrl}" alt="${producto.nombre}"
            style="width:${size};height:180px;object-fit:cover;border-radius:10px 10px 0 0;display:block"
            onerror="this.style.display='none';this.nextSibling.style.display='flex'">
            <div style="display:none;font-size:3.5rem;height:180px;align-items:center;
                justify-content:center;background:var(--color-gray-100);
                border-radius:10px 10px 0 0">${producto.imagen || '📦'}</div>`;
    }
    return `<div style="font-size:3.5rem;height:180px;display:flex;align-items:center;
        justify-content:center;background:linear-gradient(135deg,#fef3c7,#fde68a);
        border-radius:10px 10px 0 0">${producto.imagen || '📦'}</div>`;
}

// ─── Chip de color con código ─────────────────────────────────────────────────
function renderColorChip(codigo) {
    const info = (typeof codigosColor !== 'undefined' && codigosColor[codigo])
        ? codigosColor[codigo]
        : { nombre: codigo, hex: '#d1d5db' };
    return `<span title="${codigo}: ${info.nombre}"
        style="display:inline-flex;align-items:center;gap:4px;
               background:var(--color-gray-100);border:1px solid var(--color-gray-200);
               border-radius:20px;padding:2px 8px;font-size:.7rem;font-weight:700;
               color:var(--color-gray-700);cursor:default">
        <span style="width:10px;height:10px;border-radius:50%;background:${info.hex};
            border:1px solid rgba(0,0,0,.15);flex-shrink:0"></span>
        ${codigo}
    </span>`;
}

// ─── Tarjeta de producto ──────────────────────────────────────────────────────
function createProductCard(producto) {
    const colores = (producto.colores || []);
    return `
    <div class="card product-card" style="overflow:hidden">
        ${renderProductImg(producto)}
        <div class="card-body">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem;margin-bottom:.5rem">
                <div>
                    <h3 style="font-size:1rem;margin:0 0 2px">${producto.nombre}</h3>
                    <span style="font-size:.7rem;color:var(--color-gray-500);font-weight:700;
                        letter-spacing:.5px">${producto.codigo || ''}</span>
                </div>
                <span style="font-size:.7rem;background:var(--color-primary);color:#fff;
                    padding:2px 8px;border-radius:20px;white-space:nowrap;flex-shrink:0">
                    ${producto.categoria}</span>
            </div>

            <div class="product-price">
                $<span id="price-${producto.id}">${producto.precio}</span>
                <span class="price-label">desde</span>
            </div>

            <!-- Colores con chips de código -->
            <div class="form-group">
                <label class="form-label">Color <small style="color:var(--color-gray-400)">(código)</small></label>
                <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:4px" id="colorChips-${producto.id}">
                    ${colores.map(c => renderColorChip(c)).join('')}
                </div>
                <select id="color-${producto.id}" class="form-select" style="font-size:.8rem">
                    ${colores.map(c => {
                        const info = (typeof codigosColor !== 'undefined' && codigosColor[c])
                            ? codigosColor[c] : { nombre: c };
                        return `<option value="${c}">${c} — ${info.nombre}</option>`;
                    }).join('')}
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Acabado:</label>
                <select id="acabado-${producto.id}" class="form-select">
                    ${(producto.acabados || []).map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Material:</label>
                <select id="material-${producto.id}" class="form-select">
                    ${(producto.materiales || []).map(m => `<option value="${m}">${m}</option>`).join('')}
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Cantidad:</label>
                <input type="number" id="cantidad-${producto.id}" class="form-input"
                    value="1" min="1" onchange="updateProductPrice(${producto.id})">
            </div>

            <div class="form-group">
                <label class="form-label">Tipo de Entrega:</label>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="radio" name="entrega-${producto.id}" value="terminada"
                            checked onchange="updateProductPrice(${producto.id})">
                        <div class="radio-content">
                            <strong>Terminada</strong>
                            <small>Incluye instalación + toma medidas</small>
                        </div>
                    </label>
                    <label class="radio-option">
                        <input type="radio" name="entrega-${producto.id}" value="rustica"
                            onchange="updateProductPrice(${producto.id})">
                        <div class="radio-content">
                            <strong>Rústica (-15%)</strong>
                            <small>Retiro en taller, sin instalación</small>
                        </div>
                    </label>
                </div>
            </div>

            <div class="flex gap-2 mt-2">
                <button onclick="addProductToCart(${producto.id})" class="btn btn-primary" style="flex:1">
                    <i data-lucide="shopping-cart"></i> Al Carrito
                </button>
                <button onclick="cotizarProducto(${producto.id})" class="btn btn-secondary">
                    <i data-lucide="message-circle"></i>
                </button>
            </div>
        </div>
    </div>`;
}

// Actualizar precio del producto en tiempo real
function updateProductPrice(productoId) {
    const all = (typeof getProductosCatalogo === 'function')
        ? Object.values(getProductosCatalogo()).flat()
        : Object.values(productos).flat();
    const producto = all.find(p => p.id == productoId);
    if (!producto) return;
    const cantidad    = parseInt(document.getElementById(`cantidad-${productoId}`)?.value) || 1;
    const tipoEntrega = document.querySelector(`input[name="entrega-${productoId}"]:checked`)?.value || 'terminada';
    let precio = producto.precio * cantidad;
    if (tipoEntrega === 'rustica') precio *= 0.85;
    const el = document.getElementById(`price-${productoId}`);
    if (el) el.textContent = precio.toFixed(2);
}

// Buscar producto por ID
function findProductById(id) {
    const all = (typeof getProductosCatalogo === 'function')
        ? Object.values(getProductosCatalogo()).flat()
        : Object.values(productos).flat();
    return all.find(p => p.id == id) || null;
}

// Agregar producto al carrito
function addProductToCart(productoId) {
    const producto = findProductById(productoId);
    if (!producto) return;
    const cantidad    = parseInt(document.getElementById(`cantidad-${productoId}`)?.value) || 1;
    const color       = document.getElementById(`color-${productoId}`)?.value;
    const acabado     = document.getElementById(`acabado-${productoId}`)?.value;
    const material    = document.getElementById(`material-${productoId}`)?.value;
    const tipoEntrega = document.querySelector(`input[name="entrega-${productoId}"]:checked`)?.value || 'terminada';
    let precioTotal = producto.precio * cantidad;
    if (tipoEntrega === 'rustica') precioTotal *= 0.85;
    const colorNombre = (typeof codigosColor !== 'undefined' && codigosColor[color])
        ? `${color} — ${codigosColor[color].nombre}` : color;
    addToCart({ ...producto, config: { cantidad, color, colorNombre, acabado, material, tipoEntrega },
        precioTotal: parseFloat(precioTotal.toFixed(2)) });
    setTimeout(() => lucide.createIcons(), 100);
}

// Cotizar por WhatsApp
function cotizarProducto(productoId) {
    const producto = findProductById(productoId);
    if (!producto) return;
    const color    = document.getElementById(`color-${productoId}`)?.value || '';
    const acabado  = document.getElementById(`acabado-${productoId}`)?.value || '';
    const material = document.getElementById(`material-${productoId}`)?.value || '';
    const cantidad = document.getElementById(`cantidad-${productoId}`)?.value || '1';
    const colorNombre = (typeof codigosColor !== 'undefined' && codigosColor[color])
        ? `${color} (${codigosColor[color].nombre})` : color;
    const msg = `Hola, me interesa cotizar:\n\n📦 *${producto.nombre}*\nModelo: ${producto.codigo||'—'}\nColor: ${colorNombre}\nAcabado: ${acabado}\nMaterial: ${material}\nCantidad: ${cantidad}\n\n¿Me pueden dar el precio?`;
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
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
                    <p class="testimonial-project">${testimonio.proyecto}</p>
                </div>
            </div>
            <div class="testimonial-stars">${stars}</div>
            <p class="testimonial-text">"${testimonio.texto}"</p>
            <p class="testimonial-date">${formatDate(testimonio.fecha)}</p>
        </div>
    </div>`;
}

// Crear tarjeta de proyecto (galería)
function createProjectCard(proyecto) {
    return `
    <div class="card project-card" style="overflow:hidden">
        ${proyecto.imagenUrl
            ? `<img src="${proyecto.imagenUrl}" alt="${proyecto.titulo}"
                style="width:100%;height:200px;object-fit:cover"
                onerror="this.style.display='none'">`
            : `<div style="height:200px;display:flex;align-items:center;justify-content:center;
                font-size:4rem;background:linear-gradient(135deg,#1e293b,#334155)">
                ${proyecto.imagen}</div>`
        }
        <div class="card-body">
            <span style="font-size:.75rem;background:var(--color-primary);color:#fff;
                padding:2px 8px;border-radius:20px">${proyecto.categoria}</span>
            <h4 style="margin:.5rem 0 .25rem">${proyecto.titulo}</h4>
            <p style="font-size:.85rem;color:var(--color-gray-600);margin-bottom:.5rem">
                ${proyecto.descripcion?.substring(0,90)}...</p>
            <div style="display:flex;gap:1rem;font-size:.75rem;color:var(--color-gray-500)">
                <span>📐 ${proyecto.medidas || '—'}</span>
                <span>🔩 ${proyecto.material || '—'}</span>
            </div>
        </div>
    </div>`;
}

// Crear tarjeta de insignia
function createInsigniaCard(insignia, desbloqueada = false) {
    return `
    <div class="insignia-card ${desbloqueada ? 'desbloqueada' : 'bloqueada'}">
        <div class="insignia-emoji">${insignia.icono}</div>
        <h4>${insignia.nombre}</h4>
        <div class="insignia-nivel-badge">${insignia.nivel}</div>
        ${insignia.comprasMin > 0
            ? `<p style="font-size:.75rem;color:var(--color-gray-500)">${insignia.comprasMin} compras</p>` : ''}
        ${insignia.descuento > 0
            ? `<div class="descuento-mini">${insignia.descuento}% dto.</div>` : ''}
        ${!desbloqueada ? '<div class="lock-overlay"><i data-lucide="lock"></i></div>' : ''}
    </div>`;
}

// Crear tarjeta de artículo del blog
function createArticleCard(articulo) {
    return `
    <div class="card article-card">
        <div class="card-body">
            <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">
                <span style="font-size:2rem">${articulo.imagen}</span>
                <span style="font-size:.7rem;background:var(--color-primary);color:#fff;
                    padding:2px 8px;border-radius:20px">${articulo.categoria}</span>
            </div>
            <h4 style="margin-bottom:.5rem">${articulo.titulo}</h4>
            <p style="font-size:.85rem;color:var(--color-gray-600);margin-bottom:.75rem">
                ${articulo.resumen}</p>
            <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:.75rem;color:var(--color-gray-400)">
                    ${formatDate(articulo.fecha)}</span>
                <span style="font-size:.8rem;color:var(--color-primary);font-weight:700">
                    Leer más →</span>
            </div>
        </div>
    </div>`;
}

// Formatear fecha
function formatDate(dateString) {
    if (!dateString) return '';
    try {
        return new Date(dateString).toLocaleDateString('es-EC', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    } catch { return dateString; }
}

// ─── Menú móvil ──────────────────────────────────────────────────────────────
function toggleMobileMenu() {
    const navMobile  = document.getElementById('navMobile');
    const menuToggle = document.getElementById('menuToggle');
    if (!navMobile || !menuToggle) return;
    navMobile.classList.toggle('active');
    const isOpen = navMobile.classList.contains('active');
    const icon = menuToggle.querySelector('i') || menuToggle.querySelector('svg');
    if (icon) { icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu'); lucide.createIcons(); }
}

function closeMobileMenu() {
    const navMobile  = document.getElementById('navMobile');
    const menuToggle = document.getElementById('menuToggle');
    if (!navMobile || !menuToggle) return;
    navMobile.classList.remove('active');
    const icon = menuToggle.querySelector('i') || menuToggle.querySelector('svg');
    if (icon) { icon.setAttribute('data-lucide', 'menu'); lucide.createIcons(); }
}

// ─── Scroll header ────────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── Inicialización de eventos ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', (e) => {
        const navMobile = document.getElementById('navMobile');
        const menuToggle = document.getElementById('menuToggle');
        if (navMobile?.classList.contains('active') &&
            !navMobile.contains(e.target) &&
            !menuToggle?.contains(e.target)) closeMobileMenu();
    });
});