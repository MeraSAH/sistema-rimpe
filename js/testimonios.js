// ============================================================
// SISTEMA DE TESTIMONIOS — Mueblería Benjamín
// Estados: pendiente → aprobado | rechazado | destacado
// Reglas: 1 por cédula, solo clientes verificados con ≥1 nota
// ============================================================

const TESTIMONIOS_KEY = 'testimoniosDB';

// ─── CRUD ────────────────────────────────────────────────────

function getTestimoniosDB() {
    const raw = localStorage.getItem(TESTIMONIOS_KEY);
    return raw ? JSON.parse(raw) : [];
}

function saveTestimoniosDB(lista) {
    localStorage.setItem(TESTIMONIOS_KEY, JSON.stringify(lista));
    // Sync Supabase en background si está disponible
    if (typeof dbSyncTestimonios === 'function') dbSyncTestimonios(lista).catch(console.warn);
}

// Testimonios públicos (aprobados + destacados), destacados primero
function getTestimoniosPublicos() {
    const base = getTestimoniosDB().filter(t => t.estado === 'aprobado' || t.estado === 'destacado');
    // Destacados al frente
    return base.sort((a, b) => {
        if (a.estado === 'destacado' && b.estado !== 'destacado') return -1;
        if (b.estado === 'destacado' && a.estado !== 'destacado') return  1;
        return new Date(b.fecha) - new Date(a.fecha);
    });
}

function getTestimonioDestacados() {
    return getTestimoniosDB().filter(t => t.estado === 'destacado');
}

function getTestimonioByKey(cedula) {
    return getTestimoniosDB().find(t => t.cedula === cedula) || null;
}

// ─── Enviar testimonio (cliente) ─────────────────────────────

function submitTestimonio(datos) {
    /*  datos: { nombre, cedula, calificacion, proyecto, texto, imagen }  */
    const lista = getTestimoniosDB();
    const existeIdx = lista.findIndex(t => t.cedula === datos.cedula);

    const nuevo = {
        id:           existeIdx >= 0 ? lista[existeIdx].id : Date.now(),
        cedula:       datos.cedula,
        nombre:       datos.nombre,
        imagen:       datos.imagen   || '👤',
        calificacion: datos.calificacion || 5,
        proyecto:     datos.proyecto || 'Trabajo realizado',
        texto:        datos.texto,
        fecha:        new Date().toISOString().split('T')[0],
        estado:       'pendiente',
        fechaEnvio:   new Date().toISOString(),
        motivoRechazo: null
    };

    if (existeIdx >= 0) {
        // Reemplazar — el cliente puede editar su testimonio pendiente
        lista[existeIdx] = { ...lista[existeIdx], ...nuevo };
    } else {
        lista.unshift(nuevo);
    }

    saveTestimoniosDB(lista);
    return nuevo;
}

// ─── Acciones del admin ──────────────────────────────────────

function adminAprobarTestimonio(id) {
    const lista = getTestimoniosDB();
    const idx   = lista.findIndex(t => t.id === id);
    if (idx === -1) return false;
    lista[idx].estado            = 'aprobado';
    lista[idx].fechaResolucion   = new Date().toISOString();
    lista[idx].motivoRechazo     = null;
    saveTestimoniosDB(lista);
    return true;
}

function adminRechazarTestimonio(id, motivo) {
    const lista = getTestimoniosDB();
    const idx   = lista.findIndex(t => t.id === id);
    if (idx === -1) return false;
    lista[idx].estado          = 'rechazado';
    lista[idx].fechaResolucion = new Date().toISOString();
    lista[idx].motivoRechazo   = motivo || 'No cumple los requisitos de publicación';
    saveTestimoniosDB(lista);
    return true;
}

function adminDestacarTestimonio(id) {
    const lista = getTestimoniosDB();
    const idx   = lista.findIndex(t => t.id === id);
    if (idx === -1) return false;
    // Toggle: si ya estaba destacado, vuelve a aprobado
    lista[idx].estado = lista[idx].estado === 'destacado' ? 'aprobado' : 'destacado';
    lista[idx].fechaResolucion = new Date().toISOString();
    saveTestimoniosDB(lista);
    return true;
}

function adminEliminarTestimonio(id) {
    const lista = getTestimoniosDB().filter(t => t.id !== id);
    saveTestimoniosDB(lista);
    return true;
}

// ─── Estadísticas para el panel admin ────────────────────────

