function initNavbar() {
  const nav      = document.querySelector(".navbar");
  const menuBtn  = document.getElementById("menuBtn");
  const megaMenu = document.getElementById("megaMenu");

  let __lockY = 0;

function lockBodyScroll(){
  // only lock on mobile
  if (!isMobileMenu()) return;

  __lockY = window.scrollY || window.pageYOffset;

  document.body.classList.add("is-locked");
  document.body.style.top = `-${__lockY}px`;
}

function unlockBodyScroll(){
  // ✅ only run if we previously locked the body
  if (!document.body.classList.contains("is-locked")) return;

  document.body.classList.remove("is-locked");

  const y = __lockY || 0;
  document.body.style.top = "";
  window.scrollTo(0, y);

  __lockY = 0;
}

  // If this page doesn't have the navbar yet (or you inject it later), bail safely.
  if (!nav || !menuBtn || !megaMenu) return;

  const mainItems = megaMenu.querySelectorAll(".mega-main-item");
  const panels    = megaMenu.querySelectorAll(".mega-panel");

  const megaLeft  = megaMenu.querySelector(".mega-left");
  const megaRight = megaMenu.querySelector(".mega-right");

 const FALLBACK_PANEL = "panel-services";

function getInitialPanelId() {
  // Prefer whatever the HTML already marks as active
  const activePanel = megaMenu.querySelector(".mega-panel.is-active");
  if (activePanel?.id) return activePanel.id;

  // Or if the left link is marked active, use that
  const activeBtn = megaMenu.querySelector(".mega-main-item.is-active[data-panel]");
  if (activeBtn?.dataset?.panel) return activeBtn.dataset.panel;

  // Fallback
  return FALLBACK_PANEL;
}

  function isMobileMenu() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function activatePanel(panelId) {
    mainItems.forEach(b => b.classList.toggle("is-active", b.dataset.panel === panelId));
    panels.forEach(p => p.classList.toggle("is-active", p.id === panelId));
  }

  // --- MOBILE: create slots under buttons (Services/Sectors) ---
  function ensureMobileSlots() {
    if (!megaLeft) return;

    mainItems.forEach((item) => {
      const panelId = item.dataset.panel;
      if (!panelId) return;

      const next = item.nextElementSibling;
      const alreadySlot =
        next &&
        next.classList &&
        next.classList.contains("mega-slot") &&
        next.dataset.for === panelId;

      if (alreadySlot) return;

      const slot = document.createElement("div");
      slot.className = "mega-slot";
      slot.dataset.for = panelId;

      item.insertAdjacentElement("afterend", slot);
    });
  }

  function movePanelsToMobile() {
    if (!megaLeft) return;

    ensureMobileSlots();

    panels.forEach((p) => {
      const slot = megaLeft.querySelector(`.mega-slot[data-for="${p.id}"]`);
      if (slot) slot.appendChild(p); // ✅ move under its corresponding button
    });
  }

function movePanelsToDesktop() {
  if (!megaRight) return;

  const social = megaRight.querySelector(".mega-social"); // anchor (exists in your HTML)

  panels.forEach((p) => {
    // only move if it's not already in the right place
    if (p.parentElement === megaRight) return;

    // put panels back BEFORE social (so order matches your original HTML)
    if (social) megaRight.insertBefore(p, social);
    else megaRight.appendChild(p);
  });
}
  function syncMegaLayout() {
    if (isMobileMenu()) movePanelsToMobile();
    else movePanelsToDesktop();
  }

  function closeAllMobilePanels() {
    mainItems.forEach(b => b.classList.remove("is-active"));
    panels.forEach(p => p.classList.remove("is-open"));
  }

  function openMega() {
  megaMenu.classList.add("open");
  menuBtn.classList.add("is-open");
  menuBtn.setAttribute("aria-expanded", "true");

  nav.classList.add("open");
  nav.classList.remove("at-top");
  nav.classList.add("scrolled-up", "navbar-bg");
  nav.classList.remove("hidden");

  syncMegaLayout();

  if (isMobileMenu()) {
    closeAllMobilePanels();
    lockBodyScroll();          // ✅ add this
  } else {
    activatePanel(getInitialPanelId());
  }
}

function closeMega() {
  megaMenu.classList.remove("open");
  menuBtn.classList.remove("is-open");
  menuBtn.setAttribute("aria-expanded", "false");

  nav.classList.remove("open");
  closeAllMobilePanels();

  unlockBodyScroll();          // ✅ add this (safe even on desktop)

  if ((window.__scrollY ?? window.scrollY) <= 5) {
    nav.classList.add("at-top");
    nav.classList.remove("scrolled-up", "navbar-bg", "hovered");
  }
}
  // IMPORTANT: prevent "#" jump
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    megaMenu.classList.contains("open") ? closeMega() : openMega();
  });

  // Click behavior for main items:
  // - About Us (no data-panel) navigates normally
  // - Desktop: tab switch
  // - Mobile: accordion expand under its button
  mainItems.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const panelId = btn.dataset.panel;

      // About Us (no panel): let it navigate
      if (!panelId) return;

      const mobile = isMobileMenu();

      // Desktop: tabs
      if (!mobile) {
        e.preventDefault();
        activatePanel(panelId);
        return;
      }

      // Mobile: accordion
      e.preventDefault();

      // make sure panels are physically under their buttons
      syncMegaLayout();

      const targetPanel = megaMenu.querySelector("#" + panelId);
      const isOpen = targetPanel?.classList.contains("is-open");

      // close all first
      closeAllMobilePanels();

      // toggle current
      if (!isOpen) {
        btn.classList.add("is-active");
        targetPanel?.classList.add("is-open");
      }
    });
  });

  // Close menu if click outside
  document.addEventListener("click", (e) => {
    if (!megaMenu.classList.contains("open")) return;
    const clickedInside = megaMenu.contains(e.target) || menuBtn.contains(e.target);
    if (!clickedInside) closeMega();
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && megaMenu.classList.contains("open")) closeMega();
  });

  function setNavByScroll(y) {
    const atTop = y <= 5;

    if (atTop) {
      if (!megaMenu.classList.contains("open")) {
        nav.classList.add("at-top");
        nav.classList.remove("scrolled-up", "navbar-bg");
      }
    } else {
      nav.classList.remove("at-top");
      nav.classList.add("scrolled-up", "navbar-bg");
    }
  }

  window.addEventListener("scroll", () => setNavByScroll(window.scrollY));
  setNavByScroll(window.scrollY); // run once on load

  // ✅ Keep DOM layout correct if resizing / rotating
  window.addEventListener("resize", () => {
    // only bother syncing if menu is open OR if you want it always correct
    syncMegaLayout();
  });
}

// Run now (works on normal pages)
document.addEventListener("DOMContentLoaded", initNavbar);

// Expose for injected header pages (call initNavbar() after you insert header.html)
window.initNavbar = initNavbar;
  // auto year
  document.getElementById("year").textContent = new Date().getFullYear();



  