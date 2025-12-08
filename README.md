# Judah Praise 2026 Website

A production-ready, minimalist charity website for the Judah Praise medical fundraising project by CMF-KATH Ghana, supporting stroke care equipment for Komfo Anokye Teaching Hospital.

## 🎯 Project Overview

**Tech Stack:** Pure HTML + CSS + Vanilla JavaScript  
**Hosting:** Firebase Hosting (Free Tier)  
**Payments:** Paystack (Mobile Money + Cards)  
**Design:** Minimalist, trust-focused, mobile-first  

## ✨ Features

- **🏥 Medical Focus:** Stroke care equipment fundraising
- **💳 Multiple Payment Options:** 
  - Mobile Money (MTN, Vodafone, AirtelTigo)
  - Card payments (Visa, Mastercard)
  - International GoFundMe integration
- **📱 Fully Responsive:** Optimized for mobile users in Ghana
- **⚡ Performance Optimized:** Fast loading on slow connections
- **🔒 Secure Payments:** PCI-compliant Paystack integration
- **📊 Impact Tracking:** 8 years of past project showcases
- **🛍️ Future Store:** Ready for T-shirt merchandise

## 📁 Project Structure

```
judah-praise-website/
├── index.html                 # Homepage
├── pages/
│   ├── impact.html           # Past Impact Timeline
│   ├── donate.html           # Donation & Payment Page
│   ├── store.html            # Store Coming Soon
│   └── contact.html          # Contact & Team Info
├── assets/
│   ├── css/
│   │   └── main.css          # All styles (no frameworks)
│   ├── js/
│   │   ├── main.js           # Core functionality
│   │   └── donations.js      # Paystack integration
│   └── images/
│       ├── hero/             # Hero background images
│       ├── gallery/          # Timeline & impact photos
│       ├── icons/            # Logo, favicon, etc.
│       └── team/             # Team member photos
├── firebase.json             # Firebase Hosting config
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js & npm installed
- Firebase CLI: `npm install -g firebase-tools`
- Git installed
- Paystack account for payments

### 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/judah-praise-website.git
cd judah-praise-website

# Setup environment variables
cp .env.example .env
# Edit .env with your actual Paystack keys and contact info
```

### 2. Configure Paystack

Get your keys from [Paystack Dashboard](https://dashboard.paystack.com/):

```javascript
// In assets/js/donations.js, update:
const PAYSTACK_CONFIG = {
    publicKey: 'pk_test_your_actual_test_key_here',  // Use test keys first
    currency: 'GHS'
};
```

### 3. Deploy to Firebase

```bash
# Login to Firebase
firebase login

# Initialize project
firebase init hosting

# Deploy
firebase deploy
```

Your site will be live at: `https://your-project.web.app`

## 💳 Payment Integration

### Supported Payment Methods

**Ghana (via Paystack):**
- MTN Mobile Money
- Vodafone Cash
- AirtelTigo Money
- Visa/Mastercard cards

**International (via GoFundMe):**
- Credit/Debit cards
- PayPal
- Bank transfers
- Digital wallets

### Testing Payments

Use Paystack test cards:
- **Success:** `4084084084084081`
- **Decline:** `4084084084084084`

## 🎨 Design System

### Colors
- **Primary:** Deep Wine Purple (`#6B2C91`)
- **Secondary:** Warm Gold (`#D4AF37`)
- **Background:** Off-white (`#FAFAFA`)
- **Text:** Dark Gray (`#2C2C2C`)

### Typography
- **Display:** Crimson Text (serif)
- **Body:** Inter (sans-serif)

### Key Principles
- Minimalist layout with generous whitespace
- Trust-building through transparency
- Mobile-first responsive design
- Accessibility-compliant

## 📊 Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 3.5s

**Optimizations:**
- Lazy-loaded images
- Minified CSS/JS
- WebP image format
- CDN caching via Firebase

## 🛡️ Security

- Environment variables for sensitive data
- PCI-compliant payment processing
- HTTPS enforcement via Firebase
- Input validation and sanitization
- CORS protection

## 📈 Analytics & Tracking

Ready for integration with:
- Google Analytics 4
- Facebook Pixel
- Paystack transaction tracking
- Custom donation analytics

## 🔧 Customization

### Adding New Content

1. **Past Impact Projects:** Edit `pages/impact.html`
2. **Team Members:** Update `pages/contact.html`
3. **Donation Amounts:** Modify `pages/donate.html`
4. **Colors/Fonts:** Edit CSS custom properties in `assets/css/main.css`

### Adding Images

1. Place optimized images in appropriate `assets/images/` folders
2. Follow naming convention: `project-year-description.jpg`
3. Create WebP versions for better performance
4. Update alt text for accessibility

## 🌍 Deployment Environments

### Test Environment
- **URL:** `https://judah-praise-test.web.app`
- **Paystack:** Test keys
- **Purpose:** Testing payments and features

### Production Environment
- **URL:** `https://judahpraise.web.app` (or custom domain)
- **Paystack:** Live keys
- **Purpose:** Real donations and public access

## 📞 Support & Maintenance

### Regular Tasks
- Monitor Paystack dashboard for donations
- Update impact stories and statistics
- Backup website files to Git
- Check website performance monthly
- Update security dependencies

### Getting Help
- **Technical Issues:** Create GitHub issue
- **Payment Problems:** Contact Paystack support
- **Hosting Issues:** Check Firebase status

## 🤝 Contributing

### Content Updates
1. Edit HTML files directly
2. Test locally: Open `index.html` in browser
3. Commit changes to Git
4. Deploy: `firebase deploy`

### Code Changes
1. Follow existing code style
2. Test thoroughly on mobile devices
3. Check payment flows in test mode
4. Document any breaking changes

## 📋 Launch Checklist

### Pre-Launch
- [ ] Replace test Paystack keys with live keys
- [ ] Add real images and content
- [ ] Update contact information
- [ ] Test all payment methods
- [ ] Configure custom domain (optional)
- [ ] Setup Google Analytics
- [ ] Test on multiple devices

### Post-Launch
- [ ] Monitor first donations
- [ ] Check error logs
- [ ] Submit to Google Search Console
- [ ] Share on social media
- [ ] Monitor performance metrics

## 📄 License

This project is created for CMF-KATH Ghana's Judah Praise medical fundraising initiative. All medical content and project information should be used in accordance with hospital policies and donor privacy requirements.

## 🙏 Acknowledgments

- **CMF-KATH Ghana** - Medical expertise and project vision
- **Paystack** - Payment processing infrastructure
- **Firebase** - Hosting and deployment platform
- **Komfo Anokye Teaching Hospital** - Medical impact and patient care

---

**Built with ❤️ for saving lives through stroke care in Ghana**

For technical support: Create an issue in this repository  
For medical inquiries: Contact CMF-KATH Ghana directly# Judah-Praise-Website
