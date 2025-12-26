/* =================================================================
   JUDAH PRAISE CMF - PROJECTS PAGE JAVASCRIPT
   Dark theme, clean modals, simple interactions
   ================================================================= */

// Project data store with detailed information
const projectData = {
    '2025': {
        title: 'Kidney Project',
        year: '2025',
        tag: 'Renal Unit',
        description: 'Enhanced the hospital\'s Renal Unit with comprehensive medical equipment and funding support.',
        fullDescription: 'The Kidney Project represented a significant investment in KATH\'s Renal Unit, addressing the growing need for quality kidney care in the Ashanti Region. This initiative provided essential medical equipment and substantial funding to improve patient outcomes and support the dedicated medical staff working in nephrology care.',
        equipment: [
            'Pulse oximeters for continuous oxygen saturation monitoring',
            'Advanced patient monitors for comprehensive vital signs tracking',
            'Medical beds designed specifically for renal patients',
            'Autoclave sterilization equipment for infection control',
            'Dialysis support equipment and accessories'
        ],
        impact: [
            'Enhanced monitoring capabilities for kidney patients',
            'Improved infection control protocols in the renal unit',
            'Better patient comfort with specialized medical beds',
            'Increased capacity for handling complex renal cases',
            'Recognition and support for the hardworking renal unit staff'
        ],
        funding: '₵5,000 direct funding plus equipment value',
        beneficiaries: '200+ kidney patients annually',
        duration: 'March - June 2025'
    },
    '2024': {
        title: 'Pediatric Intensive Care Support',
        year: '2024',
        tag: 'PICU Enhancement',
        description: 'Comprehensive support for the pediatric intensive care unit with equipment and sustainable funding.',
        fullDescription: 'This transformative project addressed critical needs in pediatric intensive care at KATH. Beyond immediate equipment procurement, we established an endowment fund to ensure sustainable support for the PICU, recognizing the ongoing needs of critically ill children and their families.',
        equipment: [
            'Ripple mattresses for pressure ulcer prevention in critically ill children',
            'AED pads specifically designed for pediatric use',
            'ECG monitors for continuous cardiac monitoring',
            'Pediatric sphygmomanometers for accurate blood pressure measurement',
            'Emergency resuscitation equipment'
        ],
        impact: [
            'Improved comfort and pressure ulcer prevention for pediatric patients',
            'Enhanced cardiac monitoring capabilities for critically ill children',
            'Better emergency response with pediatric-specific equipment',
            'Sustainable support through endowment fund establishment',
            'Increased capacity for handling complex pediatric cases'
        ],
        funding: '₵10,000 direct donation plus endowment fund',
        beneficiaries: '300+ children in intensive care',
        duration: 'February - May 2024'
    },
    '2023': {
        title: 'Pediatric Oncology Support',
        year: '2023',
        tag: 'Cancer Care',
        description: 'Comprehensive support for the pediatric oncology unit including equipment and substantial funding.',
        fullDescription: 'Recognizing the unique challenges faced by children with cancer and their families, this project provided both essential medical equipment and significant financial support to the pediatric oncology unit. The initiative aimed to improve treatment outcomes while supporting the emotional and financial burdens faced by families.',
        equipment: [
            '4 pediatric sphygmomanometers for accurate blood pressure monitoring',
            '2 advanced infusion pumps for precise chemotherapy and medication delivery',
            'Nutritional supplements to support children during treatment',
            'Comfort items and play therapy materials',
            'Educational resources for patients and families'
        ],
        impact: [
            'Improved accuracy in monitoring vital signs during treatment',
            'Enhanced safety and precision in chemotherapy delivery',
            'Better nutritional support for children undergoing cancer treatment',
            'Emotional support through play therapy and comfort items',
            'Financial relief for families facing enormous treatment costs'
        ],
        funding: '₵50,000 donation to the unit',
        beneficiaries: '100+ children with cancer and their families',
        duration: 'January - April 2023'
    },
    '2022': {
        title: 'Burns Treatment Initiative',
        year: '2022',
        tag: 'Emergency Care',
        description: 'Specialized support for burn patients with treatment equipment and comprehensive care.',
        fullDescription: 'Burn injuries require specialized care and prolonged treatment. This project addressed the unique needs of burn patients at KATH by providing specialized equipment, medications, and direct patient care support. The initiative recognized both the medical complexity and financial burden of burn treatment.',
        equipment: [
            'Specialized burn dressing materials and wound care supplies',
            'Pain management equipment and medications',
            'Infection prevention protocols and supplies',
            'Physical therapy equipment for rehabilitation',
            'Nutritional support for healing'
        ],
        impact: [
            'Improved wound healing outcomes for burn patients',
            'Better pain management during treatment and recovery',
            'Reduced infection rates through enhanced protocols',
            'Enhanced rehabilitation support for functional recovery',
            'Financial assistance for families during extended treatment'
        ],
        funding: '₵25,000 for patient care and equipment',
        beneficiaries: '150+ burn patients',
        duration: 'June - October 2022'
    },
    '2020': {
        title: 'Mother-Baby Unit Enhancement',
        year: '2020',
        tag: 'Neonatal Care',
        description: 'Critical equipment for early detection and treatment of neonatal jaundice.',
        fullDescription: 'Neonatal jaundice is a common but potentially serious condition in newborns that requires prompt detection and treatment. This project provided essential bilirubin meters to the Mother-Baby Unit, enabling healthcare workers to quickly and accurately assess newborn health and prevent serious complications.',
        equipment: [
            'Digital bilirubin meters for non-invasive jaundice assessment',
            'Phototherapy equipment for treatment',
            'Monitoring devices for newborn vital signs',
            'Educational materials for new mothers',
            'Support equipment for breastfeeding promotion'
        ],
        impact: [
            'Earlier detection of neonatal jaundice reducing complications',
            'Improved treatment outcomes for affected newborns',
            'Enhanced monitoring capabilities in the Mother-Baby Unit',
            'Better education and support for new mothers',
            'Reduced long-term neurological complications from untreated jaundice'
        ],
        funding: '₵18,000 for equipment and training',
        beneficiaries: '800+ newborns and mothers annually',
        duration: 'August - November 2020'
    },
    '2019': {
        title: 'Pediatric Surgery Support',
        year: '2019',
        tag: 'Surgical Care',
        description: 'Life-changing surgical interventions for needy children with excellent results.',
        fullDescription: 'This project addressed the heartbreaking reality that many children requiring surgical intervention cannot access care due to financial constraints. By funding surgeries for needy children, this initiative provided life-changing interventions that would otherwise be impossible for underprivileged families.',
        equipment: [
            'Surgical instruments for pediatric procedures',
            'Anesthesia equipment suitable for children',
            'Post-operative monitoring devices',
            'Pain management protocols and medications',
            'Rehabilitation support equipment'
        ],
        impact: [
            'Life-changing surgeries for children from underprivileged families',
            'Excellent surgical outcomes with full recovery',
            'Reduced suffering and improved quality of life',
            'Enhanced surgical capabilities for pediatric cases',
            'Hope and relief for families facing impossible financial burdens'
        ],
        funding: '₵30,000 for surgical procedures',
        beneficiaries: '25+ children requiring surgery',
        duration: 'May - September 2019'
    },
    '2018': {
        title: 'Stroke Unit Cardiac Monitor',
        year: '2018',
        tag: 'Cardiology',
        description: 'Essential cardiac monitoring equipment for the KATH stroke unit.',
        fullDescription: 'Stroke patients often have concurrent cardiac issues that require careful monitoring. This project provided a sophisticated cardiac monitor to the stroke unit, enabling healthcare providers to simultaneously manage stroke symptoms while monitoring heart function, leading to better integrated care.',
        equipment: [
            'Advanced cardiac monitor with multiple lead capability',
            'ECG interpretation software',
            'Patient mobility monitoring system',
            'Emergency alert capabilities',
            'Training materials for healthcare staff'
        ],
        impact: [
            'Enhanced monitoring of stroke patients with cardiac complications',
            'Earlier detection of cardiac events in stroke patients',
            'Improved integrated care for complex cases',
            'Better outcomes through continuous monitoring',
            'Enhanced staff confidence in managing complex patients'
        ],
        funding: '₵15,000 for cardiac monitoring equipment',
        beneficiaries: '400+ stroke patients with cardiac complications',
        duration: 'March - July 2018'
    },
    '2017': {
        title: 'HIV/AIDS Support Program',
        year: '2017',
        tag: 'Community Health',
        description: 'Final year of comprehensive support for adolescents living with HIV/AIDS.',
        fullDescription: 'This project marked the completion of a remarkable 5-year initiative (2013-2017) supporting adolescents living with HIV/AIDS. Recognizing that young people face unique challenges in managing their condition, this program provided comprehensive support including medical care, counseling, education, and social support.',
        equipment: [
            'HIV monitoring and testing equipment',
            'Nutritional supplements and support',
            'Educational materials and counseling resources',
            'Psychosocial support programs',
            'Adherence monitoring tools'
        ],
        impact: [
            'Comprehensive care for 200 adolescents living with HIV/AIDS',
            'Improved medication adherence and health outcomes',
            'Enhanced psychosocial support and counseling',
            'Better integration into education and community activities',
            'Successful completion of a 5-year transformative program'
        ],
        funding: '₵40,000 for comprehensive support services',
        beneficiaries: '200+ adolescents living with HIV/AIDS',
        duration: 'January - December 2017 (final year of 5-year program)'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('projects.html')) {
        initializeProjectsPage();
    }
});

