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
        certModal.dataset.currentCertId = certId; // Store current certId
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
        title: {
            ko: '털뭉치 수색대 (Furball Rangers)',
            en: 'Furball Rangers'
        },
        description: {
            ko: "기획부터 개발, 테스트 및 배포까지 모두 홀로 수행. 반려동물을 잃어버린 보호자들이 더 쉽게 잃어버린 가족을 추적하고 이동 경로를 파악하여 빠르게 다시 만날 수 있도록 돕는 프로젝트",
            en: "A solo project from planning to development, testing, and deployment. It helps pet owners who have lost their pets to track them more easily and identify their movement paths to be reunited with their lost family members quickly."
        },
        images: ['assets/eng-full.png', 'assets/kor-full.png', 'assets/kor-admin.png', 'assets/eng-veri.png', 'assets/kor-mob.png', 'assets/project-map.png'],
        buttons: [
            { text: 'Live Demo', url: 'http://furballrangers.replit.app' }
        ]
    },
    aiworkflow: {
        title: {
            ko: 'AI 자동화 워크플로우',
            en: 'AI Automation Workflow'
        },
        description: {
            ko: "HTTP 및 외부 API 활용 통한 크롤링, 에이전틱 워크플로우, 업무 자동화 등 다양한 AI 활용 방식 학습/체득",
            en: "Learned and mastered various AI application methods such as crawling using HTTP and external APIs, agentic workflows, and work automation."
        },
        images: ['assets/n8nfront.png', 'assets/n8nworkflow1.png', 'assets/n8nworkflow2.png', 'assets/n8nworkflow3.png'],
        buttons: []
    },
    resume: {
        title: {
            ko: '인터랙티브 웹 이력서',
            en: 'Interactive Web Resume'
        },
        description: {
            ko: "VS code와 Cline, 관련 MCP 활용하여 이력서 및 포트폴리오 구축",
            en: "Built a resume and portfolio using VS Code, Cline, and related MCPs."
        },
        images: ['assets/resumesite.png'],
        buttons: []
    },
    insomnia: {
        title: {
            ko: '국내 최초 디지털 치료제 개발',
            en: "Korea's First Digital Therapeutics Development"
        },
        description: {
            ko: "국내 최초로 식약처 인허가를 통과하여 처방되고 있는 불면증 소프트웨어 치료기기 개발",
            en: "Developed Korea's first software medical device for insomnia, which has been approved by the Ministry of Food and Drug Safety and is being prescribed."
        },
        images: ['assets/insomnia0.png', 'assets/insomnia.png', 'assets/insomnia1.png', 'assets/insomnia2.png', 'assets/insomnia3.png'],
        buttons: []
    },
    vr: {
        title: {
            ko: 'VR 기반 작업치료 플랫폼',
            en: 'VR-based Occupational Therapy Platform'
        },
        description: {
            ko: "가상 환경에서 작업치료사가 직접 치료를 기획하고 수행하며 정밀하게 치료 경과를 측정하는 전천후 치료 플랫폼 개발을 기획, 총괄",
            en: "Planned and supervised the development of an all-in-one therapy platform where occupational therapists can directly plan and conduct treatment in a virtual environment and precisely measure treatment progress."
        },
        images: ['assets/VR.png', 'assets/VR1.png', 'assets/VR2.png', 'assets/VR3.png'],
        buttons: []
    },
    adhd: {
        title: {
            ko: 'ADHD 아동용 DTx 앱',
            en: 'DTx App for Children with ADHD'
        },
        description: {
            ko: "작업기억력을 향상하기 위해 다중작업을 훈련하게 하는 시리어스 게임 형태의 소프트웨어 치료기기 개발 및 주요 지표 기획",
            en: "Developed a serious game-style software medical device that trains multitasking to improve working memory for children with ADHD, and planned key metrics."
        },
        images: ['assets/adhd.png', 'assets/adhd1.png', 'assets/adhd2.png'],
        buttons: []
    },
    dementia: {
        title: {
            ko: '치매 환자용 테스트/훈련 앱',
            en: 'Test/Training App for Dementia Patients'
        },
        description: {
            ko: "치매 전단계부터 빠르게 기억력 감퇴를 진단하고 기억력을 유지, 발전시킬 수 있는 전략을 모바일 앱 형태로 구현하는 PoC 프로젝트 기획/PM",
            en: "Planned and managed a PoC project to quickly diagnose memory decline from the pre-dementia stage and implement strategies to maintain and improve memory in the form of a mobile app."
        },
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
        projectModal.dataset.currentProjectId = projectId; // Store current projectId
        const project = projectsData[projectId];
        const lang = document.body.getAttribute('lang') || 'ko';
        if (project) {
            projectModalTitle.textContent = project.title[lang];
            projectModalDesc.textContent = project.description[lang];
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

    // Update project modal if it's open
    if (!projectModal.classList.contains('hidden')) {
        const projectId = projectModal.dataset.currentProjectId;
        if (projectId) {
            const project = projectsData[projectId];
            projectModalTitle.textContent = project.title[lang];
            projectModalDesc.textContent = project.description[lang];
        }
    }

    // Update certification modal if it's open
    if (!certModal.classList.contains('hidden')) {
        const certId = certModal.dataset.currentCertId;
        if (certId) {
            const titleKey = `cert_modal_title_${certId}`;
            const descKey = `cert_modal_desc_${certId}`;
            modalTitle.textContent = translations[lang][titleKey];
            modalDesc.textContent = translations[lang][descKey];
        }
    }
}

langToggle.addEventListener('click', () => {
    const currentLang = document.body.getAttribute('lang') || 'ko';
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
});

// Initial language setup
const initialLang = localStorage.getItem('language') || 'ko';
setLanguage(initialLang);
