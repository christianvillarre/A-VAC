document.querySelectorAll('.site-year').forEach((year) => {
  year.textContent = new Date().getFullYear();
});

const siteHeader = document.querySelector('.site-header');
const servicesTrigger = siteHeader?.querySelector('.has-dropdown');
if (siteHeader && servicesTrigger) {
  const alignServicesMenu = () => {
    const bounds = servicesTrigger.getBoundingClientRect();
    siteHeader.style.setProperty('--services-menu-x', `${bounds.left - 16}px`);
    siteHeader.style.setProperty('--services-trigger-x', `${bounds.left}px`);
    siteHeader.style.setProperty('--services-trigger-width', `${bounds.width}px`);
  };
  alignServicesMenu();
  window.addEventListener('resize', alignServicesMenu);
  document.fonts?.ready.then(alignServicesMenu);
}
