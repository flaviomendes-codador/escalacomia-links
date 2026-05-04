(function () {
  'use strict';

  // Registra clique nos cards ativos via GA4
  document.querySelectorAll('.card--active[data-event]').forEach(function (card) {
    card.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', card.dataset.event);
      }
    });
  });
})();
