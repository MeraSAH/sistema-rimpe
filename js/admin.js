// ========================================
// PANEL DE ADMINISTRACIÓN - RIMPE
// ========================================

// ========================================
// AUTH — delegado a Supabase (supabase.js)
// isAdminAuthenticated() vive en supabase.js
// ========================================

// adminLogout: llama a Supabase y vuelve al inicio
async function adminLogout() {
    await supabaseLogout();
    navigateTo('inicio');
    showNotification('Sesión cerrada correctamente', 'info');
}

// ========================================
// NOTAS DE VENTA — CRUD COMPLETO
// ========================================

function getNotasVenta() {
    const notas = localStorage.getItem('notasVenta');
    return notas ? JSON.parse(notas) : [];
}

function getNotaById(id) {
    return getNotasVenta().find(n => n.id === id) || null;
}

function saveNotaVenta(notaData) {
    const notas = getNotasVenta();
    const ultimoSecuencial = notas.length > 0 ? Math.max(...notas.map(n => n.secuencial)) : infoNegocio.secuencialActual;
    const nuevaNota = {
        id: Date.now(),
        numeroNota: `${infoNegocio.serie}-${String(ultimoSecuencial + 1).padStart(7, '0')}D`,
        secuencial: ultimoSecuencial + 1,
        fecha: new Date().toISOString(),
        fechaEmision: new Date().toLocaleDateString('es-EC'),
        ...notaData,
        regimen: 'RIMPE - Negocio Popular'
    };
    notas.push(nuevaNota);
    localStorage.setItem('notasVenta', JSON.stringify(notas));
    // ☁️ Subir a Supabase en background
    if (typeof dbSaveNota === 'function') dbSaveNota(nuevaNota).catch(console.warn);
    return nuevaNota;
}

function updateNotaVenta(id, updates) {
    const notas = getNotasVenta();
    const idx = notas.findIndex(n => n.id === id);
    if (idx === -1) return false;
    notas[idx] = { ...notas[idx], ...updates, ultimaActualizacion: new Date().toISOString() };
    localStorage.setItem('notasVenta', JSON.stringify(notas));
    // ☁️ Subir a Supabase en background
    if (typeof dbUpdateNota === 'function') dbUpdateNota(id, { ...notas[idx], ...updates }).catch(console.warn);
    return true;
}

function deleteNotaVenta(id) {
    const notas = getNotasVenta().filter(n => n.id !== id);
    localStorage.setItem('notasVenta', JSON.stringify(notas));
    // ☁️ Eliminar en Supabase en background
    if (typeof dbDeleteNota === 'function') dbDeleteNota(id).catch(console.warn);
    return true;
}

function updateNotaEstado(notaId, nuevoEstado, montoPagado = 0) {
    const notas = getNotasVenta();
    const idx = notas.findIndex(n => n.id === notaId);
    if (idx !== -1) {
        notas[idx].estado = nuevoEstado;
        notas[idx].montoPagado = (notas[idx].montoPagado || 0) + montoPagado;
        notas[idx].ultimaActualizacion = new Date().toISOString();
        localStorage.setItem('notasVenta', JSON.stringify(notas));
        return true;
    }
    return false;
}

function buscarNotaPorCedula(cedula) {
    return getNotasVenta().filter(n => n.cliente.cedula === cedula);
}

// ========================================
// PRODUCTOS — CRUD COMPLETO
// ========================================

function getProductosCatalogo() {
    const custom = localStorage.getItem('productosCustom');
    if (custom) return JSON.parse(custom);
    // Fallback a los datos por defecto
    return {
        muebleriaInterior:  productos.muebleriaInterior  || [],
        muebleriaExterior:  productos.muebleriaExterior  || [],
        cerrajeriaExterior: productos.cerrajeriaExterior || []
    };
}

function saveProductosCatalogo(data) {
    localStorage.setItem('productosCustom', JSON.stringify(data));
}

function addProductoAdmin(categoria, producto) {
    const cat = getProductosCatalogo();
    const maxId = cat[categoria].reduce((mx, p) => Math.max(mx, Number(p.id) || 0), 0);
    const nuevo = { ...producto, id: maxId + 1 };
    (cat[categoria] = cat[categoria] || []).push(nuevo);
    saveProductosCatalogo(cat);
    // ☁️ Subir a Supabase en background
    if (typeof dbAddProducto === 'function') dbAddProducto(categoria, nuevo).catch(console.warn);
    return nuevo;
}

