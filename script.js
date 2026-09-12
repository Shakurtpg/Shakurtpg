document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const triggers = Array.from(document.querySelectorAll('.lightbox-trigger'));

    let currentIndex = 0;

    if (triggers.length === 0 || !lightbox) return;

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
        trigger.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });
});
