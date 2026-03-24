// ========================================
// RENDERIZADO DE PÁGINAS
// ========================================

// Página de Inicio
function renderInicio() {
    const testimoniosPublicos = (typeof getTestimoniosPublicos === 'function'
        ? getTestimoniosPublicos() : testimonios).slice(0,3);

    return `
    <div class="fade-in">

        <!-- ══ HERO CINEMATOGRÁFICO ══════════════════════════ -->
        <div class="hero container">
            <div class="hero-content">
                <div class="hero-eyebrow">
                    <i data-lucide="award" style="width:12px;height:12px"></i>
                    Quito · Ecuador · Est. 2004
                </div>
                <h1>
                    Artesanía de precisión
                    <em>para tu hogar</em>
                </h1>
                <p>Más de 20 años transformando espacios con carpintería de
                   alto nivel y cerrajería de seguridad. Cada pieza, a tu medida.</p>
                <div class="hero-cta">
                    <button onclick="navigateTo('catalogo-muebleria-interior')"
                        class="btn btn-primary btn-large">
                        <i data-lucide="layout-grid"></i>
                        Ver Catálogo Completo
                    </button>
                    <button onclick="navigateTo('galeria')"
                        class="btn btn-ghost btn-large">
                        <i data-lucide="image"></i>
                        Ver Proyectos
                    </button>
                </div>
                <div class="hero-stats">
                    <div class="hero-stat">
                        <div class="hero-stat-num">20+</div>
                        <div class="hero-stat-label">Años de experiencia</div>
                    </div>
                    <div class="hero-stat">
                        <div class="hero-stat-num">500+</div>
                        <div class="hero-stat-label">Proyectos entregados</div>
                    </div>
                    <div class="hero-stat">
                        <div class="hero-stat-num">100%</div>
                        <div class="hero-stat-label">Garantía en mano de obra</div>
                    </div>
                    <div class="hero-stat">
                        <div class="hero-stat-num">⭐ 5.0</div>
                        <div class="hero-stat-label">Calificación promedio</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ══ SERVICIOS ═════════════════════════════════════ -->
        <div class="container">
            <div class="section-header">
                <span class="section-eyebrow">Nuestros servicios</span>
                <h2 class="section-title">Todo lo que tu hogar necesita</h2>
                <p class="section-sub">
                    Desde muebles personalizados hasta sistemas de seguridad —
                    fabricados en nuestro taller en Guamaní, Quito.
                </p>
            </div>

            <div class="grid grid-3 mb-4">
                <div class="service-card service-amber"
                     onclick="navigateTo('catalogo-muebleria-interior')">
                    <i data-lucide="sofa"></i>
                    <h3>Mueblería Interior</h3>
                    <p>Puertas, cocinas integrales, closets, baños y muebles a la medida exacta de tu espacio.</p>
                    <div style="display:flex;align-items:center;gap:.4rem;font-size:.78rem;font-weight:700;opacity:.9">
                        Ver productos <i data-lucide="chevron-right" class="service-arrow"></i>
                    </div>
                </div>
                <div class="service-card service-dark"
                     onclick="navigateTo('catalogo-muebleria-exterior')">
                    <i data-lucide="door-open"></i>
                    <h3>Mueblería Exterior</h3>
                    <p>Puertas principales y portones de madera maciza con acabados premium y resistencia duradera.</p>
                    <div style="display:flex;align-items:center;gap:.4rem;font-size:.78rem;font-weight:700;opacity:.9">
                        Ver productos <i data-lucide="chevron-right" class="service-arrow"></i>
                    </div>
                </div>
                <div class="service-card service-slate"
                     onclick="navigateTo('catalogo-cerrajeria')">
                    <i data-lucide="shield-check"></i>
                    <h3>Cerrajería de Seguridad</h3>
                    <p>Puertas de tol, rejas, portones y sistemas de seguridad que protegen lo que más valoras.</p>
                    <div style="display:flex;align-items:center;gap:.4rem;font-size:.78rem;font-weight:700;opacity:.9">
                        Ver productos <i data-lucide="chevron-right" class="service-arrow"></i>
                    </div>
                </div>
            </div>

            <!-- ══ POR QUÉ ELEGIRNOS ══════════════════════════ -->
            <div class="section-header mt-4">
                <span class="section-eyebrow">¿Por qué Benjamín?</span>
                <h2 class="section-title">Franquicia de confianza en Quito</h2>
            </div>
            <div class="grid grid-4 mb-4">
                <div class="why-card">
                    <div class="why-icon"><i data-lucide="shield-check"></i></div>
                    <div>
                        <h4>Garantía de 6 meses</h4>
                        <p>En mano de obra y materiales. Si algo falla, lo resolvemos sin costo.</p>
                    </div>
                </div>
                <div class="why-card">
                    <div class="why-icon"><i data-lucide="ruler"></i></div>
                    <div>
                        <h4>A tu medida exacta</h4>
                        <p>Visitamos tu espacio, tomamos medidas y fabricamos sin dejar milímetro al azar.</p>
                    </div>
                </div>
                <div class="why-card">
                    <div class="why-icon"><i data-lucide="clock"></i></div>
                    <div>
                        <h4>Entrega cumplida</h4>
                        <p>Tiempos definidos desde el primer día. Sin sorpresas, sin retrasos injustificados.</p>
                    </div>
                </div>
                <div class="why-card">
                    <div class="why-icon"><i data-lucide="star"></i></div>
                    <div>
                        <h4>20+ años de trayectoria</h4>
                        <p>Maestro artesano con décadas de experiencia en carpintería y cerrajería fina.</p>
                    </div>
                </div>
            </div>

            <!-- ══ TESTIMONIOS ════════════════════════════════ -->
            ${testimoniosPublicos.length > 0 ? `
            <div class="section-header mt-4">
                <span class="section-eyebrow">Testimonios</span>
                <h2 class="section-title">Lo que dicen nuestros clientes</h2>
            </div>
            <div class="grid grid-3 mb-3">
                ${testimoniosPublicos.map(t =>
                    typeof createTestimonialCardEnhanced === 'function'
                        ? createTestimonialCardEnhanced(t)
                        : createTestimonialCard(t)
                ).join('')}
            </div>
            <div class="text-center mb-4">
                <button onclick="navigateTo('testimonios')" class="btn btn-ghost">
                    Ver todos los testimonios
                    <i data-lucide="arrow-right"></i>
                </button>
            </div>` : ''}

            <!-- ══ CTA INSIGNIAS ══════════════════════════════ -->
            <div class="cta-box">
                <i data-lucide="award" class="cta-icon"></i>
                <h2>Programa de Clientes Preferentes</h2>
                <p>Acumula compras y desbloquea descuentos de hasta 35%, acceso a
                   catálogo VIP y atención prioritaria.</p>
                <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
                    <button onclick="navigateTo('perfil')" class="btn btn-primary btn-large">
                        <i data-lucide="award"></i>
                        ${getUser() ? 'Ver Mis Beneficios' : 'Unirme Ahora — Es Gratis'}
                    </button>
                    <button onclick="navigateTo('testimonios')" class="btn btn-ghost btn-large">
                        <i data-lucide="star"></i>
                        Ver Testimonios
                    </button>
                </div>
            </div>
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

    // Lee siempre desde getProductosCatalogo() para incluir productos del admin
    const cat = (typeof getProductosCatalogo === 'function')
        ? getProductosCatalogo()
        : { muebleriaInterior: productos.muebleriaInterior,
            muebleriaExterior: productos.muebleriaExterior,
            cerrajeriaExterior: productos.cerrajeriaExterior };

    if (tipo === 'muebleria-interior') {
        productosActuales = cat.muebleriaInterior || [];
        titulo = 'Mueblería Interior';
        descripcion = 'Puertas, cocinas, baños y más para el interior de tu hogar';
    } else if (tipo === 'muebleria-exterior') {
        productosActuales = cat.muebleriaExterior || [];
        titulo = 'Mueblería Exterior';
        descripcion = 'Puertas principales y portones de madera premium';
    } else if (tipo === 'cerrajeria') {
        productosActuales = cat.cerrajeriaExterior || [];
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
// ── Tabs del perfil — función global (no puede estar en innerHTML) ──────────
function switchPerfilTab(tab) {
    ['resumen','notas','pedidos','insignias'].forEach(function(t) {
        var panel = document.getElementById('panel-'+t);
        var btn   = document.getElementById('tab-'+t);
        if (panel) panel.classList.add('hidden');
        if (btn)   btn.classList.remove('active');
    });
    var activePanel = document.getElementById('panel-'+tab);
    var activeBtn   = document.getElementById('tab-'+tab);
    if (activePanel) activePanel.classList.remove('hidden');
    if (activeBtn)   activeBtn.classList.add('active');
}

function renderPerfil() {
    const user = getUser();
    
    if (!user) {
        return `
        <div class="fade-in container-small">
            <div class="text-center mb-4">
                <div style="width:72px;height:72px;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));
                    border-radius:18px;display:flex;align-items:center;justify-content:center;
                    font-size:2.2rem;font-weight:900;color:#fff;margin:0 auto 1rem">B</div>
                <h1 style="font-size:1.75rem;font-weight:900">Tu cuenta Benjamín</h1>
                <p style="color:var(--color-gray-600)">Accede o crea tu cuenta para ganar insignias y beneficios</p>
            </div>

            <!-- Tabs Login / Registro -->
            <div class="auth-tabs">
                <button id="tabLogin" class="auth-tab active" onclick="switchAuthTab('login')">
                    <i data-lucide="log-in"></i> Iniciar Sesión
                </button>
                <button id="tabRegistro" class="auth-tab" onclick="switchAuthTab('registro')">
                    <i data-lucide="user-plus"></i> Crear Cuenta
                </button>
            </div>

            <!-- LOGIN -->
            <div id="panelLogin" class="card mt-3">
                <div class="card-body">
                    <div id="loginClienteError" class="alert alert-warning hidden mb-3">
                        <i data-lucide="alert-circle"></i>
                        <span id="loginClienteErrorMsg"></span>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email *</label>
                        <input type="email" id="lcEmail" class="form-input" placeholder="correo@ejemplo.com"
                            onkeydown="if(event.key==='Enter') document.getElementById('lcPass').focus()">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contraseña *</label>
                        <div style="position:relative">
                            <input type="password" id="lcPass" class="form-input" placeholder="••••••••"
                                onkeydown="if(event.key==='Enter') handleClienteLogin()"
                                style="padding-right:3rem">
                            <button onclick="toggleClientePass()"
                                style="position:absolute;right:.75rem;top:50%;transform:translateY(-50%);
                                       background:none;border:none;cursor:pointer;color:var(--color-gray-500)">
                                <i data-lucide="eye" id="lcPassIcon" style="width:18px;height:18px"></i>
                            </button>
                        </div>
                    </div>
                    <button onclick="handleClienteLogin()" id="lcBtn" class="btn btn-primary w-full">
                        <i data-lucide="log-in"></i> Iniciar Sesión
                    </button>
                    <div class="text-center mt-3">
                        <button onclick="handleClienteReset()"
                            style="background:none;border:none;color:var(--color-primary);
                                   font-size:.85rem;cursor:pointer;text-decoration:underline">
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                </div>
            </div>

            <!-- REGISTRO -->
            <div id="panelRegistro" class="card mt-3 hidden">
                <div class="card-body">
                    <div id="regClienteError" class="alert alert-warning hidden mb-3">
                        <i data-lucide="alert-circle"></i>
                        <span id="regClienteErrorMsg"></span>
                    </div>
                    <div class="grid grid-2">
                        <div class="form-group">
                            <label class="form-label">Nombre Completo *</label>
                            <input type="text" id="regNombre" class="form-input" placeholder="Juan Pérez">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Cédula / RUC *</label>
                            <input type="text" id="regCedula" class="form-input" placeholder="1234567890" maxlength="13">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email *</label>
                        <input type="email" id="regEmail" class="form-input" placeholder="correo@ejemplo.com">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Teléfono *</label>
                        <div style="display:flex;gap:.5rem">
                            <select id="regPaisTel" class="form-select" style="width:115px;flex-shrink:0">
                                <option value="+593">🇪🇨 +593</option>
                                <option value="+1">🇺🇸 +1</option>
                                <option value="+57">🇨🇴 +57</option>
                                <option value="+51">🇵🇪 +51</option>
                                <option value="+56">🇨🇱 +56</option>
                                <option value="+54">🇦🇷 +54</option>
                                <option value="+52">🇲🇽 +52</option>
                                <option value="+34">🇪🇸 +34</option>
                                <option value="+44">🇬🇧 +44</option>
                                <option value="+33">🇫🇷 +33</option>
                                <option value="+49">🇩🇪 +49</option>
                            </select>
                            <input type="tel" id="regTelefono" class="form-input" placeholder="0999999999">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contraseña * <small style="color:var(--color-gray-500)">(mín. 6 caracteres)</small></label>
                        <div style="position:relative">
                            <input type="password" id="regPass" class="form-input"
                                placeholder="••••••••" style="padding-right:3rem"
                                oninput="validarPassReg()">
                            <button type="button" onclick="toggleRegPass('regPass','iconRegPass')"
                                style="position:absolute;right:.75rem;top:50%;transform:translateY(-50%);
                                       background:none;border:none;cursor:pointer;color:var(--color-gray-500)">
                                <i data-lucide="eye" id="iconRegPass" style="width:18px;height:18px"></i>
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Confirmar Contraseña *</label>
                        <div style="position:relative">
                            <input type="password" id="regPassConf" class="form-input"
                                placeholder="••••••••" style="padding-right:3rem"
                                oninput="validarPassReg()">
                            <button type="button" onclick="toggleRegPass('regPassConf','iconRegPassConf')"
                                style="position:absolute;right:.75rem;top:50%;transform:translateY(-50%);
                                       background:none;border:none;cursor:pointer;color:var(--color-gray-500)">
                                <i data-lucide="eye" id="iconRegPassConf" style="width:18px;height:18px"></i>
                            </button>
                        </div>
                        <div id="passMatchMsg" style="font-size:.75rem;margin-top:.25rem;display:none"></div>
                    </div>
                    <div class="grid grid-2">
                        <div class="form-group">
                            <label class="form-label">Dirección</label>
                            <input type="text" id="regDireccion" class="form-input" placeholder="Calle y número">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Ciudad</label>
                            <input type="text" id="regCiudad" class="form-input" value="Quito">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Referencia</label>
                        <input type="text" id="regReferencia" class="form-input" placeholder="Frente al parque">
                    </div>
                    <button onclick="handleRegister()" id="regBtn" class="btn btn-primary w-full">
                        <i data-lucide="user-plus"></i> Crear Cuenta Gratis
                    </button>
                </div>
            </div>

            <p style="text-align:center;font-size:.75rem;color:var(--color-gray-400);margin-top:1rem">
                🔐 Cuenta segura con Supabase Auth
            </p>
        </div>`;
    }

    const insigniaActual = calcularInsigniaActual();
    const descuento      = getDescuentoActual();
    const pedidos        = getUserPedidos();
    const verificacion   = typeof getVerificacion === 'function' ? getVerificacion() : { estado: 'sin_verificar' };
    const verificado     = verificacion.estado === 'verificado';
    const pendiente      = verificacion.estado === 'pendiente_admin';

    const nivelGrad  = typeof getGradientInsignia === 'function' ? getGradientInsignia(insigniaActual?.nivel) : '';
    const esManual   = insigniaActual?.esManual === true;
    const nivelClass = insigniaActual?.nivel === 'Elite' ? 'perfil-elite'
                     : insigniaActual?.nivel === 'Premium' ? 'perfil-premium' : '';

    // Mis Notas — filtradas por cédula
    const todasNotas = typeof getNotasVenta === 'function' ? getNotasVenta() : [];
    const misNotas   = todasNotas.filter(n =>
        (user.cedula && n.cliente?.cedula === user.cedula) ||
        (user.email  && n.cliente?.email  === user.email)
    );

    // Mis Pedidos (carrito enviado)
    const misPedidos = pedidos;

    return `
    <div class="fade-in">
        <!-- CABECERA CON FONDO DINÁMICO -->
        <div class="perfil-header ${nivelClass}" style="${nivelGrad ? 'background:'+nivelGrad : ''}">
            <div style="flex:1">
                <h1>¡Hola, ${user.nombre}! 👋</h1>
                <p style="opacity:.85">${user.email}</p>
                ${user.cedula ? `<p style="font-size:.8rem;opacity:.7">Cédula: ${user.cedula}</p>` : ''}
                <p class="perfil-date">Miembro desde ${formatDate(user.fechaRegistro||new Date().toISOString())}</p>
                ${esManual ? `
                <div style="margin-top:.5rem;display:inline-flex;align-items:center;gap:.4rem;
                    background:rgba(255,255,255,.15);padding:4px 12px;border-radius:20px;font-size:.75rem">
                    🎁 El administrador te otorgó: ${insigniaActual?.icono} ${insigniaActual?.nombre}
                </div>` : ''}
            </div>
            <div style="text-align:center;flex-shrink:0">
                <div class="perfil-insignia-icon">${insigniaActual?.icono||'🥉'}</div>
                <div style="font-size:.75rem;opacity:.85;margin-top:.25rem;font-weight:700">
                    ${insigniaActual?.nombre||'Bronce'}
                </div>
                ${verificado
                    ? '<div style="font-size:.7rem;background:rgba(16,185,129,.25);padding:2px 8px;border-radius:20px;margin-top:.25rem">✅ Verificado</div>'
                    : '<div style="font-size:.7rem;background:rgba(239,68,68,.25);padding:2px 8px;border-radius:20px;margin-top:.25rem">⚠️ Sin verificar</div>'
                }
            </div>
        </div>

        <!-- BANNER VERIFICACIÓN (si no está verificado) -->
        ${!verificado && !pendiente ? `
        <div class="alert alert-warning" style="cursor:pointer" onclick="navigateTo('verificacion-identidad')">
            <i data-lucide="shield-alert"></i>
            <div style="flex:1">
                <strong>⚠️ Verifica tu identidad para acceder a tus notas de venta</strong>
                <p style="font-size:.875rem;margin:.25rem 0 0">
                    Sin verificación no puedes ver tus documentos. Toca aquí para verificarte en 2 minutos.
                </p>
            </div>
            <i data-lucide="chevron-right"></i>
        </div>` : ''}
        ${pendiente ? `
        <div class="alert" style="background:#fef3c7;border-left:4px solid #f59e0b">
            <i data-lucide="clock"></i>
            <div>
                <strong>⏳ Verificación en revisión</strong>
                <p style="font-size:.875rem">Tu solicitud está siendo revisada. En menos de 24 horas recibirás confirmación.</p>
            </div>
        </div>` : ''}

        <!-- TABS DE NAVEGACIÓN -->
        <div class="perfil-tabs">
            <button class="perfil-tab active" id="tab-resumen"   onclick="switchPerfilTab('resumen')">
                <i data-lucide="user"></i> Resumen
            </button>
            <button class="perfil-tab" id="tab-notas"    onclick="switchPerfilTab('notas')">
                <i data-lucide="file-text"></i> Mis Notas
                ${misNotas.length > 0 ? `<span class="tab-badge">${misNotas.length}</span>` : ''}
            </button>
            <button class="perfil-tab" id="tab-pedidos"  onclick="switchPerfilTab('pedidos')">
                <i data-lucide="shopping-bag"></i> Mis Pedidos
                ${misPedidos.length > 0 ? `<span class="tab-badge">${misPedidos.length}</span>` : ''}
            </button>
            <button class="perfil-tab" id="tab-insignias" onclick="switchPerfilTab('insignias')">
                <i data-lucide="award"></i> Insignias
            </button>
        </div>

        <!-- TAB: RESUMEN -->
        <div id="panel-resumen" class="perfil-panel">
            <div class="grid grid-2 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title"><i data-lucide="award"></i> Insignia Actual</h3>
                        <div class="insignia-actual">
                            <div class="insignia-icon-large">${insigniaActual?.icono||'🥉'}</div>
                            <h3>${insigniaActual?.nombre||'Bronce'}</h3>
                            <div class="insignia-nivel">${insigniaActual?.nivel||'Simple'}</div>
                            ${descuento > 0 ? `<div class="descuento-badge">🎉 ${descuento}% OFF activo</div>` : ''}
                            <div class="beneficios-list mt-2">
                                ${(insigniaActual?.beneficios||[]).map(b => `
                                <div class="beneficio-item">
                                    <i data-lucide="check-circle"></i><span>${b}</span>
                                </div>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title"><i data-lucide="trending-up"></i> Estadísticas</h3>
                        <div class="estadisticas">
                            <div class="estadistica-item">
                                <span>Compras:</span><strong>${user.compras||0}</strong>
                            </div>
                            <div class="estadistica-item">
                                <span>Descuento activo:</span>
                                <strong class="text-success">${descuento}%</strong>
                            </div>
                            <div class="estadistica-item">
                                <span>Notas de venta:</span>
                                <strong>${misNotas.length}</strong>
                            </div>
                            <div class="estadistica-item">
                                <span>Pedidos enviados:</span>
                                <strong>${misPedidos.length}</strong>
                            </div>
                            <div class="estadistica-item">
                                <span>Identidad:</span>
                                <strong style="color:${verificado?'var(--color-success)':'var(--color-warning)'}">
                                    ${verificado ? '✅ Verificada' : pendiente ? '⏳ En revisión' : '⚠️ Pendiente'}
                                </strong>
                            </div>
                        </div>
                        ${!verificado && !pendiente ? `
                        <button onclick="navigateTo('verificacion-identidad')"
                            class="btn btn-primary w-full mt-3" style="background:#f59e0b">
                            <i data-lucide="shield-check"></i> Verificar Identidad
                        </button>` : ''}
                        <button onclick="handleClienteLogout()" class="btn btn-secondary w-full mt-2">
                            <i data-lucide="log-out"></i> Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB: MIS NOTAS DE VENTA -->
        <div id="panel-notas" class="perfil-panel hidden">
            ${!verificado && !pendiente ? `
            <div style="text-align:center;padding:3rem 1rem">
                <div style="font-size:3rem;margin-bottom:1rem">🔒</div>
                <h3>Acceso Bloqueado</h3>
                <p style="color:var(--color-gray-600);margin:.75rem 0">
                    Debes verificar tu identidad para ver tus notas de venta.<br>
                    Esto protege tu información y evita el uso fraudulento de tus documentos.
                </p>
                <button onclick="navigateTo('verificacion-identidad')" class="btn btn-primary">
                    <i data-lucide="shield-check"></i> Verificar Ahora
                </button>
            </div>` : misNotas.length === 0 ? `
            <div style="text-align:center;padding:3rem 1rem;color:var(--color-gray-500)">
                <i data-lucide="file-x" style="width:3rem;height:3rem;margin-bottom:1rem"></i>
                <p>No tienes notas de venta registradas aún.</p>
                <p style="font-size:.875rem">Cuando realices una compra, aparecerán aquí.</p>
            </div>` : `
            <div class="mb-3" style="display:flex;justify-content:space-between;align-items:center">
                <h3>${misNotas.length} nota${misNotas.length!==1?'s':''} de venta</h3>
            </div>
            <div class="grid grid-2">
                ${misNotas.map(n => `
                <div class="card" style="border-left:4px solid ${
                    n.estado==='pagada'?'#10b981':n.estado==='pendiente'?'#eab308':
                    n.estado==='cancelada'?'#ef4444':'#f59e0b'}">
                    <div class="card-body">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.75rem">
                            <strong style="font-size:.875rem">${n.numeroNota||'—'}</strong>
                            <span class="badge badge-${n.estado||'pendiente'}">${estadosNota[n.estado]?.nombre||n.estado}</span>
                        </div>
                        <p style="font-size:.8rem;color:var(--color-gray-600)">📅 ${n.fechaEmision||'—'}</p>
                        <p style="font-size:1.1rem;font-weight:900;color:var(--color-primary);margin:.5rem 0">
                            $${(n.total||0).toFixed(2)}
                        </p>
                        <div style="font-size:.75rem;color:var(--color-gray-600);margin-bottom:.75rem">
                            ${(n.items||[]).slice(0,2).map(i => `${i.cantidad}x ${i.descripcion}`).join(' · ')}
                            ${(n.items||[]).length > 2 ? ' · ...' : ''}
                        </div>
                        ${(n.abonos||[]).length > 0 ? `
                        <div style="font-size:.75rem;background:#f0fdf4;padding:4px 8px;border-radius:6px;margin-bottom:.5rem">
                            💰 Abonado: $${(n.abonos||[]).reduce((s,a)=>s+(a.monto||0),0).toFixed(2)} 
                            · Saldo: $${Math.max(0,(n.total||0)-(n.abonos||[]).reduce((s,a)=>s+(a.monto||0),0)).toFixed(2)}
                        </div>` : ''}
                        <button onclick="verDetalleNota(${n.id})" class="btn btn-primary btn-sm w-full">
                            <i data-lucide="printer"></i> Ver / Imprimir PDF
                        </button>
                    </div>
                </div>`).join('')}
            </div>`}
        </div>

        <!-- TAB: MIS PEDIDOS (seguimiento) -->
        <div id="panel-pedidos" class="perfil-panel hidden">
            ${misPedidos.length === 0 ? `
            <div style="text-align:center;padding:3rem 1rem;color:var(--color-gray-500)">
                <i data-lucide="shopping-bag" style="width:3rem;height:3rem;margin-bottom:1rem"></i>
                <p>No tienes pedidos enviados aún.</p>
                <p style="font-size:.875rem">Cuando envíes un pedido por WhatsApp, aparecerá aquí.</p>
                <button onclick="navigateTo('catalogo-muebleria-interior')" class="btn btn-primary mt-3">
                    Ver Catálogo
                </button>
            </div>` : `
            <div class="mb-3">
                <h3>${misPedidos.length} pedido${misPedidos.length!==1?'s':''} enviados</h3>
            </div>
            ${misPedidos.map((p, i) => {
                const estadosPedido = {
                    'por-iniciar': { label: 'Por iniciar',   color: '#94a3b8', icon: '📋' },
                    'en-proceso':  { label: 'En proceso',    color: '#f59e0b', icon: '🔨' },
                    'listo':       { label: 'Listo',          color: '#10b981', icon: '✅' },
                    'entregado':   { label: 'Entregado',      color: '#6366f1', icon: '📦' },
                };
                const ep = estadosPedido[p.estado] || estadosPedido['por-iniciar'];
                const pasos = ['por-iniciar','en-proceso','listo','entregado'];
                const idxActual = pasos.indexOf(p.estado);
                return `
                <div class="card mb-3">
                    <div class="card-body">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem">
                            <div>
                                <strong>Pedido #${i+1}</strong>
                                <span style="font-size:.75rem;color:var(--color-gray-500);margin-left:.5rem">
                                    ${new Date(p.fecha).toLocaleDateString('es-EC')}
                                </span>
                            </div>
                            <span style="background:${ep.color};color:#fff;padding:3px 10px;
                                border-radius:20px;font-size:.75rem;font-weight:700">
                                ${ep.icon} ${ep.label}
                            </span>
                        </div>

                        <!-- Barra de progreso -->
                        <div style="display:flex;gap:0;margin-bottom:1rem">
                            ${pasos.map((paso, j) => {
                                const ep2 = estadosPedido[paso];
                                const activo    = j <= idxActual;
                                const esCurrent = j === idxActual;
                                return `<div style="flex:1;text-align:center">
                                    <div style="height:4px;background:${activo?ep.color:'#e2e8f0'};
                                        ${j===0?'border-radius:4px 0 0 4px':''}
                                        ${j===pasos.length-1?'border-radius:0 4px 4px 0':''}"></div>
                                    <div style="font-size:.6rem;margin-top:.25rem;
                                        color:${esCurrent?ep.color:'var(--color-gray-400)'};
                                        font-weight:${esCurrent?'700':'400'}">
                                        ${ep2.icon} ${ep2.label}
                                    </div>
                                </div>`;
                            }).join('')}
                        </div>

                        <div style="font-size:.8rem;color:var(--color-gray-600);margin-bottom:.5rem">
                            ${(p.items||[]).slice(0,3).map(it =>
                                `${it.config?.cantidad||1}x ${it.nombre||'Producto'}`
                            ).join(' · ')}
                        </div>
                        <div style="font-weight:700;color:var(--color-primary)">
                            Total: $${(p.total||0).toFixed(2)}
                        </div>
                        <a href="https://wa.me/${contactInfo?.whatsapp||'593985998615'}?text=${encodeURIComponent('Hola, consulto el estado de mi pedido #'+(i+1)+' del '+new Date(p.fecha).toLocaleDateString('es-EC'))}"
                           target="_blank" class="btn btn-secondary btn-sm mt-2">
                            <i data-lucide="message-circle"></i> Consultar estado
                        </a>
                    </div>
                </div>`;
            }).join('')}`}
        </div>

        <!-- TAB: INSIGNIAS -->
        <div id="panel-insignias" class="perfil-panel hidden">
            <h3 class="insignias-subtitle">Nivel Simple</h3>
            <div class="grid grid-3 mb-3">
                ${insignias.filter(i=>i.nivel==='Simple').map(ins=>
                    createInsigniaCard(ins,(user.compras||0)>=(ins.comprasMin||0))
                ).join('')}
            </div>
            <h3 class="insignias-subtitle">Nivel Premium</h3>
            <div class="grid grid-4 mb-3">
                ${insignias.filter(i=>i.nivel==='Premium').map(ins=>
                    createInsigniaCard(ins,(user.compras||0)>=(ins.comprasMin||0))
                ).join('')}
            </div>
            <h3 class="insignias-subtitle">Nivel Elite</h3>
            <div class="grid grid-3">
                ${insignias.filter(i=>i.nivel==='Elite').map(ins=>
                    createInsigniaCard(ins,false)
                ).join('')}
            </div>
            <div class="maestro-benjamin">
                <div class="maestro-icon">👑</div>
                <h3>Maestro Benjamín</h3>
                <p>Título honorífico único - Máxima distinción como cliente ejemplar</p>
            </div>
        </div>
    </div>

    `;
}

// Página de Carrito

// Alias de seguridad — createCartItem vive en ui.js pero por si acaso
function _ensureCreateCartItem() {
    if (typeof createCartItem === 'undefined') {
        window.createCartItem = function(item) {
            return `<div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-icon">${item.imagen||'📦'}</div>
                    <div class="cart-item-details">
                        <h3>${item.config?.cantidad||1}x ${item.nombre}</h3>
                        <div class="cart-item-specs">
                            <span><strong>Color:</strong> ${item.config?.color||'—'}</span>
                            <span><strong>Material:</strong> ${item.config?.material||'—'}</span>
                            <span><strong>Entrega:</strong> ${item.config?.tipoEntrega==='terminada'?'Terminada':'Rústica'}</span>
                        </div>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-price">$${(item.precioTotal||0).toFixed(2)}</div>
                    <button onclick="removeCartItem(${item.id})" class="btn-remove">
                        <i data-lucide="trash-2"></i> Eliminar</button>
                </div>
            </div>`;
        };
    }
}

function renderCarrito() {
    _ensureCreateCartItem();
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
                <button onclick="enviarPedidoWhatsApp()" class="btn btn-success w-full btn-large">
                    <i data-lucide="message-circle"></i>
                    Realizar Pedido por WhatsApp
                </button>
            </div>
        </div>
    `;
}

// Página de Testimonios
// ── Filtro de testimonios — función global ──────────────────
function filtrarTestimonios(n) {
    var fuente  = (typeof getTestimoniosPublicos === 'function')
        ? getTestimoniosPublicos() : (typeof testimonios !== 'undefined' ? testimonios : []);
    var filtrados = n === 0 ? fuente : fuente.filter(function(t){ return (t.calificacion||5) === n; });
    var grid = document.getElementById('gridTestimonios');
    if (grid) {
        grid.innerHTML = filtrados.map(function(t){ return createTestimonialCardEnhanced(t); }).join('');
        lucide.createIcons();
    }
    document.querySelectorAll('[id^="ftBtn"]').forEach(function(btn) {
        var isActive = btn.id === 'ftBtn'+n;
        btn.style.background = isActive ? 'var(--color-primary)' : 'transparent';
        btn.style.color      = isActive ? '#fff' : 'var(--color-gray-600)';
        btn.style.borderColor = isActive ? 'var(--color-primary)' : 'var(--color-gray-200)';
    });
}

function renderTestimonios() {
    // Mezclar testimonios de la BD con los hardcodeados del data.js
    const dbTestimonios = typeof getTestimoniosPublicos === 'function' ? getTestimoniosPublicos() : [];
    const todos = dbTestimonios.length > 0 ? dbTestimonios : testimonios;
    const stats = typeof getEstadisticasTestimonios === 'function' ? getEstadisticasTestimonios() : null;

    // Calcular promedio de estrellas
    const promedio = todos.length > 0
        ? (todos.reduce((s,t) => s + (t.calificacion||5), 0) / todos.length).toFixed(1)
        : '5.0';

    return `
    <div class="fade-in">
        <div class="page-header text-center">
            <i data-lucide="star" class="page-icon"></i>
            <h1>Lo Que Dicen Nuestros Clientes</h1>
            <p>Testimonios reales de personas que confiaron en nosotros</p>
            <div style="display:flex;align-items:center;justify-content:center;gap:1rem;margin-top:1rem;flex-wrap:wrap">
                <div style="font-size:2.5rem;font-weight:900;color:var(--color-primary)">${promedio}</div>
                <div>
                    <div style="color:#f59e0b;font-size:1.25rem">${'★'.repeat(Math.round(parseFloat(promedio)))}${'☆'.repeat(5-Math.round(parseFloat(promedio)))}</div>
                    <div style="font-size:.8rem;color:var(--color-gray-500)">${todos.length} testimonio${todos.length!==1?'s':''}</div>
                </div>
            </div>
        </div>

        <!-- Filtros por calificación -->
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center;margin-bottom:1.5rem" id="filtroTestimonios">
            ${[0,5,4,3].map(n => `
            <button onclick="filtrarTestimonios(${n})" id="ftBtn${n}"
                style="padding:6px 14px;border-radius:20px;border:2px solid ${n===0?'var(--color-primary)':'var(--color-gray-200)'};
                       background:${n===0?'var(--color-primary)':'transparent'};
                       color:${n===0?'#fff':'var(--color-gray-600)'};
                       font-size:.8rem;font-weight:700;cursor:pointer;transition:all .2s">
                ${n===0 ? 'Todos' : '★'.repeat(n)+' ('+todos.filter(t=>(t.calificacion||5)===n).length+')'}
            </button>`).join('')}
        </div>

        <div class="grid grid-3" id="gridTestimonios">
            ${todos.map(t => createTestimonialCardEnhanced(t)).join('')}
        </div>

        ${todos.length === 0 ? `
        <div style="text-align:center;padding:2rem;color:var(--color-gray-500)">
            <p>Aún no hay testimonios publicados. ¡Sé el primero!</p>
        </div>` : ''}

        <!-- Formulario para dejar testimonio -->
        <hr style="margin:2rem 0;border-color:var(--color-gray-200)">
        <h2 style="text-align:center;margin-bottom:.5rem">¿Ya compraste con nosotros?</h2>
        <p style="text-align:center;color:var(--color-gray-600);margin-bottom:1rem">
            Comparte tu experiencia y ayuda a otros clientes a conocernos
        </p>
        ${typeof renderFormTestimonio === 'function' ? renderFormTestimonio() : ''}
    </div>

    `;
}

// Tarjeta de testimonio mejorada
function createTestimonialCardEnhanced(t) {
    const stars = '★'.repeat(t.calificacion||5) + '☆'.repeat(5-(t.calificacion||5));
    const esDestacado = t.estado === 'destacado';
    return `
    <div class="card testimonial-card" style="${esDestacado?'border:2px solid var(--color-primary);background:linear-gradient(135deg,#fff 0%,#fef9c3 100%)':''}">
        ${esDestacado ? '<div style="background:var(--color-primary);color:#fff;font-size:.7rem;font-weight:700;padding:3px 10px;text-align:center">⭐ DESTACADO</div>' : ''}
        <div class="card-body">
            <div class="testimonial-header">
                <div class="testimonial-avatar">${t.imagen||'👤'}</div>
                <div>
                    <h4>${t.nombre}</h4>
                    <div class="testimonial-stars">${stars}</div>
                </div>
            </div>
            <p class="testimonial-text">"${t.texto}"</p>
            <div class="testimonial-footer">
                <span class="testimonial-project">${t.proyecto}</span>
                <span class="testimonial-date">${typeof formatDate==='function' ? formatDate(t.fecha) : t.fecha}</span>
            </div>
        </div>
    </div>`;
}

// Página de Galería
function renderGaleria() {
    const items = (typeof getGaleriaAdmin === 'function') ? getGaleriaAdmin() : proyectos;
    return `
        <div class="fade-in">
            <div class="page-header text-center">
                <i data-lucide="image" class="page-icon"></i>
                <h1>Galería de Proyectos</h1>
                <p>Conoce algunos de nuestros trabajos realizados</p>
            </div>
            <div class="grid grid-3">
                ${items.map(p => createProjectCard(p)).join('')}
            </div>
        </div>
    `;
}

// Página de Blog
function renderBlog() {
    const items = (typeof getBlogAdmin === 'function') ? getBlogAdmin() : articulos;
    return `
        <div class="fade-in">
            <div class="page-header text-center">
                <i data-lucide="book-open" class="page-icon"></i>
                <h1>Blog y Guías</h1>
                <p>Consejos, tendencias y guías para el cuidado de tus muebles</p>
            </div>
            <div class="grid grid-3">
                ${items.map(a => `
                <div onclick="navigateTo('blog-detalle', ${JSON.stringify(a).replace(/`/g,'\`')})"
                     style="cursor:pointer">
                     ${createArticleCard(a)}
                </div>`).join('')}
            </div>
        </div>
    `;
}

// Detalle de artículo del blog
function renderBlogDetalle(articulo) {
    if (!articulo) return renderBlog();
    return `
    <div class="fade-in container-small">
        <button onclick="navigateTo('blog')" class="btn btn-secondary mb-4">
            <i data-lucide="arrow-left"></i> Volver al Blog
        </button>
        <div class="card">
            <div class="card-body">
                <div class="text-center mb-3">
                    <span style="font-size:3rem">${articulo.imagen}</span>
                    <span style="font-size:.8rem;background:var(--color-primary);color:#fff;
                        padding:3px 10px;border-radius:20px;margin-left:.5rem">
                        ${articulo.categoria}</span>
                </div>
                <h1 style="margin-bottom:.5rem">${articulo.titulo}</h1>
                <p style="color:var(--color-gray-500);font-size:.875rem;margin-bottom:1.5rem">
                    <i data-lucide="calendar" style="width:14px;height:14px;vertical-align:middle"></i>
                    ${new Date(articulo.fecha).toLocaleDateString('es-EC',{year:'numeric',month:'long',day:'numeric'})}
                </p>
                <p style="font-size:1.05rem;line-height:1.8;color:var(--color-gray-700)">
                    ${articulo.contenido}
                </p>
                <hr style="margin:2rem 0;border-color:var(--color-gray-200)">
                <div class="text-center">
                    <p style="margin-bottom:1rem">¿Te interesa este tema? Contáctanos</p>
                    <a href="https://wa.me/${contactInfo.whatsapp}" target="_blank" class="btn btn-primary">
                        <i data-lucide="message-circle"></i> Consultar por WhatsApp
                    </a>
                </div>
            </div>
        </div>
    </div>`;
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
                                    <a href="mailto:mycbenjamin@gmail.com" 
                                       style="color:var(--color-primary);font-weight:600">
                                       mycbenjamin@gmail.com
                                    </a>
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

// ========================================
// LOGIN ADMINISTRADOR
// ========================================
function renderAdminLogin() {
    if (isAdminAuthenticated()) { navigateTo('admin-panel'); return ''; }
    return `
    <div class="fade-in container-small">
        <div class="admin-login-container" style="max-width:420px;margin:0 auto">
            <div class="text-center mb-4">
                <div style="width:80px;height:80px;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));
                    border-radius:20px;display:flex;align-items:center;justify-content:center;
                    font-size:2.5rem;font-weight:900;color:#fff;margin:0 auto 1rem;box-shadow:var(--shadow-xl)">B</div>
                <h1 style="font-size:1.75rem;font-weight:900;color:var(--color-gray-800)">Acceso Administrador</h1>
                <p style="color:var(--color-gray-600);margin-top:.25rem">Mueblería y Cerrajería "Benjamín"</p>
            </div>

            <div class="card">
                <div class="card-body">
                    <div id="loginError" class="alert alert-warning hidden" style="margin-bottom:1rem">
                        <i data-lucide="alert-circle"></i>
                        <span id="loginErrorMsg">Error</span>
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i data-lucide="mail" style="width:14px;height:14px;vertical-align:middle"></i>
                            Correo electrónico
                        </label>
                        <input type="email" id="adminEmail" class="form-input"
                            placeholder="admin@benjamin.ec"
                            autocomplete="email"
                            onkeydown="if(event.key==='Enter') document.getElementById('adminPass').focus()">
                    </div>

                    <div class="form-group">
                        <label class="form-label">
                            <i data-lucide="lock" style="width:14px;height:14px;vertical-align:middle"></i>
                            Contraseña
                        </label>
                        <div style="position:relative">
                            <input type="password" id="adminPass" class="form-input"
                                placeholder="••••••••••••"
                                autocomplete="current-password"
                                onkeydown="if(event.key==='Enter') handleAdminLogin()"
                                style="padding-right:3rem">
                            <button onclick="togglePassVisibility()"
                                style="position:absolute;right:.75rem;top:50%;transform:translateY(-50%);
                                       background:none;border:none;cursor:pointer;color:var(--color-gray-600)"
                                type="button" id="togglePassBtn">
                                <i data-lucide="eye" style="width:18px;height:18px"></i>
                            </button>
                        </div>
                    </div>

                    <button onclick="handleAdminLogin()" id="loginBtn" class="btn btn-primary w-full" style="margin-top:.5rem">
                        <i data-lucide="log-in"></i>
                        <span id="loginBtnText">Iniciar Sesión</span>
                    </button>

                    <div class="text-center mt-3">
                        <button onclick="handleResetPassword()"
                            style="background:none;border:none;color:var(--color-primary);
                                   font-size:.875rem;cursor:pointer;text-decoration:underline">
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>
                </div>
            </div>

            <p style="text-align:center;font-size:.75rem;color:var(--color-gray-500);margin-top:1rem">
                🔐 Autenticación segura con Supabase Auth
            </p>
        </div>
    </div>`;
}

function togglePassVisibility() {
    const input = document.getElementById('adminPass');
    const btn   = document.getElementById('togglePassBtn');
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    btn.innerHTML = isPass
        ? '<i data-lucide="eye-off" style="width:18px;height:18px"></i>'
        : '<i data-lucide="eye" style="width:18px;height:18px"></i>';
    lucide.createIcons();
}

async function handleAdminLogin() {
    const email = document.getElementById('adminEmail').value.trim();
    const pass  = document.getElementById('adminPass').value;
    const btn   = document.getElementById('loginBtn');
    const errDiv  = document.getElementById('loginError');
    const errMsg  = document.getElementById('loginErrorMsg');

    if (!email || !pass) {
        errMsg.textContent = 'Ingresa tu correo y contraseña.';
        errDiv.classList.remove('hidden');
        return;
    }

    // Estado de carga
    btn.disabled = true;
    btn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;display:inline-block"></div> Verificando...';
    errDiv.classList.add('hidden');

    const result = await supabaseLogin(email, pass);

    if (result.ok) {
        showNotification('✅ Bienvenido al panel de administración', 'success');
        // Sincronizar datos frescos antes de entrar
        if (typeof sincronizarDesdeSupabase === 'function') await sincronizarDesdeSupabase();
        navigateTo('admin-panel');
    } else {
        // Mostrar error en el formulario (no salir de la página)
        let msgUsuario = 'Correo o contraseña incorrectos.';
        if (result.error?.includes('Email not confirmed')) msgUsuario = 'Confirma tu email primero (revisa tu bandeja de entrada).';
        if (result.error?.includes('Invalid login'))       msgUsuario = 'Correo o contraseña incorrectos.';
        if (result.error?.includes('not configured'))      msgUsuario = 'Supabase no está configurado correctamente.';
        errMsg.textContent = msgUsuario;
        errDiv.classList.remove('hidden');
        btn.disabled = false;
        btn.innerHTML = '<i data-lucide="log-in"></i> <span>Iniciar Sesión</span>';
        lucide.createIcons();
    }
}

async function handleResetPassword() {
    const email = document.getElementById('adminEmail').value.trim();
    if (!email) {
        showNotification('Ingresa tu correo primero', 'error');
        document.getElementById('adminEmail').focus();
        return;
    }
    const result = await supabaseResetPassword(email);
    if (result.ok) showNotification('📧 Revisa tu correo para restablecer la contraseña', 'success');
    else showNotification('Error al enviar el correo: ' + result.error, 'error');
}

// ========================================
// PANEL PRINCIPAL
// ========================================
function renderAdminPanel() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }
    const stats = obtenerEstadisticasPanel();
    const ia    = calcularIngresosAnuales();
    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>🏗️ Panel de Administración</h1>
                <p>Mueblería y Cerrajería "Benjamín" — RIMPE Negocio Popular</p>
            </div>
            <button onclick="adminLogout()" class="btn btn-secondary">
                <i data-lucide="log-out"></i> Cerrar Sesión
            </button>
        </div>

        ${stats.enRiesgo ? `
        <div class="alert alert-warning mb-4">
            <i data-lucide="alert-triangle"></i>
            <div><strong>⚠️ Cerca del límite RIMPE</strong>
            <p>Llevas el ${stats.porcentajeRIMPE.toFixed(1)}% del límite anual de $${infoNegocio.limiteAnual.toLocaleString()}</p></div>
        </div>` : ''}

        <div class="grid grid-4 mb-4">
            <div class="stat-card stat-primary">
                <i data-lucide="dollar-sign"></i>
                <div><h3>$${stats.totalIngresos.toFixed(2)}</h3><p>Ingresos Anuales</p>
                <small>${stats.porcentajeRIMPE.toFixed(1)}% del límite RIMPE</small></div>
            </div>
            <div class="stat-card stat-success">
                <i data-lucide="trending-up"></i>
                <div><h3>$${stats.ingresosMes.toFixed(2)}</h3><p>Ingresos del Mes</p></div>
            </div>
            <div class="stat-card stat-info">
                <i data-lucide="file-text"></i>
                <div><h3>${stats.totalNotas}</h3><p>Notas Emitidas</p></div>
            </div>
            <div class="stat-card stat-warning">
                <i data-lucide="clock"></i>
                <div><h3>${stats.notasPendientes}</h3><p>Pagos Pendientes</p></div>
            </div>
        </div>

        <div class="grid grid-3 mb-4" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
            <div class="action-card" onclick="navigateTo('admin-nueva-nota')">
                <i data-lucide="plus-circle"></i><h3>Nueva Nota</h3><p>Generar nota RIMPE</p>
            </div>
            <div class="action-card" onclick="navigateTo('admin-historial')">
                <i data-lucide="list"></i><h3>Historial</h3><p>Ver y gestionar notas</p>
            </div>
            <div class="action-card" onclick="navigateTo('admin-productos')">
                <i data-lucide="package"></i><h3>Productos</h3><p>Gestionar catálogo</p>
            </div>
            <div class="action-card" onclick="navigateTo('admin-clientes')">
                <i data-lucide="users"></i><h3>Clientes</h3><p>Ver historial de clientes</p>
            </div>
            <div class="action-card" onclick="navigateTo('admin-estadisticas')">
                <i data-lucide="bar-chart-2"></i><h3>Estadísticas</h3><p>Ingresos mensuales</p>
            </div>
            <div class="action-card" onclick="navigateTo('admin-galeria')">
                <i data-lucide="image"></i><h3>Galería</h3><p>Gestionar proyectos</p>
            </div>
            <div class="action-card" onclick="navigateTo('admin-blog')">
                <i data-lucide="book-open"></i><h3>Blog</h3><p>Publicar artículos</p>
            </div>
            <div class="action-card" onclick="navigateTo('admin-empleo')" style="position:relative">
                <i data-lucide="users"></i><h3>Empleo</h3><p>Postulaciones recibidas</p>
                ${(()=>{const p=(typeof getEstadisticasEmpleo==='function'?getEstadisticasEmpleo():{nuevas:0});return p.nuevas>0?'<span style="position:absolute;top:.75rem;right:.75rem;background:#ef4444;color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:800">'+p.nuevas+'</span>':''})()}
            </div>
            <div class="action-card" onclick="navigateTo('admin-verificaciones')" style="position:relative">
                <i data-lucide="shield-check"></i><h3>Verificaciones</h3><p>Aprobar identidades</p>
                ${(()=>{const p=(typeof getSolicitudesVerificacion==='function'?getSolicitudesVerificacion():[]).filter(s=>s.estado==='pendiente');return p.length>0?'<span style="position:absolute;top:.75rem;right:.75rem;background:#ef4444;color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:800">'+p.length+'</span>':''})()}
            </div>
            <div class="action-card" onclick="navigateTo('admin-pedidos')" style="position:relative">
                <i data-lucide="package"></i><h3>Pedidos</h3><p>Seguimiento de estado</p>
                ${(()=>{const p=getPedidos().filter(x=>x.estado==='por-iniciar'||x.estado==='en-proceso');return p.length>0?'<span style="position:absolute;top:.75rem;right:.75rem;background:#ef4444;color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:800">'+p.length+'</span>':''})()}
            </div>
            <div class="action-card" onclick="navigateTo('admin-testimonios')" style="position:relative">
                <i data-lucide="star"></i><h3>Testimonios</h3><p>Revisar y publicar</p>
                ${(typeof getEstadisticasTestimonios==='function'&&getEstadisticasTestimonios().pendientes>0)?
                  '<span style="position:absolute;top:.75rem;right:.75rem;background:#ef4444;color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:800">'
                  +getEstadisticasTestimonios().pendientes+'</span>':''}
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h3 class="mb-3">Progreso RIMPE ${new Date().getFullYear()}</h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width:${Math.min(stats.porcentajeRIMPE,100)}%">
                        ${stats.porcentajeRIMPE.toFixed(1)}%
                    </div>
                </div>
                <p class="text-center mt-2">
                    $${stats.totalIngresos.toFixed(2)} de $${infoNegocio.limiteAnual.toLocaleString()}
                    &nbsp;|&nbsp; Disponible: <strong>$${ia.margenDisponible.toFixed(2)}</strong>
                </p>
            </div>
        </div>
    </div>`;
}

// ========================================
// NUEVA NOTA DE VENTA
// ========================================
function renderNuevaNota(notaEditar = null) {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }
    const ed = notaEditar;
    const c  = ed?.cliente || {};
    return `
    <div class="fade-in container-small">
        <div class="page-header">
            <h1>${ed ? '✏️ Editar Nota' : '📄 Nueva Nota de Venta'}</h1>
            <p>${ed ? 'Modificar nota ' + ed.numeroNota : 'Generar nota RIMPE para cliente'}</p>
        </div>
        <div class="card">
            <div class="card-body">
                <h3 class="mb-3">Datos del Cliente</h3>
                <!-- Búsqueda/Autorelleno de cliente existente -->
                <div class="form-group">
                    <label class="form-label">🔍 Buscar cliente existente (opcional)</label>
                    <div style="position:relative">
                        <input type="text" id="buscarCliente" class="form-input"
                            placeholder="Escribe nombre o cédula..."
                            oninput="buscarClienteNota(this.value)"
                            autocomplete="off">
                        <div id="resultadosCliente" style="position:absolute;top:100%;left:0;right:0;
                            background:#fff;border:1px solid var(--color-gray-200);border-radius:8px;
                            box-shadow:var(--shadow-lg);z-index:100;max-height:200px;overflow-y:auto;display:none">
                        </div>
                    </div>
                </div>
                <div class="grid grid-2">
                    <div class="form-group">
                        <label class="form-label">Nombre Completo *</label>
                        <input type="text" id="clienteNombre" class="form-input" value="${c.nombre||''}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Cédula / RUC *</label>
                        <input type="text" id="clienteCedula" class="form-input" maxlength="13" value="${c.cedula||''}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Teléfono</label>
                        <input type="tel" id="clienteTelefono" class="form-input" value="${c.telefono||''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" id="clienteEmail" class="form-input" value="${c.email||''}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Dirección</label>
                    <input type="text" id="clienteDireccion" class="form-input" value="${c.direccion||''}">
                </div>

                <hr style="margin:1.5rem 0;border-color:var(--color-gray-200)">
                <h3 class="mb-3">Detalle del Trabajo</h3>
                <div id="itemsContainer">
                    ${ed ? ed.items.map((item, i) => buildItemRow(i+1, item)).join('') : buildItemRow(1)}
                </div>
                <button onclick="agregarItemNota()" class="btn btn-secondary mb-3">
                    <i data-lucide="plus"></i> Agregar Item
                </button>

                <div class="grid grid-2">
                    <div class="form-group">
                        <label class="form-label">Descuento ($)</label>
                        <input type="number" id="descuento" class="form-input" min="0" step="0.01" value="${ed?.descuento||0}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Estado de Pago</label>
                        <select id="estadoPago" class="form-select">
                            <option value="pendiente" ${(ed?.estado||'pendiente')==='pendiente'?'selected':''}>Pendiente de Pago</option>
                            <option value="pagada"    ${ed?.estado==='pagada'   ?'selected':''}>Pagada</option>
                            <option value="parcial"   ${ed?.estado==='parcial'  ?'selected':''}>Pago Parcial</option>
                            <option value="cancelada" ${ed?.estado==='cancelada'?'selected':''}>Cancelada</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Observaciones
                        <button type="button" onclick="restaurarObsDefault()"
                            style="font-size:.7rem;background:none;border:1px solid var(--color-primary);
                                   color:var(--color-primary);padding:1px 6px;border-radius:4px;
                                   cursor:pointer;margin-left:.5rem">↩ Restaurar texto garantía</button>
                    </label>
                    <textarea id="observaciones" class="form-textarea" rows="3">${ed?.observaciones||'El trabajo incluye garantía de 6 meses en mano de obra. Los materiales son de primera calidad. Cualquier ajuste dentro del período de garantía será atendido sin costo.'}</textarea>
                </div>

                <hr style="margin:1.5rem 0;border-color:var(--color-gray-200)">
                <h3 class="mb-2">💰 Abonos / Pagos Parciales</h3>
                <p style="font-size:.85rem;color:var(--color-gray-600);margin-bottom:1rem">
                    Registra cada pago recibido. Si el total abonado cubre el valor total, el estado
                    se actualizará automáticamente a <strong>Pagada</strong>.
                </p>
                <div id="abonosContainer">
                    ${(ed?.abonos||[]).map((a,i) => buildAbonoRow(i+1,a)).join('')}
                </div>
                <button onclick="agregarAbono()" class="btn btn-secondary btn-sm mb-4">
                    <i data-lucide="plus-circle"></i> Agregar Abono
                </button>

                <div class="nota-preview card p-3 mb-3" style="background:var(--color-gray-50)">
                    <h4 class="mb-2">Vista Previa del Total</h4>
                    <div id="previewSubtotal">Subtotal: $0.00</div>
                    <div id="previewDescuento">Descuento: $0.00</div>
                    <div id="previewTotal" style="font-size:1.25rem;font-weight:900;color:var(--color-primary)">TOTAL: $0.00</div>
                    <div id="previewSaldo" style="display:none;font-size:.9rem;font-weight:700;margin-top:.5rem;padding:.5rem;background:#fff;border-radius:6px"></div>
                </div>

                <div class="flex gap-2">
                    <button onclick="generarNota(${ed ? ed.id : 'null'})" class="btn btn-primary" style="flex:1">
                        <i data-lucide="save"></i> ${ed ? 'Guardar Cambios' : 'Generar Nota de Venta'}
                    </button>
                    <button onclick="navigateTo('admin-historial')" class="btn btn-secondary">
                        <i data-lucide="x"></i> Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}


