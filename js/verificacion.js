// ============================================================
// VERIFICACIÓN DE IDENTIDAD — Mueblería Benjamín
// Flujo: D (matemática) → B (QR foto) → A (WhatsApp admin)
// ============================================================

// ── Estado de verificación ───────────────────────────────────
function getVerificacion() {
    const v = localStorage.getItem('identidadVerificada');
    return v ? JSON.parse(v) : { estado: 'sin_verificar', metodo: null, fecha: null };
}
function setVerificacion(estado, metodo, extra = {}) {
    const data = { estado, metodo, fecha: new Date().toISOString(), ...extra };
    localStorage.setItem('identidadVerificada', JSON.stringify(data));
    // Actualizar el perfil del usuario con el estado
    const user = typeof getUser === 'function' ? getUser() : null;
    if (user) {
        user.identidadVerificada = estado === 'verificado';
        user.metodoVerificacion  = metodo;
        localStorage.setItem('benjaminUser', JSON.stringify(user));
    }
    return data;
}
function estaVerificado() {
    return getVerificacion().estado === 'verificado';
}

// ============================================================
// OPCIÓN D — Algoritmo módulo 10 (cédula ecuatoriana)
// Valida matemáticamente que el número de cédula es legítimo.
// No confirma el nombre, pero descarta cédulas inventadas.
// ============================================================
function validarCedulaEC(cedula) {
    cedula = String(cedula).trim();
    if (!/^\d{10}$/.test(cedula)) return { valida: false, error: 'La cédula debe tener exactamente 10 dígitos.' };

    const provincia = parseInt(cedula.substring(0, 2));
    if (provincia < 1 || provincia > 24) return { valida: false, error: 'Los dos primeros dígitos no corresponden a ninguna provincia del Ecuador.' };

    const tercerDigito = parseInt(cedula[2]);
    if (tercerDigito >= 6) return { valida: false, error: 'El tercer dígito no es válido para una cédula de persona natural.' };

    // Algoritmo módulo 10
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    for (let i = 0; i < 9; i++) {
        let val = parseInt(cedula[i]) * coeficientes[i];
        if (val >= 10) val -= 9;
        suma += val;
    }
    const digitoVerificador = parseInt(cedula[9]);
    const residuo = suma % 10;
    const verificadorCalculado = residuo === 0 ? 0 : 10 - residuo;

    if (verificadorCalculado !== digitoVerificador) {
        return { valida: false, error: 'El dígito verificador no coincide. Revisa que la cédula esté bien escrita.' };
    }
    return { valida: true, provincia, tipo: 'Persona Natural' };
}

