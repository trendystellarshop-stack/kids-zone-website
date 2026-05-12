// Contact page form handling

function submitContactForm(event) {
    event.preventDefault();

    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const category = document.getElementById('category').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && subject && category && message) {
        status.style.color = '#4CAF50';
        status.textContent = 'Thank you for your message! We will get back to you soon.';
        form.reset();

        setTimeout(() => {
            status.textContent = '';
        }, 5000);
    } else {
        status.style.color = '#f44336';
        status.textContent = 'Please fill in all required fields.';
    }
}

window.submitContactForm = submitContactForm;
