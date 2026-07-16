document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year
    const yearNode = document.getElementById('year');
    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }

    // 2. Reveal Sections on Scroll (Intersection Observer)
    const revealEls = Array.from(document.querySelectorAll('.reveal-on-scroll'));
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -5% 0px',
        }
    );
    revealEls.forEach((el) => observer.observe(el));

    // 3. Bento Grid & Modal System
    const bentoItems = document.querySelectorAll('.bento-item');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');

    // Open Modal
    bentoItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal Function
    function closeModal() {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners to close
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', closeModal);
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});