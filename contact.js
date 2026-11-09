(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const requested = new URLSearchParams(window.location.search).get('service');
  const description = document.getElementById('serviceDescription');
  if (requested && description && !description.value) {
    description.value = `I'm interested in ${requested}.`;
  }

})();
