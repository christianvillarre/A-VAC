const fs = require('node:fs');
const path = require('node:path');
require('./build-service-pages.cjs')();

const pages = [
  'index.html',
  'index2.html',
  'about.html',
  'services.html',
  'contact.html',
  'septic-pumping.html',
  'septic-tank-cleaning.html',
  'wastewater-removal.html',
  'residential-septic-cleaning.html',
  'commercial-septic-cleaning.html',
];

const header = `<!-- shared:header:start -->
<header class="navbar site-header">
  <div class="navbar-inner">
    <a class="nav-logo" href="/index.html" aria-label="A-VAC Septic home"><img src="/images/logo.png" alt="A-VAC Septic"></a>
    <nav aria-label="Main navigation">
      <ul class="nav-links">
        <li><a href="/about.html">About</a></li>
        <li class="has-dropdown">
          <a href="/services.html">Services</a>
          <div class="dropdown">
            <a href="/residential-septic-cleaning.html">Residential Septic Cleaning</a>
            <a href="/commercial-septic-cleaning.html">Commercial Septic Cleaning</a>
            <a href="/septic-pumping.html">Septic Pumping</a>
            <a href="/septic-tank-cleaning.html">Septic Tank Cleaning</a>
            <a href="/contact.html">Emergency Pump-Outs</a>
            <a href="/wastewater-removal.html">Wastewater Removal</a>
            <a href="/index.html#septic-cleaning">System Maintenance</a>
          </div>
        </li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
    <a class="nav-cta" href="tel:+18323182256">Call Now</a>
  </div>
</header>
<!-- shared:header:end -->`;

const footer = `<!-- shared:footer:start -->
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-cta">
      <div class="footer-cta__text"><h3>Need septic service?</h3><p>Septic pumping and cleaning in Huffman, TX and surrounding areas.</p></div>
      <div class="footer-cta__actions"><a class="footer-btn footer-btn--primary" href="/contact.html">Request Service</a><a class="footer-btn" href="tel:+18323182256">(832) 318-2256</a></div>
    </div>
    <div class="footer-grid">
      <div class="footer-col"><a href="/index.html"><img class="footer-logo" src="/images/logo.png" alt="A-VAC Septic home"></a><p class="footer-tagline">Family-owned septic and wastewater service for homes and businesses in Northeast Houston.</p></div>
      <nav class="footer-col" aria-label="Footer navigation"><h4 class="footer-title">Company</h4><a href="/about.html">About</a><a href="/services.html">Services</a><a href="/index.html#service-area">Service Area</a><a href="/contact.html">Contact</a></nav>
      <nav class="footer-col" aria-label="Footer services"><h4 class="footer-title">Services</h4><a href="/residential-septic-cleaning.html">Residential Septic Cleaning</a><a href="/commercial-septic-cleaning.html">Commercial Septic Cleaning</a><a href="/septic-pumping.html">Septic Pumping</a><a href="/septic-tank-cleaning.html">Septic Tank Cleaning</a><a href="/wastewater-removal.html">Wastewater Removal</a></nav>
      <div class="footer-col"><h4 class="footer-title">Contact</h4><a href="tel:+18323182256">(832) 318-2256</a><a href="mailto:info@avacseptic.com">info@avacseptic.com</a><a href="https://maps.google.com/?q=25727+Lakewater+Huffman+TX+77336" target="_blank" rel="noopener">25727 Lakewater, Huffman, TX 77336</a></div>
    </div>
    <div class="footer-bottom"><p>© <span class="site-year" id="year"></span> A-VAC Septic. All rights reserved.</p><div class="footer-bottom__links"><a href="https://www.avacseptic.com/privacy-policy">Privacy</a><a href="https://www.avacseptic.com/terms-and-conditions">Terms</a></div></div>
  </div>
</footer>
<!-- shared:footer:end -->`;

for (const page of pages) {
  const file = path.join(__dirname, page);
  let html = fs.readFileSync(file, 'utf8');
  const existingHeader = /<!-- shared:header:start -->[\s\S]*?<!-- shared:header:end -->/;
  const originalHeader = /<header class="navbar">[\s\S]*?<\/header>/;
  if (existingHeader.test(html)) html = html.replace(existingHeader, header);
  else if (originalHeader.test(html)) html = html.replace(originalHeader, header);
  else throw new Error(`${page}: navbar missing`);

  const existingFooter = /<!-- shared:footer:start -->[\s\S]*?<!-- shared:footer:end -->/;
  const originalFooter = /<footer class="site-footer">[\s\S]*?<\/footer>/;
  if (existingFooter.test(html)) html = html.replace(existingFooter, footer);
  else if (originalFooter.test(html)) html = html.replace(originalFooter, footer);
  else throw new Error(`${page}: footer missing`);

  // The two home pages carried a second, page-specific footer stylesheet after the footer.
  if (page === 'index.html' || page === 'index2.html') {
    html = html.replace(/(<\/footer>\s*<!-- shared:footer:end -->)\s*<style>[\s\S]*?<\/style>/, '$1');
  }

  if (!html.includes('href="/site-shell.css"')) {
    html = html.replace('</head>', '  <link rel="stylesheet" href="/site-shell.css">\n</head>');
  }
  if (!html.includes('src="/site-shell.js"')) {
    html = html.replace('</body>', '  <script src="/site-shell.js"></script>\n</body>');
  }
  fs.writeFileSync(file, html);
  console.log(`Updated ${page}`);
}
