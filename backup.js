/* Sichern und Wiederherstellen: Export und Import aller Daten als JSON-Datei. */
(function () {
  'use strict';
  var COLS = { sessions: 1, weights: 1, girths: 1, body: 1, food: 1, meals: 1, plan: 1 };
  var SEG = /^[A-Za-z0-9_\-.~:@+]{1,200}$/;
  var MAX = 20 * 1024 * 1024;
  var $ = function (s) { return document.querySelector(s); };
  var db = window.__localdb, pending = null;
  if (!db || !$('#bk-export')) return;

  function lastBackup() { try { return localStorage.getItem('tl-lastbackup'); } catch (e) { return null; } }
  function setLast(d) { try { localStorage.setItem('tl-lastbackup', d); } catch (e) {} }
  function today() { var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()); }
  function fmt(d) { var p = d.split('-'); return p[2] + '.' + p[1] + '.' + p[0]; }
  function msg(t, bad) { var m = $('#bk-msg'); m.textContent = t || ''; m.style.color = bad ? 'var(--err)' : ''; }

  async function info() {
    var n = 0; try { n = await db.count(); } catch (e) {}
    var l = lastBackup(), t = n + (n === 1 ? ' Eintrag' : ' Einträge') + ' auf diesem Gerät. ';
    if (l) {
      var days = Math.round((Date.parse(today()) - Date.parse(l)) / 86400000);
      t += 'Letztes Backup: ' + fmt(l) + (days > 14 ? ' (länger als 2 Wochen her, bitte neu sichern).' : '.');
    } else t += n ? 'Noch kein Backup gespeichert, bitte sichere deine Daten.' : 'Noch kein Backup gespeichert.';
    t += ' Das Backup ist eine Datei, die du dir selbst ablegst, zum Beispiel bei den Downloads.';
    $('#bk-info').textContent = t;
  }

  function reset() {
    pending = null; $('#bk-import').textContent = 'Backup einspielen'; $('#bk-cancel').hidden = true; $('#bk-file').value = '';
  }

  $('#bk-export').addEventListener('click', async function () {
    try {
      var docs = await db.exportAll();
      var out = { app: 'trainingslog', format: 1, exportedAt: new Date().toISOString(), docs: docs };
      var blob = new Blob([JSON.stringify(out)], { type: 'application/json' });
      var a = document.createElement('a'), u = URL.createObjectURL(blob);
      a.href = u; a.download = 'trainingslog-backup-' + today() + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(u); }, 10000);
      setLast(today()); msg(Object.keys(docs).length + ' Einträge gespeichert in ' + a.download + '.'); info();
    } catch (e) { msg('Backup fehlgeschlagen.', true); }
  });

  $('#bk-import').addEventListener('click', async function () {
    if (!pending) { msg(''); $('#bk-file').click(); return; }
    try {
      var n = await db.importDocs(pending);
      reset(); msg(n + ' Einträge eingespielt.'); info();
    } catch (e) { reset(); msg('Einspielen fehlgeschlagen. Es wurde nichts geändert.', true); }
  });
  $('#bk-cancel').addEventListener('click', function () { reset(); msg('Abgebrochen. Es wurde nichts geändert.'); });

  $('#bk-file').addEventListener('change', async function (ev) {
    var f = ev.target.files && ev.target.files[0];
    if (!f) return;
    if (f.size > MAX) { reset(); msg('Datei ist zu groß.', true); return; }
    try {
      var data = JSON.parse(await f.text());
      if (!data || data.app !== 'trainingslog' || !data.docs || typeof data.docs !== 'object' || Array.isArray(data.docs)) throw new Error('format');
      var keys = Object.keys(data.docs), clean = {};
      keys.forEach(function (k) {
        var p = k.split('/'), v = data.docs[k];
        if (p.length !== 2 || !COLS[p[0]] || !SEG.test(p[1]) || !v || typeof v !== 'object' || Array.isArray(v)) throw new Error('eintrag');
        clean[k] = v;
      });
      if (!keys.length) throw new Error('leer');
      var cur = await db.exportAll(), over = keys.filter(function (k) { return cur[k] !== undefined; }).length;
      pending = clean;
      $('#bk-import').textContent = 'Jetzt einspielen (' + keys.length + ')';
      $('#bk-cancel').hidden = false;
      msg(keys.length + ' Einträge gefunden, davon ' + over + ' vorhandene, die überschrieben werden. Andere Einträge bleiben erhalten. Tippe auf Jetzt einspielen, um zu bestätigen.');
    } catch (e) { reset(); msg('Das ist keine gültige Backup-Datei dieser App.', true); }
  });

  db.ready().then(info, function () {});
})();
