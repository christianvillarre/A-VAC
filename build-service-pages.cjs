const fs = require('node:fs');
const path = require('node:path');

const pages = [
  {
    file: 'septic-pumping.html',
    title: 'Septic Tank Pumping in Huffman, TX | A-VAC Septic',
    description: 'Schedule septic tank pumping for homes and businesses in Huffman, Crosby, Atascocita, Kingwood, and nearby Northeast Houston. Learn what to expect and request service from A-VAC Septic.',
    eyebrow: 'Septic tank pumping',
    heading: 'Septic Tank Pumping in Huffman, TX',
    lead: 'Routine septic pumping removes accumulated sludge, scum, and wastewater from the tank. A-VAC serves homeowners and businesses in Huffman and nearby Northeast Houston communities.',
    image: '/images/img1.png',
    imageAlt: 'Septic service equipment at work',
    introHeading: 'When pumping makes sense',
    intro: 'A septic tank gradually collects solids. Having it pumped before excessive buildup develops is part of routine system care. The right timing depends on the tank, the number of people or amount of use, and the last service date.',
    highlights: [
      ['Routine maintenance', 'Tell us your tank size if you know it, how the property is used, and when it was last pumped. We can discuss the next appropriate service step.'],
      ['Signs of trouble', 'Slow drains, sewage odors, wet ground near the system, or a backup deserve prompt attention. Pumping may be part of the response, but these signs can have other causes.'],
      ['Homes and businesses', 'We handle residential and commercial septic pumping. Property access and tank details help us plan the visit.'],
    ],
    stepsHeading: 'What to expect from a pumping visit',
    steps: [
      ['Share the details', 'Describe the property, any symptoms, the tank location, and the last known pumping date when you contact us.'],
      ['Provide tank access', 'Clear a path to the tank and let us know if the access lids are buried, gated, or hard to reach.'],
      ['Pump and discuss', 'We remove the tank contents and can discuss any visible concerns or next steps that arise during service.'],
    ],
    faqs: [
      ['How often should a septic tank be pumped?', 'There is no single schedule for every property. Tank capacity, household or business usage, and the amount of accumulated solids all matter. Ask us about timing based on your system and service history.'],
      ['Will pumping fix a backup?', 'It may help if a full tank is contributing to the problem, but backups can also come from blocked pipes, damaged components, or other issues. Call and explain what is happening.'],
      ['What if I do not know where the tank is?', 'Tell us what you know about the property and any access records you have. We can discuss what information will help before the visit.'],
    ],
    related: [['Septic tank cleaning', '/septic-tank-cleaning.html'], ['Residential septic services', '/residential-septic-cleaning.html']],
  },
  {
    file: 'septic-tank-cleaning.html',
    title: 'Septic Tank Cleaning in Huffman, TX | A-VAC Septic',
    description: 'Explore septic tank cleaning for homes and businesses in Huffman and Northeast Houston. Learn how a thorough cleanout differs from routine pumping and request service from A-VAC Septic.',
    eyebrow: 'Septic tank cleaning',
    heading: 'Septic Tank Cleaning in Huffman, TX',
    lead: 'Septic tank cleaning focuses on removing settled waste and buildup from the tank. It also gives the service team a chance to look for visible concerns such as blockages, leaks, or baffle issues.',
    image: '/images/img2.jpeg',
    imageAlt: 'Septic tank service work',
    introHeading: 'Pumping and cleaning are related, but different',
    intro: 'Pumping removes the accumulated tank contents. A cleaning visit places more attention on remaining settled material and the tank’s visible condition. Tell us why you are calling so we can discuss the level of service your system needs.',
    highlights: [
      ['Thorough cleanout', 'The goal is to remove settled waste and buildup that can remain in the tank.'],
      ['Visible condition', 'Accessible components can be checked for obvious concerns. This is not a substitute for a full system inspection or repair.'],
      ['Useful context', 'Recent backups, odors, slow drains, or an uncertain service history are worth mentioning when you request service.'],
    ],
    stepsHeading: 'How to prepare for cleaning',
    steps: [
      ['Describe the issue', 'Let us know whether this is routine care or whether you have noticed odors, slow drainage, soggy ground, or a backup.'],
      ['Confirm access', 'Share the tank location if you know it and note buried lids, gates, pets, or other access considerations.'],
      ['Review findings', 'After the cleanout, ask about any visible concerns and whether further evaluation is appropriate.'],
    ],
    faqs: [
      ['Is cleaning the same as pumping?', 'Both remove waste from the tank. Cleaning generally involves more attention to settled material and visible tank conditions. The exact work should be discussed when scheduling.'],
      ['Can cleaning repair a damaged septic system?', 'Cleaning removes waste; it does not repair a failed component or drain field. If something appears damaged, further evaluation may be needed.'],
      ['Do I need cleaning after a backup?', 'A backup can have several causes. Call to describe the symptoms so the appropriate next step can be discussed.'],
    ],
    related: [['Septic tank pumping', '/septic-pumping.html'], ['Commercial septic services', '/commercial-septic-cleaning.html']],
  },
  {
    file: 'wastewater-removal.html',
    title: 'Wastewater Removal in Huffman, TX | A-VAC Septic',
    description: 'Arrange non-hazardous wastewater removal from septic and holding tanks in Huffman and nearby Northeast Houston communities. Learn what details A-VAC Septic needs to plan pickup.',
    eyebrow: 'Wastewater removal',
    heading: 'Wastewater Removal in Huffman, TX',
    lead: 'A-VAC arranges removal and transport of non-hazardous wastewater from septic and holding tanks for homes and businesses around Huffman and Northeast Houston.',
    image: '/images/img3.png',
    imageAlt: 'Wastewater service equipment',
    introHeading: 'Plan a wastewater pickup',
    intro: 'The type of tank, estimated volume, location, and access conditions help determine the service needed. Tell us what material is in the tank so we can confirm whether it is within our non-hazardous wastewater service.',
    highlights: [
      ['Septic and holding tanks', 'Removal is available for non-hazardous wastewater in these tanks. Describe the tank and how it is used when you contact us.'],
      ['Transport and disposal', 'Collected wastewater is transported for disposal at a licensed treatment facility.'],
      ['Commercial planning', 'Businesses can discuss access requirements, timing, and recurring removal needs with the team.'],
    ],
    stepsHeading: 'Information to have ready',
    steps: [
      ['Identify the material', 'Tell us what the tank receives. This helps confirm that the wastewater is non-hazardous and suitable for the service.'],
      ['Estimate the volume', 'Share the tank capacity or best estimate, current level, and how quickly it fills if known.'],
      ['Explain access and timing', 'Provide the address, tank location, gate details, and the date you need service. We will discuss availability.'],
    ],
    faqs: [
      ['What wastewater can A-VAC remove?', 'The site offers removal of non-hazardous wastewater from septic and holding tanks. Contact us with details about your material so we can confirm whether we can accept it.'],
      ['Can you provide recurring pickups?', 'Commercial customers can ask about a schedule based on tank capacity and usage. Availability and frequency are discussed for each property.'],
      ['Can you take hazardous or unknown waste?', 'Do not assume so. Tell us exactly what the tank contains before scheduling; this service is described for non-hazardous wastewater.'],
    ],
    related: [['Commercial septic services', '/commercial-septic-cleaning.html'], ['Septic tank pumping', '/septic-pumping.html']],
  },
];

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const origin = 'https://www.avacseptic.com';

