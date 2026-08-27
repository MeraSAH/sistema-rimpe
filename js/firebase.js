// ========================================
// FIREBASE / FIRESTORE — BASE DE DATOS EN LA NUBE
// Mueblería y Cerrajería "Benjamín"
// ========================================
// Este archivo REEMPLAZA a js/supabase.js.
// Mantiene EXACTAMENTE los mismos nombres de función (isSupabaseConfigured,
// dbSaveNota, supabaseLogin, clienteLogin, etc.) para que admin.js, main.js
// y pages.js sigan funcionando sin ningún cambio. Por dentro, todo corre
// sobre Firebase Auth + Cloud Firestore.
//
// REQUIERE en index.html (antes de este script):
//   <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js"></script>
// ========================================

// 🔧 REEMPLAZA con la configuración de tu proyecto Firebase
// (Firebase Console → ⚙️ Configuración del proyecto → "Tus apps" → SDK setup and configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FIREBASE_CONFIG = {
    apiKey:            "AIzaSyB-dROCFBg075fp8bK_eBlZPmJST8Y5YiU",
    authDomain:        "muebleriaycerrajeria-benjamin.firebaseapp.com",
    projectId:         "muebleriaycerrajeria-benjamin",
    storageBucket:     "muebleriaycerrajeria-benjamin.firebasestorage.app",
    messagingSenderId: "413810060846",
    appId:             "1:413810060846:web:d238436fed3a333e16f9bf"
};

// ─── Cliente ──────────────────────────────────────────────────────────────────
let _fbApp = null;
let _db    = null; // Firestore
let _auth  = null; // Firebase Auth

function getDB() {
    if (_db) return _db;
    if (typeof firebase === 'undefined') { console.error('❌ SDK Firebase no cargado'); return null; }
    if (!_fbApp) _fbApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE_CONFIG);
    _db = firebase.firestore();
    return _db;
}

function getAuthSDK() {
    if (_auth) return _auth;
    if (typeof firebase === 'undefined') { console.error('❌ SDK Firebase no cargado'); return null; }
    if (!_fbApp) _fbApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE_CONFIG);
    _auth = firebase.auth();
    return _auth;
}

// Nombre conservado por compatibilidad con admin.js / main.js / pages.js
function isSupabaseConfigured() {
    return !FIREBASE_CONFIG.apiKey.includes('TU_') && !FIREBASE_CONFIG.projectId.includes('TU_');
}

// ─── Indicador de conexión (idéntico al original) ─────────────────────────────
function mostrarEstadoSync(estado) {
    // 'ok' | 'error' | 'loading'
    const existente = document.getElementById('supabase-status');
    if (existente) existente.remove();
    const colors = { ok: '#10b981', error: '#ef4444', loading: '#f59e0b' };
    const labels = { ok: '☁️ Sincronizado', error: '⚠️ Solo local', loading: '🔄 Sincronizando...' };
    const el = document.createElement('div');
    el.id = 'supabase-status';
    el.style.cssText = `position:fixed;bottom:5rem;left:1rem;background:${colors[estado]};color:#fff;
        padding:6px 12px;border-radius:20px;font-size:12px;font-weight:700;z-index:9998;
        box-shadow:0 2px 8px rgba(0,0,0,.2);transition:opacity .5s`;
    el.textContent = labels[estado];
    document.body.appendChild(el);
    if (estado === 'ok') setTimeout(() => { el.style.opacity = '0'; setTimeout(() => el.remove(), 500); }, 2500);
}

// ========================================
// NOTAS DE VENTA — CRUD ASYNC (Firestore)
// Colección: notas_venta   ·   doc id = String(nota.id)
// ========================================

function _rowToNota(row) {
    return {
        id:                   row.id,
        numeroNota:           row.numeroNota          || '—',
        secuencial:           row.secuencial,
        fecha:                row.fecha,
        fechaEmision:         row.fechaEmision         || '—',
        cliente:              row.cliente              || {},
        items:                row.items                || [],
        subtotal:             row.subtotal             || 0,
        descuento:            row.descuento            || 0,
        total:                row.total                || 0,
        estado:               row.estado               || 'pendiente',
        observaciones:        row.observaciones        || '',
        montoPagado:          row.montoPagado          || 0,
        abonos:               row.abonos               || [],
        regimen:              row.regimen              || 'RIMPE - Negocio Popular',
        ultimaActualizacion:  row.ultimaActualizacion  || null
    };
}