function updateProductoAdmin(categoria, id, updates) {
    const cat = getProductosCatalogo();
    const idx = cat[categoria].findIndex(p => p.id == id);
    if (idx === -1) return false;
    cat[categoria][idx] = { ...cat[categoria][idx], ...updates };
    saveProductosCatalogo(cat);
    // ☁️ Subir a Supabase en background
    if (typeof dbUpdateProducto === 'function') dbUpdateProducto(categoria, id, updates).catch(console.warn);
    return true;
}

function deleteProductoAdmin(categoria, id) {
    const cat = getProductosCatalogo();
    cat[categoria] = (cat[categoria] || []).filter(p => p.id != id);
    saveProductosCatalogo(cat);
    // ☁️ Eliminar en Supabase en background
    if (typeof dbDeleteProducto === 'function') dbDeleteProducto(categoria, id).catch(console.warn);
    return true;
}

// ========================================
// CLIENTES — LISTA DINÁMICA
// ========================================

function getClientesList() {
    const notas = getNotasVenta();
    const map = {};
    notas.forEach(nota => {
        const ced = nota.cliente.cedula;
        if (!map[ced]) {
            map[ced] = { ...nota.cliente, notas: [], totalFacturado: 0 };
        }
        map[ced].notas.push(nota);
        map[ced].totalFacturado += nota.total || 0;
    });
    return Object.values(map).sort((a, b) => b.totalFacturado - a.totalFacturado);
}

// ========================================
// CÁLCULOS FISCALES RIMPE
// ========================================

function calcularIngresosAnuales(año = new Date().getFullYear()) {
    // ⚠️ Las notas CANCELADAS no cuentan para el límite RIMPE
    const todasNotas  = getNotasVenta().filter(n => new Date(n.fecha).getFullYear() === año);
    const notas       = todasNotas.filter(n => n.estado !== 'cancelada');
    const canceladas  = todasNotas.filter(n => n.estado === 'cancelada');
    const totalIngresos = notas.reduce((t, n) => t + (n.total || 0), 0);
    return {
        totalIngresos,
        cantidadNotas:      notas.length,
        cantidadCanceladas: canceladas.length,
        montoCancelado:     canceladas.reduce((t, n) => t + (n.total || 0), 0),
        limiteRIMPE:        infoNegocio.limiteAnual,
        porcentajeUsado:    (totalIngresos / infoNegocio.limiteAnual) * 100,
        margenDisponible:   infoNegocio.limiteAnual - totalIngresos,
        enRiesgo:           totalIngresos > infoNegocio.limiteAnual * 0.9
    };
}

function calcularIngresosMensuales(año = new Date().getFullYear()) {
    const ingresosPorMes = Array(12).fill(0);
    // Las notas CANCELADAS no cuentan en el resumen mensual
    getNotasVenta().filter(n => n.estado !== 'cancelada').forEach(nota => {
        const f = new Date(nota.fecha);
        if (f.getFullYear() === año) ingresosPorMes[f.getMonth()] += nota.total || 0;
    });
    return ingresosPorMes;
}

function obtenerEstadisticasPanel() {
    const notas = getNotasVenta();
    const ia = calcularIngresosAnuales();
    const ahora = new Date();
    const ingresosMes = notas
        .filter(n => {
            const f = new Date(n.fecha);
            return n.estado !== 'cancelada' &&
                   f.getFullYear() === ahora.getFullYear() &&
                   f.getMonth()    === ahora.getMonth();
        })
        .reduce((t, n) => t + n.total, 0);
    return {
        totalIngresos:  ia.totalIngresos,
        ingresosMes,
        totalNotas:     notas.length,
        notasPendientes: notas.filter(n => n.estado === 'pendiente').length,
        porcentajeRIMPE: ia.porcentajeUsado,
        enRiesgo:       ia.enRiesgo
    };
}

// ========================================
// PDF — NOTA DE VENTA REAL (RIMPE Ecuador)
// ========================================

