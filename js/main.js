/**
 * main.js
 * Cinematic Concierge Experience (2026 Refinement)
 * Lenis Smooth Scroll, GSAP, and UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Lenis Smooth Scrolling (Buttery smooth feel)
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }

    // 2. Full Screen Menu Overlay
    const menuTrigger = document.getElementById('menuTriggerBtn');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const navItems = document.querySelectorAll('.nav-item');

    function openMenu() {
        menuOverlay.classList.add('is-active');
        lenis.stop(); // Stop scroll when menu is open
    }

    function closeMenu() {
        menuOverlay.classList.remove('is-active');
        lenis.start();
    }

    if (menuTrigger && menuCloseBtn && menuOverlay) {
        menuTrigger.addEventListener('click', openMenu);
        menuCloseBtn.addEventListener('click', closeMenu);
        
        // Close menu on link click with slight delay
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                setTimeout(closeMenu, 150);
            });
        });
    }

    // 3. Theme Toggle Control
    const themeBtn = document.getElementById('themeToggleBtn');
    const htmlEl = document.documentElement;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            htmlEl.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // 4. GSAP Animations Setup
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // a. Hero text reveal - Staggered fade and slide up
        gsap.from('.hero-title', {
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2
        });

        gsap.from('.hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.6
        });

        // b. Horizontal Scroll for Tasting Menu Track
        const tastingSection = document.getElementById('tasting');
        const tastingTrack = document.getElementById('tastingTrack');

        if (tastingSection && tastingTrack) {
            // Use functional values for full responsiveness on resize
            gsap.to(tastingTrack, {
                x: () => -(tastingTrack.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: tastingSection,
                    pin: true,
                    scrub: 1, // Smooth scrubbing
                    start: "center center",
                    end: () => `+=${tastingTrack.scrollWidth - window.innerWidth}`, 
                    invalidateOnRefresh: true
                }
            });
        }

        // c. Parallax effects for atmospheric image
        gsap.utils.toArray('.parallax-img').forEach(image => {
            gsap.to(image, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: image.parentElement,
                    start: "top bottom", 
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // d. Standard Fade Up elements
        gsap.utils.toArray('.fade-up').forEach(element => {
            
            // Allow CSS to handle staggering by passing in delay classes
            let animationDelay = 0;
            if (element.classList.contains('delay-1')) animationDelay = 0.2;
            if (element.classList.contains('delay-2')) animationDelay = 0.4;
            if (element.classList.contains('delay-3')) animationDelay = 0.6;

            gsap.from(element, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: animationDelay,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%", // Trigger right before it comes completely into view
                    toggleActions: "play none none none"
                }
            });
        });
    }
});
