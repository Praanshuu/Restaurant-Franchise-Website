/**
 * main.js
 * Functionality for sticky nav and scroll storytelling animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initStickyNav();
    initScrollAnimations();
});

function initStickyNav() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

function initScrollAnimations() {
    // Select elements that should reveal on scroll
    const revealElements = document.querySelectorAll('.scroll-reveal, .fade-up-sequence');
    if (!revealElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before the element enters
        threshold: 0.1 // 10% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed if you only want it to happen once
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}