async function dbGetNotas() {
    const db = getDB();
    if (!db || !isSupabaseConfigured()) return _notasLocal();
    try {
        mostrarEstadoSync('loading');
        const snap = await db.collection('notas_venta').orderBy('secuencial', 'desc').get();
        const normalizadas = snap.docs.map(d => _rowToNota({ id: d.id, ...d.data() }));
        localStorage.setItem('notasVenta', JSON.stringify(normalizadas));
        mostrarEstadoSync('ok');
        return normalizadas;
    } catch (e) {
        console.warn('Firebase offline:', e.message);
        mostrarEstadoSync('error');
        return _notasLocal();
    }
}

async function dbSaveNota(nota) {
    // 1. Guardar local de inmediato
    const notas = _notasLocal();
    notas.unshift(nota);
    localStorage.setItem('notasVenta', JSON.stringify(notas));

    const db = getDB();
    if (!db || !isSupabaseConfigured()) return nota;

    try {
        await db.collection('notas_venta').doc(String(nota.id)).set(_notaToRow(nota), { merge: true });
        mostrarEstadoSync('ok');
        return nota;
    } catch (e) {
        console.warn('Error guardando nota en Firestore:', e.message);
        mostrarEstadoSync('error');
        return nota;
    }
}

async function dbUpdateNota(id, updates) {
    // Local
    const notas = _notasLocal();
    const idx   = notas.findIndex(n => n.id === id);
    if (idx !== -1) {
        notas[idx] = { ...notas[idx], ...updates, ultimaActualizacion: new Date().toISOString() };
        localStorage.setItem('notasVenta', JSON.stringify(notas));
    }

    const db = getDB();
    if (!db || !isSupabaseConfigured()) return true;

    try {
        const payload = _notaToRow({ ...(notas[idx] || { id }), ...updates });
        await db.collection('notas_venta').doc(String(id)).set(payload, { merge: true });
        mostrarEstadoSync('ok');
        return true;
    } catch (e) {
        console.warn('Error actualizando nota en Firestore:', e.message);
        mostrarEstadoSync('error');
        return false;
    }
}

async function dbDeleteNota(id) {
    localStorage.setItem('notasVenta', JSON.stringify(_notasLocal().filter(n => n.id !== id)));

    const db = getDB();
    if (!db || !isSupabaseConfigured()) return true;

    try {
        await db.collection('notas_venta').doc(String(id)).delete();
        mostrarEstadoSync('ok');
        return true;
    } catch (e) {
        console.warn('Error eliminando nota en Firestore:', e.message);
        mostrarEstadoSync('error');
        return false;
    }
}

// ========================================
// PRODUCTOS — CRUD ASYNC (Firestore)
// Colección: productos_catalogo   ·   doc id = `${categoria}-${id}`
// ========================================

async function dbGetProductos() {
    const db = getDB();
    if (!db || !isSupabaseConfigured()) return _productosLocal();

    try {
        const snap = await db.collection('productos_catalogo').where('activo', '==', true).get();
        const grouped = { muebleriaInterior: [], muebleriaExterior: [], cerrajeriaExterior: [] };
        snap.forEach(doc => {
            const p = doc.data();
            if (grouped[p.categoria]) {
                grouped[p.categoria].push({
                    id:          p.id,
                    nombre:      p.nombre,
                    precio:      p.precio,
                    imagen:      p.imagen  || '📦',
                    descripcion: p.descripcion,
                    categoria:   p.categoriaLabel || p.categoria,
                    colores:     Array.isArray(p.colores)    ? p.colores    : [],
                    acabados:    Array.isArray(p.acabados)   ? p.acabados   : [],
                    materiales:  Array.isArray(p.materiales) ? p.materiales : []
                });
            }
        });
        localStorage.setItem('productosCustom', JSON.stringify(grouped));
        return grouped;
    } catch (e) {
        console.warn('Firebase offline, usando catálogo local:', e.message);
        return _productosLocal();
    }
}

