// ===== QUOTE FORM FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    const nameInput = document.getElementById('name');
    const townInput = document.getElementById('town');
    const serviceSelect = document.getElementById('service');
    const detailsInput = document.getElementById('details');
    const messagePreview = document.getElementById('messagePreview');
    const previewText = document.getElementById('previewText');
    const copyBtn = document.getElementById('copyBtn');
    const textBtn = document.getElementById('textBtn');

    let generatedMessage = '';

    // Function to generate the message
    function generateMessage() {
        const name = nameInput.value.trim();
        const town = townInput.value.trim();
        const service = serviceSelect.value;
        const details = detailsInput.value.trim();

        if (name && town && service) {
            generatedMessage = `Hi, my name is ${name}. I need a free quote for ${service} in ${town}.`;
            
            if (details) {
                generatedMessage += `\n\nDetails:\n${details}`;
            }
            
            generatedMessage += '\n\nPlease let me know the price and earliest availability.';

            // Display the preview
            previewText.textContent = generatedMessage;
            messagePreview.style.display = 'block';
            copyBtn.style.display = 'inline-block';
            textBtn.style.display = 'inline-block';

            // Update the text message link
            const encodedMessage = encodeURIComponent(generatedMessage);
            textBtn.href = `sms:9143063677?body=${encodedMessage}`;
        } else {
            messagePreview.style.display = 'none';
            copyBtn.style.display = 'none';
            textBtn.style.display = 'none';
        }
    }

    // Event listeners for form inputs
    nameInput.addEventListener('input', generateMessage);
    townInput.addEventListener('input', generateMessage);
    serviceSelect.addEventListener('change', generateMessage);
    detailsInput.addEventListener('input', generateMessage);

    // Copy button functionality
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(generatedMessage).then(function() {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(function() {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    });

    // Prevent form submission
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
    });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== LAZY LOADING FOR PERFORMANCE =====
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe service cards and other elements
    document.querySelectorAll('.service-card, .faq-item, .chip').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(el);
    });
}

// ===== HEADER SCROLL EFFECT =====
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop;
});

// ===== ACTIVE NAV HIGHLIGHT =====
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav a').forEach(link => {
        link.style.color = '';
        link.style.borderBottom = 'none';
    });

    if (current) {
        const activeLink = document.querySelector(`.nav a[href="#${current}"]`);
        if (activeLink) {
            activeLink.style.color = '#1e40af';
        }
    }
});

// ===== FORM VALIDATION ENHANCEMENT =====
const formInputs = document.querySelectorAll('.quote-form input, .quote-form select, .quote-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.required) {
            this.style.borderColor = '#ea580c';
        } else {
            this.style.borderColor = '';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = '';
    });
});
