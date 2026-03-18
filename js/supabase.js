// ========================================
// SUPABASE — BASE DE DATOS EN LA NUBE
// Mueblería y Cerrajería "Benjamín"
// ========================================

// 🔧 REEMPLAZA ESTOS VALORES CON LOS TUYOS
// Los encuentras en: Supabase → Tu proyecto → Settings → API
const SUPABASE_URL      = 'https://oyjdljacavhilwiqbyof.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ydkUIr7Qa7mnOZ9MVZk8Kg_AD6yaHg-';

// ─── Cliente ──────────────────────────────────────────────────────────────────
let _db = null;

function getDB() {
    if (_db) return _db;
    if (typeof supabase === 'undefined') { console.error('❌ SDK Supabase no cargado'); return null; }
    _db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return _db;
}

function isSupabaseConfigured() {
    return !SUPABASE_URL.includes('TU_PROYECTO') && !SUPABASE_ANON_KEY.includes('TU_ANON_KEY');
}

// ─── Indicador de conexión ─────────────────────────────────────────────────────
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
// NOTAS DE VENTA — CRUD ASYNC
// ========================================

async function dbGetNotas() {
    const db = getDB();
    if (!db || !isSupabaseConfigured()) return _notasLocal();

    try {
        mostrarEstadoSync('loading');
        const { data, error } = await db
            .from('notas_venta')
            .select('*')
            .order('secuencial', { ascending: false });
        if (error) throw error;
        localStorage.setItem('notasVenta', JSON.stringify(data));
        mostrarEstadoSync('ok');
        return data;
    } catch (e) {
        console.warn('Supabase offline:', e.message);
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
        const payload = _notaToRow(nota);
        const { data, error } = await db.from('notas_venta').upsert([payload], { onConflict: 'id' }).select().single();
        if (error) throw error;
        mostrarEstadoSync('ok');
        return data;
    } catch (e) {
        console.warn('Error guardando nota en Supabase:', e.message);
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
        const { error } = await db.from('notas_venta')
            .update(_notaToRow({ ...notas[idx], ...updates }))
            .eq('id', id);
        if (error) throw error;
        mostrarEstadoSync('ok');
        return true;
    } catch (e) {
        console.warn('Error actualizando nota en Supabase:', e.message);
        mostrarEstadoSync('error');
        return false;
    }
}

async function dbDeleteNota(id) {
    // Local
    localStorage.setItem('notasVenta', JSON.stringify(_notasLocal().filter(n => n.id !== id)));

    const db = getDB();
    if (!db || !isSupabaseConfigured()) return true;

    try {
        const { error } = await db.from('notas_venta').delete().eq('id', id);
        if (error) throw error;
        mostrarEstadoSync('ok');
        return true;
    } catch (e) {
        console.warn('Error eliminando nota en Supabase:', e.message);
        mostrarEstadoSync('error');
        return false;
    }
}

// ========================================
// PRODUCTOS — CRUD ASYNC
// ========================================

async function dbGetProductos() {
    const db = getDB();
    if (!db || !isSupabaseConfigured()) return _productosLocal();

    try {
        const { data, error } = await db
            .from('productos_catalogo')
            .select('*')
            .eq('activo', true)
            .order('id');
        if (error) throw error;

        const grouped = { muebleriaInterior: [], muebleriaExterior: [], cerrajeriaExterior: [] };
        data.forEach(p => {
            if (grouped[p.categoria]) {
                grouped[p.categoria].push({
                    id:          p.id,
                    nombre:      p.nombre,
                    precio:      p.precio,
                    imagen:      p.imagen  || '📦',
                    descripcion: p.descripcion,
                    categoria:   p.categoria_label || p.categoria,
                    colores:     Array.isArray(p.colores)    ? p.colores    : [],
                    acabados:    Array.isArray(p.acabados)   ? p.acabados   : [],
                    materiales:  Array.isArray(p.materiales) ? p.materiales : []
                });
            }
        });
        localStorage.setItem('productosCustom', JSON.stringify(grouped));
        return grouped;
    } catch (e) {
        console.warn('Supabase offline, usando catálogo local:', e.message);
        return _productosLocal();
    }
}

