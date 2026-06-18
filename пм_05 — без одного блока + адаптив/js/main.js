const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation');

burger.addEventListener('click', () => {
    navigation.classList.toggle('active');
});

const sections = document.querySelectorAll('#about, #projects, #faq, #contact');
const navLinks = document.querySelectorAll('.navigation a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        const href = link.getAttribute('href');

        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

const contactBtns = document.querySelectorAll('.navigation button, .hero-button button:first-child');

contactBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const projectsBtn = document.querySelector('.hero-button button:last-child');

if (projectsBtn) {
    projectsBtn.addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });
}

const infoPopup = document.getElementById('info-popup');
const closeBtn = document.getElementById('close-info');
const notificationClosed = localStorage.getItem('infoNotificationClosed');

if (!notificationClosed) {
    setTimeout(() => {
        infoPopup.classList.add('show');
    }, 1500);
}

if (closeBtn) {
    closeBtn.addEventListener('click', function() {
        infoPopup.classList.remove('show');
        localStorage.setItem('infoNotificationClosed', 'true');
    });
}