function getEstadisticasTestimonios() {
    const lista    = getTestimoniosDB();
    const aprobados = lista.filter(t => t.estado === 'aprobado' || t.estado === 'destacado');
    const promedio  = aprobados.length > 0
        ? (aprobados.reduce((s, t) => s + (t.calificacion || 5), 0) / aprobados.length).toFixed(1)
        : '—';
    return {
        total:      lista.length,
        pendientes: lista.filter(t => t.estado === 'pendiente').length,
        aprobados:  aprobados.length,
        destacados: lista.filter(t => t.estado === 'destacado').length,
        rechazados: lista.filter(t => t.estado === 'rechazado').length,
        promedio
    };
}

// ─── Verificar si un cliente puede dejar testimonio ──────────

function puedeDejarTestimonio(user) {
    if (!user) return { puede: false, razon: 'Debes iniciar sesión' };

    // Verificación de identidad
    const verif = typeof getVerificacion === 'function' ? getVerificacion() : { estado: 'sin_verificar' };
    if (verif.estado !== 'verificado') {
        return { puede: false, razon: 'Debes verificar tu identidad primero', accion: 'verificacion-identidad' };
    }

    // Debe tener al menos 1 nota de venta
    const notas = typeof getNotasVenta === 'function' ? getNotasVenta() : [];
    const misNotas = notas.filter(n =>
        (user.cedula && n.cliente?.cedula === user.cedula) ||
        (user.email  && n.cliente?.email  === user.email)
    );
    if (misNotas.length === 0) {
        return { puede: false, razon: 'Necesitas al menos una compra realizada para dejar un testimonio' };
    }

    return { puede: true, tieneExistente: !!getTestimonioByKey(user.cedula), misNotas };
}

// ─── RENDER: Formulario para cliente ─────────────────────────

