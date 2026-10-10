(() => {
  const hero = document.querySelector('.section-hero');
  if (!hero) return;

  const landscape = hero.querySelector('.hero-media');
  const sun = hero.querySelector('.hero-sun img');
  const title = hero.querySelector('.hero-title');
  const card = hero.querySelector('.hero-ui');
  const truck = hero.querySelector('.hero-col--art');
  const bottomArt = hero.querySelector('.hero-pinned');
  if (![landscape, sun, title, card, truck, bottomArt].every(Boolean)) return;

  if (window.gsap) {
    hero.dataset.motionEngine = 'gsap';
    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => { hero.dataset.motionComplete = 'true'; },
    });
    timeline
      .fromTo(landscape, { y: 95, autoAlpha: .65 }, { y: 0, autoAlpha: 1, duration: 1.25 }, 0)
      .fromTo(sun, { y: 65, scale: .78, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 1.3 }, .18)
      .fromTo(title, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .85 }, .25)
      .fromTo(card, { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .85 }, .43)
      .fromTo(truck, { x: 120, scale: .9, autoAlpha: 0, transformOrigin: 'bottom center' }, { x: 0, scale: 1, autoAlpha: 1, duration: 1.35 }, .5)
      .fromTo(bottomArt, { y: 65, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1 }, .38);
    return;
  }

  // Keep the same entrance when the external GSAP script cannot load.
  if (!Element.prototype.animate) {
    hero.dataset.motionEngine = 'static';
    return;
  }
  hero.dataset.motionEngine = 'web-animations';
  const easing = 'cubic-bezier(.22,1,.36,1)';
  const motions = [
    [landscape, [{ transform: 'translateY(95px)', opacity: .65 }, { transform: 'translateY(0)', opacity: 1 }], 1250, 0],
    [sun, [{ transform: 'translateY(65px) scale(.78)', opacity: 0 }, { transform: 'translateY(0) scale(1)', opacity: 1 }], 1300, 180],
    [title, [{ transform: 'translateY(30px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], 850, 250],
    [card, [{ transform: 'translateY(26px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], 850, 430],
    [truck, [{ transform: 'translateX(120px) scale(.9)', opacity: 0 }, { transform: 'translateX(0) scale(1)', opacity: 1 }], 1350, 500],
    [bottomArt, [{ transform: 'translateY(65px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }], 1100, 380],
  ];
  const playFallback = () => {
    Promise.all(motions.map(([element, frames, duration, delay]) =>
      element.animate(frames, { duration, delay, easing, fill: 'both' }).finished
    )).then(() => { hero.dataset.motionComplete = 'true'; });
  };
  playFallback();
})();