// ============================================================
// OPCIÓN B — Escaneo de QR de la cédula ecuatoriana
// Usa jsQR (CDN). El QR contiene datos separados por & o |
// Formato típico: APELLIDO&NOMBRE&CEDULA&...
// ============================================================
async function escanearQRCedula(file, cedulaEsperada, nombreEsperado) {
    return new Promise((resolve) => {
        if (typeof jsQR === 'undefined') {
            resolve({ ok: false, error: 'Librería QR no cargada. Intenta recargar la página.' });
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width  = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert'
                });
                if (!code) {
                    resolve({ ok: false, error: 'No se detectó ningún código QR en la imagen. Asegúrate de que el QR esté bien enfocado y visible.' });
                    return;
                }
                // Parsear el contenido del QR
                const contenido = code.data;
                const partes    = contenido.split(/[&|;,\t]/);

                // Buscar cédula en el QR
                const cedulaEnQR = partes.find(p => /^\d{10}$/.test(p.trim()));
                if (!cedulaEnQR) {
                    resolve({ ok: false, error: 'El QR no contiene un número de cédula reconocible. Verifica que sea la cédula ecuatoriana.', contenidoQR: contenido });
                    return;
                }

                // Verificar que la cédula del QR coincide con la ingresada
                if (cedulaEnQR.trim() !== cedulaEsperada.trim()) {
                    resolve({ ok: false, error: `La cédula del QR (${cedulaEnQR}) no coincide con la que ingresaste (${cedulaEsperada}).`, contenidoQR: contenido });
                    return;
                }

                // Extraer nombre del QR para validación adicional
                const nombresQR = partes.filter(p => p.length > 2 && !/^\d+$/.test(p)).map(p => p.trim().toUpperCase());
                const nombreNorm = (nombreEsperado || '').toUpperCase().replace(/\s+/g,' ').trim();
                const nombreEnQR = nombresQR.join(' ');

                // Verificación parcial del nombre (al menos una palabra del nombre debe estar en el QR)
                const palabrasNombre = nombreNorm.split(' ').filter(p => p.length > 2);
                const coincideNombre = palabrasNombre.some(p => nombreEnQR.includes(p));

                if (!coincideNombre && palabrasNombre.length > 0) {
                    resolve({ ok: false, error: `El nombre en el QR (${nombreEnQR}) no coincide con el nombre registrado (${nombreNorm}).`, contenidoQR: contenido });
                    return;
                }

                resolve({ ok: true, cedulaQR: cedulaEnQR, nombreQR: nombreEnQR, contenidoQR: contenido });
            };
            img.onerror = () => resolve({ ok: false, error: 'No se pudo cargar la imagen. Usa JPG o PNG.' });
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// ============================================================
// RENDER — Página de Verificación de Identidad
// ============================================================
function renderVerificacionIdentidad() {
    const user  = typeof getUser === 'function' ? getUser() : null;
    const verif = getVerificacion();

    if (!user) {
        return `<div class="fade-in container-small">
            <div class="alert alert-warning"><i data-lucide="user-x"></i>
            <p>Debes iniciar sesión para verificar tu identidad.</p></div>
        </div>`;
    }

    const cedulaRegistrada = user.cedula || '';
    const nombreRegistrado = user.nombre || '';

    if (verif.estado === 'verificado') {
        return `
        <div class="fade-in container-small">
            <div style="text-align:center;padding:3rem 1rem">
                <div style="font-size:4rem">✅</div>
                <h2 style="color:var(--color-success);margin:.75rem 0">Identidad Verificada</h2>
                <p style="color:var(--color-gray-600)">
                    Tu identidad fue verificada mediante <strong>${verif.metodo}</strong>
                    el ${new Date(verif.fecha).toLocaleDateString('es-EC')}.
                </p>
                <p style="margin-top:.5rem;font-size:.875rem;color:var(--color-gray-500)">
                    Cédula: ${cedulaRegistrada} · ${user.nombre}
                </p>
                <button onclick="navigateTo('perfil')" class="btn btn-primary mt-4">
                    <i data-lucide="arrow-left"></i> Volver al Perfil
                </button>
            </div>
        </div>`;
    }

    if (verif.estado === 'pendiente_admin') {
        return `
        <div class="fade-in container-small">
            <div style="text-align:center;padding:3rem 1rem">
                <div style="font-size:4rem">⏳</div>
                <h2 style="margin:.75rem 0">Verificación en Proceso</h2>
                <p style="color:var(--color-gray-600)">
                    Enviaste tu solicitud por WhatsApp. El administrador la revisará
                    y activará tu cuenta en menos de 24 horas.
                </p>
                <div class="alert alert-warning mt-3" style="text-align:left">
                    <i data-lucide="clock"></i>
                    <p>Si no recibes confirmación en 24 horas, contáctanos al 
                    <strong>+593 98 167 6646</strong></p>
                </div>
                <button onclick="navigateTo('perfil')" class="btn btn-secondary mt-3">
                    Volver al Perfil
                </button>
            </div>
        </div>`;
    }

    // Sin verificar → mostrar flujo completo
    return `
    <div class="fade-in container-small">
        <div class="page-header text-center">
            <i data-lucide="shield-check" class="page-icon"></i>
            <h1>Verificación de Identidad</h1>
            <p>Necesitamos confirmar quién eres para proteger tu información y la de todos</p>
        </div>

        ${!cedulaRegistrada ? `
        <div class="alert alert-warning mb-4">
            <i data-lucide="alert-circle"></i>
            <div>
                <strong>Cédula no registrada</strong>
                <p>No tienes cédula en tu perfil. Primero actualízala.</p>
                <input type="text" id="cedulaUpdate" class="form-input mt-2" 
                    placeholder="Ingresa tu cédula (10 dígitos)" maxlength="10"
                    style="max-width:250px">
                <button onclick="actualizarCedulaPerfil()" class="btn btn-primary btn-sm mt-2">
                    Guardar Cédula
                </button>
            </div>
        </div>` : ''}

        <!-- Paso 1: Validación matemática -->
        <div class="verif-step" id="paso1">
            <div class="verif-step-header">
                <span class="verif-step-num">1</span>
                <div>
                    <h3>Validación de Cédula</h3>
                    <p>Verificamos que tu cédula ${cedulaRegistrada ? `(<strong>${cedulaRegistrada}</strong>)` : ''} sea matemáticamente válida</p>
                </div>
                <span id="paso1Estado" class="verif-badge verif-pendiente">Pendiente</span>
            </div>
            <div id="paso1Resultado" class="mt-2"></div>
            <button onclick="ejecutarPasoD()" class="btn btn-primary btn-sm mt-2" id="btnPasoD">
                <i data-lucide="calculator"></i> Validar Cédula
            </button>
        </div>

        <!-- Paso 2: QR de la cédula -->
        <div class="verif-step" id="paso2" style="opacity:.5;pointer-events:none">
            <div class="verif-step-header">
                <span class="verif-step-num">2</span>
                <div>
                    <h3>Foto del QR de tu Cédula</h3>
                    <p>Sube una foto clara del <strong>código QR</strong> que aparece al reverso de tu cédula</p>
                </div>
                <span id="paso2Estado" class="verif-badge verif-pendiente">Pendiente</span>
            </div>
            <div class="mt-2" style="display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap">
                <div style="flex:1;min-width:200px">
                    <input type="file" id="qrFile" accept="image/*" 
                        onchange="ejecutarPasoB()"
                        style="display:none">
                    <button onclick="document.getElementById('qrFile').click()" 
                        class="btn btn-primary btn-sm" id="btnPasoB">
                        <i data-lucide="camera"></i> Subir Foto del QR
                    </button>
                    <p style="font-size:.75rem;color:var(--color-gray-500);margin-top:.5rem">
                        JPG, PNG · Enfoca solo el código QR
                    </p>
                </div>
                <div style="background:var(--color-gray-100);border-radius:8px;padding:.75rem;font-size:.75rem;max-width:240px">
                    <strong>¿Dónde está el QR?</strong><br>
                    Al reverso de tu cédula ecuatoriana, esquina inferior derecha. 
                    Es el cuadrado con patrones de puntos negros.
                </div>
            </div>
            <div id="paso2Resultado" class="mt-2"></div>
        </div>

        <!-- Paso 3: Fallback WhatsApp -->
        <div class="verif-step" id="paso3" style="opacity:.5;pointer-events:none">
            <div class="verif-step-header">
                <span class="verif-step-num">3</span>
                <div>
                    <h3>Verificación Manual por WhatsApp</h3>
                    <p>Si el QR no funciona, envía una foto de tu cédula al administrador</p>
                </div>
                <span id="paso3Estado" class="verif-badge verif-pendiente">Alternativa</span>
            </div>
            <div id="paso3Resultado" class="mt-2"></div>
            <button onclick="ejecutarPasoA()" class="btn btn-success btn-sm mt-2" id="btnPasoA">
                <i data-lucide="message-circle"></i> Enviar por WhatsApp al Admin
            </button>
        </div>

        <div id="verifLoading" class="hidden" style="text-align:center;padding:1rem">
            <div class="spinner" style="margin:0 auto .5rem"></div>
            <p id="verifLoadingMsg">Procesando...</p>
        </div>
    </div>`;
}

// ── Actualizar cédula desde la pantalla de verificación ─────
function actualizarCedulaPerfil() {
    const cedula = document.getElementById('cedulaUpdate')?.value.trim();
    if (!cedula || !/^\d{10}$/.test(cedula)) {
        showNotification('Ingresa una cédula válida de 10 dígitos', 'error'); return;
    }
    const user = getUser();
    if (user) {
        user.cedula = cedula;
        localStorage.setItem('benjaminUser', JSON.stringify(user));
        showNotification('Cédula guardada. Recargando verificación...', 'success');
        setTimeout(() => {
            const main = document.getElementById('mainContent');
            if (main) { main.innerHTML = renderVerificacionIdentidad(); lucide.createIcons(); }
        }, 800);
    }
}

// ── Paso D — Validación matemática ──────────────────────────
function ejecutarPasoD() {
    const user   = getUser();
    const cedula = user?.cedula || document.getElementById('cedulaUpdate')?.value.trim() || '';
    const btn    = document.getElementById('btnPasoD');
    const result = document.getElementById('paso1Resultado');
    const badge  = document.getElementById('paso1Estado');
    const paso2  = document.getElementById('paso2');

    if (!cedula) { showNotification('Primero ingresa tu cédula', 'error'); return; }

    if (btn) { btn.disabled = true; btn.innerHTML = '<div class="spinner" style="width:14px;height:14px;border-width:2px;display:inline-block"></div> Validando...'; }

    const validacion = validarCedulaEC(cedula);

    setTimeout(() => { // pequeño delay para UX
        if (validacion.valida) {
            if (badge) { badge.className = 'verif-badge verif-ok'; badge.textContent = '✅ Válida'; }
            if (result) result.innerHTML = `<div style="color:var(--color-success);font-size:.875rem">
                ✅ Cédula válida · Provincia ${validacion.provincia} · ${validacion.tipo}</div>`;
            if (btn) btn.style.display = 'none';
            // Habilitar paso 2
            if (paso2) { paso2.style.opacity = '1'; paso2.style.pointerEvents = 'auto'; }
            showNotification('✅ Cédula matemáticamente válida. Procede al paso 2.', 'success');
        } else {
            if (badge) { badge.className = 'verif-badge verif-error'; badge.textContent = '❌ Inválida'; }
            if (result) result.innerHTML = `<div style="color:var(--color-error);font-size:.875rem">
                ❌ ${validacion.error}</div>`;
            if (btn) { btn.disabled = false; btn.innerHTML = '<i data-lucide="calculator"></i> Reintentar'; }
            lucide.createIcons();
            showNotification('La cédula no pasó la validación matemática', 'error');
        }
        if (btn && !btn.disabled) lucide.createIcons();
    }, 600);
}

// ── Paso B — Escaneo QR ──────────────────────────────────────
async function ejecutarPasoB() {
    const file   = document.getElementById('qrFile')?.files[0];
    const user   = getUser();
    const cedula = user?.cedula || '';
    const nombre = user?.nombre || '';
    const result = document.getElementById('paso2Resultado');
    const badge  = document.getElementById('paso2Estado');
    const paso3  = document.getElementById('paso3');
    const btnA   = document.getElementById('btnPasoA');
    const loading = document.getElementById('verifLoading');
    const loadMsg = document.getElementById('verifLoadingMsg');

    if (!file) return;
    if (!cedula) { showNotification('Primero actualiza tu cédula', 'error'); return; }

    if (loading) { loading.classList.remove('hidden'); }
    if (loadMsg) loadMsg.textContent = 'Escaneando código QR...';

    try {
        const qrResult = await escanearQRCedula(file, cedula, nombre);

        if (loading) loading.classList.add('hidden');

        if (qrResult.ok) {
            if (badge) { badge.className = 'verif-badge verif-ok'; badge.textContent = '✅ Verificado'; }
            if (result) result.innerHTML = `<div style="color:var(--color-success);font-size:.875rem">
                ✅ QR escaneado correctamente · Cédula coincide</div>`;
            // ¡VERIFICADO! Guardar estado
            setVerificacion('verificado', 'QR de cédula (automático)', { cedulaVerificada: cedula });
            setTimeout(() => {
                const main = document.getElementById('mainContent');
                if (main) { main.innerHTML = renderVerificacionIdentidad(); lucide.createIcons(); }
            }, 1200);
            showNotification('🎉 ¡Identidad verificada exitosamente!', 'success');
        } else {
            if (badge) { badge.className = 'verif-badge verif-error'; badge.textContent = '❌ Error'; }
            if (result) result.innerHTML = `
            <div style="color:var(--color-error);font-size:.875rem;margin-bottom:.5rem">
                ❌ ${qrResult.error}</div>
            <div style="font-size:.75rem;color:var(--color-gray-500)">
                Consejos: Usa buena iluminación · Encuadra solo el QR · Mínimo 300px de ancho
            </div>`;
            // Habilitar paso 3 (WhatsApp)
            if (paso3) { paso3.style.opacity = '1'; paso3.style.pointerEvents = 'auto'; }
            showNotification('No se pudo verificar el QR. Intenta de nuevo o usa WhatsApp.', 'error');
        }
    } catch (e) {
        if (loading) loading.classList.add('hidden');
        console.error('Error en escaneo QR:', e);
        if (paso3) { paso3.style.opacity = '1'; paso3.style.pointerEvents = 'auto'; }
        showNotification('Error al procesar la imagen. Usa el método WhatsApp.', 'error');
    }
}

// ── Paso A — WhatsApp al admin ───────────────────────────────
function ejecutarPasoA() {
    const user   = getUser();
    const cedula = user?.cedula || '';
    const nombre = user?.nombre || '';
    const email  = user?.email  || '';

    const msg = `🔐 *SOLICITUD DE VERIFICACIÓN DE IDENTIDAD*\n\n` +
        `Nombre: ${nombre}\nCédula: ${cedula}\nEmail: ${email}\n\n` +
        `Por favor verifica mi identidad para acceder a mis notas de venta.\n` +
        `Te envío foto de mi cédula a continuación.`;

    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');

    // Marcar como pendiente de verificación manual
    setVerificacion('pendiente_admin', 'WhatsApp (manual)');

    showNotification('Solicitud enviada. El administrador la revisará pronto.', 'success');
    setTimeout(() => {
        const main = document.getElementById('mainContent');
        if (main) { main.innerHTML = renderVerificacionIdentidad(); lucide.createIcons(); }
    }, 1500);
}