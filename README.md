🏗️ Sistema de Gestión: Mueblería y Cerrajería "Benjamín"
Solución integral de software para la administración, catálogo y facturación simplificada de Mueblería y Cerrajería "Benjamín" (Guamaní, Quito).
🚫 Licencia y Propiedad Intelectual
ESTE SOFTWARE ES DE PROPIEDAD PRIVADA Y CÓDIGO CERRADO.
Queda estrictamente prohibida la:
 * Reproducción: No se permite copiar total o parcialmente el código fuente.
 * Redistribución: Prohibida la venta, alquiler o préstamo del sistema a terceros.
 * Modificación: No se autoriza la alteración del núcleo del sistema sin permiso expreso del propietario.
 * Uso No Autorizado: Este sistema ha sido desarrollado exclusivamente para el uso de Mueblería y Cerrajería "Benjamín".
> [!CAUTION]
> Cualquier intento de ingeniería inversa, copia o distribución no autorizada de este software constituye una violación de los derechos de propiedad intelectual y podrá ser sancionado bajo las leyes vigentes en la República del Ecuador.
> 
📋 Funcionalidades del Ecosistema
🔒 Gestión Administrativa (Privado)
 * Control RIMPE: Monitoreo en tiempo real del límite anual de ingresos ($20,000).
 * Emisión de Notas de Venta: Generador de documentos PDF bajo normativa de "Negocio Popular".
 * Historial de Transacciones: Registro persistente de clientes, montos y estados de pago.
 * Panel de Estadísticas: Visualización del rendimiento mensual del negocio.
🌍 Módulo de Clientes (Público)
 * Catálogo Digital: Visualización de cerrajería (puertas de tol) y carpintería personalizada.
 * Cotizador Automático: Integración con WhatsApp para pedidos directos.
 * Consulta de Documentos: Repositorio de notas de venta consultables mediante C.I./RUC.
📁 Estructura del Software
muebleria-benjamin/
├── index.html          # Interfaz unificada
├── css/
│   ├── styles.css      # Identidad corporativa
│   └── responsive.css  # Adaptación multiplataforma
├── js/
│   ├── data.js         # Configuración del Negocio (RUC/Admin)
│   ├── storage.js      # Motor de persistencia local
│   ├── admin.js        # Lógica de negocio y RIMPE
│   ├── ui.js           # Componentes de usuario
│   └── main.js         # Inicialización del sistema
└── README.md           # Documentación y Licencia

⚙️ Configuración del Propietario
Para activar el sistema, el administrador debe configurar sus credenciales en js/data.js:
const configPrivada = {
    propietario: "Mueblería y Cerrajería Benjamín",
    ruc_emisor: "17XXXXXXXX001",
    pass_admin: "CAMBIAR_ESTO_INMEDIATAMENTE", // Credencial de acceso al panel
    whatsapp_destino: "593985998615"
};

💾 Seguridad de los Datos
 * Persistencia: El sistema utiliza tecnología de almacenamiento local. Los datos residen exclusivamente en el dispositivo del propietario.
 * Privacidad: Las notas de venta públicas solo muestran información relevante al cliente para proteger la confidencialidad de otros registros.
 * Backup: Se recomienda realizar una copia de seguridad del archivo localStorage periódicamente desde el panel administrativo.
📞 Soporte Técnico Autorizado
Para incidencias, actualizaciones o consultas sobre la licencia:
 * 📍 Sede: Guamaní, Quito - Ecuador
 * 📧 Email: mycbenjamin@gmail.com
 * 💬 WhatsApp: +593 98 599 8615

© 2026 Mueblería y Cerrajería "Benjamín". Todos los derechos reservados.