async function dbAddProducto(categoria, producto) {
    // Local
    const cat   = _productosLocal();
    const maxId = (cat[categoria] || []).reduce((mx, p) => Math.max(mx, Number(p.id) || 0), 0);
    const nuevo = { ...producto, id: maxId + 1, categoria };
    (cat[categoria] = cat[categoria] || []).push(nuevo);
    localStorage.setItem('productosCustom', JSON.stringify(cat));

    const db = getDB();
    if (!db || !isSupabaseConfigured()) { mostrarEstadoSync('error'); return nuevo; }

    try {
        await db.collection('productos_catalogo').doc(`${categoria}-${nuevo.id}`).set({
            id:             nuevo.id,
            categoria,
            categoriaLabel: producto.categoria,
            nombre:         producto.nombre,
            precio:         producto.precio,
            imagen:         producto.imagen      || '📦',
            descripcion:    producto.descripcion || '',
            colores:        producto.colores     || [],
            acabados:       producto.acabados    || [],
            materiales:     producto.materiales  || [],
            activo:         true
        });
        mostrarEstadoSync('ok');
        return nuevo;
    } catch (e) {
        console.warn('Error guardando producto en Firestore:', e.message);
        mostrarEstadoSync('error');
        return nuevo;
    }
}

async function dbUpdateProducto(categoria, id, updates) {
    // Local
    const cat = _productosLocal();
    const idx = (cat[categoria] || []).findIndex(p => p.id == id);
    if (idx !== -1) cat[categoria][idx] = { ...cat[categoria][idx], ...updates };
    localStorage.setItem('productosCustom', JSON.stringify(cat));

    const db = getDB();
    if (!db || !isSupabaseConfigured()) return true;

    try {
        await db.collection('productos_catalogo').doc(`${categoria}-${id}`).set({
            nombre:      updates.nombre,
            precio:      updates.precio,
            imagen:      updates.imagen,
            descripcion: updates.descripcion,
            colores:     updates.colores,
            acabados:    updates.acabados,
            materiales:  updates.materiales
        }, { merge: true });
        mostrarEstadoSync('ok');
        return true;
    } catch (e) {
        console.warn('Error actualizando producto:', e.message);
        mostrarEstadoSync('error');
        return false;
    }
}

async function dbDeleteProducto(categoria, id) {
    const cat = _productosLocal();
    cat[categoria] = (cat[categoria] || []).filter(p => p.id != id);
    localStorage.setItem('productosCustom', JSON.stringify(cat));

    const db = getDB();
    if (!db || !isSupabaseConfigured()) return true;

    try {
        // Soft delete — igual que en la versión con Supabase
        await db.collection('productos_catalogo').doc(`${categoria}-${id}`).set({ activo: false }, { merge: true });
        mostrarEstadoSync('ok');
        return true;
    } catch (e) {
        console.warn('Error eliminando producto:', e.message);
        mostrarEstadoSync('error');
        return false;
    }
}

// ========================================
// TESTIMONIOS — sync opcional (testimonios.js lo llama si existe)
// Colección: testimonios   ·   doc id = String(t.id)
// ========================================
async function dbSyncTestimonios(lista) {
    const db = getDB();
    if (!db || !isSupabaseConfigured() || !Array.isArray(lista) || lista.length === 0) return;
    try {
        const batch = db.batch();
        lista.forEach(t => batch.set(db.collection('testimonios').doc(String(t.id)), t, { merge: true }));
        await batch.commit();
    } catch (e) {
        console.warn('Error sincronizando testimonios en Firestore:', e.message);
    }
}

// ========================================
// SINCRONIZACIÓN INICIAL (app load)
// ========================================
async function sincronizarDesdeSupabase() {
    if (!isSupabaseConfigured()) return;
    try {
        await Promise.all([dbGetNotas(), dbGetProductos()]);
        console.log('✅ Sync Firebase completado');
    } catch (e) {
        console.warn('⚠️ Error en sync inicial:', e);
    }
}

