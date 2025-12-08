// Donations functionality with Paystack integration
// This file handles donation form interactions and payment processing

// Paystack configuration - DO NOT COMMIT REAL KEYS TO VERSION CONTROL
const PAYSTACK_CONFIG = {
    // Use test key for development - replace with live key in production
    publicKey: process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_your_test_key_here',
    currency: 'GHS',
    channels: ['mobile_money', 'card'],
    // Add your production domain when deploying
    callback_url: window.location.origin + '/payment-callback'
};

// Global donation state
let donationState = {
    amount: 0,
    channel: null,
    donorInfo: {},
    fees: 0
};

// Initialize donation functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeDonationForm();
    initializeAmountSelection();
    initializeChannelSelection();
    initializeDonateButton();
});

function initializeDonationForm() {
    // Amount buttons functionality
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    
    if (amountButtons.length > 0) {
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Clear custom amount when preset is selected
                if (customAmountInput) {
                    customAmountInput.value = '';
                }
                
                selectAmount(parseInt(this.dataset.amount));
                updateActiveAmountButton(this);
            });
        });
    }
    
    // Custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', JudahPraise.debounce(function() {
            const amount = parseInt(this.value);
            if (amount && amount >= 10) {
                selectAmount(amount);
                clearAmountButtons();
            } else if (!this.value) {
                selectAmount(0);
            }
        }, 300));
        
        customAmountInput.addEventListener('blur', function() {
            const amount = parseInt(this.value);
            if (amount && amount < 10) {
                JudahPraise.showMessage(
                    document.getElementById('errorMessage'),
                    'Minimum donation amount is GH₵ 10',
                    'error'
                );
                this.value = '';
                selectAmount(0);
            }
        });
    }
    
    // Mobile money channel selection
    const momoButtons = document.querySelectorAll('.momo-btn');
    if (momoButtons.length > 0) {
        momoButtons.forEach(button => {
            button.addEventListener('click', function() {
                selectChannel(this.dataset.channel);
                updateActiveChannelButton(this);
            });
        });
    }
    
    // Form field validation
    const formFields = document.querySelectorAll('#donorName, #donorEmail, #donorPhone');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            JudahPraise.validateField(this);
            updateDonorInfo();
        });
        
        field.addEventListener('input', function() {
            updateDonorInfo();
        });
    });
}

function initializeAmountSelection() {
    // Set default amount if needed
    const firstAmountBtn = document.querySelector('.amount-btn');
    if (firstAmountBtn && !donationState.amount) {
        selectAmount(parseInt(firstAmountBtn.dataset.amount));
        updateActiveAmountButton(firstAmountBtn);
    }
}

function initializeChannelSelection() {
    // Set default channel to MTN MoMo
    const defaultChannel = document.querySelector('.momo-btn[data-channel="mtn"]');
    if (defaultChannel) {
        selectChannel('mtn');
        updateActiveChannelButton(defaultChannel);
    }
}

function initializeDonateButton() {
    const donateBtn = document.getElementById('donateBtn');
    if (donateBtn) {
        donateBtn.addEventListener('click', function() {
            processDonation();
        });
    }
}

function selectAmount(amount) {
    donationState.amount = amount;
    calculateFees(amount);
    updatePaymentSummary();
    validateDonationForm();
}

function selectChannel(channel) {
    donationState.channel = channel;
    calculateFees(donationState.amount);
    updatePaymentSummary();
}

function updateDonorInfo() {
    const name = document.getElementById('donorName')?.value || '';
    const email = document.getElementById('donorEmail')?.value || '';
    const phone = document.getElementById('donorPhone')?.value || '';
    
    donationState.donorInfo = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim()
    };
    
    validateDonationForm();
}

function calculateFees(amount) {
    if (!amount) {
        donationState.fees = 0;
        return;
    }
    
    // Paystack fee structure (approximate)
    let fee = 0;
    
    if (donationState.channel === 'card') {
        // Card fees: 1.95% + GH₵ 0.50
        fee = (amount * 0.0195) + 0.50;
    } else {
        // Mobile money fees: varies by provider, typically around 1-2%
        fee = Math.max(amount * 0.015, 1); // Minimum 1 cedi
    }
    
    donationState.fees = Math.round(fee * 100) / 100; // Round to 2 decimal places
}

