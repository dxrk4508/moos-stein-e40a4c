/* Startet den Offline-Betrieb und fordert dauerhaften Speicher an. */
(function () {
  'use strict';
  var v = document.getElementById('appver');
  if (v && self.APP_VERSION) v.textContent = 'Version ' + self.APP_VERSION + '.';
  if (window.__localdb) window.__localdb.requestPersistence();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') reg.update().catch(function () {});
      });
    }).catch(function () {});
  }
})();
