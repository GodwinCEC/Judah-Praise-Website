/* =================================================================
   JUDAH PRAISE CMF - CONTACT PAGE JAVASCRIPT
   Dark theme, Firestore integration, clean functionality
   ================================================================= */

// Firebase configuration - REPLACE WITH YOUR ACTUAL CONFIG
const firebaseConfig = {

    apiKey: "AIzaSyC25aWoB1VZcy_zisVTkfbchOiHnuACmtE",

    authDomain: "judah-praise-website.firebaseapp.com",

    projectId: "judah-praise-website",

    storageBucket: "judah-praise-website.firebasestorage.app",

    messagingSenderId: "104258004706",

    appId: "1:104258004706:web:c972c55be5640c658720bb"

};


let db;
let isFormSubmitting = false;

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('contact.html')) {
        initializeContactPage();
    }
});

/* =================================================================
   CONTACT PAGE INITIALIZATION
   ================================================================= */

function initializeContactPage() {
    initializeFirebase();
    initializeContactForm();
    initializeFAQs();
    initializeFormValidation();
    initializeCharacterCounter();
    initializeAnimations();

    console.log('Contact page loaded successfully');
}

/* =================================================================
   FIREBASE INITIALIZATION
   ================================================================= */

function initializeFirebase() {
    try {
        // Initialize Firebase (only if not already initialized)
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // Initialize Firestore
        db = firebase.firestore();

        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Firebase initialization error:', error);
        console.warn('Contact form will use fallback method');
        db = null;
    }
}

/* =================================================================
   CONTACT FORM FUNCTIONALITY
   ================================================================= */

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        handleFormSubmission();
    });

    // Auto-resize textarea
    const textarea = contactForm.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', autoResizeTextarea);
    }
}

function handleFormSubmission() {
    if (isFormSubmitting) return;

    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    // Validate form
    if (!validateContactForm()) {
        return;
    }

    // Show loading state
    isFormSubmitting = true;
    const hideLoading = showLoadingState(submitBtn);

    // Collect form data
    const formData = collectFormData();

    // Submit to Firestore
    submitToFirestore(formData)
        .then(() => {
            showFormSuccess(formStatus);
            resetContactForm();
            trackContactEvent('form_submitted', { subject: formData.subject });
        })
        .catch((error) => {
            console.error('Form submission error:', error);
            showFormError(formStatus, 'Message could not be sent. Please try again or contact us directly via email.');
            trackContactEvent('form_error', { error: error.message });
        })
        .finally(() => {
            isFormSubmitting = false;
            hideLoading();
        });
}

function collectFormData() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);

    return {
        firstName: formData.get('firstName').trim(),
        lastName: formData.get('lastName').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone')?.trim() || '',
        subject: formData.get('subject'),
        message: formData.get('message').trim(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'unread',
        source: 'website_contact_form',
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct'
    };
}

function submitToFirestore(data) {
    return new Promise((resolve, reject) => {
        if (db) {
            // Submit to Firestore contacts collection
            db.collection('contacts').add(data)
                .then((docRef) => {
                    console.log('Contact message saved with ID:', docRef.id);
                    resolve(docRef);
                })
                .catch((error) => {
                    console.error('Error adding contact message:', error);
                    reject(error);
                });
        } else {
            // Fallback method
            fallbackFormSubmission(data)
                .then(resolve)
                .catch(reject);
        }
    });
}

function fallbackFormSubmission(data) {
    // Fallback when Firebase is not available
    return new Promise((resolve, reject) => {
        // In a real implementation, you would send this to your backend
        // or use services like Formspree, Netlify Forms, etc.

        console.log('Fallback form submission:', data);

        // Simulate API call
        setTimeout(() => {
            // For demo purposes, we'll just resolve
            resolve({ id: 'fallback_' + Date.now() });
        }, 1000);
    });
}

/* =================================================================
   FORM VALIDATION
   ================================================================= */

