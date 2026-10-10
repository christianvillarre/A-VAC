(() => {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const reveal = (selector, options = {}) => {
    gsap.utils.toArray(selector).forEach((element) => {
      gsap.from(element, {
        y: options.y ?? 28,
        autoAlpha: 0,
        duration: options.duration ?? .8,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      });
    });
  };

  reveal('.av-services .av-heading > *');
  gsap.from('.av-card', {
    y: 46,
    autoAlpha: 0,
    duration: .9,
    stagger: .14,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.av-cards', start: 'top 84%', once: true },
  });
  reveal('.av-service-links', { y: 18 });

  reveal('.av-request-intro > :not(.av-request-photo)', { y: 20 });
  gsap.from('.av-request-photo img', {
    scale: 1.08,
    duration: 1.25,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.av-request-photo', start: 'top 85%', once: true },
  });
  reveal('.av-form', { y: 42, duration: .95 });

  reveal('.image-overlay-text');
  gsap.from('.about-media img', {
    scale: 1.06,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.about-media', start: 'top 83%', once: true },
  });
  reveal('.about-content > *', { y: 20 });
  reveal('.av-areas .av-two-col > *, .av-faq .av-two-col > *');
  reveal('.av-towns li, .av-questions details', { y: 16, duration: .65 });
})();
