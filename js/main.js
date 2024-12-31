// Mouse Particle Effect
function createParticle(e) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random angle and distance
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 30;
    
    // Calculate end position
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    // Set particle position to mouse position
    particle.style.left = e.clientX + 'px';
    particle.style.top = e.clientY + 'px';
    
    // Set the transform variables
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Create particles on mouse move
let lastTime = 0;
const particleInterval = 20; // Reduced from 50ms to 20ms for more particles

document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    if (currentTime - lastTime > particleInterval) {
        createParticle(e);
        lastTime = currentTime;
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Language Switch
const langSwitch = document.querySelector('.lang-switch');
let isEnglish = false;

const translations = {
    tr: {
        home: 'Ana Sayfa',
        modelRockets: 'Model Roketler',
        spaceRockets: 'Uzay Roketleri',
        cubesat: 'CubeSat',
        satellites: 'Uydular',
        profile: 'Profil',
        explore: 'Uzayı Keşfet',
        description: 'Uzay teknolojileri hakkında derinlemesine bilgi edinin',
        about: 'Uzay teknolojileri hakkında her şey',
        contact: 'İletişim',
        socialMedia: 'Sosyal Medya',
        rights: 'Tüm hakları saklıdır.'
    },
    en: {
        home: 'Home',
        modelRockets: 'Model Rockets',
        spaceRockets: 'Space Rockets',
        cubesat: 'CubeSat',
        satellites: 'Satellites',
        profile: 'Profile',
        explore: 'Explore Space',
        description: 'Get in-depth knowledge about space technologies',
        about: 'Everything about space technologies',
        contact: 'Contact',
        socialMedia: 'Social Media',
        rights: 'All rights reserved.'
    }
};

langSwitch.addEventListener('click', () => {
    isEnglish = !isEnglish;
    langSwitch.textContent = isEnglish ? 'TR' : 'EN';
    updateLanguage(isEnglish ? 'en' : 'tr');
});

function updateLanguage(lang) {
    // Update navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        const key = link.getAttribute('href').replace('#', '');
        if (translations[lang][key]) {
            link.textContent = translations[lang][key];
        }
    });

    // Update hero section
    document.querySelector('.hero-content h1').textContent = translations[lang].explore;
    document.querySelector('.hero-content p').textContent = translations[lang].description;

    // Update footer
    document.querySelector('.footer-section p').textContent = translations[lang].about;
    document.querySelectorAll('.footer-section h3')[1].textContent = translations[lang].contact;
    document.querySelectorAll('.footer-section h3')[2].textContent = translations[lang].socialMedia;
    document.querySelector('.footer-bottom p').textContent = 
        `© ${new Date().getFullYear()} Space Network. ${translations[lang].rights}`;
}

// Intersection Observer for Fade In Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Yıldız Parçacıkları Oluşturma
function createStars() {
    const starField = document.getElementById('starField');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        
        // Rastgele pozisyon
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Rastgele animasyon süresi
        star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
        star.style.setProperty('--opacity', `${0.5 + Math.random() * 0.5}`);
        
        starField.appendChild(star);
    }
}

// Paralaks Efekti
function handleParallax() {
    const sections = document.querySelectorAll('.content-section');
    
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const distance = window.scrollY - section.offsetTop;
            const title = section.querySelector('h2');
            
            if (Math.abs(distance) < window.innerHeight) {
                title.style.transform = `translateZ(50px) translateY(${distance * 0.1}px)`;
            }
        });
    });
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    handleParallax();
});

// Hamburger Menü İşlemleri
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Mobil menü linklerine tıklandığında menüyü kapat
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Sayfa yüklendiğinde scroll pozisyonunu sıfırla
window.onload = function() {
    window.scrollTo(0, 0);
}; 