document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Theme Toggle ---
    // Sprawdź zapisaną preferencję motywu przy ładowaniu strony
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Zapisz preferencję użytkownika w localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme'); // Lub localStorage.setItem('theme', 'light');
        }
    });


    // --- Intersection Observer for Animations (bez zmian) ---
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible'); // Ta klasa głównie kontroluje opacity

                    // Wyzwalaj animacje CSS przez dodanie stylu bezpośrednio
                     if (entry.target.classList.contains('slide-in-left')) {
                        entry.target.style.animation = 'slideInLeftAnimation 0.8s ease-out forwards';
                    } else if (entry.target.classList.contains('slide-in-right')) {
                         entry.target.style.animation = 'slideInRightAnimation 0.8s ease-out forwards';
                    } else if (entry.target.classList.contains('fade-in')) {
                         entry.target.style.animation = 'fadeInAnimation 1s ease-out forwards';
                    }
                     else { // Domyślna animacja dla sekcji bez specyficznej klasy
                         entry.target.style.animation = 'fadeInAnimation 1s ease-out forwards';
                     }

                }, index * 150); // Stagger delay

                // observer.unobserve(entry.target); // Opcjonalnie odkomentuj dla wydajności
            }
            // Opcjonalne resetowanie animacji
            // else {
            //     entry.target.classList.remove('visible');
            //     entry.target.style.animation = 'none';
            // }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Simple interactive element (Example: Console log on skill click - bez zmian) ---
    const skillItems = document.querySelectorAll('#skills li');
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log(`Skill clicked: ${item.textContent}`);
        });
    });

});