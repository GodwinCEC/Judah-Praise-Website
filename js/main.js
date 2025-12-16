/* =================================================================
   JUDAH PRAISE CMF - MAIN JAVASCRIPT
   Dark theme, simple carousel, clean functionality
   ================================================================= */

let currentSlide = 0;
let totalSlides = 0;
let slideInterval;

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCarousel();
    initializeScrollAnimations();
    
    console.log('Judah Praise CMF - Dark theme website loaded');
});

/* =================================================================
   NAVIGATION FUNCTIONALITY
   ================================================================= */

function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
}

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
}

/* =================================================================
   CAROUSEL FUNCTIONALITY - SIMPLE & CLEAN
   ================================================================= */

function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselContainer = document.getElementById('carousel-container');
    
    if (slides.length === 0) return;
    
    totalSlides = slides.length;
    
    // Button event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            previousSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Touch/swipe support
    initializeTouchSupport(carouselContainer);
    
    // Auto-play
    startAutoPlay();
    
    // Pause on hover
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
}

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove active class from all
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    currentSlide = index;
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    goToSlide(nextIndex);
}

function previousSlide() {
    const prevIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    goToSlide(prevIndex);
}

function goToSlide(index) {
    showSlide(index);
}

function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

/* =================================================================
   TOUCH/SWIPE SUPPORT
   ================================================================= */

function initializeTouchSupport(container) {
    if (!container) return;
    
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    container.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    container.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const diffX = startX - endX;
        const diffY = Math.abs(startY - endY);
        const swipeThreshold = 50;
        
        // Only respond to horizontal swipes
        if (Math.abs(diffX) > swipeThreshold && diffY < 100) {
            stopAutoPlay();
            
            if (diffX > 0) {
                // Swiped left, go to next slide
                nextSlide();
            } else {
                // Swiped right, go to previous slide
                previousSlide();
            }
            
            startAutoPlay();
        }
    }
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
                
                // Animate elements within sections
                const animatedElements = entry.target.querySelectorAll('.stat, .badge, .goal-item');
                animatedElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    const animatedSections = document.querySelectorAll('.current-project, .join-us');
    animatedSections.forEach(section => {
        observer.observe(section);
        
        // Set initial state for animated elements
        const animatedElements = section.querySelectorAll('.stat, .badge, .goal-item');
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease';
        });
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

// Optimized scroll handler
const throttledScrollHandler = debounce(function() {
    handleNavbarScroll();
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Export functions for other modules
window.JudahPraiseCore = {
    debounce
};

