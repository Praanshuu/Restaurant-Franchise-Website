/**
 * main.js
 * Functionality for sticky nav, scroll fade animations, etc.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initScrollAnimations();
});

function initStickyNav() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScrollTop = 0;
  const delta = 5;
  const navbarHeight = navbar.offsetHeight;

  window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background on scroll down
    if (st > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Smart Scroll: Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      navbar.classList.add('nav-up');
    } else {
      // Scroll Up
      if (st + window.innerHeight < document.documentElement.scrollHeight) {
        navbar.classList.remove('nav-up');
      }
    }

    lastScrollTop = st;
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in-section');
  if (!elements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}
