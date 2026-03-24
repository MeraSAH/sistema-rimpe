# 🏗️ Mueblería y Cerrajería "Benjamín"
### Sistema Web Completo — Quito, Ecuador

> Sitio web profesional con sistema RIMPE, catálogo interactivo, gestión de clientes,
> verificación de identidad, seguimiento de pedidos y panel de administración completo.

---

## 📋 Índice

1. [Resumen del Sistema](#resumen)
2. [Estructura de Archivos](#estructura)
3. [Instalación Local](#instalacion)
4. [Deploy en Vercel](#deploy)
5. [Configuración de Supabase](#supabase)
6. [Módulos del Sistema](#modulos)
7. [Panel de Administración](#admin)
8. [Sistema de Clientes](#clientes)
9. [Verificación de Identidad](#verificacion)
10. [Sistema RIMPE](#rimpe)
11. [Gestión de Imágenes](#imagenes)
12. [Credenciales](#credenciales)
13. [Comandos Git](#git)

---

## 📦 Resumen del Sistema {#resumen}

| Módulo | Estado | Descripción |
|---|---|---|
| Catálogo de productos | ✅ | 3 categorías, configurador, carrito |
| Sistema de cotización | ✅ | Carrito → WhatsApp automático |
| Notas de venta RIMPE | ✅ | PDF profesional, estados, abonos |
| Panel de administración | ✅ | Acceso con Ctrl+Shift+A |
| Sistema de clientes | ✅ | Registro, insignias, descuentos |
| Verificación de identidad | ✅ | Cédula EC (mod 10) + QR Registro Civil + WhatsApp |
| Seguimiento de pedidos | ✅ | 4 estados con barra de progreso |
| Testimonios moderados | ✅ | Cliente envía → admin aprueba/destaca/rechaza |
| Blog y galería | ✅ | CRUD desde el admin |
| Portal de soporte | ✅ | Quejas, reclamos, contacto |
| Sync con Supabase | ✅ | Dual-write local + nube, throttle 60s |

---

## 📁 Estructura de Archivos {#estructura}

```
muebleria-benjamin/
│
├── index.html              # SPA principal — toda la app vive aquí
│
├── css/
│   ├── styles.css          # Variables CSS, componentes base
│   └── responsive.css      # Responsive + estilos admin/perfil/verificación
│
├── js/
│   ├── data.js             # Catálogo, insignias, info negocio (SIN testimonios hardcode)
│   ├── storage.js          # localStorage: usuario, carrito, pedidos, insignias
│   ├── admin.js            # RIMPE: notas de venta, CRUD, cálculos fiscales, PDF
│   ├── supabase.js         # Auth cliente, sync Supabase, normalización snake→camelCase
│   ├── verificacion.js     # Verificación identidad: módulo 10 + QR + WhatsApp admin
│   ├── testimonios.js      # CRUD testimonios: envío, moderación, estadísticas
│   ├── images.js           # Gestor centralizado de imágenes (rutas y fallbacks)
│   ├── ui.js               # Componentes: tarjetas, carrito, menú mobile
│   ├── pages.js            # Renderizado de todas las páginas (~4200 líneas)
│   └── main.js             # Router SPA, navegación, throttle sync
│
├── img/                    # (crear manualmente — ver sección Imágenes)
│   ├── logo/
│   ├── hero/
│   ├── galeria/
│   ├── productos/
│   ├── blog/
│   └── equipo/
│
├── vercel.json             # Headers de seguridad y caché para Vercel
├── schema.sql              # Esquema de tablas para Supabase
├── GUIA_IMAGENES_Y_DEPLOY.md
└── README.md               # Este archivo
```

---

## 🚀 Instalación Local {#instalacion}

```bash
# 1. Clonar el repositorio
git clone https://github.com/MeraSAH/sistema-rimpe.git
cd sistema-rimpe

# 2. Abrir en VS Code
code .

# 3. Instalar extensión "Live Server" en VS Code
# 4. Click derecho en index.html → "Open with Live Server"
```

> ⚠️ **No abrir index.html directamente** con doble clic — el error
> `Unsafe attempt to load URL file:///` es normal en local y desaparece en Vercel.

---

## 🌐 Deploy en Vercel {#deploy}

```bash
# Subir cambios (lo único que necesitas hacer)
git add .
git commit -m "descripción del cambio"
git push origin main
# Vercel redespliega automáticamente en ~30 segundos
```

**URL del sitio:** `https://muebleria-benjamin.vercel.app`

**Dashboard Vercel:** `https://vercel.com/dashboard`

---

## 🗄️ Configuración de Supabase {#supabase}

**URL:** `https://oyjdljacavhilwiqbyof.supabase.co`

### Tablas requeridas
Ejecutar `schema.sql` en **Supabase → SQL Editor**:

```sql
-- Ver archivo schema.sql en la raíz del proyecto
```

### Desactivar confirmación de email
Para que los clientes se registren sin esperar email:
1. Supabase → **Authentication** → **Settings**
2. **Email Auth** → desactivar **"Enable email confirmations"**

### Crear usuario administrador
1. Supabase → **Authentication** → **Users** → **Add user**
2. Email: `mycbenjamin@gmail.com`
3. Contraseña: la definida en `adminCredentials` de `data.js`

---

## 🧩 Módulos del Sistema {#modulos}

### 🛍️ Catálogo y Carrito

- **3 categorías:** Mueblería Interior, Mueblería Exterior, Cerrajería Exterior
- Configurador en tiempo real: color, acabado, material, tipo de entrega
- Tipo **Terminada:** incluye instalación y toma de medidas
- Tipo **Rústica:** -15%, retiro en taller
- Descuentos automáticos por insignia del cliente
- Alerta de descuento por volumen (≥5 puertas)
- Botón **Realizar Pedido por WhatsApp** → mensaje formateado automático

### 📄 Blog y Galería

- CRUD completo desde Admin → Blog / Galería
- Galería: emoji + descripción + medidas + material + fecha
- Blog: título + resumen + contenido + categoría + fecha

---

## 🔧 Panel de Administración {#admin}

**Acceso:** `Ctrl + Shift + A` (no hay botón visible)

### Módulos disponibles

| Módulo | Ruta | Descripción |
|---|---|---|
| Dashboard | `admin-panel` | Estadísticas, alerta RIMPE, accesos rápidos |
| Nueva Nota | `admin-nueva-nota` | Crear nota con autorelleno de clientes y selector de productos |
| Historial | `admin-historial` | Todas las notas, filtros, editar, PDF |
| Productos | `admin-productos` | CRUD catálogo de productos |
| Clientes | `admin-clientes` | Clientes con notas + registrados, insignias, papelera |
| Pedidos | `admin-pedidos` | Seguimiento: Por iniciar → En proceso → Listo → Entregado |
| Verificaciones | `admin-verificaciones` | Aprobar/rechazar identidades por WhatsApp |
| Testimonios | `admin-testimonios` | Pendiente → Aprobado → Destacado / Rechazado |
| Galería | `admin-galeria` | CRUD proyectos |
| Blog | `admin-blog` | CRUD artículos |
| Estadísticas | `admin-estadisticas` | Gráfico mensual, control RIMPE |

### Notas de Venta RIMPE

```
Serie: S 001-001-00
Autorización SRI: 1133211394
Régimen: RIMPE Negocio Popular — NO APLICA IVA
Límite anual: $20,000 USD
Alerta automática al alcanzar el 90% ($18,000)
```

**PDF incluye:**
- Cabecera con datos del negocio y RUC
- Número de nota y serie
- Datos del cliente
- Tabla de items con precios
- Tabla de abonos si hay pagos parciales
- Sello del negocio
- Sello de estado (color según estado)
- Marca de agua CANCELADO si corresponde
- Datos de autorización SRI e imprenta

---

## 👥 Sistema de Clientes {#clientes}

### Cómo se guardan los clientes

Los clientes se registran en **dos fuentes** que `getClientesList()` fusiona:

1. **`clientesRegistrados`** — se llena al crear cuenta en el sitio
2. **`notasVenta`** — se construye automáticamente al emitir notas

> Un cliente que se registra sin nota aparece en el admin. Un cliente
> con nota pero sin cuenta también aparece. Ambas fuentes se unifican.

### Sistema de Insignias

| Nivel | Nombre | Compras mínimas | Descuento |
|---|---|---|---|
| Simple | 🥉 Bronce | 0 | 0% |
| Simple | 🥈 Plata | 1 | 5% |
| Simple | 🥇 Oro | 3 | 10% |
| Premium | 💚 Esmeralda | 5 | 12% |
| Premium | 💙 Zafiro | 8 | 15% |
| Premium | ❤️ Rubí | 12 | 18% |
| Premium | 💎 Diamante | 20 | 22% |
| Elite | 🔱 Platino | 35 | 28% |
| Elite | 👑 Maestro | Asignado | 35% |

- El admin puede asignar insignias manualmente (aparece mensaje al cliente)
- Fondo del perfil cambia según nivel: dorado (Simple), azul (Premium), violeta animado (Elite)

### Papelera de Clientes

- Eliminar cliente → va a papelera por 30 días
- Admin puede restaurar o eliminar definitivamente
- Las notas de venta **nunca se eliminan** (obligatorio RIMPE)

---

## 🔐 Verificación de Identidad {#verificacion}

### Flujo de 3 pasos

```
PASO D (automático, gratis)
Algoritmo módulo 10 — valida que la cédula ecuatoriana es matemáticamente válida
Descarta cédulas inventadas al instante
        ↓
PASO B (automático, jsQR)
Cliente sube foto del QR del reverso de su cédula
jsQR lee el código → detecta URL del Registro Civil
URL del dominio qr.registrocivil.gob.ec → VERIFICADO ✅
        ↓ si falla
PASO A (manual, WhatsApp)
Mensaje automático al soporte: +593 981 676 646 (NO al maestro)
Solicitud aparece en Admin → Verificaciones
Admin revisa foto en WhatsApp y aprueba desde el panel
```

### Gestión desde el Admin

- **Aprobar por cédula/email** → para solicitudes antiguas o sin cola
- **Revocar** → cliente vuelve a `sin_verificar` y ve el motivo
- El cliente es notificado en su próxima visita (sin necesidad de acción)

### Números de teléfono

| Número | Uso |
|---|---|
| `+593 98 599 8615` | Maestro — pedidos y cotizaciones de clientes |
| `+593 98 167 6646` | Soporte — verificaciones de identidad y quejas |

### Control de duplicados

| Control | Quién lo aplica |
|---|---|
| Email duplicado | Supabase Auth (automático) |
| Cédula inválida matemáticamente | Algoritmo módulo 10 |
| QR no coincide con la cédula | jsQR |
| Identidad sospechosa | Admin por WhatsApp manual |

---

## 📦 Sistema RIMPE {#rimpe}

```
Propietario: MERA MOREIRA GREGORIO MARCIAL
RUC: 1311617086001
Régimen: Contribuyente Negocio Popular — RIMPE
Límite anual: $20,000 USD
Serie: S 001-001-00
Autorización SRI: 1133211394
Imprenta: Grafila — autorización 14053
Rango: Del 0000301 al 0000325
Vigencia: 06/Enero/2026 — 06/Enero/2027
```

> ⚠️ El sistema **no realiza** la declaración ante el SRI ni el pago del 2% sobre ingresos.
> Consulta con un contador para tus obligaciones específicas.

---

## 📸 Gestión de Imágenes {#imagenes}

Todas las imágenes se gestionan desde `js/images.js`.

### Estructura de carpetas

```
img/
├── logo/           → logo-benjamin.png, favicon.ico
├── hero/           → taller-principal.webp
├── galeria/
│   └── thumbs/    → versiones pequeñas (400×300px)
├── productos/      → fotos del catálogo
├── blog/           → miniaturas de artículos
└── equipo/         → maestro y taller
```

### Tamaños recomendados

| Sección | Tamaño | Formato | Peso máximo |
|---|---|---|---|
| Logo | 200×60px | PNG | 20KB |
| Hero/Banner | 1920×600px | WebP | 500KB |
| Galería | 1200×800px | WebP | 400KB |
| Productos | 800×600px | WebP | 200KB |

**Herramientas gratuitas:** [squoosh.app](https://squoosh.app) · [tinypng.com](https://tinypng.com)

---

## 🔑 Credenciales {#credenciales}

> ⚠️ **Nunca subas este archivo con contraseñas reales a un repositorio público.**

```js
// js/data.js
adminCredentials = {
    username: 'admin',
    password: 'benjamin2024'  // ← CAMBIAR en producción
}

// js/supabase.js
SUPABASE_URL = 'https://oyjdljacavhilwiqbyof.supabase.co'
SUPABASE_KEY = 'sb_publishable_ydkUIr7Qa7mnOZ9MVZk8Kg_AD6yaHg-'
```

---

## 🌿 Comandos Git {#git}

```bash
# Ver estado de cambios
git status

# Subir todos los cambios
git add .
git commit -m "descripción del cambio"
git push origin main

# Crear backup de los datos del localStorage (en consola del navegador)
copy(localStorage.getItem('notasVenta'))
# Pegar en un archivo .txt y guardar

# Ver historial de commits
git log --oneline -10
```

---

## 🐛 Solución de Problemas

| Problema | Solución |
|---|---|
| Menú mobile no abre | Actualizado en ui.js — onclick directo en el botón |
| QR no se lee | jsQR ahora en index.html, prueba múltiples escalas |
| Cliente queda en "verificando" | Usar Admin → Verificaciones → Aprobar por cédula |
| Notas muestran fecha desconocida | supabase.js normaliza snake_case→camelCase |
| Carrito no abre | Alias de seguridad createCartItem en pages.js |
| Sync Supabase repetido | Throttle de 60s — solo sincroniza 1 vez por minuto |
| No veo mis clientes | Se registran en clientesRegistrados + notas fusionadas |
| Testimonio pendiente para siempre | Admin → Testimonios → tab Pendientes |

---

## 📞 Contacto del Negocio

```
📍 Guamaní, Quito - Ecuador
📱 +593 98 599 8615 (pedidos y cotizaciones)
🛟 +593 98 167 6646 (soporte y verificaciones)
📧 mycbenjamin@gmail.com
🛟 mycbenjaminsoporte@gmail.com
🌐 https://muebleria-benjamin.vercel.app
```

---

*Última actualización: Marzo 2026*
*Desarrollado para Mueblería y Cerrajería "Benjamín" — Quito, Ecuador*