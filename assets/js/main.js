/**
* Template Name: Personal
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Updated: Mar 05 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 500
    });
  }

    /**
     * Initiate Pure Counter
     */
    if (typeof PureCounter !== 'undefined') {
        new PureCounter();
    }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();

// Carrousel Embla - Version multi-carrousels
(function () {
    'use strict';

    function initEmbla() {
        console.log('🎬 Tentative initialisation Embla');

        // Trouver TOUS les carrousels Embla sur la page
        const emblaNodes = document.querySelectorAll('.embla__viewport');

        if (emblaNodes.length === 0) {
            console.log('ℹ️ Pas de carrousel Embla sur cette page');
            return;
        }

        if (typeof EmblaCarousel === 'undefined') {
            console.error('❌ EmblaCarousel non chargé');
            return;
        }

        console.log('✅ ' + emblaNodes.length + ' carrousel(s) Embla trouvé(s)');

        // Initialiser chaque carrousel
        emblaNodes.forEach((emblaNode, index) => {
            try {
                const embla = EmblaCarousel(emblaNode, {
                    loop: false,
                    watchDrag: false,
                    containScroll: 'trimSnaps',
                    slidesToScroll: 1,
                    align: 'start'
                });

                console.log('✅ Carrousel ' + (index + 1) + ' initialisé');

                // Trouver les éléments de CE carrousel spécifique
                const emblaContainer = emblaNode.closest('.embla');
                const prevBtn = emblaContainer.querySelector('.embla__button--prev');
                const nextBtn = emblaContainer.querySelector('.embla__button--next');
                const counterCurrent = emblaContainer.querySelector('.embla__counter-current');
                const counterTotal = emblaContainer.querySelector('.embla__counter-total');

                // --- Chargement différé des vidéos ---
                // Les iframes ont un data-src : on ne les charge que lorsque le
                // carrousel entre à l'écran, et uniquement pour les slides visibles
                // (les autres se chargent quand on navigue avec les flèches).
                function loadVisibleIframes() {
                    const slides = embla.slideNodes();
                    embla.slidesInView().forEach(function (i) {
                        const fr = slides[i].querySelector('iframe[data-src]');
                        if (fr) {
                            fr.src = fr.getAttribute('data-src');
                            fr.removeAttribute('data-src');
                        }
                    });
                }
                if ('IntersectionObserver' in window) {
                    const io = new IntersectionObserver(function (entries) {
                        if (entries.some(function (e) { return e.isIntersecting; })) {
                            loadVisibleIframes();
                            embla.on('slidesInView', loadVisibleIframes);
                            embla.on('select', loadVisibleIframes);
                            io.disconnect();
                        }
                    }, { rootMargin: '300px' });
                    io.observe(emblaContainer);
                } else {
                    // Navigateur sans IntersectionObserver : tout charger
                    embla.slideNodes().forEach(function (s) {
                        const fr = s.querySelector('iframe[data-src]');
                        if (fr) { fr.src = fr.getAttribute('data-src'); fr.removeAttribute('data-src'); }
                    });
                }

                // Fonction pour mettre à jour le compteur
                function updateCounter() {
                    const current = embla.selectedScrollSnap() + 1;
                    // Compter le nombre réel de slides (vidéos)
                    const total = emblaNode.querySelectorAll('.embla__slide').length;

                    if (counterCurrent) counterCurrent.textContent = current;
                    if (counterTotal) counterTotal.textContent = total;
                }

                // Initialiser le compteur
                updateCounter();

                // Mettre à jour le compteur à chaque changement
                embla.on('select', updateCounter);

                // Fonction pour activer/désactiver les boutons
                function updateButtons() {
                    if (prevBtn) {
                        prevBtn.disabled = !embla.canScrollPrev();
                    }
                    if (nextBtn) {
                        nextBtn.disabled = !embla.canScrollNext();
                    }
                }

                // Initialiser l'état des boutons
                updateButtons();

                // Mettre à jour les boutons à chaque changement
                embla.on('select', updateButtons);
                embla.on('reInit', updateButtons);

                // Événements des boutons
                if (prevBtn) {
                    prevBtn.addEventListener('click', function () {
                        console.log('⬅️ Précédent - Carrousel ' + (index + 1));
                        embla.scrollPrev();
                    });
                }

                if (nextBtn) {
                    nextBtn.addEventListener('click', function () {
                        console.log('➡️ Suivant - Carrousel ' + (index + 1));
                        embla.scrollNext();
                    });
                }

                // Autoplay avec retour au début à la fin
                let autoplayInterval = setInterval(function () {
                    if (embla.canScrollNext()) {
                        embla.scrollNext();
                    } else {
                        embla.scrollTo(0);
                    }
                }, 4000);

                // Pause au survol du carrousel
                if (emblaContainer) {
                    emblaContainer.addEventListener('mouseenter', function () {
                        clearInterval(autoplayInterval);
                        console.log('⏸️ Pause autoplay - Carrousel ' + (index + 1));
                    });

                    emblaContainer.addEventListener('mouseleave', function () {
                        autoplayInterval = setInterval(function () {
                            if (embla.canScrollNext()) {
                                embla.scrollNext();
                            } else {
                                embla.scrollTo(0);
                            }
                        }, 4000);
                        console.log('▶️ Reprise autoplay - Carrousel ' + (index + 1));
                    });
                }

            } catch (error) {
                console.error('❌ Erreur lors de l\'initialisation du carrousel ' + (index + 1) + ':', error);
            }
        });
    }

    // Attendre que tout soit chargé
    window.addEventListener('load', function () {
        setTimeout(initEmbla, 300);
    });

})();

// Slideshow Hero
const SLIDE_DURATION = 3000; // Durée en millisecondes (5000 = 5 secondes)

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slideshow img');
const totalSlides = slides.length;

// Auto-avance
let slideInterval = setInterval(() => changeSlide(1), SLIDE_DURATION);

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');

    clearInterval(slideInterval);
    slideInterval = setInterval(() => changeSlide(1), SLIDE_DURATION);
}