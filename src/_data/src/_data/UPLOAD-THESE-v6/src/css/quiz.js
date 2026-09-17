(function () {
  var form = document.getElementById('quiz');
  if (!form) return;
  var bands = JSON.parse(document.getElementById('bands').textContent);
  var total = form.querySelectorAll('fieldset.q').length;
  var btn = document.getElementById('scorebtn');
  var fill = document.getElementById('progressfill');
  var text = document.getElementById('progresstext');

  function answered() {
    var n = 0;
    for (var i = 0; i < total; i++) {
      if (form.querySelector('input[name="q' + i + '"]:checked')) n++;
    }
    return n;
  }

  function refresh() {
    var n = answered();
    fill.style.width = (n / total * 100) + '%';
    text.textContent = n + ' of ' + total + ' answered';
    btn.disabled = n < total;
  }

  form.addEventListener('change', function (e) {
    if (e.target.name) {
      var fs = e.target.closest('fieldset');
      if (fs) fs.classList.add('done');
    }
    refresh();
  });

  btn.addEventListener('click', function () {
    var score = 0;
    for (var i = 0; i < total; i++) {
      var sel = form.querySelector('input[name="q' + i + '"]:checked');
      if (sel) score += parseInt(sel.value, 10);
    }

    var band = bands[bands.length - 1];
    for (var b = 0; b < bands.length; b++) {
      if (score <= bands[b].max) { band = bands[b]; break; }
    }

    document.getElementById('resultband').textContent = band.label;
    document.getElementById('resultnum').textContent = score;
    document.getElementById('resulthead').textContent = band.headline;
    document.getElementById('resultbody').textContent = band.body;
    document.getElementById('resultnext').textContent = band.next;
    document.getElementById('bandfield').value = band.key;
    document.getElementById('scorefield').value = String(score);

    var res = document.getElementById('result');
    res.hidden = false;
    res.setAttribute('data-band', band.key);
    res.scrollIntoView({ behavior: 'smooth', block: 'start' });
    res.focus({ preventScroll: true });
  });

  refresh();
})();
