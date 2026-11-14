/* Programm einlesen: liest eine Excel-Datei (.xlsx) direkt auf dem Gerät.
   Es gibt keine Bibliothek und keinen Netzwerkzugriff. Die Datei wird nur gelesen und nirgends hochgeladen.
   Unterstützt wird das Layout "Pure Bodybuilding PPL": Wochen-Tabellen mit Tagen, Übungen und Ersatzübungen. */
(function () {
  'use strict';
  var MAX_ZIP = 25 * 1024 * 1024, MAX_PART = 40 * 1024 * 1024, MAX_ROWS = 8000, MAX_COLS = 60;

  function fail(msg) { var e = new Error(msg); e.user = true; return e; }

  // ---------- ZIP ----------
  async function inflateRaw(bytes, maxOut) {
    if (typeof DecompressionStream !== 'function') throw fail('Dieser Browser kann die Datei nicht entpacken. Bitte Chrome aktualisieren.');
    var rd = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw')).getReader();
    var chunks = [], total = 0;
    for (;;) {
      var r = await rd.read();
      if (r.done) break;
      total += r.value.length;
      if (total > maxOut) { try { rd.cancel(); } catch (e) {} throw fail('Die Datei ist ungewöhnlich groß und wurde nicht gelesen.'); }
      chunks.push(r.value);
    }
    var out = new Uint8Array(total), o = 0;
    chunks.forEach(function (c) { out.set(c, o); o += c.length; });
    return out;
  }
  function readZip(buf) {
    if (buf.byteLength > MAX_ZIP) throw fail('Die Datei ist zu groß.');
    var dv = new DataView(buf), u8 = new Uint8Array(buf), n = buf.byteLength, eocd = -1;
    for (var i = n - 22; i >= Math.max(0, n - 22 - 65535); i--) { if (dv.getUint32(i, true) === 0x06054b50) { eocd = i; break; } }
    if (eocd < 0) throw fail('Das ist keine Excel-Datei (.xlsx).');
    var count = dv.getUint16(eocd + 10, true), cdOff = dv.getUint32(eocd + 16, true), entries = {}, p = cdOff, dec = new TextDecoder();
    if (count > 2000) throw fail('Die Datei hat ungewöhnlich viele Teile.');
    for (var k = 0; k < count; k++) {
      if (p + 46 > n || dv.getUint32(p, true) !== 0x02014b50) throw fail('Die Datei ist beschädigt.');
      var flags = dv.getUint16(p + 8, true), method = dv.getUint16(p + 10, true), csize = dv.getUint32(p + 20, true), usize = dv.getUint32(p + 24, true);
      var nl = dv.getUint16(p + 28, true), el = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), lo = dv.getUint32(p + 42, true);
      var name = dec.decode(u8.subarray(p + 46, p + 46 + nl));
      entries[name] = { flags: flags, method: method, csize: csize, usize: usize, lo: lo };
      p += 46 + nl + el + cl;
    }
    return {
      has: function (name) { return !!entries[name]; },
      names: function () { return Object.keys(entries); },
      read: async function (name) {
        var e = entries[name];
        if (!e) return null;
        if (e.flags & 1) throw fail('Die Datei ist verschlüsselt.');
        if (e.csize === 0xFFFFFFFF || e.usize === 0xFFFFFFFF) throw fail('Dieses Dateiformat wird nicht unterstützt.');
        if (e.usize > MAX_PART) throw fail('Ein Teil der Datei ist zu groß.');
        if (e.lo + 30 > n || dv.getUint32(e.lo, true) !== 0x04034b50) throw fail('Die Datei ist beschädigt.');
        var start = e.lo + 30 + dv.getUint16(e.lo + 26, true) + dv.getUint16(e.lo + 28, true);
        if (start + e.csize > n) throw fail('Die Datei ist beschädigt.');
        var raw = u8.subarray(start, start + e.csize);
        if (e.method === 0) return raw;
        if (e.method === 8) return inflateRaw(raw, Math.min(MAX_PART, e.usize + 1024));
        throw fail('Dieses Dateiformat wird nicht unterstützt.');
      }
    };
  }

  // ---------- XML ----------
  function parseXml(bytes) {
    var doc = new DOMParser().parseFromString(new TextDecoder('utf-8').decode(bytes), 'application/xml');
    if (doc.getElementsByTagName('parsererror').length) throw fail('Die Datei ist beschädigt.');
    return doc;
  }
  function all(node, name) { return Array.prototype.slice.call(node.getElementsByTagNameNS('*', name)); }
  function textOf(si) {   // Text einer Zeichenkette, ohne Lautschrift-Zusätze
    var out = '';
    all(si, 't').forEach(function (t) { if (!t.parentNode || t.parentNode.localName !== 'rPh') out += t.textContent; });
    return out;
  }
  function colNum(letters) { var n = 0; for (var i = 0; i < letters.length; i++) n = n * 26 + (letters.charCodeAt(i) - 64); return n; }

  var BUILTIN_DATE = { 14:1, 15:1, 16:1, 17:1, 18:1, 19:1, 20:1, 21:1, 22:1, 45:1, 46:1, 47:1 };
  function isDateCode(code) {
    var c = String(code).replace(/"[^"]*"/g, '').replace(/\[[^\]]*\]/g, '').replace(/\\./g, '');
    return /[dmyhs]/i.test(c) && !/^(general|@)$/i.test(c.trim());
  }
  function dateStyles(doc) {
    var fm = {}, styles = [];
    if (!doc) return styles;
    all(doc, 'numFmt').forEach(function (f) { fm[f.getAttribute('numFmtId')] = f.getAttribute('formatCode') || ''; });
    var xfs = all(doc, 'cellXfs')[0];
    if (!xfs) return styles;
    all(xfs, 'xf').forEach(function (x, i) {
      var id = x.getAttribute('numFmtId');
      styles[i] = !!(BUILTIN_DATE[id] || (fm[id] != null && isDateCode(fm[id])));
    });
    return styles;
  }
  function clean(s, max) {
    return String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/\r\n?/g, '\n').trim().slice(0, max || 400);
  }

  async function readSheets(zip) {
    var shared = [], sst = await zip.read('xl/sharedStrings.xml');
    if (sst) shared = all(parseXml(sst), 'si').map(textOf);
    var stx = await zip.read('xl/styles.xml'), isDate = dateStyles(stx ? parseXml(stx) : null);
    var wb = await zip.read('xl/workbook.xml');
    if (!wb) throw fail('Das ist keine Excel-Datei (.xlsx).');
    var rels = {}, relx = await zip.read('xl/_rels/workbook.xml.rels');
    if (relx) all(parseXml(relx), 'Relationship').forEach(function (r) { rels[r.getAttribute('Id')] = r.getAttribute('Target'); });
    var sheets = [];
    for (var s of all(parseXml(wb), 'sheet')) {
      var rid = s.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships', 'id') || s.getAttribute('r:id');
      var t = rels[rid]; if (!t) continue;
      var path = t.charAt(0) === '/' ? t.slice(1) : 'xl/' + t.replace(/^\.\//, '');
      var bytes = await zip.read(path);
      if (!bytes) continue;
      sheets.push({ name: s.getAttribute('name') || '', cells: readCells(parseXml(bytes), shared, isDate) });
    }
    return sheets;
  }
  function readCells(doc, shared, isDate) {
    var rows = {}, nrows = 0;
    all(doc, 'c').forEach(function (c) {
      var m = /^([A-Z]{1,3})(\d{1,6})$/.exec(c.getAttribute('r') || '');
      if (!m) return;
      var col = colNum(m[1]), row = +m[2];
      if (col > MAX_COLS || row > MAX_ROWS) return;
      var t = c.getAttribute('t'), vEl = all(c, 'v')[0], v = vEl ? vEl.textContent : null, val = null;
      if (t === 'inlineStr') { var is = all(c, 'is')[0]; val = is ? textOf(is) : ''; }
      else if (v == null) return;
      else if (t === 's') val = shared[+v] != null ? shared[+v] : '';
      else if (t === 'str') val = v;
      else if (t === 'b' || t === 'e') return;
      else {
        var num = parseFloat(v);
        if (!isFinite(num)) return;
        if (isDate[+(c.getAttribute('s') || 0)]) {
          // Excel hat Eingaben wie "2-3" als Datum gespeichert. Monat und Tag ergeben den ursprünglichen Text zurück.
          var d = new Date(Date.UTC(1899, 11, 30) + Math.round(num) * 86400000);
          val = (d.getUTCMonth() + 1) + '-' + d.getUTCDate();
        } else val = String(parseFloat(num.toFixed(6)));
      }
      if (!rows[row]) { rows[row] = {}; nrows++; }
      rows[row][col] = clean(val, 2000);
    });
    return rows;
  }

  // ---------- Programm erkennen ----------
  var GROUP = { pull: 'pull', push: 'push', leg: 'leg', legs: 'leg', arms: 'weak' };
  function slug(s) {
    return String(s).toLowerCase().replace(/^[a-z]\d:\s*/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70) || 'uebung';
  }
  function g(rows, r, c) { var x = rows[r] && rows[r][c]; return x == null ? '' : String(x); }
  function stripNum(s) { return s.replace(/^\s*\d+\.\s*/, '').trim(); }

  function findCols(rows, r) {
    var map = { name: 2, tech: 3, warm: 4, sets: 5, reps: 6, erpe: 11, lrpe: 12, rest: 13, s1: 14, s2: 15, note: 16 }, hdr = rows[r] || {};
    Object.keys(hdr).forEach(function (c) {
      var t = String(hdr[c]).toLowerCase();
      if (t.indexOf('intensity technique') >= 0) map.tech = +c;
      else if (t.indexOf('warm') >= 0) map.warm = +c;
      else if (t.indexOf('working sets') >= 0) map.sets = +c;
      else if (t === 'reps') map.reps = +c;
      else if (t.indexOf('early') >= 0) map.erpe = +c;
      else if (t.indexOf('last set rpe') >= 0) map.lrpe = +c;
      else if (t === 'rest') map.rest = +c;
      else if (t.indexOf('substitution option 1') >= 0) map.s1 = +c;
      else if (t.indexOf('substitution option 2') >= 0) map.s2 = +c;
      else if (t === 'notes' || t === 'note') map.note = +c;
    });
    return map;
  }
  function warmCount(raw) {
    var m = /(\d+)\s*-\s*(\d+)/.exec(raw);
    var n = m ? Math.max(+m[1], +m[2]) : parseInt(raw, 10);
    return isFinite(n) ? Math.min(3, Math.max(0, n)) : 1;
  }
  function topNum(reps) {   // höchster Wert eines einfachen Bereichs wie "10-12", sonst keiner
    var m = /^(\d+)(?:\s*-\s*(\d+))?(?:\s*sec(?:onds?)?(?:\s*hold)?)?$/i.exec(reps.trim());
    return m ? +(m[2] || m[1]) : null;
  }

  function parseWeakTable(rows, from, to) {
    var out = [], cur = null;
    for (var r = from; r < to; r++) {
      var m = g(rows, r, 5).trim();
      if (m) { cur = { m: clean(m, 60), o1: [], o2: [] }; out.push(cur); }
      if (!cur) continue;
      [[6, 'o1'], [12, 'o2']].forEach(function (p) {
        var t = g(rows, r, p[0]);
        if (/^\s*\d+\.\s*\S/.test(t)) cur[p[1]].push(clean(stripNum(t), 120));
      });
    }
    return out.filter(function (x) { return x.o1.length || x.o2.length; });
  }

  function parseSheet(rows) {
    var rowNums = Object.keys(rows).map(Number).sort(function (a, b) { return a - b; });
    if (!rowNums.length) return null;
    var weakFrom = null, firstBlock = null;
    rowNums.forEach(function (r) {
      var a = g(rows, r, 1);
      if (weakFrom == null && /weak points? table/i.test(a)) weakFrom = r + 1;
      if (firstBlock == null && /^block\s*\d/i.test(a)) firstBlock = r;
    });
    var dayPat = /^(pull|push|legs?|arms)\b.*?#\s*(\d+)\s*(?:\(([^)]*)\))?/i;
    var weeks = {}, blocks = [], wnotes = {}, daysMeta = {}, dayOrder = [], cols = null, curW = null, curD = null, banner = '', bi = -1, title = '';
    rowNums.forEach(function (r) {
      var a = g(rows, r, 1).replace(/\s+/g, ' ').trim(), b = g(rows, r, 2).trim();
      if (r === 1 || (!title && /pure bodybuilding|program/i.test(a) && r < 5)) title = title || clean(a, 120);
      if (/^block\s*\d/i.test(a)) { blocks.push({ name: clean(a, 80), weeks: [] }); bi = blocks.length - 1; return; }
      var wm = /^week\s*(\d+)$/i.exec(a);
      if (wm && /^exercise$/i.test(b)) {
        curW = +wm[1]; curD = null; cols = findCols(rows, r);
        if (!weeks[curW]) {
          weeks[curW] = { week: curW, block: bi >= 0 ? bi + 1 : 1, days: {} };
          if (bi >= 0) blocks[bi].weeks.push(curW);
        }
        if (banner && !wnotes[curW]) wnotes[curW] = banner;
        banner = '';
        return;
      }
      if (!curW) return;
      if (a) {
        var dm = dayPat.exec(a);
        if (dm) {
          var gr = GROUP[dm[1].toLowerCase()], num = +dm[2], id = gr + '-' + num;
          curD = id;
          if (!weeks[curW].days[id]) weeks[curW].days[id] = [];
          if (!daysMeta[id]) {
            var nm = dm[1].toLowerCase() === 'arms' ? 'Arms & Weak Points #' + num : (gr === 'leg' ? 'Legs' : dm[1][0].toUpperCase() + dm[1].slice(1).toLowerCase()) + ' #' + num;
            daysMeta[id] = { id: id, group: gr, name: nm, focus: clean(dm[3] || '', 60) };
            dayOrder.push(id);
          }
        } else if (/rest day/i.test(a)) { curD = null; return; }
        else { banner = clean(a, 300); if (!b) return; }
      }
      if (!curD || !b || /^exercise$/i.test(b)) return;
      var list = weeks[curW].days[curD];
      if (list.length >= 30) return;
      var wp = /^weak point exercise\s*(\d)/i.exec(b);
      var warmRaw = g(rows, r, cols.warm), reps = clean(g(rows, r, cols.reps), 40), tech = clean(g(rows, r, cols.tech), 160);
      var ex = {
        n: clean(b, 120), warm: warmCount(warmRaw), sets: clean(g(rows, r, cols.sets), 10), reps: reps,
        erpe: clean(g(rows, r, cols.erpe), 12), lrpe: clean(g(rows, r, cols.lrpe), 12), rest: clean(g(rows, r, cols.rest), 24)
      };
      if (tech && !/^n\/?a$|^[-–]+$/i.test(tech)) ex.tech = tech;
      var note = clean(g(rows, r, cols.note), 600);
      if (note) ex.note = note;
      if (wp) ex.wp = +wp[1];
      else {
        var s1 = clean(g(rows, r, cols.s1), 120), s2 = clean(g(rows, r, cols.s2), 120);
        if (s1 || s2) ex.subs = [s1, s2].filter(Boolean);
      }
      var hi = topNum(reps); if (hi != null) ex.hi = hi;
      if (/sec/i.test(reps)) ex.time = 1;
      list.push(ex);
    });
    var wnums = Object.keys(weeks).map(Number).sort(function (a, b) { return a - b; });
    var count = 0; wnums.forEach(function (w) { Object.keys(weeks[w].days).forEach(function (d) { count += weeks[w].days[d].length; }); });
    if (!wnums.length || dayOrder.length < 2 || count < 10) return null;
    var wp = weakFrom != null ? parseWeakTable(rows, weakFrom, firstBlock || weakFrom) : [];
    return { title: title, blocks: blocks, weeks: weeks, wnums: wnums, days: dayOrder.map(function (id) { return daysMeta[id]; }), wnotes: wnotes, wp: wp, count: count };
  }

  // Aus dem Ergebnis die Dokumente für die Speicherung bauen: program/meta und program/wNN
  function toDocs(p) {
    var docs = {};
    docs['program/meta'] = {
      format: 1, title: p.title, importedAt: Date.now(), weeks: p.wnums, blocks: p.blocks, days: p.days, wnotes: p.wnotes, wp: p.wp
    };
    p.wnums.forEach(function (w) {
      var wk = p.weeks[w], days = {};
      Object.keys(wk.days).forEach(function (d) { days[d] = { ex: wk.days[d] }; });
      docs['program/w' + (w < 10 ? '0' : '') + w] = { week: w, block: wk.block, days: days };
    });
    return docs;
  }

  async function parseProgram(buf) {
    var zip = readZip(buf), sheets = await readSheets(zip), found = null;
    for (var i = 0; i < sheets.length && !found; i++) found = parseSheet(sheets[i].cells);
    if (!found) throw fail('Dieses Programm kenne ich nicht. Unterstützt wird die Datei "Pure Bodybuilding – PPL" mit den Wochen-Tabellen.');
    return { docs: toDocs(found), weeks: found.wnums.length, days: found.days.length, exercises: found.count };
  }

  window.__xlsx = { parseProgram: parseProgram, slug: slug };
})();