function restaurarObsDefault() {
    const el = document.getElementById('observaciones');
    if (el) el.value = 'El trabajo incluye garantía de 6 meses en mano de obra. Los materiales utilizados son de primera calidad. Cualquier ajuste o reclamo dentro del período de garantía será atendido sin costo adicional.';
}

function buildItemRow(n, item = null) {
    return `
    <div class="item-row" data-item="${n}" style="background:var(--color-gray-50);padding:1rem;border-radius:8px;margin-bottom:1rem;border-left:4px solid var(--color-primary)">
        <div class="grid grid-4">
            <div class="form-group">
                <label class="form-label">Cantidad *</label>
                <input type="number" class="form-input item-cantidad" min="1" value="${item?.cantidad||1}"
                    oninput="actualizarPreview()" required>
            </div>
            <div class="form-group" style="grid-column:span 2">
                <label class="form-label">Descripción *
                    <button type="button" onclick="abrirSelectorProducto(this)"
                        style="font-size:.7rem;background:none;border:1px solid var(--color-primary);
                               color:var(--color-primary);padding:1px 6px;border-radius:4px;
                               cursor:pointer;margin-left:.5rem">📦 Elegir del catálogo</button>
                </label>
                <input type="text" class="form-input item-descripcion" value="${item?.descripcion||''}"
                    placeholder="Descripción del trabajo o producto" required>
            </div>
            <div class="form-group">
                <label class="form-label">Precio Unit. *</label>
                <input type="number" class="form-input item-precio" min="0" step="0.01" value="${item?.precioUnitario||''}"
                    oninput="actualizarPreview()" required>
            </div>
        </div>
        ${n > 1 ? `<button onclick="this.closest('.item-row').remove();actualizarPreview()" class="btn btn-danger btn-sm">
            <i data-lucide="trash-2"></i> Eliminar</button>` : ''}
    </div>`;
}

