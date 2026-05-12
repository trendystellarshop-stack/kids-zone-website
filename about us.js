// About page enhancements

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.about-card, .stat');

    if (!cards.length) {
        return;
    }

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                observerInstance.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));
});
