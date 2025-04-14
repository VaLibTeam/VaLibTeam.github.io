// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    let currentSection = "";
    const offset = 100;

    window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY;

        sections.forEach(section => {
            const top = section.offsetTop - offset;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {
                const id = section.getAttribute("id");

                if (currentSection !== id) {
                    history.replaceState(null, null, `#${id}`);
                    currentSection = id;
                }
            }
        });
    });
});

// Add animation when scrolling to sections
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const toggleIcon = document.querySelector('.toggle-icon i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        toggleIcon.classList.remove('fa-sun');
        toggleIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// cards
document.querySelectorAll('.feature-card').forEach(card => {
    const readMoreBtn = card.querySelector('.read-more');
    const more = card.querySelector('.more');
    let timeout;

    readMoreBtn.addEventListener('click', () => {
        const expanded = card.dataset.expanded === "true";

        if (!expanded) {
            more.style.height = more.scrollHeight + "px";
            card.dataset.expanded = "true";
        } else {
            more.style.height = more.scrollHeight + "px"; // Start from current height
            requestAnimationFrame(() => {
                more.style.height = "0px";
                card.dataset.expanded = "false";
            });
        }

        clearTimeout(timeout);
    });

    card.addEventListener('mouseleave', () => {
        if (card.dataset.expanded === "true") {
            timeout = setTimeout(() => {
                more.style.height = "0px";
                card.dataset.expanded = "false";
            }, 5000);
        }
    });

    card.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
    });

    // Reset inline style on transition end
    more.addEventListener('transitionend', () => {
        if (card.dataset.expanded === "true") {
            more.style.height = "auto";
        }
    });
});

// Check for saved theme preference
if (localStorage.getItem('theme') == 'dark') {
    document.body.classList.add('dark-mode');
    toggleIcon.classList.remove('fa-moon');
    toggleIcon.classList.add('fa-sun');
}

if (!('theme' in localStorage)) {
    localStorage.setItem('theme', 'dark');
}