let itemCounter  = 1;
let abonoCounter = 0;

function buildAbonoRow(n, abono = null) {
    const hoy = new Date().toISOString().split('T')[0];
    return `
    <div class="abono-row" data-abono="${n}"
         style="background:#f0fdf4;padding:.75rem 1rem;border-radius:8px;
                margin-bottom:.75rem;border-left:4px solid #10b981;display:grid;
                grid-template-columns:140px 1fr 110px auto;gap:.75rem;align-items:end">
        <div class="form-group" style="margin:0">
            <label class="form-label" style="font-size:.75rem">Fecha</label>
            <input type="date" class="form-input abono-fecha" value="${abono?.fecha||hoy}"
                oninput="actualizarEstadoAbonos()">
        </div>
        <div class="form-group" style="margin:0">
            <label class="form-label" style="font-size:.75rem">Descripción (opcional)</label>
            <input type="text" class="form-input abono-desc"
                value="${abono?.descripcion||''}"
                placeholder="Ej: Anticipo efectivo">
        </div>
        <div class="form-group" style="margin:0">
            <label class="form-label" style="font-size:.75rem">Monto ($)</label>
            <input type="number" class="form-input abono-monto" min="0" step="0.01"
                value="${abono?.monto||''}" oninput="actualizarEstadoAbonos()">
        </div>
        <button onclick="this.closest('.abono-row').remove();actualizarEstadoAbonos()"
            class="btn btn-danger btn-sm" style="margin-bottom:.15rem">
            <i data-lucide="trash-2"></i></button>
    </div>`;
}

function agregarAbono() {
    abonoCounter++;
    const container = document.getElementById('abonosContainer');
    const div = document.createElement('div');
    div.innerHTML = buildAbonoRow(abonoCounter);
    container.appendChild(div.firstElementChild);
    lucide.createIcons();
    actualizarEstadoAbonos();
}

function actualizarEstadoAbonos() {
    actualizarPreview();
    // Calcular total abonado
    let totalAbonado = 0;
    document.querySelectorAll('.abono-monto').forEach(el => {
        totalAbonado += parseFloat(el.value) || 0;
    });
    // Calcular total de la nota
    let subtotal = 0;
    document.querySelectorAll('.item-row').forEach(r => {
        subtotal += (parseFloat(r.querySelector('.item-cantidad')?.value)||0)
                  * (parseFloat(r.querySelector('.item-precio')?.value)||0);
    });
    const desc  = parseFloat(document.getElementById('descuento')?.value)||0;
    const total = subtotal - desc;
    // Auto-actualizar estado de pago
    const sel = document.getElementById('estadoPago');
    if (!sel) return;
    if (totalAbonado <= 0) {
        // no tocar
    } else if (totalAbonado >= total) {
        sel.value = 'pagada';
    } else {
        sel.value = 'parcial';
    }
    // Mostrar saldo en preview
    const ps = document.getElementById('previewSaldo');
    if (ps) {
        const saldo = total - totalAbonado;
        ps.style.display = totalAbonado > 0 ? '' : 'none';
        ps.textContent = saldo > 0
            ? `Abonado: $${totalAbonado.toFixed(2)} · Saldo pendiente: $${saldo.toFixed(2)}`
            : `✅ Pagado completo: $${totalAbonado.toFixed(2)}`;
        ps.style.color = saldo > 0 ? '#f59e0b' : '#10b981';
    }
}
function agregarItemNota() {
    itemCounter++;
    const container = document.getElementById('itemsContainer');
    const div = document.createElement('div');
    div.innerHTML = buildItemRow(itemCounter);
    container.appendChild(div.firstElementChild);
    lucide.createIcons();
}

function actualizarPreview() {
    const rows = document.querySelectorAll('.item-row');
    let sub = 0;
    rows.forEach(r => {
        const qty  = parseFloat(r.querySelector('.item-cantidad')?.value) || 0;
        const prec = parseFloat(r.querySelector('.item-precio')?.value)   || 0;
        sub += qty * prec;
    });
    const desc  = parseFloat(document.getElementById('descuento')?.value) || 0;
    const total = sub - desc;
    const ps = document.getElementById('previewSubtotal');
    const pd = document.getElementById('previewDescuento');
    const pt = document.getElementById('previewTotal');
    if (ps) ps.textContent = `Subtotal: $${sub.toFixed(2)}`;
    if (pd) pd.textContent = `Descuento: -$${desc.toFixed(2)}`;
    if (pt) pt.textContent = `TOTAL: $${total.toFixed(2)}`;
}

function generarNota(editId = null) {
    const clienteNombre = document.getElementById('clienteNombre').value.trim();
    const clienteCedula = document.getElementById('clienteCedula').value.trim();
    if (!clienteNombre || !clienteCedula) { showNotification('Complete los datos del cliente', 'error'); return; }

    const items = [];
    let subtotal = 0;
    document.querySelectorAll('.item-row').forEach(row => {
        const cantidad       = parseFloat(row.querySelector('.item-cantidad')?.value) || 0;
        const descripcion    = row.querySelector('.item-descripcion')?.value.trim();
        const precioUnitario = parseFloat(row.querySelector('.item-precio')?.value)   || 0;
        if (cantidad > 0 && descripcion && precioUnitario > 0) {
            const total = cantidad * precioUnitario;
            items.push({ cantidad, descripcion, precioUnitario, total });
            subtotal += total;
        }
    });
    if (items.length === 0) { showNotification('Agregue al menos un item', 'error'); return; }

    const descuento = parseFloat(document.getElementById('descuento').value) || 0;
    const total     = subtotal - descuento;
    // Recoger abonos
    const abonos = [];
    document.querySelectorAll('.abono-row').forEach(row => {
        const monto = parseFloat(row.querySelector('.abono-monto')?.value) || 0;
        if (monto > 0) abonos.push({
            fecha:       row.querySelector('.abono-fecha')?.value || new Date().toISOString().split('T')[0],
            descripcion: row.querySelector('.abono-desc')?.value.trim() || 'Abono',
            monto
        });
    });
    const totalAbonado = abonos.reduce((s, a) => s + a.monto, 0);

    const notaData  = {
        cliente: {
            nombre:    clienteNombre,
            cedula:    clienteCedula,
            telefono:  document.getElementById('clienteTelefono').value.trim(),
            email:     document.getElementById('clienteEmail').value.trim(),
            direccion: document.getElementById('clienteDireccion').value.trim()
        },
        items, subtotal, descuento, total,
        abonos,
        montoPagado: totalAbonado,
        estado:       document.getElementById('estadoPago').value,
        observaciones: document.getElementById('observaciones').value.trim()
    };

    if (editId) {
        updateNotaVenta(editId, notaData);
        showNotification('Nota actualizada correctamente', 'success');
        setTimeout(() => navigateTo('admin-historial'), 400);
    } else {
        const nota = saveNotaVenta(notaData);
        showNotification('Nota generada exitosamente', 'success');
        setTimeout(() => { generarPDFNotaVenta(nota); navigateTo('admin-historial'); }, 500);
    }
}

// ========================================
// HISTORIAL DE NOTAS — con Edit/Delete
// ========================================
// filtro activo para el historial (persiste en memoria mientras la sesión está abierta)
let _filtroHistorial = 'todas';

function renderAdminHistorial(filtro) {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }
    if (filtro !== undefined) _filtroHistorial = filtro;

    const todasNotas = [...getNotasVenta()].reverse();
    const notas = _filtroHistorial === 'todas'
        ? todasNotas
        : todasNotas.filter(n => n.estado === _filtroHistorial);

    // Conteo por estado para los botones de filtro
    const conteo = {
        todas:    todasNotas.length,
        pagada:   todasNotas.filter(n => n.estado === 'pagada').length,
        pendiente:todasNotas.filter(n => n.estado === 'pendiente').length,
        parcial:  todasNotas.filter(n => n.estado === 'parcial').length,
        cancelada:todasNotas.filter(n => n.estado === 'cancelada').length,
    };

    const filtros = [
        { key: 'todas',     label: 'Todas',     color: 'var(--color-gray-600)'  },
        { key: 'pagada',    label: 'Pagadas',   color: 'var(--color-success)'   },
        { key: 'pendiente', label: 'Pendientes',color: '#eab308'                },
        { key: 'parcial',   label: 'Parciales', color: '#f59e0b'                },
        { key: 'cancelada', label: 'Canceladas',color: 'var(--color-error)'     },
    ];

    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>📋 Historial de Notas</h1>
                <p>${todasNotas.length} notas en total · mostrando ${notas.length}</p>
            </div>
            <div class="flex gap-2">
                <button onclick="navigateTo('admin-nueva-nota')" class="btn btn-primary">
                    <i data-lucide="plus"></i> Nueva Nota
                </button>
                <button onclick="exportarNotasCSV()" class="btn btn-secondary btn-sm" title="Exportar CSV">
                    <i data-lucide="download"></i>
                </button>
                <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                    <i data-lucide="arrow-left"></i> Panel
                </button>
            </div>
        </div>

        <!-- Filtros por estado -->
        <div class="flex gap-2 mb-4" style="flex-wrap:wrap">
            ${filtros.map(f => `
            <button onclick="filtrarHistorial('${f.key}')"
                style="padding:6px 14px;border-radius:20px;border:2px solid ${f.color};
                       background:${_filtroHistorial===f.key ? f.color : 'transparent'};
                       color:${_filtroHistorial===f.key ? '#fff' : f.color};
                       font-weight:700;font-size:0.8rem;cursor:pointer;transition:all .2s">
                ${f.label} (${conteo[f.key]})
            </button>`).join('')}
        </div>

        ${notas.length === 0 ? `
        <div class="alert alert-warning">
            <i data-lucide="alert-circle"></i>
            <p>No hay notas con el filtro seleccionado.</p>
        </div>` : `
        <div class="table-responsive">
            <table class="admin-table">
                <thead><tr>
                    <th>No. Nota</th><th>Fecha</th><th>Cliente</th>
                    <th>Cédula</th><th>Total</th><th>Estado</th><th>Acciones</th>
                </tr></thead>
                <tbody>
                    ${notas.map(n => `
                    <tr style="${n.estado==='cancelada' ? 'opacity:.65;background:#fff5f5' : ''}">
                        <td><strong>${n.numeroNota}</strong></td>
                        <td>${n.fechaEmision}</td>
                        <td>${n.cliente.nombre}</td>
                        <td>${n.cliente.cedula}</td>
                        <td style="font-weight:700;color:${n.estado==='cancelada'?'var(--color-error)':'var(--color-success)'}">
                            ${n.estado==='cancelada' ? '<s>' : ''}$${n.total.toFixed(2)}${n.estado==='cancelada' ? '</s>' : ''}
                        </td>
                        <td><span class="badge badge-${n.estado}">${estadosNota[n.estado]?.nombre||n.estado}</span></td>
                        <td>
                            <div class="flex gap-1">
                                <button onclick="verDetalleNota(${n.id})" class="btn-icon" title="Ver PDF">
                                    <i data-lucide="printer"></i></button>
                                <button onclick="abrirModalEstado(${n.id})" class="btn-icon" title="Cambiar estado"
                                    style="color:var(--color-info)">
                                    <i data-lucide="refresh-cw"></i></button>
                                <button onclick="editarNota(${n.id})" class="btn-icon" title="Editar">
                                    <i data-lucide="edit-2"></i></button>
                                <button onclick="confirmarEliminarNota(${n.id})" class="btn-icon" title="Eliminar"
                                    style="color:var(--color-error)">
                                    <i data-lucide="trash-2"></i></button>
                            </div>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>`}
    </div>

    <!-- Modal cambio de estado -->
    <div id="modalEstado" class="modal-overlay hidden">
        <div class="modal-content" style="max-width:420px">
            <div class="modal-header">
                <h2>🔄 Cambiar Estado de Nota</h2>
                <button class="btn-close" onclick="document.getElementById('modalEstado').classList.add('hidden')">
                    <i data-lucide="x"></i></button>
            </div>
            <div class="modal-body" id="modalEstadoBody"></div>
        </div>
    </div>`;
}

function filtrarHistorial(filtro) {
    _filtroHistorial = filtro;
    const main = document.getElementById('mainContent');
    main.innerHTML = renderAdminHistorial(filtro);
    lucide.createIcons();
}

function abrirModalEstado(id) {
    const nota = getNotaById(id);
    if (!nota) return;
    const estados = [
        { key: 'pendiente', label: '⏳ Pendiente de Pago', color: '#eab308'  },
        { key: 'pagada',    label: '✅ Pagada',             color: '#10b981' },
        { key: 'parcial',   label: '💰 Pago Parcial',      color: '#f59e0b' },
        { key: 'cancelada', label: '❌ Cancelada',          color: '#ef4444' },
    ];
    document.getElementById('modalEstadoBody').innerHTML = `
    <div style="margin-bottom:1rem">
        <p><strong>Nota:</strong> ${nota.numeroNota}</p>
        <p><strong>Cliente:</strong> ${nota.cliente.nombre}</p>
        <p><strong>Total:</strong> $${nota.total.toFixed(2)}</p>
        <p style="margin-top:.5rem"><strong>Estado actual:</strong>
            <span class="badge badge-${nota.estado}">${estadosNota[nota.estado]?.nombre||nota.estado}</span>
        </p>
    </div>
    <p style="font-weight:700;margin-bottom:.75rem">Selecciona el nuevo estado:</p>
    <div style="display:grid;gap:.5rem">
        ${estados.map(e => `
        <button onclick="confirmarCambioEstado(${id}, '${e.key}')"
            style="padding:10px 16px;border-radius:8px;border:2px solid ${e.color};
                   background:${nota.estado===e.key ? e.color : 'transparent'};
                   color:${nota.estado===e.key ? '#fff' : e.color};
                   font-weight:700;cursor:pointer;text-align:left;
                   ${nota.estado===e.key ? 'cursor:default;' : ''}"
            ${nota.estado===e.key ? 'disabled' : ''}>
            ${e.label} ${nota.estado===e.key ? '← actual' : ''}
        </button>`).join('')}
    </div>
    <div class="form-group mt-3">
        <label class="form-label">Observación (opcional)</label>
        <input type="text" id="obsEstado" class="form-input"
            placeholder="Ej: Cliente canceló por cambio de presupuesto"
            value="${nota.observaciones||''}">
    </div>`;
    document.getElementById('modalEstado').classList.remove('hidden');
    lucide.createIcons();
}

