// ============================================================
// SISTEMA DE NOTIFICACIONES — Mueblería Benjamín
// Motor: EmailJS (gratis hasta 200 emails/mes)
// Destino: mycbenjamin@gmail.com
//
// CONFIGURACIÓN INICIAL (hacer UNA sola vez):
//   1. Ir a https://emailjs.com → crear cuenta gratis
//   2. Email Services → Add Service → Gmail → conectar mycbenjamin@gmail.com
//      Copiar el SERVICE ID (ej: service_abc123)
//   3. Email Templates → Create Template → pegar el HTML de abajo
//      Copiar el TEMPLATE ID (ej: template_xyz789)
//   4. Account → API Keys → copiar PUBLIC KEY (ej: AbCdEfGhIjKlMnOp)
//   5. Reemplazar los tres valores de CONFIGURACIÓN de abajo
// ============================================================
 
// ── CONFIGURACIÓN ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = service_blgxkpn
const EMAILJS_TEMPLATE_ID = template_lhnmm0q
const EMAILJS_PUBLIC_KEY  = rIp4IoeB0iilXFPcX
const NOTIF_DESTINO       = 'mycbenjamin@gmail.com';
 
function emailJSConfigurado() {
    return !EMAILJS_SERVICE_ID.includes('TU_')
        && !EMAILJS_TEMPLATE_ID.includes('TU_')
        && !EMAILJS_PUBLIC_KEY.includes('TU_');
}
 
function emailJSDisponible() {
    return typeof emailjs !== 'undefined' && emailJSConfigurado();
}
 
// ============================================================
// FUNCIÓN CENTRAL
// ============================================================
async function notificar(tipo, datos) {
    if (!emailJSDisponible()) {
        console.warn('📧 EmailJS no configurado — notificación omitida:', tipo);
        return false;
    }
    const config = _buildEmail(tipo, datos);
    if (!config) return false;
    try {
        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                to_email: NOTIF_DESTINO,
                subject:  config.subject,
                mensaje:  config.mensaje,
                accion:   config.accion,
                fecha:    new Date().toLocaleString('es-EC', {
                    weekday: 'long', day: 'numeric', month: 'long',
                    hour: '2-digit', minute: '2-digit'
                }),
                sitio_url: 'https://muebleria-benjamin.vercel.app'
            },
            EMAILJS_PUBLIC_KEY
        );
        console.log('✅ Notificación enviada:', tipo);
        return true;
    } catch (e) {
        console.warn('⚠️ Error al enviar notificación email:', e);
        return false;
    }
}
 
function _buildEmail(tipo, datos) {
    switch (tipo) {
 
        case 'empleo':
            return {
                subject: `👷 Nueva postulación de empleo — ${datos.nombre}`,
                mensaje:
`NUEVA POSTULACIÓN RECIBIDA
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre:      ${datos.nombre}
Cédula:      ${datos.cedula}
Teléfono:    ${datos.telefono}
Email:       ${datos.email}
Dirección:   ${datos.direccion || '—'}
Edad:        ${datos.edad || '—'} años
Tipo:        ${datos.tipo === 'empleo' ? '💼 Busca empleo fijo' : '🤝 Quiere colaborar'}
 
ESPECIALIDADES
${(datos.especialidades || []).join(', ')}
 
Nivel:            ${datos.nivelLabel || datos.nivel}
Zonas:            ${datos.zonas}
Disponibilidad:   ${datos.disponibilidad}
Pretensión:       ${datos.salario}
LinkedIn:         ${datos.linkedIn || 'No proporcionó'}
 
SOBRE EL POSTULANTE
"${datos.descripcion}"`,
                accion: 'Revisar en Admin → Empleo. Si el perfil encaja, contactar directamente al postulante.'
            };
 
        case 'testimonio':
            return {
                subject: `⭐ Nuevo testimonio pendiente — ${datos.nombre}`,
                mensaje:
`TESTIMONIO PENDIENTE DE REVISIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cliente:      ${datos.nombre}
Cédula:       ${datos.cedula || '—'}
Calificación: ${'★'.repeat(datos.calificacion || 5)} (${datos.calificacion || 5}/5)
Trabajo:      ${datos.proyecto}
 
"${datos.texto}"`,
                accion: 'Aprobar, destacar o rechazar en Admin → Testimonios'
            };
 
        case 'verificacion':
            return {
                subject: `🔐 Solicitud de verificación — ${datos.nombre}`,
                mensaje:
`CLIENTE SOLICITA VERIFICACIÓN DE IDENTIDAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre:    ${datos.nombre}
Cédula:    ${datos.cedula || '—'}
Email:     ${datos.email || '—'}
Teléfono:  ${datos.telefono || '—'}
Método:    ${datos.metodo || 'WhatsApp manual'}`,
                accion: 'Revisar foto de cédula en WhatsApp y aprobar/rechazar en Admin → Verificaciones'
            };
 
        case 'pedido':
            return {
                subject: `🛒 Nuevo pedido — ${datos.nombre || 'Cliente'}`,
                mensaje:
`PEDIDO ENVIADO POR WHATSAPP
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cliente:  ${datos.nombre || '—'}
Email:    ${datos.email || '—'}
Total:    $${(datos.total || 0).toFixed(2)}
 
PRODUCTOS
${(datos.items || []).map(i =>
    `• ${i.config?.cantidad || i.cantidad || 1}x ${i.nombre} — $${(i.precioTotal || 0).toFixed(2)}`
).join('\n') || '—'}`,
                accion: 'Actualizar el estado del pedido en Admin → Pedidos'
            };
 
        case 'contacto':
            return {
                subject: `📩 Mensaje de contacto — ${datos.nombre}`,
                mensaje:
`MENSAJE DEL FORMULARIO DE CONTACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre:    ${datos.nombre}
Email:     ${datos.email}
Teléfono:  ${datos.telefono || 'No proporcionó'}
 
MENSAJE
"${datos.mensaje}"`,
                accion: 'Responder al cliente por email o WhatsApp'
            };
 
        case 'queja':
            return {
                subject: `🚨 Queja/reclamo — ${datos.nombre}`,
                mensaje:
`RECLAMO RECIBIDO — REQUIERE ATENCIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cliente:       ${datos.nombre}
Tipo:          ${datos.tipo}
Nota de venta: ${datos.nota || 'No especificó'}
 
DESCRIPCIÓN
"${datos.descripcion}"`,
                accion: '⚠️ Contactar al cliente en máximo 48 horas'
            };
 
        default:
            return null;
    }
}
 
// ── Funciones de conveniencia ─────────────────────────────────
function notifEmpleo(postulacion) {
    const nivelLabel = (typeof NIVELES_EXP !== 'undefined'
        ? NIVELES_EXP.find(n => n.id === postulacion.nivel)?.label
        : null) || postulacion.nivel;
    notificar('empleo', { ...postulacion, nivelLabel });
}
function notifTestimonio(t)          { notificar('testimonio',  t); }
function notifVerificacion(user)     { notificar('verificacion', { nombre: user.nombre||'—', cedula: user.cedula||'—', email: user.email||'—', telefono: user.telefono||'—', metodo: 'WhatsApp manual' }); }
function notifPedido(pedido, user)   { notificar('pedido',      { nombre: user?.nombre||pedido.usuario||'—', email: user?.email||'—', total: pedido.total||0, items: pedido.items||[] }); }
function notifContacto(datos)        { notificar('contacto',    datos); }
function notifQueja(datos)           { notificar('queja',       datos); }
 