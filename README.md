\# 🏗️ Mueblería y Cerrajería "Benjamín"



Sitio web profesional para Mueblería y Cerrajería Benjamín - Guamaní, Quito, Ecuador



\## 📁 Estructura del Proyecto



```

muebleria-benjamin/

│

├── index.html                 # Página principal

│

├── css/

│   ├── styles.css            # Estilos principales

│   └── responsive.css        # Estilos responsive

│

├── js/

│   ├── data.js              # Datos (productos, insignias, testimonios)

│   ├── storage.js           # Gestión de localStorage

│   ├── ui.js                # Componentes de interfaz

│   ├── pages.js             # Renderizado de páginas

│   └── main.js              # Navegación y inicialización

│

└── README.md                # Este archivo

```



\## 🚀 Instalación



\### Opción 1: Uso Local Simple



1\. \*\*Descargar los archivos:\*\*

&nbsp;  - Crea una carpeta llamada `muebleria-benjamin`

&nbsp;  - Crea las subcarpetas `css` y `js`

&nbsp;  - Descarga todos los archivos en sus respectivas ubicaciones



2\. \*\*Abrir en VS Code:\*\*

&nbsp;  ```bash

&nbsp;  cd muebleria-benjamin

&nbsp;  code .

&nbsp;  ```



3\. \*\*Abrir con Live Server:\*\*

&nbsp;  - Instala la extensión "Live Server" en VS Code

&nbsp;  - Click derecho en `index.html`

&nbsp;  - Selecciona "Open with Live Server"



\### Opción 2: Servidor HTTP Simple (Python)



```bash

\# Python 3

cd muebleria-benjamin

python -m http.server 8000

```



Luego abre: `http://localhost:8000`



\### Opción 3: Node.js con http-server



```bash

\# Instalar http-server globalmente

npm install -g http-server



\# Ejecutar servidor

cd muebleria-benjamin

http-server -p 8000

```



\## ⚙️ Configuración



\### Personalizar Datos de Contacto



Edita el archivo `js/data.js` y busca la sección `contactInfo`:



```javascript

const contactInfo = {

&nbsp;   whatsapp: '593985998615',        // Tu número de WhatsApp

&nbsp;   email: 'mycbenjamin@gmail.com',  // Tu email

&nbsp;   direccion: 'Guamaní, Quito - Ecuador',

&nbsp;   mapa: 'https://maps.app.goo.gl/4ay1g87buAnreQvR7',

&nbsp;   horario: 'Lunes a Viernes: 8:00 AM - 6:00 PM\\nSábados: 9:00 AM - 2:00 PM'

};

```



\### Agregar/Modificar Productos



En `js/data.js`, edita el objeto `productos`:



```javascript

const productos = {

&nbsp;   muebleriaInterior: \[

&nbsp;       {

&nbsp;           id: 1,

&nbsp;           nombre: 'Nombre del Producto',

&nbsp;           precio: 135,

&nbsp;           categoria: 'Categoría',

&nbsp;           imagen: '🚪', // Emoji o ruta de imagen

&nbsp;           colores: \['Color1', 'Color2'],

&nbsp;           acabados: \['Acabado1', 'Acabado2'],

&nbsp;           materiales: \['Material1', 'Material2']

&nbsp;       }

&nbsp;       // ... más productos

&nbsp;   ]

};

```



\### Modificar Sistema de Insignias



Edita el array `insignias` en `js/data.js` para personalizar niveles, requisitos y beneficios.



\## 🎨 Personalización de Estilos



\### Colores Principales



Edita las variables CSS en `css/styles.css`:



```css

:root {

&nbsp;   --color-primary: #f59e0b;        /\* Dorado principal \*/

&nbsp;   --color-primary-dark: #d97706;   /\* Dorado oscuro \*/

&nbsp;   --color-secondary: #64748b;      /\* Gris plateado \*/

&nbsp;   --color-accent: #eab308;         /\* Amarillo acento \*/

&nbsp;   /\* ... más colores \*/

}

```



\## 📱 Características



\### Funcionalidades Principales



\- ✅ \*\*Catálogo Interactivo\*\* - 3 categorías de productos

\- ✅ \*\*Configurador de Productos\*\* - Personalización en tiempo real

\- ✅ \*\*Sistema de Insignias\*\* - 13 niveles de recompensas