function confirmarCambioEstado(id, nuevoEstado) {
    const nota = getNotaById(id);
    if (!nota) return;
    if (nota.estado === nuevoEstado) return;

    const obs = document.getElementById('obsEstado')?.value.trim() || nota.observaciones || '';

    // Si va a cancelar: pedir confirmación especial
    if (nuevoEstado === 'cancelada') {
        const confirmar = confirm(
            `⚠️ CONFIRMAR CANCELACIÓN\n\n` +
            `Nota: ${nota.numeroNota}\n` +
            `Cliente: ${nota.cliente.nombre}\n` +
            `Total: $${nota.total.toFixed(2)}\n\n` +
            `Esta acción:\n` +
            `• Marcará la nota como CANCELADA\n` +
            `• El PDF mostrará el sello CANCELADO\n` +
            `• El monto NO contará para el límite RIMPE\n\n` +
            `¿Confirmas la cancelación?`
        );
        if (!confirmar) return;
    }

    updateNotaVenta(id, { estado: nuevoEstado, observaciones: obs });
    document.getElementById('modalEstado').classList.add('hidden');

    const msg = nuevoEstado === 'cancelada'
        ? '🔴 Nota cancelada — el PDF mostrará el sello CANCELADO'
        : `✅ Estado actualizado a: ${estadosNota[nuevoEstado]?.nombre}`;
    showNotification(msg, nuevoEstado === 'cancelada' ? 'error' : 'success');

    // Re-renderizar el historial manteniendo el filtro activo
    filtrarHistorial(_filtroHistorial);
}

