(function () {
  'use strict';

  /* ── Accordion ── */
  document.querySelectorAll('.entry').forEach(function (entry) {
    var btn   = entry.querySelector('.entry__trigger');
    var panel = entry.querySelector('.entry__panel');

    btn.addEventListener('click', function () {
      var open = entry.hasAttribute('data-open');

      // Fecha todos
      document.querySelectorAll('.entry[data-open]').forEach(function (other) {
        other.removeAttribute('data-open');
        other.querySelector('.entry__trigger').setAttribute('aria-expanded', 'false');
        other.querySelector('.entry__panel').hidden = true;
      });

      // Alterna o atual
      if (!open) {
        entry.setAttribute('data-open', '');
        btn.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });

  /* ── Copiar prompt ── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn-copy[data-copy]');
    if (!btn) return;

    var code = btn.closest('.entry__panel').querySelector('.window__code');
    var text = code ? code.innerText.replace(/^\/\/.*\n\n?/, '').trim() : '';

    navigator.clipboard.writeText(text).then(function () {
      var orig = btn.innerHTML;
      btn.innerHTML = '<span class="btn-copy__ic">✓</span> copiado!';
      btn.setAttribute('data-copied', '');
      setTimeout(function () {
        btn.innerHTML = orig;
        btn.removeAttribute('data-copied');
      }, 2000);
    });
  });

  /* ── Filtros ── */
  var filters = document.querySelectorAll('.filter');
  var entries = document.querySelectorAll('.entry');
  var empty   = document.querySelector('.empty');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (f) { f.classList.remove('is-active'); });
      btn.classList.add('is-active');

      var cat = btn.dataset.filter;
      var visible = 0;

      entries.forEach(function (entry) {
        var match = cat === 'todos' || entry.dataset.cat === cat;
        entry.classList.toggle('is-hidden', !match);
        if (match) visible++;
      });

      if (empty) empty.hidden = visible > 0;
    });
  });
})();
