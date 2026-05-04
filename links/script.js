(function () {
  'use strict';

  // Tracking GA4
  document.querySelectorAll('[data-event]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof gtag === 'function') gtag('event', el.dataset.event);
    });
  });

  // Parallax sutil na foto hero ao rolar (só acima da dobra)
  var hero = document.querySelector('.hero__img');
  if (hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < 400) {
        hero.style.transform = 'translateY(' + (y * 0.22) + 'px)';
      }
    }, { passive: true });
  }
})();
