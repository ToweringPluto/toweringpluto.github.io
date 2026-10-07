/* ==========================================================================
   Stephen Olaluwoye — Portfolio Scripts
   Scroll-spy navigation + smooth scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main > section[id]');

  /* ---------- Scroll-spy via IntersectionObserver ---------- */
  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  /* ---------- Smooth scroll on nav click ---------- */
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveLink(targetId);
      }
    });
  });

  /* ---------- Default active state ---------- */
  if (navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }
});
