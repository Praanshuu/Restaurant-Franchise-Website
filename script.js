/* 
  Vellum & Vine | Interactive Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Navbar Scroll Effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 3. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Franchise Inquiry Form Handling (Mock)
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = inquiryForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                inquiryForm.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <h3 class="playfair" style="color: var(--accent);">Application Received</h3>
                        <p class="inter">Thank you for your interest in Vellum & Vine. Our franchise development team will reach out to you within 48 hours.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // 5. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navCtas = document.querySelector('.nav-ctas');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.classList.toggle('active');
            
            // Simple mobile menu overlay logic
            if (isExpanded) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--bg-primary)';
                navLinks.style.padding = '40px';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                
                navCtas.style.display = 'flex';
                navCtas.style.flexDirection = 'column';
                navCtas.style.padding = '0 40px 40px';
                navCtas.style.background = 'var(--bg-primary)';
            } else {
                navLinks.style.display = 'none';
                navCtas.style.display = 'none';
            }
        });
    }

    // 6. Hero Parallax Effect
    const heroImg = document.querySelector('.hero-bg img');
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        if (heroImg) {
            heroImg.style.transform = `scale(1.05) translateY(${scroll * 0.3}px)`;
        }
    });

});
