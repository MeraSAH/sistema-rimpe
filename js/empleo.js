// ============================================================
// PORTAL DE EMPLEO Y COLABORADORES — Mueblería Benjamín
// Tipos: 'empleo' (busca trabajo) | 'colaborador' (subcontratos)
// ============================================================

const EMPLEO_KEY = 'portalEmpleo';

// ── Especialidades disponibles ───────────────────────────────
const ESPECIALIDADES = [
    { id: 'carpinteria',    label: 'Carpintería en madera',      icono: '🪵' },
    { id: 'cerrajeria',     label: 'Cerrajería / Tol / Soldadura', icono: '🔒' },
    { id: 'instalacion',    label: 'Instalación y montaje',       icono: '🔧' },
    { id: 'pintura',        label: 'Pintura y acabados',          icono: '🎨' },
    { id: 'diseño',         label: 'Diseño de interiores',        icono: '📐' },
    { id: 'electricidad',   label: 'Electricidad básica',         icono: '⚡' },
    { id: 'albanileria',    label: 'Albañilería',                 icono: '🧱' },
    { id: 'otros',          label: 'Otras habilidades',           icono: '⚙️' },
];

const NIVELES_EXP = [
    { id: 'aprendiz',     label: 'Aprendiz (0–1 años)' },
    { id: 'intermedio',   label: 'Intermedio (1–3 años)' },
    { id: 'experimentado',label: 'Experimentado (3–7 años)' },
    { id: 'maestro',      label: 'Maestro (7+ años)' },
];

// ── CRUD ─────────────────────────────────────────────────────
function getPostulaciones() {
    return JSON.parse(localStorage.getItem(EMPLEO_KEY) || '[]');
}
function savePostulaciones(lista) {
    localStorage.setItem(EMPLEO_KEY, JSON.stringify(lista));
}

function submitPostulacion(datos) {
    const lista = getPostulaciones();
    // Un solo registro por cédula — actualiza si ya existe
    const idx = lista.findIndex(p => p.cedula === datos.cedula);
    const entrada = {
        id:            idx >= 0 ? lista[idx].id : Date.now(),
        ...datos,
        estado:        'nueva',     // nueva | revisada | contactado | descartada
        fechaEnvio:    new Date().toISOString(),
        notaAdmin:     ''
    };
    if (idx >= 0) { lista[idx] = entrada; }
    else          { lista.unshift(entrada); }
    savePostulaciones(lista);
    return entrada;
}

// ── Estadísticas admin ────────────────────────────────────────
function getEstadisticasEmpleo() {
    const lista = getPostulaciones();
    return {
        total:       lista.length,
        nuevas:      lista.filter(p => p.estado === 'nueva').length,
        empleo:      lista.filter(p => p.tipo === 'empleo').length,
        colaborador: lista.filter(p => p.tipo === 'colaborador').length,
        contactados: lista.filter(p => p.estado === 'contactado').length,
    };
}

