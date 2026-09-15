(function () {
  var body = document.body;

  /* Sensory volume control */
  document.querySelectorAll('.volume-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      body.setAttribute('data-volume', btn.dataset.vol);
      document.querySelectorAll('.volume-switch button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      try { localStorage.setItem('us-volume', btn.dataset.vol); } catch (e) {}
    });
  });

  /* Remember the visitor's choice */
  try {
    var saved = localStorage.getItem('us-volume');
    if (saved === 'low') {
      body.setAttribute('data-volume', 'low');
      document.querySelectorAll('.volume-switch button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.vol === 'low'));
      });
    }
  } catch (e) {}

  /* Stylist / owner path */
  function setPath(p) {
    body.setAttribute('data-path', p);
    document.querySelectorAll('.path-panel').forEach(function (panel) {
      panel.hidden = panel.dataset.panel !== p;
    });
    document.querySelectorAll('[data-door]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.door === p));
    });
  }

  document.querySelectorAll('.path-switch [data-door]').forEach(function (btn) {
    btn.addEventListener('click', function () { setPath(btn.dataset.door); });
  });

  document.querySelectorAll('.door[data-door]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setPath(btn.dataset.door);
      document.getElementById('start').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