function updatePaymentSummary() {
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryFee = document.getElementById('summaryFee');
    const summaryTotal = document.getElementById('summaryTotal');
    
    if (summaryAmount) {
        summaryAmount.textContent = JudahPraise.formatCurrency(donationState.amount);
    }
    
    if (summaryFee) {
        summaryFee.textContent = JudahPraise.formatCurrency(donationState.fees);
    }
    
    if (summaryTotal) {
        const total = donationState.amount + donationState.fees;
        summaryTotal.textContent = JudahPraise.formatCurrency(total);
    }
}

function updateActiveAmountButton(activeButton) {
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');
}

function updateActiveChannelButton(activeButton) {
    document.querySelectorAll('.momo-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');
}

function clearAmountButtons() {
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
    });
}

function validateDonationForm() {
    const donateBtn = document.getElementById('donateBtn');
    if (!donateBtn) return;
    
    const isValid = 
        donationState.amount >= 10 &&
        donationState.channel &&
        donationState.donorInfo.name &&
        donationState.donorInfo.email &&
        donationState.donorInfo.phone &&
        JudahPraise.validateField(document.getElementById('donorEmail')) &&
        JudahPraise.validateField(document.getElementById('donorPhone'));
    
    donateBtn.disabled = !isValid;
    donateBtn.style.opacity = isValid ? '1' : '0.6';
    donateBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
}

function processDonation() {
    // Clear any previous messages
    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');
    
    if (errorMsg) errorMsg.style.display = 'none';
    if (successMsg) successMsg.style.display = 'none';
    
    // Final validation
    if (!validateDonationData()) {
        return;
    }
    
    // Show loading state
    const donateBtn = document.getElementById('donateBtn');
    const originalText = donateBtn.innerHTML;
    donateBtn.innerHTML = '⏳ Processing...';
    donateBtn.disabled = true;
    
    // Prepare payment data
    const paymentData = {
        key: PAYSTACK_CONFIG.publicKey,
        email: donationState.donorInfo.email,
        amount: (donationState.amount + donationState.fees) * 100, // Convert to pesewas
        currency: PAYSTACK_CONFIG.currency,
        channels: [donationState.channel === 'mtn' || donationState.channel === 'vodafone' || donationState.channel === 'airteltigo' ? 'mobile_money' : 'card'],
        callback: function(response) {
            handlePaymentSuccess(response);
        },
        onClose: function() {
            handlePaymentCancellation();
        },
        metadata: {
            donor_name: donationState.donorInfo.name,
            phone: donationState.donorInfo.phone,
            project: 'Judah Praise 2026 Stroke Care',
            channel: donationState.channel
        }
    };
    
    // Add mobile money specific configuration
    if (donationState.channel !== 'card') {
        paymentData.mobile_money = {
            phone: donationState.donorInfo.phone,
            provider: donationState.channel
        };
    }
    
    try {
        // Initialize Paystack payment
        if (typeof PaystackPop !== 'undefined') {
            const handler = PaystackPop.setup(paymentData);
            handler.openIframe();
        } else {
            throw new Error('Paystack library not loaded');
        }
    } catch (error) {
        console.error('Payment initialization error:', error);
        handlePaymentError('Failed to initialize payment. Please try again.');
    } finally {
        // Reset button state after a delay
        setTimeout(() => {
            donateBtn.innerHTML = originalText;
            donateBtn.disabled = false;
        }, 3000);
    }
}