// ========================================
// MIGRACIÓN: localStorage → Firestore
// (el botón en admin.js llama a esta misma función por nombre)
// ========================================
async function migrarDatosLocalesASupabase() {
    const db = getDB();
    if (!db || !isSupabaseConfigured()) {
        showNotification('⚠️ Configura las credenciales de Firebase primero', 'error');
        return;
    }

    showNotification('Iniciando migración de datos locales a Firebase...', 'info');
    let ok = 0, fail = 0;

    // — Notas —
    const notasLocales = _notasLocal();
    if (notasLocales.length > 0) {
        try {
            const batch = db.batch();
            notasLocales.forEach(n => batch.set(db.collection('notas_venta').doc(String(n.id)), _notaToRow(n), { merge: true }));
            await batch.commit();
            ok += notasLocales.length;
        } catch (e) {
            console.error('Error migrando notas:', e);
            fail++;
        }
    }

    // — Productos custom —
    const prodsLocal = _productosLocal();
    const entradas = [];
    Object.entries(prodsLocal).forEach(([cat, prods]) => (prods || []).forEach(p => entradas.push({ cat, p })));
    if (entradas.length > 0) {
        try {
            const batch2 = db.batch();
            entradas.forEach(({ cat, p }) => {
                batch2.set(db.collection('productos_catalogo').doc(`${cat}-${p.id}`), {
                    id:             p.id,
                    categoria:      cat,
                    categoriaLabel: p.categoria || cat,
                    nombre:         p.nombre,
                    precio:         p.precio,
                    imagen:         p.imagen      || '📦',
                    descripcion:    p.descripcion || '',
                    colores:        p.colores     || [],
                    acabados:       p.acabados    || [],
                    materiales:     p.materiales  || [],
                    activo:         true
                }, { merge: true });
            });
            await batch2.commit();
            ok += entradas.length;
        } catch (e) {
            console.error('Error migrando productos:', e);
            fail++;
        }
    }

    if (fail === 0) showNotification(`✅ Migración completa: ${ok} registros subidos a Firebase`, 'success');
    else            showNotification(`⚠️ Migración parcial: ${ok} OK, ${fail} con errores (ver consola)`, 'error');
}

// ========================================
// HELPERS PRIVADOS
// ========================================
function _notasLocal() {
    return JSON.parse(localStorage.getItem('notasVenta') || '[]');
}

function _productosLocal() {
    const custom = localStorage.getItem('productosCustom');
    if (custom) return JSON.parse(custom);
    if (typeof productos !== 'undefined') {
        return {
            muebleriaInterior:  productos.muebleriaInterior  || [],
            muebleriaExterior:  productos.muebleriaExterior  || [],
            cerrajeriaExterior: productos.cerrajeriaExterior || []
        };
    }
    return { muebleriaInterior: [], muebleriaExterior: [], cerrajeriaExterior: [] };
}

function _notaToRow(nota) {
    return {
        id:                   nota.id,
        numeroNota:           nota.numeroNota || null,
        secuencial:           nota.secuencial ?? null,
        fecha:                nota.fecha || null,
        fechaEmision:         nota.fechaEmision || null,
        cliente:              nota.cliente || {},
        items:                nota.items || [],
        subtotal:             nota.subtotal || 0,
        descuento:            nota.descuento || 0,
        total:                nota.total || 0,
        estado:               nota.estado || 'pendiente',
        observaciones:        nota.observaciones || null,
        montoPagado:          nota.montoPagado || 0,
        abonos:               nota.abonos || [],
        regimen:              nota.regimen || 'RIMPE - Negocio Popular',
        ultimaActualizacion:  nota.ultimaActualizacion || null
    };
}

// ========================================
// AUTENTICACIÓN — Firebase Auth
// Reemplaza el sistema de admin de Supabase Auth.
// ========================================

let _currentUser        = null; // firebase.User | null
let _authStateListeners = [];

// ─── Inicializar listener de sesión ───────────────────────────────────────────
// Llamar una sola vez al cargar la app (initApp en main.js)
async function initSupabaseAuth() {
    const auth = getAuthSDK();
    if (!auth) return;

    // Esperar la primera resolución (restaura sesión persistida por Firebase)
    await new Promise(resolve => {
        const unsub = auth.onAuthStateChanged(user => {
            _currentUser = user;
            unsub();
            resolve();
        });
    });

    // Escuchar cambios de sesión (login / logout / refresh de token)
    auth.onAuthStateChanged(user => {
        const habiaSesion = _currentUser !== null;
        _currentUser = user;
        if (user && !habiaSesion)      _notifyAuthListeners('signed_in', { user });
        else if (!user && habiaSesion) _notifyAuthListeners('signed_out', null);
    });
}

function _notifyAuthListeners(event, session) {
    _authStateListeners.forEach(fn => { try { fn(event, session); } catch (e) {} });
}

function onAuthChange(fn) {
    _authStateListeners.push(fn);
}

