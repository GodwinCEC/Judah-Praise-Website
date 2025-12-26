/* =================================================================
   DONATION FORM PAGE - PAYSTACK INTEGRATION
   ================================================================= */

// Paystack Configuration
const PAYSTACK_PUBLIC_KEY = 'pk_live_b54ef602006c234dce969db75b4aa267620472ee'; // Use your live key

let selectedAmount = 0;
let donorInfo = {};

document.addEventListener('DOMContentLoaded', function () {
    initializeDonationForm();
});

function initializeDonationForm() {
    const form = document.getElementById('donation-form');
    const customAmountInput = document.getElementById('custom-amount');
    const submitBtn = document.getElementById('donate-submit-btn');

    // Custom amount input
    customAmountInput.addEventListener('input', function() {
        const amount = Math.max(1, parseInt(this.value) || 0);
        selectedAmount = amount;
        updateSelectedAmountDisplay();
        validateForm();
    });

    // Form inputs validation
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('input', validateForm);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleDonationSubmission();
    });
    
    // Initial validation
    validateForm();
}

function updateSelectedAmountDisplay() {
    const display = document.getElementById('selected-amount-display');
    const amountValue = document.getElementById('amount-value');
    
    if (selectedAmount > 0) {
        amountValue.textContent = `₵${selectedAmount.toLocaleString()}`;
        display.style.display = 'flex';
    } else {
        display.style.display = 'none';
    }
}

function validateForm() {
    const name = document.getElementById('donor-name').value.trim();
    const email = document.getElementById('donor-email').value.trim();
    const amount = parseInt(document.getElementById('custom-amount').value) || 0;
    const submitBtn = document.getElementById('donate-submit-btn');
    
    const isValid = name.length > 0 && 
                   email.length > 0 && 
                   isValidEmail(email) && 
                   amount >= 1;
    
    submitBtn.disabled = !isValid;
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleDonationSubmission() {
    if (!validateForm()) {
        showNotification('Please fill all required fields correctly', 'error');
        return;
    }
    
    const amount = parseInt(document.getElementById('custom-amount').value) || 0;
    
    if (amount < 1) {
        showNotification('Minimum donation amount is ₵1', 'error');
        return;
    }
    
    // Update selectedAmount from input
    selectedAmount = amount;
    
    // Collect donor information
    donorInfo = {
        name: document.getElementById('donor-name').value.trim(),
        email: document.getElementById('donor-email').value.trim(),
        phone: document.getElementById('donor-phone').value.trim() || '',
        amount: selectedAmount
    };
    
    // Show loading state
    const submitBtn = document.getElementById('donate-submit-btn');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Processing...</span>';
    submitBtn.disabled = true;
    
    // Initiate Paystack payment after short delay
    setTimeout(() => {
        initializePaystackPayment();
        
        // Reset button state
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        validateForm(); // Re-validate to set correct state
    }, 1000);
}

function initializePaystackPayment() {
    if (typeof PaystackPop === 'undefined') {
        showNotification('Payment system not available. Please try again later.', 'error');
        console.error('Paystack library not loaded');
        return;
    }
    
    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: donorInfo.email,
        amount: donorInfo.amount * 100, // Paystack expects amount in pesewas
        currency: 'GHS',
        firstname: donorInfo.name.split(' ')[0],
        lastname: donorInfo.name.split(' ').slice(1).join(' ') || '',
        phone: donorInfo.phone,
        metadata: {
            project: 'Stroke Project 2026',
            donor_name: donorInfo.name,
            donor_phone: donorInfo.phone,
            campaign: 'Judah Praise CMF',
            custom_fields: [
                {
                    display_name: "Project",
                    variable_name: "project",
                    value: "Stroke Project 2026"
                },
                {
                    display_name: "Organization",
                    variable_name: "organization",
                    value: "Judah Praise CMF"
                }
            ]
        },
        callback: function (response) {
            handlePaymentSuccess(response);
        },
        onClose: function () {
            handlePaymentClosed();
        }
    });
    
    handler.openIframe();
}

function handlePaymentSuccess(response) {
    console.log('Payment successful:', response);
    
    // Show success modal instead of notification
    showSuccessModal();
    
    // Track the donation
    trackDonationEvent('payment_success', donorInfo.amount, 'paystack');
}

function handlePaymentClosed() {
    console.log('Payment was closed by user');
    showNotification('Payment cancelled. You can try again anytime.', 'warning');
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    const closeBtn = document.getElementById('close-success');
    
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Close button handler
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                // Optional: Redirect to home page
                window.location.href = 'index.html';
            };
        }
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
                window.location.href = 'index.html';
            }
        }, 10000);
    }
}

function trackDonationEvent(eventType, amount, method) {
    const eventData = {
        type: eventType,
        amount: amount,
        method: method,
        timestamp: new Date().toISOString(),
        project: 'Stroke Project 2026',
        page: 'donate-form'
    };
    
    console.log('Donation Event:', eventData);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#5cb85c',
        error: '#d9534f',
        warning: '#f0ad4e',
        info: '#4a90e2'
    };
    return colors[type] || '#4a90e2';
}