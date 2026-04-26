document.addEventListener('DOMContentLoaded', () => {
    // 1. Morphing Intro Setup
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // 2. Language Selection Logic
    const langBtns = document.querySelectorAll('.lang-btn');
    const i18nElements = document.querySelectorAll('[data-i18n]');
    const subtitle1El = document.getElementById('subtitle1');
    const subtitle2El = document.getElementById('subtitle2');

    let subtitle1Index = 0;
    let subtitle1Interval = null;

    let subtitle2Index = 0;
    let subtitle2Interval = null;

    // Get current language from localStorage, or use browser language, or default to 'ro'
    let currentLang = localStorage.getItem('site_lang');
    if (!currentLang) {
        const browserLang = navigator.language.split('-')[0];
        currentLang = ['ro', 'en', 'hu'].includes(browserLang) ? browserLang : 'ro';
    }

    function startSubtitle1Loop(lang) {
        const messages = translations[lang]?.subtitle1;

        if (!subtitle1El || !Array.isArray(messages) || messages.length === 0) return;

        if (subtitle1Interval) {
            clearInterval(subtitle1Interval);
        }

        subtitle1Index = 0;
        subtitle1El.textContent = messages[subtitle1Index];

        subtitle1Interval = setInterval(() => {
            subtitle1El.style.animation = 'none'; // clear the initial morphReveal animation lock
            subtitle1El.classList.add('slide-out');
            setTimeout(() => {
                subtitle1Index = (subtitle1Index + 1) % messages.length;
                subtitle1El.textContent = messages[subtitle1Index];
                
                subtitle1El.classList.add('slide-in');
                subtitle1El.classList.remove('slide-out');
                
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        subtitle1El.classList.remove('slide-in');
                    });
                });
            }, 800);
        }, 3000);
    }

    function startSubtitle2Loop(lang) {
        const messages = translations[lang]?.subtitle2;

        if (!subtitle2El || !Array.isArray(messages) || messages.length === 0) return;

        if (subtitle2Interval) {
            clearInterval(subtitle2Interval);
        }

        subtitle2Index = 0;
        subtitle2El.textContent = messages[subtitle2Index];

        subtitle2Interval = setInterval(() => {
            subtitle2El.style.animation = 'none'; // clear the initial morphReveal animation lock
            subtitle2El.classList.add('slide-out');
            setTimeout(() => {
                subtitle2Index = (subtitle2Index + 1) % messages.length;
                subtitle2El.textContent = messages[subtitle2Index];
                
                subtitle2El.classList.add('slide-in');
                subtitle2El.classList.remove('slide-out');
                
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        subtitle2El.classList.remove('slide-in');
                    });
                });
            }, 800);
        }, 4000);
    }

    function applyLanguage(lang) {
        if (!translations[lang]) return;

        // Update active button state
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update texts
        i18nElements.forEach(el => {
            const key = el.dataset.i18n;
            const value = translations[lang][key];

            if (typeof value === 'string') {
                el.textContent = value;
            }
        });

        // Update looping subtitles
        startSubtitle1Loop(lang);
        startSubtitle2Loop(lang);

        // Update document layout language
        document.documentElement.lang = lang;
        document.title = translations[lang].meta_title || document.title;
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && translations[lang].meta_description) {
            metaDesc.setAttribute('content', translations[lang].meta_description);
        }

        localStorage.setItem('site_lang', lang);
    }

    // Initialize with current language
    applyLanguage(currentLang);

    // Add click listeners to buttons
    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedLang = e.currentTarget.dataset.lang;
            applyLanguage(selectedLang);
        });
    });
});