function editarNota(id) {
    const nota = getNotaById(id);
    if (!nota) { showNotification('Nota no encontrada', 'error'); return; }
    const main = document.getElementById('mainContent');
    main.innerHTML = renderNuevaNota(nota);
    lucide.createIcons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function confirmarEliminarNota(id) {
    const nota = getNotaById(id);
    if (!nota) return;
    if (confirm(`¿Eliminar la nota ${nota.numeroNota} de ${nota.cliente.nombre}?\nEsta acción no se puede deshacer.`)) {
        deleteNotaVenta(id);
        showNotification('Nota eliminada', 'info');
        navigateTo('admin-historial');
    }
}

function verDetalleNota(id) {
    const nota = getNotaById(id) || getNotasVenta().find(n => n.id === id);
    if (!nota) { showNotification('Nota no encontrada', 'error'); return; }
    generarPDFNotaVenta(nota);
}
function descargarNotaPDF(id) { verDetalleNota(id); }

// ========================================
// GESTIÓN DE PRODUCTOS — CRUD completo
// ========================================
const CATS_LABEL = {
    muebleriaInterior:  'Mueblería Interior',
    muebleriaExterior:  'Mueblería Exterior',
    cerrajeriaExterior: 'Cerrajería Exterior'
};
const CATS_KEYS = Object.keys(CATS_LABEL);

function renderAdminProductos() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }
    const cat = getProductosCatalogo();
    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>📦 Gestión de Productos</h1>
                <p>Catálogo completo — añade, edita o elimina productos</p>
            </div>
            <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                <i data-lucide="arrow-left"></i> Panel
            </button>
        </div>

        ${CATS_KEYS.map(clave => `
        <div class="card mb-4">
            <div class="card-header-admin">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <h4>${CATS_LABEL[clave]} (${(cat[clave]||[]).length})</h4>
                    <button onclick="abrirModalProducto('${clave}', null)" class="btn btn-primary btn-sm">
                        <i data-lucide="plus"></i> Añadir
                    </button>
                </div>
            </div>
            <div class="card-body">
                ${(cat[clave]||[]).length === 0
                    ? '<p style="color:var(--color-gray-600);text-align:center;padding:1rem">No hay productos en esta categoría</p>'
                    : `<div class="grid grid-3">
                        ${(cat[clave]||[]).map(p => `
                        <div class="producto-admin-card">
                            <div class="producto-admin-header">
                                <span class="producto-icono">${p.imagen||'📦'}</span>
                                <div><h5>${p.nombre}</h5>
                                <span style="font-size:0.8rem;color:var(--color-primary);font-weight:700">
                                    Desde $${p.precio}</span></div>
                            </div>
                            <p style="font-size:0.8rem;color:var(--color-gray-600);margin-bottom:0.5rem">
                                ${p.descripcion?.substring(0,80)}...</p>
                            <div class="producto-admin-footer">
                                <button onclick="abrirModalProducto('${clave}', ${p.id})"
                                    class="btn btn-secondary btn-sm">
                                    <i data-lucide="edit-2"></i> Editar</button>
                                <button onclick="confirmarEliminarProducto('${clave}', ${p.id}, '${p.nombre.replace(/'/g,'')}')"
                                    class="btn btn-danger btn-sm">
                                    <i data-lucide="trash-2"></i> Eliminar</button>
                            </div>
                        </div>`).join('')}
                    </div>`}
            </div>
        </div>`).join('')}
    </div>

    <!-- Modal Producto -->
    <div id="modalProducto" class="modal-overlay hidden">
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modalProductoTitulo">Producto</h2>
                <button class="btn-close" onclick="cerrarModalProducto()">
                    <i data-lucide="x"></i></button>
            </div>
            <div class="modal-body" id="modalProductoBody"></div>
        </div>
    </div>`;
}

function abrirModalProducto(categoria, id) {
    const cat = getProductosCatalogo();
    const p   = id !== null ? (cat[categoria]||[]).find(x => x.id == id) : null;
    document.getElementById('modalProductoTitulo').textContent = p ? 'Editar Producto' : 'Nuevo Producto';
    document.getElementById('modalProductoBody').innerHTML = `
    <div class="grid grid-2">
        <div class="form-group">
            <label class="form-label">Nombre *</label>
            <input type="text" id="mpNombre" class="form-input" value="${p?.nombre||''}">
        </div>
        <div class="form-group">
            <label class="form-label">Precio base ($) *</label>
            <input type="number" id="mpPrecio" class="form-input" min="1" value="${p?.precio||''}">
        </div>
        <div class="form-group">
            <label class="form-label">Código (ej: PMD001)</label>
            <input type="text" id="mpCodigo" class="form-input" value="${p?.codigo||''}" placeholder="PMD001"
                style="font-family:monospace;font-weight:700;text-transform:uppercase">
        </div>
        <div class="form-group">
            <label class="form-label">Emoji (si no hay foto)</label>
            <input type="text" id="mpImagen" class="form-input" value="${p?.imagen||'📦'}" maxlength="4">
        </div>
    </div>

    <!-- Upload de imagen -->
    <div class="form-group">
        <label class="form-label">Foto del producto</label>
        <div class="img-upload-area" id="imgUploadArea" onclick="document.getElementById('mpImgFile').click()"
            style="border:2px dashed var(--color-gray-300);border-radius:10px;padding:1.5rem;
                   text-align:center;cursor:pointer;background:var(--color-gray-50);transition:border-color .2s"
            onmouseover="this.style.borderColor='var(--color-primary)'"
            onmouseout="this.style.borderColor='var(--color-gray-300)'">
            ${p?.imagenUrl
                ? `<img id="mpImgPreview" src="${p.imagenUrl}" alt="Preview"
                    style="max-height:140px;border-radius:8px;margin-bottom:.5rem"><br>
                   <small style="color:var(--color-gray-500)">Clic para cambiar</small>`
                : `<i data-lucide="upload-cloud" style="width:32px;height:32px;color:var(--color-gray-400);margin-bottom:.5rem"></i>
                   <p style="font-size:.85rem;color:var(--color-gray-600)">Arrastra una imagen o <strong>haz clic aquí</strong></p>
                   <small style="color:var(--color-gray-400)">PNG, JPG, WEBP — máx. 2MB</small>`
            }
        </div>
        <input type="file" id="mpImgFile" accept="image/*" style="display:none"
            onchange="previewImgProducto(this)">
        <input type="hidden" id="mpImgUrl" value="${p?.imagenUrl||''}">
        ${p?.imagenUrl ? `<button onclick="quitarImgProducto()" class="btn btn-secondary btn-sm mt-2">
            <i data-lucide="x"></i> Quitar foto</button>` : ''}
    </div>

    <div class="form-group">
        <label class="form-label">Descripción *</label>
        <textarea id="mpDescripcion" class="form-textarea" rows="3">${p?.descripcion||''}</textarea>
    </div>
    <div class="form-group">
        <label class="form-label">
            Colores — códigos C001, C002... (separados por coma)
            <small style="color:var(--color-gray-500)">
                ${(typeof getColoresConCodigo==='function'?getColoresConCodigo():[]).map(c=>
                    `<span style="display:inline-flex;align-items:center;gap:3px;margin:2px">
                        <span style="width:10px;height:10px;border-radius:50%;background:${c.hex};border:1px solid #ccc;display:inline-block"></span>
                        ${c.codigo}=${c.nombre}
                    </span>`
                ).join(' ')}
            </small>
        </label>
        <input type="text" id="mpColores" class="form-input" value="${(p?.colores||[]).join(', ')}"
            placeholder="C001, C003, C004" style="font-family:monospace">
    </div>
    <div class="form-group">
        <label class="form-label">Acabados (separados por coma)</label>
        <input type="text" id="mpAcabados" class="form-input" value="${(p?.acabados||[]).join(', ')}">
    </div>
    <div class="form-group">
        <label class="form-label">Materiales (separados por coma)</label>
        <input type="text" id="mpMateriales" class="form-input" value="${(p?.materiales||[]).join(', ')}">
    </div>
    <div class="flex gap-2 mt-3">
        <button onclick="guardarProducto('${categoria}', ${id||'null'})" class="btn btn-primary" style="flex:1">
            <i data-lucide="save"></i> Guardar</button>
        <button onclick="cerrarModalProducto()" class="btn btn-secondary">Cancelar</button>
    </div>`;
    document.getElementById('modalProducto').classList.remove('hidden');
    lucide.createIcons();
}


function previewProductImg() {
    const file = document.getElementById('mpImagenFile')?.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
        showNotification('La imagen debe pesar menos de 2MB', 'error');
        document.getElementById('mpImagenFile').value = '';
        return;
    }
    const reader = new FileReader();
    reader.onload = e => {
        const url = e.target.result;
        document.getElementById('mpImagenUrl').value = url;
        const prev = document.getElementById('mpImgPreview');
        if (prev) prev.innerHTML = `<img src="${url}" style="width:100%;height:100%;object-fit:cover">`;
    };
    reader.readAsDataURL(file);
}

function cerrarModalProducto() {
    document.getElementById('modalProducto').classList.add('hidden');
}


function previewImgProducto(input) {
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    if (file.size > 2 * 1024 * 1024) {
        showNotification('La imagen no puede superar 2MB', 'error'); return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('mpImgUrl').value = e.target.result;
        const area = document.getElementById('imgUploadArea');
        area.innerHTML = `<img src="${e.target.result}" alt="Preview"
            style="max-height:140px;border-radius:8px;margin-bottom:.5rem"><br>
            <small style="color:var(--color-gray-500)">Clic para cambiar</small>`;
    };
    reader.readAsDataURL(file);
}

function quitarImgProducto() {
    document.getElementById('mpImgUrl').value = '';
    const area = document.getElementById('imgUploadArea');
    area.innerHTML = `<i data-lucide="upload-cloud" style="width:32px;height:32px;color:var(--color-gray-400);margin-bottom:.5rem"></i>
        <p style="font-size:.85rem;color:var(--color-gray-600)">Arrastra una imagen o <strong>haz clic aquí</strong></p>
        <small style="color:var(--color-gray-400)">PNG, JPG, WEBP — máx. 2MB</small>`;
    lucide.createIcons();
}

function guardarProducto(categoria, id) {
    const nombre      = document.getElementById('mpNombre').value.trim();
    const precio      = parseFloat(document.getElementById('mpPrecio').value);
    const imagen      = document.getElementById('mpImagen').value.trim();
    const descripcion = document.getElementById('mpDescripcion').value.trim();
    const colores     = document.getElementById('mpColores').value.split(',').map(s=>s.trim()).filter(Boolean);
    const acabados    = document.getElementById('mpAcabados').value.split(',').map(s=>s.trim()).filter(Boolean);
    const materiales  = document.getElementById('mpMateriales').value.split(',').map(s=>s.trim()).filter(Boolean);
    if (!nombre || !precio || !descripcion) { showNotification('Completa los campos obligatorios', 'error'); return; }
    const codigo    = document.getElementById('mpCodigo')?.value.trim().toUpperCase() || '';
    const imagenUrl = document.getElementById('mpImgUrl')?.value || null;
    const data = { nombre, precio, imagen, descripcion, codigo, imagenUrl,
                   categoria: CATS_LABEL[categoria], colores, acabados, materiales };
    if (id !== null && id !== 'null') { updateProductoAdmin(categoria, id, data); showNotification('Producto actualizado', 'success'); }
    else { addProductoAdmin(categoria, data); showNotification('Producto agregado', 'success'); }
    cerrarModalProducto();
    navigateTo('admin-productos');
}

function confirmarEliminarProducto(categoria, id, nombre) {
    if (confirm(`¿Eliminar el producto "${nombre}"?\nEsta acción no se puede deshacer.`)) {
        deleteProductoAdmin(categoria, id);
        showNotification('Producto eliminado', 'info');
        navigateTo('admin-productos');
    }
}

// ========================================
// GESTIÓN DE CLIENTES
// ========================================
// ── Papelera de clientes — soft delete 30 días ───────────────────────────────
function getClientesEliminados() {
    return JSON.parse(localStorage.getItem('clientesEliminados') || '[]');
}
function moverClienteAPapelera(cedula) {
    const clientes  = getClientesList();
    const eliminados = getClientesEliminados();
    const cliente = clientes.find(c => c.cedula === cedula);
    if (!cliente) return;
    eliminados.push({
        ...cliente,
        eliminadoEn: new Date().toISOString(),
        expiraEn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
    localStorage.setItem('clientesEliminados', JSON.stringify(eliminados));
    // Ocultar notas del cliente de la vista (no borrar notas reales)
    const ocultos = JSON.parse(localStorage.getItem('clientesOcultos') || '[]');
    if (!ocultos.includes(cedula)) ocultos.push(cedula);
    localStorage.setItem('clientesOcultos', JSON.stringify(ocultos));
}
function restaurarClienteDePapelera(cedula) {
    const eliminados = getClientesEliminados().filter(c => c.cedula !== cedula);
    localStorage.setItem('clientesEliminados', JSON.stringify(eliminados));
    const ocultos = JSON.parse(localStorage.getItem('clientesOcultos') || '[]').filter(c => c !== cedula);
    localStorage.setItem('clientesOcultos', JSON.stringify(ocultos));
}
function limpiarPapeleraExpirada() {
    const ahora = new Date();
    const vigentes = getClientesEliminados().filter(c => new Date(c.expiraEn) > ahora);
    localStorage.setItem('clientesEliminados', JSON.stringify(vigentes));
}
function getClistesList_sinOcultos() {
    const ocultos = JSON.parse(localStorage.getItem('clientesOcultos') || '[]');
    return getClientesList().filter(c => !ocultos.includes(c.cedula));
}
function diasRestantes(expiraEn) {
    return Math.max(0, Math.ceil((new Date(expiraEn) - new Date()) / (1000*60*60*24)));
}

// ── Helpers de insignias por cédula (override manual del admin) ──────────────
function getInsigniasOverrides() {
    return JSON.parse(localStorage.getItem('insigniasOverrides') || '{}');
}
function setInsigniaOverride(cedula, data) {
    const ov = getInsigniasOverrides();
    ov[cedula] = data;
    localStorage.setItem('insigniasOverrides', JSON.stringify(ov));
}
function getInsigniaCliente(cedula, notasCount) {
    const ov = getInsigniasOverrides();
    if (ov[cedula]) return { ...ov[cedula], esManual: true };
    // Auto: basada en número de notas pagadas como proxy de compras
    let mejor = insignias[0];
    for (const ins of insignias) {
        if (notasCount >= (ins.comprasMin || 0)) mejor = ins;
    }
    return { ...mejor, esManual: false };
}

function renderAdminClientes() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }
    limpiarPapeleraExpirada();
    const clientes = getClistesList_sinOcultos();
    const eliminados = getClientesEliminados();
    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>👥 Gestión de Clientes</h1>
                <p>${clientes.length} clientes activos${eliminados.length > 0 ? ' · '+eliminados.length+' en papelera' : ''}</p>
            </div>
            <div class="flex gap-2">
                <button onclick="navigateTo('admin-papelera-clientes')" class="btn btn-secondary btn-sm">
                    <i data-lucide="trash-2"></i> Papelera (${eliminados.length})
                </button>
                <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                <i data-lucide="arrow-left"></i> Panel
            </button>
        </div>

        ${clientes.length === 0 ? `
        <div class="alert alert-warning">
            <i data-lucide="users"></i>
            <p>No hay clientes aún. Los clientes aparecen al emitir notas de venta.</p>
        </div>` : `
        <div class="table-responsive">
            <table class="admin-table">
                <thead><tr>
                    <th>Cliente</th><th>Cédula</th><th>Teléfono</th>
                    <th>Compras</th><th>Facturado</th>
                    <th>Insignia</th><th>Acciones</th>
                </tr></thead>
                <tbody>
                    ${clientes.map(c => {
                        const notasPagadas = c.notas.filter(n => n.estado === 'pagada').length;
                        const ins = getInsigniaCliente(c.cedula, notasPagadas);
                        return `
                        <tr>
                            <td><strong style="color:var(--color-gray-800)">${c.nombre}</strong></td>
                            <td style="font-size:.8rem;color:var(--color-gray-700)">${c.cedula}</td>
                            <td>${c.telefono||'—'}</td>
                            <td>
                                <span class="badge badge-pagada">${notasPagadas}</span>
                                <span style="font-size:.7rem;color:var(--color-gray-500)"> / ${c.notas.length} total</span>
                            </td>
                            <td style="color:var(--color-success);font-weight:700">
                                $${c.totalFacturado.toFixed(2)}</td>
                            <td>
                                <div style="display:flex;align-items:center;gap:.4rem">
                                    <span style="font-size:1.2rem">${ins.icono}</span>
                                    <div>
                                        <div style="font-size:.8rem;font-weight:700">${ins.nombre}</div>
                                        <div style="font-size:.7rem;color:var(--color-gray-500)">
                                            ${ins.esManual ? '✏️ Manual' : '⚙️ Auto'}
                                            ${ins.descuento > 0 ? '· '+ins.descuento+'% dto' : ''}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="flex gap-1">
                                    <button onclick="abrirModalInsignia('${c.cedula}','${c.nombre}',${notasPagadas})"
                                        class="btn-icon" title="Asignar insignia" style="color:var(--color-primary)">
                                        <i data-lucide="award"></i></button>
                                    <button onclick="verDetalleCliente('${c.cedula}')"
                                        class="btn-icon" title="Ver historial">
                                        <i data-lucide="eye"></i></button>
                                    <button onclick="confirmarEliminarCliente('${c.cedula}','${c.nombre}')"
                                        class="btn-icon" title="Mover a papelera" style="color:var(--color-error)">
                                        <i data-lucide="trash-2"></i></button>
                                </div>
                            </td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table>
        </div>

        <!-- Modal detalle cliente -->
        <div id="modalCliente" class="modal-overlay hidden">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modalClienteTitulo">Historial del Cliente</h2>
                    <button class="btn-close" onclick="document.getElementById('modalCliente').classList.add('hidden')">
                        <i data-lucide="x"></i></button>
                </div>
                <div class="modal-body" id="modalClienteBody"></div>
            </div>
        </div>

        <!-- Modal asignación de insignia -->
        <div id="modalInsignia" class="modal-overlay hidden">
            <div class="modal-content" style="max-width:520px">
                <div class="modal-header">
                    <h2>🏅 Asignar Insignia</h2>
                    <button class="btn-close" onclick="document.getElementById('modalInsignia').classList.add('hidden')">
                        <i data-lucide="x"></i></button>
                </div>
                <div class="modal-body" id="modalInsigniaBody"></div>
            </div>
        </div>`}
    </div>`;
}

function verDetalleCliente(cedula) {
    const clientes = getClientesList();
    const c = clientes.find(x => x.cedula === cedula);
    if (!c) return;
    const notasPagadas = c.notas.filter(n => n.estado === 'pagada').length;
    const ins = getInsigniaCliente(c.cedula, notasPagadas);
    // Calcular próxima insignia
    const idx = insignias.findIndex(i => i.id === ins.id);
    const proxima = idx < insignias.length - 1 ? insignias[idx + 1] : null;

    document.getElementById('modalClienteTitulo').textContent = c.nombre;
    document.getElementById('modalClienteBody').innerHTML = `
    <div class="cliente-detalle-header">
        <div>
            <p><strong>Cédula:</strong> ${c.cedula}</p>
            <p><strong>Teléfono:</strong> ${c.telefono||'—'}</p>
            <p><strong>Email:</strong> ${c.email||'—'}</p>
            <p><strong>Dirección:</strong> ${c.direccion||'—'}</p>
        </div>
        <div class="cliente-stats-grid">
            <div class="stat-box"><span class="stat-number">${notasPagadas}</span><span class="stat-label">Compras</span></div>
            <div class="stat-box"><span class="stat-number">$${c.totalFacturado.toFixed(2)}</span><span class="stat-label">Facturado</span></div>
        </div>
    </div>

    <!-- Insignia actual -->
    <div style="background:linear-gradient(135deg,#fef9c3,#fef3c7);border:2px solid #f59e0b;
        border-radius:12px;padding:1rem;margin:1rem 0;display:flex;align-items:center;gap:1rem">
        <span style="font-size:2.5rem">${ins.icono}</span>
        <div style="flex:1">
            <div style="font-weight:900;font-size:1rem">${ins.nombre}
                <span style="font-size:.7rem;background:${ins.esManual?'#dbeafe':'#dcfce7'};
                    color:${ins.esManual?'#1d4ed8':'#166534'};padding:2px 8px;border-radius:20px;margin-left:.5rem">
                    ${ins.esManual ? '✏️ Asignada manualmente' : '⚙️ Automática'}
                </span>
            </div>
            <div style="font-size:.8rem;color:#92400e;margin:.2rem 0">Nivel: ${ins.nivel}</div>
            <div style="font-size:.8rem;color:#374151">
                ${ins.descuento > 0 ? '🎉 '+ins.descuento+'% de descuento activo' : 'Sin descuento en este nivel'}
            </div>
            ${proxima ? `<div style="font-size:.75rem;color:var(--color-gray-500);margin-top:.25rem">
                Próxima: ${proxima.icono} ${proxima.nombre} — requiere ${proxima.comprasMin} compras
                (${Math.max(0, proxima.comprasMin - notasPagadas)} más)
            </div>` : '<div style="font-size:.75rem;color:#10b981;margin-top:.25rem">🏆 ¡Nivel máximo alcanzado!</div>'}
        </div>
        <button onclick="abrirModalInsignia('${c.cedula}','${c.nombre}',${notasPagadas})"
            class="btn btn-primary btn-sm">
            <i data-lucide="edit-2"></i> Cambiar
        </button>
    </div>

    <h4 class="mb-2">Historial de Notas</h4>
    <div style="max-height:300px;overflow-y:auto">
        <table class="admin-table">
            <thead><tr><th>No. Nota</th><th>Fecha</th><th>Total</th><th>Estado</th><th>PDF</th></tr></thead>
            <tbody>
                ${c.notas.map(n=>`
                <tr>
                    <td>${n.numeroNota}</td>
                    <td>${n.fechaEmision}</td>
                    <td>$${n.total.toFixed(2)}</td>
                    <td><span class="badge badge-${n.estado}">${estadosNota[n.estado]?.nombre||n.estado}</span></td>
                    <td><button onclick="verDetalleNota(${n.id})" class="btn-icon">
                        <i data-lucide="printer"></i></button></td>
                </tr>`).join('')}
            </tbody>
        </table>
    </div>`;
    document.getElementById('modalCliente').classList.remove('hidden');
    lucide.createIcons();
}


// ── Modal de asignación de insignia ──────────────────────────────────────────
function abrirModalInsignia(cedula, nombre, compras) {
    const ins_actual = getInsigniaCliente(cedula, compras);
    const niveles = ['Simple', 'Premium', 'Elite'];

    document.getElementById('modalInsigniaBody').innerHTML = `
    <div style="margin-bottom:1rem;padding:.75rem;background:var(--color-gray-50);border-radius:8px">
        <p style="font-weight:700">${nombre}</p>
        <p style="font-size:.85rem;color:var(--color-gray-600)">
            Cédula: ${cedula} · ${compras} compras pagadas</p>
        <p style="font-size:.85rem;margin-top:.25rem">
            Insignia actual: <strong>${ins_actual.icono} ${ins_actual.nombre}</strong>
            <span style="font-size:.7rem;background:${ins_actual.esManual?'#dbeafe':'#dcfce7'};
                color:${ins_actual.esManual?'#1d4ed8':'#166534'};padding:2px 8px;border-radius:20px;margin-left:.4rem">
                ${ins_actual.esManual ? '✏️ Manual' : '⚙️ Auto'}
            </span>
        </p>
    </div>

    <p style="font-weight:700;margin-bottom:.75rem">Selecciona la insignia a asignar:</p>

    ${niveles.map(nivel => `
    <div style="margin-bottom:.75rem">
        <div style="font-size:.75rem;font-weight:700;color:var(--color-gray-500);
            text-transform:uppercase;letter-spacing:1px;margin-bottom:.4rem">
            — ${nivel} —
        </div>
        <div style="display:grid;gap:.4rem">
            ${insignias.filter(i => i.nivel === nivel).map(ins => {
                const esActual = ins.id === ins_actual.id;
                const cumple   = compras >= (ins.comprasMin || 0);
                return `
                <button onclick="asignarInsignia('${cedula}', '${ins.id}')"
                    style="display:flex;align-items:center;gap:.75rem;padding:.6rem .75rem;
                        border-radius:8px;border:2px solid ${esActual ? '#f59e0b' : '#e5e7eb'};
                        background:${esActual ? '#fef9c3' : 'var(--color-white)'};
                        cursor:pointer;text-align:left;width:100%;
                        transition:all .15s">
                    <span style="font-size:1.4rem">${ins.icono}</span>
                    <div style="flex:1">
                        <div style="font-weight:700;font-size:.875rem">
                            ${ins.nombre}
                            ${esActual ? '<span style="font-size:.7rem;color:#92400e"> ← actual</span>' : ''}
                        </div>
                        <div style="font-size:.75rem;color:var(--color-gray-500)">
                            ${ins.comprasMin} compras mín.
                            ${ins.descuento > 0 ? '· '+ins.descuento+'% descuento' : ''}
                            ${!cumple ? ' · <span style="color:#f59e0b">⚠️ No cumple aún</span>' : ' · ✅ Cumple'}
                        </div>
                    </div>
                </button>`;
            }).join('')}
        </div>
    </div>`).join('')}

    <hr style="margin:1rem 0;border-color:var(--color-gray-200)">
    <div class="flex gap-2">
        ${ins_actual.esManual ? `
        <button onclick="quitarInsigniaManual('${cedula}')"
            class="btn btn-secondary btn-sm">
            <i data-lucide="rotate-ccw"></i> Restaurar automática
        </button>` : ''}
        <button onclick="document.getElementById('modalInsignia').classList.add('hidden')"
            class="btn btn-secondary btn-sm" style="margin-left:auto">
            Cerrar
        </button>
    </div>`;

    document.getElementById('modalInsignia').classList.remove('hidden');
    lucide.createIcons();
}

function asignarInsignia(cedula, insigniaId) {
    const ins = insignias.find(i => i.id === insigniaId);
    if (!ins) return;
    setInsigniaOverride(cedula, {
        id:        ins.id,
        nombre:    ins.nombre,
        icono:     ins.icono,
        nivel:     ins.nivel,
        descuento: ins.descuento,
        beneficios:ins.beneficios,
        asignadaEn: new Date().toISOString()
    });
    document.getElementById('modalInsignia').classList.add('hidden');
    showNotification(`✅ Insignia "${ins.icono} ${ins.nombre}" asignada correctamente`, 'success');
    navigateTo('admin-clientes');
}

function quitarInsigniaManual(cedula) {
    const ov = getInsigniasOverrides();
    delete ov[cedula];
    localStorage.setItem('insigniasOverrides', JSON.stringify(ov));
    document.getElementById('modalInsignia').classList.add('hidden');
    showNotification('↩️ Insignia restaurada al modo automático', 'info');
    navigateTo('admin-clientes');
}


// ── Eliminar cliente (papelera) ───────────────────────────────────────────────
function confirmarEliminarCliente(cedula, nombre) {
    if (!confirm(`¿Mover a "${nombre}" a la papelera?\n\nEl cliente desaparecerá de la lista.\nSus notas de venta NO se eliminan.\nPodrás restaurarlo en los próximos 30 días desde la Papelera.`)) return;
    moverClienteAPapelera(cedula);
    showNotification(`🗑️ ${nombre} movido a la papelera (30 días para restaurar)`, 'info');
    navigateTo('admin-clientes');
}

// ── Papelera de clientes ──────────────────────────────────────────────────────
function renderAdminPapeleraClientes() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }
    limpiarPapeleraExpirada();
    const eliminados = getClientesEliminados();
    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>🗑️ Papelera de Clientes</h1>
                <p>Los clientes se eliminan definitivamente después de 30 días</p>
            </div>
            <button onclick="navigateTo('admin-clientes')" class="btn btn-secondary">
                <i data-lucide="arrow-left"></i> Volver
            </button>
        </div>

        ${eliminados.length === 0 ? `
        <div class="alert alert-success">
            <i data-lucide="check-circle"></i>
            <p>La papelera está vacía.</p>
        </div>` : `
        <div class="table-responsive">
            <table class="admin-table">
                <thead><tr>
                    <th>Cliente</th><th>Cédula</th>
                    <th>Eliminado</th><th>Expira en</th><th>Acciones</th>
                </tr></thead>
                <tbody>
                    ${eliminados.map(c => `
                    <tr style="opacity:.75">
                        <td>
                            <strong>${c.nombre}</strong><br>
                            <span style="font-size:.75rem;color:var(--color-gray-500)">${c.email||c.telefono||''}</span>
                        </td>
                        <td>${c.cedula}</td>
                        <td style="font-size:.8rem">${new Date(c.eliminadoEn).toLocaleDateString('es-EC')}</td>
                        <td>
                            <span style="color:${diasRestantes(c.expiraEn) <= 5 ? 'var(--color-error)' : 'var(--color-warning)'}">
                                ${diasRestantes(c.expiraEn)} días
                            </span>
                        </td>
                        <td>
                            <div class="flex gap-1">
                                <button onclick="restaurarCliente('${c.cedula}')"
                                    class="btn btn-success btn-sm" title="Restaurar">
                                    <i data-lucide="rotate-ccw"></i> Restaurar
                                </button>
                                <button onclick="eliminarDefinitivo('${c.cedula}','${c.nombre}')"
                                    class="btn btn-danger btn-sm" title="Eliminar definitivo">
                                    <i data-lucide="x"></i>
                                </button>
                            </div>
                        </td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>

        <div class="alert alert-warning mt-3">
            <i data-lucide="alert-triangle"></i>
            <p><strong>Nota:</strong> Eliminar definitivamente solo oculta al cliente de la lista.
            Sus notas de venta y datos fiscales se conservan para cumplimiento RIMPE.</p>
        </div>`}
    </div>`;
}

function restaurarCliente(cedula) {
    restaurarClienteDePapelera(cedula);
    showNotification('✅ Cliente restaurado correctamente', 'success');
    navigateTo('admin-papelera-clientes');
}

function eliminarDefinitivo(cedula, nombre) {
    if (!confirm(`⚠️ ¿Eliminar definitivamente a "${nombre}"?\n\nEsta acción NO se puede deshacer.`)) return;
    restaurarClienteDePapelera(cedula); // quitar de papelera
    // Añadir a lista negra permanente
    const negra = JSON.parse(localStorage.getItem('clientesOcultosPerm') || '[]');
    if (!negra.includes(cedula)) negra.push(cedula);
    localStorage.setItem('clientesOcultosPerm', JSON.stringify(negra));
    // Actualizar lista de ocultos
    const ocultos = JSON.parse(localStorage.getItem('clientesOcultos') || '[]');
    if (!ocultos.includes(cedula)) ocultos.push(cedula);
    localStorage.setItem('clientesOcultos', JSON.stringify(ocultos));
    showNotification('🗑️ Cliente eliminado definitivamente', 'info');
    navigateTo('admin-papelera-clientes');
}

// ========================================
// ESTADÍSTICAS
// ========================================
function renderAdminEstadisticas() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const datos = calcularIngresosMensuales();
    const maxVal = Math.max(...datos, 1);
    const ia = calcularIngresosAnuales();
    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>📊 Estadísticas ${new Date().getFullYear()}</h1>
                <p>Ingresos mensuales y progreso RIMPE</p>
            </div>
            <div class="flex gap-2">
                <button onclick="exportarNotasCSV()" class="btn btn-success btn-sm">
                    <i data-lucide="download"></i> CSV
                </button>
                <button onclick="generarReporteMensualPDF()" class="btn btn-primary btn-sm">
                    <i data-lucide="file-text"></i> Reporte PDF
                </button>
                <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                    <i data-lucide="arrow-left"></i> Panel
                </button>
            </div>
        </div>

        <div class="grid grid-4 mb-4">
            <div class="stat-card stat-primary">
                <i data-lucide="dollar-sign"></i>
                <div><h3>$${ia.totalIngresos.toFixed(2)}</h3><p>Ingresos anuales válidos</p>
                <small>Excluye canceladas</small></div>
            </div>
            <div class="stat-card stat-success">
                <i data-lucide="percent"></i>
                <div><h3>$${ia.margenDisponible.toFixed(2)}</h3><p>Disponible RIMPE</p></div>
            </div>
            <div class="stat-card" style="background:var(--color-gray-50);border-left:4px solid #ef4444">
                <i data-lucide="x-circle" style="color:#ef4444"></i>
                <div>
                    <h3 style="color:#ef4444">${ia.cantidadCanceladas}</h3>
                    <p>Notas canceladas</p>
                    <small style="color:#ef4444">$${ia.montoCancelado.toFixed(2)} anulados</small>
                </div>
            </div>
            <div class="stat-card" style="background:var(--color-gray-50);border-left:4px solid var(--color-info)">
                <i data-lucide="file-check"></i>
                <div><h3>${ia.cantidadNotas}</h3><p>Notas válidas</p></div>
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-body">
                <h3 class="mb-3">Ingresos por Mes (USD)</h3>
                ${datos.map((v, i) => `
                <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.6rem">
                    <span style="min-width:35px;font-weight:700;font-size:0.85rem;color:var(--color-gray-700)">${meses[i]}</span>
                    <div style="flex:1;background:var(--color-gray-200);border-radius:20px;height:30px;overflow:hidden">
                        <div style="width:${(v/maxVal*100).toFixed(1)}%;height:100%;
                            background:linear-gradient(90deg,var(--color-primary),var(--color-primary-dark));
                            border-radius:20px;display:flex;align-items:center;padding:0 10px;min-width:${v>0?'60px':'0'}">
                            ${v > 0 ? `<span style="color:#fff;font-size:0.75rem;font-weight:700;white-space:nowrap">$${v.toFixed(2)}</span>` : ''}
                        </div>
                    </div>
                    ${v === 0 ? '<span style="font-size:0.75rem;color:var(--color-gray-500)">Sin datos</span>' : ''}
                </div>`).join('')}
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h3 class="mb-3">Progreso Límite RIMPE $${infoNegocio.limiteAnual.toLocaleString()}</h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width:${Math.min(ia.porcentajeUsado,100)}%">
                        ${ia.porcentajeUsado.toFixed(1)}%
                    </div>
                </div>
                <p class="text-center mt-2">
                    $${ia.totalIngresos.toFixed(2)} de $${infoNegocio.limiteAnual.toLocaleString()}
                </p>
                ${ia.enRiesgo ? '<div class="alert alert-warning mt-2"><i data-lucide="alert-triangle"></i><p>Superas el 90% del límite. Considera revisar con tu contador.</p></div>' : ''}
            </div>
        </div>
    </div>`;
}

// ========================================
// CONSULTA PÚBLICA DE NOTAS
// ========================================
function buscarNotasCliente() {
    const cedula = document.getElementById('consultaCedula').value.trim();
    if (!cedula || cedula.length !== 10) { showNotification('Ingresa una cédula válida de 10 dígitos', 'error'); return; }
    const notasCliente = buscarNotaPorCedula(cedula);
    const div = document.getElementById('resultadosBusqueda');
    if (notasCliente.length === 0) {
        div.innerHTML = `<div class="alert alert-warning"><i data-lucide="alert-circle"></i>
            <p>No se encontraron notas de venta para esta cédula.</p></div>`;
        lucide.createIcons(); return;
    }
    div.innerHTML = `
    <h3 class="mb-3">Notas encontradas: ${notasCliente.length}</h3>
    <div class="grid grid-2">
        ${notasCliente.map(n => `
        <div class="card"><div class="card-body">
            <div class="nota-header">
                <h4>Nota ${n.numeroNota}</h4>
                <span class="nota-estado ${n.estado}">${estadosNota[n.estado].nombre}</span>
            </div>
            <p><strong>Fecha:</strong> ${n.fechaEmision}</p>
            <p class="nota-total"><strong>Total:</strong> $${n.total.toFixed(2)}</p>
            <div class="nota-items"><strong>Detalle:</strong>
                <ul>${n.items.map(i => `<li>${i.cantidad}x ${i.descripcion}</li>`).join('')}</ul>
            </div>
            <button onclick="verDetalleNota(${n.id})" class="btn btn-primary w-full mt-2">
                <i data-lucide="printer"></i> Ver / Imprimir PDF</button>
        </div></div>`).join('')}
    </div>`;
    lucide.createIcons();
}

// ========================================
// FORMULARIOS PÚBLICOS
// ========================================
function handleRegister() {
    const nombre    = document.getElementById('regNombre').value.trim();
    const email     = document.getElementById('regEmail').value.trim();
    const telefono  = document.getElementById('regTelefono').value.trim();
    const direccion = document.getElementById('regDireccion').value.trim();
    const ciudad    = document.getElementById('regCiudad').value.trim();
    const referencia = document.getElementById('regReferencia').value.trim();
    if (!nombre || !email || !telefono) { showNotification('Por favor completa todos los campos obligatorios', 'error'); return; }
    saveUser({ nombre, email, telefono, direccion, ciudad, referencia, compras: 0, fechaRegistro: new Date().toISOString(), pedidos: [] });
    showNotification('¡Registro exitoso! Bienvenido a Benjamín', 'success');
    navigateTo('perfil');
}


// ========================================
// AUTH CLIENTE — funciones de UI
// ========================================

function switchAuthTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('tabLogin').classList.toggle('active', isLogin);
    document.getElementById('tabRegistro').classList.toggle('active', !isLogin);
    document.getElementById('panelLogin').classList.toggle('hidden', !isLogin);
    document.getElementById('panelRegistro').classList.toggle('hidden', isLogin);
}

function toggleClientePass() {
    const inp  = document.getElementById('lcPass');
    const icon = document.getElementById('lcPassIcon');
    inp.type = inp.type === 'password' ? 'text' : 'password';
    icon.setAttribute('data-lucide', inp.type === 'password' ? 'eye' : 'eye-off');
    lucide.createIcons();
}

async function handleClienteLogin() {
    const email = document.getElementById('lcEmail').value.trim();
    const pass  = document.getElementById('lcPass').value;
    const btn   = document.getElementById('lcBtn');
    const errDiv = document.getElementById('loginClienteError');
    const errMsg = document.getElementById('loginClienteErrorMsg');
    if (!email || !pass) {
        errMsg.textContent = 'Ingresa tu email y contraseña.';
        errDiv.classList.remove('hidden'); return;
    }
    btn.disabled = true;
    btn.innerHTML = '<div class="spinner" style="width:18px;height:18px;border-width:2px;display:inline-block"></div> Verificando...';
    errDiv.classList.add('hidden');
    const result = await clienteLogin(email, pass);
    if (result.ok) {
        showNotification('✅ ¡Bienvenido de vuelta!', 'success');
        navigateTo('perfil');
    } else {
        let msg = 'Email o contraseña incorrectos.';
        if (result.error?.includes('Email not confirmed')) msg = 'Confirma tu email primero (revisa tu bandeja de entrada).';
        errMsg.textContent = msg;
        errDiv.classList.remove('hidden');
        btn.disabled = false;
        btn.innerHTML = '<i data-lucide="log-in"></i> Iniciar Sesión';
        lucide.createIcons();
    }
}

async function handleRegister() {
    const nombre   = document.getElementById('regNombre').value.trim();
    const email    = document.getElementById('regEmail').value.trim();
    const pass     = document.getElementById('regPass')?.value || '';
    const cedula   = document.getElementById('regCedula')?.value.trim() || '';
    const pais     = document.getElementById('regPaisTel')?.value || '+593';
    const telRaw   = document.getElementById('regTelefono').value.trim();
    const telefono = telRaw ? (pais + ' ' + telRaw) : '';
    const errDiv   = document.getElementById('regClienteError');
    const errMsg   = document.getElementById('regClienteErrorMsg');
    if (!nombre || !email || !telefono || !cedula) {
        if (errMsg) errMsg.textContent = 'Completa todos los campos obligatorios (nombre, cédula, teléfono, email)';
        if (errDiv) errDiv.classList.remove('hidden'); return;
    }
    const passConf = document.getElementById('regPassConf')?.value || '';
    if (pass && pass.length < 6) {
        if (errMsg) errMsg.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        if (errDiv) errDiv.classList.remove('hidden'); return;
    }
    if (pass && passConf && pass !== passConf) {
        if (errMsg) errMsg.textContent = 'Las contraseñas no coinciden. Verifica e intenta de nuevo.';
        if (errDiv) errDiv.classList.remove('hidden'); return;
    }
    const btn = document.getElementById('regBtn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<div class="spinner" style="width:18px;height:18px;border-width:2px;display:inline-block"></div> Creando cuenta...'; }
    if (errDiv) errDiv.classList.add('hidden');
    const perfil = {
        nombre, telefono, cedula,
        direccion:  document.getElementById('regDireccion')?.value.trim() || '',
        ciudad:     document.getElementById('regCiudad')?.value.trim()    || 'Quito',
        referencia: document.getElementById('regReferencia')?.value.trim()|| ''
    };
    const result = pass
        ? await clienteRegister(email, pass, perfil)
        : { ok: true, local: true, _localFallback: true };
    if (result._localFallback) {
        // Registro sin contraseña (modo local)
        const userLocalFb = { ...perfil, email, compras: 0,
            fechaRegistro: new Date().toISOString(), pedidos: [] };
        localStorage.setItem('benjaminUser', JSON.stringify(userLocalFb));
        _registrarClienteEnDB(userLocalFb);
    }
    if (result.ok) {
        if (result.confirmacionRequerida) {
            showNotification('📧 Revisa tu email para confirmar tu cuenta', 'info');
        } else {
            showNotification('✅ ¡Cuenta creada! Bienvenido a Benjamín', 'success');
        }
        navigateTo('perfil');
    } else {
        let msg = result.error || 'Error al crear la cuenta.';
        if (result.error?.includes('already registered')) msg = 'Este email ya está registrado. Usa Iniciar Sesión.';
        if (errMsg) errMsg.textContent = msg;
        if (errDiv) errDiv.classList.remove('hidden');
        if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="user-plus"></i> Crear Cuenta Gratis'; lucide.createIcons(); }
    }
}

async function handleClienteLogout() {
    await clienteLogout();
    showNotification('Sesión cerrada correctamente', 'info');
    navigateTo('inicio');
}

async function handleClienteReset() {
    const email = document.getElementById('lcEmail')?.value.trim();
    if (!email) { showNotification('Ingresa tu email primero', 'error'); return; }
    const result = await clienteResetPassword(email);
    if (result.ok) showNotification('📧 Revisa tu email para restablecer la contraseña', 'success');
    else showNotification('No se pudo enviar el correo. Verifica el email ingresado.', 'error');
}

function handleContactSubmit() {
    const nombre  = document.getElementById('contactNombre').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const telefono = document.getElementById('contactTelefono').value.trim();
    const mensaje  = document.getElementById('contactMensaje').value.trim();
    if (!nombre || !email || !mensaje) { showNotification('Completa todos los campos obligatorios', 'error'); return; }
    const txt = `Hola, soy ${nombre}.\nEmail: ${email}\n${telefono ? 'Tel: '+telefono+'\n' : ''}\n${mensaje}`;
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(txt)}`, '_blank');
    showNotification('Redirigiendo a WhatsApp...', 'success');
    ['contactNombre','contactEmail','contactTelefono','contactMensaje'].forEach(id => {
        const el = document.getElementById(id); if (el) el.value = '';
    });
}

// ========================================
// ADMIN — GESTIÓN DE GALERÍA
// ========================================

function getGaleriaAdmin() {
    const custom = localStorage.getItem('galeriaCustom');
    if (custom) return JSON.parse(custom);
    return JSON.parse(JSON.stringify(proyectos)); // copia del default
}
function saveGaleriaAdmin(data) { localStorage.setItem('galeriaCustom', JSON.stringify(data)); }

function renderAdminGaleria() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }
    const items = getGaleriaAdmin();
    return `
    <div class="fade-in">
        <div class="admin-header">
            <div><h1>🖼️ Gestión de Galería</h1><p>${items.length} proyectos en la galería</p></div>
            <div class="flex gap-2">
                <button onclick="abrirModalGaleria(null)" class="btn btn-primary">
                    <i data-lucide="plus"></i> Nuevo Proyecto
                </button>
                <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                    <i data-lucide="arrow-left"></i> Panel
                </button>
            </div>
        </div>

        ${items.length === 0 ? `<div class="alert alert-warning"><i data-lucide="image"></i>
            <p>Sin proyectos aún. ¡Añade el primero!</p></div>` : `
        <div class="grid grid-3">
            ${items.map(p => `
            <div class="card" style="overflow:hidden">
                <div style="background:var(--color-gray-100);padding:2rem;text-align:center;font-size:3rem">
                    ${p.imagen}
                </div>
                <div class="card-body">
                    <h4 style="margin-bottom:.25rem">${p.titulo}</h4>
                    <span style="font-size:.75rem;background:var(--color-primary);color:#fff;
                        padding:2px 8px;border-radius:20px">${p.categoria}</span>
                    <p style="font-size:.8rem;color:var(--color-gray-600);margin:.5rem 0">${p.descripcion?.substring(0,80)}...</p>
                    <div style="font-size:.75rem;color:var(--color-gray-500);margin-bottom:.75rem">
                        📐 ${p.medidas||'—'} &nbsp;|&nbsp; 🔩 ${p.material||'—'}
                    </div>
                    <div class="flex gap-2">
                        <button onclick="abrirModalGaleria(${p.id})" class="btn btn-secondary btn-sm" style="flex:1">
                            <i data-lucide="edit-2"></i> Editar</button>
                        <button onclick="eliminarGaleriaItem(${p.id})" class="btn btn-danger btn-sm">
                            <i data-lucide="trash-2"></i></button>
                    </div>
                </div>
            </div>`).join('')}
        </div>`}
    </div>

    <div id="modalGaleria" class="modal-overlay hidden">
        <div class="modal-content" style="max-width:520px">
            <div class="modal-header">
                <h2 id="modalGaleriaTitulo">Proyecto</h2>
                <button class="btn-close" onclick="document.getElementById('modalGaleria').classList.add('hidden')">
                    <i data-lucide="x"></i></button>
            </div>
            <div class="modal-body" id="modalGaleriaBody"></div>
        </div>
    </div>`;
}

function abrirModalGaleria(id) {
    const items = getGaleriaAdmin();
    const p = id !== null ? items.find(x => x.id == id) : null;
    document.getElementById('modalGaleriaTitulo').textContent = p ? 'Editar Proyecto' : 'Nuevo Proyecto';
    document.getElementById('modalGaleriaBody').innerHTML = `
    <div class="form-group">
        <label class="form-label">Título *</label>
        <input type="text" id="gpTitulo" class="form-input" value="${p?.titulo||''}">
    </div>
    <div class="grid grid-2">
        <div class="form-group">
            <label class="form-label">Categoría</label>
            <input type="text" id="gpCat" class="form-input" value="${p?.categoria||''}">
        </div>
        <div class="form-group">
            <label class="form-label">Emoji / Icono</label>
            <input type="text" id="gpImg" class="form-input" value="${p?.imagen||'🏗️'}" maxlength="4">
        </div>
    </div>
    <div class="form-group">
        <label class="form-label">Descripción</label>
        <textarea id="gpDesc" class="form-textarea" rows="3">${p?.descripcion||''}</textarea>
    </div>
    <div class="grid grid-2">
        <div class="form-group">
            <label class="form-label">Medidas</label>
            <input type="text" id="gpMedidas" class="form-input" value="${p?.medidas||''}" placeholder="2m x 1m">
        </div>
        <div class="form-group">
            <label class="form-label">Material</label>
            <input type="text" id="gpMaterial" class="form-input" value="${p?.material||''}" placeholder="Tol calibre 18">
        </div>
    </div>
    <div class="flex gap-2 mt-3">
        <button onclick="guardarGaleriaItem(${id||'null'})" class="btn btn-primary" style="flex:1">
            <i data-lucide="save"></i> Guardar</button>
        <button onclick="document.getElementById('modalGaleria').classList.add('hidden')" class="btn btn-secondary">Cancelar</button>
    </div>`;
    document.getElementById('modalGaleria').classList.remove('hidden');
    lucide.createIcons();
}

function guardarGaleriaItem(id) {
    const titulo = document.getElementById('gpTitulo').value.trim();
    if (!titulo) { showNotification('El título es obligatorio', 'error'); return; }
    const items = getGaleriaAdmin();
    const data = {
        titulo, categoria: document.getElementById('gpCat').value.trim(),
        imagen: document.getElementById('gpImg').value.trim() || '🏗️',
        descripcion: document.getElementById('gpDesc').value.trim(),
        medidas: document.getElementById('gpMedidas').value.trim(),
        material: document.getElementById('gpMaterial').value.trim(),
        fecha: new Date().toISOString().split('T')[0]
    };
    if (id !== null && id !== 'null') {
        const idx = items.findIndex(p => p.id == id);
        if (idx !== -1) items[idx] = { ...items[idx], ...data };
    } else {
        data.id = Date.now();
        items.push(data);
    }
    saveGaleriaAdmin(items);
    document.getElementById('modalGaleria').classList.add('hidden');
    showNotification(id !== null && id !== 'null' ? '✅ Proyecto actualizado' : '✅ Proyecto añadido', 'success');
    navigateTo('admin-galeria');
}

function eliminarGaleriaItem(id) {
    const items = getGaleriaAdmin();
    const p = items.find(x => x.id == id);
    if (!p) return;
    if (!confirm(`¿Eliminar "${p.titulo}"?`)) return;
    saveGaleriaAdmin(items.filter(x => x.id != id));
    showNotification('Proyecto eliminado', 'info');
    navigateTo('admin-galeria');
}

// ========================================
// ADMIN — GESTIÓN DE BLOG
// ========================================

function getBlogAdmin() {
    const custom = localStorage.getItem('blogCustom');
    if (custom) return JSON.parse(custom);
    return JSON.parse(JSON.stringify(articulos));
}
function saveBlogAdmin(data) { localStorage.setItem('blogCustom', JSON.stringify(data)); }

function renderAdminBlog() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }
    const items = getBlogAdmin();
    return `
    <div class="fade-in">
        <div class="admin-header">
            <div><h1>📝 Gestión de Blog</h1><p>${items.length} artículos publicados</p></div>
            <div class="flex gap-2">
                <button onclick="abrirModalBlog(null)" class="btn btn-primary">
                    <i data-lucide="plus"></i> Nuevo Artículo
                </button>
                <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                    <i data-lucide="arrow-left"></i> Panel
                </button>
            </div>
        </div>

        <div class="grid grid-3">
            ${items.map(a => `
            <div class="card">
                <div class="card-body">
                    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">
                        <span style="font-size:2rem">${a.imagen}</span>
                        <div>
                            <span style="font-size:.7rem;background:var(--color-primary);color:#fff;
                                padding:2px 8px;border-radius:20px">${a.categoria}</span>
                            <p style="font-size:.75rem;color:var(--color-gray-500);margin-top:2px">
                                ${new Date(a.fecha).toLocaleDateString('es-EC')}</p>
                        </div>
                    </div>
                    <h4 style="margin-bottom:.5rem;font-size:.95rem">${a.titulo}</h4>
                    <p style="font-size:.8rem;color:var(--color-gray-600);margin-bottom:.75rem">
                        ${a.resumen?.substring(0,80)}...</p>
                    <div class="flex gap-2">
                        <button onclick="abrirModalBlog(${a.id})" class="btn btn-secondary btn-sm" style="flex:1">
                            <i data-lucide="edit-2"></i> Editar</button>
                        <button onclick="eliminarBlogItem(${a.id})" class="btn btn-danger btn-sm">
                            <i data-lucide="trash-2"></i></button>
                    </div>
                </div>
            </div>`).join('')}
        </div>
    </div>

    <div id="modalBlog" class="modal-overlay hidden">
        <div class="modal-content" style="max-width:600px">
            <div class="modal-header">
                <h2 id="modalBlogTitulo">Artículo</h2>
                <button class="btn-close" onclick="document.getElementById('modalBlog').classList.add('hidden')">
                    <i data-lucide="x"></i></button>
            </div>
            <div class="modal-body" id="modalBlogBody"></div>
        </div>
    </div>`;
}

function abrirModalBlog(id) {
    const items = getBlogAdmin();
    const a = id !== null ? items.find(x => x.id == id) : null;
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('modalBlogTitulo').textContent = a ? 'Editar Artículo' : 'Nuevo Artículo';
    document.getElementById('modalBlogBody').innerHTML = `
    <div class="form-group">
        <label class="form-label">Título *</label>
        <input type="text" id="baTitulo" class="form-input" value="${a?.titulo||''}">
    </div>
    <div class="grid grid-2">
        <div class="form-group">
            <label class="form-label">Categoría</label>
            <input type="text" id="baCat" class="form-input" value="${a?.categoria||''}" placeholder="Guías Técnicas">
        </div>
        <div class="form-group">
            <label class="form-label">Fecha</label>
            <input type="date" id="baFecha" class="form-input" value="${a?.fecha||hoy}">
        </div>
    </div>
    <div class="grid grid-2">
        <div class="form-group">
            <label class="form-label">Emoji</label>
            <input type="text" id="baImg" class="form-input" value="${a?.imagen||'📝'}" maxlength="4">
        </div>
        <div></div>
    </div>
    <div class="form-group">
        <label class="form-label">Resumen *</label>
        <textarea id="baResumen" class="form-textarea" rows="2">${a?.resumen||''}</textarea>
    </div>
    <div class="form-group">
        <label class="form-label">Contenido completo *</label>
        <textarea id="baContenido" class="form-textarea" rows="6">${a?.contenido||''}</textarea>
    </div>
    <div class="flex gap-2 mt-3">
        <button onclick="guardarBlogItem(${id||'null'})" class="btn btn-primary" style="flex:1">
            <i data-lucide="save"></i> Publicar</button>
        <button onclick="document.getElementById('modalBlog').classList.add('hidden')" class="btn btn-secondary">Cancelar</button>
    </div>`;
    document.getElementById('modalBlog').classList.remove('hidden');
    lucide.createIcons();
}

function guardarBlogItem(id) {
    const titulo = document.getElementById('baTitulo').value.trim();
    const resumen = document.getElementById('baResumen').value.trim();
    const contenido = document.getElementById('baContenido').value.trim();
    if (!titulo || !resumen || !contenido) { showNotification('Completa los campos obligatorios', 'error'); return; }
    const items = getBlogAdmin();
    const data = {
        titulo, resumen, contenido,
        categoria: document.getElementById('baCat').value.trim() || 'General',
        fecha: document.getElementById('baFecha').value,
        imagen: document.getElementById('baImg').value.trim() || '📝'
    };
    if (id !== null && id !== 'null') {
        const idx = items.findIndex(a => a.id == id);
        if (idx !== -1) items[idx] = { ...items[idx], ...data };
    } else {
        data.id = Date.now();
        items.push(data);
    }
    saveBlogAdmin(items);
    document.getElementById('modalBlog').classList.add('hidden');
    showNotification(id !== null && id !== 'null' ? '✅ Artículo actualizado' : '✅ Artículo publicado', 'success');
    navigateTo('admin-blog');
}

function eliminarBlogItem(id) {
    const items = getBlogAdmin();
    const a = items.find(x => x.id == id);
    if (!a) return;
    if (!confirm(`¿Eliminar el artículo "${a.titulo}"?`)) return;
    saveBlogAdmin(items.filter(x => x.id != id));
    showNotification('Artículo eliminado', 'info');
    navigateTo('admin-blog');
}

// ========================================
// FUNCIONES AUXILIARES — Nueva Nota
// ========================================

// Autorelleno de clientes en nueva nota
function buscarClienteNota(query) {
    const div = document.getElementById('resultadosCliente');
    if (!div) return;
    if (!query || query.length < 2) { div.style.display = 'none'; return; }
    const clientes = getClientesList();
    const q = query.toLowerCase();
    const encontrados = clientes.filter(c =>
        c.nombre?.toLowerCase().includes(q) ||
        c.cedula?.includes(q)
    ).slice(0, 6);
    if (encontrados.length === 0) { div.style.display = 'none'; return; }
    div.innerHTML = encontrados.map(c => `
    <div onclick="rellenarClienteNota(${JSON.stringify(c).replace(/"/g,'&quot;')})"
         style="padding:.6rem 1rem;cursor:pointer;border-bottom:1px solid var(--color-gray-100);
                display:flex;justify-content:space-between;align-items:center"
         onmouseover="this.style.background='#fef3c7'" onmouseout="this.style.background=''">
        <div>
            <strong style="font-size:.875rem">${c.nombre}</strong>
            <span style="font-size:.75rem;color:var(--color-gray-500);margin-left:.5rem">${c.cedula}</span>
        </div>
        <span style="font-size:.75rem;color:var(--color-success)">${c.notas?.length||0} notas</span>
    </div>`).join('');
    div.style.display = 'block';
}

function rellenarClienteNota(c) {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val||''; };
    set('clienteNombre',    c.nombre);
    set('clienteCedula',    c.cedula);
    set('clienteTelefono',  c.telefono);
    set('clienteEmail',     c.email);
    set('clienteDireccion', c.direccion);
    set('buscarCliente', '');
    const div = document.getElementById('resultadosCliente');
    if (div) div.style.display = 'none';
    showNotification(`✅ Cliente "${c.nombre}" cargado`, 'success');
}

// Selector de producto desde el catálogo
function abrirSelectorProducto(btnEl) {
    const cat = getProductosCatalogo();
    const todos = [
        ...( cat.muebleriaInterior  || []),
        ...( cat.muebleriaExterior  || []),
        ...( cat.cerrajeriaExterior || [])
    ];
    const inputDesc  = btnEl.closest('.form-group').querySelector('.item-descripcion');
    const inputPrecio = btnEl.closest('.item-row')?.querySelector('.item-precio');

    // Crear modal ligero
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem';
    overlay.innerHTML = `
    <div style="background:#fff;border-radius:12px;max-width:480px;width:100%;max-height:80vh;overflow:hidden;display:flex;flex-direction:column">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--color-gray-200);display:flex;justify-content:space-between;align-items:center">
            <strong>📦 Elegir Producto del Catálogo</strong>
            <button onclick="this.closest('[style*=fixed]').remove()" style="background:none;border:none;font-size:1.2rem;cursor:pointer">✕</button>
        </div>
        <div style="overflow-y:auto;padding:.5rem">
            ${todos.map(p => `
            <div onclick="seleccionarProductoNota(this)"
                 data-nombre="${p.nombre} (${p.categoria})"
                 data-precio="${p.precio}"
                 style="display:flex;align-items:center;gap:.75rem;padding:.75rem;
                        border-radius:8px;cursor:pointer;margin-bottom:.25rem"
                 onmouseover="this.style.background='#fef3c7'" onmouseout="this.style.background=''">
                <span style="font-size:1.5rem">${p.imagen||'📦'}</span>
                <div style="flex:1">
                    <div style="font-weight:700;font-size:.875rem">${p.nombre}</div>
                    <div style="font-size:.75rem;color:var(--color-gray-500)">${p.categoria} · desde $${p.precio}</div>
                </div>
                <span style="font-weight:700;color:var(--color-primary)">$${p.precio}</span>
            </div>`).join('')}
        </div>
    </div>`;
    // Guardar referencia a los inputs
    overlay._inputDesc  = inputDesc;
    overlay._inputPrecio = inputPrecio;
    // Event delegation — un solo listener en el overlay
    overlay.addEventListener('click', (e) => {
        const item = e.target.closest('[data-nombre]');
        if (!item) return;
        const desc   = item.dataset.nombre;
        const precio = item.dataset.precio;
        if (inputDesc)   inputDesc.value  = desc;
        if (inputPrecio && !inputPrecio.value) inputPrecio.value = precio;
        overlay.remove();
        actualizarPreview();
        showNotification('✅ Producto cargado: ' + desc.split('(')[0].trim(), 'success');
    });
    document.body.appendChild(overlay);
}

// ========================================
// SOPORTE Y QUEJAS
// ========================================
function renderSoporte() {
    return `
    <div class="fade-in container-small">
        <div class="page-header text-center">
            <i data-lucide="headphones" class="page-icon"></i>
            <h1>Soporte y Atención al Cliente</h1>
            <p>Estamos aquí para ayudarte con cualquier inconveniente</p>
        </div>

        <div class="grid grid-2 mb-4">
            <div class="card">
                <div class="card-body">
                    <h3 class="mb-3" style="display:flex;align-items:center;gap:.5rem">
                        <i data-lucide="headphones"></i> Contacto de Soporte
                    </h3>
                    <div class="contacto-info">
                        <div class="contacto-item">
                            <i data-lucide="phone"></i>
                            <div>
                                <strong>Soporte Técnico</strong>
                                <p>+593 98 167 6646</p>
                                <a href="https://wa.me/593981676646" target="_blank" class="btn btn-success mt-1 btn-sm">
                                    <i data-lucide="message-circle"></i> WhatsApp Soporte
                                </a>
                            </div>
                        </div>
                        <div class="contacto-item">
                            <i data-lucide="mail"></i>
                            <div>
                                <strong>Email de Soporte</strong>
                                <a href="mailto:mycbenjaminsoporte@gmail.com"
                                   style="color:var(--color-primary);font-weight:600">
                                   mycbenjaminsoporte@gmail.com
                                </a>
                            </div>
                        </div>
                        <div class="contacto-item">
                            <i data-lucide="clock"></i>
                            <div>
                                <strong>Horario de Soporte</strong>
                                <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                                <p>Sábados: 9:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h3 class="mb-3" style="display:flex;align-items:center;gap:.5rem">
                        <i data-lucide="alert-triangle"></i> Portal de Quejas
                    </h3>
                    <p style="font-size:.875rem;color:var(--color-gray-600);margin-bottom:1rem">
                        ¿Tuviste un problema con tu pedido? Cuéntanos y lo resolveremos en menos de 48 horas.
                    </p>
                    <div class="form-group">
                        <label class="form-label">Número de Nota (opcional)</label>
                        <input type="text" id="quejaNumNota" class="form-input" placeholder="S 001-001-00-0000001">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Tu Nombre *</label>
                        <input type="text" id="quejaNombre" class="form-input" placeholder="Juan Pérez"
                            value="${getUser()?.nombre||''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Tipo de inconveniente *</label>
                        <select id="quejaTipo" class="form-select">
                            <option value="">Selecciona...</option>
                            <option value="Retraso en entrega">Retraso en entrega</option>
                            <option value="Calidad del producto">Calidad del producto</option>
                            <option value="Instalación incorrecta">Instalación incorrecta</option>
                            <option value="Error en la nota de venta">Error en la nota de venta</option>
                            <option value="Garantía / reclamo">Garantía / reclamo</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Descripción del problema *</label>
                        <textarea id="quejaDesc" class="form-textarea" rows="4"
                            placeholder="Describe detalladamente lo que ocurrió..."></textarea>
                    </div>
                    <button onclick="enviarQueja()" class="btn btn-primary w-full">
                        <i data-lucide="send"></i> Enviar Queja / Reclamo
                    </button>
                </div>
            </div>
        </div>
    </div>`;
}

function enviarQueja() {
    const nombre = document.getElementById('quejaNombre').value.trim();
    const tipo   = document.getElementById('quejaTipo').value;
    const desc   = document.getElementById('quejaDesc').value.trim();
    const nota   = document.getElementById('quejaNumNota').value.trim();
    if (!nombre || !tipo || !desc) { showNotification('Completa los campos obligatorios', 'error'); return; }
    const msg = `🚨 *QUEJA / RECLAMO*\n\nNombre: ${nombre}\nTipo: ${tipo}${nota ? '\nNota: '+nota : ''}\n\nDescripción:\n${desc}`;
    window.open(`https://wa.me/593981676646?text=${encodeURIComponent(msg)}`, '_blank');
    showNotification('Reclamo enviado. Te responderemos en menos de 48 horas.', 'success');
}

