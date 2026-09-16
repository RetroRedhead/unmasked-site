(function () {
  var body = document.body;

  document.querySelectorAll('.volume-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      body.setAttribute('data-volume', btn.dataset.vol);
      document.querySelectorAll('.volume-switch button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      try { localStorage.setItem('us-volume', btn.dataset.vol); } catch (e) {}
    });
  });

  try {
    if (localStorage.getItem('us-volume') === 'low') {
      body.setAttribute('data-volume', 'low');
      document.querySelectorAll('.volume-switch button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.vol === 'low'));
      });
    }
  } catch (e) {}

  /* Google Form submissions are fire-and-forget, so confirm in place */
  var form = document.getElementById('soonform');
  if (!form) return;
  var action = form.getAttribute('action') || '';
  if (action.indexOf('docs.google.com') === -1) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    fetch(action, { method: 'POST', mode: 'no-cors', body: data }).catch(function () {});
    form.hidden = true;
    document.getElementById('soonsuccess').hidden = false;
  });
})();
