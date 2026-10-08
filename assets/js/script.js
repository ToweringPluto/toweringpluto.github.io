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

  /* ---------- Mouse-responsive background glow ---------- */
  const glow = document.createElement('div');
  glow.classList.add('mouse-glow');
  document.body.appendChild(glow);

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const lerp = (start, end, factor) => start + (end - start) * factor;

  const animateGlow = () => {
    currentX = lerp(currentX, mouseX, 0.1);
    currentY = lerp(currentY, mouseY, 0.1);
    glow.style.transform = `translate(${currentX - 600}px, ${currentY - 600}px)`;
    requestAnimationFrame(animateGlow);
  };

  requestAnimationFrame(animateGlow);

  /* ---------- Scroll reveal: fade-in-up on enter ---------- */
  const reveals = document.querySelectorAll('.about-text p, .experience-item, .project-card, .footer');

  reveals.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => revealObserver.observe(el));
});
