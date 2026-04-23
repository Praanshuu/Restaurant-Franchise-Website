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

    // Navbar Scroll-to-Hide Logic (Delegated to robust GSAP ScrollTrigger below)
    const navbar = document.getElementById('navbar');

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

    // 3.5 Full Menu Overlay Logic
    const openFullMenuBtn = document.getElementById('openFullMenuBtn');
    const openFullMenuFapBtn = document.getElementById('openFullMenuFapBtn');
    const fullMenuOverlay = document.getElementById('fullMenuOverlay');
    const closeMenuOverlayBtn = document.getElementById('closeMenuOverlayBtn');
    const menuOverlayReserveBtn = document.getElementById('menuOverlayReserveBtn');

    const openMenuOverlay = () => {
        if (fullMenuOverlay) {
            fullMenuOverlay.classList.add('is-active');
            // Note: Since we use data-lenis-prevent, we don't necessarily need to stop Lenis,
            // but stopping it ensures the background page cannot be scrolled by keyboard.
            if (typeof lenis !== 'undefined') lenis.stop();
        }
    };

    if (openFullMenuBtn) openFullMenuBtn.addEventListener('click', openMenuOverlay);
    if (openFullMenuFapBtn) openFullMenuFapBtn.addEventListener('click', openMenuOverlay);

    if (fullMenuOverlay && closeMenuOverlayBtn) {
        closeMenuOverlayBtn.addEventListener('click', () => {
            fullMenuOverlay.classList.remove('is-active');
            if (typeof lenis !== 'undefined') lenis.start();
        });
    }

    if (menuOverlayReserveBtn) {
        menuOverlayReserveBtn.addEventListener('click', () => {
            fullMenuOverlay.classList.remove('is-active');
            if (typeof lenis !== 'undefined') {
                lenis.start();
                // Adding a slight delay to allow modal close animation to start before scrolling
                setTimeout(() => {
                    lenis.scrollTo('#reservation', { offset: -100 });
                }, 100);
            } else {
                document.getElementById('reservation').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 4. GSAP Animations Setup
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 0. Navbar Hide/Show on Scroll
        if (navbar) {
            ScrollTrigger.create({
                start: "top -50",
                end: 99999,
                onUpdate: (self) => {
                    if (self.direction === 1) {
                        navbar.classList.add('nav-hidden');
                    } else {
                        navbar.classList.remove('nav-hidden');
                    }
                }
            });
        }

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
            // Calculate the right-side padding to add as breathing room at the end
            const getRightPad = () => {
                const padStr = getComputedStyle(document.documentElement)
                    .getPropertyValue('--content-padding').trim();
                // Parse the computed pixel value from the container style
                const dummy = document.createElement('div');
                dummy.style.cssText = `position:absolute;visibility:hidden;width:${padStr}`;
                document.body.appendChild(dummy);
                const px = dummy.getBoundingClientRect().width;
                document.body.removeChild(dummy);
                return px;
            };

            gsap.to(tastingTrack, {
                // Stop short by one content-padding so last card doesn't sit at edge;
                // the ::after pseudo adds visual padding after the last card too.
                x: () => -(tastingTrack.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: tastingSection,
                    pin: true,
                    scrub: 1,
                    // Center the natural-height section in the viewport while scrolling
                    start: "center center",
                    end: () => `+=${tastingTrack.scrollWidth - window.innerWidth}`,
                    invalidateOnRefresh: true
                }
            });
        }

        // c. Parallax effects for atmospheric image
        gsap.utils.toArray('.parallax-img').forEach(image => {
            // Start slightly zoomed in for a cinematic dolly-out effect
            gsap.set(image, { scale: 1.15 });

            gsap.to(image, {
                yPercent: -20,
                scale: 1,
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

    // 5. Map Interaction Fix (Prevent scroll glitch on mobile)
    const mapContainer = document.getElementById('mapContainer');
    const mapIframe = document.getElementById('mapIframe');

    if (mapContainer && mapIframe) {
        mapContainer.addEventListener('click', () => {
            mapIframe.style.pointerEvents = 'auto';
        });
        
        // Optional: Re-disable on mouse leave (desktop)
        mapContainer.addEventListener('mouseleave', () => {
            mapIframe.style.pointerEvents = 'none';
        });
    }
});
