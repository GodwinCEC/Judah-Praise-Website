/* =================================================================
   JUDAH PRAISE CMF - ABOUT PAGE JAVASCRIPT
   Dark theme, smooth animations, clean interactions
   ================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('about.html')) {
        initializeAboutPage();
    }
});

/* =================================================================
   ABOUT PAGE INITIALIZATION
   ================================================================= */

function initializeAboutPage() {
    initializeScrollAnimations();
    initializeProgressAnimation();
    initializeStatCounters();
    initializeEquipmentAnimations();
    
    console.log('About page loaded successfully');
}

/* =================================================================
   SCROLL ANIMATIONS
   ================================================================= */

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animate cards within sections
                const cards = entry.target.querySelectorAll(
                    '.problem-card, .aim-card, .strategy-card, .leader-card'
                );
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll(
        '.about-cmf, .stroke-problem, .project-aims, .equipment-budget, .implementation, .leadership, .cta-section'
    );
    
    sections.forEach(section => {
        observer.observe(section);
        
        // Set initial state for cards
        const cards = section.querySelectorAll(
            '.problem-card, .aim-card, .strategy-card, .leader-card'
        );
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
        });
    });
}

/* =================================================================
   PROGRESS BAR ANIMATION
   ================================================================= */

function initializeProgressAnimation() {
    const progressBar = document.querySelector('.progress-fill');
    if (!progressBar) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = progressBar.style.width;
                
                // Start from 0 and animate to target
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 2.5s ease-out';
                    progressBar.style.width = targetWidth;
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(progressBar);
}

/* =================================================================
   STAT COUNTERS ANIMATION
   ================================================================= */

function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const finalText = statNumber.textContent;
                const hasPlus = finalText.includes('+');
                const hasCurrency = finalText.includes('₵');
                
                // Extract number
                let finalValue = parseInt(finalText.replace(/[^\d]/g, ''));
                if (isNaN(finalValue)) return;
                
                // Animate counter
                animateCounter(statNumber, 0, finalValue, 2000, hasPlus, hasCurrency);
                observer.unobserve(statNumber);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element, start, end, duration, hasPlus, hasCurrency) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        // Format the number
        let displayValue = '';
        if (hasCurrency) {
            if (current >= 1000) {
                displayValue = `₵${Math.floor(current / 1000)}K`;
            } else {
                displayValue = `₵${current}`;
            }
        } else {
            displayValue = current.toString();
        }
        
        if (hasPlus) displayValue += '+';
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/* =================================================================
   EQUIPMENT ITEMS ANIMATION
   ================================================================= */

function initializeEquipmentAnimations() {
    const equipmentItems = document.querySelectorAll('.equipment-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -30px 0px'
    });
    
    // Set initial state and observe
    equipmentItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

/* =================================================================
   SMOOTH SCROLLING
   ================================================================= */

function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =================================================================
   INTERSECTION OBSERVER FOR BUDGET ITEMS
   ================================================================= */

function initializeBudgetAnimation() {
    const budgetItems = document.querySelectorAll('.budget-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.5
    });
    
    budgetItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

/* =================================================================
   UTILITY FUNCTIONS
   ================================================================= */

function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeSmoothScrolling();
    initializeBudgetAnimation();
});

// Export functions for global use
window.AboutPage = {
    animateCounter,
    initializeProgressAnimation,
    initializeStatCounters
};