\- ✅ \*\*Carrito de Cotización\*\* - Con cálculo de descuentos

\- ✅ \*\*Integración WhatsApp\*\* - Envío directo de pedidos

\- ✅ \*\*Registro de Usuarios\*\* - Con localStorage

\- ✅ \*\*Galería de Proyectos\*\* - Portafolio visual

\- ✅ \*\*Blog de Contenidos\*\* - Guías y consejos

\- ✅ \*\*Responsive Design\*\* - Compatible con todos los dispositivos



\### Páginas Disponibles



1\. \*\*Inicio\*\* - Hero section y servicios destacados

2\. \*\*Sobre Nosotros\*\* - Historia y valores

3\. \*\*Catálogos\*\* (3 secciones):

&nbsp;  - Mueblería Interior

&nbsp;  - Mueblería Exterior

&nbsp;  - Cerrajería Exterior

4\. \*\*Perfil de Usuario\*\* - Insignias y estadísticas

5\. \*\*Carrito\*\* - Cotización de productos

6\. \*\*Galería\*\* - Proyectos realizados

7\. \*\*Testimonios\*\* - Opiniones de clientes

8\. \*\*Blog\*\* - Artículos y guías

9\. \*\*Contacto\*\* - Información y formulario



\## 🔧 Funciones de Desarrollo



\### Consola de Debugging



Abre la consola del navegador (F12) y usa:



```javascript

// Ver datos del usuario actual

benjaminApp.getUser();



// Ver carrito actual

benjaminApp.getCart();



// Cargar datos de prueba

benjaminApp.loadTestData();



// Limpiar todos los datos

benjaminApp.clearAllData();



// Navegar a una página

benjaminApp.navigateTo('perfil');



// Ver productos disponibles

benjaminApp.productos;



// Ver sistema de insignias

benjaminApp.insignias;

```



\## 💾 Almacenamiento de Datos



El sitio usa `localStorage` para persistir datos:



\- \*\*benjaminUser\*\* - Datos del usuario registrado

\- \*\*benjaminCart\*\* - Items en el carrito

\- \*\*benjaminPedidos\*\* - Historial de pedidos



Para ver los datos almacenados:



```javascript

// En la consola del navegador

localStorage.getItem('benjaminUser');

localStorage.getItem('benjaminCart');

localStorage.getItem('benjaminPedidos');

```



\## 📱 WhatsApp Integration



El sistema genera mensajes formateados automáticamente con:

\- Detalles completos de productos

\- Configuraciones seleccionadas

\- Cálculo de precios aproximados

\- Datos del cliente (si está registrado)

\- Descuentos aplicables



El número de WhatsApp se configura en `js/data.js` en el objeto `contactInfo`.



\## 🌐 Despliegue en Producción



\### GitHub Pages



1\. Sube el proyecto a un repositorio de GitHub

2\. Ve a Settings > Pages

3\. Selecciona la rama `main` y carpeta `/root`

4\. El sitio estará disponible en `https://tu-usuario.github.io/nombre-repo`



\### Netlify



