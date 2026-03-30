// ============================================================
// PORTAL DE EMPLEO Y COLABORADORES — Mueblería Benjamín
// v3.0 — Flujo correcto: datos se guardan en el sistema,
//         admin recibe email y contacta al postulante cuando decide.
//         El postulante NO necesita iniciar sesión ni esperar
//         una respuesta en el sitio web.
// ============================================================

const EMPLEO_KEY = 'portalEmpleo';

const ESPECIALIDADES = [
    { id: 'carpinteria',    label: 'Carpintería en madera',        icono: '🪵' },
    { id: 'cerrajeria',     label: 'Cerrajería / Tol / Soldadura', icono: '🔒' },
    { id: 'instalacion',    label: 'Instalación y montaje',        icono: '🔧' },
    { id: 'pintura',        label: 'Pintura y acabados',           icono: '🎨' },
    { id: 'diseño',         label: 'Diseño de interiores',         icono: '📐' },
    { id: 'electricidad',   label: 'Electricidad básica',          icono: '⚡' },
    { id: 'albanileria',    label: 'Albañilería',                  icono: '🧱' },
    { id: 'otros',          label: 'Otras habilidades',            icono: '⚙️' },
];

const NIVELES_EXP = [
    { id: 'aprendiz',      label: 'Aprendiz (0–1 años)'      },
    { id: 'intermedio',    label: 'Intermedio (1–3 años)'    },
    { id: 'experimentado', label: 'Experimentado (3–7 años)' },
    { id: 'maestro',       label: 'Maestro (7+ años)'        },
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
    const idx   = lista.findIndex(p => p.cedula === datos.cedula);
    const entrada = {
        id:         idx >= 0 ? lista[idx].id : Date.now(),
        ...datos,
        estado:     'nueva',
        fechaEnvio: new Date().toISOString(),
        notaAdmin:  ''
    };
    if (idx >= 0) lista[idx] = entrada;
    else          lista.unshift(entrada);
    savePostulaciones(lista);
    return entrada;
}

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

// ── Estado interno del formulario ────────────────────────────
let _espSeleccionadas   = new Set();
let _zonasSeleccionadas = new Set();
let _cvBase64           = null;

function initFormEmpleo() {
    _espSeleccionadas   = new Set();
    _zonasSeleccionadas = new Set();
    _cvBase64           = null;
    window._cvCargado   = false;
}

