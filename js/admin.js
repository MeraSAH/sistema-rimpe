// ========================================
// PANEL DE ADMINISTRACIÓN - RIMPE
// ========================================

// Verificar si el usuario está autenticado como admin
function isAdminAuthenticated() {
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) return false;
    
    const session = JSON.parse(adminSession);
    const now = new Date().getTime();
    
    // Verificar si la sesión ha expirado
    if (now - session.timestamp > adminCredentials.sessionTimeout) {
        localStorage.removeItem('adminSession');
        return false;
    }
    
    return session.authenticated === true;
}

// Login de administrador
function adminLogin(username, password) {
    if (username === adminCredentials.username && password === adminCredentials.password) {
        const session = {
            authenticated: true,
            timestamp: new Date().getTime(),
            username: username
        };
        localStorage.setItem('adminSession', JSON.stringify(session));
        return true;
    }
    return false;
}

// Logout de administrador
function adminLogout() {
    localStorage.removeItem('adminSession');
    navigateTo('inicio');
    showNotification('Sesión cerrada', 'info');
}

// ========================================
// GESTIÓN DE NOTAS DE VENTA
// ========================================

// Obtener todas las notas de venta
function getNotasVenta() {
    const notas = localStorage.getItem('notasVenta');
    return notas ? JSON.parse(notas) : [];
}

// Guardar nota de venta
function saveNotaVenta(notaData) {
    const notas = getNotasVenta();
    
    // Obtener siguiente secuencial
    const ultimoSecuencial = notas.length > 0 
        ? Math.max(...notas.map(n => n.secuencial))
        : 0;
    
    const nuevaNota = {
        id: Date.now(),
        numeroNota: `${infoNegocio.serie}-${String(ultimoSecuencial + 1).padStart(9, '0')}`,
        secuencial: ultimoSecuencial + 1,
        fecha: new Date().toISOString(),
        fechaEmision: new Date().toLocaleDateString('es-EC'),
        ...notaData,
        regimen: 'RIMPE - Negocio Popular'
    };
    
    notas.push(nuevaNota);
    localStorage.setItem('notasVenta', JSON.stringify(notas));
    
    return nuevaNota;
}

// Actualizar estado de nota de venta
function updateNotaEstado(notaId, nuevoEstado, montoPagado = 0) {
    const notas = getNotasVenta();
    const notaIndex = notas.findIndex(n => n.id === notaId);
    
    if (notaIndex !== -1) {
        notas[notaIndex].estado = nuevoEstado;
        notas[notaIndex].montoPagado = (notas[notaIndex].montoPagado || 0) + montoPagado;
        notas[notaIndex].ultimaActualizacion = new Date().toISOString();
        
        localStorage.setItem('notasVenta', JSON.stringify(notas));
        return true;
    }
    return false;
}

// Buscar nota de venta por cédula
function buscarNotaPorCedula(cedula) {
    const notas = getNotasVenta();
    return notas.filter(n => n.cliente.cedula === cedula);
}

// ========================================
// CÁLCULOS FISCALES RIMPE
// ========================================

// Calcular total de ingresos del año
function calcularIngresosAnuales(año = new Date().getFullYear()) {
    const notas = getNotasVenta();
    const notasDelAño = notas.filter(n => {
        const fechaNota = new Date(n.fecha);
        return fechaNota.getFullYear() === año;
    });
    
    const totalIngresos = notasDelAño.reduce((total, nota) => {
        return total + (nota.total || 0);
    }, 0);
    
    return {
        totalIngresos,
        cantidadNotas: notasDelAño.length,
        limiteRIMPE: infoNegocio.limiteAnual,
        porcentajeUsado: (totalIngresos / infoNegocio.limiteAnual) * 100,
        margenDisponible: infoNegocio.limiteAnual - totalIngresos,
        enRiesgo: totalIngresos > (infoNegocio.limiteAnual * 0.9) // Alerta si supera 90%
    };
}

// Calcular ingresos por mes
function calcularIngresosMensuales(año = new Date().getFullYear()) {
    const notas = getNotasVenta();
    const ingresosPorMes = Array(12).fill(0);
    
    notas.forEach(nota => {
        const fechaNota = new Date(nota.fecha);
        if (fechaNota.getFullYear() === año) {
            const mes = fechaNota.getMonth();
            ingresosPorMes[mes] += nota.total || 0;
        }
    });
    
    return ingresosPorMes;
}

// ========================================
// GENERACIÓN DE PDF - NOTA DE VENTA
// ========================================