/* =================================================================
   PROJECTS PAGE INITIALIZATION
   ================================================================= */

function initializeProjectsPage() {
    initializeProjectModals();
    initializeProjectAnimations();
    initializeProgressAnimations();
    
    console.log('Projects page loaded successfully');
}

/* =================================================================
   PROJECT MODAL FUNCTIONALITY
   ================================================================= */

function initializeProjectModals() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeProjectModal();
        }
    });
}

function openProjectModal(year) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !projectData[year]) return;
    
    const project = projectData[year];
    
    // Set modal title
    modalTitle.textContent = `${project.title} (${project.year})`;
    
    // Build modal content
    modalBody.innerHTML = buildModalContent(project);
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize image gallery
    initializeImageGallery(project.year);
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function buildModalContent(project) {
    return `
        <div class="project-meta">
            <div class="meta-item">
                <i class="fas fa-calendar"></i>
                <span><strong>Duration:</strong> ${project.duration}</span>
            </div>
            <div class="meta-item">
                <i class="fas fa-users"></i>
                <span><strong>Beneficiaries:</strong> ${project.beneficiaries}</span>
            </div>
            <div class="meta-item">
                <i class="fas fa-money-bill-wave"></i>
                <span><strong>Funding:</strong> ${project.funding}</span>
            </div>
        </div>
        
        <div class="project-section">
            <h4><i class="fas fa-info-circle"></i> Project Overview</h4>
            <p>${project.fullDescription}</p>
        </div>
        
        <div class="project-section">
            <h4><i class="fas fa-cogs"></i> Equipment & Resources</h4>
            <div class="equipment-list">
                ${project.equipment.map(item => `
                    <div class="list-item">
                        <i class="fas fa-check"></i>
                        <span>${item}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="project-section">
            <h4><i class="fas fa-chart-line"></i> Impact & Achievements</h4>
            <div class="impact-list">
                ${project.impact.map(item => `
                    <div class="list-item">
                        <i class="fas fa-arrow-right"></i>
                        <span>${item}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="project-section image-gallery">
            <h4><i class="fas fa-images"></i> Project Gallery</h4>
            <div class="gallery-grid" id="gallery-${project.year}">
                <!-- Images will be loaded here -->
            </div>
        </div>
    `;
}

/* =================================================================
   IMAGE GALLERY FUNCTIONALITY
   ================================================================= */

function initializeImageGallery(year) {
    const galleryGrid = document.getElementById(`gallery-${year}`);
    if (!galleryGrid) return;
    
    // Generate potential image paths
    const imagePaths = [
        `images/projects/${year}/project-${year}-1.jpg`,
        `images/projects/${year}/project-${year}-2.jpg`,
        `images/projects/${year}/project-${year}-3.jpg`,
        `images/projects/${year}/project-${year}-4.jpg`,
        `images/projects/${year}/project-${year}-5.jpg`
    ];
    
    let loadedImages = 0;
    const maxImages = imagePaths.length;
    
    // Try to load each image
    imagePaths.forEach((imagePath, index) => {
        const img = new Image();
        img.onload = function() {
            // Image loaded successfully, add to gallery
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${imagePath}" alt="Project ${year} - Image ${index + 1}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-expand"></i>
                </div>
            `;
            
            galleryItem.addEventListener('click', function() {
                openImageViewer(imagePath, `Project ${year} - Image ${index + 1}`);
            });
            
            galleryGrid.appendChild(galleryItem);
            loadedImages++;
        };
        
        img.onerror = function() {
            // Image failed to load
            if (index === maxImages - 1 && loadedImages === 0) {
                // No images loaded, show no images message
                // galleryGrid.innerHTML = '<div class="no-images">Project images will be added soon.</div>';
            }
        };
        
        img.src = imagePath;
    });
    
    // Fallback if no images load after a delay
    // setTimeout(() => {
    //     if (loadedImages === 0) {
    //         galleryGrid.innerHTML = '<div class="no-images">Project images will be added soon.</div>';
    //     }
    // }, 10000);
}

function openImageViewer(imageSrc, imageAlt) {
    // Create image viewer overlay
    const imageViewer = document.createElement('div');
    imageViewer.className = 'image-viewer';
    imageViewer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        backdrop-filter: blur(10px);
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.style.cssText = `
        position: absolute;
        top: 2rem;
        right: 2rem;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        backdrop-filter: blur(10px);
        transition: all var(--transition-normal);
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(212, 175, 121, 0.8)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(0, 0, 0, 0.7)';
    });
    
    imageViewer.appendChild(img);
    imageViewer.appendChild(closeBtn);
    document.body.appendChild(imageViewer);
    
    // Close handlers
    const closeViewer = () => {
        document.body.removeChild(imageViewer);
        document.removeEventListener('keydown', keyHandler);
    };
    
    const keyHandler = (e) => {
        if (e.key === 'Escape') closeViewer();
    };
    
    imageViewer.addEventListener('click', function(e) {
        if (e.target === imageViewer) closeViewer();
    });
    
    closeBtn.addEventListener('click', closeViewer);
    document.addEventListener('keydown', keyHandler);
}

/* =================================================================
   PROJECT ANIMATIONS
   ================================================================= */

function initializeProjectAnimations() {
    const projectItems = document.querySelectorAll('.project-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate project card with delay
                const projectCard = entry.target.querySelector('.project-card');
                if (projectCard) {
                    setTimeout(() => {
                        projectCard.style.opacity = '1';
                        projectCard.style.transform = 'translateX(0)';
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Set initial state and observe items
    projectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        const projectCard = item.querySelector('.project-card');
        if (projectCard) {
            projectCard.style.opacity = '0';
            projectCard.style.transform = 'translateX(-30px)';
            projectCard.style.transition = 'all 0.6s ease';
        }
        
        observer.observe(item);
    });
}

/* =================================================================
   PROGRESS BAR ANIMATIONS
   ================================================================= */

function initializeProgressAnimations() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                
                // Start from 0 and animate to target
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 2s ease-out';
                    progressBar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
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

// Export functions for global use
window.ProjectsPage = {
    openProjectModal,
    closeProjectModal,
    openImageViewer
};