async function dbAddProducto(categoria, producto) {
    // Local
    const cat  = _productosLocal();
    const maxId = (cat[categoria] || []).reduce((mx, p) => Math.max(mx, Number(p.id) || 0), 0);
    const nuevo = { ...producto, id: maxId + 1, categoria };
    (cat[categoria] = cat[categoria] || []).push(nuevo);
    localStorage.setItem('productosCustom', JSON.stringify(cat));

    const db = getDB();
    if (!db || !isSupabaseConfigured()) { mostrarEstadoSync('error'); return nuevo; }

    try {
        const { data, error } = await db.from('productos_catalogo').insert([{
            categoria,
            categoria_label: producto.categoria,
            nombre:      producto.nombre,
            precio:      producto.precio,
            imagen:      producto.imagen      || '📦',
            descripcion: producto.descripcion || '',
            colores:     producto.colores     || [],
            acabados:    producto.acabados    || [],
            materiales:  producto.materiales  || [],
            activo:      true
        }]).select().single();
        if (error) throw error;
        mostrarEstadoSync('ok');
        // Actualizar ID local con el de Supabase
        nuevo.id = data.id;
        return data;
    } catch (e) {
        console.warn('Error guardando producto en Supabase:', e.message);
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
        const { error } = await db.from('productos_catalogo').update({
            nombre:      updates.nombre,
            precio:      updates.precio,
            imagen:      updates.imagen,
            descripcion: updates.descripcion,
            colores:     updates.colores,
            acabados:    updates.acabados,
            materiales:  updates.materiales
        }).eq('id', id);
        if (error) throw error;
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
        // Soft delete
        const { error } = await db.from('productos_catalogo').update({ activo: false }).eq('id', id);
        if (error) throw error;
        mostrarEstadoSync('ok');
        return true;
    } catch (e) {
        console.warn('Error eliminando producto:', e.message);
        mostrarEstadoSync('error');
        return false;
    }
}

// ========================================
// SINCRONIZACIÓN INICIAL (app load)
// ========================================

async function sincronizarDesdeSupabase() {
    if (!isSupabaseConfigured()) return;
    try {
        await Promise.all([dbGetNotas(), dbGetProductos()]);
        console.log('✅ Sync Supabase completado');
    } catch (e) {
        console.warn('⚠️ Error en sync inicial:', e);
    }
}

// ========================================
// MIGRACIÓN: localStorage → Supabase
// ========================================

