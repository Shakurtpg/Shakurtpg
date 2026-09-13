document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Lightbox Gallery Modal with Aesthetic SVG Buttons
    // -------------------------------------------------------------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const triggers = Array.from(document.querySelectorAll('.lightbox-trigger'));

    let currentIndex = 0;

    // Inject SVG icons into Lightbox controls for elevated aesthetic
    if (closeBtn) {
        closeBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
    }

    if (prevBtn) {
        prevBtn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        `;
    }

    if (nextBtn) {
        nextBtn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        `;
    }

    if (triggers.length > 0 && lightbox) {
        function openLightbox(index) {
            currentIndex = index;
            lightboxImg.src = triggers[currentIndex].src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function showNext() {
            currentIndex = (currentIndex + 1) % triggers.length;
            lightboxImg.src = triggers[currentIndex].src;
        }

        function showPrev() {
            currentIndex = (currentIndex - 1 + triggers.length) % triggers.length;
            lightboxImg.src = triggers[currentIndex].src;
        }

        triggers.forEach((trigger, index) => {
            trigger.addEventListener('click', () => openLightbox(index));
        });

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (nextBtn) nextBtn.addEventListener('click', showNext);
        if (prevBtn) prevBtn.addEventListener('click', showPrev);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') showNext();
                if (e.key === 'ArrowLeft') showPrev();
            }
        });
    }

    // -------------------------------------------------------------
    // 2. Image Download Protection (Right-Click & Drag Disable)
    // -------------------------------------------------------------
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    // -------------------------------------------------------------
    // 3. Light / Dark Theme Switcher
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const currentTheme = localStorage.getItem('theme');

    function setDarkMode() {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (moonIcon && sunIcon) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
    }

    function setLightMode() {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (moonIcon && sunIcon) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }

    if (currentTheme === 'dark') {
        setDarkMode();
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                setLightMode();
            } else {
                setDarkMode();
            }
        });
    }
});
