// Wait for the entire HTML document to be loaded and parsed before running the script.
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Element Selections ---
    // Get references to DOM elements needed for interactivity.
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = mobileMenuButton.querySelector('svg:first-child');
    const closeIcon = mobileMenuButton.querySelector('svg:last-child');

    // --- Header Shadow on Scroll ---
    // Add a shadow to the header when the user scrolls down.
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });
    
    // --- Mobile Menu Toggle ---
    // Handle the opening and closing of the mobile navigation menu.
    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('transform');
        mobileMenu.classList.toggle('-translate-y-full');
        openIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // --- Smooth Scrolling for Anchor Links ---
    // Intercept clicks on links that start with '#' to create a smooth scroll effect.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent the default jump-to-anchor behavior.
            
            // If the mobile menu is open, close it before scrolling.
            if (!mobileMenu.classList.contains('hidden')) {
                 mobileMenuButton.click();
            }

            // Find the target element and scroll to it smoothly.
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Scroll-Triggered Fade-In Animations ---
    // Select all elements that should fade in on scroll.
    const faders = document.querySelectorAll('.fade-in');
    
    // Set up the options for the Intersection Observer.
    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible.
        rootMargin: "0px 0px -50px 0px" // Start the animation a bit early.
    };

    // Create a new Intersection Observer.
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // If the element is not in the viewport, do nothing.
            if (!entry.isIntersecting) {
                return;
            } 
            // If the element is in the viewport, add the 'visible' class to trigger the animation.
            else {
                entry.target.classList.add('visible');
                // Stop observing the element so the animation doesn't repeat.
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    // Attach the observer to each element that has the 'fade-in' class.
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});
