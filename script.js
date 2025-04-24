document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for Animations ---
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger effect using setTimeout based on index
                setTimeout(() => {
                    // Add 'visible' class to trigger CSS transition/animation
                    entry.target.classList.add('visible');

                    // Apply the correct animation based on original class
                    if (entry.target.classList.contains('slide-in-left')) {
                        entry.target.style.animation = 'slideInLeftAnimation 0.8s ease-out forwards';
                    } else if (entry.target.classList.contains('slide-in-right')) {
                         entry.target.style.animation = 'slideInRightAnimation 0.8s ease-out forwards';
                    } else if (entry.target.classList.contains('fade-in')) {
                         entry.target.style.animation = 'fadeInAnimation 1s ease-out forwards';
                    }
                     // Fallback for sections without specific animation classes (like header/footer which are handled differently or other sections)
                     else {
                         entry.target.style.animation = 'fadeInAnimation 1s ease-out forwards';
                     }

                }, index * 150); // Stagger delay: 150ms * index

                // Optional: Unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
            // Optional: Reset animation if element scrolls out of view
            // else {
            //     entry.target.classList.remove('visible');
            //     entry.target.style.animation = 'none'; // Reset animation state
            // }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Header fade-in (already handled by CSS, but observer can control timing if needed) ---
    // You could also observe the header if you want it to animate on scroll
    const header = document.querySelector('header');
    // Example: Observe header if you want scroll-triggered animation for it too
    // observer.observe(header);


    // --- Simple interactive element (Example: Console log on skill click) ---
    const skillItems = document.querySelectorAll('#skills li');
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log(`Skill clicked: ${item.textContent}`);
            // You could add more complex interactions here, like showing detail popups
        });
    });

});