function validateContactForm() {
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    let isValid = true;

    // Clear previous errors
    clearAllErrors();

    requiredFields.forEach(fieldName => {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            if (!validateField(field)) {
                isValid = false;
            }
        }
    });

    // Additional validation
    const messageField = document.querySelector('[name="message"]');
    if (messageField && messageField.value.trim().length < 10) {
        showFieldError(messageField, 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    const required = field.hasAttribute('required');

    // Clear existing error
    clearFieldError(field);

    // Required field validation
    if (required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    if (!value) return true; // Optional field with no value

    // Email validation
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }

    // Phone validation (optional field)
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }

    // Name validation
    if ((name === 'firstName' || name === 'lastName') && value.length < 2) {
        showFieldError(field, 'Name must be at least 2 characters');
        return false;
    }

    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');

    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;

    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(element => element.remove());

    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

/* =================================================================
   FORM STATE MANAGEMENT
   ================================================================= */

function showFormSuccess(statusElement) {
    if (!statusElement) return;

    statusElement.className = 'form-status success';
    statusElement.style.display = 'flex';
    statusElement.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Thank you for your message! We'll get back to you within 24 hours.</span>
    `;

    // Auto-hide after 8 seconds
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 8000);
}

function showFormError(statusElement, message) {
    if (!statusElement) return;

    statusElement.className = 'form-status error';
    statusElement.style.display = 'flex';
    statusElement.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;

    // Auto-hide after 10 seconds
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 10000);
}

function showLoadingState(button) {
    if (!button) return () => { };

    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <span>Sending...</span>
    `;

    return function hideLoading() {
        button.disabled = false;
        button.innerHTML = originalText;
    };
}

function resetContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.reset();
        clearAllErrors();
        updateCharacterCounter();
    }
}

/* =================================================================
   FORM ENHANCEMENTS
   ================================================================= */

function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        // Real-time validation on blur
        input.addEventListener('blur', function () {
            validateField(this);
        });

        // Clear errors on input
        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                clearFieldError(this);
            }
        });
    });
}

function initializeCharacterCounter() {
    const messageField = document.querySelector('[name="message"]');
    const charCount = document.getElementById('char-count');

    if (messageField && charCount) {
        messageField.addEventListener('input', updateCharacterCounter);
        updateCharacterCounter(); // Initial count
    }
}

function updateCharacterCounter() {
    const messageField = document.querySelector('[name="message"]');
    const charCount = document.getElementById('char-count');
    const counter = document.querySelector('.character-counter');

    if (!messageField || !charCount) return;

    const currentLength = messageField.value.length;
    const maxLength = 1000;

    charCount.textContent = currentLength;

    // Update styling based on length
    if (counter) {
        if (currentLength > maxLength * 0.9) {
            counter.classList.add('warning');
        } else {
            counter.classList.remove('warning');
        }
    }
}

function autoResizeTextarea(e) {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

/* =================================================================
   FAQ FUNCTIONALITY
   ================================================================= */

function initializeFAQs() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function () {
            toggleFAQ(this);
        });
    });
}

function toggleFAQ(questionElement) {
    const faqItem = questionElement.parentElement;
    const answer = faqItem.querySelector('.faq-answer');

    if (!answer) return;

    // Close other open FAQs
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-answer');
            if (otherAnswer) {
                otherAnswer.style.maxHeight = '0';
                otherAnswer.style.padding = '0 var(--space-8)';
            }
        }
    });

    // Toggle current FAQ
    faqItem.classList.toggle('active');

    if (faqItem.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.padding = 'var(--space-8)';

        // Track FAQ interaction
        const questionText = questionElement.querySelector('h3').textContent;
        trackContactEvent('faq_opened', { question: questionText });
    } else {
        answer.style.maxHeight = '0';
        answer.style.padding = '0 var(--space-8)';
    }
}

/* =================================================================
   ANIMATIONS
   ================================================================= */

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Stagger animation for FAQ items
                if (entry.target.classList.contains('faq-grid')) {
                    const faqItems = entry.target.querySelectorAll('.faq-item');
                    faqItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.contact-form-section, .contact-info-card, .quick-actions-card, .faq-grid');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Set initial state for FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
    });
}

/* =================================================================
   CONTACT TRACKING & ANALYTICS
   ================================================================= */

function trackContactEvent(eventType, additionalData = {}) {
    const eventData = {
        type: eventType,
        timestamp: new Date().toISOString(),
        page: 'contact',
        userAgent: navigator.userAgent,
        ...additionalData
    };

    console.log('Contact Event:', eventData);

    // Integration with analytics would go here
    // Example: Google Analytics, Facebook Pixel, etc.
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventType, {
    //         'event_category': 'Contact',
    //         'event_label': additionalData.subject || 'General'
    //     });
    // }
}

/* =================================================================
   UTILITY FUNCTIONS
   ================================================================= */

function showToast(message, type = 'info', duration = 3000) {
    // Use global toast function if available
    if (window.JudahPraiseCore && window.JudahPraiseCore.showToast) {
        window.JudahPraiseCore.showToast(message, type, duration);
    } else {
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}

// Export functions for global use
window.ContactPage = {
    toggleFAQ,
    validateField,
    trackContactEvent,
    submitToFirestore
};