function render(page) {
  const url = `${origin}/${page.file}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.eyebrow,
    url,
    description: page.description,
    provider: { '@id': `${origin}/#business` },
    areaServed: ['Huffman', 'Crosby', 'Atascocita', 'Kingwood', 'Northeast Houston'],
  };
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${url}">
  <link rel="icon" type="image/png" href="/images/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Lexend:wght@100..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/header.css">
  <link rel="stylesheet" href="/services.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <a class="services-skip" href="#main">Skip to content</a>
  <header class="navbar"></header>
  <nav class="breadcrumb" aria-label="Breadcrumb"><div class="breadcrumb__inner"><a href="/index.html">Home</a><span class="breadcrumb__sep" aria-hidden="true">›</span><a href="/services.html">Services</a><span class="breadcrumb__sep" aria-hidden="true">›</span><span class="breadcrumb__current">${esc(page.eyebrow)}</span></div></nav>
  <main id="main">
    <section class="services-hero detail-hero" aria-labelledby="page-title"><div class="services-wrap services-hero-grid">
      <div><p class="services-eyebrow">${esc(page.eyebrow)} · Huffman, TX</p><h1 id="page-title">${esc(page.heading)}</h1><p class="services-lead">${esc(page.lead)}</p>
        <div class="services-actions"><a class="services-button" href="/contact.html">Request service <span aria-hidden="true">↗</span></a><a class="services-call" href="tel:+18323182256">Call (832) 318-2256</a></div>
      </div><div class="services-hero-image"><img src="${page.image}" alt="${esc(page.imageAlt)}"></div>
    </div></section>
    <section class="services-section detail-intro" aria-labelledby="intro-title"><div class="services-wrap detail-intro-grid"><div><p class="services-eyebrow">The service</p><h2 id="intro-title">${esc(page.introHeading)}</h2><p>${esc(page.intro)}</p></div><div class="detail-highlights">${page.highlights.map(([heading, body]) => `<article><h3>${esc(heading)}</h3><p>${esc(body)}</p></article>`).join('')}</div></div></section>
    <section class="services-section detail-steps" aria-labelledby="steps-title"><div class="services-wrap"><div class="services-heading"><p class="services-eyebrow">Before we arrive</p><h2 id="steps-title">${esc(page.stepsHeading)}</h2></div><div class="detail-step-grid">${page.steps.map(([heading, body], index) => `<article><span class="services-index">0${index + 1}</span><h3>${esc(heading)}</h3><p>${esc(body)}</p></article>`).join('')}</div></div></section>
    <section class="services-section detail-faq" aria-labelledby="faq-title"><div class="services-wrap detail-faq-grid"><div><p class="services-eyebrow">Good to know</p><h2 id="faq-title">Common questions.</h2><p>For advice about your specific tank or property, call us with the details.</p></div><div>${page.faqs.map(([question, answer]) => `<details><summary>${esc(question)}</summary><p>${esc(answer)}</p></details>`).join('')}</div></div></section>
    <section class="services-section detail-related" aria-labelledby="related-title"><div class="services-wrap"><p class="services-eyebrow">Keep exploring</p><h2 id="related-title">Related services</h2><div class="detail-related-links">${page.related.map(([label, href]) => `<a href="${href}">${esc(label)} <span aria-hidden="true">↗</span></a>`).join('')}<a href="/services.html">All services <span aria-hidden="true">↗</span></a></div></div></section>
    <section class="services-section services-contact" aria-labelledby="contact-title"><div class="services-wrap services-contact-inner"><div><p class="services-eyebrow">Local service</p><h2 id="contact-title">Tell us about your property.</h2><p>Serving Huffman, Crosby, Atascocita, Kingwood, and nearby Northeast Houston communities. Share the address and service details so we can discuss pricing and availability.</p></div><div class="services-actions"><a class="services-button" href="/contact.html">Request service <span aria-hidden="true">↗</span></a><a class="services-call" href="tel:+18323182256">(832) 318-2256</a></div></div></section>
  </main>
  <footer class="site-footer"></footer>
</body>
</html>
`;
}

function build() {
  for (const page of pages) {
    fs.writeFileSync(path.join(__dirname, page.file), render(page));
    console.log(`Built ${page.file}`);
  }
}

module.exports = build;
if (require.main === module) build();
