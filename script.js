document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    
    // Add smooth scroll behavior to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });

    // Handle scroll events (debounced)
    window.addEventListener('scroll', debounce(() => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        toggleScrollToTopBtn(scrollPosition);
        highlightActiveNavLink(scrollPosition);
        fadeInSections();
    }, 100));

    // Show/Hide scroll-to-top button
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Remove active class from all nav links
    function removeActiveClass() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Add active class to the current section link
    function addActiveClass(id) {
        const activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
    }

    // Highlight the nav link based on the current scroll position
    function highlightActiveNavLink(scrollPosition) {
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 50;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentId = section.getAttribute("id");
                removeActiveClass();
                addActiveClass(currentId);
            }
        });
    }

    // Show/Hide scroll-to-top button based on scroll position
    function toggleScrollToTopBtn(scrollPosition) {
        if (scrollPosition > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    // Fade-in sections when they enter the viewport
    function fadeInSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    }

    // Debounce function to limit the number of times the scroll event triggers
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Initial call to fade-in sections on page load
    fadeInSections();
});