// ============================================================
// RENDER PÚBLICO — Portal de Empleo
// ============================================================
function renderPortalEmpleo() {
    initFormEmpleo();

    return `
    <div class="fade-in">

        <!-- Hero -->
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
                    🏗️ Portal de Empleo &amp; Colaboración
                </div>
                <h1 style="font-family:'Playfair Display',Georgia,serif;
                    font-size:clamp(1.75rem,4vw,2.75rem);font-weight:800;
                    color:#fff;line-height:1.2;letter-spacing:-.02em;margin-bottom:1rem">
                    Trabaja con los mejores<br>
                    <span style="color:#fbbf24">artesanos de Quito</span>
                </h1>
                <p style="color:rgba(255,255,255,.65);font-size:1rem;line-height:1.7;margin-bottom:2rem">
                    ¿Eres carpintero, soldador, instalador o pintor?
                    Deja tu hoja de vida y te contactaremos si tu perfil encaja.
                </p>
                <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
                    <button onclick="scrollToForm('empleo')"
                        style="padding:.75rem 1.75rem;background:linear-gradient(135deg,#f59e0b,#d97706);
                        color:#fff;border:none;border-radius:10px;font-weight:700;font-size:.9rem;cursor:pointer">
                        💼 Buscar empleo fijo
                    </button>
                    <button onclick="scrollToForm('colaborador')"
                        style="padding:.75rem 1.75rem;background:transparent;
                        color:#fbbf24;border:2px solid #f59e0b;border-radius:10px;
                        font-weight:700;font-size:.9rem;cursor:pointer">
                        🤝 Colaborar por proyectos
                    </button>
                </div>
            </div>
        </div>

        <div style="max-width:900px;margin:0 auto;padding:0 1rem">

            <!-- Aviso de cómo funciona el proceso -->
            <div style="background:#f0fdf4;border:1px solid #10b981;border-radius:12px;
                        padding:1.25rem 1.5rem;margin-bottom:2rem">
                <h3 style="font-size:.95rem;font-weight:800;color:#166534;margin-bottom:.75rem;
                            display:flex;align-items:center;gap:.5rem">
                    ℹ️ ¿Cómo funciona el proceso?
                </h3>
                <ol style="font-size:.85rem;color:#374151;line-height:2;margin:0;padding-left:1.25rem">
                    <li>Llenas el formulario y subes tu foto o CV</li>
                    <li>Tu hoja de vida queda registrada en nuestro sistema</li>
                    <li>Revisamos tu perfil — esto puede tomar varios días</li>
                    <li><strong>Si tu perfil encaja</strong>, te llamamos o escribimos al WhatsApp que dejaste</li>
                    <li>Si no recibes contacto en 15 días hábiles, significa que
                        en este momento no hay vacantes disponibles para tu perfil</li>
                </ol>
            </div>

            <!-- Diferencia entre los dos tipos -->
            <div class="grid grid-2 mb-4">
                <div class="card" style="border-left:4px solid #f59e0b">
                    <div class="card-body">
                        <div style="font-size:2.5rem;margin-bottom:.75rem">💼</div>
                        <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:.5rem">Empleo Fijo</h3>
                        <p style="font-size:.875rem;color:var(--ink-400,#6b7280);line-height:1.6">
                            Relación de dependencia, horario definido, contrato, beneficios de ley (IESS).
                        </p>
                    </div>
                </div>
                <div class="card" style="border-left:4px solid #6366f1">
                    <div class="card-body">
                        <div style="font-size:2.5rem;margin-bottom:.75rem">🤝</div>
                        <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:.5rem">Colaborador</h3>
                        <p style="font-size:.875rem;color:var(--ink-400,#6b7280);line-height:1.6">
                            Trabajo independiente por proyecto, horario flexible, pago por obra entregada.
                        </p>
                    </div>
                </div>
            </div>

            <!-- FORMULARIO -->
            <div class="card" id="formEmpleo">
                <div style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff;
                            padding:1.5rem;border-radius:16px 16px 0 0">
                    <h2 style="font-size:1.25rem;font-weight:800;margin-bottom:.25rem">
                        📋 Hoja de Vida
                    </h2>
                    <p style="font-size:.8rem;opacity:.85;margin:0">
                        Todos los campos son obligatorios salvo LinkedIn.
                        Tus datos solo serán usados para el proceso de selección.
                    </p>
                </div>
                <div class="card-body">

                    <!-- Tipo -->
                    <div class="form-group">
                        <label class="form-label">¿Qué tipo de trabajo buscas? *</label>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
                            <div style="display:flex;align-items:center;gap:.75rem;
                                padding:.875rem 1rem;border:2px solid var(--ink-200,#e5e7eb);
                                border-radius:10px;cursor:pointer;transition:all .2s;user-select:none"
                                id="lblEmpleo"
                                onclick="seleccionarTipoPostulacion('empleo')">
                                <span style="font-size:1.5rem">💼</span>
                                <div>
                                    <div style="font-weight:700;font-size:.875rem">Empleo fijo</div>
                                    <div style="font-size:.72rem;color:var(--ink-400,#6b7280)">Relación de dependencia</div>
                                </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:.75rem;
                                padding:.875rem 1rem;border:2px solid var(--ink-200,#e5e7eb);
                                border-radius:10px;cursor:pointer;transition:all .2s;user-select:none"
                                id="lblColaborador"
                                onclick="seleccionarTipoPostulacion('colaborador')">
                                <span style="font-size:1.5rem">🤝</span>
                                <div>
                                    <div style="font-weight:700;font-size:.875rem">Colaborador</div>
                                    <div style="font-size:.72rem;color:var(--ink-400,#6b7280)">Independiente por proyecto</div>
                                </div>
                            </div>
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
                            <label class="form-label">WhatsApp *
                                <span style="font-weight:400;text-transform:none;font-size:.72rem;
                                    color:var(--ink-400,#6b7280)">— aquí te contactaremos si aplicas</span>
                            </label>
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
                            <label class="form-label">Email *</label>
                            <input type="email" id="empEmail" class="form-input"
                                placeholder="correo@ejemplo.com">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Dirección / Sector *</label>
                            <input type="text" id="empDireccion" class="form-input"
                                placeholder="Barrio, parroquia o sector donde vives">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Edad *</label>
                            <input type="number" id="empEdad" class="form-input"
                                placeholder="Ej: 28" min="16" max="75">
                        </div>
                    </div>

                    <!-- LinkedIn (OPCIONAL) -->
                    <div class="form-group">
                        <label class="form-label">
                            Perfil de LinkedIn
                            <span style="font-weight:400;text-transform:none;
                                font-size:.72rem;color:var(--ink-400,#6b7280);margin-left:.35rem">
                                (opcional)
                            </span>
                        </label>
                        <input type="url" id="empLinkedIn" class="form-input"
                            placeholder="https://linkedin.com/in/tu-perfil">
                    </div>

                    <!-- Especialidades — DIV en lugar de LABEL para evitar doble disparo -->
                    <div class="form-group">
                        <label class="form-label">
                            Especialidades *
                            <span style="font-weight:400;text-transform:none;font-size:.72rem;
                                color:var(--ink-400,#6b7280)">— selecciona todas las que apliquen</span>
                        </label>
                        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:.5rem">
                            ${ESPECIALIDADES.map(e => `
                            <div style="display:flex;align-items:center;gap:.5rem;
                                padding:.6rem .75rem;border:1.5px solid var(--ink-200,#e5e7eb);
                                border-radius:8px;cursor:pointer;font-size:.82rem;
                                transition:all .2s;user-select:none"
                                id="esp_${e.id}"
                                onclick="toggleEspecialidad('${e.id}')">
                                <span>${e.icono}</span>
                                <span>${e.label}</span>
                            </div>`).join('')}
                        </div>
                    </div>

                    <!-- Nivel -->
                    <div class="form-group">
                        <label class="form-label">Nivel de Experiencia *</label>
                        <select id="empNivel" class="form-select">
                            <option value="">Selecciona tu nivel...</option>
                            ${NIVELES_EXP.map(n =>
                                `<option value="${n.id}">${n.label}</option>`
                            ).join('')}
                        </select>
                    </div>

                    <!-- Zonas -->
                    <div class="form-group">
                        <label class="form-label">Zona donde puedes trabajar *</label>
                        <div style="display:flex;gap:.5rem;flex-wrap:wrap">
                            ${['Quito Centro','Quito Sur','Quito Norte','Quito Valle','Todo Quito','Provincia'].map(z => `
                            <button type="button" onclick="toggleZona('${z}')"
                                id="zona_${z.replace(/\s/g,'_')}"
                                style="padding:.45rem .9rem;border-radius:999px;font-size:.78rem;
                                font-weight:600;cursor:pointer;
                                border:1.5px solid var(--ink-200,#e5e7eb);
                                background:transparent;transition:all .2s;user-select:none">
                                ${z}
                            </button>`).join('')}
                        </div>
                        <input type="hidden" id="empZonas" value="">
                    </div>

                    <!-- Disponibilidad + Pretensión -->
                    <div class="grid grid-2">
                        <div class="form-group">
                            <label class="form-label">Disponibilidad *</label>
                            <select id="empDisponibilidad" class="form-select">
                                <option value="">Selecciona...</option>
                                <option value="Inmediata">Inmediata</option>
                                <option value="En 1 semana">En 1 semana</option>
                                <option value="En 1 mes">En 1 mes</option>
                                <option value="Negociable">Negociable</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Pretensión salarial *</label>
                            <input type="text" id="empSalario" class="form-input"
                                placeholder="Ej: $600/mes ó $25/día">
                        </div>
                    </div>

                    <!-- Descripción -->
                    <div class="form-group">
                        <label class="form-label">
                            Sobre ti *
                            <span style="font-weight:400;text-transform:none;font-size:.72rem;
                                color:var(--ink-400,#6b7280)">
                                — experiencia, trabajos anteriores, por qué quieres trabajar con nosotros
                            </span>
                        </label>
                        <textarea id="empDescripcion" class="form-textarea" rows="5" maxlength="600"
                            oninput="document.getElementById('empCharCount').textContent=this.value.length"
                            placeholder="Ejemplo: Tengo 5 años de experiencia en carpintería. Trabajé en empresa X... Me interesa este puesto porque..."></textarea>
                        <div style="display:flex;justify-content:space-between;
                                    font-size:.72rem;color:var(--ink-400,#6b7280);margin-top:.25rem">
                            <span>Mínimo 50 caracteres</span>
                            <span><span id="empCharCount">0</span>/600</span>
                        </div>
                    </div>

                    <!-- Upload foto/CV -->
                    <div class="form-group">
                        <label class="form-label">
                            Foto o CV *
                            <span style="font-weight:400;text-transform:none;font-size:.72rem;
                                color:var(--ink-400,#6b7280)">
                                — foto tuya trabajando, foto del carnet, o PDF de tu hoja de vida
                            </span>
                        </label>
                        <div id="cvUploadArea"
                            onclick="document.getElementById('empCVFile').click()"
                            style="border:2px dashed var(--ink-200,#e5e7eb);border-radius:12px;
                                   padding:2rem;text-align:center;cursor:pointer;
                                   background:var(--ink-50,#f9fafb);transition:all .25s"
                            onmouseover="this.style.borderColor='#f59e0b';this.style.background='#fef9c3'"
                            onmouseout="if(!window._cvCargado){this.style.borderColor='var(--ink-200,#e5e7eb)';this.style.background='var(--ink-50,#f9fafb)'}">
                            <div id="cvUploadContent">
                                <div style="font-size:2.5rem;margin-bottom:.5rem">📎</div>
                                <p style="font-size:.875rem;font-weight:700;
                                    color:var(--ink-700,#2d2d3d);margin-bottom:.25rem">
                                    Toca aquí para subir tu foto o CV
                                </p>
                                <p style="font-size:.75rem;color:var(--ink-400,#6b7280);margin:0">
                                    JPG, PNG, PDF — máx. 3MB
                                </p>
                            </div>
                        </div>
                        <input type="file" id="empCVFile" accept="image/*,.pdf"
                            style="display:none" onchange="cargarArchivoCV(this)">
                        <div id="cvMsg" style="font-size:.75rem;margin-top:.4rem"></div>
                    </div>

                    <!-- Error -->
                    <div id="empError" class="alert alert-warning hidden mb-3">
                        <i data-lucide="alert-circle"></i>
                        <span id="empErrorMsg"></span>
                    </div>

                    <button onclick="enviarPostulacion()" id="btnEmpleo"
                        class="btn btn-primary w-full"
                        style="padding:1rem;font-size:1rem;margin-top:.5rem">
                        <i data-lucide="send"></i>
                        Enviar Hoja de Vida
                    </button>

                    <p style="text-align:center;font-size:.78rem;color:var(--ink-400,#6b7280);
                               margin-top:.75rem;line-height:1.6">
                        🔒 Tus datos se guardan de forma segura y solo serán usados
                        para el proceso de selección.
                    </p>
                </div>
            </div>
        </div>
    </div>`;
}

// ── Helpers del formulario ────────────────────────────────────

function seleccionarTipoPostulacion(tipo) {
    document.getElementById('tipoPostulacion').value = tipo;
    const e = document.getElementById('lblEmpleo');
    const c = document.getElementById('lblColaborador');
    if (e) { e.style.borderColor = tipo === 'empleo' ? '#f59e0b' : 'var(--ink-200,#e5e7eb)'; e.style.background = tipo === 'empleo' ? '#fef9c3' : 'transparent'; }
    if (c) { c.style.borderColor = tipo === 'colaborador' ? '#6366f1' : 'var(--ink-200,#e5e7eb)'; c.style.background = tipo === 'colaborador' ? '#ede9fe' : 'transparent'; }
}

// FIX: div en lugar de label — no hay doble disparo del click
function toggleEspecialidad(id) {
    const el = document.getElementById('esp_' + id);
    if (_espSeleccionadas.has(id)) {
        _espSeleccionadas.delete(id);
        if (el) { el.style.borderColor = 'var(--ink-200,#e5e7eb)'; el.style.background = 'transparent'; el.style.color = 'inherit'; el.style.fontWeight = 'normal'; }
    } else {
        _espSeleccionadas.add(id);
        if (el) { el.style.borderColor = '#f59e0b'; el.style.background = '#fef9c3'; el.style.color = '#92400e'; el.style.fontWeight = '700'; }
    }
}

function toggleZona(zona) {
    const btn = document.getElementById('zona_' + zona.replace(/\s/g, '_'));
    if (_zonasSeleccionadas.has(zona)) {
        _zonasSeleccionadas.delete(zona);
        if (btn) { btn.style.background = 'transparent'; btn.style.borderColor = 'var(--ink-200,#e5e7eb)'; btn.style.color = 'inherit'; }
    } else {
        _zonasSeleccionadas.add(zona);
        if (btn) { btn.style.background = '#f59e0b'; btn.style.borderColor = '#f59e0b'; btn.style.color = '#fff'; }
    }
    document.getElementById('empZonas').value = [..._zonasSeleccionadas].join(', ');
}

function validarCedulaEmpleo() {
    const cedula = document.getElementById('empCedula')?.value.trim() || '';
    const msg    = document.getElementById('empCedulaMsg');
    if (!msg || cedula.length < 10) return;
    const res = typeof validarCedulaEC === 'function'
        ? validarCedulaEC(cedula)
        : { valida: cedula.length === 10 };
    msg.textContent = res.valida ? '✅ Cédula válida' : '❌ ' + res.error;
    msg.style.color = res.valida ? '#10b981' : '#ef4444';
}

function cargarArchivoCV(input) {
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
        const msg = document.getElementById('cvMsg');
        if (msg) { msg.textContent = '❌ El archivo supera los 3MB. Elige uno más pequeño.'; msg.style.color = '#ef4444'; }
        _cvBase64 = null; window._cvCargado = false; return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        _cvBase64 = e.target.result;
        window._cvCargado = true;
        const area    = document.getElementById('cvUploadArea');
        const content = document.getElementById('cvUploadContent');
        const msg     = document.getElementById('cvMsg');
        if (content) {
            if (file.type.startsWith('image/')) {
                content.innerHTML = `
                    <img src="${_cvBase64}" alt="Vista previa"
                        style="max-height:160px;max-width:100%;border-radius:8px;
                               object-fit:contain;margin-bottom:.5rem">
                    <p style="font-size:.8rem;font-weight:700;color:#166534;margin:0">✅ ${file.name}</p>
                    <p style="font-size:.72rem;color:#6b7280;margin:.2rem 0 0">Toca para cambiar</p>`;
            } else {
                content.innerHTML = `
                    <div style="font-size:3rem;margin-bottom:.5rem">📄</div>
                    <p style="font-size:.875rem;font-weight:700;color:#166534;margin:0">✅ ${file.name}</p>
                    <p style="font-size:.72rem;color:#6b7280;margin:.2rem 0 0">PDF cargado — toca para cambiar</p>`;
            }
        }
        if (area) { area.style.borderColor = '#10b981'; area.style.background = '#f0fdf4'; }
        if (msg)  { msg.textContent = ''; }
    };
    reader.onerror = () => { _cvBase64 = null; window._cvCargado = false; };
    reader.readAsDataURL(file);
}

function scrollToForm(tipo) {
    seleccionarTipoPostulacion(tipo);
    document.getElementById('formEmpleo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Enviar postulación ────────────────────────────────────────
function enviarPostulacion() {
    const errDiv = document.getElementById('empError');
    const errMsg = document.getElementById('empErrorMsg');

    const showErr = (msg) => {
        if (errMsg) errMsg.textContent = msg;
        if (errDiv) errDiv.classList.remove('hidden');
        errDiv?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    };
    if (errDiv) errDiv.classList.add('hidden');

    const tipo      = document.getElementById('tipoPostulacion').value;
    const nombre    = document.getElementById('empNombre').value.trim();
    const cedula    = document.getElementById('empCedula').value.trim();
    const pais      = document.getElementById('empPais').value;
    const telRaw    = document.getElementById('empTelefono').value.trim();
    const email     = document.getElementById('empEmail').value.trim();
    const direccion = document.getElementById('empDireccion').value.trim();
    const edad      = document.getElementById('empEdad').value.trim();
    const nivel     = document.getElementById('empNivel').value;
    const desc      = document.getElementById('empDescripcion').value.trim();
    const zonas     = document.getElementById('empZonas').value;
    const disponib  = document.getElementById('empDisponibilidad').value;
    const salario   = document.getElementById('empSalario').value.trim();
    const linkedIn  = document.getElementById('empLinkedIn').value.trim();

    if (!tipo)                                                               return showErr('Selecciona si buscas empleo fijo o quieres colaborar.');
    if (!nombre)                                                             return showErr('Ingresa tu nombre completo.');
    if (!/^\d{10}$/.test(cedula))                                           return showErr('Ingresa una cédula válida de 10 dígitos.');
    if (typeof validarCedulaEC === 'function' && !validarCedulaEC(cedula).valida) return showErr('La cédula no es válida. Verifica el número.');
    if (!telRaw)                                                             return showErr('Ingresa tu número de WhatsApp.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))               return showErr('Ingresa un email válido.');
    if (!direccion)                                                          return showErr('Ingresa tu dirección o sector.');
    if (!edad || parseInt(edad) < 16 || parseInt(edad) > 75)               return showErr('Ingresa una edad válida (entre 16 y 75 años).');
    if (_espSeleccionadas.size === 0)                                        return showErr('Selecciona al menos una especialidad.');
    if (!nivel)                                                              return showErr('Selecciona tu nivel de experiencia.');
    if (!zonas)                                                              return showErr('Selecciona al menos una zona de trabajo.');
    if (!disponib)                                                           return showErr('Selecciona tu disponibilidad.');
    if (!salario)                                                            return showErr('Indica tu pretensión salarial.');
    if (desc.length < 50)                                                    return showErr('Cuéntanos más sobre ti (mínimo 50 caracteres).');
    if (!_cvBase64)                                                          return showErr('Sube tu foto o CV antes de continuar.');

    const btn = document.getElementById('btnEmpleo');
    if (btn) { btn.disabled = true; btn.innerHTML = '<div class="spinner" style="width:18px;height:18px;border-width:2px;display:inline-block"></div> Guardando...'; }

    const telefono = pais + ' ' + telRaw;
    const datos = {
        tipo, nombre, cedula, telefono, email,
        direccion, edad: parseInt(edad),
        especialidades: [..._espSeleccionadas],
        nivel, zonas,
        disponibilidad: disponib,
        salario, descripcion: desc,
        linkedIn: linkedIn || '',
        cvBase64: _cvBase64,
    };

    // Guardar en el sistema
    submitPostulacion(datos);

    // Notificar al dueño por email (no requiere acción del postulante)
    if (typeof notifEmpleo === 'function') {
        notifEmpleo(datos);
    }

    // Pantalla de confirmación — sin WhatsApp, sin promesas de tiempo exacto
    const main = document.getElementById('mainContent');
    if (main) {
        main.innerHTML = `
        <div class="fade-in" style="max-width:580px;margin:4rem auto;padding:0 1rem">
            <div style="text-align:center;margin-bottom:2rem">
                <div style="width:80px;height:80px;background:linear-gradient(135deg,#10b981,#059669);
                    border-radius:50%;display:flex;align-items:center;justify-content:center;
                    font-size:2.5rem;margin:0 auto 1.25rem">✅</div>
                <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:2rem;
                    font-weight:800;margin-bottom:.75rem">¡Hoja de vida recibida!</h2>
                <p style="color:var(--ink-400,#6b7280);font-size:1rem;margin-bottom:0">
                    Gracias <strong>${nombre}</strong>, tu información quedó registrada.
                </p>
            </div>

            <div style="background:#f0fdf4;border:1px solid #10b981;border-radius:12px;
                        padding:1.5rem;margin-bottom:1.5rem">
                <h3 style="font-size:.95rem;font-weight:800;color:#166534;margin-bottom:1rem">
                    ¿Y ahora qué?
                </h3>
                <ol style="font-size:.875rem;color:#374151;line-height:2.2;
                            margin:0;padding-left:1.25rem">
                    <li>Revisaremos tu perfil en los próximos días</li>
                    <li>Si tu experiencia encaja con lo que necesitamos,
                        <strong>te llamaremos o escribiremos al ${telefono}</strong></li>
                    <li>Si no recibes contacto en <strong>15 días hábiles</strong>,
                        significa que en este momento no tenemos una vacante
                        disponible para tu perfil — pero guardaremos tu hoja de vida</li>
                </ol>
            </div>

            <div style="background:#fef9c3;border:1px solid #f59e0b;border-radius:12px;
                        padding:1rem 1.25rem;margin-bottom:1.5rem;font-size:.85rem;color:#92400e">
                <strong>💡 Consejo:</strong> No es necesario que llames o escribas para consultar el estado
                de tu postulación. Nosotros te contactamos si hay una oportunidad para ti.
            </div>

            <div style="text-align:center">
                <button onclick="navigateTo('inicio')" class="btn btn-primary">
                    <i data-lucide="home"></i> Volver al inicio
                </button>
            </div>
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
    const filtro = window._filtroEmpleo || 'nueva';

    const ESTADOS_EMP = {
        nueva:      { label: '🆕 Nueva',      color: '#f59e0b', bg: '#fef9c3' },
        revisada:   { label: '👁️ Revisada',   color: '#6366f1', bg: '#ede9fe' },
        contactado: { label: '📞 Contactado', color: '#10b981', bg: '#dcfce7' },
        descartada: { label: '❌ Descartada', color: '#94a3b8', bg: '#f1f5f9' },
    };

    const filtrados = filtro === 'todos' ? lista
        : (filtro === 'empleo' || filtro === 'colaborador')
            ? lista.filter(p => p.tipo === filtro)
            : lista.filter(p => p.estado === filtro);

    return `
    <div class="fade-in">
        <div class="admin-header">
            <div>
                <h1>👷 Postulaciones de Empleo</h1>
                <p>${stats.total} registradas ·
                   <span style="color:#f59e0b;font-weight:700">${stats.nuevas} nuevas sin revisar</span> ·
                   ${stats.empleo} empleo fijo · ${stats.colaborador} colaboradores ·
                   ${stats.contactados} contactados
                </p>
            </div>
            <button onclick="navigateTo('admin-panel')" class="btn btn-secondary">
                <i data-lucide="arrow-left"></i> Panel
            </button>
        </div>

        ${stats.nuevas > 0 ? `
        <div class="alert alert-warning mb-4">
            <i data-lucide="bell"></i>
            <div>
                <strong>Tienes ${stats.nuevas} postulación${stats.nuevas > 1 ? 'es' : ''} sin revisar.</strong>
                <p style="font-size:.85rem;margin:.2rem 0 0">
                    Revisa cada perfil y marca las acciones correspondientes.
                    Solo contacta a quienes encajan con lo que necesitas.
                </p>
            </div>
        </div>` : ''}

        <!-- Filtros -->
        <div class="flex gap-2 mb-4" style="flex-wrap:wrap">
            ${[
                ['todos',       `Todas (${stats.total})`,              '#64748b'],
                ['nueva',       `🆕 Sin revisar (${stats.nuevas})`,   '#f59e0b'],
                ['revisada',    `👁️ Revisadas`,                        '#6366f1'],
                ['contactado',  `📞 Contactadas`,                      '#10b981'],
                ['descartada',  `❌ Descartadas`,                      '#94a3b8'],
                ['empleo',      `💼 Empleo fijo (${stats.empleo})`,    '#b45309'],
                ['colaborador', `🤝 Colaborador (${stats.colaborador})`, '#6366f1'],
            ].map(([k, label, color]) => {
                const act = filtro === k;
                return `<button onclick="filtrarEmpleo('${k}')"
                    style="padding:5px 14px;border-radius:999px;font-weight:700;font-size:.78rem;
                    cursor:pointer;border:2px solid ${color};
                    background:${act ? color : 'transparent'};color:${act ? '#fff' : color}">
                    ${label}</button>`;
            }).join('')}
        </div>

        ${filtrados.length === 0 ? `
        <div class="alert" style="background:#f8fafc;border:1px solid var(--ink-200,#e5e7eb)">
            <i data-lucide="inbox"></i>
            <p>No hay postulaciones en esta categoría.</p>
        </div>` : `
        <div style="display:grid;gap:1.25rem">
            ${filtrados.map(p => {
                const ep = ESTADOS_EMP[p.estado] || ESTADOS_EMP.nueva;
                const nivelLabel = NIVELES_EXP.find(n => n.id === p.nivel)?.label || p.nivel;
                const telLimpio  = p.telefono.replace(/[^0-9]/g, '');
                return `
                <div class="card" style="border-left:5px solid ${p.tipo === 'empleo' ? '#f59e0b' : '#6366f1'}">
                    <div class="card-body">

                        <!-- Cabecera -->
                        <div style="display:flex;align-items:flex-start;justify-content:space-between;
                                    gap:1rem;flex-wrap:wrap;margin-bottom:1rem">
                            <div>
                                <div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;margin-bottom:.35rem">
                                    <strong style="font-size:1.05rem">${p.nombre}</strong>
                                    <span style="background:${p.tipo === 'empleo' ? '#fef9c3' : '#ede9fe'};
                                        color:${p.tipo === 'empleo' ? '#92400e' : '#4338ca'};
                                        padding:2px 10px;border-radius:999px;font-size:.7rem;font-weight:700">
                                        ${p.tipo === 'empleo' ? '💼 Empleo fijo' : '🤝 Colaborador'}
                                    </span>
                                    <span style="background:${ep.bg};color:${ep.color};
                                        padding:2px 10px;border-radius:999px;font-size:.7rem;font-weight:700">
                                        ${ep.label}
                                    </span>
                                </div>
                                <div style="font-size:.78rem;color:var(--ink-400,#6b7280)">
                                    🪪 ${p.cedula} · ${p.edad || '—'} años · 📍 ${p.direccion || '—'}
                                </div>
                                <div style="font-size:.75rem;color:var(--ink-400,#6b7280);margin-top:.15rem">
                                    📱 ${p.telefono} · 📧 ${p.email}
                                    ${p.linkedIn ? ` · <a href="${p.linkedIn}" target="_blank"
                                        style="color:#6366f1;font-weight:700">LinkedIn →</a>` : ''}
                                </div>
                                <div style="font-size:.72rem;color:var(--ink-400,#6b7280);margin-top:.1rem">
                                    📅 Recibido: ${new Date(p.fechaEnvio).toLocaleDateString('es-EC', { day:'2-digit', month:'short', year:'numeric' })}
                                </div>
                            </div>

                            <!-- Botones de contacto -->
                            <div style="display:flex;flex-direction:column;gap:.4rem;min-width:140px">
                                <a href="https://wa.me/${telLimpio}?text=${encodeURIComponent(
                                    `Hola ${p.nombre}, soy de Mueblería y Cerrajería Benjamín. Revisé tu postulación y me gustaría conversar contigo.`
                                )}" target="_blank"
                                    onclick="marcarContactado('${p.id}')"
                                    class="btn btn-success btn-sm"
                                    style="text-align:center;text-decoration:none">
                                    <i data-lucide="message-circle"></i> Contactar
                                </a>
                                <a href="tel:${telLimpio}"
                                    onclick="marcarContactado('${p.id}')"
                                    class="btn btn-secondary btn-sm"
                                    style="text-align:center;text-decoration:none">
                                    <i data-lucide="phone"></i> Llamar
                                </a>
                            </div>
                        </div>

                        <!-- CV / Foto -->
                        ${p.cvBase64 ? `
                        <div style="margin-bottom:.875rem">
                            ${p.cvBase64.startsWith('data:image') ? `
                            <img src="${p.cvBase64}" alt="CV de ${p.nombre}"
                                style="max-height:140px;border-radius:8px;object-fit:contain;
                                       border:1px solid var(--ink-200,#e5e7eb);cursor:pointer"
                                onclick="this.style.maxHeight=this.style.maxHeight==='none'?'140px':'none'"
                                title="Click para ampliar">` : `
                            <a href="${p.cvBase64}" download="cv_${p.nombre.replace(/\s/g,'_')}.pdf"
                               class="btn btn-secondary btn-sm">
                                <i data-lucide="download"></i> Descargar CV (PDF)
                            </a>`}
                        </div>` : ''}

                        <!-- Especialidades y detalles -->
                        <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.875rem">
                            ${(p.especialidades || []).map(id => {
                                const esp = ESPECIALIDADES.find(x => x.id === id);
                                return `<span style="background:var(--ink-100,#f3f4f6);
                                    padding:2px 8px;border-radius:6px;font-size:.72rem;font-weight:600">
                                    ${esp?.icono || ''} ${esp?.label || id}</span>`;
                            }).join('')}
                            <span style="background:#fef3c7;color:#92400e;
                                padding:2px 8px;border-radius:6px;font-size:.72rem;font-weight:600">
                                📊 ${nivelLabel}
                            </span>
                            <span style="background:var(--ink-100,#f3f4f6);
                                padding:2px 8px;border-radius:6px;font-size:.72rem">
                                📍 ${p.zonas || '—'}
                            </span>
                            <span style="background:#dcfce7;color:#166534;
                                padding:2px 8px;border-radius:6px;font-size:.72rem;font-weight:600">
                                🗓️ ${p.disponibilidad} · 💰 ${p.salario}
                            </span>
                        </div>

                        <!-- Descripción -->
                        <div style="font-size:.82rem;color:var(--ink-700,#2d2d3d);
                            background:var(--ink-50,#f9fafb);padding:.75rem 1rem;
                            border-radius:8px;margin-bottom:.875rem;
                            border-left:3px solid var(--ink-200,#e5e7eb);font-style:italic;
                            line-height:1.6">
                            "${p.descripcion}"
                        </div>

                        <!-- Estado + Nota -->
                        <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:flex-end">
                            <div class="form-group" style="margin:0;flex:1;min-width:150px">
                                <label class="form-label" style="font-size:.7rem">Estado</label>
                                <select onchange="cambiarEstadoPostulacion('${p.id}', this.value)"
                                    class="form-select" style="font-size:.8rem;padding:.4rem .65rem">
                                    ${Object.entries(ESTADOS_EMP).map(([k, v]) =>
                                        `<option value="${k}" ${p.estado === k ? 'selected' : ''}>${v.label}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="form-group" style="margin:0;flex:2;min-width:200px">
                                <label class="form-label" style="font-size:.7rem">Nota interna</label>
                                <input type="text" id="notaEmp_${p.id}"
                                    value="${p.notaAdmin || ''}"
                                    class="form-input"
                                    style="font-size:.8rem;padding:.4rem .65rem"
                                    placeholder="Ej: Llamar jueves, interesante perfil">
                            </div>
                            <button onclick="guardarNotaPostulacion('${p.id}')"
                                class="btn btn-secondary btn-sm" title="Guardar nota">
                                <i data-lucide="save"></i>
                            </button>
                            <button onclick="confirmarEliminarPostulacion('${p.id}','${p.nombre}')"
                                class="btn btn-secondary btn-sm"
                                style="color:#ef4444" title="Eliminar">
                                <i data-lucide="trash-2"></i>
                            </button>
                        </div>
                        ${p.notaAdmin ? `
                        <div style="font-size:.75rem;color:var(--ink-400,#6b7280);
                            margin-top:.5rem;font-style:italic">📝 ${p.notaAdmin}</div>` : ''}
                    </div>
                </div>`;
            }).join('')}
        </div>`}
    </div>`;
}

// ── Acciones del admin ────────────────────────────────────────

function marcarContactado(id) {
    // Marcar automáticamente como contactado al hacer clic en Contactar/Llamar
    const lista = getPostulaciones();
    const idx   = lista.findIndex(p => String(p.id) === String(id));
    if (idx >= 0 && lista[idx].estado === 'nueva') {
        lista[idx].estado = 'contactado';
        savePostulaciones(lista);
    }
}

function filtrarEmpleo(filtro) {
    window._filtroEmpleo = filtro;
    const main = document.getElementById('mainContent');
    if (main) { main.innerHTML = renderAdminEmpleo(); lucide.createIcons(); }
}

function cambiarEstadoPostulacion(id, nuevoEstado) {
    const lista = getPostulaciones();
    const idx   = lista.findIndex(p => String(p.id) === String(id));
    if (idx >= 0) { lista[idx].estado = nuevoEstado; savePostulaciones(lista); showNotification('Estado actualizado', 'success'); }
}

function guardarNotaPostulacion(id) {
    const nota  = document.getElementById('notaEmp_' + id)?.value.trim() || '';
    const lista = getPostulaciones();
    const idx   = lista.findIndex(p => String(p.id) === String(id));
    if (idx >= 0) { lista[idx].notaAdmin = nota; savePostulaciones(lista); showNotification('✅ Nota guardada', 'success'); }
}

function confirmarEliminarPostulacion(id, nombre) {
    if (!confirm(`¿Eliminar la postulación de "${nombre}"?\nEsta acción no se puede deshacer.`)) return;
    savePostulaciones(getPostulaciones().filter(p => String(p.id) !== String(id)));
    showNotification('Postulación eliminada', 'info');
    filtrarEmpleo(window._filtroEmpleo || 'nueva');
}

// Alias mantenido por compatibilidad con páginas anteriores
function eliminarPostulacion(id) {
    const lista = getPostulaciones();
    const p     = lista.find(x => String(x.id) === String(id));
    confirmarEliminarPostulacion(id, p?.nombre || id);
}