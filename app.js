(function(){
  'use strict';

  // ex = alle Übungen der Kategorie (Bibliothek), def = bisherige Standardauswahl
  var PLANS = {
    push: { name:'Push', def:['brustpresse','schulterpresse','butterfly','trizepsdruecken'], ex:[
      {k:'brustpresse',    n:'Brustpresse',        warm:1, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'schraegpresse',  n:'Schrägbank Presse',  warm:1, opt:true,  rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'schulterpresse', n:'Schulterpresse',     warm:1, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'seitheben',      n:'Seitheben',          warm:1, opt:true,  rep:'12–15', hi:15, pause:'1 Min'},
      {k:'butterfly',      n:'Butterfly',          warm:1, opt:false, rep:'12–15', hi:15, pause:'1,5 Min'},
      {k:'kabelfly',       n:'Kabelzug Fly',       warm:1, opt:true,  rep:'12–15', hi:15, pause:'1 Min'},
      {k:'trizepsdruecken',n:'Trizepsdrücken',     warm:1, opt:true,  rep:'10–12', hi:12, pause:'1 Min'},
      {k:'trizeps-overhead',n:'Trizeps über Kopf', warm:1, opt:true,  rep:'10–12', hi:12, pause:'1 Min'},
      {k:'dips',           n:'Dip Maschine',       warm:1, opt:true,  rep:'8–12',  hi:12, pause:'1,5 Min'}
    ]},
    pull: { name:'Pull', def:['latzug','rudern','bizeps-curls'], ex:[
      {k:'latzug',           n:'Latzug',                 warm:1, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'latzug-untergriff',n:'Latzug Untergriff',      warm:1, opt:true,  rep:'8–12',  hi:12, pause:'1,5 Min'},
      {k:'rudern',           n:'Rudern',                 warm:1, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'rudern-brust',     n:'Brustgestütztes Rudern', warm:1, opt:true,  rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'pullover',         n:'Pullover am Kabel',      warm:1, opt:true,  rep:'12–15', hi:15, pause:'1 Min'},
      {k:'face-pulls',       n:'Face Pulls',             warm:1, opt:true,  rep:'12–15', hi:15, pause:'1 Min'},
      {k:'reverse-butterfly',n:'Reverse Butterfly',      warm:1, opt:true,  rep:'12–15', hi:15, pause:'1 Min'},
      {k:'bizeps-curls',     n:'Bizeps Curls',           warm:1, opt:true,  rep:'10–12', hi:12, pause:'1 Min'},
      {k:'hammer-curls',     n:'Hammer Curls',           warm:1, opt:true,  rep:'10–12', hi:12, pause:'1 Min'},
      {k:'scott-curls',      n:'Scott Curls',            warm:1, opt:true,  rep:'10–12', hi:12, pause:'1 Min'}
    ]},
    leg: { name:'Leg', def:['beinpresse','bein-beuger','pendelsquats','wadenheben','plank'], ex:[
      {k:'beinpresse',  n:'Beinpresse',      warm:2, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'bein-beuger', n:'Bein Beuger',     warm:1, opt:false, rep:'10–12', hi:12, pause:'1,5 Min'},
      {k:'pendelsquats',n:'Pendulum Squats', warm:1, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'bein-strecker',n:'Bein Strecker',  warm:1, opt:true,  rep:'10–15', hi:15, pause:'1,5 Min'},
      {k:'hip-thrust',  n:'Hip Thrust',      warm:1, opt:true,  rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'ausfallschritte',n:'Ausfallschritte',warm:1,opt:true,  rep:'10–12', hi:12, pause:'1,5 Min'},
      {k:'abduktoren',  n:'Abduktoren',      warm:1, opt:true,  rep:'12–15', hi:15, pause:'1 Min'},
      {k:'adduktoren',  n:'Adduktoren',      warm:1, opt:true,  rep:'12–15', hi:15, pause:'1 Min'},
      {k:'wadenheben',  n:'Wadenheben',      warm:1, opt:false, rep:'12–15', hi:15, pause:'1 Min'},
      {k:'plank',       n:'Plank',           warm:0, opt:false, rep:'20–40 Sek.', hi:40, pause:'45–60 Sek.', time:true}
    ]},
    weak: { name:'Weakpoints', def:[], ex:[
      {k:'crunch',            n:'Bauch Crunch Maschine',     warm:0, opt:false, rep:'12–15', hi:15, pause:'1 Min'},
      {k:'beinheben',         n:'Beinheben (Captain\'s Chair)',warm:0, opt:false, rep:'10–15', hi:15, pause:'1 Min'},
      {k:'holzhacker',        n:'Kabel Holzhacker',          warm:0, opt:false, rep:'12–15', hi:15, pause:'1 Min'},
      {k:'rueckenstrecker',   n:'Rückenstrecker',            warm:1, opt:true,  rep:'10–15', hi:15, pause:'1,5 Min'},
      {k:'schulterzucken',    n:'Schulterzucken (Trapez)',   warm:1, opt:true,  rep:'10–15', hi:15, pause:'1 Min'},
      {k:'handgelenk-curls',  n:'Handgelenk Curls (Unterarme)',warm:0,opt:false,rep:'12–20', hi:20, pause:'1 Min'},
      {k:'wadenheben-sitzend',n:'Wadenheben sitzend',        warm:0, opt:false, rep:'12–20', hi:20, pause:'1 Min'}
    ]},
    // Alte Einheiten: nur noch für bestehende Trainings im Verlauf
    A: { name:'Einheit A', ex:[
      {k:'beinpresse',  n:'Beinpresse',   warm:2, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'brustpresse', n:'Brustpresse',  warm:1, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'latzug',      n:'Latzug',       warm:1, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'bein-beuger', n:'Bein Beuger',  warm:1, opt:false, rep:'10–12', hi:12, pause:'1,5 Min'},
      {k:'bizeps-curls',n:'Bizeps Curls', warm:1, opt:true,  rep:'10–12', hi:12, pause:'1 Min'},
      {k:'plank',       n:'Plank',        warm:0, opt:false, rep:'20–40 Sek.', hi:40, pause:'45–60 Sek.', time:true}
    ]},
    B: { name:'Einheit B', ex:[
      {k:'beinpresse',     n:'Beinpresse',     warm:2, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'schulterpresse', n:'Schulterpresse', warm:1, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'rudern',         n:'Rudern',         warm:1, opt:false, rep:'8–12',  hi:12, pause:'2 Min'},
      {k:'butterfly',      n:'Butterfly',      warm:1, opt:false, rep:'12–15', hi:15, pause:'1,5 Min'},
      {k:'trizepsdruecken',n:'Trizepsdrücken', warm:1, opt:true,  rep:'10–12', hi:12, pause:'1 Min'},
      {k:'wadenheben',     n:'Wadenheben',     warm:1, opt:false, rep:'12–15', hi:15, pause:'1 Min'},
      {k:'pendelsquats',   n:'Pendulum Squats',warm:1, opt:false, rep:'8–12',  hi:12, pause:'2 Min'}
    ]}
  };

  // Gruppen der Vorlage "Upper, Lower, Full Body": keine festen Übungen, die kommen aus dem eingelesenen Programm.
  PLANS.upper = {name:'Upper', ex:[]};
  PLANS.lower = {name:'Lower', ex:[]};
  PLANS.full = {name:'Full Body', ex:[]};

  var PLAN_ORDER = ['push','pull','leg'];              // Reihenfolge für den Vorschlag "Als Nächstes"
  var PICK_ORDER = ['push','pull','leg','weak'];       // Kategorien zur Auswahl
  var PLATE = {push:'PS', pull:'PL', leg:'LG', weak:'WP', upper:'UP', lower:'LO', full:'FB', A:'A', B:'B'};
  function pname(p){ return PLANS[p] ? PLANS[p].name : String(p); }
  function plate(p){ return PLATE[p] || String(p).slice(0,2).toUpperCase(); }

  var GROUPS = [
    {g:'Rumpf und Hals', cols:2, f:[{k:'chest',n:'Brust',a:'Brust'},{k:'waist',n:'Taille',a:'Taille'},{k:'hip',n:'Hüfte',a:'Hüfte'},{k:'neck',n:'Hals',a:'Hals'}]},
    {g:'Oberarm angespannt', cols:2, f:[{k:'armL',n:'Links',a:'Oberarm links'},{k:'armR',n:'Rechts',a:'Oberarm rechts'}]},
    {g:'Oberschenkel', cols:2, f:[{k:'thighL',n:'Links',a:'Oberschenkel links'},{k:'thighR',n:'Rechts',a:'Oberschenkel rechts'}]},
    {g:'Wade', cols:2, f:[{k:'calfL',n:'Links',a:'Wade links'},{k:'calfR',n:'Rechts',a:'Wade rechts'}]}
  ];
  var GNAMES = {chest:'Brust', waist:'Taille', armL:'Oberarm links', armR:'Oberarm rechts', thighL:'Oberschenkel links', thighR:'Oberschenkel rechts', hip:'Hüfte', neck:'Hals', calfL:'Wade links', calfR:'Wade rechts'};
  var GORDER = ['chest','waist','armL','armR','thighL','thighR','hip','neck','calfL','calfR'];

  var $ = function(s){ return document.querySelector(s); };

  function h(tag, attrs){
    var e = document.createElement(tag);
    var a = attrs || {};
    Object.keys(a).forEach(function(k){
      var v = a[k];
      if (v == null || v === false) return;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k.slice(0,2) === 'on') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var kids = [].concat(arguments[i]);
      kids.forEach(function(c){
        if (c == null || c === false) return;
        e.append(c.nodeType ? c : document.createTextNode(String(c)));
      });
    }
    return e;
  }
  function svg(tag, attrs){
    var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs || {}).forEach(function(k){ e.setAttribute(k, attrs[k]); });
    return e;
  }

  // ---------- state ----------
  var db = null, loaded = false, userPicked = false;
  var view = 'T', selPlan = null, histId = null, histMode = null, histPick = null;
  var confirmDel = false, confirmEnd = false, notice = '';
  var sessions = {}, pend = {}, timers = {}, inflight = {};
  var renderedKey = '', loadTimer = null;
  var weights = {}, girths = {}, profile = {};
  var wLoaded = false, gLoaded = false, pLoaded = false;
  var wEdit = null, gEdit = null, wAll = false, gAll = false, wDelArm = false, gDelArm = false;
  var sEdit = null, sAll = false, sDelArm = false;
  // Schalter: auf true setzen, um die ausgeblendeten Bereiche wieder anzuzeigen
  var SHOW_NUTRI = false, SHOW_GIRTH = false;
  var food = {}, meals = {}, planDoc = null, planChecks = {}, nDate = null, mDelArm = null;
  // Programm (aus der eingelesenen Excel), Auswahl und Zustand
  var program = {meta:null, weeks:{}}, progLoaded = false, progMsg = '', progKind = '', presetArm = '', pgDelArm = false, progBusy = false, wpCand = null;
  var selDay = null, planState = {}, skips = {}, wpPick = {};
  var GROUPN = {push:'Push', pull:'Pull', leg:'Legs', weak:'Arms & Weak Points'};

  // Alle Übungen aus allen Kategorien, nach Schlüssel.
  var ALLEX = {};
  Object.keys(PLANS).forEach(function(p){ PLANS[p].ex.forEach(function(ex){ if (!ALLEX[ex.k]) ALLEX[ex.k] = ex; }); });
  var EXORDER = [];
  PICK_ORDER.forEach(function(p){ PLANS[p].ex.forEach(function(e){ if (EXORDER.indexOf(e.k) < 0) EXORDER.push(e.k); }); });
  Object.keys(ALLEX).forEach(function(k){ if (EXORDER.indexOf(k) < 0) EXORDER.push(k); });
  // Nur für alte Einheiten: Reihenfolge wie in der alten Kategorie
  function sortKeys(keys, plan){
    var base = plan && PLANS[plan] ? PLANS[plan].ex.map(function(e){ return e.k; }) : [];
    var order = base.concat(EXORDER.filter(function(k){ return base.indexOf(k) < 0; }));
    return order.filter(function(k){ return keys.indexOf(k) >= 0; });
  }
  function defaultKeys(plan){ return PLANS[plan].def ? PLANS[plan].def.slice() : PLANS[plan].ex.map(function(e){ return e.k; }); }

  // ---------- Programm ----------
  function slug(s){
    return String(s).toLowerCase().replace(/^[a-z]\d:\s*/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70) || 'uebung';
  }
  function progReady(){ return !!(program.meta && program.meta.days && program.meta.days.length); }
  function curWeek(){
    var ws = progReady() ? program.meta.weeks : [], w = planState && +planState.week;
    return ws.indexOf(w) >= 0 ? w : (ws[0] || 1);
  }
  function dayMeta(id){
    var d = progReady() ? program.meta.days : [];
    for (var i = 0; i < d.length; i++) if (d[i].id === id) return d[i];
    return null;
  }
  function dayRaw(w, d){ var wk = program.weeks[w]; return wk && wk.days && wk.days[d] && Array.isArray(wk.days[d].ex) ? wk.days[d].ex : []; }
  function multiWeek(){ return progReady() && program.meta.weeks.length > 1; }
  // Gruppen des Programms: bekannte (Push, Pull, Legs, Weak Points) zuerst in fester Reihenfolge, dann die übrigen
  function progGroups(){
    if (!progReady()) return [];
    var out = [], seen = {}, names = program.meta.groups || {};
    program.meta.days.forEach(function(d){
      if (seen[d.group]) return;
      seen[d.group] = 1;
      out.push({id:d.group, name:names[d.group] || GROUPN[d.group] || (PLANS[d.group] && PLANS[d.group].name) || d.group});
    });
    var rank = function(x){ var i = PICK_ORDER.indexOf(x.id); return i < 0 ? 100 : i; };
    return out.map(function(x, i){ return {x:x, i:i}; })
      .sort(function(a, b){ return (rank(a.x) - rank(b.x)) || (a.i - b.i); })
      .map(function(o){ return o.x; });
  }
  function blockOf(w){
    var bl = progReady() ? program.meta.blocks || [] : [];
    for (var i = 0; i < bl.length; i++) if ((bl[i].weeks || []).indexOf(w) >= 0) return i + 1;
    return 0;
  }
  function isSkipped(d, k){ return !!(skips[d] && skips[d][k]); }
  function uniqKey(k, used){ var b = k, n = 2; while (used[k]) k = b + '-' + (n++); used[k] = 1; return k; }
  // Übung für die Anzeige aus den Programmdaten bauen
  function mkEx(raw, key, name, extra){
    raw = raw || {};
    return Object.assign({
      k:key, n:name, warm: raw.warm != null ? raw.warm : 1, opt:false, rep: raw.reps || '', hi: raw.hi || null, pause: raw.rest || '',
      time: !!raw.time, tech: raw.tech || '', erpe: raw.erpe || '', lrpe: raw.lrpe || '', note: raw.note || '',
      subs: raw.subs || [], ps: raw.sets || '', wp: raw.wp || 0, orig: raw.n || name
    }, extra || {});
  }
  // Vorschau: alle Übungen des Tages, ohne die ausgelassenen und mit gewählten Weakpoint-Übungen
  function previewList(){
    var d = selDay, raws = dayRaw(curWeek(), d), used = {}, out = [];
    raws.forEach(function(raw, i){
      if (raw.wp) {
        var nm = wpPick[raw.wp];
        if (nm) out.push(mkEx(raw, uniqKey(slug(nm), used), nm, {i:i, orig:nm}));
        return;
      }
      var k0 = slug(raw.n);
      if (isSkipped(d, k0)) return;
      out.push(mkEx(raw, uniqKey(k0, used), raw.n, {i:i}));
    });
    return out;
  }
  function slotEx(s, sl, si){
    var raw = s.prog ? (dayRaw(s.prog.w, s.prog.d)[sl.i] || null) : null;
    var ex = mkEx(raw, sl.k, sl.n, {i:sl.i, s:sl.s || 0, si:si});
    if (!raw) { ex.warm = sl.w != null ? sl.w : 1; ex.orig = sl.n; }
    else if (raw.wp) ex.orig = sl.n;
    return ex;
  }
  function sname(s){
    if (!s) return '';
    if (s.dname) return s.dname + (s.prog && s.prog.w && !s.prog.one ? ' · Woche ' + s.prog.w : '');
    return pname(s.plan);
  }
  // Welche Übungen gelten gerade? Einheit mit Programm-Slots, Vorschau eines Programm-Tages oder alte Einheit.
  function exList(c){
    var s = c.id ? sessions[c.id] : null;
    if (s && Array.isArray(s.slots)) return s.slots.map(function(sl, i){ return slotEx(s, sl, i); });
    if (c.mode === 'preview') return previewList();
    var keys = s && Array.isArray(s.exs) ? sortKeys(s.exs, c.plan) : defaultKeys(c.plan);
    return keys.map(function(k){ return ALLEX[k]; }).filter(Boolean);
  }

  // ---------- helpers ----------
  function setsFor(ex){
    var out = [];
    var w = Math.min(3, ex.warm | 0);
    if (w >= 2) { for (var wi = 1; wi <= w; wi++) out.push({k:'w' + wi, label:'Aufwärmen ' + wi, warm:true}); }
    else if (w === 1) out.push({k:'w1',label:ex.opt ? 'Aufwärmen (optional)' : 'Aufwärmen',warm:true});
    out.push({k:'s1',label:'Satz 1'},{k:'s2',label:'Satz 2'},{k:'s3',label:'Satz 3'});
    return out;
  }
  function pad(n){ return String(n).padStart(2,'0'); }
  function todayStr(){ var d = new Date(); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }
  function dayNum(s){ var p = s.split('-').map(Number); return Math.round(Date.UTC(p[0], p[1]-1, p[2]) / 86400000); }
  function fromDayNum(n){ var d = new Date(n * 86400000); return d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate()); }
  function addDays(s, n){ return fromDayNum(dayNum(s) + n); }
  function weekday(p){
    return new Date(p[0], p[1]-1, p[2]).toLocaleDateString('de-DE',{weekday:'short'}).replace('.','');
  }
  function fmtDate(d){
    if (!d) return '';
    var p = d.split('-').map(Number);
    return weekday(p) + ' ' + pad(p[2]) + '.' + pad(p[1]) + '.';
  }
  function fmtDM(d){ var p = d.split('-').map(Number); return pad(p[2]) + '.' + pad(p[1]) + '.'; }
  function fmtDateFull(d){
    if (!d) return '';
    var p = d.split('-').map(Number);
    return weekday(p) + ' ' + pad(p[2]) + '.' + pad(p[1]) + '.' + p[0];
  }
  function hhmm(ms){
    if (!ms) return '';
    return new Date(ms).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'});
  }
  function fmtClock(sec){
    var hh = Math.floor(sec/3600), mm = Math.floor(sec%3600/60), ss = sec%60;
    return pad(hh)+':'+pad(mm)+':'+pad(ss);
  }
  function fmtMin(sec){ return sec == null ? '–' : Math.round(sec/60) + ' Min'; }
  function fmtNum(v){ return String(v).replace('.',','); }
  function fmt1(v){ return (Math.round(v * 10) / 10).toFixed(1).replace('.',','); }
  function fmtSigned(v){
    if (Math.abs(v) < 0.05) return '±0';
    return (v > 0 ? '+' : '−') + fmt1(Math.abs(v));
  }
  function parseNum(str){
    var t = str.trim().replace(',','.');
    if (t === '') return null;
    var n = Number(t);
    return (isFinite(n) && n >= 0) ? n : undefined;
  }
  function sortedAll(){
    return Object.keys(sessions).map(function(id){ return Object.assign({id:id}, sessions[id]); })
      .sort(function(a,b){ return (a.date||'').localeCompare(b.date||'') || (a.ts||0)-(b.ts||0); });
  }
  function isRunning(s){ return !!s && s.status === 'running'; }
  function doneSessions(){ return sortedAll().filter(function(s){ return !isRunning(s); }); }
  function runningSession(){
    var best = null;
    Object.keys(sessions).forEach(function(id){
      var s = sessions[id];
      if (isRunning(s) && (!best || (s.startedAt||0) > (best.startedAt||0))) best = Object.assign({id:id}, s);
    });
    return best;
  }
  function getVal(s, ex, set, f){
    var e = s && s.entries && s.entries[ex];
    if (!e) return null;
    if (f === 'note') return typeof e.note === 'string' ? e.note : null;
    var v = e[set] && e[set][f];
    return typeof v === 'number' ? v : null;
  }
  function hasData(s, exKey){
    var e = s.entries && s.entries[exKey];
    if (!e) return false;
    return Object.keys(e).some(function(k){
      var v = e[k];
      return v && typeof v === 'object' && Object.keys(v).some(function(f){ return typeof v[f] === 'number'; });
    });
  }
  function lastText(prev, ex, setKey, bare){
    if (!prev) return '';
    var pre = bare ? '' : 'zuletzt ';
    if (ex.time) {
      var sec = getVal(prev, ex.k, setKey, 'sec');
      return sec == null ? '' : pre + fmtNum(sec) + ' Sek.';
    }
    var kg = getVal(prev, ex.k, setKey, 'kg'), reps = getVal(prev, ex.k, setKey, 'reps');
    if (kg == null && reps == null) return '';
    return pre + (kg == null ? '–' : fmtNum(kg) + ' kg') + ' × ' + (reps == null ? '–' : reps);
  }

  // Welcher Bereich ist gerade aktiv?
  function ctx(){
    var run = runningSession();
    if (view === 'K') return {mode:'body', id:null, plan:null, run:run};
    if (view === 'E') return {mode:'nutri', id:null, plan:null, run:run};
    if (view === 'H') {
      if (histId && sessions[histId] && histMode) return {mode:histMode, id:histId, plan:sessions[histId].plan, run:run};
      return {mode:'list', id:null, plan:null, run:run};
    }
    if (run && PLANS[run.plan]) return {mode:'run', id:run.id, plan:run.plan, run:run};
    if (selPlan && selDay && progReady()) return {mode:'preview', id:null, plan:selPlan, run:run};
    return {mode:'pick', id:null, plan:null, run:run};
  }

  // ---------- pending writes (Training) ----------
  function setPending(id, ex, set, f, val){
    var p = pend[id] || (pend[id] = {});
    if (ex === '_date') { p.date = val; return; }
    if (ex === '_dur') { p.durationSec = val; return; }
    if (ex === '_meta') { p[f] = val; return; }
    p.entries = p.entries || {};
    var e = p.entries[ex] = p.entries[ex] || {};
    if (f === 'note') e.note = val;
    else { var s = e[set] = e[set] || {}; s[f] = val; }
  }
  function pendingHas(id, ex, set, f){
    if (ex === '_meta') return !!(pend[id] && pend[id][f] !== undefined);
    var e = pend[id] && pend[id].entries && pend[id].entries[ex];
    if (!e) return false;
    if (f === 'note') return e.note !== undefined;
    return !!(e[set] && e[set][f] !== undefined);
  }
  function deepMerge(base, over){
    var out = Array.isArray(base) ? base.slice() : Object.assign({}, base);
    Object.keys(over).forEach(function(k){
      var o = over[k];
      if (o && typeof o === 'object' && out[k] && typeof out[k] === 'object') out[k] = deepMerge(out[k], o);
      else out[k] = o;
    });
    return out;
  }
  function schedule(id){
    clearTimeout(timers[id]);
    timers[id] = setTimeout(function(){ flush(id); }, 600);
    setStatus('saving');
  }
  async function flush(id){
    clearTimeout(timers[id]);
    if (inflight[id]) { try { await inflight[id]; } catch (e) {} }
    var patch = pend[id];
    if (!patch || !db) return;
    delete pend[id];
    patch.edited = Date.now();
    var p = db.doc('sessions/' + id).update(patch);
    inflight[id] = p;
    try { await p; if (!Object.keys(pend).length) setStatus('saved'); }
    catch (e) {
      pend[id] = deepMerge(patch, pend[id] || {});
      setStatus('error');
    }
    finally { if (inflight[id] === p) delete inflight[id]; }
  }
  function flushAll(){ Object.keys(pend).forEach(function(id){ flush(id); }); }

  var STATUS = {
    wait:'Verbinde mit Speicher …', ready:'Bereit', saving:'Speichert …', saved:'Gespeichert',
    error:'Nicht gespeichert, bitte nochmal versuchen', nodb:'Speichern hier nicht möglich', slow:'Speicher noch nicht erreichbar'
  };
  function setStatus(kind){
    var el = $('#status');
    el.dataset.kind = kind;
    el.textContent = STATUS[kind] || '';
  }

  // ---------- Eingabe (Training) ----------
  function validMeta(f, v){
    if (f === 'effort') return Number.isInteger(v) && v >= 1 && v <= 10;
    if (f === 'energy') return Number.isInteger(v) && v >= 1 && v <= 5;
    if (f === 'sleepH') return v >= 0 && v <= 24;
    return true;
  }
  function onInput(e){
    var i = e.target, c = ctx();
    if (!c.id || !db || (c.mode !== 'run' && c.mode !== 'edit')) return;
    var ex = i.dataset.ex, set = i.dataset.set, f = i.dataset.f, val;
    if (f === 'note') val = i.value;
    else {
      val = parseNum(i.value);
      if (val === undefined || (val !== null && ex === '_meta' && !validMeta(f, val))) { i.setAttribute('aria-invalid','true'); return; }
      i.removeAttribute('aria-invalid');
    }
    setPending(c.id, ex, set, f, val);
    schedule(c.id);
  }
  function onChange(){ var c = ctx(); if (c.id) flush(c.id); }
  function onKey(e){
    if (e.key !== 'Enter' || e.target.tagName !== 'INPUT') return;
    var all = Array.prototype.slice.call(document.querySelectorAll('#cards input:not([readonly])'));
    var idx = all.indexOf(e.target);
    if (idx >= 0 && all[idx+1]) { e.preventDefault(); all[idx+1].focus(); }
    else e.target.blur();
  }

  // ---------- Karten ----------
  function inp(ex, s, f, mode, ro){
    var what = f === 'kg' ? 'Gewicht in Kilogramm' : (f === 'sec' ? 'Sekunden' : 'Wiederholungen');
    return h('input', {
      type:'text', inputmode:mode, autocomplete:'off', enterkeyhint:'next', placeholder:'–',
      id:'i-'+ex.k+'-'+s.k+'-'+f, 'data-ex':ex.k, 'data-set':s.k, 'data-f':f,
      'aria-label': ex.n + ', ' + s.label + ', ' + what,
      readonly: ro, oninput:onInput, onchange:onChange
    });
  }
  function infoBox(ex, withSubs){
    var lines = [];
    if (ex.tech) lines.push(['Technik im letzten Satz', ex.tech]);
    if (ex.note) lines.push(['Hinweis', ex.note]);
    if (withSubs && ex.subs && ex.subs.length) ex.subs.forEach(function(n, i){ lines.push(['Substitution ' + (i + 1), n]); });
    if (ex.ps && ex.ps !== '3') lines.push(['Im Programm', ex.ps + ' Arbeitssätze, hier immer 3']);
    if (!lines.length) return null;
    return h('details', {class:'xinfo'}, h('summary', {text:'Infos'}),
      lines.map(function(l){ return h('p', {}, h('b', {text:l[0] + ': '}), l[1]); }));
  }
  function toggleSwap(e, ex){
    var btn = e.currentTarget, panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    var open = panel.hidden;
    if (open) fillSwap(panel, ex);   // beim Öffnen frisch aufbauen, damit gesperrte Übungen (mit Werten) stimmen
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  }
  function head(ex, idx, swap, withSubs){
    var tags = [];
    if (ex.rep) tags.push(h('span', {class:'tag', text:'3 × ' + ex.rep}));
    if (ex.pause) tags.push(h('span', {class:'tag', text:'Pause ' + ex.pause}));
    if (ex.erpe || ex.lrpe) tags.push(h('span', {class:'tag', text:'RPE ' + (ex.erpe || '–') + ' → ' + (ex.lrpe || '–')}));
    return [
      h('div', {class:'ch' + (swap ? ' hs' : '')},
        h('span', {class:'ix', text:String(idx+1)}),
        h('h2', {id:'h-'+ex.k, text:ex.n}),
        swap ? h('button', {class:'swapbtn', type:'button', 'aria-expanded':'false', 'aria-controls':'sw-'+ex.k, onclick:function(e){ toggleSwap(e, ex); }, text:'Übung ändern'}) : null,
        h('div', {class:'tags'}, tags)),
      swap ? swapPanel(ex) : null,
      infoBox(ex, withSubs),
      h('p', {class:'up', id:'up-'+ex.k, hidden:true})
    ];
  }
  // Ersatzübungen (Substitution 1 und 2) oder Suche bei Weakpoint-Übungen
  function swapPanel(ex){ return h('div', {class:'swap', id:'sw-'+ex.k, hidden:true}); }
  function fillSwap(box, ex){
    var c = ctx(), s = c.id ? sessions[c.id] : null;
    var locked = !!(s && hasData(s, ex.k));
    box.replaceChildren();
    if (ex.wp) {
      box.append(h('p', {class:'hint', text: locked ? 'Hier stehen schon Werte. Zum Wechseln erst die Werte löschen.' : 'Andere Weakpoint-Übung suchen:'}));
      if (!locked) box.append(wpField(function(name){ setSlotName(c.id, ex.si, name, 0); }, 'sw-' + ex.si));
      return;
    }
    var opts = [{s:0, label:'Original', n:ex.orig}].concat((ex.subs || []).map(function(n, i){ return {s:i + 1, label:'Substitution ' + (i + 1), n:n}; }));
    var used = {};
    if (s && s.slots) s.slots.forEach(function(x, i){ if (i !== ex.si) used[x.k] = 1; });
    box.append(h('ul', {class:'subs'}, opts.map(function(o){
      var cur = o.s === (ex.s || 0), clash = !cur && used[slug(o.n)];
      return h('li', {}, h('button', {class:'sopt', type:'button', 'aria-pressed':String(cur),
          disabled: (!cur && (locked || clash)) ? true : null, onclick:function(){ if (!cur) setSlotName(c.id, ex.si, o.n, o.s); }},
        h('span', {class:'sl', text:o.label}), h('span', {class:'sn', text:o.n})));
    })));
    if (locked) box.append(h('p', {class:'hint', text:'Hier stehen schon Werte. Zum Wechseln erst die Werte löschen.'}));
  }
  function card(ex, idx, cmode){
    var ro = cmode === 'view';
    var rows = setsFor(ex).map(function(s){
      return h('div', {class:'row ' + (s.warm ? 'warm' : 'work')},
        h('div', {class:'lab'},
          h('span', {class:'ln', text:s.label}),
          h('span', {class:'last', id:'last-'+ex.k+'-'+s.k})),
        ex.time ? h('span') : inp(ex, s, 'kg', 'decimal', ro),
        h('span', {class:'x', text: ex.time ? '' : '×', 'aria-hidden':'true'}),
        inp(ex, s, ex.time ? 'sec' : 'reps', 'numeric', ro));
    });
    var swap = cmode === 'run' && !!(ex.wp || (ex.subs && ex.subs.length));
    return h('section', {class:'card', 'aria-labelledby':'h-'+ex.k},
      head(ex, idx, swap, false),
      h('div', {class:'row cols', 'aria-hidden':'true'},
        h('span'),
        h('span', {text: ex.time ? '' : 'kg'}),
        h('span'),
        h('span', {text: ex.time ? 'Sek.' : 'Wdh.'})),
      rows,
      h('div', {class:'note-row'},
        h('input', {
          type:'text', maxlength:'200', id:'i-'+ex.k+'-note', 'data-ex':ex.k, 'data-set':'', 'data-f':'note',
          placeholder:'Notiz, z. B. Sitzeinstellung', 'aria-label': ex.n + ', Notiz',
          readonly: ro, oninput:onInput, onchange:onChange
        })));
  }
  function metaCard(cmode){
    var ro = cmode === 'view';
    function fld(key, label, mode, ph){
      return h('div', {class:'mf'},
        h('label', {for:'i-meta-'+key, text:label}),
        h('input', {
          type:'text', inputmode:mode, autocomplete:'off', placeholder:ph, readonly:ro,
          id:'i-meta-'+key, 'data-ex':'_meta', 'data-set':'', 'data-f':key, oninput:onInput, onchange:onChange
        }));
    }
    return h('section', {class:'card', 'aria-labelledby':'h-meta'},
      h('div', {class:'ch'},
        h('span', {class:'ix', text:'+'}),
        h('h2', {id:'h-meta', text:'Wie war es?'}),
        h('div', {class:'tags'}, h('span', {class:'tag', text:'optional'}))),
      h('div', {class:'mgrid'},
        fld('effort', 'Anstrengung (1–10)', 'numeric', '1–10'),
        fld('sleepH', 'Schlaf letzte Nacht (Std.)', 'decimal', 'Std.'),
        fld('energy', 'Energie vorher (1–5)', 'numeric', '1–5')));
  }
  function previewCard(ex, idx){
    var rows = setsFor(ex).map(function(s){
      return h('div', {class:'prow ' + (s.warm ? 'warm' : 'work')},
        h('span', {class:'ln', text:s.label}),
        h('span', {class:'last', id:'last-'+ex.k+'-'+s.k, text:'–'}));
    });
    return h('section', {class:'card', 'aria-labelledby':'h-'+ex.k},
      head(ex, idx, false, true),
      h('div', {class:'prow cols', 'aria-hidden':'true'}, h('span'), h('span', {text:'Zuletzt'})),
      rows);
  }
  function buildCards(c){
    var root = $('#cards');
    root.replaceChildren();
    if (c.mode !== 'list' && c.mode !== 'body' && c.mode !== 'nutri' && c.plan && PLANS[c.plan]) {
      exList(c).forEach(function(ex, i){
        root.append(c.mode === 'preview' ? previewCard(ex, i) : card(ex, i, c.mode));
      });
      if (c.mode !== 'preview') root.append(metaCard(c.mode));
    }
    renderedKey = cardKey(c);
  }
  function cardKey(c){
    var ex = c.plan && PLANS[c.plan] && c.mode !== 'list' && c.mode !== 'body' && c.mode !== 'nutri' ? exList(c).map(function(e){ return e.k; }).join(',') : '';
    var pk = c.mode === 'preview' ? curWeek() + selDay : '';
    return view + '|' + c.mode + '|' + (c.id || '') + '|' + (c.plan || '') + '|' + ex + '|' + pk + '|' + Object.keys(program.weeks).length;
  }

  function syncValues(c){
    if (!c.id) return;
    var s = sessions[c.id];
    document.querySelectorAll('#cards input[data-ex]').forEach(function(i){
      if (i === document.activeElement) return;
      var ex = i.dataset.ex, set = i.dataset.set, f = i.dataset.f;
      if (pendingHas(c.id, ex, set, f)) return;
      if (ex === '_meta') {
        var mv = s && typeof s[f] === 'number' ? s[f] : null;
        i.value = mv == null ? '' : fmtNum(mv);
        return;
      }
      var v = getVal(s, ex, set, f);
      i.value = v == null ? '' : (f === 'note' ? v : fmtNum(v));
    });
  }
  function syncMeta(c){
    if (c.mode === 'list' || c.mode === 'body' || c.mode === 'nutri' || !c.plan || !PLANS[c.plan]) return;
    var list = doneSessions();
    var idx = list.length;
    if (c.mode === 'edit' || c.mode === 'view') {
      var at = list.findIndex(function(s){ return s.id === c.id; });
      if (at >= 0) idx = at;
    }
    var preview = c.mode === 'preview';
    exList(c).forEach(function(ex){
      var prev = null;
      for (var j = idx - 1; j >= 0; j--) { if (hasData(list[j], ex.k)) { prev = list[j]; break; } }
      setsFor(ex).forEach(function(s){
        var el = document.getElementById('last-'+ex.k+'-'+s.k);
        if (el) el.textContent = lastText(prev, ex, s.k, preview) || (preview ? '–' : '');
      });
      var note = document.getElementById('i-'+ex.k+'-note');
      if (note) note.placeholder = c.mode === 'view' ? '' : ((prev && getVal(prev, ex.k, '', 'note')) || 'Notiz, z. B. Sitzeinstellung');
      var up = document.getElementById('up-'+ex.k);
      if (up) {
        var done = (c.mode === 'run' || preview) && prev && ex.hi && ['s1','s2','s3'].every(function(k){
          var v = getVal(prev, ex.k, k, ex.time ? 'sec' : 'reps');
          return v != null && v >= ex.hi;
        });
        up.hidden = !done;
        up.replaceChildren();
        if (done) {
          up.append(h('b', {text:'Steigern: '}), document.createTextNode(
            ex.time ? 'Letztes Mal 3 Sätze mit ' + ex.hi + ' Sek. geschafft. Heute etwas länger halten.'
                    : 'Letztes Mal alle 3 Sätze mit ' + ex.hi + ' Wdh. geschafft. Heute eine Gewichtsstufe höher probieren.'));
        }
      }
    });
  }

  // ---------- Übungen des Tages wählen ----------
  var ICON_Y = 'M5 12.5l4.5 4.5L19 7.5', ICON_N = 'M6 6l12 12M18 6L6 18';
  function xbtn(kind, on, label, disabled, onclick){
    var ic = svg('svg', {viewBox:'0 0 24 24', width:'22', height:'22', fill:'none', stroke:'currentColor', 'stroke-width':'3', 'stroke-linecap':'round', 'stroke-linejoin':'round', 'aria-hidden':'true'});
    ic.append(svg('path', {d:kind === 'y' ? ICON_Y : ICON_N}));
    return h('button', {class:'xb ' + kind, type:'button', 'aria-pressed':String(on), 'aria-label':label,
      'data-fk':label + kind, disabled:disabled ? true : null, onclick:onclick}, ic);
  }
  function rawMeta(raw){
    var t = [];
    if (raw.reps) t.push('3 × ' + raw.reps);
    if (raw.rest) t.push('Pause ' + raw.rest);
    return t.join(' · ');
  }

  // Suche für die Weakpoint-Übungen: Vorschläge aus der Weak-Point-Tabelle und allen Übungen des Programms
  function wpCandidates(){
    if (wpCand) return wpCand;
    var out = [], seen = {};
    function add(n, m){ var k = slug(n); if (!n || seen[k]) return; seen[k] = 1; out.push({n:n, m:m || ''}); }
    if (progReady()) {
      (program.meta.wp || []).forEach(function(r){ (r.o1 || []).concat(r.o2 || []).forEach(function(n){ add(n, r.m); }); });
      Object.keys(program.weeks).forEach(function(w){
        var days = program.weeks[w].days || {};
        Object.keys(days).forEach(function(d){
          (days[d].ex || []).forEach(function(e){
            if (e.wp) return;
            add(String(e.n).replace(/^[A-Za-z]\d:\s*/, ''), '');
            (e.subs || []).forEach(function(n){ add(n, ''); });
          });
        });
      });
    }
    wpCand = out;
    return out;
  }
  function wpField(onPick, fk){
    var wrap = h('div', {class:'wpf'});
    var inp = h('input', {type:'text', class:'fin', placeholder:'Übung suchen, z. B. Lateral Raise', autocomplete:'off', autocapitalize:'off', spellcheck:'false',
      maxlength:'120', 'aria-label':'Weakpoint-Übung suchen', 'data-fk':fk || 'wp'});
    var list = h('ul', {class:'wpl', hidden:true});
    var own = h('button', {class:'link-btn', type:'button', hidden:true});
    function pick(name){
      name = String(name).replace(/\s+/g, ' ').trim().slice(0, 120);
      if (!name) return;
      if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
      onPick(name);
    }
    function refresh(){
      var raw = inp.value.trim(), terms = raw.toLowerCase().split(/\s+/).filter(Boolean);
      list.replaceChildren(); own.hidden = true;
      if (!terms.length) { list.hidden = true; return; }
      var hits = wpCandidates().filter(function(c){
        var hay = (c.n + ' ' + c.m).toLowerCase();
        return terms.every(function(t){ return hay.indexOf(t) >= 0; });
      }).slice(0, 8);
      hits.forEach(function(c){
        list.append(h('li', {}, h('button', {type:'button', class:'wpo', onclick:function(){ pick(c.n); }},
          h('span', {text:c.n}), c.m ? h('small', {text:c.m}) : null)));
      });
      list.hidden = !hits.length;
      if (!hits.some(function(c){ return c.n.toLowerCase() === raw.toLowerCase(); })) { own.hidden = false; own.textContent = 'Eigene Übung „' + raw + '“ verwenden'; }
    }
    inp.addEventListener('input', refresh);
    inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') { e.preventDefault(); pick(inp.value); } });
    own.addEventListener('click', function(){ pick(inp.value); });
    wrap.append(inp, list, own);
    return wrap;
  }

  // Vor dem Start: Übung für diesen Tag auslassen oder wieder aufnehmen (bleibt gespeichert)
  async function setSkip(day, key, skip){
    var local = Object.assign({}, skips);
    local[day] = Object.assign({}, local[day] || {});
    if (skip) local[day][key] = 1; else delete local[day][key];
    skips = local;
    renderAll();
    if (!db) return;
    setStatus('saving');
    try {
      var patch = {}; patch[day] = {}; patch[day][key] = skip ? 1 : {__delete__:true};
      await db.doc('plan/skip').update(patch);
      setStatus('saved');
    } catch (e) { setStatus('error'); }
  }
  async function saveSlots(cid, slots){
    var s = sessions[cid], exs = slots.map(function(x){ return x.k; });
    setStatus('saving');
    try {
      await db.doc('sessions/' + cid).update({slots:slots, exs:exs, edited:Date.now()});
      sessions[cid] = Object.assign({}, s, {slots:slots, exs:exs});
      renderAll(); setStatus('saved');
    } catch (e) { setStatus('error'); renderAll(); }
  }
  // Übung wechseln (Substitution oder andere Weakpoint-Übung), solange noch keine Werte stehen
  async function setSlotName(cid, si, name, sNum){
    if (!db || !cid) return;
    await flush(cid);
    var s = sessions[cid];
    if (!s || !Array.isArray(s.slots) || !s.slots[si]) return;
    var sl = s.slots[si], k = slug(name);
    if (k === sl.k && (sl.s || 0) === sNum) { renderAll(); return; }
    if (hasData(s, sl.k)) { renderAll(); return; }
    if (s.slots.some(function(x, i){ return i !== si && x.k === k; })) { renderAll(); return; }
    var slots = s.slots.map(function(x, i){ return i === si ? Object.assign({}, x, {k:k, n:name, s:sNum}) : x; });
    await saveSlots(cid, slots);
  }
  // Übung zur laufenden Einheit dazunehmen oder auslassen
  async function setSlotInclude(cid, i, raw, name, on){
    if (!db || !cid) return;
    await flush(cid);
    var s = sessions[cid];
    if (!s || !Array.isArray(s.slots)) return;
    var slots = s.slots.slice();
    if (on) {
      var k = slug(name);
      if (slots.some(function(x){ return x.i === i || x.k === k; })) { renderAll(); return; }
      slots.push({k:k, n:name, i:i, s:0, w:raw.warm != null ? raw.warm : 1});
      slots.sort(function(a, b){ return a.i - b.i; });
    } else {
      var idx = slots.findIndex(function(x){ return x.i === i; });
      if (idx < 0 || hasData(s, slots[idx].k) || slots.length === 1) { renderAll(); return; }
      slots.splice(idx, 1);
    }
    await saveSlots(cid, slots);
  }

  function renderCustom(c){
    var box = $('#custom');
    var s = c.id ? sessions[c.id] : null;
    var show = progReady() && ((c.mode === 'preview' && db && loaded && !c.run) || ((c.mode === 'run' || c.mode === 'edit') && s && Array.isArray(s.slots) && s.prog));
    box.hidden = !show;
    if (!show) { box.replaceChildren(); return; }
    var active = document.activeElement;
    if (active && box.contains(active) && active.tagName === 'INPUT') return;
    var foc = active && box.contains(active) ? active.getAttribute('data-fk') : null;
    box.replaceChildren();
    var pv = c.mode === 'preview';
    var wk = pv ? curWeek() : s.prog.w, dayId = pv ? selDay : s.prog.d, dm = dayMeta(dayId);
    var raws = dayRaw(wk, dayId), cur = exList(c), chosen = {};
    cur.forEach(function(e){ chosen[e.i] = e; });
    var rows = h('ul', {class:'xsel'}, raws.map(function(raw, i){
      if (raw.wp) {
        var label = 'Weakpoint-Übung ' + raw.wp + (raw.wp > 1 ? ' (optional)' : '');
        var nm = pv ? wpPick[raw.wp] : (chosen[i] ? chosen[i].n : '');
        if (!nm) {
          return h('li', {class:'xrow wprow'},
            h('span', {class:'xn'}, h('b', {text:label}), h('small', {text:rawMeta(raw) + ' · beliebige Übung für deine Schwachstelle'})),
            wpField(function(name){
              if (pv) { wpPick[raw.wp] = name; renderAll(); }
              else setSlotInclude(c.id, i, raw, name, true);
            }, 'wp-' + i));
        }
        var lockedW = !pv && s && hasData(s, chosen[i].k);
        return h('li', {class:'xrow', 'data-s':'y'},
          h('span', {class:'xn'}, h('b', {text:nm}), h('small', {text: lockedW ? 'hat schon Werte' : label + ' · ' + rawMeta(raw)})),
          xbtn('y', true, nm + ': dabei', true, function(){}),
          xbtn('n', false, nm + ': auslassen', !!lockedW, function(){
            if (pv) { delete wpPick[raw.wp]; renderAll(); }
            else setSlotInclude(c.id, i, raw, nm, false);
          }));
      }
      var inc = pv ? !isSkipped(dayId, slug(raw.n)) : !!chosen[i];
      var locked = !pv && inc && s && hasData(s, chosen[i].k);
      var shown = !pv && chosen[i] ? chosen[i].n : raw.n;
      return h('li', {class:'xrow', 'data-s':inc ? 'y' : 'n'},
        h('span', {class:'xn'}, h('b', {text:shown}), h('small', {text: locked ? 'hat schon Werte' : rawMeta(raw)})),
        xbtn('y', inc, raw.n + ': mit in den Plan', false, function(){ pv ? setSkip(dayId, slug(raw.n), false) : setSlotInclude(c.id, i, raw, raw.n, true); }),
        xbtn('n', !inc, raw.n + ': auslassen', !!locked, function(){ pv ? setSkip(dayId, slug(raw.n), true) : setSlotInclude(c.id, i, raw, raw.n, false); }));
    }));
    var oneWeek = pv ? !multiWeek() : !!(s && s.prog && s.prog.one);
    var n = cur.length, title = (dm ? dm.name : '') + (oneWeek ? '' : ' · Woche ' + wk);
    var kids = pv ? [
      h('h2', {class:'sec', text:'Übungen · ' + title}),
      dm && dm.focus ? h('p', {class:'hint', text:dm.focus}) : null,
      h('p', {class:'hint', text:'Grünes Häkchen: kommt mit in den Plan. Rotes Kreuz: wird ausgelassen. Deine Auswahl bleibt gespeichert.'}),
      rows,
      h('p', {class:'xcount', text: n ? n + ' von ' + raws.length + ' Übungen im Plan' : 'Noch keine Übung im Plan'})
    ] : [det('custom-' + c.mode, false, 'Übungen dieser Einheit ändern (' + n + ')',
        h('p', {class:'hint', text:'Häkchen: dabei. Kreuz: auslassen. Übungen mit eingetragenen Werten lassen sich nicht auslassen. Ersatzübungen wählst du über „Übung ändern“ bei der Übung.'}), rows)];
    box.append.apply(box, kids.filter(Boolean));
    if (foc) { var again = box.querySelector('[data-fk="' + foc.replace(/"/g, '\\"') + '"]'); if (again) again.focus(); }
  }

  // ---------- Verlauf ----------
  function renderHist(){
    var root = $('#histlist');
    root.replaceChildren();
    root.append(h('h2', {class:'sec', text:'Vergangene Einheiten'}));
    var list = doneSessions().slice().sort(function(a,b){
      return (b.date||'').localeCompare(a.date||'') || (b.ts||0)-(a.ts||0);
    });
    if (!list.length) {
      root.append(h('div', {class:'empty'}, h('p', {text: loaded
        ? 'Noch keine beendete Einheit. Sobald du ein Training beendest, erscheint es hier.'
        : 'Lade Einheiten …'})));
      return;
    }
    root.append(h('p', {class:'hint', text:'Tippe auf eine Einheit, um sie anzuschauen oder zu bearbeiten.'}));
    var ul = h('ul', {class:'hlist'});
    list.forEach(function(s){
      var open = histPick === s.id;
      var sub = sname(s) + ' · Nr. ' + (s.n || '?') + (s.durationSec != null ? ' · ' + fmtMin(s.durationSec) : '');
      var li = h('li', {class:'hitem p' + s.plan},
        h('button', {class:'hrow', type:'button', 'aria-expanded':String(open),
            onclick:function(){ histPick = open ? null : s.id; renderAll(); }},
          h('span', {class:'plate', text:plate(s.plan), 'aria-hidden':'true'}),
          h('span', {class:'ht'}, h('b', {text:fmtDateFull(s.date)}), h('small', {text:sub}))));
      if (open) {
        li.append(h('div', {class:'hact'},
          h('button', {class:'btn-sec', type:'button', text:'Anschauen', onclick:function(){ openHist(s.id, 'view'); }}),
          h('button', {class:'btn-new', type:'button', text:'Bearbeiten', onclick:function(){ openHist(s.id, 'edit'); }})));
      }
      ul.append(li);
    });
    root.append(ul);
  }
  function openHist(id, mode){
    histId = id; histMode = mode; histPick = null; confirmDel = false;
    renderAll();
    window.scrollTo(0, 0);
  }
  function closeHist(){
    if (histId) flush(histId);
    histId = null; histMode = null; confirmDel = false;
    renderAll();
    window.scrollTo(0, 0);
  }

  // ---------- Timer ----------
  function updateTimer(){
    var run = runningSession(), el = $('#timer');
    if (!run || !run.startedAt) { el.textContent = '00:00:00'; return; }
    el.textContent = fmtClock(Math.max(0, Math.floor((Date.now() - run.startedAt) / 1000)));
  }

  // ---------- Körper: Hilfen ----------
  function weightList(){
    return Object.keys(weights).map(function(id){ return Object.assign({date:id}, weights[id]); })
      .filter(function(w){ return typeof w.kg === 'number'; })
      .sort(function(a,b){ return a.date.localeCompare(b.date); });
  }
  function girthList(){
    return Object.keys(girths).map(function(id){ return Object.assign({date:id}, girths[id]); })
      .sort(function(a,b){ return a.date.localeCompare(b.date); });
  }
  function interval(){
    var n = profile && typeof profile.intervalDays === 'number' ? profile.intervalDays : 14;
    return n >= 1 ? Math.round(n) : 14;
  }
  function nextMeasure(){
    var gl = girthList();
    if (!gl.length) return null;
    var due = addDays(gl[gl.length - 1].date, interval());
    return {due:due, n:dayNum(due) - dayNum(todayStr())};
  }
  function nextText(nm){
    var n = nm.n;
    if (n > 1) return 'Umfang messen in ' + n + ' Tagen (' + fmtDate(nm.due) + ')';
    if (n === 1) return 'Umfang messen morgen (' + fmtDate(nm.due) + ')';
    if (n === 0) return 'Umfang messen heute fällig';
    return 'Umfang messen seit ' + (-n) + (n === -1 ? ' Tag' : ' Tagen') + ' überfällig';
  }
  function reminders(){
    var out = [], today = todayStr();
    if (wLoaded && !weights[today] && view !== 'K') out.push({due:true, text:'Heute noch nicht gewogen.'});
    if (SHOW_GIRTH && gLoaded && pLoaded) {
      var nm = nextMeasure();
      if (!nm) out.push({due:true, text:'Noch keine Umfänge gemessen. Miss zum Start alle Werte.'});
      else out.push({due:nm.n <= 3, text:nextText(nm)});
    }
    return out;
  }
  function renderReminders(c){
    var box = $('#remind');
    var show = c.mode === 'preview' || c.mode === 'pick' || c.mode === 'list' || c.mode === 'body';
    var items = show ? reminders() : [];
    box.hidden = !items.length;
    box.replaceChildren();
    items.forEach(function(r){
      box.append(h('button', {class:'rline' + (r.due ? ' due' : ''), type:'button', onclick:function(){ goBody(); }},
        h('span', {text:r.text}),
        view === 'K' ? null : h('span', {class:'go', text:'Öffnen'})));
    });
  }
  function goBody(){
    flushAll();
    view = 'K'; userPicked = true; histId = null; histMode = null; histPick = null;
    confirmDel = false; confirmEnd = false; notice = '';
    renderAll();
    window.scrollTo(0, 0);
  }

  // ---------- Körper: Anzeige ----------
  function stat(label, value, sub){
    return h('div', {class:'stat'}, h('small', {text:label}), h('b', {text:value}), sub ? h('span', {text:sub}) : null);
  }
  function latestG(list, k){
    for (var j = list.length - 1; j >= 0; j--) { if (typeof list[j][k] === 'number') return list[j][k]; }
    return null;
  }
  function fmt2(v){ return (Math.round(v * 100) / 100).toFixed(2).replace('.', ','); }
  function renderMetrics(wl, gl){
    var ul = $('#m-list'); ul.replaceChildren();
    var hcm = profile && typeof profile.heightCm === 'number' ? profile.heightCm : null;
    var kg = wl.length ? wl[wl.length - 1].kg : null;
    var waist = latestG(gl, 'waist'), hip = latestG(gl, 'hip'), neck = latestG(gl, 'neck');
    function row(name, sub, val, verdict, missing){
      ul.append(h('li', {class:'mrow'},
        h('div', {class:'mn'}, h('b', {text:name}), h('small', {text:missing ? 'Es fehlt: ' + missing : sub})),
        h('div', {class:'mv' + (val == null ? ' none' : ''), text:val == null ? '–' : val}),
        h('span', {class:'vchip ' + (verdict ? verdict.c : 'na'), text:verdict ? verdict.t : 'offen'})));
    }
    function miss(list){ var m = list.filter(function(x){ return !x[1]; }).map(function(x){ return x[0]; }); return m.length > 1 ? m.slice(0, -1).join(', ') + ' und ' + m[m.length - 1] : m.join(''); }

    // BMI
    var bmi = kg != null && hcm ? kg / Math.pow(hcm / 100, 2) : null, vb = null;
    if (bmi != null) vb = bmi < 18.5 ? {t:'Zu wenig', c:'warn'} : bmi < 25 ? {t:'Normal', c:'ok'} : bmi < 30 ? {t:'Zu hoch', c:'warn'} : {t:'Deutlich zu hoch', c:'bad'};
    row('BMI', 'Normal: 18,5 bis 24,9', bmi != null ? fmt1(bmi) : null, vb, miss([['Gewicht', kg != null], ['Größe', hcm]]));

    // Taille zu Größe
    var whtr = waist != null && hcm ? waist / hcm : null, vt = null;
    if (whtr != null) vt = whtr < 0.4 ? {t:'Zu wenig', c:'warn'} : whtr < 0.5 ? {t:'In Ordnung', c:'ok'} : whtr < 0.6 ? {t:'Zu hoch', c:'warn'} : {t:'Deutlich zu hoch', c:'bad'};
    row('Taille / Größe', hcm ? 'Ziel: unter 0,50 (Taille unter ' + fmt1(hcm / 2) + ' cm)' : 'Ziel: unter 0,50', whtr != null ? fmt2(whtr) : null, vt, miss([['Taille', waist != null], ['Größe', hcm]]));

    // Taille zu Hüfte (Männer)
    var whr = waist != null && hip != null ? waist / hip : null, vw = null;
    if (whr != null) vw = whr < 0.9 ? {t:'In Ordnung', c:'ok'} : whr < 1 ? {t:'Erhöht', c:'warn'} : {t:'Zu hoch', c:'bad'};
    row('Taille / Hüfte', 'Ziel: unter 0,90', whr != null ? fmt2(whr) : null, vw, miss([['Taille', waist != null], ['Hüfte', hip != null]]));

    // Körperfett nach Navy-Formel (Männer)
    var bf = null, vf = null;
    if (waist != null && neck != null && hcm && waist > neck) {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(hcm)) - 450;
      vf = bf < 6 ? {t:'Zu wenig', c:'warn'} : bf < 14 ? {t:'Sportlich', c:'ok'} : bf < 18 ? {t:'Gut', c:'ok'} : bf < 25 ? {t:'Normal', c:'ok'} : {t:'Zu hoch', c:'bad'};
    }
    row('Körperfett (Schätzung)', 'Normal: 18 bis 24 Prozent, sportlich: 6 bis 17', bf != null ? Math.round(bf) + ' %' : null, vf,
      miss([['Taille', waist != null], ['Hals', neck != null], ['Größe', hcm]]) || (waist != null && neck != null && waist <= neck ? 'Taille muss größer als Hals sein' : ''));

    $('#m-note').textContent = 'Aus deinen neuesten Werten berechnet. Richtwerte für Männer, eine Orientierung und keine Diagnose. BMI und Körperfett-Formel überschätzen bei viel Muskelmasse. Am aussagekräftigsten ist der Verlauf über mehrere Wochen.';
  }
  function renderWStats(list){
    var box = $('#w-stats'); box.replaceChildren();
    var today = todayStr(), last = list[list.length - 1];
    var lo = dayNum(today) - 6;
    var xs = list.filter(function(w){ var n = dayNum(w.date); return n >= lo && n <= dayNum(today); }).map(function(w){ return w.kg; });
    var avg = xs.length ? xs.reduce(function(a,b){ return a + b; }, 0) / xs.length : null;
    var goal = profile && typeof profile.goalKg === 'number' ? profile.goalKg : null;
    var goalSub = '';
    if (goal != null && last) {
      var d = last.kg - goal;
      goalSub = Math.abs(d) < 0.1 ? 'Ziel erreicht' : fmt1(Math.abs(d)) + (d > 0 ? ' kg über Ziel' : ' kg unter Ziel');
    }
    box.append(
      stat('Aktuell', last ? fmt1(last.kg) + ' kg' : '–', last ? fmtDate(last.date) : ''),
      stat('Ø 7 Tage', avg != null ? fmt1(avg) + ' kg' : '–', xs.length ? xs.length + (xs.length === 1 ? ' Messung' : ' Messungen') : ''),
      stat('Start', list.length ? fmt1(list[0].kg) + ' kg' : '–', list.length ? fmtDate(list[0].date) : ''),
      stat('Ziel', goal != null ? fmt1(goal) + ' kg' : '–', goalSub));
  }
  function renderChart(list){
    var box = $('#w-chart'); box.replaceChildren();
    $('#w-legend').hidden = !list.length;
    if (!list.length) {
      box.append(h('p', {class:'hint', text:'Noch kein Gewicht eingetragen. Trage unten dein erstes ein.'}));
      return;
    }
    var today = todayStr();
    var endN = Math.max(dayNum(today), dayNum(list[list.length - 1].date));
    var startN = Math.max(dayNum(list[0].date), endN - 59);
    var pts = list.filter(function(w){ return dayNum(w.date) >= startN; });
    var goal = profile && typeof profile.goalKg === 'number' ? profile.goalKg : null;
    var vals = pts.map(function(w){ return w.kg; });
    if (goal != null) vals.push(goal);
    var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), raw = mx - mn;
    var step = raw <= 5 ? 1 : raw <= 12 ? 2 : raw <= 30 ? 5 : 10;
    var lo = Math.floor((mn - 0.5) / step) * step, hi = Math.ceil((mx + 0.5) / step) * step;
    var W = Math.max(280, Math.min(box.clientWidth || 340, 640)), H = 170, L = 38, R = 12, T = 10, B = 26;
    var span = Math.max(endN - startN, 1);
    function X(n){ return L + (n - startN) / span * (W - L - R); }
    function Y(v){ return T + (hi - v) / (hi - lo) * (H - T - B); }
    function text(x, y, anchor, color, s){
      var t = svg('text', {x:x, y:y, 'text-anchor':anchor, style:'fill:' + color + ';font:10px ' + 'sans-serif'});
      t.textContent = s; return t;
    }
    var sv = svg('svg', {viewBox:'0 0 ' + W + ' ' + H, width:W, height:H, role:'img', 'aria-label':'Gewichtsverlauf der letzten Wochen'});
    for (var v = lo; v <= hi + 0.001; v += step) {
      var y = Y(v);
      sv.append(svg('line', {x1:L, x2:W - R, y1:y, y2:y, style:'stroke:var(--line)', 'stroke-width':1}));
      sv.append(text(L - 6, y + 3, 'end', 'var(--ink-2)', fmtNum(+v.toFixed(1))));
    }
    if (goal != null) {
      var gy = Y(goal);
      sv.append(svg('line', {x1:L, x2:W - R, y1:gy, y2:gy, style:'stroke:var(--ok)', 'stroke-width':1.5, 'stroke-dasharray':'5 4'}));
      sv.append(text(W - R - 2, gy - 4, 'end', 'var(--ok)', 'Ziel ' + fmtNum(goal)));
    }
    if (pts.length >= 2) {
      var d = pts.map(function(w, k){
        var n = dayNum(w.date);
        var win = list.filter(function(o){ var m = dayNum(o.date); return m <= n && m >= n - 6; });
        var a = win.reduce(function(s, o){ return s + o.kg; }, 0) / win.length;
        return (k ? 'L' : 'M') + X(n).toFixed(1) + ' ' + Y(a).toFixed(1);
      }).join(' ');
      sv.append(svg('path', {d:d, fill:'none', style:'stroke:var(--plate-a)', 'stroke-width':2.2, 'stroke-linejoin':'round', 'stroke-linecap':'round'}));
    }
    pts.forEach(function(w){
      sv.append(svg('circle', {cx:X(dayNum(w.date)).toFixed(1), cy:Y(w.kg).toFixed(1), r:2.6, style:'fill:var(--ink-2)'}));
    });
    sv.append(text(L, H - 8, 'start', 'var(--ink-2)', fmtDM(fromDayNum(startN))));
    sv.append(text(W - R, H - 8, 'end', 'var(--ink-2)', fmtDM(fromDayNum(endN))));
    box.append(sv);
  }
  function renderWList(list){
    var ul = $('#w-list'); ul.replaceChildren();
    var rev = list.slice().reverse();
    var show = wAll ? rev : rev.slice(0, 10);
    show.forEach(function(w, i){
      var idx = list.length - 1 - i;
      var delta = idx > 0 ? w.kg - list[idx - 1].kg : null;
      ul.append(h('li', {},
        h('button', {class:'brow', type:'button', onclick:function(){ loadW(w.date, true); }},
          h('span', {class:'bd'}, h('b', {text:fmtDateFull(w.date)}), w.note ? h('small', {text:w.note}) : null),
          h('b', {class:'bv', text:fmt1(w.kg) + ' kg'}),
          h('span', {class:'bdelta', text:delta == null ? '' : fmtSigned(delta)}))));
    });
    var more = $('#w-more');
    more.hidden = rev.length <= 10;
    more.textContent = wAll ? 'Weniger anzeigen' : 'Alle ' + rev.length + ' anzeigen';
  }
  function renderWForm(){
    $('#w-save').textContent = wEdit ? 'Aktualisieren' : 'Speichern';
    $('#w-cancel').hidden = !wEdit;
    $('#w-del').hidden = !(wEdit && weights[wEdit]);
    $('#w-del').textContent = wDelArm ? 'Wirklich löschen?' : 'Löschen';
    var wd = $('#w-date');
    if (!wd.value && wd !== document.activeElement) wd.value = todayStr();
  }
  function resetWForm(){
    wEdit = null; wDelArm = false;
    $('#w-date').value = todayStr(); $('#w-kg').value = ''; $('#w-note').value = '';
    $('#w-err').textContent = '';
  }
  function loadW(date, scroll){
    var w = weights[date];
    if (!w) { wEdit = null; renderWForm(); return; }
    wEdit = date; wDelArm = false;
    $('#w-date').value = date;
    $('#w-kg').value = fmtNum(w.kg);
    $('#w-note').value = w.note || '';
    $('#w-err').textContent = '';
    renderWForm();
    if (scroll) $('#w-form').scrollIntoView({block:'center'});
  }
  async function saveW(ev){
    ev.preventDefault();
    if (!db) return;
    var date = $('#w-date').value, kg = parseNum($('#w-kg').value), err = $('#w-err');
    if (!date) { err.textContent = 'Bitte ein Datum wählen.'; return; }
    if (kg == null || kg === undefined || kg < 20 || kg > 400) { err.textContent = 'Bitte ein Gewicht zwischen 20 und 400 kg eingeben.'; return; }
    err.textContent = '';
    var doc = {date:date, kg:kg, note:$('#w-note').value.trim(), ts:Date.now()};
    setStatus('saving');
    try {
      await db.doc('weights/' + date).set(doc);
      weights[date] = doc;
      resetWForm(); renderAll(); setStatus('saved');
    } catch (e) { setStatus('error'); }
  }
  async function delW(){
    if (!db || !wEdit) return;
    if (!wDelArm) { wDelArm = true; renderWForm(); return; }
    var date = wEdit;
    setStatus('saving');
    try {
      await db.doc('weights/' + date).delete();
      delete weights[date];
      resetWForm(); renderAll(); setStatus('saved');
    } catch (e) { setStatus('error'); }
  }


  // ---------- Schritte ----------
  function stepsList(){
    return Object.keys(food).map(function(id){ return {date:id, n:food[id] && food[id].steps}; })
      .filter(function(x){ return typeof x.n === 'number' && x.n >= 0; })
      .sort(function(a,b){ return a.date.localeCompare(b.date); });
  }
  function fmtSteps(n){ return Math.round(n).toLocaleString('de-DE'); }
  function renderSStats(list){
    var box = $('#s-stats'); box.replaceChildren();
    var today = todayStr(), lo = dayNum(today) - 6;
    var wk = list.filter(function(x){ var n = dayNum(x.date); return n >= lo && n <= dayNum(today); });
    var base = wk.length ? wk : list.slice(-7), isWk = wk.length > 0;
    var avg = base.length ? base.reduce(function(a, x){ return a + x.n; }, 0) / base.length : null;
    var last = list[list.length - 1];
    var lo30 = dayNum(today) - 29;
    var m30 = list.filter(function(x){ return dayNum(x.date) >= lo30; });
    var best = m30.length ? m30.reduce(function(a, x){ return x.n > a.n ? x : a; }, m30[0]) : null;
    box.append(
      stat('Zuletzt', last ? fmtSteps(last.n) : '–', last ? fmtDate(last.date) : ''),
      stat(isWk ? 'Ø 7 Tage' : 'Ø letzte Einträge', avg != null ? fmtSteps(avg) : '–', base.length ? base.length + (base.length === 1 ? ' Tag' : ' Tage') + (isWk ? '' : ', älter als 7 Tage') : ''),
      stat('Bester Tag', best ? fmtSteps(best.n) : '–', best ? fmtDate(best.date) + ' (30 Tage)' : ''),
      stat('Einträge', list.length ? String(list.length) : '–', list.length ? 'seit ' + fmtDate(list[0].date) : ''));
  }
  function renderSChart(list){
    var box = $('#s-chart'); box.replaceChildren();
    $('#s-legend').hidden = !list.length;
    if (!list.length) {
      box.append(h('p', {class:'hint', text:'Noch keine Schritte eingetragen. Trage unten deine ersten ein.'}));
      return;
    }
    var today = todayStr();
    var endN = Math.max(dayNum(today), dayNum(list[list.length - 1].date));
    var startN = Math.max(dayNum(list[0].date), endN - 59);
    var pts = list.filter(function(x){ return dayNum(x.date) >= startN; });
    var vals = pts.map(function(x){ return x.n; });
    var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals), raw = mx - mn;
    var step = raw <= 4000 ? 1000 : raw <= 10000 ? 2000 : 5000;
    var lo = Math.max(0, Math.floor((mn - 300) / step) * step), hi = Math.ceil((mx + 300) / step) * step;
    var W = Math.max(280, Math.min(box.clientWidth || 340, 640)), H = 170, L = 42, R = 12, T = 10, B = 26;
    var span = Math.max(endN - startN, 1);
    function X(n){ return L + (n - startN) / span * (W - L - R); }
    function Y(v){ return T + (hi - v) / (hi - lo) * (H - T - B); }
    function text(x, y, anchor, color, s){
      var t = svg('text', {x:x, y:y, 'text-anchor':anchor, style:'fill:' + color + ';font:10px sans-serif'});
      t.textContent = s; return t;
    }
    var sv = svg('svg', {viewBox:'0 0 ' + W + ' ' + H, width:W, height:H, role:'img', 'aria-label':'Schrittverlauf der letzten Wochen'});
    for (var v = lo; v <= hi + 0.001; v += step) {
      var y = Y(v);
      sv.append(svg('line', {x1:L, x2:W - R, y1:y, y2:y, style:'stroke:var(--line)', 'stroke-width':1}));
      sv.append(text(L - 6, y + 3, 'end', 'var(--ink-2)', fmtSteps(v)));
    }
    function avgAt(n){
      var win = list.filter(function(o){ var m = dayNum(o.date); return m <= n && m >= n - 6; });
      return win.length ? win.reduce(function(s2, o){ return s2 + o.n; }, 0) / win.length : null;
    }
    function pathOf(arr){
      var d = '', prevN = null;
      arr.forEach(function(q){
        d += (prevN != null && q.n - prevN <= 3 ? 'L' : 'M') + X(q.n).toFixed(1) + ' ' + Y(q.v).toFixed(1) + ' ';
        prevN = q.n;
      });
      return /L/.test(d) ? d : '';
    }
    // dünne Verbindung der Tageswerte
    var dd = pathOf(pts.map(function(x){ return {n:dayNum(x.date), v:x.n}; }));
    if (dd) sv.append(svg('path', {d:dd, fill:'none', style:'stroke:var(--ink-2);opacity:.45', 'stroke-width':1, 'stroke-linejoin':'round'}));
    // gleitender Ø der letzten 7 Tage, bis heute weitergeführt
    var av = pts.map(function(x){ var n = dayNum(x.date); return {n:n, v:avgAt(n)}; });
    var lastN = dayNum(pts[pts.length - 1].date);
    if (dayNum(today) > lastN) { var at = avgAt(dayNum(today)); if (at != null) av.push({n:dayNum(today), v:at}); }
    var da = pathOf(av);
    if (da) sv.append(svg('path', {d:da, fill:'none', style:'stroke:var(--plate-a)', 'stroke-width':2.2, 'stroke-linejoin':'round', 'stroke-linecap':'round'}));
    pts.forEach(function(x){
      sv.append(svg('circle', {cx:X(dayNum(x.date)).toFixed(1), cy:Y(x.n).toFixed(1), r:2.6, style:'fill:var(--ink-2)'}));
    });
    sv.append(text(L, H - 8, 'start', 'var(--ink-2)', fmtDM(fromDayNum(startN))));
    sv.append(text(W - R, H - 8, 'end', 'var(--ink-2)', fmtDM(fromDayNum(endN))));
    box.append(sv);
  }
  function renderSList(list){
    var ul = $('#s-list'); ul.replaceChildren();
    var rev = list.slice().reverse();
    var show = sAll ? rev : rev.slice(0, 10);
    show.forEach(function(x, i){
      var idx = list.length - 1 - i;
      var delta = idx > 0 ? x.n - list[idx - 1].n : null;
      ul.append(h('li', {},
        h('button', {class:'brow', type:'button', onclick:function(){ loadS(x.date, true); }},
          h('span', {class:'bd'}, h('b', {text:fmtDateFull(x.date)})),
          h('b', {class:'bv', text:fmtSteps(x.n)}),
          h('span', {class:'bdelta', text:delta == null ? '' : (delta > 0 ? '+' : delta < 0 ? '−' : '±') + fmtSteps(Math.abs(delta))}))));
    });
    var more = $('#s-more');
    more.hidden = rev.length <= 10;
    more.textContent = sAll ? 'Weniger anzeigen' : 'Alle ' + rev.length + ' anzeigen';
  }
  function renderSForm(){
    $('#s-save').textContent = sEdit ? 'Aktualisieren' : 'Speichern';
    $('#s-cancel').hidden = !sEdit;
    var has = sEdit && food[sEdit] && typeof food[sEdit].steps === 'number';
    $('#s-del').hidden = !has;
    $('#s-del').textContent = sDelArm ? 'Wirklich löschen?' : 'Löschen';
    var sd = $('#s-date');
    if (!sd.value && sd !== document.activeElement) sd.value = todayStr();
  }
  function resetSForm(){
    sEdit = null; sDelArm = false;
    $('#s-date').value = todayStr(); $('#s-n').value = '';
    $('#s-err').textContent = '';
  }
  function loadS(date, scroll){
    var f = food[date];
    if (!f || typeof f.steps !== 'number') { sEdit = null; renderSForm(); return; }
    sEdit = date; sDelArm = false;
    $('#s-date').value = date;
    $('#s-n').value = String(f.steps);
    $('#s-err').textContent = '';
    renderSForm();
    if (scroll) $('#s-form').scrollIntoView({block:'center'});
  }
  async function saveS(ev){
    ev.preventDefault();
    if (!db) return;
    var date = $('#s-date').value, n = parseNum($('#s-n').value.replace(/\./g, '')), err = $('#s-err');
    if (!date) { err.textContent = 'Bitte ein Datum wählen.'; return; }
    if (n == null || n === undefined || n > 100000) { err.textContent = 'Bitte Schritte zwischen 0 und 100.000 eingeben.'; return; }
    err.textContent = '';
    var v = Math.round(n);
    await writeFood(date, function(cur){ cur.steps = v; });
    resetSForm(); renderAll();
  }
  async function delS(){
    if (!db || !sEdit) return;
    if (!sDelArm) { sDelArm = true; renderSForm(); return; }
    var date = sEdit;
    await writeFood(date, function(cur){ delete cur.steps; });
    resetSForm(); renderAll();
  }

  function renderGSum(list){
    var box = $('#g-sum'); box.replaceChildren();
    if (!list.length) {
      box.append(h('p', {class:'hint', text:'Noch keine Umfänge gemessen. Miss zum Start alle Werte.'}));
      return;
    }
    var rows = [];
    GORDER.forEach(function(k){
      var have = list.filter(function(g){ return typeof g[k] === 'number'; });
      if (!have.length) return;
      var first = have[0], last = have[have.length - 1];
      rows.push(h('tr', {},
        h('td', {text:GNAMES[k]}),
        h('td', {text:fmt1(first[k])}),
        h('td', {text:fmt1(last[k])}),
        h('td', {text: have.length > 1 ? fmtSigned(last[k] - first[k]) : '–'})));
    });
    box.append(h('table', {class:'gtable'},
      h('thead', {}, h('tr', {}, h('th', {text:'Maß (cm)'}), h('th', {text:'Start'}), h('th', {text:'Zuletzt'}), h('th', {text:'Δ'}))),
      h('tbody', {}, rows)));
  }
  function renderGList(list){
    var ul = $('#g-list'); ul.replaceChildren();
    var rev = list.slice().reverse();
    var show = gAll ? rev : rev.slice(0, 6);
    show.forEach(function(g){
      var n = GORDER.filter(function(k){ return typeof g[k] === 'number'; }).length;
      ul.append(h('li', {},
        h('button', {class:'brow', type:'button', onclick:function(){ loadG(g.date, true); }},
          h('span', {class:'bd'}, h('b', {text:fmtDateFull(g.date)}), g.note ? h('small', {text:g.note}) : null),
          h('span', {class:'bv', text:n + (n === 1 ? ' Wert' : ' Werte')}),
          h('span', {class:'bdelta', text:''}))));
    });
    var more = $('#g-more');
    more.hidden = rev.length <= 6;
    more.textContent = gAll ? 'Weniger anzeigen' : 'Alle ' + rev.length + ' anzeigen';
  }
  function renderGForm(list){
    $('#g-save').textContent = gEdit ? 'Aktualisieren' : 'Speichern';
    $('#g-cancel').hidden = !gEdit;
    $('#g-del').hidden = !(gEdit && girths[gEdit]);
    $('#g-del').textContent = gDelArm ? 'Wirklich löschen?' : 'Löschen';
    var gd = $('#g-date');
    if (!gd.value && gd !== document.activeElement) gd.value = todayStr();
    var last = list[list.length - 1];
    GORDER.forEach(function(k){
      var el = $('#g-' + k);
      var lv = null;
      for (var j = list.length - 1; j >= 0; j--) { if (typeof list[j][k] === 'number') { lv = list[j][k]; break; } }
      el.placeholder = lv != null ? fmt1(lv) : 'cm';
    });
    var nm = nextMeasure();
    $('#g-next').textContent = nm ? nextText(nm) + '.' : 'Noch keine Messung. Miss zum Start alle Werte, danach alle ' + interval() + ' Tage.';
  }
  function resetGForm(){
    gEdit = null; gDelArm = false;
    $('#g-date').value = todayStr(); $('#g-note').value = '';
    GORDER.forEach(function(k){ $('#g-' + k).value = ''; $('#g-' + k).removeAttribute('aria-invalid'); });
    $('#g-err').textContent = '';
  }
  function loadG(date, scroll){
    var g = girths[date];
    if (!g) { gEdit = null; renderAll(); return; }
    gEdit = date; gDelArm = false;
    $('#g-date').value = date;
    $('#g-note').value = g.note || '';
    GORDER.forEach(function(k){ $('#g-' + k).value = typeof g[k] === 'number' ? fmtNum(g[k]) : ''; });
    $('#g-err').textContent = '';
    renderAll();
    if (scroll) $('#g-form').scrollIntoView({block:'start'});
  }
  async function saveG(ev){
    ev.preventDefault();
    if (!db) return;
    var date = $('#g-date').value, err = $('#g-err');
    if (!date) { err.textContent = 'Bitte ein Datum wählen.'; return; }
    var doc = {date:date, ts:Date.now(), note:$('#g-note').value.trim()}, bad = false, count = 0;
    GORDER.forEach(function(k){
      var el = $('#g-' + k), v = parseNum(el.value);
      if (v === undefined || (v !== null && (v < 5 || v > 300))) { el.setAttribute('aria-invalid', 'true'); bad = true; return; }
      el.removeAttribute('aria-invalid');
      if (v !== null) { doc[k] = v; count++; }
    });
    if (bad) { err.textContent = 'Bitte nur Zahlen in cm eingeben (zwischen 5 und 300).'; return; }
    if (!count) { err.textContent = 'Trage mindestens einen Wert ein.'; return; }
    err.textContent = '';
    setStatus('saving');
    try {
      await db.doc('girths/' + date).set(doc);
      girths[date] = doc;
      resetGForm(); renderAll(); setStatus('saved');
    } catch (e) { setStatus('error'); }
  }
  async function delG(){
    if (!db || !gEdit) return;
    if (!gDelArm) { gDelArm = true; renderAll(); return; }
    var date = gEdit;
    setStatus('saving');
    try {
      await db.doc('girths/' + date).delete();
      delete girths[date];
      resetGForm(); renderAll(); setStatus('saved');
    } catch (e) { setStatus('error'); }
  }

  function renderProfile(){
    var map = [['#p-height','heightCm'],['#p-goal','goalKg'],['#p-interval','intervalDays'],['#p-steps','stepsBase']];
    map.forEach(function(m){
      var el = $(m[0]);
      if (el === document.activeElement) return;
      var v = profile ? profile[m[1]] : null;
      if (m[1] === 'intervalDays') el.value = fmtNum(typeof v === 'number' ? v : 14);
      else el.value = typeof v === 'number' ? fmtNum(v) : '';
    });
    var bd = $('#p-birth');
    if (bd !== document.activeElement) bd.value = profile && typeof profile.birthDate === 'string' ? profile.birthDate : '';
    var pc = $('#p-pace');
    if (pc !== document.activeElement) pc.value = String(profile && typeof profile.paceKg === 'number' ? profile.paceKg : 0.4);
  }
  async function saveProfileRaw(field, v){
    if (!db) return;
    var next = Object.assign({}, profile);
    if (v === null || v === '') delete next[field]; else next[field] = v;
    next.edited = Date.now();
    setStatus('saving');
    try { await db.doc('body/profile').set(next); profile = next; renderAll(); setStatus('saved'); }
    catch (e) { setStatus('error'); }
  }
  async function saveProfile(field, el){
    if (!db) return;
    var v = parseNum(el.value), err = $('#p-err');
    var ranges = {heightCm:[100, 250, 'Größe in cm (100 bis 250)'], goalKg:[30, 250, 'Zielgewicht in kg (30 bis 250)'], intervalDays:[1, 90, 'Tage zwischen zwei Messungen (1 bis 90)'], stepsBase:[0, 40000, 'Schritte pro Tag (0 bis 40000)']};
    var r = ranges[field];
    if (v === undefined || (v !== null && (v < r[0] || v > r[1]))) {
      el.setAttribute('aria-invalid', 'true'); err.textContent = 'Bitte gültig eingeben: ' + r[2] + '.'; return;
    }
    el.removeAttribute('aria-invalid'); err.textContent = '';
    if ((field === 'intervalDays' || field === 'stepsBase') && v !== null) v = Math.round(v);
    var next = Object.assign({}, profile);
    if (v === null) delete next[field]; else next[field] = v;
    next.edited = Date.now();
    setStatus('saving');
    try { await db.doc('body/profile').set(next); profile = next; renderAll(); setStatus('saved'); }
    catch (e) { setStatus('error'); }
  }

  function renderBody(){
    var wl = weightList(), gl = girthList();
    renderProfile();
    applyVisibility();
    renderMetrics(wl, gl);
    renderWStats(wl); renderChart(wl); renderWList(wl); renderWForm();
    var sl = stepsList();
    renderSStats(sl); renderSChart(sl); renderSList(sl); renderSForm();
    renderGSum(gl); renderGList(gl); renderGForm(gl);
  }
  function applyVisibility(){
    $('#tab-E').hidden = !SHOW_NUTRI;
    $('#tab-K').style.gridColumn = SHOW_NUTRI ? 'span 3' : 'span 2';
    var kz = document.querySelector('[aria-labelledby="h-kz"]'), um = document.querySelector('[aria-labelledby="h-um"]');
    if (kz) kz.hidden = !SHOW_GIRTH;
    if (um) um.hidden = !SHOW_GIRTH;
    [['#p-birth', SHOW_NUTRI], ['#p-steps', SHOW_NUTRI], ['#p-pace', SHOW_NUTRI], ['#p-interval', SHOW_GIRTH]].forEach(function(m){
      var f = $(m[0]).closest('.fld'); if (f) f.hidden = !m[1];
    });
  }
  function buildGirthFields(){
    var root = $('#g-fields');
    GROUPS.forEach(function(g){
      root.append(h('fieldset', {class:'gset'},
        h('legend', {text:g.g}),
        h('div', {class:'gcols c' + g.cols}, g.f.map(function(f){
          return h('div', {class:'fld'},
            h('label', {for:'g-' + f.k, text:f.n}),
            h('input', {class:'fin', id:'g-' + f.k, type:'text', inputmode:'decimal', autocomplete:'off', placeholder:'cm', 'aria-label':f.a + ' in Zentimetern'}));
        }))));
    });
  }

  // ---------- Ernährung: Rechenlogik ----------
  function fmtI(n){ return Math.round(n).toLocaleString('de-DE'); }
  function avgOf(a){ return a.reduce(function(x, y){ return x + y; }, 0) / a.length; }
  function slope(pts){
    var n = pts.length; if (n < 2) return null;
    var mx = avgOf(pts.map(function(p){ return p.x; })), my = avgOf(pts.map(function(p){ return p.y; }));
    var sxx = 0, sxy = 0;
    pts.forEach(function(p){ sxx += (p.x - mx) * (p.x - mx); sxy += (p.x - mx) * (p.y - my); });
    return sxx ? sxy / sxx : null;
  }
  function ageNow(){
    var b = profile && profile.birthDate;
    if (typeof b === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(b)) {
      var bp = b.split('-').map(Number), tp = todayStr().split('-').map(Number);
      var a = tp[0] - bp[0];
      if (tp[1] < bp[1] || (tp[1] === bp[1] && tp[2] < bp[2])) a--;
      if (a > 0 && a < 120) return a;
    }
    return profile && typeof profile.age === 'number' ? profile.age : null;
  }
  function sumDay(d){
    var f = food[d], k = 0, p = 0, n = 0;
    if (f && f.items) Object.keys(f.items).forEach(function(id){ var it = f.items[id]; k += +it.kcal || 0; p += +it.p || 0; n++; });
    return {kcal:k, p:p, n:n, steps:(f && typeof f.steps === 'number') ? f.steps : null};
  }
  // Schätzt Grundumsatz, Erhaltungsbedarf und Tagesziel aus Profil, Gewicht, Schritten und Einträgen.
  function calc(){
    var today = todayStr(), tn = dayNum(today);
    var wl = weightList().filter(function(w){ return w.date <= today; });
    var out = {ready:false, missing:[]};
    var recent = wl.filter(function(w){ return dayNum(w.date) >= tn - 6; });
    var kg = wl.length ? avgOf((recent.length ? recent : [wl[wl.length - 1]]).map(function(w){ return w.kg; })) : null;
    var cm = profile && typeof profile.heightCm === 'number' ? profile.heightCm : null, age = ageNow();
    if (kg == null) out.missing.push('Gewicht');
    if (!cm) out.missing.push('Größe');
    if (age == null) out.missing.push('Geburtsdatum');
    if (out.missing.length) return out;

    var bmr = 10 * kg + 6.25 * cm - 5 * age + 5;
    var st = [], i;
    for (i = 1; i <= 7; i++) { var f = food[fromDayNum(tn - i)]; if (f && typeof f.steps === 'number' && f.steps > 0) st.push(f.steps); }
    var base = profile && typeof profile.stepsBase === 'number' && profile.stepsBase > 0 ? profile.stepsBase : 5000;
    var stepsAvg = st.length ? avgOf(st) : base;
    var pal = Math.min(1.55, Math.max(1.2, 1.2 + (stepsAvg - 3000) / 30000));
    var formula = bmr * pal + 3 * 280 / 7;

    var intakes = [];
    for (i = 1; i <= 28; i++) { var s = sumDay(fromDayNum(tn - i)); if (s.kcal >= 800) intakes.push(s.kcal); }
    var pts = wl.filter(function(w){ return dayNum(w.date) >= tn - 28; }).map(function(w){ return {x:dayNum(w.date), y:w.kg}; });
    var span = pts.length ? pts[pts.length - 1].x - pts[0].x : 0;
    var sl = pts.length >= 5 && span >= 10 ? slope(pts) : null;
    var learned = null, wgt = 0, flag = '';
    if (intakes.length >= 10 && sl != null) {
      learned = avgOf(intakes) - sl * 7700;
      if (learned < bmr || learned > formula * 1.4) { flag = 'implausibel'; learned = null; }
      else wgt = Math.min(0.85, (intakes.length - 7) / 21) * Math.min(1, span / 21);
    }
    var tdee = learned != null ? formula * (1 - wgt) + learned * wgt : formula;

    var goalKg = profile && typeof profile.goalKg === 'number' ? profile.goalKg : null;
    var pace = profile && typeof profile.paceKg === 'number' ? profile.paceKg : 0.4;
    var build = goalKg != null && kg <= goalKg + 0.3;
    var deficit = build ? 0 : Math.min(pace * 7700 / 7, tdee * 0.25);
    var target = Math.round((build ? tdee + 200 : Math.max(tdee - deficit, bmr)) / 50) * 50;
    var prot = Math.round(1.8 * kg / 5) * 5, fat = Math.round(0.8 * kg / 5) * 5;
    var carb = Math.max(0, Math.round((target - prot * 4 - fat * 9) / 4 / 5) * 5);
    var stepGoal = Math.min(10000, Math.max(6000, Math.round((stepsAvg + 1500) / 500) * 500));

    // Wochen-Check: tatsächlicher Verlauf der letzten 14 Tage gegen dein Tempo
    var p14 = wl.filter(function(w){ return dayNum(w.date) >= tn - 14; }).map(function(w){ return {x:dayNum(w.date), y:w.kg}; });
    var s14 = p14.length >= 5 && (p14[p14.length - 1].x - p14[0].x) >= 7 ? slope(p14) : null;
    var rate = s14 != null ? -s14 * 7 : null;
    var logged14 = 0;
    for (i = 1; i <= 14; i++) { if (sumDay(fromDayNum(tn - i)).kcal >= 800) logged14++; }
    var chk;
    if (rate == null) chk = {t:'Noch zu wenig Daten', c:'na', msg:'Wiege dich möglichst täglich und trag dein Essen ein. Nach etwa 2 Wochen bewertet die App deinen Verlauf.'};
    else if (build) chk = {t:'Aufbau', c:'ok', msg:'Du bist am Ziel. Das Ziel enthält jetzt einen kleinen Überschuss für Muskelaufbau. Verlauf: ' + fmtSigned(-rate) + ' kg pro Woche.'};
    else if (rate > pace + 0.35) chk = {t:'Zu schnell', c:'warn', msg:'Du nimmst mit ' + fmt1(rate) + ' kg pro Woche schneller ab als geplant. Iss etwa 150 kcal mehr, damit du Muskeln hältst.'};
    else if (rate >= pace - 0.2) chk = {t:'Im Plan', c:'ok', msg:'Du nimmst mit ' + fmt1(rate) + ' kg pro Woche ab, das passt zu deinem Tempo.'};
    else if (rate > 0.05) chk = {t:'Etwas langsam', c:'warn', msg:'Du nimmst mit ' + fmt1(rate) + ' kg pro Woche ab. Prüfe Schritte und ob alles eingetragen ist. Die App passt dein Ziel mit den Daten automatisch an.'};
    else chk = {t:'Kein Abnehmen', c:'warn', msg:'Dein Gewicht stagniert oder steigt (' + fmtSigned(-rate) + ' kg pro Woche). Prüfe ehrlich, ob Snacks und Getränke eingetragen sind und wie viele Schritte du gehst.'};
    if (rate != null && logged14 < 7) chk.msg += ' Hinweis: In den letzten 14 Tagen hast du nur an ' + logged14 + ' Tagen Essen eingetragen.';
    if (span < 21 && rate != null) chk.msg += ' In den ersten Wochen schwankt das Gewicht stark durch Wasser, nimm es noch nicht zu ernst.';

    return {ready:true, kg:kg, bmr:bmr, pal:pal, stepsAvg:stepsAvg, stepsN:st.length, formula:formula, learned:learned, wgt:wgt, flag:flag,
      days:intakes.length, trend:sl != null ? sl * 7 : null, tdee:tdee, build:build, deficit:deficit, target:target,
      prot:prot, fat:fat, carb:carb, stepGoal:stepGoal, chk:chk, pace:pace};
  }

  // ---------- Ernährung: Schreiben ----------
  async function writeFood(date, fn){
    if (!db) return;
    var cur = food[date] ? JSON.parse(JSON.stringify(food[date])) : {date:date, items:{}};
    if (!cur.items) cur.items = {};
    fn(cur);
    cur.date = date; cur.ts = Date.now();
    setStatus('saving');
    try { await db.doc('food/' + date).set(cur); food[date] = cur; renderAll(); setStatus('saved'); }
    catch (e) { setStatus('error'); }
  }
  function addItem(it){
    var id = 'i' + Date.now().toString(36) + Math.floor(Math.random() * 1296).toString(36);
    return writeFood(nDate || todayStr(), function(cur){ it.ts = Date.now(); cur.items[id] = it; });
  }
  function delItem(id){ return writeFood(nDate || todayStr(), function(cur){ delete cur.items[id]; }); }
  async function addFood(ev){
    ev.preventDefault();
    var err = $('#n-err'), kEl = $('#n-kcal'), pEl = $('#n-p');
    var k = parseNum(kEl.value), p = parseNum(pEl.value);
    if (k === undefined || k === null || k <= 0 || k > 5000) { kEl.setAttribute('aria-invalid', 'true'); err.textContent = 'Bitte Kalorien eingeben (1 bis 5000).'; return; }
    if (p === undefined || (p !== null && p > 400)) { pEl.setAttribute('aria-invalid', 'true'); err.textContent = 'Eiweiß in Gramm eingeben (0 bis 400).'; return; }
    kEl.removeAttribute('aria-invalid'); pEl.removeAttribute('aria-invalid'); err.textContent = '';
    var name = $('#n-name').value.trim();
    await addItem({n:name || 'Eintrag', kcal:k, p:p || 0});
    $('#n-name').value = ''; kEl.value = ''; pEl.value = '';
  }
  async function saveSteps(e){
    var v = parseNum(e.target.value);
    if (v === undefined || (v !== null && v > 100000)) { e.target.setAttribute('aria-invalid', 'true'); return; }
    e.target.removeAttribute('aria-invalid');
    await writeFood(nDate || todayStr(), function(cur){ if (v === null) delete cur.steps; else cur.steps = Math.round(v); });
  }
  async function addMeal(ev){
    ev.preventDefault();
    if (!db) return;
    var err = $('#m-err'), name = $('#m-name').value.trim();
    var k = parseNum($('#m-kcal').value), p = parseNum($('#m-p').value);
    if (!name) { err.textContent = 'Bitte einen Namen eingeben.'; return; }
    if (k === undefined || k === null || k <= 0 || k > 5000) { err.textContent = 'Bitte kcal pro Portion eingeben (1 bis 5000).'; return; }
    if (p === undefined || (p !== null && p > 400)) { err.textContent = 'Eiweiß in Gramm eingeben (0 bis 400).'; return; }
    err.textContent = '';
    var id = 'm' + Date.now().toString(36);
    var doc = {name:name, kcal:k, p:p || 0, cat:$('#m-cat').value, ts:Date.now()};
    setStatus('saving');
    try {
      await db.doc('meals/' + id).set(doc); meals[id] = doc;
      $('#m-name').value = ''; $('#m-kcal').value = ''; $('#m-p').value = '';
      renderAll(); setStatus('saved');
    } catch (e2) { setStatus('error'); }
  }
  async function delMeal(id){
    if (!db) return;
    if (mDelArm !== id) { mDelArm = id; renderAll(); return; }
    mDelArm = null;
    setStatus('saving');
    try { await db.doc('meals/' + id).delete(); delete meals[id]; renderAll(); setStatus('saved'); }
    catch (e) { setStatus('error'); }
  }
  async function togglePlanCheck(key, on){
    if (!db) return;
    var next = Object.assign({}, planChecks);
    if (on) next[key] = true; else delete next[key];
    planChecks = next;
    renderAll();
    try { await db.doc('plan/checks').set(next); } catch (e) { setStatus('error'); }
  }

  // ---------- Ernährung: Anzeige ----------
  function barRow(label, val, goal, unit, cls, sub){
    var pct = goal ? Math.min(100, val / goal * 100) : 0;
    return h('div', {class:'prow'},
      h('div', {class:'ptop'}, h('b', {text:label}), h('span', {text:fmtI(val) + (goal ? ' / ' + fmtI(goal) : '') + ' ' + unit})),
      h('div', {class:'bar ' + (cls || ''), role:'progressbar', 'aria-label':label, 'aria-valuemin':'0', 'aria-valuemax':String(goal || 0), 'aria-valuenow':String(Math.round(val))},
        h('i', {style:'width:' + pct + '%'})),
      sub ? h('small', {text:sub}) : null);
  }
  function renderNutri(){
    var today = todayStr();
    if (!nDate) nDate = today;
    var dEl = $('#n-date'); if (dEl !== document.activeElement) dEl.value = nDate;
    $('#n-today').hidden = nDate === today;
    var day = sumDay(nDate), g = calc();
    var sEl = $('#n-steps'); if (sEl !== document.activeElement) sEl.value = day.steps != null ? String(day.steps) : '';

    var pr = $('#n-prog'); pr.replaceChildren();
    var ready = g.ready;
    pr.append(
      barRow('Kalorien', day.kcal, ready ? g.target : null, 'kcal', ready && day.kcal > g.target + 50 ? 'warn' : '',
        ready ? (day.kcal <= g.target ? 'Noch ' + fmtI(g.target - day.kcal) + ' kcal übrig' : fmtI(day.kcal - g.target) + ' kcal drüber') : 'Das Ziel erscheint, sobald Gewicht, Größe und Alter bekannt sind.'),
      barRow('Eiweiß', day.p, ready ? g.prot : null, 'g', ready && day.p >= g.prot ? 'ok' : '',
        ready ? (day.p >= g.prot ? 'Ziel erreicht' : 'Noch ' + fmtI(g.prot - day.p) + ' g bis zum Ziel') : ''),
      barRow('Schritte', day.steps || 0, ready ? g.stepGoal : null, '', ready && (day.steps || 0) >= g.stepGoal ? 'ok' : '',
        day.steps == null ? 'Noch nicht eingetragen' : ''));

    var chips = $('#n-chips'); chips.replaceChildren();
    var ml = mealList();
    ml.forEach(function(m){
      chips.append(h('button', {class:'chipbtn', type:'button', onclick:function(){ addItem({n:m.name, kcal:m.kcal, p:m.p}); }},
        h('b', {text:m.name}), h('small', {text:fmtI(m.kcal) + ' kcal · ' + fmtI(m.p) + ' g'})));
    });
    chips.hidden = !ml.length;

    var ul = $('#n-items'); ul.replaceChildren();
    var f = food[nDate], ids = f && f.items ? Object.keys(f.items).sort(function(a, b){ return (f.items[a].ts || 0) - (f.items[b].ts || 0); }) : [];
    ids.forEach(function(id){
      var it = f.items[id];
      ul.append(h('li', {class:'irow'},
        h('span', {class:'in', text:it.n || 'Eintrag'}),
        h('span', {class:'iv', text:fmtI(it.kcal) + ' kcal · ' + fmtI(it.p || 0) + ' g'}),
        h('button', {class:'ix', type:'button', 'aria-label':(it.n || 'Eintrag') + ' löschen', text:'×', onclick:function(){ delItem(id); }})));
    });

    renderGoal(g);
    renderWeek(g);
    renderMeals(ml);
    renderPlan();
  }
  function renderGoal(g){
    var box = $('#n-goal'); box.replaceChildren();
    if (!g.ready) {
      box.append(h('p', {class:'hint', style:'margin:0', text:'Es fehlt: ' + g.missing.join(', ') + '. Trag es im Körper-Tab ein (Profil & Ziele und Gewicht).'}));
      return;
    }
    box.append(h('div', {class:'goalhead'},
      h('span', {class:'big', text:fmtI(g.target)}), h('span', {class:'u', text:'kcal pro Tag'}),
      h('span', {class:'vchip ' + (g.build ? 'ok' : 'na'), text:g.build ? 'Aufbau' : 'Abnehmen'})));
    var basis;
    if (g.flag) basis = 'Deine Einträge passen nicht zur Formel (vermutlich fehlen Mahlzeiten). Es zählt nur die Formel.';
    else if (g.wgt > 0) basis = 'Formel plus deine Daten (' + g.days + ' Tage Essen und Gewichtstrend), Anteil deiner Daten ' + Math.round(g.wgt * 100) + ' %.';
    else basis = 'Nur Formel. Nach etwa 10 Tagen mit Essen und Gewicht lernt die App deinen echten Bedarf.';
    var rows = [
      ['Eiweiß', fmtI(g.prot) + ' g'], ['Fett', 'ca. ' + fmtI(g.fat) + ' g'], ['Kohlenhydrate', 'ca. ' + fmtI(g.carb) + ' g'],
      ['Schritte', 'mindestens ' + fmtI(g.stepGoal)],
      ['Grundumsatz', fmtI(g.bmr) + ' kcal'], ['Erhaltungsbedarf', fmtI(g.tdee) + ' kcal'],
      ['Gewichtstrend', g.trend != null ? fmtSigned(g.trend) + ' kg pro Woche' : 'noch offen']
    ];
    var cells = [];
    rows.forEach(function(r){ cells.push(h('dt', {text:r[0]}), h('dd', {text:r[1]})); });
    box.append(h('dl', {class:'kv'}, cells));
    box.append(h('p', {class:'hint', style:'margin:0;font-size:13px', text:basis}));
    box.append(h('div', {class:'status'}, h('span', {class:'vchip ' + g.chk.c, text:g.chk.t}), h('p', {text:g.chk.msg})));
    box.append(det('calc', false, 'So rechnet die App', h('ul', {},
      h('li', {text:'Grundumsatz nach Mifflin-St-Jeor aus Gewicht (Schnitt der letzten 7 Tage), Größe und Alter.'}),
      h('li', {text:'Aktivität aus deinen Schritten (' + fmtI(g.stepsAvg) + ' pro Tag, ' + (g.stepsN ? 'Schnitt aus ' + g.stepsN + ' Tagen' : 'Startwert aus deinem Profil') + ') plus 3 Trainings pro Woche.'}),
      h('li', {text:'Sobald genug Daten da sind, rechnet sie rückwärts: durchschnittliche Kalorien minus Gewichtstrend mal 7.700 kcal pro kg. Das gewichtet sie mit mehr Daten immer stärker.'}),
      h('li', {text:'Ziel = Erhaltungsbedarf minus Defizit für dein Tempo (höchstens 25 Prozent, nie unter dem Grundumsatz). Am Zielgewicht wechselt es auf einen kleinen Überschuss.'}),
      h('li', {text:'Eiweiß: 1,8 g pro kg Körpergewicht. Fett: 0,8 g pro kg. Der Rest sind Kohlenhydrate.'}),
      h('li', {text:'Das sind Schätzungen, keine medizinische Beratung.'}))));
  }
  function renderWeek(g){
    var box = $('#n-week'); box.replaceChildren();
    var tn = dayNum(todayStr()), rows = [];
    for (var i = 0; i < 7; i++) {
      var d = fromDayNum(tn - i), s = sumDay(d);
      var kc = s.n ? h('span', {class:g.ready && s.kcal > g.target + 100 ? 'badc' : '', text:fmtI(s.kcal)}) : '–';
      var pc = s.n ? h('span', {class:g.ready ? (s.p >= g.prot * 0.9 ? 'okc' : 'badc') : '', text:fmtI(s.p) + ' g'}) : '–';
      rows.push(h('tr', {}, h('td', {text:fmtDate(d)}), h('td', {}, kc), h('td', {}, pc), h('td', {text:s.steps != null ? fmtI(s.steps) : '–'})));
    }
    box.append(h('table', {class:'gtable'},
      h('thead', {}, h('tr', {}, h('th', {text:'Tag'}), h('th', {text:'kcal'}), h('th', {text:'Eiweiß'}), h('th', {text:'Schritte'}))),
      h('tbody', {}, rows)));
  }
  var CATS = ['Frühstück', 'Hauptgericht', 'Snack'];
  function mealList(){
    return Object.keys(meals).map(function(id){ return Object.assign({id:id}, meals[id]); })
      .filter(function(m){ return typeof m.kcal === 'number' && m.name; })
      .sort(function(a, b){
        var ca = CATS.indexOf(a.cat), cb = CATS.indexOf(b.cat);
        return (ca < 0 ? 9 : ca) - (cb < 0 ? 9 : cb) || a.name.localeCompare(b.name, 'de');
      });
  }
  function renderMeals(ml){
    var box = $('#n-meals'); box.replaceChildren();
    if (!ml.length) { box.append(h('p', {class:'hint', style:'margin:0', text:'Noch keine Gerichte gespeichert.'})); return; }
    CATS.concat([null]).forEach(function(cat){
      var group = ml.filter(function(m){ return cat ? m.cat === cat : CATS.indexOf(m.cat) < 0; });
      if (!group.length) return;
      box.append(h('p', {class:'sub3', text:cat || 'Weitere'}));
      box.append(h('ul', {class:'ilist'}, group.map(function(m){
        var arm = mDelArm === m.id;
        return h('li', {class:'irow'},
          h('span', {class:'in', text:m.name}),
          h('span', {class:'iv', text:fmtI(m.kcal) + ' kcal · ' + fmtI(m.p || 0) + ' g'}),
          h('button', {class:'ix' + (arm ? ' arm' : ''), type:'button', 'aria-label':m.name + ' löschen', text:arm ? 'Sicher?' : '×', onclick:function(){ delMeal(m.id); }}));
      })));
    });
  }
  var openMap = {};
  // Aufklappbarer Bereich, der seinen Zustand über das Neuzeichnen hinweg behält
  function det(key, defOpen, title){
    var isOpen = key in openMap ? openMap[key] : defOpen;
    var d = h('details', {class:'pdet', open:isOpen ? true : null}, h('summary', {text:title}));
    for (var i = 3; i < arguments.length; i++) {
      [].concat(arguments[i]).forEach(function(k){ if (k) d.append(k); });
    }
    d.addEventListener('toggle', function(){ openMap[key] = d.open; });
    return d;
  }
  function boldLine(s){
    var i = s.indexOf(': ');
    if (i > 0 && i < 34) return [h('b', {text:s.slice(0, i + 1)}), ' ' + s.slice(i + 2)];
    return s;
  }
  function renderPlan(){
    var box = $('#n-plan'); box.replaceChildren();
    if (!planDoc) { box.append(h('p', {class:'hint', style:'margin:0', text:'Noch kein Plan hinterlegt.'})); return; }
    if (planDoc.title) box.append(h('p', {style:'margin:0;font-weight:600', text:planDoc.title + (planDoc.updated ? ' (Stand ' + planDoc.updated + ')' : '')}));
    if (planDoc.intro) box.append(h('p', {class:'hint', style:'margin:0', text:planDoc.intro}));
    (planDoc.sections || []).forEach(function(sec, si){
      box.append(det('s' + si, false, sec.h,
        sec.text ? h('p', {text:sec.text}) : null,
        h('ul', {}, (sec.lines || []).map(function(l){ return h('li', {}, boldLine(l)); }))));
    });
    var total = 0, got = 0, shop = planDoc.shopping || [];
    shop.forEach(function(st){ (st.items || []).forEach(function(it){ var p = +it.p || 0; total += p; if (planChecks[it.k]) got += p; }); });
    if (shop.length) {
      box.append(h('p', {class:'sub3', text:'Einkaufsliste'}));
      shop.forEach(function(st){
        var sub = (st.items || []).reduce(function(a, it){ return a + (+it.p || 0); }, 0);
        box.append(det('shop-' + st.store, true, st.store + ' · ca. ' + fmt2(sub) + ' €',
          h('ul', {class:'shop'}, (st.items || []).map(function(it){
            var on = !!planChecks[it.k];
            return h('li', {}, h('label', {},
              h('input', {type:'checkbox', checked:on ? true : null, 'aria-label':it.n, onchange:function(e){ togglePlanCheck(it.k, e.target.checked); }}),
              h('span', {class:on ? 'done' : ''}, it.n, it.q ? h('small', {text:it.q}) : null),
              h('span', {class:'pr', text:it.p != null ? fmt2(it.p) + ' €' : ''})));
          }))));
      });
      var b = planDoc.budget;
      box.append(h('div', {class:'total'}, h('span', {text:'Gesamt ca.'}), h('span', {text:fmt2(total) + ' €' + (b ? ' (Budget ' + b.min + ' bis ' + b.max + ' €)' : '')})));
    }
    (planDoc.notes || []).forEach(function(n){ box.append(h('p', {class:'hint', style:'margin:0;font-size:13px', text:n})); });
  }

  // ---------- Gruppe, Tag und Woche wählen ----------
  function lastOf(pred){
    var done = doneSessions();
    for (var i = done.length - 1; i >= 0; i--) if (pred(done[i])) return done[i];
    return null;
  }
  function nextDayForGroup(p){
    var days = progReady() ? program.meta.days.filter(function(d){ return d.group === p; }) : [];
    if (!days.length) return null;
    var last = lastOf(function(x){ return x.prog && days.some(function(d){ return d.id === x.prog.d; }); });
    if (!last) return days[0].id;
    var li = days.findIndex(function(d){ return d.id === last.prog.d; });
    return days[(li + 1) % days.length].id;
  }
  function renderPicker(c){
    var box = $('#picker'), dbx = $('#daypick');
    var show = view === 'T' && progReady() && (c.mode === 'pick' || c.mode === 'preview');
    box.hidden = !show; dbx.hidden = !(show && selPlan);
    if (!show) { box.replaceChildren(); dbx.replaceChildren(); return; }
    box.replaceChildren();
    box.dataset.n = String(progGroups().length);
    progGroups().forEach(function(grp){
      var p = grp.id;
      var last = lastOf(function(x){ return x.prog && x.plan === p; });
      box.append(h('button', {class:'plan p' + p, type:'button', 'aria-pressed':String(selPlan === p),
          onclick:function(){ selPlan = p; selDay = nextDayForGroup(p); notice = ''; renderAll(); }},
        h('span', {class:'plate', text:plate(p), 'aria-hidden':'true'}),
        h('span', {class:'ptxt'}, h('b', {text:grp.name}), h('small', {text:last ? 'zuletzt ' + fmtDate(last.date) : 'noch nie'}))));
    });
    // Hat die Gruppe nur einen Tag mit demselben Namen (Upper, Lower, Full Body), ist die Tag-Auswahl überflüssig
    var gdays = selPlan ? program.meta.days.filter(function(d){ return d.group === selPlan; }) : [];
    var gname = selPlan ? (progGroups().filter(function(x){ return x.id === selPlan; })[0] || {}).name : '';
    dbx.hidden = !(selPlan && gdays.length && !(gdays.length === 1 && gdays[0].name === gname));
    dbx.replaceChildren();
    if (selPlan) {
      gdays.forEach(function(d){
        var last = lastOf(function(x){ return x.prog && x.prog.d === d.id; });
        dbx.append(h('button', {class:'plan dayb p' + selPlan, type:'button', 'aria-pressed':String(selDay === d.id),
            onclick:function(){ selDay = d.id; notice = ''; renderAll(); }},
          h('span', {class:'ptxt'}, h('b', {text:d.name}),
            h('small', {text: d.focus || (last ? 'zuletzt ' + fmtDate(last.date) : 'noch nie')}),
            d.focus && last ? h('small', {text:'zuletzt ' + fmtDate(last.date)}) : null)));
      });
    }
  }
  var weekSig = '';
  function renderWeekbar(c){
    var box = $('#weekbar');
    var show = view === 'T' && multiWeek() && (c.mode === 'pick' || c.mode === 'preview');
    box.hidden = !show;
    if (!show) { weekSig = ''; box.replaceChildren(); return; }
    var w = curWeek(), sig = program.meta.importedAt + '|' + w;
    if (sig === weekSig) return;
    weekSig = sig;
    box.replaceChildren();
    var sel = h('select', {id:'weeksel', class:'fin', 'aria-label':'Woche wählen', onchange:function(e){ setWeek(+e.target.value); }},
      program.meta.weeks.map(function(x){
        var bl = blockOf(x);
        return h('option', {value:String(x), selected: x === w ? true : null, text:'Woche ' + x + (bl ? ' · Block ' + bl : '')});
      }));
    box.append(h('label', {for:'weeksel', text:'Woche'}), sel);
    var note = program.meta.wnotes && program.meta.wnotes[w];
    if (note) box.append(h('p', {class:'wnote', text:note}));
  }
  async function setWeek(w){
    planState = Object.assign({}, planState, {week:w});
    renderAll();
    if (!db) return;
    setStatus('saving');
    try { await db.doc('plan/state').update({week:w}); setStatus('saved'); } catch (e) { setStatus('error'); }
  }

  // ---------- Programm einlesen ----------
  async function importProgram(file){
    if (!file || progBusy) return;
    if (blockedByRun()) { var f0 = $('#prog-file'); if (f0) f0.value = ''; return; }
    progBusy = true; presetArm = ''; progMsg = 'Lese Datei „' + String(file.name || '').slice(0, 60) + '“ …'; progKind = 'busy'; renderAll();
    var prev = progSource();
    try {
      if (!window.__xlsx || !window.__localdb) throw Object.assign(new Error('Einlesen ist hier nicht verfügbar.'), {user:true});
      var res = await window.__xlsx.parseProgram(await file.arrayBuffer());
      await window.__localdb.replaceCollection('program', res.docs);
      if (prev !== 'xlsx') await resetPlanState();
      pgDelArm = false;
      var parts = [];
      if (res.weeks > 1) parts.push(res.weeks + ' Wochen');
      parts.push(res.days + (res.days === 1 ? ' Tag' : ' Tage'), res.exercises + ' Übungen');
      progMsg = 'Programm eingelesen: ' + parts.join(', ') + '. Du findest es im Reiter Training.'; progKind = 'ok';
      if (view === 'T') notice = 'Programm eingelesen: ' + parts.join(', ') + '.';
    } catch (e) {
      progMsg = e && e.user ? e.message : 'Das Einlesen hat nicht geklappt. Es wurde nichts geändert. (' + errText(e) + ')'; progKind = 'err';
    } finally {
      progBusy = false; var fi = $('#prog-file'); if (fi) fi.value = '';
      renderAll(); showProgMsg();
    }
  }
  function errText(e){ return String(e && (e.name ? e.name + ': ' : '') + (e && e.message ? e.message : e)).slice(0, 120); }
  // Wer das Programm wechselt, startet ohne alte Auslassungen und mit Woche 1. Verlauf und Einheiten bleiben immer erhalten.
  function progSource(){ return progReady() ? (program.meta.preset || 'xlsx') : ''; }
  async function resetPlanState(){
    skips = {}; planState = {}; wpPick = {}; selPlan = null; selDay = null;
    if (!db) return;
    try { await db.doc('plan/skip').set({}); await db.doc('plan/state').set({}); } catch (e) { /* nicht kritisch */ }
  }
  function blockedByRun(){
    if (!runningSession()) return false;
    presetArm = ''; progMsg = 'Beende zuerst dein laufendes Training. Danach kannst du das Programm wechseln.'; progKind = 'err';
    renderAll(); showProgMsg(); return true;
  }
  // Wurde eine Voreinstellung in der App geändert, passt sich das gespeicherte Programm beim Start an (nie im laufenden Training)
  var presetRefreshing = false;
  function refreshPreset(){
    if (presetRefreshing || !loaded || !progReady() || !program.meta.preset || !window.__presets || !window.__localdb || runningSession()) return;
    var cur = window.__presets.list.filter(function(x){ return x.id === program.meta.preset; })[0];
    if (!cur || cur.rev === (program.meta.rev || 1)) return;
    presetRefreshing = true;
    window.__localdb.replaceCollection('program', window.__presets.build(cur.id).docs)
      .then(function(){ if (view === 'T') notice = 'Voreinstellung „' + cur.name + '“ wurde aktualisiert.'; })
      .catch(function(){})
      .then(function(){ presetRefreshing = false; renderAll(); });
  }
  async function applyPreset(id){
    if (progBusy || blockedByRun()) return;
    progBusy = true; presetArm = ''; progMsg = ''; progKind = '';
    var prev = progSource();
    try {
      if (!window.__presets || !window.__localdb) throw Object.assign(new Error('Voreinstellungen sind hier nicht verfügbar.'), {user:true});
      var res = window.__presets.build(id);
      await window.__localdb.replaceCollection('program', res.docs);
      if (prev !== id) await resetPlanState();
      pgDelArm = false;
      var name = res.docs['program/meta'].title;
      progMsg = 'Programm „' + name + '“ gewählt: ' + res.days + ' Tage, ' + res.exercises + ' Übungen. Du findest es im Reiter Training.'; progKind = 'ok';
      if (view === 'T') notice = 'Programm „' + name + '“ gewählt.';
    } catch (e) {
      progMsg = e && e.user ? e.message : 'Das Programm konnte nicht gespeichert werden. Es wurde nichts geändert. (' + errText(e) + ')'; progKind = 'err';
    } finally {
      progBusy = false; renderAll(); showProgMsg();
    }
  }
  // Auswahl der Voreinstellungen. Gibt es schon ein Programm, kommt vor dem Wechsel eine Rückfrage.
  function presetList(m){
    var cur = m && m.preset || '';
    var list = window.__presets ? window.__presets.list : [];
    return h('div', {class:'presets'}, list.map(function(p){
      var active = cur === p.id;
      if (presetArm === p.id) {
        return h('div', {class:'preset armed'}, h('b', {text:p.name}),
          h('small', {text:'Zu diesem Programm wechseln? Deine bisherigen Einheiten bleiben erhalten.'}),
          h('span', {class:'confirm'},
            h('button', {class:'btn-sec', type:'button', text:'Wechseln', onclick:function(){ applyPreset(p.id); }}),
            h('button', {class:'link-btn', type:'button', text:'Abbrechen', onclick:function(){ presetArm = ''; renderAll(); }})));
      }
      return h('button', {class:'preset', type:'button', disabled:(progBusy || active) ? true : null, 'aria-pressed':String(active),
          onclick:function(){ if (blockedByRun()) return; if (m) { presetArm = p.id; renderAll(); } else applyPreset(p.id); }},
        h('b', {text:p.name + (active ? ' (aktiv)' : '')}), h('small', {text:p.info}));
    }));
  }
  // Meldung in den sichtbaren Bereich holen, damit sie nicht unten in der Karte untergeht
  function showProgMsg(){
    var ms = document.querySelectorAll('.pmsg');
    for (var i = 0; i < ms.length; i++) {
      if (ms[i].offsetParent !== null && ms[i].scrollIntoView) { ms[i].scrollIntoView({block:'nearest'}); return; }
    }
  }
  function msgEl(){
    return h('p', {class:'pmsg ' + progKind, role:progKind === 'err' ? 'alert' : 'status', hidden:progMsg ? null : true, text:progMsg});
  }
  async function removeProgram(){
    try { await window.__localdb.replaceCollection('program', {}); progMsg = 'Programm entfernt. Deine bisherigen Einheiten bleiben erhalten.'; progKind = 'ok'; }
    catch (e) { progMsg = 'Entfernen hat nicht geklappt.'; progKind = 'err'; }
    pgDelArm = false; renderAll();
  }
  function pickFile(){ var fi = $('#prog-file'); if (fi && !progBusy) fi.click(); }
  function renderProgBox(c){
    var box = $('#progbox');
    var show = view === 'T' && progLoaded && !progReady() && c.mode !== 'run';
    box.hidden = !show;
    if (!show) { box.replaceChildren(); return; }
    box.replaceChildren(
      h('div', {class:'bh'}, h('h3', {text:'Programm wählen'})),
      h('div', {class:'bb'},
        h('p', {class:'hint', style:'margin-top:0', text:'Wähle ein fertiges Programm. Es liegt nur auf diesem Gerät und lässt sich später im Reiter Körper wechseln.'}),
        presetList(null),
        h('p', {class:'hint sep', text:'Oder lies deine eigene Excel-Datei ein:'}),
        h('div', {class:'bactions'}, h('button', {class:'btn-sec', type:'button', disabled:progBusy ? true : null, onclick:pickFile, text:'Excel-Datei wählen'})),
        h('p', {class:'hint', text:'Unterstützt werden „Pure Bodybuilding – PPL“ und die Vorlage „Trainingsplan Upper, Lower, Full Body“. Die Datei wird nur auf diesem Gerät gelesen und nirgends hochgeladen.'}),
        msgEl()));
  }
  function renderProgCard(){
    var box = $('#progcard');
    if (!box) return;
    var m = progReady() ? program.meta : null, kids = [];
    var nd = m ? m.days.length + (m.days.length === 1 ? ' Tag' : ' Tage') : '';
    kids.push(h('p', {class:'hint', style:'margin-top:0', text: m
      ? (m.preset ? 'Aktiv: Voreinstellung „' + m.title + '“ (' + nd + ').' : 'Eigene Excel eingelesen am ' + fmtDateFull(todayOf(m.importedAt)) + ': ' + (m.weeks.length > 1 ? m.weeks.length + ' Wochen, ' : '') + nd + '.') + ' Das Programm liegt nur auf diesem Gerät und ist nicht im Backup.'
      : 'Noch kein Programm gewählt. Das Programm liegt nur auf diesem Gerät und ist nicht im Backup.'}));
    kids.push(presetList(m));
    kids.push(h('p', {class:'hint sep', text:'Oder lies deine eigene Excel-Datei ein:'}));
    var acts = [h('button', {class:'btn-sec', type:'button', disabled:progBusy ? true : null, onclick:pickFile, text: m && !m.preset ? 'Neu einlesen' : 'Excel-Datei wählen'})];
    if (m && !pgDelArm) acts.push(h('button', {class:'link-btn', type:'button', text:'Programm entfernen', onclick:function(){ pgDelArm = true; renderAll(); }}));
    if (m && pgDelArm) acts.push(h('span', {class:'confirm'}, h('span', {text:'Programm wirklich entfernen?'}),
      h('button', {class:'danger', type:'button', text:'Entfernen', onclick:removeProgram}),
      h('button', {class:'link-btn', type:'button', text:'Abbrechen', onclick:function(){ pgDelArm = false; renderAll(); }})));
    kids.push(h('div', {class:'bactions'}, acts));
    kids.push(msgEl());
    box.replaceChildren(h('div', {class:'bh'}, h('h3', {text:'Programm'})), h('div', {class:'bb'}, kids));
  }
  function todayOf(ts){ var d = new Date(ts || Date.now()); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); }

  // ---------- Rendern ----------
  function nextText(done, c){
    if (!loaded) return '';
    if (c.run) return 'Training ' + sname(c.run) + ' läuft seit ' + hhmm(c.run.startedAt) + ' Uhr.';
    if (!progReady()) return progLoaded ? 'Wähle zuerst ein Programm, dann kannst du loslegen.' : '';
    var last = lastOf(function(x){ return !!x.prog; });
    if (!last) return multiWeek() ? 'Stelle die Woche ein, wähle Gruppe und Tag und starte dein Training.' : 'Wähle deine Einheit und starte dein Training.';
    var order = program.meta.days.map(function(d){ return d.id; }), li = order.indexOf(last.prog.d);
    var t = 'Zuletzt ' + sname(last) + ' (' + fmtDate(last.date) + ').';
    if (li >= 0) {
      var multi = multiWeek(), nw = multi ? last.prog.w + (li + 1 >= order.length ? 1 : 0) : program.meta.weeks[0];
      if (program.meta.weeks.indexOf(nw) >= 0) t += ' Als Nächstes laut Programm: ' + dayMeta(order[(li + 1) % order.length]).name + (multi ? ' in Woche ' + nw : '') + '.';
      else t += ' Das war der letzte Tag des Programms.';
    }
    return t;
  }

  function renderAll(){
    var c = ctx();
    var done = doneSessions();

    var next = $('#next');
    next.textContent = nextText(done, c);

    applyVisibility();
    $('#app').dataset.plan = view === 'H' ? (c.plan || 'H') : view === 'T' ? (c.plan || selPlan || 'T') : view;
    ['T','H','K','E'].forEach(function(v){ $('#tab-' + v).setAttribute('aria-pressed', String(v === view)); });
    var tdy = sumDay(todayStr());
    $('#cnt-E').textContent = tdy.kcal > 0 ? fmtI(tdy.kcal) + ' kcal heute' : 'Essen · Schritte · Ziel';
    $('#cnt-T').textContent = c.run ? 'läuft: ' + (c.run.dname || pname(c.run.plan)) : (progReady() ? (selDay && dayMeta(selDay) ? dayMeta(selDay).name : (multiWeek() ? 'Woche ' + curWeek() : 'Einheit wählen')) : 'Programm wählen');
    renderPicker(c);
    renderWeekbar(c);
    renderProgBox(c);
    $('#cnt-H').textContent = loaded && done.length ? done.length + (done.length === 1 ? ' Einheit' : ' Einheiten') : 'Alle Trainings';
    var wl = weightList();
    $('#cnt-K').textContent = wl.length ? fmt1(wl[wl.length - 1].kg) + ' kg' : 'Gewicht · Schritte';

    renderReminders(c);

    var nt = $('#notice');
    nt.hidden = !(notice && (c.mode === 'preview' || c.mode === 'pick'));
    nt.textContent = notice;

    // laufendes Training
    var isRun = c.mode === 'run';
    $('#runbar').hidden = !isRun;
    if (isRun) {
      $('#rb-label').textContent = sname(c.run) + ' läuft';
      $('#since').textContent = c.run && c.run.startedAt ? 'Start ' + hhmm(c.run.startedAt) + ' Uhr' : '';
      updateTimer();
    }

    // Startbox
    var sbx = $('#startbox'), ready = progReady();
    sbx.hidden = !(ready && (c.mode === 'preview' || c.mode === 'pick'));
    if (ready && (c.mode === 'preview' || c.mode === 'pick')) {
      var st = $('#start-text'), nb = $('#new'), gb = $('#goto');
      nb.hidden = true; gb.hidden = true;
      if (!db) st.textContent = 'Der Speicher ist hier nicht verfügbar.';
      else if (!loaded) st.textContent = 'Lade Einheiten …';
      else if (c.mode === 'pick') st.textContent = multiWeek()
        ? 'Wähle oben die Woche, eine Gruppe und den Tag. Danach siehst du die Übungen und kannst das Training starten.'
        : 'Wähle oben deine Einheit. Danach siehst du die Übungen und kannst das Training starten.';
      else {
        var chosen = previewList().length, dmn = dayMeta(selDay);
        st.textContent = chosen
          ? 'Bereit für ' + dmn.name + (multiWeek() ? ' (Woche ' + curWeek() + ')' : '') + ' mit ' + chosen + (chosen === 1 ? ' Übung' : ' Übungen') + '? Mit dem Start beginnt die Zeit zu laufen.'
          : 'Es ist keine Übung im Plan. Setze oben bei mindestens einer Übung das grüne Häkchen.';
        nb.hidden = false; nb.textContent = '+ Neues Training ' + dmn.name; nb.disabled = !chosen;
      }
    }

    // Datum, Dauer, Löschen
    var showMeta = c.mode === 'run' || c.mode === 'edit';
    $('#meta').hidden = !showMeta;
    if (showMeta) {
      var sd = sessions[c.id] || {};
      var di = $('#date');
      if (di !== document.activeElement) di.value = sd.date || '';
      $('#dur-wrap').hidden = c.mode !== 'edit';
      if (c.mode === 'edit') {
        var du = $('#dur');
        if (du !== document.activeElement) du.value = sd.durationSec != null ? String(Math.round(sd.durationSec / 60)) : '';
      }
      $('#del').textContent = c.mode === 'run' ? 'Training verwerfen' : 'Einheit löschen';
      $('#confirm-text').textContent = c.mode === 'run' ? 'Training wirklich verwerfen?' : 'Wirklich löschen?';
      $('#del-yes').textContent = c.mode === 'run' ? 'Verwerfen' : 'Löschen';
      $('#del').hidden = confirmDel;
      $('#confirm').hidden = !confirmDel;
    }

    // Verlauf
    $('#histlist').hidden = c.mode !== 'list';
    if (c.mode === 'list') renderHist();

    var showDh = c.mode === 'view' || c.mode === 'edit';
    $('#dhead').hidden = !showDh;
    if (showDh) {
      var s = sessions[c.id];
      $('#dhead').className = 'dhead p' + s.plan;
      $('#dh-plate').textContent = plate(s.plan);
      $('#dh-title').textContent = sname(s) + ' vom ' + fmtDateFull(s.date);
      $('#dh-badge').textContent = c.mode === 'view' ? 'Anschauen' : 'Bearbeiten';
      $('#dh-sub').textContent = 'Nr. ' + (s.n || '?') + (s.durationSec != null ? ' · Dauer ' + fmtMin(s.durationSec) : '');
    }

    // Buttons unten
    $('#endbox').hidden = !(isRun || showDh);
    $('#end').hidden = !(isRun && !confirmEnd);
    $('#endconfirm').hidden = !(isRun && confirmEnd);
    $('#fertig').hidden = !showDh;

    // Körper
    $('#body').hidden = c.mode !== 'body';
    if (c.mode === 'body') { renderBody(); renderProgCard(); }
    $('#nutri').hidden = c.mode !== 'nutri';
    if (c.mode === 'nutri') renderNutri();
    renderCustom(c);

    if (cardKey(c) !== renderedKey) buildCards(c);
    syncValues(c);
    syncMeta(c);
  }

  // ---------- Daten ----------
  function onData(){
    var first = !loaded;
    loaded = true;
    if (first) refreshPreset();
    if (first && !userPicked) {
      var run = runningSession();
      if (run && PLANS[run.plan]) { view = 'T'; selPlan = run.plan; if (run.prog) selDay = run.prog.d; }
    }
    if (histId && !sessions[histId]) { histId = null; histMode = null; confirmDel = false; }
    if (histPick && !sessions[histPick]) histPick = null;
    renderAll();
  }
  async function newSession(){
    if (!db || view !== 'T' || !selPlan || !selDay || !progReady() || runningSession()) return;
    var plan = selPlan, dm = dayMeta(selDay), w = curWeek();
    var list = previewList();
    if (!dm || !list.length) return;
    var same = sortedAll().filter(function(s){ return s.plan === plan; });
    var n = (same.length ? Math.max.apply(null, same.map(function(s){ return s.n || 0; })) : 0) + 1;
    var id = plan.toLowerCase() + '-' + pad(n);
    var now = Date.now();
    var slots = list.map(function(ex){ return {k:ex.k, n:ex.n, i:ex.i, s:0, w:ex.warm}; });
    var data = {plan:plan, n:n, date:todayStr(), ts:now, startedAt:now, status:'running', entries:{}, edited:now,
      prog:multiWeek() ? {w:w, d:selDay} : {w:w, d:selDay, one:1}, dname:dm.name, slots:slots, exs:slots.map(function(x){ return x.k; })};
    if (dm.focus) data.dfocus = dm.focus;
    setStatus('saving');
    try {
      await db.doc('sessions/' + id).set(data);
      wpPick = {};
      sessions[id] = data; notice = ''; confirmDel = false; confirmEnd = false;
      renderAll(); setStatus('saved');
    } catch (e) { setStatus('error'); }
  }
  async function endSession(){
    var c = ctx();
    if (c.mode !== 'run' || !db) return;
    var id = c.id;
    setStatus('saving');
    try {
      await flush(id);
      if (pend[id]) { setStatus('error'); return; }
      var s = sessions[id], now = Date.now();
      var sec = Math.max(0, Math.round((now - (s.startedAt || now)) / 1000));
      var patch = {status:'done', endedAt:now, durationSec:sec, edited:now};
      await db.doc('sessions/' + id).update(patch);
      sessions[id] = Object.assign({}, s, patch);
      confirmEnd = false; confirmDel = false;
      notice = 'Training ' + sname(s) + ' gespeichert. Dauer: ' + fmtMin(sec) + '.';
      renderAll(); setStatus('saved');
    } catch (e) { setStatus('error'); }
  }
  async function delSession(){
    var c = ctx(), id = c.id;
    if (!id || !db) return;
    clearTimeout(timers[id]); delete pend[id];
    setStatus('saving');
    try {
      await db.doc('sessions/' + id).delete();
      delete sessions[id];
      confirmDel = false;
      if (c.mode === 'edit') { histId = null; histMode = null; }
      renderAll(); setStatus('saved');
    } catch (e) { setStatus('error'); }
  }

  // ---------- Verdrahtung ----------
  ['T','H','K','E'].forEach(function(v){
    $('#tab-' + v).addEventListener('click', function(){
      flushAll();
      view = v; userPicked = true; histId = null; histMode = null; histPick = null;
      var rn = runningSession(); if (v === 'T' && rn && PLANS[rn.plan]) selPlan = rn.plan;
      confirmDel = false; confirmEnd = false; notice = ''; progMsg = ''; progKind = ''; presetArm = '';
      renderAll();
    });
  });
  $('#new').addEventListener('click', newSession);
  $('#prog-file').addEventListener('change', function(e){ importProgram(e.target.files && e.target.files[0]); });
  $('#goto').addEventListener('click', function(){
    var run = runningSession();
    if (run && PLANS[run.plan]) { view = 'T'; selPlan = run.plan; userPicked = true; renderAll(); }
  });
  $('#end').addEventListener('click', function(){ confirmEnd = true; renderAll(); });
  $('#end-no').addEventListener('click', function(){ confirmEnd = false; renderAll(); });
  $('#end-yes').addEventListener('click', endSession);
  $('#fertig').addEventListener('click', closeHist);
  $('#del').addEventListener('click', function(){ confirmDel = true; renderAll(); });
  $('#del-no').addEventListener('click', function(){ confirmDel = false; renderAll(); });
  $('#del-yes').addEventListener('click', delSession);
  $('#date').addEventListener('change', function(e){
    var c = ctx();
    if (!c.id || !db || !e.target.value) return;
    setPending(c.id, '_date', '', '', e.target.value);
    flush(c.id);
  });
  $('#dur').addEventListener('change', function(e){
    var c = ctx();
    if (!c.id || !db || c.mode !== 'edit') return;
    var m = parseNum(e.target.value);
    if (m === undefined || m === null) { e.target.setAttribute('aria-invalid','true'); return; }
    e.target.removeAttribute('aria-invalid');
    setPending(c.id, '_dur', '', '', Math.round(m * 60));
    flush(c.id);
  });
  $('#cards').addEventListener('keydown', onKey);

  // Körper
  buildGirthFields();
  $('#p-height').addEventListener('change', function(e){ saveProfile('heightCm', e.target); });
  $('#p-goal').addEventListener('change', function(e){ saveProfile('goalKg', e.target); });
  $('#p-interval').addEventListener('change', function(e){ saveProfile('intervalDays', e.target); });
  $('#p-steps').addEventListener('change', function(e){ saveProfile('stepsBase', e.target); });
  $('#p-birth').addEventListener('change', function(e){
    var v = e.target.value;
    if (v && !(v >= '1920-01-01' && v <= todayStr())) { e.target.setAttribute('aria-invalid', 'true'); return; }
    e.target.removeAttribute('aria-invalid');
    saveProfileRaw('birthDate', v || null);
  });
  $('#p-pace').addEventListener('change', function(e){ saveProfileRaw('paceKg', Number(e.target.value)); });
  // Ernährung
  $('#n-prev').addEventListener('click', function(){ nDate = addDays(nDate || todayStr(), -1); renderAll(); });
  $('#n-next').addEventListener('click', function(){ nDate = addDays(nDate || todayStr(), 1); renderAll(); });
  $('#n-today').addEventListener('click', function(){ nDate = todayStr(); renderAll(); });
  $('#n-date').addEventListener('change', function(e){ if (e.target.value) { nDate = e.target.value; renderAll(); } });
  $('#n-steps').addEventListener('change', saveSteps);
  $('#n-form').addEventListener('submit', addFood);
  $('#m-form').addEventListener('submit', addMeal);
  $('#w-form').addEventListener('submit', saveW);
  $('#w-cancel').addEventListener('click', function(){ resetWForm(); renderAll(); });
  $('#w-del').addEventListener('click', delW);
  $('#w-more').addEventListener('click', function(){ wAll = !wAll; renderAll(); });
  $('#w-date').addEventListener('change', function(e){
    wDelArm = false;
    if (weights[e.target.value]) loadW(e.target.value, false); else { wEdit = null; renderWForm(); }
  });
  $('#s-form').addEventListener('submit', saveS);
  $('#s-cancel').addEventListener('click', function(){ resetSForm(); renderAll(); });
  $('#s-del').addEventListener('click', delS);
  $('#s-more').addEventListener('click', function(){ sAll = !sAll; renderAll(); });
  $('#s-date').addEventListener('change', function(e){
    sDelArm = false;
    if (food[e.target.value] && typeof food[e.target.value].steps === 'number') loadS(e.target.value, false); else { sEdit = null; renderSForm(); }
  });
  $('#g-form').addEventListener('submit', saveG);
  $('#g-cancel').addEventListener('click', function(){ resetGForm(); renderAll(); });
  $('#g-del').addEventListener('click', delG);
  $('#g-more').addEventListener('click', function(){ gAll = !gAll; renderAll(); });
  $('#g-date').addEventListener('change', function(e){
    gDelArm = false;
    if (girths[e.target.value]) loadG(e.target.value, false); else { gEdit = null; renderAll(); }
  });

  document.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'hidden') flushAll(); else { updateTimer(); renderAll(); }
  });
  window.addEventListener('pagehide', flushAll);
  var rzT = null;
  window.addEventListener('resize', function(){ clearTimeout(rzT); rzT = setTimeout(function(){ if (view === 'K') renderAll(); }, 150); });
  setInterval(updateTimer, 1000);

  renderAll();

  (async function(){
    try { db = (window.claude && window.claude.use) ? await window.claude.use('db') : null; } catch (e) { db = null; }
    if (!db) { setStatus('nodb'); renderAll(); return; }
    renderAll();
    loadTimer = setTimeout(function(){ if (!loaded) setStatus('slow'); }, 10000);
    db.collection('sessions').onSnapshot(function(snap){
      clearTimeout(loadTimer);
      var next = {};
      snap.docs.forEach(function(d){ next[d.id] = d.data(); });
      sessions = next;
      if (!snap.metadata.fromCache || loaded) { var k = $('#status').dataset.kind; if (k === 'wait' || k === 'slow') setStatus('ready'); }
      onData();
    }, function(){
      clearTimeout(loadTimer);
      setStatus('nodb');
    });
    db.collection('weights').onSnapshot(function(snap){
      var next = {};
      snap.docs.forEach(function(d){ next[d.id] = d.data(); });
      weights = next; wLoaded = true; renderAll();
    }, function(){});
    db.collection('girths').onSnapshot(function(snap){
      var next = {};
      snap.docs.forEach(function(d){ next[d.id] = d.data(); });
      girths = next; gLoaded = true; renderAll();
    }, function(){});
    db.doc('body/profile').onSnapshot(function(snap){
      profile = snap.exists ? (snap.data() || {}) : {}; pLoaded = true; renderAll();
    }, function(){});
    db.collection('food').onSnapshot(function(snap){
      var next = {};
      snap.docs.forEach(function(d){ next[d.id] = d.data(); });
      food = next; renderAll();
    }, function(){});
    db.collection('meals').onSnapshot(function(snap){
      var next = {};
      snap.docs.forEach(function(d){ next[d.id] = d.data(); });
      meals = next; renderAll();
    }, function(){});
    db.doc('plan/current').onSnapshot(function(snap){
      planDoc = snap.exists ? (snap.data() || null) : null; renderAll();
    }, function(){});
    db.collection('program').onSnapshot(function(snap){
      var m = null, w = {};
      snap.docs.forEach(function(d){
        var x = d.data();
        if (d.id === 'meta') m = x; else if (x && x.week) w[x.week] = x;
      });
      program = {meta:m, weeks:w}; progLoaded = true; wpCand = null;
      var grps = progGroups();
      grps.forEach(function(x){ if (!PLANS[x.id]) PLANS[x.id] = {name:x.name, ex:[]}; });
      if (selDay && !dayMeta(selDay)) selDay = null;
      if (selPlan && !runningSession() && !grps.some(function(x){ return x.id === selPlan; })) { selPlan = null; selDay = null; }
      renderAll(); refreshPreset();
    }, function(){ progLoaded = true; renderAll(); });
    db.doc('plan/state').onSnapshot(function(snap){
      planState = snap.exists ? (snap.data() || {}) : {}; renderAll();
    }, function(){});
    db.doc('plan/skip').onSnapshot(function(snap){
      skips = snap.exists ? (snap.data() || {}) : {}; renderAll();
    }, function(){});
    db.doc('plan/checks').onSnapshot(function(snap){
      planChecks = snap.exists ? (snap.data() || {}) : {}; renderAll();
    }, function(){});
  })();
})();
