/* Startet den Offline-Betrieb und fordert dauerhaften Speicher an. */
(function () {
  'use strict';
  var v = document.getElementById('appver');
  if (v && self.APP_VERSION) v.textContent = 'Version ' + self.APP_VERSION + '.';
  if (window.__localdb) window.__localdb.requestPersistence();

  // Neue Version: Die App lädt aus dem Speicher des Geräts, deshalb zeigt sie nach einem Update erst die alte Fassung.
  // Sobald die neue bereit ist, erscheint unten ein Knopf zum Neuladen.
  function offerReload() {
    if (document.getElementById('upd')) return;
    var b = document.createElement('button');
    b.id = 'upd'; b.type = 'button'; b.className = 'upd';
    b.textContent = 'Neue Version bereit. Tippen zum Neuladen.';
    b.addEventListener('click', function () { location.reload(); });
    document.body.appendChild(b);
  }

  if ('serviceWorker' in navigator) {
    var hadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (hadController) offerReload();
      hadController = true;
    });
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      reg.update().catch(function () {});
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') reg.update().catch(function () {});
      });
    }).catch(function () {});
  }
})();
