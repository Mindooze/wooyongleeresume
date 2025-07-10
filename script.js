lucide.createIcons();

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const html = document.documentElement;

if (localStorage.getItem('dark-mode') === 'true' || 
    (!('dark-mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
}

darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('dark-mode', html.classList.contains('dark'));
});

// Smooth Scrolling & Active Nav Link
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section > div').forEach(el => {
    observer.observe(el);
});

// Modal Logic
const certCards = document.querySelectorAll('.cert-card');
const certModal = document.getElementById('cert-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const certModalClose = document.getElementById('cert-modal-close');

certCards.forEach(card => {
    card.addEventListener('click', () => {
        const certId = card.dataset.certId;
        const lang = document.body.getAttribute('lang') || 'ko';
        
        const titleKey = `cert_modal_title_${certId}`;
        const descKey = `cert_modal_desc_${certId}`;

        modalTitle.textContent = translations[lang][titleKey];
        modalDesc.textContent = translations[lang][descKey];
        certModal.classList.remove('hidden');
        certModal.classList.add('flex');
        lucide.createIcons(); // Re-create icons in the modal
    });
});

certModalClose.addEventListener('click', () => {
    certModal.classList.add('hidden');
    certModal.classList.remove('flex');
});

certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
        certModal.classList.add('hidden');
        certModal.classList.remove('flex');
    }
});

// Project Modal Logic
const projectsData = {
    furball: {
        title: '털뭉치 수색대 (Furball Rangers)',
        description: 'Awaiting description...',
        images: ['assets/eng-full.png', 'assets/kor-full.png', 'assets/kor-admin.png', 'assets/eng-veri.png', 'assets/kor-mob.png', 'assets/project-map.png'],
        buttons: [
            { text: 'Live Demo', url: 'http://furballrangers.replit.app' }
        ]
    },
    aiworkflow: {
        title: 'AI 자동화 워크플로우',
        description: 'Awaiting description...',
        images: ['assets/n8nfront.png', 'assets/n8nworkflow1.png', 'assets/n8nworkflow2.png', 'assets/n8nworkflow3.png'],
        buttons: []
    },
    resume: {
        title: '인터랙티브 웹 이력서',
        description: 'Awaiting description...',
        images: ['assets/resumesite.png'],
        buttons: []
    },
    insomnia: {
        title: '국내 최초 디지털 치료제 개발',
        description: 'Awaiting description...',
        images: ['assets/insomnia0.png', 'assets/insomnia.png', 'assets/insomnia1.png', 'assets/insomnia2.png', 'assets/insomnia3.png'],
        buttons: []
    },
    vr: {
        title: 'VR 기반 작업치료 플랫폼',
        description: 'Awaiting description...',
        images: ['assets/VR.png', 'assets/VR1.png', 'assets/VR2.png', 'assets/VR3.png'],
        buttons: []
    },
    adhd: {
        title: 'ADHD 아동용 DTx 앱',
        description: 'Awaiting description...',
        images: ['assets/adhd.png', 'assets/adhd1.png', 'assets/adhd2.png'],
        buttons: []
    },
    dementia: {
        title: '치매 환자용 테스트/훈련 앱',
        description: 'Awaiting description...',
        images: ['assets/cover_brainfit.png', 'assets/brainfit1.png', 'assets/brainfit2.png'],
        buttons: []
    }
};

const projectCards = document.querySelectorAll('.project-card-clickable');
const projectModal = document.getElementById('project-modal');
const projectModalTitle = document.getElementById('project-modal-title');
const projectModalDesc = document.getElementById('project-modal-desc');
const projectModalGallery = document.getElementById('project-modal-gallery');
const projectModalButtons = document.getElementById('project-modal-buttons');
const projectModalClose = document.getElementById('project-modal-close');
let currentImageIndex = 0;

function showImage(project, index) {
    const images = project.images;
    const galleryContent = `
        <div class="relative">
            <img src="${images[index]}" alt="Project image ${index + 1}" class="w-full h-64 md:h-96 object-contain rounded-lg">
            ${images.length > 1 ? `
            <button class="gallery-nav prev absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"><i data-lucide="chevron-left"></i></button>
            <button class="gallery-nav next absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"><i data-lucide="chevron-right"></i></button>
            ` : ''}
        </div>
        <div class="flex justify-center items-center space-x-2 mt-4">
            ${images.map((_, i) => `<button class="indicator ${i === index ? 'active' : ''}" data-index="${i}"></button>`).join('')}
        </div>
    `;
    projectModalGallery.innerHTML = galleryContent;
    
    // Buttons
    projectModalButtons.innerHTML = '';
    if (project.buttons && project.buttons.length > 0) {
        project.buttons.forEach(buttonInfo => {
            const button = document.createElement('a');
            button.href = buttonInfo.url;
            button.target = '_blank';
            button.className = 'btn btn-primary';
            button.textContent = buttonInfo.text;
            projectModalButtons.appendChild(button);
        });
    }

    lucide.createIcons();

    if (images.length > 1) {
        projectModalGallery.querySelector('.prev').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(project, currentImageIndex);
        });
        projectModalGallery.querySelector('.next').addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(project, currentImageIndex);
        });
        projectModalGallery.querySelectorAll('.indicator').forEach(ind => {
            ind.addEventListener('click', (e) => {
                currentImageIndex = parseInt(e.target.dataset.index);
                showImage(project, currentImageIndex);
            });
        });
    }
}

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.dataset.projectId;
        const project = projectsData[projectId];
        if (project) {
            projectModalTitle.textContent = project.title;
            projectModalDesc.textContent = project.description;
            currentImageIndex = 0;
            showImage(project, currentImageIndex);
            projectModal.classList.remove('hidden');
            projectModal.classList.add('flex');
        }
    });
});

projectModalClose.addEventListener('click', () => {
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('flex');
    }
});

// Language Toggle
const langToggle = document.getElementById('lang-toggle');
let translations = {};

async function loadTranslations() {
    const response = await fetch('translations.json');
    translations = await response.json();
    const lang = localStorage.getItem('language') || 'ko';
    setLanguage(lang);
}

function setLanguage(lang) {
    document.body.setAttribute('lang', lang);
    localStorage.setItem('language', lang);
    langToggle.textContent = lang === 'ko' ? 'EN' : 'KO';
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

langToggle.addEventListener('click', () => {
    const currentLang = document.body.getAttribute('lang') || 'ko';
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
});

loadTranslations();
