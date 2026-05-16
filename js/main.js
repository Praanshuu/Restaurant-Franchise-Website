/**
 * main.js
 * Cinematic Concierge Experience (2026 Refinement)
 * Lenis Smooth Scroll, GSAP, and UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize Lenis Smooth Scrolling (Buttery smooth feel)
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
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
    } else {
        console.warn('Lenis not found. Smooth scrolling disabled.');
    }

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
        if (lenis) lenis.stop(); // Stop scroll when menu is open
    }

    function closeMenu() {
        menuOverlay.classList.remove('is-active');
        if (lenis) lenis.start();
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

    // Auto detect system theme
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlEl.setAttribute('data-theme', savedTheme);
    } else {
        htmlEl.setAttribute('data-theme', prefersDarkScheme.matches ? 'dark' : 'light');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Listen for system theme changes if user hasn't explicitly set a preference
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            htmlEl.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });

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
            if (fullMenuOverlay) fullMenuOverlay.classList.remove('is-active');
            if (lenis) {
                lenis.start();
                // Adding a slight delay to allow modal close animation to start before scrolling
                setTimeout(() => {
                    lenis.scrollTo('#reservation', { offset: -100 });
                }, 100);
            } else {
                const resSection = document.getElementById('reservation');
                if (resSection) resSection.scrollIntoView({ behavior: 'smooth' });
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
        const heroTl = gsap.timeline({ delay: 0.2 });
        
        heroTl.from('.hero-title', {
            y: 30,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
        .from('.hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.8"); // Overlap slightly for a smoother feel

        // Refresh ScrollTrigger on window resize to prevent layout shifts
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });

        // b. Horizontal Scroll for Tasting Menu Track
        const tastingSection = document.getElementById('tasting');
        const tastingTrack = document.getElementById('tastingTrack');

        if (tastingSection && tastingTrack) {
            let mm = gsap.matchMedia();

            // Removed GSAP scroll-hijacking for tasting track to allow native CSS horizontal scroll on all devices.

            // Mobile auto-glow for cards in view (UI/UX enhancement)
            const cards = tastingTrack.querySelectorAll('.hover-glow-card');
            if (cards.length > 0) {
                const observer = new IntersectionObserver((entries) => {
                    if (window.innerWidth <= 900) {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                entry.target.classList.add('is-active');
                            } else {
                                entry.target.classList.remove('is-active');
                            }
                        });
                    } else {
                        // Ensure clean state on desktop
                        cards.forEach(card => card.classList.remove('is-active'));
                    }
                }, {
                    root: tastingTrack, // Observe scrolling within the track container
                    threshold: 0.6      // Card must be 60% visible to glow
                });

                cards.forEach(card => observer.observe(card));
            }
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