// ============================================================
// RENDER PÚBLICO — Portal de Empleo
// ============================================================
function renderPortalEmpleo() {
    return `
    <div class="fade-in">

        <!-- Hero del portal -->
        <div style="background:var(--ink-900,#111118);border-radius:24px;padding:3.5rem 2rem;
                    text-align:center;margin-bottom:3rem;position:relative;overflow:hidden">
            <div style="position:absolute;inset:0;
                background:radial-gradient(ellipse at 50% 0%,rgba(245,158,11,.14),transparent 60%)"></div>
            <div style="position:relative;z-index:1;max-width:640px;margin:0 auto">
                <div style="display:inline-flex;align-items:center;gap:.5rem;
                    background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.25);
                    color:#fbbf24;padding:.35rem 1rem;border-radius:999px;
                    font-size:.72rem;font-weight:700;letter-spacing:.1em;
                    text-transform:uppercase;margin-bottom:1.25rem">
                    🏗️ Portal de Empleo & Colaboración
                </div>
                <h1 style="font-family:'Playfair Display',Georgia,serif;
                    font-size:clamp(1.75rem,4vw,2.75rem);font-weight:800;
                    color:#fff;line-height:1.2;letter-spacing:-.02em;margin-bottom:1rem">
                    Trabaja con los mejores<br>
                    <span style="color:#fbbf24">artesanos de Quito</span>
                </h1>
                <p style="color:rgba(255,255,255,.6);font-size:1rem;line-height:1.7;margin-bottom:2rem">
                    ¿Eres carpintero, soldador, instalador o pintor?
                    Únete a nuestro equipo o regístrate como colaborador para recibir subcontratos.
                </p>
                <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
                    <button onclick="scrollToForm('empleo')"
                        style="padding:.75rem 1.75rem;background:linear-gradient(135deg,#f59e0b,#d97706);
                        color:#fff;border:none;border-radius:10px;font-weight:700;font-size:.9rem;
                        cursor:pointer;display:flex;align-items:center;gap:.5rem">
                        💼 Buscar empleo
                    </button>
                    <button onclick="scrollToForm('colaborador')"
                        style="padding:.75rem 1.75rem;background:transparent;
                        color:#fbbf24;border:2px solid #f59e0b;border-radius:10px;
                        font-weight:700;font-size:.9rem;cursor:pointer;
                        display:flex;align-items:center;gap:.5rem">
                        🤝 Ser colaborador
                    </button>
                </div>
            </div>
        </div>

        <div class="container" style="max-width:900px;margin:0 auto">

            <!-- Diferencia entre los dos tipos -->
            <div class="grid grid-2 mb-4">
                <div class="card" style="border-left:4px solid #f59e0b">
                    <div class="card-body">
                        <div style="font-size:2.5rem;margin-bottom:.75rem">💼</div>
                        <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:.5rem">Buscar Empleo</h3>
                        <p style="font-size:.875rem;color:var(--ink-400,#6b7280);line-height:1.6">
                            Quiero trabajar de forma permanente o a tiempo completo en el taller.
                            Sueldo fijo, beneficios de ley, contrato.
                        </p>
                        <ul style="margin-top:.75rem;font-size:.8rem;color:var(--ink-600,#3f3f55);
                                   list-style:none;padding:0">
                            <li>✅ Sueldo mensual fijo</li>
                            <li>✅ Beneficios de ley (IESS)</li>
                            <li>✅ Horario establecido</li>
                            <li>✅ Capacitación interna</li>
                        </ul>
                    </div>
                </div>
                <div class="card" style="border-left:4px solid #6366f1">
                    <div class="card-body">
                        <div style="font-size:2.5rem;margin-bottom:.75rem">🤝</div>
                        <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:.5rem">Ser Colaborador</h3>
                        <p style="font-size:.875rem;color:var(--ink-400,#6b7280);line-height:1.6">
                            Trabajo independiente. Recibo subcontratos cuando hay exceso de trabajo.
                            Pago por obra/trabajo completado.
                        </p>
                        <ul style="margin-top:.75rem;font-size:.8rem;color:var(--ink-600,#3f3f55);
                                   list-style:none;padding:0">
                            <li>✅ Horario flexible</li>
                            <li>✅ Pago por proyecto</li>
                            <li>✅ Trabajos periódicos</li>
                            <li>✅ Red de contactos</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Formulario -->
            <div class="card" id="formEmpleo">
                <div class="card-header" style="text-align:left;padding:1.5rem">
                    <h2 style="font-size:1.25rem;font-weight:800;margin-bottom:.25rem">
                        📋 Formulario de Postulación
                    </h2>
                    <p style="font-size:.8rem;opacity:.8">
                        Completa el formulario y te contactaremos por WhatsApp en menos de 48 horas
                    </p>
                </div>
                <div class="card-body">
                    <!-- Tipo de postulación -->
                    <div class="form-group">
                        <label class="form-label">¿Qué buscas? *</label>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem" id="tipoSelector">
                            <label style="display:flex;align-items:center;gap:.75rem;padding:.875rem 1rem;
                                border:2px solid var(--ink-200,#e5e7eb);border-radius:10px;cursor:pointer;
                                transition:all .2s" id="lblEmpleo"
                                onclick="seleccionarTipoPostulacion('empleo')">
                                <input type="radio" name="tipoPost" value="empleo" id="tipoEmpleo"
                                    style="display:none">
                                <span style="font-size:1.5rem">💼</span>
                                <div>
                                    <div style="font-weight:700;font-size:.875rem">Busco empleo</div>
                                    <div style="font-size:.72rem;color:var(--ink-400,#6b7280)">Relación de dependencia</div>
                                </div>
                            </label>
                            <label style="display:flex;align-items:center;gap:.75rem;padding:.875rem 1rem;
                                border:2px solid var(--ink-200,#e5e7eb);border-radius:10px;cursor:pointer;
                                transition:all .2s" id="lblColaborador"
                                onclick="seleccionarTipoPostulacion('colaborador')">
                                <input type="radio" name="tipoPost" value="colaborador" id="tipoColaborador"
                                    style="display:none">
                                <span style="font-size:1.5rem">🤝</span>
                                <div>
                                    <div style="font-weight:700;font-size:.875rem">Quiero colaborar</div>
                                    <div style="font-size:.72rem;color:var(--ink-400,#6b7280)">Trabajo independiente</div>
                                </div>
                            </label>
                        </div>
                        <input type="hidden" id="tipoPostulacion" value="">
                    </div>

                    <!-- Datos personales -->
                    <div class="grid grid-2">
                        <div class="form-group">
                            <label class="form-label">Nombre Completo *</label>
                            <input type="text" id="empNombre" class="form-input"
                                placeholder="Juan Pérez Gómez">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Cédula de Identidad *</label>
                            <input type="text" id="empCedula" class="form-input"
                                placeholder="1234567890" maxlength="10"
                                oninput="validarCedulaEmpleo()">
                            <div id="empCedulaMsg" style="font-size:.72rem;margin-top:.2rem"></div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">WhatsApp *</label>
                            <div style="display:flex;gap:.5rem">
                                <select id="empPais" class="form-select" style="width:115px;flex-shrink:0">
                                    <option value="+593">🇪🇨 +593</option>
                                    <option value="+57">🇨🇴 +57</option>
                                    <option value="+51">🇵🇪 +51</option>
                                    <option value="+1">🇺🇸 +1</option>
                                </select>
                                <input type="tel" id="empTelefono" class="form-input"
                                    placeholder="0999999999">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email (opcional)</label>
                            <input type="email" id="empEmail" class="form-input"
                                placeholder="correo@ejemplo.com">
                        </div>
                    </div>

                    <!-- Especialidades -->
                    <div class="form-group">
                        <label class="form-label">Especialidades * (selecciona todas las que apliquen)</label>
                        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:.5rem">
                            ${ESPECIALIDADES.map(e => `
                            <label style="display:flex;align-items:center;gap:.5rem;padding:.6rem .75rem;
                                border:1.5px solid var(--ink-200,#e5e7eb);border-radius:8px;cursor:pointer;
                                font-size:.82rem;transition:all .2s"
                                id="esp_${e.id}"
                                onclick="toggleEspecialidad('${e.id}')">
                                <input type="checkbox" id="chk_${e.id}" style="display:none">
                                <span>${e.icono}</span>
                                <span>${e.label}</span>
                            </label>`).join('')}
                        </div>
                    </div>

                    <!-- Nivel de experiencia -->
                    <div class="form-group">
                        <label class="form-label">Nivel de Experiencia *</label>
                        <select id="empNivel" class="form-select">
                            <option value="">Selecciona tu nivel...</option>
                            ${NIVELES_EXP.map(n =>
                                `<option value="${n.id}">${n.label}</option>`
                            ).join('')}
                        </select>
                    </div>

                    <!-- Zona de trabajo -->
                    <div class="form-group">
                        <label class="form-label">Zona donde puedes trabajar *</label>
                        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
                            ${['Quito Centro','Quito Sur','Quito Norte','Quito Valle','Todo Quito','Provincia'].map(z => `
                            <button type="button" onclick="toggleZona('${z}')" id="zona_${z.replace(/\s/g,'_')}"
                                style="padding:.45rem .9rem;border-radius:999px;font-size:.78rem;font-weight:600;
                                cursor:pointer;border:1.5px solid var(--ink-200,#e5e7eb);
                                background:transparent;transition:all .2s">
                                ${z}
                            </button>`).join('')}
                        </div>
                        <input type="hidden" id="empZonas" value="">
                    </div>

                    <!-- Disponibilidad -->
                    <div class="grid grid-2">
                        <div class="form-group">
                            <label class="form-label">Disponibilidad</label>
                            <select id="empDisponibilidad" class="form-select">
                                <option value="inmediata">Inmediata</option>
                                <option value="1_semana">En 1 semana</option>
                                <option value="1_mes">En 1 mes</option>
                                <option value="negociable">Negociable</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Pretensión salarial (opcional)</label>
                            <input type="text" id="empSalario" class="form-input"
                                placeholder="Ej: $600/mes o $25/día">
                        </div>
                    </div>

                    <!-- Descripción -->
                    <div class="form-group">
                        <label class="form-label">Cuéntanos sobre ti *
                            <span style="font-weight:400;text-transform:none;font-size:.72rem;
                                color:var(--ink-400,#6b7280)">
                                (experiencia, trabajos anteriores, por qué quieres trabajar con nosotros)
                            </span>
                        </label>
                        <textarea id="empDescripcion" class="form-textarea" rows="4"
                            maxlength="600"
                            oninput="document.getElementById('empCharCount').textContent=this.value.length"
                            placeholder="Ejemplo: Tengo 5 años de experiencia en carpintería, trabajé en..."></textarea>
                        <div style="text-align:right;font-size:.72rem;color:var(--ink-400,#6b7280)">
                            <span id="empCharCount">0</span>/600
                        </div>
                    </div>

                    <!-- CV link -->
                    <div class="form-group">
                        <label class="form-label">
                            Link a tu CV o portafolio (opcional)
                            <span style="font-weight:400;text-transform:none;font-size:.72rem;
                                color:var(--ink-400,#6b7280)">
                                Google Drive, LinkedIn, fotos de trabajos anteriores, etc.
                            </span>
                        </label>
                        <input type="url" id="empCV" class="form-input"
                            placeholder="https://drive.google.com/...">
                    </div>

                    <div id="empError" class="alert alert-warning hidden mb-3">
                        <i data-lucide="alert-circle"></i>
                        <span id="empErrorMsg"></span>
                    </div>

                    <button onclick="enviarPostulacion()" class="btn btn-primary w-full btn-large"
                        id="btnEmpleo">
                        <i data-lucide="send"></i>
                        Enviar Postulación
                    </button>
                    <p style="text-align:center;font-size:.72rem;color:var(--ink-400,#6b7280);
                               margin-top:.5rem">
                        Te contactaremos por WhatsApp en menos de 48 horas hábiles
                    </p>
                </div>
            </div>
        </div>
    </div>`;
}

// ── Helpers del formulario ────────────────────────────────────
function seleccionarTipoPostulacion(tipo) {
    document.getElementById('tipoPostulacion').value = tipo;
    const lblE = document.getElementById('lblEmpleo');
    const lblC = document.getElementById('lblColaborador');
    if (lblE) {
        lblE.style.borderColor = tipo==='empleo' ? '#f59e0b' : 'var(--ink-200,#e5e7eb)';
        lblE.style.background  = tipo==='empleo' ? '#fef9c3' : 'transparent';
    }
    if (lblC) {
        lblC.style.borderColor = tipo==='colaborador' ? '#6366f1' : 'var(--ink-200,#e5e7eb)';
        lblC.style.background  = tipo==='colaborador' ? '#ede9fe' : 'transparent';
    }
}

const _espSeleccionadas = new Set();
function toggleEspecialidad(id) {
    const lbl = document.getElementById('esp_'+id);
    const chk = document.getElementById('chk_'+id);
    if (_espSeleccionadas.has(id)) {
        _espSeleccionadas.delete(id);
        if (lbl) { lbl.style.borderColor='var(--ink-200,#e5e7eb)'; lbl.style.background='transparent'; }
        if (chk) chk.checked = false;
    } else {
        _espSeleccionadas.add(id);
        if (lbl) { lbl.style.borderColor='#f59e0b'; lbl.style.background='#fef9c3'; }
        if (chk) chk.checked = true;
    }
}

const _zonasSeleccionadas = new Set();
function toggleZona(zona) {
    const id = 'zona_'+zona.replace(/\s/g,'_');
    const btn = document.getElementById(id);
    if (_zonasSeleccionadas.has(zona)) {
        _zonasSeleccionadas.delete(zona);
        if (btn) { btn.style.background='transparent'; btn.style.borderColor='var(--ink-200,#e5e7eb)'; btn.style.color='inherit'; }
    } else {
        _zonasSeleccionadas.add(zona);
        if (btn) { btn.style.background='#f59e0b'; btn.style.borderColor='#f59e0b'; btn.style.color='#fff'; }
    }
    document.getElementById('empZonas').value = [..._zonasSeleccionadas].join(', ');
}

function validarCedulaEmpleo() {
    const cedula = document.getElementById('empCedula')?.value.trim() || '';
    const msg    = document.getElementById('empCedulaMsg');
    if (!msg || cedula.length < 10) return;
    const res = typeof validarCedulaEC === 'function' ? validarCedulaEC(cedula) : { valida: cedula.length===10 };
    msg.textContent = res.valida ? '✅ Cédula válida' : '❌ '+res.error;
    msg.style.color  = res.valida ? 'var(--color-success,#10b981)' : 'var(--color-error,#ef4444)';
}

function scrollToForm(tipo) {
    seleccionarTipoPostulacion(tipo);
    document.getElementById('formEmpleo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function enviarPostulacion() {
    const tipo    = document.getElementById('tipoPostulacion').value;
    const nombre  = document.getElementById('empNombre').value.trim();
    const cedula  = document.getElementById('empCedula').value.trim();
    const pais    = document.getElementById('empPais').value;
    const telRaw  = document.getElementById('empTelefono').value.trim();
    const nivel   = document.getElementById('empNivel').value;
    const desc    = document.getElementById('empDescripcion').value.trim();
    const zonas   = document.getElementById('empZonas').value;
    const errDiv  = document.getElementById('empError');
    const errMsg  = document.getElementById('empErrorMsg');

    const showErr = (msg) => {
        if (errMsg) errMsg.textContent = msg;
        if (errDiv) errDiv.classList.remove('hidden');
        return false;
    };

    if (!tipo)                          return showErr('Selecciona si buscas empleo o quieres colaborar');
    if (!nombre)                        return showErr('Ingresa tu nombre completo');
    if (!/^\d{10}$/.test(cedula))       return showErr('Ingresa una cédula válida de 10 dígitos');
    if (typeof validarCedulaEC === 'function' && !validarCedulaEC(cedula).valida)
                                        return showErr('La cédula no es válida. Verifica el número');
    if (!telRaw)                        return showErr('Ingresa tu número de WhatsApp');
    if (_espSeleccionadas.size === 0)   return showErr('Selecciona al menos una especialidad');
    if (!nivel)                         return showErr('Selecciona tu nivel de experiencia');
    if (desc.length < 30)               return showErr('Cuéntanos un poco más sobre ti (mínimo 30 caracteres)');
    if (!zonas)                         return showErr('Selecciona al menos una zona de trabajo');

    if (errDiv) errDiv.classList.add('hidden');

    const telefono = pais + ' ' + telRaw;
    const datos = {
        tipo,
        nombre,
        cedula,
        telefono,
        email:           document.getElementById('empEmail').value.trim(),
        especialidades:  [..._espSeleccionadas],
        nivel,
        zonas,
        disponibilidad:  document.getElementById('empDisponibilidad').value,
        salario:         document.getElementById('empSalario').value.trim(),
        descripcion:     desc,
        cvLink:          document.getElementById('empCV').value.trim(),
    };

    const postulacion = submitPostulacion(datos);

    // Enviar notificación a WhatsApp del soporte
    const espLabels = datos.especialidades.map(id =>
        ESPECIALIDADES.find(e => e.id === id)?.label || id
    ).join(', ');

    const tipoLabel = tipo === 'empleo' ? '💼 BUSCA EMPLEO' : '🤝 QUIERE COLABORAR';
    const msg = `${tipoLabel}\n\n` +
        `👤 ${nombre}\n🪪 Cédula: ${cedula}\n📱 ${telefono}\n\n` +
        `🔧 Especialidades: ${espLabels}\n` +
        `📊 Nivel: ${NIVELES_EXP.find(n=>n.id===nivel)?.label}\n` +
        `📍 Zonas: ${zonas}\n` +
        `🗓️ Disponibilidad: ${datos.disponibilidad}\n` +
        (datos.salario ? `💰 Pretensión: ${datos.salario}\n` : '') +
        `\n📝 ${desc.substring(0,200)}` +
        (datos.cvLink ? `\n\n🔗 CV/Portafolio: ${datos.cvLink}` : '');

    window.open(`https://wa.me/593981676646?text=${encodeURIComponent(msg)}`, '_blank');

    // Mostrar confirmación
    const main = document.getElementById('mainContent');
    if (main) {
        main.innerHTML = `
        <div class="fade-in" style="max-width:560px;margin:4rem auto;text-align:center;padding:0 1rem">
            <div style="font-size:4rem;margin-bottom:1.25rem">🎉</div>
            <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:2rem;
                font-weight:800;margin-bottom:.75rem">¡Postulación enviada!</h2>
            <p style="color:var(--ink-400,#6b7280);margin-bottom:.5rem;font-size:1rem">
                Gracias <strong>${nombre}</strong>, recibimos tu postulación.
            </p>
            <p style="color:var(--ink-400,#6b7280);margin-bottom:2rem;font-size:.9rem">
                Te contactaremos al ${telefono} en las próximas 48 horas hábiles.
            </p>
            <div style="background:var(--gold-100,#fef3c7);border-radius:12px;
                padding:1rem;margin-bottom:2rem;font-size:.875rem;color:#92400e">
                <strong>📱 También puedes enviarnos fotos de tus trabajos anteriores</strong><br>
                al WhatsApp de soporte: <strong>+593 98 167 6646</strong>
            </div>
            <button onclick="navigateTo('inicio')" class="btn btn-primary">
                <i data-lucide="home"></i> Volver al inicio
            </button>
        </div>`;
        lucide.createIcons();
    }
}

// ============================================================
// ADMIN — Panel de postulaciones
// ============================================================
function renderAdminEmpleo() {
    if (!isAdminAuthenticated()) { navigateTo('admin-login'); return ''; }

    const lista  = getPostulaciones();
    const stats  = getEstadisticasEmpleo();
    const filtro = window._filtroEmpleo || 'todos';

    const ESTADOS = {
        nueva:      { label: 'Nueva',      color: '#f59e0b', bg: '#fef9c3' },
        revisada:   { label: 'Revisada',   color: '#6366f1', bg: '#ede9fe' },
        contactado: { label: 'Contactado', color: '#10b981', bg: '#dcfce7' },
        descartada: { label: 'Descartada', color: '#94a3b8', bg: '#f1f5f9' },
    };

    const filtrados = filtro === 'todos' ? lista
        : filtro === 'empleo' || filtro === 'colaborador'
            ? lista.filter(p => p.tipo === filtro)
            : lista.filter(p => p.estado === filtro);

    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>👷 Portal de Empleo</h1>
                <p>${stats.total} postulaciones ·
                   <span style="color:#f59e0b">${stats.nuevas} nuevas</span> ·
                   ${stats.empleo} empleo · ${stats.colaborador} colaboradores ·
                   ${stats.contactados} contactados
                </p>
            </div>
            <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                <i data-lucide="arrow-left"></i> Panel
            </button>
        </div>

        <!-- Filtros -->
        <div class="flex gap-2 mb-4" style="flex-wrap:wrap">
            ${[
                ['todos',       'Todos',        stats.total,       '#64748b'],
                ['nueva',       '⭐ Nuevas',     stats.nuevas,      '#f59e0b'],
                ['empleo',      '💼 Empleo',     stats.empleo,      '#6366f1'],
                ['colaborador', '🤝 Colaboradores', stats.colaborador, '#10b981'],
                ['contactado',  '✅ Contactados', stats.contactados, '#10b981'],
            ].map(([k,label,cnt,color]) => {
                const act = filtro===k;
                return `<button onclick="filtrarEmpleo('${k}')"
                    style="padding:5px 14px;border-radius:999px;font-weight:700;font-size:.78rem;
                    cursor:pointer;border:2px solid ${color};
                    background:${act?color:'transparent'};color:${act?'#fff':color}">
                    ${label} (${cnt})</button>`;
            }).join('')}
        </div>

        ${filtrados.length === 0 ? `
        <div class="alert alert-warning">
            <i data-lucide="users"></i>
            <p>No hay postulaciones en esta categoría.</p>
        </div>` : `
        <div style="display:grid;gap:1rem">
            ${filtrados.map(p => {
                const ep = ESTADOS[p.estado] || ESTADOS.nueva;
                const espLabels = (p.especialidades||[]).map(id =>
                    ESPECIALIDADES.find(e=>e.id===id)?.icono + ' ' +
                    (ESPECIALIDADES.find(e=>e.id===id)?.label||id)
                ).join(' · ');
                const nivelLabel = NIVELES_EXP.find(n=>n.id===p.nivel)?.label || p.nivel;
                return `
                <div class="card" style="border-left:4px solid ${p.tipo==='empleo'?'#f59e0b':'#6366f1'}">
                    <div class="card-body">
                        <div style="display:flex;align-items:flex-start;justify-content:space-between;
                                    gap:1rem;flex-wrap:wrap;margin-bottom:1rem">
                            <div>
                                <div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap">
                                    <strong style="font-size:1rem">${p.nombre}</strong>
                                    <span style="background:${p.tipo==='empleo'?'#fef9c3':'#ede9fe'};
                                        color:${p.tipo==='empleo'?'#92400e':'#4338ca'};
                                        padding:2px 10px;border-radius:999px;font-size:.7rem;font-weight:700">
                                        ${p.tipo==='empleo'?'💼 Empleo':'🤝 Colaborador'}
                                    </span>
                                    <span style="background:${ep.bg};color:${ep.color};
                                        padding:2px 10px;border-radius:999px;font-size:.7rem;font-weight:700">
                                        ${ep.label}
                                    </span>
                                </div>
                                <div style="font-size:.78rem;color:var(--ink-400,#6b7280);margin-top:.25rem">
                                    🪪 ${p.cedula} · 📱 ${p.telefono}
                                    ${p.email ? ' · 📧 '+p.email : ''}
                                </div>
                                <div style="font-size:.75rem;color:var(--ink-400,#6b7280);margin-top:.1rem">
                                    📅 ${new Date(p.fechaEnvio).toLocaleDateString('es-EC',{day:'2-digit',month:'short',year:'numeric'})}
                                    ${p.cvLink ? ` · <a href="${p.cvLink}" target="_blank" style="color:#f59e0b;font-weight:700">Ver CV/Portafolio →</a>` : ''}
                                </div>
                            </div>
                            <!-- Botón WhatsApp directo -->
                            <a href="https://wa.me/${p.telefono.replace(/[^0-9]/g,'')}"
                               target="_blank" class="btn btn-success btn-sm">
                                <i data-lucide="message-circle"></i> WhatsApp
                            </a>
                        </div>

                        <!-- Especialidades y nivel -->
                        <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:.75rem">
                            ${(p.especialidades||[]).map(id => {
                                const e = ESPECIALIDADES.find(x=>x.id===id);
                                return `<span style="background:var(--ink-100,#f3f4f6);padding:2px 8px;
                                    border-radius:6px;font-size:.72rem;font-weight:600">
                                    ${e?.icono||''} ${e?.label||id}</span>`;
                            }).join('')}
                            <span style="background:#fef3c7;color:#92400e;padding:2px 8px;
                                border-radius:6px;font-size:.72rem;font-weight:600">
                                ${nivelLabel}
                            </span>
                            <span style="background:var(--ink-100,#f3f4f6);padding:2px 8px;
                                border-radius:6px;font-size:.72rem">
                                📍 ${p.zonas||'—'}
                            </span>
                        </div>

                        <!-- Descripción -->
                        <div style="font-size:.82rem;color:var(--ink-700,#2d2d3d);
                            background:var(--ink-50,#f9fafb);padding:.75rem;border-radius:8px;
                            margin-bottom:.75rem;border-left:3px solid var(--ink-200,#e5e7eb);
                            font-style:italic">
                            "${p.descripcion}"
                        </div>

                        ${p.salario ? `
                        <div style="font-size:.78rem;color:var(--ink-600,#3f3f55);margin-bottom:.75rem">
                            💰 Pretensión: <strong>${p.salario}</strong>
                            · 🗓️ Disponibilidad: <strong>${p.disponibilidad}</strong>
                        </div>` : ''}

                        <!-- Cambiar estado + nota -->
                        <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:flex-end">
                            <div class="form-group" style="margin:0;flex:1;min-width:180px">
                                <label class="form-label" style="font-size:.7rem">Cambiar estado</label>
                                <select onchange="cambiarEstadoPostulacion('${p.id}', this.value)"
                                    class="form-select" style="font-size:.8rem;padding:.4rem .65rem">
                                    ${Object.entries(ESTADOS).map(([k,v]) =>
                                        `<option value="${k}" ${p.estado===k?'selected':''}>${v.label}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="form-group" style="margin:0;flex:2;min-width:200px">
                                <label class="form-label" style="font-size:.7rem">Nota interna</label>
                                <input type="text" value="${p.notaAdmin||''}"
                                    id="notaEmp_${p.id}" class="form-input"
                                    style="font-size:.8rem;padding:.4rem .65rem"
                                    placeholder="Ej: Llamar martes, interesado en carpintería">
                            </div>
                            <button onclick="guardarNotaPostulacion('${p.id}')"
                                class="btn btn-secondary btn-sm">
                                <i data-lucide="save"></i>
                            </button>
                            <button onclick="eliminarPostulacion('${p.id}')"
                                class="btn btn-secondary btn-sm"
                                style="color:var(--color-error,#ef4444)">
                                <i data-lucide="trash-2"></i>
                            </button>
                        </div>
                        ${p.notaAdmin ? `
                        <div style="font-size:.75rem;color:var(--ink-400,#6b7280);
                            margin-top:.5rem;font-style:italic">
                            📝 ${p.notaAdmin}
                        </div>` : ''}
                    </div>
                </div>`;
            }).join('')}
        </div>`}
    </div>`;
}

function filtrarEmpleo(filtro) {
    window._filtroEmpleo = filtro;
    const main = document.getElementById('mainContent');
    if (main) { main.innerHTML = renderAdminEmpleo(); lucide.createIcons(); }
}

function cambiarEstadoPostulacion(id, nuevoEstado) {
    const lista = getPostulaciones();
    const idx   = lista.findIndex(p => String(p.id) === String(id));
    if (idx >= 0) {
        lista[idx].estado = nuevoEstado;
        savePostulaciones(lista);
        showNotification('Estado actualizado', 'success');
    }
}

function guardarNotaPostulacion(id) {
    const nota  = document.getElementById('notaEmp_'+id)?.value.trim() || '';
    const lista = getPostulaciones();
    const idx   = lista.findIndex(p => String(p.id) === String(id));
    if (idx >= 0) {
        lista[idx].notaAdmin = nota;
        savePostulaciones(lista);
        showNotification('✅ Nota guardada', 'success');
    }
}

function eliminarPostulacion(id) {
    if (!confirm('¿Eliminar esta postulación?')) return;
    savePostulaciones(getPostulaciones().filter(p => String(p.id) !== String(id)));
    filtrarEmpleo(window._filtroEmpleo || 'todos');
}