function generarPDFNotaVenta(nota) {
    const desc = nota.descuento > 0
        ? `<tr><td colspan="3" style="text-align:right;padding:6px 10px;font-size:12px;">Descuento:</td>
           <td style="padding:6px 10px;text-align:right;font-size:12px;color:#dc2626;">-$${nota.descuento.toFixed(2)}</td></tr>`
        : '';

    // Sección de abonos
    const abonos     = nota.abonos || [];
    const totalAbon  = abonos.reduce((s,a) => s + (a.monto||0), 0);
    const saldoPend  = nota.total - totalAbon;
    const abonosHTML = abonos.length > 0 ? `
    <div class="abonos-section">
        <strong style="font-size:11px">💰 REGISTRO DE ABONOS / PAGOS PARCIALES</strong>
        <table class="abonos-table">
            <thead><tr>
                <th>Fecha</th><th>Descripción</th><th style="text-align:right">Monto</th>
            </tr></thead>
            <tbody>
                ${abonos.map(a => `
                <tr>
                    <td>${a.fecha||'—'}</td>
                    <td>${a.descripcion||'Abono'}</td>
                    <td style="text-align:right;color:#10b981;font-weight:700">
                        +$${(a.monto||0).toFixed(2)}</td>
                </tr>`).join('')}
            </tbody>
        </table>
        <div class="saldo-row">
            <span>Total abonado: <strong style="color:#10b981">$${totalAbon.toFixed(2)}</strong></span>
            <span>Saldo pendiente: <strong style="color:${saldoPend > 0 ? '#f59e0b' : '#10b981'}">
                $${Math.max(0, saldoPend).toFixed(2)}</strong></span>
        </div>
    </div>` : '';

    // Sello de estado (color dinámico)
    const estadoConfig = {
        pendiente: { color: '#eab308', label: 'PENDIENTE' },
        pagada:    { color: '#10b981', label: 'PAGADA'    },
        parcial:   { color: '#f59e0b', label: 'P. PARCIAL'},
        cancelada: { color: '#cc0000', label: 'CANCELADO' },
    };
    const sc   = estadoConfig[nota.estado] || estadoConfig.pendiente;
    // Solo mostrar el pequeño sello si NO es cancelada (cancelada ya tiene el grande)
    const selloEstadoHTML = nota.estado !== 'cancelada' ? `
        <div class="sello-estado" style="--sc:${sc.color}">
            <div class="sello-estado-txt">${sc.label}</div>
        </div>` : '';

    const obs = nota.observaciones
        ? `<div style="margin:10px 0;padding:10px;background:#fffbeb;border-left:4px solid #f59e0b;border-radius:4px;">
               <strong style="font-size:11px;">OBSERVACIONES:</strong>
               <p style="font-size:11px;margin:4px 0 0;">${nota.observaciones}</p>
           </div>` : '';

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Nota de Venta ${nota.numeroNota}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, sans-serif; background: #f3f4f6; padding: 20px; }
  .page { max-width: 780px; margin: 0 auto; background: #fff; border: 2px solid #1e293b; border-radius: 4px; overflow: hidden; }
  .page.cancelada { border-color: #cc0000; border-width: 3px; }
  @media print {
    body { background: white; padding: 0; }
    .no-print { display: none !important; }
    .page { border: none; }
  }
  /* ─── CABECERA ─────────────────────────── */
  .header { display: grid; grid-template-columns: 1fr auto; border-bottom: 2px solid #1e293b; }
  .biz { padding: 16px 20px; }
  .biz-name { font-size: 17px; font-weight: 900; color: #b45309; line-height: 1.2; margin-bottom: 4px; }
  .biz-prop { font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 6px; }
  .biz-info { font-size: 11px; color: #4b5563; line-height: 1.7; }
  .doc-box { min-width: 220px; border-left: 2px solid #1e293b; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; text-align: center; }
  .doc-label { font-size: 13px; font-weight: 900; background: #b45309; color: #fff; padding: 5px 20px; border-radius: 4px; letter-spacing: 1px; margin-bottom: 10px; }
  .doc-number { font-size: 15px; font-weight: 900; color: #1e293b; border: 2px solid #b45309; padding: 8px 12px; border-radius: 4px; margin-bottom: 8px; letter-spacing: 0.5px; }
  .rimpe-tag { background: #16a34a; color: #fff; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px; }
  .auth-box { font-size: 9px; color: #6b7280; line-height: 1.5; border: 1px dashed #d1d5db; padding: 6px; border-radius: 4px; }
  /* ─── CLIENTE ───────────────────────────── */
  .client-section { padding: 14px 20px; border-bottom: 2px solid #1e293b; background: #f8fafc; }
  .section-title { font-size: 11px; font-weight: 900; color: #fff; background: #1e293b; padding: 4px 10px; border-radius: 3px; display: inline-block; margin-bottom: 10px; letter-spacing: 0.5px; }
  .client-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; }
  .field { display: flex; gap: 6px; align-items: baseline; border-bottom: 1px dotted #d1d5db; padding: 3px 0; }
  .field label { font-size: 11px; font-weight: 700; color: #374151; min-width: 68px; flex-shrink: 0; }
  .field span { font-size: 11px; color: #111827; }
  /* ─── TABLA ITEMS ───────────────────────── */
  .items-table { width: 100%; border-collapse: collapse; }
  .items-table thead tr { background: #b45309; color: #fff; }
  .items-table th { padding: 9px 10px; font-size: 11px; text-align: left; }
  .items-table th:nth-child(1) { width: 60px; text-align: center; }
  .items-table th:nth-child(3), .items-table th:nth-child(4) { text-align: right; width: 110px; }
  .items-table td { padding: 8px 10px; font-size: 11px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
  .items-table td:nth-child(1) { text-align: center; font-weight: 700; }
  .items-table td:nth-child(3), .items-table td:nth-child(4) { text-align: right; }
  .items-table tbody tr:nth-child(even) { background: #fefce8; }
  /* ─── TOTALES ────────────────────────────── */
  .totals-area { display: flex; justify-content: flex-end; padding: 12px 20px; border-top: 2px solid #1e293b; }
  .totals-box { min-width: 280px; }
  .t-row { display: flex; justify-content: space-between; padding: 4px 0; font-size: 12px; border-bottom: 1px solid #e5e7eb; }
  .t-row:last-child { border-bottom: none; }
  .t-total { font-size: 18px; font-weight: 900; color: #b45309; border-top: 2px solid #b45309; padding-top: 8px; margin-top: 4px; }
  /* ─── SELLO + FIRMAS ─────────────────────── */
  .bottom-area { display: grid; grid-template-columns: 1fr auto 1fr; gap: 20px; padding: 16px 20px; border-top: 1px solid #e5e7eb; align-items: center; }
  .sig-block { text-align: center; }
  .sig-line { border-top: 1px solid #1e293b; margin-bottom: 6px; margin-top: 40px; }
  .sig-label { font-size: 10px; font-weight: 700; color: #374151; }
  .sello { width: 110px; height: 110px; border: 3px solid #b45309; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 10px; }
  .sello-inner { border: 1px dashed #b45309; border-radius: 50%; width: 96px; height: 96px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8px; }
  .sello-name { font-size: 8px; font-weight: 900; color: #b45309; line-height: 1.3; }
  .sello-ruc { font-size: 8px; color: #92400e; margin-top: 3px; }
  .sello-icon { font-size: 20px; margin: 3px 0; }
  /* ─── PIE ────────────────────────────────── */
  .nota-footer { background: #1e293b; color: #e2e8f0; padding: 10px 20px; font-size: 9px; text-align: center; line-height: 1.7; }
  .nota-footer strong { color: #fbbf24; }
  /* ─── BOTÓN IMPRIMIR ─────────────────────── */
  .print-btn { display: block; margin: 20px auto; padding: 12px 40px; background: #b45309; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; }
  /* ─── SELLO CANCELADO (MARCA DE AGUA) ───── */
  .sello-cancelado {
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(-25deg);
    z-index: 999; pointer-events: none;
    opacity: 0.95;
    border: 6px double #cc0000;
    padding: 18px 32px;
    text-align: center;
    background: rgba(255,255,255,0.08);
  }
  .sello-cancelado-texto {
    font-size: 48px; font-weight: 900;
    color: #cc0000; letter-spacing: 6px;
    font-family: Arial Black, Arial, sans-serif;
    line-height: 1;
    text-shadow: 1px 1px 0 rgba(180,0,0,.3);
  }
  .sello-cancelado-sub {
    font-size: 13px; font-weight: 700;
    color: #cc0000; letter-spacing: 3px;
    margin-top: 6px; display: block;
  }
  @media print {
    .sello-cancelado { position: fixed; }
  }
  /* ─── SELLO ESTADO (pequeño, sobre firma vendedor) ── */
  .sello-estado {
    display: inline-block;
    border: 3px solid var(--sc);
    border-radius: 6px;
    padding: 4px 10px;
    text-align: center;
    margin-bottom: 6px;
    background: rgba(255,255,255,.5);
    transform: rotate(-8deg);
  }
  .sello-estado-txt {
    font-size: 13px; font-weight: 900;
    letter-spacing: 3px; color: var(--sc);
    font-family: Arial Black, Arial, sans-serif;
  }
  /* ─── TABLA ABONOS ───────────────────────────────── */
  .abonos-section { padding: 10px 20px; border-top: 1px dashed #e5e7eb; }
  .abonos-table { width: 100%; border-collapse: collapse; margin-top: 6px; }
  .abonos-table th { background: #1e293b; color: #fff; font-size: 10px;
                     padding: 5px 8px; text-align: left; }
  .abonos-table td { font-size: 10px; padding: 4px 8px;
                     border-bottom: 1px solid #e5e7eb; }
  .abonos-table tr:last-child td { border-bottom: none; }
  .saldo-row { display: flex; justify-content: flex-end; gap: 1rem;
               padding: 6px 0; font-size: 12px; font-weight: 700; }
</style>
</head>
<body>
<button class="print-btn no-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
${nota.estado === 'cancelada' ? `
<div class="sello-cancelado">
  <div class="sello-cancelado-texto">CANCELADO</div>
  <span class="sello-cancelado-sub">${infoNegocio.nombreComercial}</span>
</div>` : ''}
<div class="page${nota.estado === 'cancelada' ? ' cancelada' : ''}">

  <!-- CABECERA -->
  <div class="header">
    <div class="biz">
      <div class="biz-name">${infoNegocio.nombreComercial}</div>
      <div class="biz-prop">${infoNegocio.propietario}</div>
      <div class="biz-info">
        <strong>RUC:</strong> ${infoNegocio.ruc}<br>
        <strong>Régimen:</strong> ${infoNegocio.regimen}<br>
        <strong>Dirección:</strong> ${infoNegocio.direccion}, ${infoNegocio.ciudad}<br>
        <strong>Teléfono:</strong> ${infoNegocio.telefono} &nbsp;|&nbsp; <strong>Email:</strong> ${infoNegocio.email}<br>
        <strong>Actividad:</strong> ${infoNegocio.especialidad}
      </div>
    </div>
    <div class="doc-box">
      <div class="doc-label">NOTA DE VENTA</div>
      <div class="doc-number">${nota.numeroNota}</div>
      <div class="rimpe-tag">RIMPE — NO APLICA IVA</div>
      <div class="auth-box">
        <strong>Autorización SRI:</strong><br>${infoNegocio.autorizacionSRI}<br>
        <strong>Válido:</strong> ${infoNegocio.imprenta.fechaAutorizacion}<br>
        al ${infoNegocio.imprenta.fechaCaducidad}
      </div>
    </div>
  </div>

  <!-- CLIENTE -->
  <div class="client-section">
    <div class="section-title">DATOS DEL CLIENTE</div>
    <div class="client-grid">
      <div class="field"><label>Nombre:</label><span>${nota.cliente.nombre}</span></div>
      <div class="field"><label>Cédula/RUC:</label><span>${nota.cliente.cedula}</span></div>
      <div class="field"><label>Teléfono:</label><span>${nota.cliente.telefono || '—'}</span></div>
      <div class="field"><label>Email:</label><span>${nota.cliente.email || '—'}</span></div>
      <div class="field"><label>Dirección:</label><span>${nota.cliente.direccion || '—'}</span></div>
      <div class="field"><label>Fecha:</label><span>${nota.fechaEmision}</span></div>
    </div>
  </div>

  <!-- DETALLE -->
  <table class="items-table">
    <thead>
      <tr>
        <th>Cant.</th>
        <th>Descripción del Trabajo / Producto</th>
        <th>P. Unitario</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${nota.items.map(item => `
      <tr>
        <td>${item.cantidad}</td>
        <td>${item.descripcion}</td>
        <td>$${item.precioUnitario.toFixed(2)}</td>
        <td>$${item.total.toFixed(2)}</td>
      </tr>`).join('')}
      ${Array(Math.max(0, 5 - nota.items.length)).fill('<tr><td>&nbsp;</td><td></td><td></td><td></td></tr>').join('')}
    </tbody>
  </table>

  <!-- TOTALES -->
  <div class="totals-area">
    <div class="totals-box">
      <div class="t-row"><span>Subtotal:</span><span>$${nota.subtotal.toFixed(2)}</span></div>
      ${nota.descuento > 0 ? `<div class="t-row" style="color:#dc2626"><span>Descuento:</span><span>-$${nota.descuento.toFixed(2)}</span></div>` : ''}
      <div class="t-row" style="font-size:11px;color:#6b7280"><span>IVA (RIMPE exento):</span><span>$0.00</span></div>
      <div class="t-row t-total"><span>TOTAL:</span><span>$${nota.total.toFixed(2)}</span></div>
    </div>
  </div>

  ${obs}
  ${abonosHTML}

  <!-- FIRMAS + SELLO -->
  <div class="bottom-area">
    <div class="sig-block">
      <div class="sig-line"></div>
      <div class="sig-label">Firma del Cliente</div>
      <div style="font-size:10px;color:#6b7280;margin-top:3px;">${nota.cliente.nombre}</div>
    </div>
    <div class="sello">
      <div class="sello-inner">
        <div class="sello-icon">🏗️</div>
        <div class="sello-name">MUEBLERÍA Y CERRAJERÍA BENJAMÍN</div>
        <div class="sello-ruc">RUC: ${infoNegocio.ruc}</div>
      </div>
    </div>
    <div class="sig-block">
      ${selloEstadoHTML}
      <div class="sig-line"></div>
      <div class="sig-label">Firma del Vendedor</div>
      <div style="font-size:10px;color:#6b7280;margin-top:3px;">${infoNegocio.propietario}</div>
    </div>
  </div>

  <!-- PIE -->
  <div class="nota-footer">
    <strong>NOTA IMPORTANTE:</strong> Este documento es una Nota de Venta emitida bajo el Régimen RIMPE Negocio Popular. No aplica retención de IVA ni Renta.<br>
    Estado: <strong style="${nota.estado === 'cancelada' ? 'color:#fca5a5' : ''}">${estadosNota[nota.estado]?.nombre || nota.estado}${nota.estado === 'cancelada' ? ' ⚠️ NOTA ANULADA' : ''}</strong>
    ${nota.observaciones ? ` &nbsp;|&nbsp; ${nota.observaciones}` : ''}<br>
    <strong>Imprenta:</strong> ${infoNegocio.imprenta.nombre} — RUC: ${infoNegocio.imprenta.ruc} — Aut. SRI: ${infoNegocio.imprenta.autorizacion}
    — Rango: ${infoNegocio.imprenta.rangoNotas} — Aut: ${infoNegocio.imprenta.fechaAutorizacion} — Caduca: ${infoNegocio.imprenta.fechaCaducidad}
  </div>

</div>
<button class="print-btn no-print" onclick="window.print()">🖨️ Imprimir / Guardar PDF</button>
</body>
</html>`;

    const w = window.open('', '_blank');
    w.document.write(html);
    w.document.close();
}

// ========================================
// PANEL ADMIN — Botón de migración
// ========================================

function renderBotonMigracion() {
    if (!isSupabaseConfigured || !isSupabaseConfigured()) return '';
    const notas = getNotasVenta();
    if (notas.length === 0) return '';
    return `
    <div class="alert alert-warning mt-3">
        <i data-lucide="upload-cloud"></i>
        <div>
            <strong>Datos locales pendientes de subir</strong>
            <p>Tienes ${notas.length} notas en este dispositivo que aún no están en Supabase.</p>
            <button onclick="migrarDatosLocalesASupabase()" class="btn btn-primary btn-sm mt-2">
                <i data-lucide="upload-cloud"></i> Migrar ${notas.length} notas a Supabase
            </button>
        </div>
    </div>`;
}

// ========================================
// REPORTES Y EXPORTACIÓN
// ========================================

function exportarNotasCSV() {
    const notas = getNotasVenta();
    if (notas.length === 0) { showNotification('No hay notas para exportar', 'error'); return; }
    const headers = ['No. Nota','Fecha','Cliente','Cédula','Teléfono','Subtotal','Descuento','Total','Estado','Abonado','Saldo'];
    const rows = notas.map(n => [
        n.numeroNota, n.fechaEmision,
        n.cliente.nombre, n.cliente.cedula, n.cliente.telefono || '',
        n.subtotal?.toFixed(2)||'0.00', n.descuento?.toFixed(2)||'0.00',
        n.total?.toFixed(2)||'0.00', n.estado,
        n.montoPagado?.toFixed(2)||'0.00',
        ((n.total||0) - (n.montoPagado||0)).toFixed(2)
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a'); a.href = url;
    a.download = `notas_venta_${new Date().toISOString().split('T')[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
    showNotification('✅ CSV descargado', 'success');
}

function generarReporteMensualPDF(mes, año) {
    const ahora   = new Date();
    const m = mes  ?? ahora.getMonth();
    const a = año  ?? ahora.getFullYear();
    const meses   = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                     'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const notas   = getNotasVenta().filter(n => {
        const f = new Date(n.fecha);
        return f.getMonth() === m && f.getFullYear() === a && n.estado !== 'cancelada';
    });
    const total   = notas.reduce((s,n) => s + (n.total||0), 0);
    const filas   = notas.map(n => `
        <tr>
            <td>${n.numeroNota}</td><td>${n.fechaEmision}</td>
            <td>${n.cliente.nombre}</td><td>${n.cliente.cedula}</td>
            <td style="text-align:right">$${n.total?.toFixed(2)||'0.00'}</td>
            <td><span style="padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;
                background:${n.estado==='pagada'?'#dcfce7':n.estado==='parcial'?'#fef3c7':'#fee2e2'};
                color:${n.estado==='pagada'?'#166534':n.estado==='parcial'?'#92400e':'#991b1b'}">
                ${estadosNota[n.estado]?.nombre||n.estado}</span></td>
        </tr>`).join('');
    const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>Reporte ${meses[m]} ${a}</title>
<style>
  body{font-family:Arial,sans-serif;padding:20px;color:#1e293b}
  h1{color:#b45309;border-bottom:3px solid #b45309;padding-bottom:8px}
  table{width:100%;border-collapse:collapse;margin-top:1rem}
  th{background:#1e293b;color:#fff;padding:8px 10px;font-size:12px;text-align:left}
  td{padding:7px 10px;font-size:12px;border-bottom:1px solid #e5e7eb}
  tr:nth-child(even){background:#fefce8}
  .totales{margin-top:1rem;text-align:right;font-size:14px}
  .total-final{font-size:20px;font-weight:900;color:#b45309}
  @media print{.no-print{display:none}}
</style></head><body>
<button class="no-print" onclick="window.print()"
    style="background:#b45309;color:#fff;border:none;padding:10px 24px;border-radius:8px;
    font-weight:700;cursor:pointer;margin-bottom:1rem">🖨️ Imprimir / PDF</button>
<h1>Reporte Mensual — ${meses[m]} ${a}</h1>
<p><strong>Empresa:</strong> ${infoNegocio.nombreComercial} &nbsp;|&nbsp; <strong>RUC:</strong> ${infoNegocio.ruc}</p>
<table><thead><tr>
    <th>No. Nota</th><th>Fecha</th><th>Cliente</th><th>Cédula</th><th>Total</th><th>Estado</th>
</tr></thead><tbody>${filas || '<tr><td colspan="6" style="text-align:center;padding:2rem">Sin notas este mes</td></tr>'}</tbody></table>
<div class="totales">
    <p>Total de notas: <strong>${notas.length}</strong></p>
    <p class="total-final">Total del mes: $${total.toFixed(2)}</p>
</div>
</body></html>`;
    const w = window.open('','_blank'); w.document.write(html); w.document.close();
}