document.addEventListener('DOMContentLoaded', function() {
    
    // --- Element Selections ---
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = mobileMenuButton ? mobileMenuButton.querySelector('svg:first-child') : null;
    const closeIcon = mobileMenuButton ? mobileMenuButton.querySelector('svg:last-child') : null;
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const downloadCvBtn = document.getElementById('download-cv-btn');
    const downloadCvBtnMobile = document.getElementById('download-cv-btn-mobile');

    // --- Header Shadow on Scroll ---
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            openIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenuButton.click();
                }
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll-Triggered Fade-In Animations ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // --- Contact Form Submission ---
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            fetch("https://formspree.io/f/xgvzwnke", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
                    formStatus.style.color = "#64ffda";
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        formStatus.textContent = data.errors ? data.errors.map(error => error.message).join(", ") : "Oops! There was a problem submitting your form.";
                        formStatus.style.color = "#ff8a8a";
                    });
                }
            }).catch(error => {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
                formStatus.style.color = "#ff8a8a";
            });
        });
    }

    // --- CV Download Functionality ---
    const handleDownload = () => {
        const originalBtnText = "Download CV";
        if(downloadCvBtn) downloadCvBtn.innerHTML = 'Preparing...';
        if(downloadCvBtnMobile) downloadCvBtnMobile.innerHTML = 'Preparing...';

        // Get the CV content directly from the hidden container in the HTML
        const cvElement = document.getElementById('cv-container');
        
        if (cvElement) {
            const opt = {
                margin:       0,
                filename:     'Bhupal_Bhattarai_CV.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Generate the PDF from the element
            html2pdf().from(cvElement).set(opt).save().then(() => {
                if(downloadCvBtn) downloadCvBtn.innerHTML = originalBtnText;
                if(downloadCvBtnMobile) downloadCvBtnMobile.innerHTML = originalBtnText;
            });

        } else {
            console.error("CV content container (#cv-container) not found in the document.");
            alert("Could not generate PDF. Content not found.");
            if(downloadCvBtn) downloadCvBtn.innerHTML = originalBtnText;
            if(downloadCvBtnMobile) downloadCvBtnMobile.innerHTML = originalBtnText;
        }
    };

    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleDownload();
        });
    }
    if (downloadCvBtnMobile) {
         downloadCvBtnMobile.addEventListener('click', (e) => {
            e.preventDefault();
            handleDownload();
        });
    }
});