function generarPDFNotaVenta(nota) {
    // Crear contenido HTML para el PDF
    const contenidoHTML = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #333;
                    padding-bottom: 20px;
                    margin-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                    color: #f59e0b;
                }
                .info-negocio {
                    text-align: center;
                    font-size: 12px;
                    margin-bottom: 10px;
                }
                .numero-nota {
                    background: #f59e0b;
                    color: white;
                    padding: 10px;
                    text-align: center;
                    font-size: 18px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .regimen {
                    background: #10b981;
                    color: white;
                    padding: 5px 10px;
                    text-align: center;
                    font-size: 12px;
                    margin-bottom: 20px;
                }
                .datos-cliente {
                    background: #f3f4f6;
                    padding: 15px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 10px;
                    text-align: left;
                }
                th {
                    background: #f59e0b;
                    color: white;
                }
                .totales {
                    text-align: right;
                    margin-top: 20px;
                }
                .total-final {
                    font-size: 24px;
                    font-weight: bold;
                    color: #f59e0b;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 10px;
                    border-top: 1px solid #ddd;
                    padding-top: 20px;
                }
                .firma {
                    margin-top: 60px;
                    text-align: center;
                }
                .firma-line {
                    border-top: 1px solid #333;
                    width: 300px;
                    margin: 0 auto;
                    margin-top: 50px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>${infoNegocio.nombreComercial}</h1>
                <div class="info-negocio">
                    <p><strong>Propietario:</strong> ${infoNegocio.propietario}</p>
                    <p><strong>RUC:</strong> ${infoNegocio.ruc}</p>
                    <p><strong>Dirección:</strong> ${infoNegocio.direccion}</p>
                    <p><strong>Teléfono:</strong> ${infoNegocio.telefono}</p>
                    <p><strong>Email:</strong> ${infoNegocio.email}</p>
                </div>
            </div>

            <div class="numero-nota">
                NOTA DE VENTA No. ${nota.numeroNota}
            </div>

            <div class="regimen">
                ${nota.regimen} - NO APLICA IVA
            </div>

            <div class="datos-cliente">
                <h3>DATOS DEL CLIENTE</h3>
                <p><strong>Nombre:</strong> ${nota.cliente.nombre}</p>
                <p><strong>Cédula/RUC:</strong> ${nota.cliente.cedula}</p>
                <p><strong>Dirección:</strong> ${nota.cliente.direccion || 'No especificada'}</p>
                <p><strong>Teléfono:</strong> ${nota.cliente.telefono || 'No especificado'}</p>
                <p><strong>Fecha de Emisión:</strong> ${nota.fechaEmision}</p>
            </div>

            <h3>DETALLE DEL TRABAJO</h3>
            <table>
                <thead>
                    <tr>
                        <th>Cantidad</th>
                        <th>Descripción</th>
                        <th>Precio Unitario</th>
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
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="totales">
                <p><strong>Subtotal:</strong> $${nota.subtotal.toFixed(2)}</p>
                ${nota.descuento > 0 ? `<p><strong>Descuento:</strong> -$${nota.descuento.toFixed(2)}</p>` : ''}
                <p class="total-final">TOTAL: $${nota.total.toFixed(2)}</p>
            </div>

            ${nota.observaciones ? `
                <div style="margin-top: 20px;">
                    <h4>OBSERVACIONES:</h4>
                    <p>${nota.observaciones}</p>
                </div>
            ` : ''}

            <div class="firma">
                <div class="firma-line"></div>
                <p><strong>Firma del Cliente</strong></p>
            </div>

            <div class="footer">
                <p><strong>IMPORTANTE:</strong> Esta es una Nota de Venta emitida bajo el régimen RIMPE Negocio Popular.</p>
                <p>No aplica retención de IVA ni Renta según normativa vigente.</p>
                <p>Guarde este documento como comprobante de su transacción.</p>
            </div>
        </body>
        </html>
    `;

    // Abrir en nueva ventana para imprimir/guardar como PDF
    const ventana = window.open('', '_blank');
    ventana.document.write(contenidoHTML);
    ventana.document.close();
    
    // Auto-imprimir después de cargar
    ventana.onload = function() {
        ventana.print();
    };
}

// ========================================
// ESTADÍSTICAS DEL PANEL
// ========================================

function obtenerEstadisticasPanel() {
    const notas = getNotasVenta();
    const ingresosAnuales = calcularIngresosAnuales();
    const añoActual = new Date().getFullYear();
    const mesActual = new Date().getMonth();
    
    // Ingresos del mes actual
    const ingresosMes = notas
        .filter(n => {
            const fecha = new Date(n.fecha);
            return fecha.getFullYear() === añoActual && fecha.getMonth() === mesActual;
        })
        .reduce((total, n) => total + n.total, 0);
    
    // Notas pendientes de pago
    const notasPendientes = notas.filter(n => n.estado === 'pendiente').length;
    
    return {
        totalIngresos: ingresosAnuales.totalIngresos,
        ingresosMes: ingresosMes,
        totalNotas: notas.length,
        notasPendientes: notasPendientes,
        porcentajeRIMPE: ingresosAnuales.porcentajeUsado,
        enRiesgo: ingresosAnuales.enRiesgo
    };
}