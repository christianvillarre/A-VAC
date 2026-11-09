(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const requested = new URLSearchParams(window.location.search).get('service');
  const description = document.getElementById('serviceDescription');
  if (requested && description && !description.value) {
    description.value = `I'm interested in ${requested}.`;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const body = [
      'Service request from the A-VAC website', '',
      'Name: ' + data.get('name'),
      'Phone: ' + data.get('phone'),
      'Email: ' + data.get('email'),
      'Address: ' + data.get('address'),
      'Description: ' + data.get('description'),
    ].join('\n');

    const status = document.getElementById('contactStatus');
    status.hidden = false;
    status.textContent = 'Finish by sending the email in your email app. Your request has not been submitted on this website. If no email app opens, call (832) 318-2256 or email info@avacseptic.com.';
    window.location.href = 'mailto:info@avacseptic.com?subject=' + encodeURIComponent('A-VAC service request') + '&body=' + encodeURIComponent(body);
  });
})();
