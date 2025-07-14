document.addEventListener('DOMContentLoaded', function() {
    
    // --- Blog Posts Database ---
    // To add, edit, or remove a blog post, just modify this array.
    const posts = [
        {
            id: 1,
            title: "My Journey into Web Development",
            date: "July 15, 2025",
            category: "Web Development",
            image: "https://placehold.co/600x400/0a192f/64ffda?text=Blog+Post+1",
            excerpt: "A look back at how I started my journey into the world of web development and the key lessons I've learned along the way...",
            content: `
                <h1 class="text-4xl font-bold text-accent mb-4">My Journey into Web Development</h1>
                <p class="text-gray-400 mb-8">Posted on July 15, 2025 in Web Development</p>
                <img src="https://placehold.co/800x400/0a192f/64ffda?text=Journey" alt="My Journey into Web Development" class="rounded-lg mb-8">
                <div class="prose">
                    <p>This is the full content of the first blog post. It all started with a simple "Hello, World!" and from there, a passion was born. Learning the fundamentals of HTML, CSS, and JavaScript opened up a new universe of creative possibilities.</p>
                    <h2>The First Steps</h2>
                    <p>Like many, my first steps were tentative. I followed tutorials, built simple static pages, and slowly gained confidence. The key was consistency and not being afraid to break things. Every error message was a learning opportunity, a puzzle waiting to be solved.</p>
                    <h2>Key Takeaways</h2>
                    <ul class="list-disc list-inside space-y-2">
                        <li><strong>Never stop learning:</strong> The web evolves constantly.</li>
                        <li><strong>Build projects:</strong> Theory is good, but practice is better.</li>
                        <li><strong>Join a community:</strong> You don't have to learn in isolation.</li>
                    </ul>
                    <p>The journey is far from over, but looking back, it's incredible to see how far I've come. The best is yet to come!</p>
                </div>
            `
        },
        {
            id: 2,
            title: "The Principles of Good Frontend Design",
            date: "July 10, 2025",
            category: "Design",
            image: "https://placehold.co/600x400/0a192f/64ffda?text=Blog+Post+2",
            excerpt: "Exploring the core principles that make a user interface not just beautiful, but also intuitive and effective...",
            content: `
                <h1 class="text-4xl font-bold text-accent mb-4">The Principles of Good Frontend Design</h1>
                <p class="text-gray-400 mb-8">Posted on July 10, 2025 in Design</p>
                <img src="https://placehold.co/800x400/0a192f/64ffda?text=Design" alt="The Principles of Good Frontend Design" class="rounded-lg mb-8">
                <div class="prose">
                    <p>Good design is more than just aesthetics; it's about creating a seamless and enjoyable experience for the user. This article explores some of the core principles that guide effective frontend design.</p>
                    <h2>Clarity and Simplicity</h2>
                    <p>A user should never have to guess what to do next. A clean layout, clear hierarchy, and intuitive navigation are paramount. Less is often more.</p>
                    <h2>Consistency</h2>
                    <p>Elements like buttons, links, and menus should look and behave consistently throughout the application. This builds familiarity and makes the interface easier to learn and use.</p>
                </div>
            `
        },
        {
            id: 3,
            title: "Transitioning from IT to a Creative Role",
            date: "July 05, 2025",
            category: "Career",
            image: "https://placehold.co/600x400/0a192f/64ffda?text=Blog+Post+3",
            excerpt: "How my background in IT operations has surprisingly helped me in my creative pursuits and what you can learn from it...",
            content: `
                <h1 class="text-4xl font-bold text-accent mb-4">Transitioning from IT to a Creative Role</h1>
                <p class="text-gray-400 mb-8">Posted on July 05, 2025 in Career</p>
                <img src="https://placehold.co/800x400/0a192f/64ffda?text=Career" alt="Transitioning from IT to a Creative Role" class="rounded-lg mb-8">
                <div class="prose">
                    <p>Moving from a structured field like IT to a more creative role can seem daunting, but many of the skills are surprisingly transferable. Problem-solving, attention to detail, and logical thinking are assets in any field.</p>
                    <h2>Bridging the Gap</h2>
                    <p>My background in IT gave me a unique perspective. I understood the technical constraints and possibilities, which allowed me to design solutions that were not only creative but also feasible. This blend of technical knowledge and creative vision has been invaluable.</p>
                </div>
            `
        }
    ];

    // --- Element Selections ---
    const header = document.getElementById('header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const openIcon = mobileMenuButton ? mobileMenuButton.querySelector('svg:first-child') : null;
    const closeIcon = mobileMenuButton ? mobileMenuButton.querySelector('svg:last-child') : null;
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const blogPostsContainer = document.getElementById('blog-posts-container');
    const postContentContainer = document.getElementById('post-content');

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

    // --- Blog Functionality ---
    // Populate the blog listing page
    if (blogPostsContainer) {
        blogPostsContainer.innerHTML = ''; // Clear placeholder content
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-card', 'fade-in');
            postElement.innerHTML = `
                <a href="Blogs/post.html?id=${post.id}">
                    <img src="${post.image}" alt="${post.title}" class="rounded-t-lg">
                    <div class="p-6">
                        <p class="text-sm text-gray-400 mb-2">${post.date} • ${post.category}</p>
                        <h3 class="text-xl font-semibold text-gray-100 mb-3">${post.title}</h3>
                        <p class="text-gray-400">${post.excerpt}</p>
                    </div>
                </a>
            `;
            blogPostsContainer.appendChild(postElement);
            appearOnScroll.observe(postElement); // Make new cards fade in
        });
    }

    // Populate the individual blog post page
    if (postContentContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));
        const post = posts.find(p => p.id === postId);

        if (post) {
            document.title = `${post.title} | Bhupal Bhattarai`;
            postContentContainer.innerHTML = `<div class="content-wrapper mx-auto">${post.content}</div>`;
        } else {
            postContentContainer.innerHTML = `<div class="text-center"><p class="text-xl text-gray-400">Post not found.</p><a href="../blog.html" class="cta-button mt-8">Back to Blog</a></div>`;
        }
    }
});