async function migrarDatosLocalesASupabase() {
    const db = getDB();
    if (!db || !isSupabaseConfigured()) {
        showNotification('⚠️ Configura las credenciales de Supabase primero', 'error');
        return;
    }

    showNotification('Iniciando migración de datos locales...', 'info');
    let ok = 0, fail = 0;

    // — Notas —
    const notasLocales = _notasLocal();
    if (notasLocales.length > 0) {
        try {
            const rows = notasLocales.map(_notaToRow);
            const { error } = await db.from('notas_venta').upsert(rows, { onConflict: 'id' });
            if (error) throw error;
            ok += notasLocales.length;
        } catch (e) {
            console.error('Error migrando notas:', e);
            fail++;
        }
    }

    // — Productos custom —
    const prodsLocal = _productosLocal();
    const todosProds = [];
    Object.entries(prodsLocal).forEach(([cat, prods]) => {
        (prods || []).forEach(p => todosProds.push({
            id:              p.id,
            categoria:       cat,
            categoria_label: p.categoria || cat,
            nombre:          p.nombre,
            precio:          p.precio,
            imagen:          p.imagen      || '📦',
            descripcion:     p.descripcion || '',
            colores:         p.colores     || [],
            acabados:        p.acabados    || [],
            materiales:      p.materiales  || [],
            activo:          true
        }));
    });
    if (todosProds.length > 0) {
        try {
            const { error } = await db.from('productos_catalogo').upsert(todosProds, { onConflict: 'id' });
            if (error) throw error;
            ok += todosProds.length;
        } catch (e) {
            console.error('Error migrando productos:', e);
            fail++;
        }
    }

    if (fail === 0) {
        showNotification(`✅ Migración completa: ${ok} registros subidos a Supabase`, 'success');
    } else {
        showNotification(`⚠️ Migración parcial: ${ok} OK, ${fail} con errores (ver consola)`, 'error');
    }
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

// Normaliza un objeto nota al formato de columnas de Supabase
function _notaToRow(nota) {
    return {
        id:                    nota.id,
        numero_nota:           nota.numeroNota           || nota.numero_nota,
        secuencial:            nota.secuencial,
        fecha:                 nota.fecha,
        fecha_emision:         nota.fechaEmision         || nota.fecha_emision,
        cliente:               nota.cliente,
        items:                 nota.items,
        subtotal:              nota.subtotal,
        descuento:             nota.descuento            || 0,
        total:                 nota.total,
        estado:                nota.estado,
        observaciones:         nota.observaciones        || null,
        monto_pagado:          nota.montoPagado          || nota.monto_pagado || 0,
        regimen:               nota.regimen              || 'RIMPE - Negocio Popular',
        ultima_actualizacion:  nota.ultimaActualizacion  || nota.ultima_actualizacion || null
    };
}

// ========================================
// AUTENTICACIÓN — Supabase Auth
// Reemplaza completamente el sistema de
// usuario/contraseña hardcodeado.
// ========================================

// Cache de sesión en memoria (se pierde al recargar, Supabase lo restaura solo)
let _currentSession = null;
let _authStateListeners = [];

// ─── Inicializar listener de sesión ───────────────────────────────────────────
// Llamar una sola vez al cargar la app (initApp en main.js)
async function initSupabaseAuth() {
    const db = getDB();
    if (!db || !isSupabaseConfigured()) return;

    // Restaurar sesión existente (cookie/localStorage de Supabase)
    const { data: { session } } = await db.auth.getSession();
    _currentSession = session;

    // Escuchar cambios de sesión (login / logout / token refresh)
    db.auth.onAuthStateChange((event, session) => {
        _currentSession = session;
        if (event === 'SIGNED_IN') {
            _notifyAuthListeners('signed_in', session);
        } else if (event === 'SIGNED_OUT') {
            _notifyAuthListeners('signed_out', null);
        } else if (event === 'TOKEN_REFRESHED') {
            console.log('🔄 Token Supabase renovado automáticamente');
        }
    });
}

function _notifyAuthListeners(event, session) {
    _authStateListeners.forEach(fn => { try { fn(event, session); } catch(e) {} });
}

function onAuthChange(fn) {
    _authStateListeners.push(fn);
}

// ─── Login con email + contraseña ─────────────────────────────────────────────
async function supabaseLogin(email, password) {
    const db = getDB();
    if (!db || !isSupabaseConfigured()) {
        return { ok: false, error: 'Supabase no configurado' };
    }
    try {
        const { data, error } = await db.auth.signInWithPassword({ email, password });
        if (error) return { ok: false, error: error.message };
        _currentSession = data.session;
        return { ok: true, user: data.user };
    } catch (e) {
        return { ok: false, error: e.message };
    }
}

// ─── Logout ───────────────────────────────────────────────────────────────────
async function supabaseLogout() {
    const db = getDB();
    if (db && isSupabaseConfigured()) {
        await db.auth.signOut();
    }
    _currentSession = null;
}

// ─── ¿Está autenticado? ───────────────────────────────────────────────────────
// Devuelve true si hay sesión activa de Supabase Auth
function isAdminAuthenticated() {
    return _currentSession !== null && _currentSession.user !== null;
}

// ─── Obtener usuario actual ───────────────────────────────────────────────────
function getAdminUser() {
    return _currentSession?.user || null;
}

// ─── Recuperar contraseña ─────────────────────────────────────────────────────
async function supabaseResetPassword(email) {
    const db = getDB();
    if (!db || !isSupabaseConfigured()) return { ok: false };
    const { error } = await db.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
    });
    return { ok: !error, error: error?.message };
}