function renderFormTestimonio() {
    const user = typeof getUser === 'function' ? getUser() : null;
    const perm = puedeDejarTestimonio(user);
    const existente = user?.cedula ? getTestimonioByKey(user.cedula) : null;

    if (!perm.puede) {
        return `
        <div class="card mt-4">
            <div class="card-body" style="text-align:center">
                <div style="font-size:2.5rem;margin-bottom:.75rem">🔒</div>
                <h3>Deja Tu Testimonio</h3>
                <p style="color:var(--color-gray-600);margin:.5rem 0">${perm.razon}</p>
                ${perm.accion ? `
                <button onclick="navigateTo('${perm.accion}')" class="btn btn-primary mt-2">
                    <i data-lucide="shield-check"></i> Verificar Identidad
                </button>` : ''}
                ${!user ? `
                <button onclick="navigateTo('perfil')" class="btn btn-primary mt-2">
                    <i data-lucide="log-in"></i> Iniciar Sesión
                </button>` : ''}
            </div>
        </div>`;
    }

    const estadoBadge = existente
        ? ({ pendiente: '🟡 Pendiente de revisión', aprobado: '✅ Publicado', destacado: '⭐ Destacado', rechazado: '❌ Rechazado' }[existente.estado] || existente.estado)
        : null;

    return `
    <div class="card mt-4" id="formTestimonio">
        <div class="card-body">
            <h3 style="display:flex;align-items:center;gap:.5rem;margin-bottom:1rem">
                <i data-lucide="message-square"></i>
                ${existente ? 'Editar Tu Testimonio' : 'Dejar Tu Testimonio'}
            </h3>

            ${existente ? `
            <div style="background:${existente.estado==='rechazado'?'#fee2e2':existente.estado==='aprobado'||existente.estado==='destacado'?'#dcfce7':'#fef9c3'};
                padding:.6rem 1rem;border-radius:8px;margin-bottom:1rem;font-size:.875rem;font-weight:600">
                Estado actual: ${estadoBadge}
                ${existente.motivoRechazo ? `<br><span style="font-weight:400;color:#991b1b">Motivo: ${existente.motivoRechazo}</span>` : ''}
            </div>` : ''}

            <div class="form-group">
                <label class="form-label">Calificación *</label>
                <div style="display:flex;gap:.5rem" id="starsContainer">
                    ${[1,2,3,4,5].map(n => `
                    <button type="button" onclick="seleccionarEstrella(${n})" id="star${n}"
                        style="font-size:1.75rem;background:none;border:none;cursor:pointer;
                               color:${(existente?.calificacion||5) >= n ? '#f59e0b':'#d1d5db'};
                               transition:transform .1s" 
                        onmouseover="this.style.transform='scale(1.2)'"
                        onmouseout="this.style.transform='scale(1)'">★</button>`).join('')}
                </div>
                <input type="hidden" id="tCalificacion" value="${existente?.calificacion||5}">
            </div>

            <div class="form-group">
                <label class="form-label">¿Qué trabajo realizamos para ti? *</label>
                <input type="text" id="tProyecto" class="form-input"
                    value="${existente?.proyecto||''}"
                    placeholder="Ej: Puerta de tol, Techo metálico, Closet...">
            </div>

            <div class="form-group">
                <label class="form-label">Tu testimonio * 
                    <small style="color:var(--color-gray-500)">(mín. 20, máx. 300 caracteres)</small>
                </label>
                <textarea id="tTexto" class="form-textarea" rows="4" maxlength="300"
                    oninput="document.getElementById('tCharCount').textContent=this.value.length"
                    placeholder="Cuéntanos tu experiencia con nuestro trabajo...">${existente?.texto||''}</textarea>
                <div style="text-align:right;font-size:.75rem;color:var(--color-gray-500)">
                    <span id="tCharCount">${existente?.texto?.length||0}</span>/300
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Tu emoji / avatar</label>
                <div style="display:flex;gap:.5rem;flex-wrap:wrap" id="avatarPicker">
                    ${['👨','👩','👴','👵','👨‍💼','👩‍💼','👨‍🔧','👩‍🔧','🧑','🧓'].map(em => `
                    <button type="button" onclick="seleccionarAvatar('${em}')"
                        class="avatar-opt ${existente?.imagen===em||(!existente&&em==='👤')?'selected':''}"
                        data-avatar="${em}"
                        style="font-size:1.5rem;padding:4px 8px;border-radius:8px;border:2px solid ${existente?.imagen===em?'var(--color-primary)':'transparent'};background:${existente?.imagen===em?'#fef3c7':'transparent'};cursor:pointer">
                        ${em}</button>`).join('')}
                </div>
                <input type="hidden" id="tImagen" value="${existente?.imagen||'👤'}">
            </div>

            <button onclick="enviarTestimonio()" class="btn btn-primary w-full" id="btnTestimonio">
                <i data-lucide="${existente ? 'save' : 'send'}"></i>
                ${existente ? 'Actualizar Testimonio' : 'Enviar Testimonio'}
            </button>

            <p style="font-size:.75rem;color:var(--color-gray-500);margin-top:.5rem;text-align:center">
                Tu testimonio será revisado antes de publicarse. Normalmente en menos de 24 horas.
            </p>
        </div>
    </div>

    <script>
    function seleccionarEstrella(n) {
        document.getElementById('tCalificacion').value = n;
        for (let i=1;i<=5;i++) {
            const s = document.getElementById('star'+i);
            if (s) s.style.color = i<=n ? '#f59e0b' : '#d1d5db';
        }
    }
    function seleccionarAvatar(em) {
        document.getElementById('tImagen').value = em;
        document.querySelectorAll('.avatar-opt').forEach(btn => {
            const sel = btn.dataset.avatar === em;
            btn.style.border  = sel ? '2px solid var(--color-primary)' : '2px solid transparent';
            btn.style.background = sel ? '#fef3c7' : 'transparent';
        });
    }
    </script>`;
}

function enviarTestimonio() {
    const user = typeof getUser === 'function' ? getUser() : null;
    if (!user) { showNotification('Debes iniciar sesión', 'error'); return; }

    const texto = document.getElementById('tTexto')?.value.trim() || '';
    const proyecto = document.getElementById('tProyecto')?.value.trim() || '';
    if (texto.length < 20) { showNotification('El testimonio debe tener al menos 20 caracteres', 'error'); return; }
    if (!proyecto) { showNotification('Indica qué trabajo realizamos para ti', 'error'); return; }

    const datos = {
        nombre:       user.nombre,
        cedula:       user.cedula || user.email,
        calificacion: parseInt(document.getElementById('tCalificacion')?.value || '5'),
        proyecto,
        texto,
        imagen:       document.getElementById('tImagen')?.value || '👤'
    };

    const btn = document.getElementById('btnTestimonio');
    if (btn) { btn.disabled = true; btn.innerHTML = '<div class="spinner" style="width:16px;height:16px;border-width:2px;display:inline-block"></div> Enviando...'; }

    const resultado = submitTestimonio(datos);

    showNotification('✅ Testimonio enviado. Lo revisaremos en menos de 24 horas.', 'success');
    setTimeout(() => {
        const main = document.getElementById('mainContent');
        if (main) { main.innerHTML = renderTestimonios(); lucide.createIcons(); }
    }, 1200);
}