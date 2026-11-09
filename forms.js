(() => {
  document.querySelectorAll('form[data-netlify-recaptcha]').forEach(form => {
    form.addEventListener('submit', event => {
      const token = new FormData(form).get('g-recaptcha-response');
      if (!token || !String(token).trim()) {
        event.preventDefault();
        const status = form.querySelector('[role="status"]');
        if (status) {
          status.hidden = false;
          status.textContent = 'Please complete the CAPTCHA before sending. If it does not appear, reload the page or call (832) 318-2256.';
        }
      }
    });
  });
})();