// ========================================
// PERFIL — Fondo dinámico por insignia
// ========================================
function getGradientInsignia(nivel, esManual) {
    const gradients = {
        'Simple':  'linear-gradient(135deg, var(--color-gray-800) 0%, var(--color-gray-700) 100%)',
        'Premium': 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #1e3a5f 100%)',
        'Elite':   'linear-gradient(135deg, #1a0533 0%, #7c3aed 30%, #c026d3 70%, #1a0533 100%)',
    };
    return gradients[nivel] || gradients['Simple'];
}

// ========================================
// CARRITO — WhatsApp robusto
// ========================================
function enviarPedidoWhatsApp() {
    const cart    = getCart();
    const user    = getUser();
    const descuento = getDescuentoActual();

    if (!cart || cart.length === 0) {
        showNotification('Tu carrito está vacío', 'error');
        return;
    }

    let mensaje = `¡Hola! Quiero realizar un pedido desde el sitio de Mueblería y Cerrajería "Benjamín":\n\n`;
    let subtotal = 0;

    cart.forEach((item, i) => {
        const nombre   = item.nombre  || 'Producto';
        const cantidad = item.config?.cantidad || item.cantidad || 1;
        const precio   = item.precioTotal || 0;
        const color    = item.config?.color    || '—';
        const material = item.config?.material || '—';
        const acabado  = item.config?.acabado  || '—';
        const entrega  = item.config?.tipoEntrega === 'terminada'
            ? 'Terminada (incluye instalación)' : 'Rústica (retiro en taller)';

        mensaje += `${i+1}. ${cantidad}x ${nombre}\n`;
        mensaje += `   Color: ${color} | Material: ${material} | Acabado: ${acabado}\n`;
        mensaje += `   Entrega: ${entrega}\n`;
        mensaje += `   Subtotal: $${precio.toFixed(2)}\n\n`;
        subtotal += precio;
    });

    let total = subtotal;
    if (descuento > 0) {
        const ahorro = subtotal * (descuento / 100);
        total = subtotal - ahorro;
        mensaje += `Subtotal: $${subtotal.toFixed(2)}\n`;
        mensaje += `Descuento (${descuento}%): -$${ahorro.toFixed(2)}\n`;
    }
    mensaje += `TOTAL APROXIMADO: $${total.toFixed(2)}\n`;
    mensaje += `\n⚠️ Precio final se confirma según especificaciones exactas.\n`;

    if (user) {
        mensaje += `\n--- MIS DATOS ---\n`;
        mensaje += `Nombre: ${user.nombre}\n`;
        if (user.cedula)    mensaje += `Cédula: ${user.cedula}\n`;
        if (user.email)     mensaje += `Email: ${user.email}\n`;
        if (user.telefono)  mensaje += `Teléfono: ${user.telefono}\n`;
        if (user.direccion) mensaje += `Dirección: ${user.direccion}\n`;
        if (user.ciudad)    mensaje += `Ciudad: ${user.ciudad}\n`;
    }

    const url = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    // Guardar pedido y limpiar carrito
    if (typeof savePedido === 'function') {
        savePedido({ items: cart, total, descuento, mensaje });
    }
    if (typeof clearCart === 'function') clearCart();

    showNotification('✅ Redirigiendo a WhatsApp...', 'success');
}

// ========================================
// ADMIN — GESTIÓN DE TESTIMONIOS
// ========================================

function renderAdminTestimonios() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }

    const todos  = typeof getTestimoniosDB === 'function' ? getTestimoniosDB() : [];
    const stats  = typeof getEstadisticasTestimonios === 'function' ? getEstadisticasTestimonios() : {};
    const filtro = window._filtroTestAdmin || 'pendiente';

    const filtrados = filtro === 'todos' ? todos : todos.filter(t => t.estado === filtro);

    const estadoConfig = {
        pendiente: { label: 'Pendiente', color: '#eab308', bg: '#fef9c3'  },
        aprobado:  { label: 'Aprobado',  color: '#10b981', bg: '#dcfce7'  },
        destacado: { label: 'Destacado', color: '#f59e0b', bg: '#fef3c7'  },
        rechazado: { label: 'Rechazado', color: '#ef4444', bg: '#fee2e2'  },
    };

    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>⭐ Gestión de Testimonios</h1>
                <p>${stats.total||0} total · 
                   <span style="color:#eab308">${stats.pendientes||0} pendientes</span> · 
                   <span style="color:#10b981">${stats.aprobados||0} publicados</span> · 
                   <span style="color:#f59e0b">${stats.destacados||0} destacados</span> · 
                   Promedio: ${'★'.repeat(Math.round(parseFloat(stats.promedio||5)))} ${stats.promedio||'—'}
                </p>
            </div>
            <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                <i data-lucide="arrow-left"></i> Panel
            </button>
        </div>

        <!-- Filtros -->
        <div class="flex gap-2 mb-4" style="flex-wrap:wrap">
            ${['pendiente','aprobado','destacado','rechazado','todos'].map(f => {
                const ec  = estadoConfig[f] || { label: 'Todos', color: 'var(--color-gray-600)', bg: 'var(--color-gray-100)' };
                const cnt = f === 'todos' ? todos.length : todos.filter(t => t.estado === f).length;
                const act = filtro === f;
                return `<button onclick="filtrarTestAdmin('${f}')"
                    style="padding:6px 14px;border-radius:20px;border:2px solid ${ec.color};
                           background:${act ? ec.color : 'transparent'};
                           color:${act ? '#fff' : ec.color};
                           font-weight:700;font-size:.8rem;cursor:pointer;transition:all .2s">
                    ${ec.label||'Todos'} (${cnt})
                </button>`;
            }).join('')}
        </div>

        ${filtrados.length === 0 ? `
        <div class="alert alert-warning">
            <i data-lucide="message-square"></i>
            <p>No hay testimonios en este estado.</p>
        </div>` : `
        <div class="grid grid-2" id="gridTestAdmin">
            ${filtrados.map(t => {
                const ec     = estadoConfig[t.estado] || estadoConfig.pendiente;
                const stars  = '★'.repeat(t.calificacion||5) + '☆'.repeat(5-(t.calificacion||5));
                return `
                <div class="card" style="border-left:4px solid ${ec.color}">
                    <div class="card-body">
                        <!-- Cabecera -->
                        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">
                            <span style="font-size:2rem">${t.imagen||'👤'}</span>
                            <div style="flex:1">
                                <strong>${t.nombre}</strong>
                                <div style="font-size:.75rem;color:var(--color-gray-500)">
                                    Cédula: ${t.cedula||'—'} · ${new Date(t.fechaEnvio||t.fecha).toLocaleDateString('es-EC')}
                                </div>
                            </div>
                            <span style="background:${ec.bg};color:${ec.color};padding:3px 10px;
                                border-radius:20px;font-size:.7rem;font-weight:700">
                                ${ec.label}
                            </span>
                        </div>

                        <!-- Calificación y proyecto -->
                        <div style="color:#f59e0b;font-size:1rem;margin-bottom:.25rem">${stars}</div>
                        <div style="font-size:.8rem;font-weight:700;color:var(--color-primary);margin-bottom:.5rem">
                            📦 ${t.proyecto}
                        </div>

                        <!-- Texto -->
                        <p style="font-size:.875rem;color:var(--color-gray-700);margin-bottom:.75rem;
                                  font-style:italic;border-left:3px solid var(--color-gray-200);
                                  padding-left:.75rem">
                            "${t.texto}"
                        </p>

                        ${t.motivoRechazo ? `
                        <div style="background:#fee2e2;padding:.5rem .75rem;border-radius:6px;
                                    font-size:.75rem;color:#991b1b;margin-bottom:.5rem">
                            Motivo rechazo: ${t.motivoRechazo}
                        </div>` : ''}

                        <!-- Acciones -->
                        <div class="flex gap-1" style="flex-wrap:wrap">
                            ${t.estado === 'pendiente' || t.estado === 'rechazado' ? `
                            <button onclick="adminAccionTestimonio('aprobar',${t.id})"
                                class="btn btn-success btn-sm">
                                <i data-lucide="check"></i> Aprobar
                            </button>` : ''}

                            ${t.estado === 'aprobado' || t.estado === 'destacado' ? `
                            <button onclick="adminAccionTestimonio('destacar',${t.id})"
                                style="padding:5px 12px;border-radius:6px;border:2px solid #f59e0b;
                                       background:${t.estado==='destacado'?'#f59e0b':'transparent'};
                                       color:${t.estado==='destacado'?'#fff':'#f59e0b'};
                                       font-weight:700;font-size:.8rem;cursor:pointer">
                                <i data-lucide="star"></i> ${t.estado==='destacado'?'Quitar destaque':'Destacar'}
                            </button>` : ''}

                            ${t.estado !== 'rechazado' ? `
                            <button onclick="adminAccionTestimonio('rechazar',${t.id})"
                                class="btn btn-secondary btn-sm">
                                <i data-lucide="x"></i> Rechazar
                            </button>` : ''}

                            <button onclick="adminAccionTestimonio('eliminar',${t.id})"
                                class="btn btn-danger btn-sm" style="margin-left:auto">
                                <i data-lucide="trash-2"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
            }).join('')}
        </div>`}
    </div>`;
}

