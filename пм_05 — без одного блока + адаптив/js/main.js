(function() {
    'use strict';

    const burger = document.querySelector('.burger');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.navigation a');
    const sections = document.querySelectorAll('#about, #projects, #faq, #contact');
    const contactBtns = document.querySelectorAll('.btn-contact');
    const projectsBtn = document.querySelector('.btn-projects');
    const infoPopup = document.getElementById('info-popup');
    const closeBtn = document.getElementById('close-info');

    function toggleBurger() {
        if (!burger || !navigation) return;
        const isActive = navigation.classList.toggle('active');
        burger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    }

    function closeBurger() {
        if (!navigation) return;
        navigation.classList.remove('active');
        if (burger) {
            burger.setAttribute('aria-expanded', 'false');
        }
    }

    if (burger) {
        burger.addEventListener('click', toggleBurger);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeBurger);
    });

    function updateActiveLink() {
        let currentSection = '';
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        const offset = headerHeight + 70;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
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
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateActiveLink();

    contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    if (projectsBtn) {
        projectsBtn.addEventListener('click', () => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    try {
        const notificationClosed = localStorage.getItem('infoNotificationClosed');

        if (!notificationClosed && infoPopup) {
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
    } catch (e) {
        console.warn('LocalStorage недоступен');
    }

})();