document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const langToggleButton = document.getElementById('lang-toggle');
    const body = document.body;
    const translatableElements = document.querySelectorAll('[data-lang-en], [data-lang-pl]');

    let currentLang = 'en'; // Default language

    // --- Function to set language ---
    const setLanguage = (lang) => {
        currentLang = lang;
        document.documentElement.lang = lang; // Update html lang attribute

        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                // Handle specific elements like title or buttons differently if needed
                if (el.tagName === 'TITLE') {
                     el.textContent = text;
                } else if (el.tagName === 'BUTTON') {
                     el.textContent = text; // Update button text
                }
                else {
                     // Preserve child elements like links if necessary
                     // Basic implementation replaces entire content:
                     el.textContent = text;
                     // More robust: replace only text nodes or use innerHTML carefully
                }
            }
        });

        // Update language toggle button text based on the NEW current language
        if (lang === 'en') {
            langToggleButton.textContent = langToggleButton.getAttribute('data-lang-en'); // Show "Zmień Język (PL)"
            document.title = "Bartosz Pajor - CV"; // Set title in English
        } else {
            langToggleButton.textContent = langToggleButton.getAttribute('data-lang-pl'); // Show "Change Language (EN)"
             document.title = "Bartosz Pajor - CV"; // Title can remain the same or be translated
        }

        // Update theme toggle button text
         themeToggleButton.textContent = themeToggleButton.getAttribute(`data-lang-${lang}`);


        localStorage.setItem('language', lang); // Save language preference
    };

    // --- Theme Toggle ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // --- Language Toggle ---
    langToggleButton.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'pl' : 'en';
        setLanguage(newLang);
    });

    // --- Initial Load ---
    // 1. Set initial language (check localStorage or default to 'en')
    const savedLang = localStorage.getItem('language');
    setLanguage(savedLang || 'en'); // Use saved lang or default to English

    // 2. Intersection Observer for Animations (no changes needed for language)
    const sections = document.querySelectorAll('section');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                     if (entry.target.classList.contains('slide-in-left')) {
                        entry.target.style.animation = 'slideInLeftAnimation 0.8s ease-out forwards';
                    } else if (entry.target.classList.contains('slide-in-right')) {
                         entry.target.style.animation = 'slideInRightAnimation 0.8s ease-out forwards';
                    } else if (entry.target.classList.contains('fade-in')) {
                         entry.target.style.animation = 'fadeInAnimation 1s ease-out forwards';
                    } else {
                         entry.target.style.animation = 'fadeInAnimation 1s ease-out forwards';
                    }
                }, index * 150);
                // observer.unobserve(entry.target);
            }
            // else { // Optional reset
            //     entry.target.classList.remove('visible');
            //     entry.target.style.animation = 'none';
            // }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // --- Skill click log (no changes) ---
    const skillItems = document.querySelectorAll('#skills li');
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log(`Skill clicked: ${item.textContent}`);
        });
    });
});