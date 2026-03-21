//import translations from './i18n.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Morphing Intro Setup
    // Ensure the animation triggers after a slight delay to allow rendering
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // 2. Language Selection Logic
    const langBtns = document.querySelectorAll('.lang-btn');
    const i18nElements = document.querySelectorAll('[data-i18n]');

    // Get current language from localStorage, or use browser language, or default to 'ro'
    let currentLang = localStorage.getItem('site_lang');
    if (!currentLang) {
        const browserLang = navigator.language.split('-')[0];
        currentLang = ['ro', 'en', 'hu'].includes(browserLang) ? browserLang : 'ro';
    }

    // Function to apply language texts
    function applyLanguage(lang) {
        if (!translations[lang]) return;

        // Update active button state
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update texts
        i18nElements.forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update document layout language
        document.documentElement.lang = lang;
        localStorage.setItem('site_lang', lang);
    }

    // Initialize with current language
    applyLanguage(currentLang);

    // Add click listeners to buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedLang = e.target.dataset.lang;
            applyLanguage(selectedLang);
        });
    });
});