function filtrarTestAdmin(filtro) {
    window._filtroTestAdmin = filtro;
    const main = document.getElementById('mainContent');
    if (main) { main.innerHTML = renderAdminTestimonios(); lucide.createIcons(); }
}

function adminAccionTestimonio(accion, id) {
    if (accion === 'aprobar') {
        adminAprobarTestimonio(id);
        showNotification('✅ Testimonio aprobado y publicado', 'success');
    } else if (accion === 'destacar') {
        adminDestacarTestimonio(id);
        const t = getTestimoniosDB().find(x => x.id === id);
        showNotification(t?.estado === 'destacado' ? '⭐ Destacado en la página de inicio' : '↩ Destaque removido', 'success');
    } else if (accion === 'rechazar') {
        const motivo = prompt('Motivo del rechazo (opcional):') || 'No cumple los requisitos de publicación';
        adminRechazarTestimonio(id, motivo);
        showNotification('Testimonio rechazado', 'info');
    } else if (accion === 'eliminar') {
        if (!confirm('¿Eliminar este testimonio? No se puede deshacer.')) return;
        adminEliminarTestimonio(id);
        showNotification('Testimonio eliminado', 'info');
    }
    filtrarTestAdmin(window._filtroTestAdmin || 'pendiente');
}

// ========================================
// ADMIN — SEGUIMIENTO DE PEDIDOS
// ========================================

const ESTADOS_PEDIDO = {
    'por-iniciar': { label: 'Por iniciar', color: '#94a3b8', bg: '#f1f5f9', icon: '📋', siguiente: 'en-proceso'  },
    'en-proceso':  { label: 'En proceso',  color: '#f59e0b', bg: '#fef9c3', icon: '🔨', siguiente: 'listo'       },
    'listo':       { label: 'Listo',       color: '#10b981', bg: '#dcfce7', icon: '✅', siguiente: 'entregado'   },
    'entregado':   { label: 'Entregado',   color: '#6366f1', bg: '#ede9fe', icon: '📦', siguiente: null          },
};

function renderAdminPedidos() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }

    const todos     = getPedidos();
    const filtro    = window._filtroPedidos || 'por-iniciar';
    const filtrados = filtro === 'todos' ? todos : todos.filter(p => p.estado === filtro);

    // Conteos por estado
    const conteos = Object.keys(ESTADOS_PEDIDO).reduce((acc, k) => {
        acc[k] = todos.filter(p => p.estado === k).length;
        return acc;
    }, { todos: todos.length });

    // Ordenar: más recientes primero
    const ordenados = [...filtrados].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>📦 Seguimiento de Pedidos</h1>
                <p>${todos.length} pedidos totales ·
                   <span style="color:#f59e0b">${conteos['por-iniciar']} por iniciar</span> ·
                   <span style="color:#f59e0b">${conteos['en-proceso']} en proceso</span> ·
                   <span style="color:#10b981">${conteos['listo']} listos</span> ·
                   <span style="color:#6366f1">${conteos['entregado']} entregados</span>
                </p>
            </div>
            <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                <i data-lucide="arrow-left"></i> Panel
            </button>
        </div>

        <!-- Filtros por estado -->
        <div class="flex gap-2 mb-4" style="flex-wrap:wrap">
            ${[['todos','Todos',conteos.todos,'#64748b'],
               ...Object.entries(ESTADOS_PEDIDO).map(([k,v]) => [k, v.label, conteos[k], v.color])
              ].map(([k, label, cnt, color]) => {
                const act = filtro === k;
                return `<button onclick="filtrarPedidosAdmin('${k}')"
                    style="padding:6px 16px;border-radius:20px;border:2px solid ${color};
                           background:${act ? color : 'transparent'};
                           color:${act ? '#fff' : color};
                           font-weight:700;font-size:.8rem;cursor:pointer;transition:all .2s">
                    ${ESTADOS_PEDIDO[k]?.icon||'📦'} ${label} (${cnt})
                </button>`;
              }).join('')}
        </div>

        ${ordenados.length === 0 ? `
        <div class="alert alert-warning">
            <i data-lucide="package"></i>
            <p>No hay pedidos en este estado.</p>
        </div>` : `
        <div style="display:grid;gap:1rem">
            ${ordenados.map(p => _renderPedidoAdminCard(p)).join('')}
        </div>`}
    </div>`;
}

function _renderPedidoAdminCard(p) {
    const ep      = ESTADOS_PEDIDO[p.estado] || ESTADOS_PEDIDO['por-iniciar'];
    const pasos   = Object.keys(ESTADOS_PEDIDO);
    const idxAct  = pasos.indexOf(p.estado);
    const puedeAvanzar = ep.siguiente !== null;

    // Calcular número de pedido secuencial por email
    const todosDe = getPedidos().filter(x => x.usuario === p.usuario)
                                .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    const numPedido = todosDe.findIndex(x => x.id === p.id) + 1;

    const items = (p.items || []);
    const total = p.total || items.reduce((s, i) => s + (i.precioTotal || 0), 0);

    return `
    <div class="card" style="border-left:5px solid ${ep.color}">
        <div class="card-body">
            <!-- Cabecera -->
            <div style="display:flex;align-items:flex-start;justify-content:space-between;
                        gap:1rem;flex-wrap:wrap;margin-bottom:1rem">
                <div>
                    <div style="display:flex;align-items:center;gap:.75rem">
                        <strong style="font-size:1rem">Pedido #${numPedido}</strong>
                        <span style="background:${ep.bg};color:${ep.color};padding:3px 12px;
                            border-radius:20px;font-size:.75rem;font-weight:700">
                            ${ep.icon} ${ep.label}
                        </span>
                    </div>
                    <div style="font-size:.8rem;color:var(--color-gray-500);margin-top:.25rem">
                        👤 ${p.usuario||'—'} ·
                        📅 ${new Date(p.fecha).toLocaleDateString('es-EC',{day:'2-digit',month:'short',year:'numeric'})}
                        ${p.ultimaActualizacion
                            ? ' · Actualizado: '+new Date(p.ultimaActualizacion).toLocaleDateString('es-EC')
                            : ''}
                    </div>
                </div>
                <div style="font-size:1.25rem;font-weight:900;color:var(--color-primary)">
                    $${total.toFixed(2)}
                </div>
            </div>

            <!-- Barra de progreso visual -->
            <div style="display:flex;gap:0;margin-bottom:1.25rem">
                ${pasos.map((paso, j) => {
                    const ep2   = ESTADOS_PEDIDO[paso];
                    const activo   = j <= idxAct;
                    const current  = j === idxAct;
                    return `
                    <div style="flex:1;text-align:center">
                        <div style="height:6px;background:${activo ? ep.color : '#e2e8f0'};
                            ${j===0?'border-radius:6px 0 0 6px':''}
                            ${j===pasos.length-1?'border-radius:0 6px 6px 0':''}
                            transition:background .4s"></div>
                        <div style="margin-top:.35rem;font-size:.65rem;
                            color:${current ? ep.color : activo ? '#64748b' : 'var(--color-gray-300)'};
                            font-weight:${current ? '900' : '400'}">
                            ${ep2.icon} ${ep2.label}
                        </div>
                    </div>`;
                }).join('')}
            </div>

            <!-- Items del pedido -->
            <div style="background:var(--color-gray-50);border-radius:8px;padding:.75rem;margin-bottom:1rem">
                ${items.length > 0
                    ? items.map(it => `
                        <div style="display:flex;justify-content:space-between;
                                    font-size:.8rem;padding:.2rem 0;
                                    border-bottom:1px solid var(--color-gray-200)">
                            <span>${it.config?.cantidad||it.cantidad||1}x <strong>${it.nombre||'Producto'}</strong>
                                ${it.config?.color ? ' · '+it.config.color : ''}
                                ${it.config?.material ? ' · '+it.config.material : ''}
                            </span>
                            <span style="font-weight:700">$${(it.precioTotal||0).toFixed(2)}</span>
                        </div>`).join('')
                    : `<p style="font-size:.8rem;color:var(--color-gray-500);margin:0">Sin detalle de items</p>`}
                ${p.descuento > 0 ? `
                <div style="font-size:.8rem;color:var(--color-success);text-align:right;margin-top:.25rem">
                    Descuento aplicado: -$${(p.descuento||0).toFixed(2)}
                </div>` : ''}
            </div>

            <!-- Acciones de seguimiento -->
            <div style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center">
                ${puedeAvanzar ? `
                <button onclick="avanzarEstadoPedido('${p.id}')"
                    style="flex:1;min-width:180px;padding:10px 16px;border-radius:8px;border:none;
                           background:${ESTADOS_PEDIDO[ep.siguiente].color};color:#fff;
                           font-weight:700;font-size:.875rem;cursor:pointer;
                           display:flex;align-items:center;justify-content:center;gap:.5rem;
                           transition:opacity .2s"
                    onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
                    <span>${ESTADOS_PEDIDO[ep.siguiente].icon}</span>
                    Marcar como: ${ESTADOS_PEDIDO[ep.siguiente].label}
                    <i data-lucide="chevron-right" style="width:16px;height:16px"></i>
                </button>` : `
                <span style="flex:1;text-align:center;color:var(--color-success);
                    font-weight:700;font-size:.875rem">
                    ✅ Pedido completado
                </span>`}

                <button onclick="cambiarEstadoPedidoModal('${p.id}')"
                    class="btn btn-secondary btn-sm" title="Cambiar a cualquier estado">
                    <i data-lucide="refresh-cw"></i> Estado
                </button>

                <a href="https://wa.me/${p.usuario?.replace(/[^0-9]/g,'')||contactInfo?.whatsapp}?text=${encodeURIComponent('Hola '+p.usuario+', tu pedido #'+numPedido+' ahora está: '+ep.label+' '+ep.icon)}"
                   target="_blank" class="btn btn-secondary btn-sm" title="Notificar por WhatsApp">
                    <i data-lucide="message-circle"></i> Notificar
                </a>
            </div>

            ${p.notaAdmin ? `
            <div style="margin-top:.75rem;background:#fef3c7;padding:.5rem .75rem;
                        border-radius:6px;font-size:.8rem">
                📝 <strong>Nota:</strong> ${p.notaAdmin}
            </div>` : ''}

            <!-- Campo para nota interna -->
            <div style="margin-top:.75rem;display:flex;gap:.5rem">
                <input type="text" id="nota_${p.id}" class="form-input"
                    style="font-size:.8rem;padding:.4rem .75rem"
                    placeholder="Añadir nota interna (visible solo para ti)..."
                    value="${p.notaAdmin||''}">
                <button onclick="guardarNotaPedido('${p.id}')"
                    class="btn btn-secondary btn-sm" title="Guardar nota">
                    <i data-lucide="save"></i>
                </button>
            </div>
        </div>
    </div>`;
}

// ── Avanzar al siguiente estado ──────────────────────────────
function avanzarEstadoPedido(id) {
    const pedidos = getPedidos();
    const idx     = pedidos.findIndex(p => String(p.id) === String(id));
    if (idx === -1) { showNotification('Pedido no encontrado', 'error'); return; }

    const estadoActual = pedidos[idx].estado || 'por-iniciar';
    const ep           = ESTADOS_PEDIDO[estadoActual];
    if (!ep?.siguiente) { showNotification('El pedido ya está en el estado final', 'info'); return; }

    pedidos[idx].estado              = ep.siguiente;
    pedidos[idx].ultimaActualizacion = new Date().toISOString();
    pedidos[idx][`fecha_${ep.siguiente.replace('-','_')}`] = new Date().toISOString();
    localStorage.setItem('benjaminPedidos', JSON.stringify(pedidos));

    const epNuevo = ESTADOS_PEDIDO[ep.siguiente];
    showNotification(`${epNuevo.icon} Pedido actualizado: ${epNuevo.label}`, 'success');
    filtrarPedidosAdmin(window._filtroPedidos || 'por-iniciar');
}

// ── Cambiar a cualquier estado (modal) ───────────────────────
function cambiarEstadoPedidoModal(id) {
    const pedidos = getPedidos();
    const p = pedidos.find(x => String(x.id) === String(id));
    if (!p) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem';
    overlay.innerHTML = `
    <div style="background:#fff;border-radius:12px;max-width:360px;width:100%;padding:1.5rem">
        <h3 style="margin-bottom:1rem">Cambiar estado del pedido</h3>
        <div style="display:grid;gap:.5rem">
            ${Object.entries(ESTADOS_PEDIDO).map(([k, v]) => `
            <button onclick="setEstadoPedidoDirecto('${id}','${k}');this.closest('[style*=fixed]').remove()"
                style="display:flex;align-items:center;gap:.75rem;padding:.75rem 1rem;
                       border-radius:8px;border:2px solid ${p.estado===k?v.color:'#e5e7eb'};
                       background:${p.estado===k?v.bg:'transparent'};cursor:pointer;
                       font-weight:${p.estado===k?'700':'400'}">
                <span style="font-size:1.2rem">${v.icon}</span>
                <span>${v.label}</span>
                ${p.estado===k?'<span style="margin-left:auto;font-size:.75rem;color:'+v.color+'">← actual</span>':''}
            </button>`).join('')}
        </div>
        <button onclick="this.closest('[style*=fixed]').remove()"
            class="btn btn-secondary w-full mt-3">Cancelar</button>
    </div>`;
    document.body.appendChild(overlay);
    lucide.createIcons();
}

function setEstadoPedidoDirecto(id, nuevoEstado) {
    const pedidos = getPedidos();
    const idx     = pedidos.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return;
    pedidos[idx].estado              = nuevoEstado;
    pedidos[idx].ultimaActualizacion = new Date().toISOString();
    localStorage.setItem('benjaminPedidos', JSON.stringify(pedidos));
    const ep = ESTADOS_PEDIDO[nuevoEstado];
    showNotification(`${ep.icon} Estado actualizado: ${ep.label}`, 'success');
    filtrarPedidosAdmin(window._filtroPedidos || 'todos');
}

// ── Guardar nota interna ──────────────────────────────────────
function guardarNotaPedido(id) {
    const nota    = document.getElementById('nota_'+id)?.value.trim() || '';
    const pedidos = getPedidos();
    const idx     = pedidos.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return;
    pedidos[idx].notaAdmin = nota;
    localStorage.setItem('benjaminPedidos', JSON.stringify(pedidos));
    showNotification('✅ Nota guardada', 'success');
}

// ── Filtrar ───────────────────────────────────────────────────
function filtrarPedidosAdmin(filtro) {
    window._filtroPedidos = filtro;
    const main = document.getElementById('mainContent');
    if (main) { main.innerHTML = renderAdminPedidos(); lucide.createIcons(); }
}

// ========================================
// GESTIÓN DE CLIENTES REGISTRADOS
// Tabla separada de la de notas de venta
// ========================================

function _registrarClienteEnDB(user) {
    const lista = _getClientesRegistrados();
    const clave = user.cedula || user.email;
    if (!clave) return;
    const existeIdx = lista.findIndex(c => (c.cedula && c.cedula === user.cedula) || c.email === user.email);
    const entrada = {
        cedula:       user.cedula || '',
        nombre:       user.nombre || '',
        email:        user.email  || '',
        telefono:     user.telefono || '',
        direccion:    user.direccion || '',
        ciudad:       user.ciudad || 'Quito',
        fechaRegistro: user.fechaRegistro || new Date().toISOString(),
        fuente:       'registro_web'
    };
    if (existeIdx >= 0) {
        lista[existeIdx] = { ...lista[existeIdx], ...entrada };
    } else {
        lista.push(entrada);
    }
    localStorage.setItem('clientesRegistrados', JSON.stringify(lista));
}

function _getClientesRegistrados() {
    return JSON.parse(localStorage.getItem('clientesRegistrados') || '[]');
}

// ── Helpers del formulario de contraseña ────────────────────
function toggleRegPass(inputId, iconId) {
    const inp  = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
    if (icon) {
        icon.setAttribute('data-lucide', inp.type === 'password' ? 'eye' : 'eye-off');
        lucide.createIcons();
    }
}

function validarPassReg() {
    const pass  = document.getElementById('regPass')?.value     || '';
    const conf  = document.getElementById('regPassConf')?.value || '';
    const msg   = document.getElementById('passMatchMsg');
    if (!msg || !conf) return;
    msg.style.display = 'block';
    if (pass === conf) {
        msg.textContent = '✅ Las contraseñas coinciden';
        msg.style.color = 'var(--color-success)';
    } else {
        msg.textContent = '❌ Las contraseñas no coinciden';
        msg.style.color = 'var(--color-error)';
    }
}

// ========================================
// ADMIN — GESTIÓN DE VERIFICACIONES
// ========================================

// La tabla de verificaciones pendientes es GLOBAL (no por usuario)
// Se guarda en 'solicitudesVerificacion' — accesible desde el admin

function getSolicitudesVerificacion() {
    return JSON.parse(localStorage.getItem('solicitudesVerificacion') || '[]');
}
function saveSolicitudesVerificacion(lista) {
    localStorage.setItem('solicitudesVerificacion', JSON.stringify(lista));
}

// El cliente llama esto al enviar por WhatsApp → queda en cola del admin
function registrarSolicitudVerificacion(user) {
    const lista = getSolicitudesVerificacion();
    const clave = user.cedula || user.email;
    const existe = lista.findIndex(s => (s.cedula && s.cedula === user.cedula) || s.email === user.email);
    const entrada = {
        id:           Date.now(),
        cedula:       user.cedula  || '',
        nombre:       user.nombre  || '',
        email:        user.email   || '',
        telefono:     user.telefono|| '',
        estado:       'pendiente',
        fechaSolicitud: new Date().toISOString(),
        metodo:       'WhatsApp (manual)',
        notaAdmin:    ''
    };
    if (existe >= 0) lista[existe] = { ...lista[existe], ...entrada, estado: 'pendiente' };
    else lista.unshift(entrada);
    saveSolicitudesVerificacion(lista);
}

// El admin llama esto para aprobar o rechazar
function resolverVerificacion(id, decision, nota) {
    const lista = getSolicitudesVerificacion();
    const idx   = lista.findIndex(s => s.id === id || s.id === Number(id));
    if (idx === -1) return;
    lista[idx].estado         = decision; // 'aprobado' | 'rechazado'
    lista[idx].fechaResolucion = new Date().toISOString();
    lista[idx].notaAdmin      = nota || '';
    saveSolicitudesVerificacion(lista);

    // Si aprobado → actualizar verificacionesAprobadas para que el cliente lo vea
    if (decision === 'aprobado') {
        const aprobadas = JSON.parse(localStorage.getItem('verificacionesAprobadas') || '{}');
        const clave = lista[idx].cedula || lista[idx].email;
        aprobadas[clave] = {
            aprobado:   true,
            fecha:      new Date().toISOString(),
            aprobadoPor:'admin',
            nombre:     lista[idx].nombre
        };
        localStorage.setItem('verificacionesAprobadas', JSON.stringify(aprobadas));
    }
}

function renderAdminVerificaciones() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }

    const solicitudes = getSolicitudesVerificacion();
    const pendientes  = solicitudes.filter(s => s.estado === 'pendiente');
    const resueltas   = solicitudes.filter(s => s.estado !== 'pendiente');
    const filtro      = window._filtroVerif || 'pendiente';
    const mostrar     = filtro === 'pendiente' ? pendientes : resueltas;

    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>🔐 Verificaciones de Identidad</h1>
                <p>${pendientes.length} pendientes · ${resueltas.length} resueltas</p>
            </div>
            <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                <i data-lucide="arrow-left"></i> Panel
            </button>
        </div>


        <!-- ── Aprobación manual directa (para solicitudes antiguas o sin cola) ── -->
        <div class="card mb-4" style="border:2px solid var(--color-primary)">
            <div class="card-body">
                <h3 style="display:flex;align-items:center;gap:.5rem;margin-bottom:.25rem">
                    <i data-lucide="user-check"></i> Aprobar por cédula / email
                </h3>
                <p style="font-size:.8rem;color:var(--color-gray-600);margin-bottom:.75rem">
                    Usa esto para aprobar solicitudes antiguas o clientes que ya verificaste
                    por WhatsApp pero cuya solicitud no aparece en la cola.
                </p>
                <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:flex-end">
                    <div class="form-group" style="margin:0;flex:1;min-width:200px">
                        <label class="form-label" style="font-size:.75rem">Cédula o Email del cliente *</label>
                        <input type="text" id="aprobManualClave" class="form-input"
                            style="font-size:.875rem;padding:.5rem .75rem"
                            placeholder="1234567890  ó  cliente@gmail.com">
                    </div>
                    <div class="form-group" style="margin:0;flex:1;min-width:180px">
                        <label class="form-label" style="font-size:.75rem">Nombre (opcional)</label>
                        <input type="text" id="aprobManualNombre" class="form-input"
                            style="font-size:.875rem;padding:.5rem .75rem"
                            placeholder="Juan Pérez">
                    </div>
                    <button onclick="aprobarManualDirecto()"
                        class="btn btn-success" style="padding:.5rem 1.25rem;white-space:nowrap">
                        <i data-lucide="check-circle"></i> Aprobar Ahora
                    </button>
                </div>
                <p style="font-size:.72rem;color:var(--color-gray-400);margin-top:.5rem">
                    Solo aprueba clientes cuya cédula ya verificaste en WhatsApp.
                </p>
            </div>
        </div>

        <!-- ── Revocar verificación (foto borrosa, datos incorrectos, etc.) ── -->
        <div class="card mb-4" style="border:2px solid #ef4444">
            <div class="card-body">
                <h3 style="display:flex;align-items:center;gap:.5rem;margin-bottom:.25rem;color:#991b1b">
                    <i data-lucide="shield-off"></i> Revocar verificación
                </h3>
                <p style="font-size:.8rem;color:var(--color-gray-600);margin-bottom:.75rem">
                    El cliente volverá al estado <strong>sin verificar</strong> y podrá repetir el proceso
                    (útil si la foto de la cédula era borrosa, los datos no coincidían, etc.).
                </p>
                <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:flex-end">
                    <div class="form-group" style="margin:0;flex:1;min-width:200px">
                        <label class="form-label" style="font-size:.75rem">Cédula o Email del cliente *</label>
                        <input type="text" id="revocarClave" class="form-input"
                            style="font-size:.875rem;padding:.5rem .75rem"
                            placeholder="1234567890  ó  cliente@gmail.com">
                    </div>
                    <div class="form-group" style="margin:0;flex:1;min-width:180px">
                        <label class="form-label" style="font-size:.75rem">Motivo (lo verá el cliente)</label>
                        <input type="text" id="revocarMotivo" class="form-input"
                            style="font-size:.875rem;padding:.5rem .75rem"
                            placeholder="Ej: Foto de cédula borrosa">
                    </div>
                    <button onclick="revocarVerificacion()"
                        style="padding:.5rem 1.25rem;border-radius:8px;border:2px solid #ef4444;
                               background:#ef4444;color:#fff;font-weight:700;cursor:pointer;
                               white-space:nowrap;display:flex;align-items:center;gap:.4rem">
                        <i data-lucide="rotate-ccw"></i> Revocar
                    </button>
                </div>
            </div>
        </div>

        <div class="flex gap-2 mb-4">
            <button onclick="switchFiltroVerif('pendiente')" id="vBtn-pendiente"
                style="padding:6px 16px;border-radius:20px;font-weight:700;font-size:.8rem;cursor:pointer;
                       border:2px solid #f59e0b;
                       background:${filtro==='pendiente'?'#f59e0b':'transparent'};
                       color:${filtro==='pendiente'?'#fff':'#f59e0b'}">
                ⏳ Pendientes (${pendientes.length})
            </button>
            <button onclick="switchFiltroVerif('resueltas')" id="vBtn-resueltas"
                style="padding:6px 16px;border-radius:20px;font-weight:700;font-size:.8rem;cursor:pointer;
                       border:2px solid var(--color-gray-400);
                       background:${filtro==='resueltas'?'var(--color-gray-400)':'transparent'};
                       color:${filtro==='resueltas'?'#fff':'var(--color-gray-600)'}">
                ✅ Resueltas (${resueltas.length})
            </button>
        </div>

        ${mostrar.length === 0 ? `
        <div class="alert alert-success">
            <i data-lucide="check-circle"></i>
            <p>${filtro === 'pendiente'
                ? '🎉 No hay solicitudes pendientes.'
                : 'No hay solicitudes resueltas aún.'}</p>
        </div>
        <div class="card mt-3" style="background:#f8fafc">
            <div class="card-body">
                <h3 style="margin-bottom:.5rem">ℹ️ ¿Cómo funciona?</h3>
                <ol style="font-size:.875rem;color:var(--color-gray-600);padding-left:1.25rem;line-height:2">
                    <li>El cliente se registra e intenta verificar su identidad</li>
                    <li>Si el QR no funciona, envía un mensaje al soporte (+593 981 676 646)</li>
                    <li>La solicitud aparece aquí automáticamente</li>
                    <li>Tú revisas la foto de la cédula en WhatsApp</li>
                    <li>Apruebas o rechazas desde esta pantalla</li>
                    <li>El cliente puede acceder a sus notas de venta</li>
                </ol>
            </div>
        </div>` : `
        <div style="display:grid;gap:1rem">
            ${mostrar.map(s => {
                const esAprobado  = s.estado === 'aprobado';
                const esRechazado = s.estado === 'rechazado';
                const color = s.estado === 'pendiente' ? '#f59e0b'
                            : s.estado === 'aprobado'  ? '#10b981' : '#ef4444';
                const badgeLabel = s.estado === 'pendiente' ? '⏳ Pendiente'
                                 : s.estado === 'aprobado'  ? '✅ Aprobado' : '❌ Rechazado';
                return `
                <div class="card" style="border-left:4px solid ${color}">
                    <div class="card-body">
                        <div style="display:flex;align-items:flex-start;
                                    justify-content:space-between;gap:1rem;flex-wrap:wrap">
                            <div>
                                <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.25rem">
                                    <strong style="font-size:1rem">${s.nombre||'Sin nombre'}</strong>
                                    <span style="background:${color}22;color:${color};
                                        padding:2px 10px;border-radius:20px;font-size:.7rem;font-weight:700">
                                        ${badgeLabel}
                                    </span>
                                </div>
                                <div style="font-size:.8rem;color:var(--color-gray-500)">
                                    🪪 ${s.cedula||'Sin cédula'} ·
                                    📧 ${s.email||'—'} ·
                                    📱 ${s.telefono||'—'}
                                </div>
                                <div style="font-size:.75rem;color:var(--color-gray-400);margin-top:.2rem">
                                    Solicitó: ${new Date(s.fechaSolicitud).toLocaleString('es-EC')}
                                    ${s.fechaResolucion
                                        ? ' · Resuelto: '+new Date(s.fechaResolucion).toLocaleString('es-EC')
                                        : ''}
                                </div>
                                ${s.notaAdmin ? `<div style="font-size:.8rem;color:var(--color-gray-600);
                                    margin-top:.25rem;font-style:italic">
                                    📝 ${s.notaAdmin}</div>` : ''}
                            </div>

                            <!-- Botón WhatsApp para ver la cédula -->
                            <a href="https://wa.me/593981676646" target="_blank"
                               class="btn btn-secondary btn-sm" style="white-space:nowrap">
                                <i data-lucide="message-circle"></i> Ver en WhatsApp
                            </a>
                        </div>

                        ${s.estado === 'pendiente' ? `
                        <hr style="margin:1rem 0;border-color:var(--color-gray-200)">
                        <div style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:flex-end">
                            <div class="form-group" style="margin:0;flex:1;min-width:200px">
                                <label class="form-label" style="font-size:.75rem">
                                    Nota (opcional — visible para el cliente)
                                </label>
                                <input type="text" id="notaVerif_${s.id}" class="form-input"
                                    style="font-size:.8rem;padding:.4rem .75rem"
                                    placeholder="Ej: Cédula verificada en persona">
                            </div>
                            <button onclick="accionVerificacion(${s.id},'aprobado')"
                                class="btn btn-success btn-sm">
                                <i data-lucide="check"></i> Aprobar
                            </button>
                            <button onclick="accionVerificacion(${s.id},'rechazado')"
                                class="btn btn-secondary btn-sm"
                                style="border:2px solid #ef4444;color:#ef4444">
                                <i data-lucide="x"></i> Rechazar
                            </button>
                        </div>` : ''}

                        ${esAprobado ? `
                        <div style="margin-top:.75rem;font-size:.8rem;color:#166534;
                            background:#dcfce7;padding:.5rem .75rem;border-radius:6px">
                            ✅ Cliente verificado — puede acceder a sus notas de venta
                        </div>` : ''}
                        ${esRechazado ? `
                        <div style="margin-top:.75rem;font-size:.8rem;color:#991b1b;
                            background:#fee2e2;padding:.5rem .75rem;border-radius:6px">
                            ❌ Solicitud rechazada
                            ${s.notaAdmin ? ' — '+s.notaAdmin : ''}
                        </div>` : ''}
                    </div>
                </div>`;
            }).join('')}
        </div>`}
    </div>`;
}