1\. Arrastra la carpeta del proyecto a \[netlify.com/drop](https://app.netlify.com/drop)

2\. O conecta tu repositorio de GitHub

3\. El sitio se despliega automáticamente



\### Vercel



```bash

\# Instalar Vercel CLI

npm i -g vercel



\# Desplegar

cd muebleria-benjamin

vercel

```



\## 🔐 Notas de Seguridad



\- ⚠️ Los datos se almacenan en el navegador del usuario (localStorage)

\- ⚠️ No hay autenticación real - solo almacenamiento local

\- ⚠️ Para un sistema de producción completo, considera:

&nbsp; - Backend con base de datos

&nbsp; - Autenticación real

&nbsp; - Procesamiento de pagos

&nbsp; - Panel de administración

# 🏗️ Mueblería y Cerrajería "Benjamín" - Sistema RIMPE

Sistema web profesional para gestión de negocio bajo **régimen RIMPE Negocio Popular** en Ecuador.

## 📋 **Características del Sistema**

### **✅ Sistema COMPLETO para RIMPE**
- **Emisión de Notas de Venta** (sin IVA)
- **Control de ingresos anuales** ($20,000 límite)
- **Panel de Administración** privado
- **Consulta pública de notas** por cédula
- **Generación automática de PDF**
- **Historial completo** de transacciones

### **🎯 Especialización del Negocio**
- **Cerrajería:** Puertas de tol (calibre 14, 16, 18)
- **Estructuras Metálicas:** Techos, cerramientos, mezzanines
- **Carpintería:** Trabajos en madera personalizados

### **💰 Costo: $0**
- Hosting GRATIS (Vercel/Netlify)
- Base de datos: localStorage (sin servidor)
- Dominio gratuito incluido (.vercel.app)

---

## 📁 **Estructura del Proyecto**

```
muebleria-benjamin/
│
├── index.html                 # Página principal
│
├── css/
│   ├── styles.css            # Estilos principales
│   └── responsive.css        # Estilos responsive + Admin
│
├── js/
│   ├── data.js              # Productos, insignias, info RIMPE
│   ├── storage.js           # Gestión de localStorage
│   ├── admin.js             # Panel administrativo RIMPE
│   ├── ui.js                # Componentes de interfaz
│   ├── pages.js             # Renderizado de páginas
│   └── main.js              # Navegación y inicialización
│
└── README.md                # Este archivo
```

---

## 🚀 **Instalación Local**

### **Opción 1: VS Code + Live Server**
```bash
# 1. Crear carpetas
mkdir muebleria-benjamin
cd muebleria-benjamin
mkdir css js

# 2. Copiar todos los archivos en sus carpetas

# 3. Abrir en VS Code
code .

# 4. Instalar extensión "Live Server"
# 5. Click derecho en index.html → "Open with Live Server"
```

### **Opción 2: Python HTTP Server**
```bash
cd muebleria-benjamin
python -m http.server 8000
# Abrir: http://localhost:8000
```

---

## 🌐 **Despliegue GRATIS en Vercel/Netlify**

### **Opción A: Vercel (Recomendado)**

#### **Paso 1: Preparar GitHub**
```bash
# Dentro de la carpeta del proyecto
git init
git add .
git commit -m "Sistema RIMPE Benjamín"

# Crear repositorio en GitHub y subir
git remote add origin https://github.com/TU-USUARIO/muebleria-benjamin.git
git push -u origin main
```

#### **Paso 2: Desplegar en Vercel**
1. Ve a [vercel.com](https://vercel.com)
2. Regístrate con GitHub (gratis)
3. Click "New Project"
4. Importa tu repositorio `muebleria-benjamin`
5. Click "Deploy"
6. ¡Listo! Tu sitio estará en: `muebleria-benjamin.vercel.app`

#### **Paso 3: Dominio Personalizado (Opcional - $8/año)**
1. Compra `mycbenjamin.com` en Namecheap
2. En Vercel → Settings → Domains
3. Agrega tu dominio y sigue instrucciones DNS

### **Opción B: Netlify**
Similar a Vercel, arrastra la carpeta en [app.netlify.com/drop](https://app.netlify.com/drop)

---

## ⚙️ **Configuración Inicial**

### **1. Datos del Negocio (`js/data.js`)**
```javascript
const infoNegocio = {
    nombreComercial: 'Mueblería y Cerrajería "Benjamín"',
    propietario: 'Maestro Benjamín',
    ruc: 'TU_RUC_AQUÍ', // ⚠️ IMPORTANTE: Agregar tu RUC
    regimen: 'RIMPE - Negocio Popular',
    direccion: 'Guamaní, Quito - Ecuador',
    telefono: '+593 98 599 8615',
    email: 'mycbenjamin@gmail.com',
    whatsapp: '593985998615',
    limiteAnual: 20000, // Límite RIMPE
    serie: '001-001' // Serie de establecimiento
};
```

### **2. Credenciales de Admin (`js/data.js`)**
```javascript
const adminCredentials = {
    username: 'admin',
    password: 'TU_CONTRASEÑA_SEGURA', // ⚠️ CAMBIAR ESTO
    sessionTimeout: 3600000 // 1 hora
};
```

### **3. Contacto WhatsApp**
El número `593985998615` aparece en múltiples lugares. Búscalo y cámbialo si es necesario.

---

## 📱 **Funcionalidades del Sistema**

### **🌍 PARTE PÚBLICA (Para Clientes)**

#### **1. Catálogo de Exhibición**
- Muestra trabajos realizados organizados por categoría
- **No hay venta directa** - Solo exhibición
- Botón de contacto directo por WhatsApp

#### **2. Consulta de Notas de Venta**
📍 Ruta: "Consultar Mis Notas" (footer)

- Cliente ingresa su **cédula**
- Ve todas sus notas de venta
- Puede **descargar PDF** de cualquier nota

#### **3. Galería de Proyectos**
- Trabajos antes/después
- Especificaciones técnicas
- Materiales utilizados

---

### **🔒 PANEL DE ADMINISTRACIÓN (Solo Propietario)**

#### **Acceso al Panel**
1. Click en "🔒 Admin" (footer)
2. Usuario: `admin`
3. Contraseña: La que configuraste
4. Sesión válida por 1 hora

---

#### **Dashboard Principal**

**Estadísticas en Tiempo Real:**
- ✅ **Ingresos Anuales** + % del límite RIMPE ($20,000)
- ✅ **Ingresos del Mes** actual
- ✅ **Total de Notas** emitidas
- ✅ **Notas Pendientes** de pago

**Alerta RIMPE:**
- ⚠️ Si superas el 90% del límite anual, aparece alerta visual

---

#### **Crear Nueva Nota de Venta**

**Flujo Completo:**
1. Ingresar datos del cliente (cédula obligatoria)
2. Agregar items del trabajo:
   - Cantidad
   - Descripción detallada
   - Precio unitario
3. Aplicar descuento (opcional)
4. Agregar observaciones
5. Seleccionar estado de pago:
   - Pendiente
   - Pagada
   - Parcial
6. Click "Generar Nota"
7. **Se genera automáticamente:**
   - PDF profesional con todos los datos
   - Se guarda en el sistema
   - Numeración automática (001-001-000000001)

**Formato del PDF:**
```
┌─────────────────────────────────────┐
│  MUEBLERÍA Y CERRAJERÍA "BENJAMÍN"  │
│  RUC: [Tu RUC]                      │
│  Guamaní, Quito - Ecuador           │
├─────────────────────────────────────┤
│  NOTA DE VENTA No. 001-001-00000001 │
│  RIMPE - Negocio Popular            │
│  NO APLICA IVA                      │
├─────────────────────────────────────┤
│  DATOS DEL CLIENTE                  │
│  Nombre: Juan Pérez                 │
│  Cédula: 1234567890                 │
│  Fecha: 28/02/2024                  │
├─────────────────────────────────────┤
│  DETALLE DEL TRABAJO                │
│  1x Puerta de Tol calibre 18        │
│     Incluye instalación             │
│     Subtotal: $450.00               │
├─────────────────────────────────────┤
│  TOTAL: $450.00                     │
│  _________________________________  │
│  Firma del Cliente                  │
└─────────────────────────────────────┘
```

---

#### **Historial de Notas**

- Tabla completa de todas las notas emitidas
- Filtros por estado (pendiente, pagada, parcial)
- Ver detalles completos
- Descargar PDF nuevamente
- Información organizada:
  - Número de nota
  - Fecha de emisión
  - Nombre del cliente
  - Cédula
  - Total
  - Estado de pago

---

#### **Control RIMPE Automático**

**El sistema calcula automáticamente:**
- ✅ Total de ingresos del año fiscal
- ✅ Porcentaje usado del límite ($20,000)
- ✅ Margen disponible
- ✅ Alerta si estás cerca del límite (>90%)

**Ejemplo:**
```
Ingresos Anuales 2024: $15,450.00
Límite RIMPE: $20,000.00
Porcentaje Usado: 77.3%
Margen Disponible: $4,550.00
Estado: ✅ Dentro del límite
```

---

## 🔧 **Características Técnicas**

### **Almacenamiento de Datos**
Todo se guarda en el navegador del usuario (localStorage):

**Datos almacenados:**
- `notasVenta` - Todas las notas emitidas
- `benjaminUser` - Usuario registrado (si aplica)
- `benjaminCart` - Carrito temporal
- `adminSession` - Sesión de administrador

**Ver datos guardados:**
```javascript
// En la consola del navegador (F12)
JSON.parse(localStorage.getItem('notasVenta'))
```

### **Seguridad**
- ⚠️ **Importante:** Este sistema es básico y almacena datos localmente
- Para producción REAL considera:
  - Backend con base de datos real (MySQL/PostgreSQL)
  - Autenticación robusta
  - Encriptación de datos sensibles
  - Backups automáticos

---

## 📊 **Flujo de Trabajo Recomendado**

### **Escenario 1: Cliente Nuevo**
1. Cliente ve el catálogo web
2. Le gusta un diseño de puerta de tol
3. Click en botón WhatsApp
4. Te contacta para cotización
5. Vas a su domicilio, tomas medidas
6. Acuerdan precio: $450
7. Fabricas la puerta (7-10 días)
8. **Al entregar:**
   - Entras al panel admin
   - Creas nueva nota de venta
   - Generas PDF
   - Se lo entregas impreso o por WhatsApp
9. Cliente puede consultar su nota cuando quiera en la web

### **Escenario 2: Control de Ingresos**
1. Cada semana/mes revisas tu panel
2. Ves cuánto has facturado en el año
3. Si te acercas a $18,000 (90% del límite):
   - ⚠️ El sistema te alerta
   - Planificas para no superar $20,000
   - O consideras cambiarte a otro régimen

---

## 🛡️ **Cumplimiento Legal RIMPE**

### **✅ Lo que SÍ hace el sistema:**
- Genera Notas de Venta (NO facturas)
- Indica claramente "RIMPE Negocio Popular"
- Especifica "NO APLICA IVA"
- Lleva registro de todos los ingresos
- Alerta cuando te acercas al límite de $20,000

### **⚠️ Lo que NO hace (debes hacer tú):**
- Declaración de impuestos ante el SRI
- Pago del impuesto a la renta (2% sobre ingresos)
- Renovación de RUC/RISE
- Asesoría contable

**Recomendación:** Consulta con un contador para tus obligaciones específicas.

---

## 📞 **Soporte Técnico**

### **Consola de Debugging**
Abre la consola del navegador (F12):

```javascript
// Ver todas las notas
benjaminApp.getNotasVenta();

// Calcular ingresos del año
benjaminApp.calcularIngresosAnuales(2024);

// Limpiar todos los datos (⚠️ cuidado)
benjaminApp.clearAllData();
```

### **Problemas Comunes**

**1. "No aparecen mis notas"**
- Verifica que estés usando el mismo navegador
- Los datos están en localStorage (solo en ese navegador)

**2. "Olvidé mi contraseña de admin"**
- Edita `js/data.js` y cambia el password
- O usa la consola: `localStorage.removeItem('adminSession')`

**3. "Quiero hacer backup"**
```javascript
// Copiar datos
const backup = localStorage.getItem('notasVenta');
console.log(backup); // Copiar y guardar en archivo .txt
```

---

## 🎯 **Próximas Mejoras**

- [ ] Backend con base de datos real (Firebase/Supabase)
- [ ] Envío automático de notas por email
- [ ] Firma digital del cliente
- [ ] Exportar reportes a Excel
- [ ] App móvil (PWA)
- [ ] Integración con sistema contable

---

## 📄 **Licencia**

Sistema de uso privado para Mueblería y Cerrajería "Benjamín".

---

**Desarrollado con ❤️ para negocios RIMPE en Ecuador**

© 2024 - Mueblería y Cerrajería "Benjamín"

\## 🎯 Próximas Mejoras Sugeridas



\- \[ ] Integración con API de pagos

\- \[ ] Panel de administración

\- \[ ] Base de datos real

\- \[ ] Galería de imágenes reales

\- \[ ] Chat en vivo

\- \[ ] Sistema de notificaciones por email

\- \[ ] Facturación automática

\- \[ ] Tracking de pedidos en tiempo real



\## 📞 Soporte



Para dudas o soporte técnico:

\- \*\*Email:\*\* mycbenjamin@gmail.com

\- \*\*WhatsApp:\*\* +593 98 599 8615

\- \*\*Ubicación:\*\* Guamaní, Quito - Ecuador



\## 📄 Licencia



Este proyecto es de código cerrado y propiedad de Mueblería y Cerrajería "Benjamín".



---



\*\*Desarrollado con ❤️ para Mueblería y Cerrajería "Benjamín"\*\*



© 2024 - Todos los derechos reservados

