document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = mobileMenuButton.querySelector('svg:first-child');
    const closeIcon = mobileMenuButton.querySelector('svg:last-child');

    // --- Header Shadow on Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });
    
    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('transform');
        mobileMenu.classList.toggle('-translate-y-full');
        openIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                 mobileMenuButton.click();
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Scroll Animations ---
    const faders = document.querySelectorAll('.fade-.in');
    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start animating a bit before it's fully in view
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
