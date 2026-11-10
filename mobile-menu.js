(() => {
  const button = document.querySelector('.mobile-menu-toggle');
  const nav = document.getElementById('primary-navigation');
  const servicesButton = nav?.querySelector('.services-expand');
  const services = nav?.querySelector('#mobile-services');
  if (!button || !nav || !servicesButton || !services) return;
  const close = () => {
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open menu');
    nav.classList.remove('is-open');
    servicesButton.setAttribute('aria-expanded', 'false');
    servicesButton.setAttribute('aria-label', 'Expand services menu');
    services.classList.remove('is-open');
  };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    if (!open) { close(); return; }
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close menu');
    nav.classList.add('is-open');
  });
  servicesButton.addEventListener('click', () => {
    const open = servicesButton.getAttribute('aria-expanded') !== 'true';
    servicesButton.setAttribute('aria-expanded', String(open));
    servicesButton.setAttribute('aria-label', open ? 'Collapse services menu' : 'Expand services menu');
    services.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  document.addEventListener('click', event => { if (!nav.contains(event.target) && !button.contains(event.target)) close(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 768) close(); });
})();
