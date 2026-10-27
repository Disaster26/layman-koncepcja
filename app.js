(function () {
  // Menu (hamburger z panelem)
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function zamknij() {
    nav.classList.remove('otw');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Otwórz menu');
    document.body.style.overflow = '';
  }
  burger.addEventListener('click', function () {
    var otw = nav.classList.toggle('otw');
    burger.setAttribute('aria-expanded', otw ? 'true' : 'false');
    burger.setAttribute('aria-label', otw ? 'Zamknij menu' : 'Otwórz menu');
    document.body.style.overflow = otw ? 'hidden' : '';
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) zamknij(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zamknij(); });
  window.addEventListener('resize', function () { if (window.innerWidth >= 1120) zamknij(); });

  // Dolny pasek na telefonie dopiero po przewinieciu za glowny przycisk
  var cel = document.getElementById('ctaMain');
  var mob = document.getElementById('mob');
  function pokazPasek(tak) {
    mob.classList.toggle('widac', tak);
    mob.setAttribute('aria-hidden', tak ? 'false' : 'true');
    Array.prototype.forEach.call(mob.querySelectorAll('a'), function (a) { a.tabIndex = tak ? 0 : -1; });
  }
  if (cel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (w) {
      var e = w[0];
      pokazPasek(!e.isIntersecting && e.boundingClientRect.top < 0);
    }, { threshold: 0 }).observe(cel);
  }

  // Formularz w wizualizacji niczego nie wysyla
  var form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('fInfo').hidden = false;
    });
  }
})();
