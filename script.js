// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 60;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Global variable for scroll tracking
let lastScroll = 0;

// Navigation bar effects
const nav = document.querySelector('.global-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else if (currentScroll > lastScroll) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add specific animations for different sections
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.transitionDelay = `${Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1}s`;
            }
            
            if (entry.target.classList.contains('stat-card')) {
                startCountAnimation(entry.target.querySelector('.stat-number'));
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('section, .feature-card, .stat-card, .floating-card').forEach(el => {
    observer.observe(el);
});

// Stats counter animation
function startCountAnimation(element) {
    const target = parseInt(element.textContent);
    const suffix = element.textContent.replace(/[0-9]/g, '');
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    
    function updateCount() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target + suffix;
        }
    }
    updateCount();
}

// Floating cards animation
const cards = document.querySelectorAll('.floating-card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Product tile hover effects
document.querySelectorAll('.product-tile').forEach(tile => {
    tile.addEventListener('mousemove', (e) => {
        const rect = tile.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        tile.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    tile.addEventListener('mouseleave', () => {
        tile.style.transform = 'none';
    });
});

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true
});

// Intersection Observer for animations
const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .bounce-in');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.visibility = 'visible';
            entry.target.style.animationPlayState = 'running';
            animationObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

animatedElements.forEach(element => {
    element.style.visibility = 'hidden';
    element.style.animationPlayState = 'paused';
    animationObserver.observe(element);
});

// Add exit animations on page navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Add exit animations to current visible section
            const currentSection = document.querySelector('.section.active');
            if (currentSection) {
                currentSection.classList.add('fade-out');
                setTimeout(() => {
                    currentSection.classList.remove('active', 'fade-out');
                }, 800);
            }
            
            // Smooth scroll to target section
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Add entrance animation to target section
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 800);
        }
    });
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const step = duration / 50;
    
    function updateCount() {
        current += increment;
        if (current < target) {
            stat.textContent = Math.round(current);
            setTimeout(updateCount, step);
        } else {
            stat.textContent = target;
        }
    }
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount();
                statObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    statObserver.observe(stat);
});

// Floating Icons Animation
const floatingIcons = document.querySelectorAll('.floating-icons i');
floatingIcons.forEach((icon, index) => {
    icon.style.animation = `floatIcon ${6 + index}s ease-in-out infinite`;
    icon.style.animationDelay = `${index * 1.5}s`;
});

// Minimal Navbar Effect
const navbar = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        return;
    }
    
    if (currentScroll > lastScroll) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Contact Form Animation
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    const wrapper = document.createElement('div');
    wrapper.className = 'input-wrapper';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    input.addEventListener('focus', () => {
        wrapper.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            wrapper.classList.remove('focused');
        }
    });
});

// Subtle Section Reveal
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
    rootMargin: '-50px'
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Remove testimonial card from observer
document.querySelectorAll('section, .feature-card, .stat-card, .floating-card').forEach(el => {
    observer.observe(el);
});

// Remove enhanced testimonial animations
const testimonialCards = document.querySelectorAll('.testimonial-card');
if (testimonialCards) {
    testimonialCards.forEach(card => {
        card.style.transform = 'none';
        card.style.transition = 'none';
    });
}

// Remove parallax effect from testimonial cards
window.removeEventListener('scroll', () => {
    testimonialCards.forEach(card => {
        card.style.transform = 'none';
    });
});

// Mobile Menu Toggle
const navContent = document.querySelector('.nav-content');
const navLinks = document.querySelector('.nav-links');

// Create hamburger menu button
const menuButton = document.createElement('button');
menuButton.classList.add('menu-toggle');
menuButton.innerHTML = '<i class="fas fa-bars"></i>';
navContent.appendChild(menuButton);

// Toggle mobile menu
menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuButton.querySelector('i').classList.toggle('fa-bars');
    menuButton.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navContent.contains(e.target)) {
        navLinks.classList.remove('active');
        menuButton.querySelector('i').classList.add('fa-bars');
        menuButton.querySelector('i').classList.remove('fa-times');
    }
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuButton.querySelector('i').classList.add('fa-bars');
        menuButton.querySelector('i').classList.remove('fa-times');
    });
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Form handling with EmailJS
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    const submitButton = this.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');
    const originalText = buttonText.textContent;
    
    buttonText.textContent = 'Sending...';
    buttonLoader.style.display = 'block';
    submitButton.disabled = true;

    // Send email using EmailJS
    emailjs.send('service_bmuc289', 'template_evy60v7', formData)
        .then(function() {
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            // Reset form
            document.getElementById('contact-form').reset();
        }, function(error) {
            // Show error message
            showNotification('Sorry, there was an error sending your message. Please try again later.', 'error');
            console.error('EmailJS Error:', error);
        })
        .finally(function() {
            // Reset button state
            buttonText.textContent = originalText;
            buttonLoader.style.display = 'none';
            submitButton.disabled = false;
        });
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Form validation
const form = document.getElementById('contact-form');
const inputs = form.querySelectorAll('input, textarea, select');

inputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    // Add real-time validation for email and phone
    if (input.type === 'email' || input.type === 'tel') {
        input.addEventListener('input', function() {
            validateField(this);
        });
    }
});

function validateField(field) {
    const errorMessage = field.nextElementSibling.nextElementSibling;
    
    if (field.validity.valid) {
        field.classList.remove('error');
        errorMessage.textContent = '';
    } else {
        field.classList.add('error');
        if (field.validity.valueMissing) {
            errorMessage.textContent = 'This field is required';
        } else if (field.validity.typeMismatch) {
            if (field.type === 'email') {
                errorMessage.textContent = 'Please enter a valid email address';
            } else if (field.type === 'tel') {
                errorMessage.textContent = 'Please enter a valid phone number';
            }
        }
    }
} 