function validateDonationData() {
    const { amount, channel, donorInfo } = donationState;
    
    if (amount < 10) {
        JudahPraise.showMessage(
            document.getElementById('errorMessage'),
            'Minimum donation amount is GH₵ 10',
            'error'
        );
        return false;
    }
    
    if (!channel) {
        JudahPraise.showMessage(
            document.getElementById('errorMessage'),
            'Please select a payment method',
            'error'
        );
        return false;
    }
    
    if (!donorInfo.name || !donorInfo.email || !donorInfo.phone) {
        JudahPraise.showMessage(
            document.getElementById('errorMessage'),
            'Please fill in all required fields',
            'error'
        );
        return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorInfo.email)) {
        JudahPraise.showMessage(
            document.getElementById('errorMessage'),
            'Please enter a valid email address',
            'error'
        );
        return false;
    }
    
    // Validate phone format (Ghana numbers)
    const phoneRegex = /^(\+233|0)[2459]\d{8}$/;
    if (!phoneRegex.test(donorInfo.phone.replace(/\s/g, ''))) {
        JudahPraise.showMessage(
            document.getElementById('errorMessage'),
            'Please enter a valid Ghana phone number (e.g., 0244000000)',
            'error'
        );
        return false;
    }
    
    return true;
}

function handlePaymentSuccess(response) {
    console.log('Payment successful:', response);
    
    // Show success message
    JudahPraise.showMessage(
        document.getElementById('successMessage'),
        `🎉 Thank you! Your donation of ${JudahPraise.formatCurrency(donationState.amount)} has been processed successfully. Reference: ${response.reference}`,
        'success'
    );
    
    // Send confirmation email (implement backend endpoint)
    sendDonationConfirmation(response);
    
    // Track donation (analytics)
    trackDonation(response);
    
    // Reset form after successful payment
    setTimeout(() => {
        resetDonationForm();
    }, 3000);
}

function handlePaymentError(errorMessage) {
    console.error('Payment error:', errorMessage);
    
    JudahPraise.showMessage(
        document.getElementById('errorMessage'),
        'Payment failed: ' + errorMessage + ' Please try again or contact support.',
        'error'
    );
}

function handlePaymentCancellation() {
    console.log('Payment cancelled by user');
    
    JudahPraise.showMessage(
        document.getElementById('errorMessage'),
        'Payment was cancelled. You can try again anytime.',
        'error'
    );
}

function sendDonationConfirmation(response) {
    // This should be implemented with your backend
    // For now, we'll just log the data that should be sent
    
    const confirmationData = {
        reference: response.reference,
        amount: donationState.amount,
        fees: donationState.fees,
        donor: donationState.donorInfo,
        channel: donationState.channel,
        timestamp: new Date().toISOString()
    };
    
    console.log('Donation confirmation data:', confirmationData);
    
    // Example implementation:
    /*
    fetch('/api/donation-confirmation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmationData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Confirmation sent:', data);
    })
    .catch(error => {
        console.error('Confirmation error:', error);
    });
    */
}

function trackDonation(response) {
    // Track donation for analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'donation', {
            currency: 'GHS',
            value: donationState.amount,
            items: [{
                item_id: 'stroke_care_2026',
                item_name: 'Stroke Care Project 2026',
                category: 'Medical Equipment',
                quantity: 1,
                price: donationState.amount
            }]
        });
    }
    
    // Track with other analytics services as needed
    console.log('Donation tracked:', {
        amount: donationState.amount,
        channel: donationState.channel,
        reference: response.reference
    });
}

function resetDonationForm() {
    // Reset form fields
    document.getElementById('donorName').value = '';
    document.getElementById('donorEmail').value = '';
    document.getElementById('donorPhone').value = '';
    document.getElementById('customAmount').value = '';
    
    // Reset active states
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.momo-btn').forEach(btn => btn.classList.remove('active'));
    
    // Reset donation state
    donationState = {
        amount: 0,
        channel: null,
        donorInfo: {},
        fees: 0
    };
    
    // Reset default selections
    initializeAmountSelection();
    initializeChannelSelection();
    updatePaymentSummary();
}

// Utility function to format phone number
function formatGhanaPhoneNumber(phone) {
    // Remove any spaces or special characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Handle different formats
    if (cleaned.startsWith('233')) {
        return '+' + cleaned;
    } else if (cleaned.startsWith('0')) {
        return '+233' + cleaned.substring(1);
    } else if (cleaned.length === 9) {
        return '+233' + cleaned;
    }
    
    return phone; // Return original if can't format
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectAmount,
        selectChannel,
        validateDonationData,
        formatGhanaPhoneNumber,
        calculateFees
    };
}