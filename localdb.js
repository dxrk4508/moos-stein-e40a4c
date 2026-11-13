/* Lokale Datenschicht: gleiche Schnittstelle wie die Artifact-Datenbank
   (collection/doc, onSnapshot, set/update/delete), gespeichert in IndexedDB auf diesem Gerät.
   Es gibt hier keinen Netzwerkzugriff. */
(function () {
  'use strict';
  var DB_NAME = 'trainingslog', STORE = 'docs';
  var SEG = /^[A-Za-z0-9_\-.~:@+]{1,200}$/;
  var BAD = { '__proto__': 1, 'constructor': 1, 'prototype': 1 };
  var cache = Object.create(null);   // "sammlung/id" -> Daten
  var listeners = [];
  var idb = null, opening = null;

  function clone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }
  function splitPath(p) {
    var parts = String(p).split('/');
    if (parts.length !== 2 || !SEG.test(parts[0]) || !SEG.test(parts[1])) throw new Error('Ungültiger Pfad');
    return parts;
  }

  function open() {
    if (opening) return opening;
    opening = new Promise(function (resolve, reject) {
      if (!window.indexedDB) { reject(new Error('IndexedDB nicht verfügbar')); return; }
      var req;
      try { req = indexedDB.open(DB_NAME, 1); } catch (e) { reject(e); return; }
      req.onupgradeneeded = function () { req.result.createObjectStore(STORE); };
      req.onerror = function () { reject(req.error || new Error('IndexedDB-Fehler')); };
      req.onblocked = function () { reject(new Error('IndexedDB blockiert')); };
      req.onsuccess = function () {
        idb = req.result;
        idb.onversionchange = function () { idb.close(); };
        var tx = idb.transaction(STORE, 'readonly'), st = tx.objectStore(STORE), cur = st.openCursor();
        cur.onsuccess = function () {
          var c = cur.result;
          if (c) { cache[c.key] = c.value; c.continue(); }
        };
        tx.oncomplete = function () { resolve(); };
        tx.onerror = tx.onabort = function () { reject(tx.error || new Error('Lesefehler')); };
      };
    });
    opening.catch(function () { opening = null; });
    return opening;
  }

  function persist(ops) {   // ops: [{key, value|undefined}]
    return new Promise(function (resolve, reject) {
      var tx = idb.transaction(STORE, 'readwrite'), st = tx.objectStore(STORE);
      ops.forEach(function (o) { if (o.value === undefined) st.delete(o.key); else st.put(o.value, o.key); });
      tx.oncomplete = function () { resolve(); };
      tx.onerror = tx.onabort = function () { reject(tx.error || new Error('Schreibfehler')); };
    });
  }

  function colSnap(col) {
    var docs = [], pre = col + '/';
    Object.keys(cache).sort().forEach(function (k) {
      if (k.indexOf(pre) === 0) {
        var id = k.slice(pre.length), v = cache[k];
        docs.push({ id: id, exists: true, data: function () { return clone(v); } });
      }
    });
    return { docs: docs, size: docs.length, empty: !docs.length, metadata: { fromCache: false, hasPendingWrites: false } };
  }
  function docSnap(path) {
    var v = cache[path], id = path.split('/')[1];
    return { id: id, exists: v !== undefined, data: function () { return clone(v); }, metadata: { fromCache: false, hasPendingWrites: false } };
  }
  function fire(l) {
    try { l.cb(l.type === 'col' ? colSnap(l.path) : docSnap(l.path)); } catch (e) { if (window.console) console.error(e); }
  }
  function notify(paths) {
    var cols = {}, docs = {};
    paths.forEach(function (p) { docs[p] = 1; cols[p.split('/')[0]] = 1; });
    listeners.slice().forEach(function (l) {
      if ((l.type === 'col' && cols[l.path]) || (l.type === 'doc' && docs[l.path])) fire(l);
    });
  }

  function deepMerge(base, over) {
    var out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
    Object.keys(over).forEach(function (k) {
      if (BAD[k]) return;
      var o = over[k];
      if (o && typeof o === 'object' && o.__delete__ === true && Object.keys(o).length === 1) { delete out[k]; return; }
      if (o && typeof o === 'object' && !Array.isArray(o) && out[k] && typeof out[k] === 'object' && !Array.isArray(out[k])) out[k] = deepMerge(out[k], o);
      else out[k] = clone(o);
    });
    return out;
  }
  function check(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Dokument muss ein Objekt sein');
    var s = JSON.stringify(data);
    if (s.length > 1000000) throw new Error('Dokument zu groß');
  }

  async function write(ops) {   // ops: [{path, value|undefined}], atomar
    await open();
    var before = ops.map(function (o) { return cache[o.path]; });
    ops.forEach(function (o) { if (o.value === undefined) delete cache[o.path]; else cache[o.path] = o.value; });
    try {
      await persist(ops.map(function (o) { return { key: o.path, value: o.value }; }));
    } catch (e) {
      ops.forEach(function (o, i) { if (before[i] === undefined) delete cache[o.path]; else cache[o.path] = before[i]; });
      throw e;
    }
    notify(ops.map(function (o) { return o.path; }));
  }

  var api = {
    collection: function (name) {
      if (!SEG.test(String(name))) throw new Error('Ungültiger Sammlungsname');
      return {
        onSnapshot: function (cb, errCb) {
          var l = { type: 'col', path: name, cb: cb }; listeners.push(l);
          open().then(function () { if (listeners.indexOf(l) >= 0) fire(l); }, function (e) { if (errCb) errCb(e); });
          return function () { var i = listeners.indexOf(l); if (i >= 0) listeners.splice(i, 1); };
        }
      };
    },
    doc: function (path) {
      splitPath(path);
      return {
        onSnapshot: function (cb, errCb) {
          var l = { type: 'doc', path: path, cb: cb }; listeners.push(l);
          open().then(function () { if (listeners.indexOf(l) >= 0) fire(l); }, function (e) { if (errCb) errCb(e); });
          return function () { var i = listeners.indexOf(l); if (i >= 0) listeners.splice(i, 1); };
        },
        set: async function (data) { check(data); await write([{ path: path, value: clone(data) }]); },
        update: async function (patch) {
          check(patch); await open();
          await write([{ path: path, value: deepMerge(cache[path] || {}, patch) }]);
        },
        delete: async function () { await write([{ path: path, value: undefined }]); }
      };
    }
  };

  // Hilfen für Sichern und Wiederherstellen
  window.__localdb = {
    ready: function () { return open(); },
    exportAll: async function () {
      await open();
      var docs = {};
      Object.keys(cache).sort().forEach(function (k) { docs[k] = clone(cache[k]); });
      return docs;
    },
    importDocs: async function (docs) {   // überschreibt Dokumente mit gleicher ID, lässt andere unberührt
      var ops = [];
      Object.keys(docs).forEach(function (k) {
        splitPath(k); check(docs[k]);
        ops.push({ path: k, value: clone(docs[k]) });
      });
      if (ops.length) await write(ops);
      return ops.length;
    },
    count: async function () { await open(); return Object.keys(cache).length; },
    requestPersistence: async function () {
      try { return navigator.storage && navigator.storage.persist ? await navigator.storage.persist() : false; } catch (e) { return false; }
    }
  };

  // Die App fragt die Datenbank über window.claude.use('db') an. Hier kommt sie lokal.
  window.claude = {
    use: async function (name) {
      if (name !== 'db') throw new Error('Nicht verfügbar');
      await open();
      return api;
    }
  };
})();