function switchFiltroVerif(filtro) {
    window._filtroVerif = filtro;
    const main = document.getElementById('mainContent');
    if (main) { main.innerHTML = renderAdminVerificaciones(); lucide.createIcons(); }
}

function accionVerificacion(id, decision) {
    const nota = document.getElementById('notaVerif_'+id)?.value.trim() || '';
    if (decision === 'rechazado' && !nota) {
        const motivo = prompt('¿Por qué se rechaza? (aparecerá en el mensaje al cliente):');
        if (motivo === null) return; // canceló
        resolverVerificacion(id, decision, motivo);
    } else {
        resolverVerificacion(id, decision, nota);
    }
    const msg = decision === 'aprobado'
        ? '✅ Verificación aprobada — el cliente ya puede acceder a sus notas'
        : '❌ Solicitud rechazada';
    showNotification(msg, decision === 'aprobado' ? 'success' : 'info');
    switchFiltroVerif(window._filtroVerif || 'pendiente');
}

// ── Aprobación directa por cédula/email (sin necesitar entrada en cola) ──────
function aprobarManualDirecto() {
    const clave  = document.getElementById('aprobManualClave')?.value.trim();
    const nombre = document.getElementById('aprobManualNombre')?.value.trim() || '';

    if (!clave) {
        showNotification('Ingresa la cédula o email del cliente', 'error');
        return;
    }

    // Guardar en verificacionesAprobadas — la clave puede ser cédula o email
    const aprobadas = JSON.parse(localStorage.getItem('verificacionesAprobadas') || '{}');
    aprobadas[clave] = {
        aprobado:   true,
        fecha:      new Date().toISOString(),
        aprobadoPor:'admin-manual',
        nombre:     nombre
    };
    localStorage.setItem('verificacionesAprobadas', JSON.stringify(aprobadas));

    // También crear/actualizar entrada en la cola como resuelta (para historial)
    const lista = getSolicitudesVerificacion();
    const existe = lista.findIndex(s => s.cedula === clave || s.email === clave);
    if (existe >= 0) {
        lista[existe].estado          = 'aprobado';
        lista[existe].fechaResolucion = new Date().toISOString();
        lista[existe].notaAdmin       = 'Aprobado manualmente por el administrador';
    } else {
        // No estaba en la cola — añadirla ya resuelta para el historial
        lista.unshift({
            id:             Date.now(),
            cedula:         /^\d+$/.test(clave) ? clave : '',
            email:          /^\d+$/.test(clave) ? '' : clave,
            nombre:         nombre,
            telefono:       '',
            estado:         'aprobado',
            fechaSolicitud: new Date().toISOString(),
            fechaResolucion:new Date().toISOString(),
            metodo:         'Aprobación manual del administrador',
            notaAdmin:      'Verificado por WhatsApp — aprobado manualmente'
        });
    }
    saveSolicitudesVerificacion(lista);

    // Limpiar campos
    const f1 = document.getElementById('aprobManualClave');
    const f2 = document.getElementById('aprobManualNombre');
    if (f1) f1.value = '';
    if (f2) f2.value = '';

    showNotification(
        `✅ "${nombre || clave}" aprobado. La próxima vez que abra el sitio verá su identidad verificada.`,
        'success'
    );
    switchFiltroVerif('resueltas');
}

// ── Revocar verificación de un cliente ───────────────────────────────────────
function revocarVerificacion() {
    const clave  = document.getElementById('revocarClave')?.value.trim();
    const motivo = document.getElementById('revocarMotivo')?.value.trim()
                   || 'El administrador solicitó nueva verificación';

    if (!clave) {
        showNotification('Ingresa la cédula o email del cliente', 'error');
        return;
    }

    if (!confirm(`¿Revocar la verificación de "${clave}"?\n\nEl cliente deberá repetir el proceso de verificación.\nMotivo que verá: "${motivo}"`)) return;

    // 1. Eliminar de verificacionesAprobadas
    const aprobadas = JSON.parse(localStorage.getItem('verificacionesAprobadas') || '{}');
    if (aprobadas[clave]) {
        delete aprobadas[clave];
        localStorage.setItem('verificacionesAprobadas', JSON.stringify(aprobadas));
    }

    // 2. Registrar en la cola como revocado (historial)
    const lista = getSolicitudesVerificacion();
    const existe = lista.findIndex(s => s.cedula === clave || s.email === clave);
    const entradaRevocada = {
        id:              Date.now(),
        cedula:          /^\d+$/.test(clave) ? clave : '',
        email:           /^\d+$/.test(clave) ? '' : clave,
        nombre:          existe >= 0 ? lista[existe].nombre : '',
        estado:          'revocado',
        fechaSolicitud:  new Date().toISOString(),
        fechaResolucion: new Date().toISOString(),
        metodo:          'Revocado por administrador',
        notaAdmin:       motivo
    };
    if (existe >= 0) {
        lista[existe] = { ...lista[existe], ...entradaRevocada };
    } else {
        lista.unshift(entradaRevocada);
    }
    saveSolicitudesVerificacion(lista);

    // 3. También guardar en 'verificacionesRevocadas' para que
    //    getVerificacion() del cliente lo detecte y limpie su estado local
    const revocadas = JSON.parse(localStorage.getItem('verificacionesRevocadas') || '{}');
    revocadas[clave] = { motivo, fecha: new Date().toISOString() };
    localStorage.setItem('verificacionesRevocadas', JSON.stringify(revocadas));

    // Limpiar campos
    const f1 = document.getElementById('revocarClave');
    const f2 = document.getElementById('revocarMotivo');
    if (f1) f1.value = '';
    if (f2) f2.value = '';

    showNotification(
        `🔄 Verificación revocada. El cliente deberá verificarse de nuevo.`,
        'info'
    );
    switchFiltroVerif('resueltas');
}

// ========================================
// GARANTÍAS — Documento formal
// ========================================
function renderGarantias() {
    return `
    <div class="fade-in" style="max-width:860px;margin:0 auto">

        <!-- Cabecera oficial -->
        <div style="background:var(--ink-900,#111118);border-radius:24px;
                    padding:3rem 2rem;text-align:center;margin-bottom:2.5rem;
                    position:relative;overflow:hidden">
            <div style="position:absolute;inset:0;
                background:radial-gradient(ellipse at 50% 0%,rgba(245,158,11,.12),transparent 60%)"></div>
            <div style="position:relative;z-index:1">
                <div style="width:64px;height:64px;background:linear-gradient(135deg,#f59e0b,#b45309);
                    border-radius:16px;display:flex;align-items:center;justify-content:center;
                    margin:0 auto 1.25rem;font-size:1.75rem">🛡️</div>
                <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:2.25rem;
                    font-weight:800;color:#fff;margin-bottom:.5rem">
                    Política de Garantías
                </h1>
                <p style="color:rgba(255,255,255,.55);font-size:.9rem;margin-bottom:1.5rem">
                    Mueblería y Cerrajería "Benjamín" · Quito, Ecuador · Vigente desde Enero 2025
                </p>
                <div style="display:inline-flex;align-items:center;gap:.5rem;
                    background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.25);
                    color:#6ee7b7;padding:.4rem 1.1rem;border-radius:999px;
                    font-size:.75rem;font-weight:700">
                    ✅ Documento oficial del negocio
                </div>
            </div>
        </div>

        <!-- Resumen visual -->
        <div class="grid grid-4 mb-4" style="gap:1rem">
            ${[
                ['🔨','6 meses','Mano de obra','En todos los trabajos'],
                ['🪵','90 días','Materiales','Defectos de fabricación'],
                ['🔒','1 año','Cerrajería','Herrajes y chapas instaladas'],
                ['⚡','30 días','Ajustes','Correcciones sin costo'],
            ].map(([ico,tiempo,tipo,desc]) => `
            <div style="background:#fff;border-radius:14px;padding:1.25rem;text-align:center;
                border:1px solid var(--ink-200,#e5e7eb);box-shadow:0 2px 8px rgba(0,0,0,.06)">
                <div style="font-size:2rem;margin-bottom:.5rem">${ico}</div>
                <div style="font-family:'Playfair Display',Georgia,serif;font-size:1.75rem;
                    font-weight:700;color:#f59e0b;line-height:1">${tiempo}</div>
                <div style="font-weight:800;font-size:.875rem;margin:.25rem 0">${tipo}</div>
                <div style="font-size:.75rem;color:var(--ink-400,#6b7280)">${desc}</div>
            </div>`).join('')}
        </div>

        <!-- Contenido legal -->
        <div class="card mb-3">
            <div class="card-body" style="padding:2rem">

                <h2 style="font-size:1.1rem;font-weight:800;color:var(--ink-900,#0a0a0f);
                    border-bottom:2px solid #fef3c7;padding-bottom:.5rem;margin-bottom:1rem">
                    1. Alcance de la Garantía
                </h2>
                <p style="font-size:.875rem;color:var(--ink-600,#3f3f55);line-height:1.75;margin-bottom:.75rem">
                    Mueblería y Cerrajería "Benjamín" garantiza todos sus trabajos contra defectos
                    de fabricación, instalación incorrecta o fallas en los materiales suministrados
                    por el taller, bajo las condiciones descritas en este documento.
                </p>
                <p style="font-size:.875rem;color:var(--ink-600,#3f3f55);line-height:1.75">
                    La garantía es personal e intransferible, aplica únicamente al cliente
                    que contrató el servicio, y cubre el trabajo específico descrito en la
                    nota de venta correspondiente.
                </p>

                <h2 style="font-size:1.1rem;font-weight:800;color:var(--ink-900,#0a0a0f);
                    border-bottom:2px solid #fef3c7;padding-bottom:.5rem;
                    margin:1.75rem 0 1rem">
                    2. Períodos de Garantía por Tipo de Trabajo
                </h2>

                ${[
                    {
                        tipo: '🪵 Carpintería en Madera',
                        items: [
                            ['Mano de obra (instalación, ensamble)', '6 meses'],
                            ['Materiales (madera, tableros MDF/MDP)', '90 días por defectos de fabricación'],
                            ['Herrajes (bisagras, jaladores, rieles)', '6 meses contra defectos de fábrica'],
                            ['Ajustes y nivelación post-entrega', '30 días sin costo'],
                        ]
                    },
                    {
                        tipo: '🔒 Cerrajería y Puertas de Tol',
                        items: [
                            ['Soldadura y estructura metálica', '1 año'],
                            ['Pintura electrostática / anticorrosiva', '6 meses contra descascarado'],
                            ['Chapas y cerraduras instaladas por el taller', '1 año contra defectos'],
                            ['Instalación y nivelación del marco', '6 meses'],
                        ]
                    },
                    {
                        tipo: '🏗️ Estructuras Metálicas',
                        items: [
                            ['Soldadura estructural certificada', '2 años'],
                            ['Pintura anticorrosiva', '6 meses'],
                            ['Cubiertas (zinc, policarbonato)', 'Según garantía del fabricante'],
                            ['Instalación y anclajes', '1 año'],
                        ]
                    },
                ].map(sec => `
                <div style="background:var(--ink-50,#f9fafb);border-radius:10px;
                    padding:1.25rem;margin-bottom:1rem">
                    <h3 style="font-size:.9rem;font-weight:800;margin-bottom:.875rem;
                        color:var(--ink-800,#1c1c27)">${sec.tipo}</h3>
                    <table style="width:100%;border-collapse:collapse;font-size:.82rem">
                        ${sec.items.map(([item,periodo],i) => `
                        <tr style="border-bottom:1px solid var(--ink-200,#e5e7eb)">
                            <td style="padding:.5rem .25rem;color:var(--ink-600,#3f3f55)">${item}</td>
                            <td style="padding:.5rem .25rem;font-weight:700;color:#f59e0b;
                                text-align:right;white-space:nowrap">${periodo}</td>
                        </tr>`).join('')}
                    </table>
                </div>`).join('')}

                <h2 style="font-size:1.1rem;font-weight:800;color:var(--ink-900,#0a0a0f);
                    border-bottom:2px solid #fef3c7;padding-bottom:.5rem;margin:1.75rem 0 1rem">
                    3. ¿Qué cubre la garantía?
                </h2>
                <ul style="font-size:.875rem;color:var(--ink-600,#3f3f55);line-height:2;
                    padding-left:1.25rem">
                    <li>Defectos en la soldadura o uniones realizadas por el taller</li>
                    <li>Desalineación de puertas, cajones o piezas instaladas por nosotros</li>
                    <li>Fallas en materiales que el taller adquirió y suministró</li>
                    <li>Problemas de nivelación o ajuste que afecten el funcionamiento</li>
                    <li>Pintura que se descascare en condiciones normales de uso</li>
                    <li>Chapas o herrajes que fallen por defecto de instalación</li>
                </ul>

                <h2 style="font-size:1.1rem;font-weight:800;color:var(--ink-900,#0a0a0f);
                    border-bottom:2px solid #fee2e2;padding-bottom:.5rem;margin:1.75rem 0 1rem">
                    4. ¿Qué NO cubre la garantía?
                </h2>
                <ul style="font-size:.875rem;color:var(--ink-600,#3f3f55);line-height:2;
                    padding-left:1.25rem">
                    <li>Daños causados por uso indebido, golpes, humedad excesiva o negligencia</li>
                    <li>Modificaciones realizadas por terceros sin autorización del taller</li>
                    <li>Materiales suministrados por el propio cliente</li>
                    <li>Desgaste normal por el uso cotidiano</li>
                    <li>Daños causados por eventos externos (inundaciones, terremotos, incendios)</li>
                    <li>Cambios de diseño o preferencias estéticas posteriores a la entrega</li>
                    <li>Trabajos sin nota de venta oficial del taller</li>
                </ul>

                <h2 style="font-size:1.1rem;font-weight:800;color:var(--ink-900,#0a0a0f);
                    border-bottom:2px solid #fef3c7;padding-bottom:.5rem;margin:1.75rem 0 1rem">
                    5. ¿Cómo hacer válida la garantía?
                </h2>
                <div style="display:grid;gap:.75rem">
                    ${[
                        ['1', '📋 Presenta tu nota de venta', 'Ten a mano el número de tu nota de venta (puedes consultarla en tu perfil del sitio web).'],
                        ['2', '📸 Documenta el problema', 'Toma fotos o video del defecto antes de intentar cualquier reparación.'],
                        ['3', '📱 Contáctanos', 'Escribe al WhatsApp de soporte (+593 98 167 6646) o al maestro (+593 98 599 8615) describiendo el problema.'],
                        ['4', '🔧 Visita técnica', 'Coordinaremos una visita para evaluar el problema sin costo dentro del período de garantía.'],
                        ['5', '✅ Resolución', 'Reparamos o reemplazamos sin costo si el defecto está cubierto por la garantía.'],
                    ].map(([num, titulo, desc]) => `
                    <div style="display:flex;gap:1rem;align-items:flex-start">
                        <div style="width:28px;height:28px;border-radius:50%;
                            background:linear-gradient(135deg,#f59e0b,#b45309);
                            display:flex;align-items:center;justify-content:center;
                            color:#fff;font-weight:800;font-size:.8rem;flex-shrink:0">
                            ${num}
                        </div>
                        <div>
                            <div style="font-weight:700;font-size:.875rem;margin-bottom:.2rem">${titulo}</div>
                            <div style="font-size:.8rem;color:var(--ink-400,#6b7280)">${desc}</div>
                        </div>
                    </div>`).join('')}
                </div>

                <h2 style="font-size:1.1rem;font-weight:800;color:var(--ink-900,#0a0a0f);
                    border-bottom:2px solid #fef3c7;padding-bottom:.5rem;margin:1.75rem 0 1rem">
                    6. Condiciones Generales
                </h2>
                <p style="font-size:.875rem;color:var(--ink-600,#3f3f55);line-height:1.75;margin-bottom:.75rem">
                    El período de garantía comienza desde la fecha de entrega del trabajo, 
                    registrada en la nota de venta. La garantía se hace efectiva únicamente
                    presentando la nota de venta original o su número de referencia.
                </p>
                <p style="font-size:.875rem;color:var(--ink-600,#3f3f55);line-height:1.75;margin-bottom:.75rem">
                    El taller se reserva el derecho de evaluar cada caso individualmente para
                    determinar si el defecto está cubierto por esta política. En caso de disputa,
                    se buscará una solución justa para ambas partes.
                </p>
                <p style="font-size:.875rem;color:var(--ink-600,#3f3f55);line-height:1.75">
                    Esta política puede actualizarse. La versión vigente siempre estará disponible
                    en nuestro sitio web.
                </p>
            </div>
        </div>

        <!-- CTA contacto -->
        <div style="background:var(--ink-50,#f9fafb);border-radius:16px;padding:2rem;
                    text-align:center;border:1px solid var(--ink-200,#e5e7eb)">
            <h3 style="font-weight:800;margin-bottom:.5rem">¿Tienes un reclamo de garantía?</h3>
            <p style="font-size:.875rem;color:var(--ink-400,#6b7280);margin-bottom:1.25rem">
                Escríbenos directamente y lo resolvemos sin burocracia.
            </p>
            <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap">
                <a href="https://wa.me/593985998615?text=${encodeURIComponent('Hola, tengo un reclamo de garantía sobre mi trabajo.')}"
                   target="_blank" class="btn btn-primary">
                    <i data-lucide="message-circle"></i> WhatsApp Maestro
                </a>
                <button onclick="navigateTo('soporte')" class="btn btn-ghost">
                    <i data-lucide="headphones"></i> Portal de Soporte
                </button>
            </div>
        </div>
    </div>`;
}