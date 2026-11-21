/* Fertige Programme (Voreinstellungen). Eigene, allgemein übliche Einheiten für Einsteiger an Maschinen und Kabelzug.
   Alle Programme haben 3 Arbeitssätze je Übung, einen Wiederholungsbereich, Pause, zwei Ersatzübungen und einen Hinweis.
   Sie werden genauso gespeichert wie ein eingelesenes Excel-Programm, nur auf diesem Gerät. */
(function () {
  'use strict';

  // Übung: Ersatz 1, Ersatz 2, Hinweis
  var LIB = {
    'Leg Press': ['Hack Squat Machine', 'Smith Machine Squat', 'Füße schulterbreit, Knie zeigen in Richtung der Zehen, unten das Becken nicht abkippen.'],
    'Hack Squat Machine': ['Pendulum Squat', 'Smith Machine Squat', 'So tief, wie es sich gut anfühlt. Knie stabil, Fersen bleiben am Boden.'],
    'Smith Machine Squat': ['Leg Press', 'Goblet Squat', 'Füße leicht vor der Stange, Rücken gerade, Knie stabil.'],
    'Machine Chest Press': ['Cable Chest Press', 'Dumbbell Bench Press', 'Schulterblätter zusammen, Gewicht kontrolliert absenken (ca. 2 Sek.).'],
    'Cable Chest Press': ['Machine Chest Press', 'Incline Push-Up', 'Fester Stand, Rumpf angespannt, vor der Brust zusammenführen.'],
    'Pec Deck': ['Cable Fly', 'Dumbbell Fly', 'Butterfly für die Brust. An der Dual-Maschine Sitz und Griffe nach vorn einstellen, Ellbogen leicht gebeugt, unten die Dehnung spüren.'],
    'Lat Pulldown': ['Neutral-Grip Lat Pulldown', 'Assisted Pull-Up Machine', 'Zur oberen Brust ziehen, Ellbogen nach unten, nicht mit dem Rücken schwingen.'],
    'Neutral-Grip Lat Pulldown': ['Lat Pulldown', 'Assisted Pull-Up Machine', 'Ellbogen zu den Hüften führen.'],
    'Seated Cable Row': ['Chest-Supported Machine Row', 'One-Arm Dumbbell Row', 'Brust raus, Schulterblätter am Ende zusammenziehen.'],
    'Chest-Supported Machine Row': ['Seated Cable Row', 'One-Arm Dumbbell Row', 'Brust am Polster lassen, Schulterblätter zusammenziehen.'],
    'Straight-Arm Cable Pulldown': ['Lat Pulldown', 'Dumbbell Pullover', 'Arme fast gestreckt, aus dem breiten Rückenmuskel nach unten ziehen.'],
    'Machine Shoulder Press': ['Dumbbell Shoulder Press', 'Smith Machine Shoulder Press', 'Rücken am Polster lassen, nicht ins Hohlkreuz gehen.'],
    'Cable Lateral Raise': ['Dumbbell Lateral Raise', 'Machine Lateral Raise', 'Seitheben am Kabelzug. Leichtes Gewicht, Ellbogen leicht gebeugt, bis auf Schulterhöhe heben.'],
    'Reverse Pec Deck': ['Cable Reverse Fly', 'Face Pull', 'Butterfly rückwärts für die hintere Schulter. An der Dual-Maschine Griffe nach hinten stellen, Brust am Polster, leichtes Gewicht.'],
    'Cable Triceps Pressdown': ['Overhead Cable Triceps Extension', 'Machine Dip', 'Ellbogen am Körper fixieren.'],
    'Overhead Cable Triceps Extension': ['Cable Triceps Pressdown', 'Dumbbell Overhead Extension', 'Ellbogen zeigen nach vorn, die Arme nicht auseinanderfallen lassen.'],
    'Cable Biceps Curl': ['Dumbbell Curl', 'Preacher Curl Machine', 'Ohne Schwung, oben kurz halten.'],
    'Dumbbell Curl': ['Cable Biceps Curl', 'Preacher Curl Machine', 'Ohne Schwung, oben kurz halten.'],
    'Dumbbell Hammer Curl': ['Cable Rope Hammer Curl', 'Dumbbell Curl', 'Daumen zeigt nach oben, Ellbogen am Körper.'],
    'Seated Leg Curl': ['Lying Leg Curl', 'Dumbbell Romanian Deadlift', 'Kontrolliert zurückfahren, die Hüfte bleibt am Polster.'],
    'Lying Leg Curl': ['Seated Leg Curl', 'Dumbbell Romanian Deadlift', 'Hüfte am Polster lassen, langsam absenken.'],
    'Leg Extension': ['Goblet Squat', 'Smith Machine Split Squat', 'Oben kurz anspannen, ohne Schwung.'],
    'Hip Thrust (Machine)': ['Smith Machine Hip Thrust', 'Cable Pull-Through', 'Oben das Gesäß fest anspannen, Kinn leicht zur Brust.'],
    'Dumbbell Romanian Deadlift': ['Seated Leg Curl', 'Cable Pull-Through', 'Rücken gerade, Hüfte nach hinten schieben, Hanteln nah am Bein.'],
    'Hip Abduction Machine': ['Cable Hip Abduction', 'Side-Lying Leg Raise', 'Langsam öffnen und kontrolliert zurück.'],
    'Hip Adduction Machine': ['Cable Hip Adduction', 'Sumo Leg Press', 'Kontrolliert zusammenführen, nicht mit Schwung.'],
    'Standing Calf Raise': ['Seated Calf Raise', 'Leg Press Calf Raise', 'Unten voll dehnen, oben 1 Sek. halten.'],
    'Seated Calf Raise': ['Standing Calf Raise', 'Leg Press Calf Raise', 'Unten voll dehnen, oben kurz halten.'],
    'Back Extension': ['Reverse Hyperextension', 'Cable Pull-Through', 'Rückenstrecker. Rücken gerade halten, aus der Hüfte aufrichten, oben nicht überstrecken.'],
    'Cable Crunch': ['Ab Crunch Machine', 'Hanging Knee Raise', 'Rücken rund machen, die Bewegung kommt aus dem Bauch und nicht aus den Armen.'],
    'Ab Crunch Machine': ['Cable Crunch', 'Hanging Knee Raise', 'Langsam, die Bewegung kommt aus dem Bauch.'],
    'Plank': ['Dead Bug', 'Cable Crunch', 'Körper gerade, Bauch und Gesäß anspannen. Sekunden halten, nicht Wiederholungen zählen.'],
    'T-Bar Row': ['Chest-Supported Machine Row', 'One-Arm Dumbbell Row', 'Brust raus, Rücken gerade, Ellbogen nah am Körper nach hinten ziehen, Schulterblätter am Ende zusammenziehen. Gewicht anfangs lieber leicht.'],
    // Push 2
    'Incline Chest Press Machine': ['Smith Machine Incline Press', 'Incline Dumbbell Press', 'Sitz so einstellen, dass die Griffe auf Höhe der oberen Brust sind. Schulterblätter zusammen, kontrolliert absenken.'],
    'Smith Machine Shoulder Press': ['Machine Shoulder Press', 'Dumbbell Shoulder Press', 'Stange auf Stirnhöhe starten, nicht ins Hohlkreuz gehen, oben die Ellbogen nicht ganz durchdrücken.'],
    'Cable Fly': ['Pec Deck', 'Dumbbell Fly', 'Seilzug auf Brusthöhe oder etwas darunter, Arme leicht gebeugt, vor der Brust zusammenführen.'],
    'Machine Lateral Raise': ['Cable Lateral Raise', 'Dumbbell Lateral Raise', 'Seitheben an der Maschine. Ellbogen leicht gebeugt, bis auf Schulterhöhe heben, ohne Schwung.'],
    'Seated Dip Machine': ['Triceps Rope Pressdown', 'Overhead Cable Triceps Extension', 'Ellbogen nah am Körper, Schultern unten lassen, oben nicht ins Hohlkreuz gehen.'],
    'Triceps Rope Pressdown': ['Cable Triceps Pressdown', 'Overhead Cable Triceps Extension', 'Seil unten leicht auseinanderziehen, Ellbogen am Körper fixieren.'],
    // Pull 2
    'Wide-Grip Seated Row': ['T-Bar Row', 'Chest-Supported Machine Row', 'Brust raus, Ellbogen weit zur Seite, Schulterblätter am Ende zusammenziehen. Lass 1-3 Wiederholungen in Reserve.'],
    'Close-Grip Seated Row': ['Lat Pullover (Cable)', 'One-Arm Cable Row', 'Ellbogen eng am Körper nach hinten ziehen, unten die Dehnung zulassen. Lass 1-3 Wiederholungen in Reserve.'],
    'Cable Curl': ['Preacher Curl', 'Dumbbell Curl', 'Ellbogen am Körper, ohne Schwung, oben kurz halten.'],
    'Cable Hammer Curl': ['Cable Reverse Curl', 'Dumbbell Hammer Curl', 'Daumen zeigt nach oben, Ellbogen am Körper. Trainiert Bizeps und Unterarm.']
  };

  // Eintrag: [Übung, Aufwärmsätze, Wiederholungen, Pause, optional {s: Ersatzübungen, h: Hinweis}]
  var LEGS = [['Leg Press', 2, '8-12', '2-3 min'], ['Seated Leg Curl', 1, '10-12', '2 min'], ['Leg Extension', 1, '10-15', '1-2 min'],
    ['Hip Thrust (Machine)', 1, '8-12', '2 min'], ['Hip Abduction Machine', 0, '12-15', '1 min'], ['Standing Calf Raise', 1, '12-15', '1-2 min'],
    ['Cable Crunch', 0, '12-15', '1 min']];

  var PRESETS = [
    {
      id: 'fullbody', rev: 3, name: 'Full Body', info: 'Zwei Varianten, A und B, im Wechsel. Jedes Mal der ganze Körper. Gut für den Einstieg.',
      groups: { full: 'Full Body' },
      days: [
        { g: 'full', name: 'Full Body A', focus: 'Beine · Brust · Rücken', ex: [['Leg Press', 2, '8-12', '2-3 min'], ['Machine Chest Press', 1, '8-12', '2 min'], ['Lat Pulldown', 1, '8-12', '2 min'], ['Seated Leg Curl', 1, '10-12', '1-2 min'], ['Machine Shoulder Press', 1, '8-12', '2 min'], ['Cable Triceps Pressdown', 0, '10-12', '1-2 min'], ['Cable Crunch', 0, '12-15', '1 min']] },
        { g: 'full', name: 'Full Body B', focus: 'Beine · Rücken · Hüfte', ex: [['Hack Squat Machine', 2, '8-12', '2-3 min'], ['Seated Cable Row', 1, '8-12', '2 min'], ['Cable Chest Press', 1, '10-12', '2 min'], ['Hip Thrust (Machine)', 1, '8-12', '2 min'], ['Cable Lateral Raise', 0, '12-15', '1 min'], ['Cable Biceps Curl', 1, '10-12', '1-2 min'], ['Standing Calf Raise', 1, '12-15', '1-2 min']] }
      ]
    },
    {
      id: 'upperlower', rev: 2, name: 'Upper / Lower', info: '4 Tage pro Woche: Oberkörper, Unterkörper, Oberkörper, Unterkörper.',
      groups: { upper: 'Upper', lower: 'Lower' },
      days: [
        { g: 'upper', name: 'Upper A', focus: 'Brust · Rücken · Schultern', ex: [['Machine Chest Press', 2, '8-12', '2-3 min'], ['Lat Pulldown', 1, '8-12', '2-3 min'], ['Machine Shoulder Press', 1, '8-12', '2 min'], ['Seated Cable Row', 0, '8-12', '2 min'], ['Pec Deck', 0, '12-15', '1-2 min'], ['Cable Triceps Pressdown', 1, '10-12', '1-2 min'], ['Cable Biceps Curl', 1, '10-12', '1-2 min']] },
        { g: 'lower', name: 'Lower A', focus: 'Beine · Waden', ex: LEGS },
        { g: 'upper', name: 'Upper B', focus: 'Schultern · Rücken · Arme', ex: [['Cable Chest Press', 2, '10-12', '2 min'], ['Neutral-Grip Lat Pulldown', 1, '10-12', '2 min'], ['Cable Lateral Raise', 1, '12-15', '1-2 min'], ['Chest-Supported Machine Row', 1, '8-12', '2 min'], ['Reverse Pec Deck', 0, '12-15', '1 min'], ['Overhead Cable Triceps Extension', 1, '10-12', '1-2 min'], ['Dumbbell Curl', 1, '10-12', '1-2 min']] },
        { g: 'lower', name: 'Lower B', focus: 'Beine · Hüfte · Rücken', ex: [['Hack Squat Machine', 2, '8-12', '2-3 min'], ['Dumbbell Romanian Deadlift', 1, '8-12', '2 min'], ['Lying Leg Curl', 1, '10-12', '2 min'], ['Hip Adduction Machine', 0, '12-15', '1 min'], ['Seated Calf Raise', 1, '12-15', '1-2 min'], ['Back Extension', 0, '10-15', '1-2 min'], ['Ab Crunch Machine', 0, '12-15', '1 min']] }
      ]
    },
    {
      id: 'ppl', rev: 3, stack: true, name: 'Push / Pull / Legs', info: 'Push, Pull und Legs, jeweils in zwei Varianten (1 und 2). Im Wechsel: Push 1, Pull 1, Leg 1, danach Push 2, Pull 2, Leg 2.',
      groups: { push: 'Push', pull: 'Pull', leg: 'Legs' },
      days: [
        { g: 'push', name: 'Push 1', focus: 'Brust · Schultern · Trizeps', ex: [['Machine Chest Press', 2, '8-12', '2-3 min'], ['Cable Chest Press', 1, '10-12', '2 min'], ['Machine Shoulder Press', 1, '8-12', '2 min'], ['Cable Lateral Raise', 0, '12-15', '1 min'], ['Pec Deck', 0, '12-15', '1-2 min'], ['Cable Triceps Pressdown', 1, '10-12', '1-2 min'], ['Overhead Cable Triceps Extension', 0, '10-12', '1-2 min']] },
        { g: 'pull', name: 'Pull 1', focus: 'Rücken · hintere Schulter · Bizeps', ex: [['Lat Pulldown', 2, '8-12', '2-3 min'], ['Seated Cable Row', 1, '8-12', '2 min'], ['T-Bar Row', 1, '8-12', '2 min'], ['Straight-Arm Cable Pulldown', 0, '12-15', '1-2 min'], ['Reverse Pec Deck', 0, '12-15', '1 min'], ['Cable Biceps Curl', 1, '10-12', '1-2 min'], ['Dumbbell Hammer Curl', 0, '10-12', '1-2 min'], ['Back Extension', 0, '10-15', '1-2 min']] },
        { g: 'leg', name: 'Leg 1', focus: 'Beine · Waden · Bauch', ex: LEGS },
        { g: 'push', name: 'Push 2', focus: 'Brust · Schultern · Trizeps', ex: [['Incline Chest Press Machine', 2, '8-12', '2-3 min'], ['Smith Machine Shoulder Press', 1, '8-12', '2 min'], ['Cable Fly', 0, '12-15', '1-2 min'], ['Machine Lateral Raise', 0, '12-15', '1 min'], ['Seated Dip Machine', 1, '8-12', '2 min'], ['Triceps Rope Pressdown', 0, '10-12', '1-2 min']] },
        { g: 'pull', name: 'Pull 2', focus: 'Rücken · hintere Schulter · Arme', ex: [
          ['Lat Pulldown', 2, '6-10', '2-3 min', { s: ['Assisted Pull-Up Machine', 'Neutral-Grip Lat Pulldown'], h: 'Zur oberen Brust ziehen, Ellbogen nach unten, nicht mit dem Rücken schwingen. Lass 1-3 Wiederholungen in Reserve.' }],
          ['Wide-Grip Seated Row', 1, '6-10', '2-3 min'],
          ['Close-Grip Seated Row', 1, '6-10', '2-3 min'],
          ['Reverse Pec Deck', 1, '8-12', '1-2 min'],
          ['Cable Curl', 1, '8-12', '1-2 min'],
          ['Cable Hammer Curl', 0, '8-12', '1-2 min']] },
        { g: 'leg', name: 'Leg 2', focus: 'Beine · Hüfte · Rücken', ex: [['Hack Squat Machine', 2, '8-12', '2-3 min'], ['Dumbbell Romanian Deadlift', 1, '8-12', '2 min'], ['Lying Leg Curl', 1, '10-12', '2 min'], ['Hip Adduction Machine', 0, '12-15', '1 min'], ['Seated Calf Raise', 1, '12-15', '1-2 min'], ['Back Extension', 0, '10-15', '1-2 min'], ['Ab Crunch Machine', 0, '12-15', '1 min']] }
      ]
    }
  ];

  function exObj(row) {
    var lib = LIB[row[0]] || ['', '', ''], reps = row[2], o = row[4] || {};
    var m = /^(\d+)(?:\s*-\s*(\d+))?/.exec(reps);
    var ex = { n: row[0], warm: row[1], sets: '3', reps: reps, rest: row[3], note: o.h || lib[2], subs: (o.s || [lib[0], lib[1]]).filter(Boolean) };
    if (m) ex.hi = +(m[2] || m[1]);
    if (/sek/i.test(reps)) ex.time = 1;
    return ex;
  }

  function build(id) {
    var p = null;
    PRESETS.forEach(function (x) { if (x.id === id) p = x; });
    if (!p) throw new Error('Unbekannte Voreinstellung');
    var perGroup = {}, days = [], list = {}, count = 0;
    p.days.forEach(function (d) {
      var n = (perGroup[d.g] = (perGroup[d.g] || 0) + 1), key = d.g + '-' + n;
      days.push({ id: key, group: d.g, name: d.name, focus: d.focus || '' });
      list[key] = { ex: d.ex.map(exObj) };
      count += d.ex.length;
    });
    var docs = {};
    docs['program/meta'] = { format: 2, preset: p.id, rev: p.rev || 1, title: p.name, importedAt: Date.now(), weeks: [1], blocks: [], days: days, wnotes: {}, wp: [], groups: p.groups };
    if (p.stack) docs['program/meta'].stack = true;
    docs['program/w01'] = { week: 1, block: 1, days: list };
    return { docs: docs, weeks: 1, days: days.length, exercises: count };
  }

  window.__presets = {
    list: PRESETS.map(function (p) { return { id: p.id, rev: p.rev || 1, name: p.name, info: p.info, days: p.days.length }; }),
    build: build
  };
})();
