// ========== IMPOSTERS — Band Website ==========

// >>> Change this to your band's real email <<<
const BAND_EMAIL = "yourband@email.com";

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Logo fallback: if assets/logo.png is missing, show styled text instead
const hero = document.getElementById("home");
const heroLogo = document.getElementById("heroLogo");
if (heroLogo) {
  heroLogo.addEventListener("error", () => hero.classList.add("no-logo"));
  if (heroLogo.complete && heroLogo.naturalWidth === 0) hero.classList.add("no-logo");
}

// Navbar: background on scroll
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
const closeMenu = () => {
  toggle.classList.remove("open");
  links.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
};
toggle.addEventListener("click", () => {
  const open = toggle.classList.toggle("open");
  links.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
});
links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

// Reveal on scroll
document.querySelectorAll(".section__title, .card, .member, .show, .gallery__item, .gallery img, .about, .form, .embed")
  .forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Count-up stats
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

// Contact form -> opens the visitor's email app (no backend needed)
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const subject = encodeURIComponent(`Message from ${name} (IMPOSTERS website)`);
  const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
  window.location.href = `mailto:${BAND_EMAIL}?subject=${subject}&body=${body}`;
});