// ─── Login admin con email + contraseña ───────────────────────────────────────
async function supabaseLogin(email, password) {
    const auth = getAuthSDK();
    if (!auth || !isSupabaseConfigured()) {
        return { ok: false, error: 'Firebase no configurado' };
    }
    try {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        _currentUser = cred.user;
        return { ok: true, user: cred.user };
    } catch (e) {
        return { ok: false, error: e.message };
    }
}

// ─── Logout ───────────────────────────────────────────────────────────────────
async function supabaseLogout() {
    const auth = getAuthSDK();
    if (auth) await auth.signOut();
    _currentUser = null;
}

// ─── ¿Está autenticado? ───────────────────────────────────────────────────────
function isAdminAuthenticated() {
    return _currentUser !== null;
}

function getAdminUser() {
    return _currentUser;
}

// ─── Recuperar contraseña ─────────────────────────────────────────────────────
async function supabaseResetPassword(email) {
    const auth = getAuthSDK();
    if (!auth || !isSupabaseConfigured()) return { ok: false };
    try {
        await auth.sendPasswordResetEmail(email);
        return { ok: true };
    } catch (e) {
        return { ok: false, error: e.message };
    }
}

// ========================================
// AUTH DE CLIENTE (público)
// Perfil ampliado se guarda en Firestore → colección "usuarios" (doc id = uid)
// ========================================

async function clienteRegister(email, password, perfil) {
    const auth = getAuthSDK();
    const db   = getDB();
    if (!auth || !isSupabaseConfigured()) {
        // Fallback: guardar solo local
        localStorage.setItem('benjaminUser', JSON.stringify({
            ...perfil, email, compras: 0,
            fechaRegistro: new Date().toISOString(), pedidos: []
        }));
        return { ok: true, local: true };
    }
    try {
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        const uid  = cred.user.uid;

        const userLocal = {
            ...perfil, email, compras: 0,
            fechaRegistro: new Date().toISOString(), pedidos: [],
            firebaseUid: uid
        };
        localStorage.setItem('benjaminUser', JSON.stringify(userLocal));

        if (db) {
            await db.collection('usuarios').doc(uid).set({
                nombre:     perfil.nombre,
                telefono:   perfil.telefono,
                cedula:     perfil.cedula     || '',
                direccion:  perfil.direccion  || '',
                ciudad:     perfil.ciudad     || 'Quito',
                referencia: perfil.referencia || '',
                email, compras: 0, rol: 'cliente',
                fechaRegistro: new Date().toISOString()
            }, { merge: true });
        }

        if (typeof _registrarClienteEnDB === 'function') _registrarClienteEnDB(userLocal);
        return { ok: true, user: cred.user, confirmacionRequerida: false };
    } catch (e) {
        return { ok: false, error: e.message };
    }
}

async function clienteLogin(email, password) {
    const auth = getAuthSDK();
    const db   = getDB();
    if (!auth || !isSupabaseConfigured()) return { ok: false, error: 'Sin conexión' };
    try {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        const uid  = cred.user.uid;

        let perfil = JSON.parse(localStorage.getItem('benjaminUser') || 'null');
        if (!perfil || perfil.email !== email) {
            let datos = {};
            if (db) {
                const doc = await db.collection('usuarios').doc(uid).get();
                if (doc.exists) datos = doc.data();
            }
            perfil = {
                nombre:        datos.nombre     || email.split('@')[0],
                email,
                telefono:      datos.telefono   || '',
                direccion:     datos.direccion  || '',
                ciudad:        datos.ciudad     || 'Quito',
                referencia:    datos.referencia || '',
                cedula:        datos.cedula     || '',
                compras:       datos.compras    || 0,
                fechaRegistro: datos.fechaRegistro || cred.user.metadata.creationTime,
                pedidos:       [],
                firebaseUid:   uid
            };
            localStorage.setItem('benjaminUser', JSON.stringify(perfil));
        }
        return { ok: true, user: cred.user };
    } catch (e) {
        return { ok: false, error: e.message };
    }
}

async function clienteLogout() {
    const auth = getAuthSDK();
    if (auth) await auth.signOut();
    localStorage.removeItem('benjaminUser');
}

async function clienteResetPassword(email) {
    const auth = getAuthSDK();
    if (!auth || !isSupabaseConfigured()) return { ok: false };
    try {
        await auth.sendPasswordResetEmail(email);
        return { ok: true };
    } catch (e) {
        return { ok: false, error: e.message };
    }
}

function getClienteSession() {
    return JSON.parse(localStorage.getItem('benjaminUser') || 'null');
}
