/**
 * Carrousel de captures d'écran.
 *
 * Le défilement lui-même est natif : la piste est une zone scrollable avec
 * scroll-snap, ce qui donne le glissement tactile sur mobile sans une ligne de
 * JavaScript. Ce fichier n'ajoute que ce que le CSS ne sait pas faire — les
 * flèches, les pastilles et la synchronisation de l'état actif.
 *
 * Si le script ne se charge pas, la piste reste défilable : aucune capture
 * n'est perdue, seules les commandes disparaissent.
 */
(function () {
  'use strict';

  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('[data-track]');
    var dotsWrap = root.querySelector('[data-dots]');
    var counter = root.querySelector('[data-counter]');
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var slides = Array.prototype.slice.call(track.children);
    if (slides.length < 2) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /** Diapositive affichée. Fait autorité pour les flèches. */
    var index = 0;

    /**
     * Diapositive visée par un défilement programmatique, -1 s'il n'y en a pas.
     *
     * Sans cela, deux clics rapides sur « suivant » n'avancent que d'un cran :
     * pendant l'animation, la diapositive la plus proche du centre est encore
     * la précédente, et un `index` recalculé à ce moment ferait viser au second
     * clic la destination déjà demandée au premier.
     */
    var awaiting = -1;
    var awaitingTimer = 0;

    var dots = slides.map(function (slide, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'dot';
      b.setAttribute('aria-label', 'Capture ' + (i + 1) + ' sur ' + slides.length);
      b.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(b);
      return b;
    });

    /** Décalage d'une diapositive dans la piste, indépendant de l'offsetParent. */
    function offsetOf(slide) {
      return track.scrollLeft
        + slide.getBoundingClientRect().left
        - track.getBoundingClientRect().left;
    }

    /** Diapositive dont le centre est le plus proche du centre visible. */
    function nearest() {
      var middle = track.scrollLeft + track.clientWidth / 2;
      var best = 0;
      var bestDistance = Infinity;
      slides.forEach(function (slide, i) {
        var distance = Math.abs(offsetOf(slide) + slide.clientWidth / 2 - middle);
        if (distance < bestDistance) { bestDistance = distance; best = i; }
      });
      return best;
    }

    function render(i) {
      index = i;
      dots.forEach(function (d, n) {
        d.setAttribute('aria-current', n === i ? 'true' : 'false');
      });
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
      if (counter) counter.textContent = (i + 1) + ' / ' + slides.length;
    }

    function goTo(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      awaiting = i;
      // Garde-fou : si l'animation est interrompue et n'atteint jamais sa cible,
      // le carrousel doit redevenir sensible au glissement manuel.
      clearTimeout(awaitingTimer);
      awaitingTimer = setTimeout(release, 1000);

      render(i);
      track.scrollTo({
        left: offsetOf(slides[i]),
        behavior: reduceMotion.matches ? 'auto' : 'smooth',
      });
    }

    function release() {
      awaiting = -1;
      clearTimeout(awaitingTimer);
    }

    prev.addEventListener('click', function () { goTo(index - 1); });
    next.addEventListener('click', function () { goTo(index + 1); });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
    });

    // Une action manuelle reprend la main sur l'animation en cours.
    ['pointerdown', 'wheel', 'touchstart'].forEach(function (type) {
      track.addEventListener(type, release, { passive: true });
    });

    var queued = false;
    track.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        var at = nearest();
        if (awaiting !== -1) {
          // On ignore les positions intermédiaires du défilement programmatique.
          if (at === awaiting) release();
          return;
        }
        if (at !== index) render(at);
      });
    }, { passive: true });

    window.addEventListener('resize', function () {
      release();
      render(nearest());
    });

    render(0);
  });
})();
