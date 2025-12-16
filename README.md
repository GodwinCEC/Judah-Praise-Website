# Judah Praise 2026 Website

A production-ready, minimalist charity website for the Judah Praise medical fundraising project by CMF-KATH Ghana, supporting stroke care equipment for Komfo Anokye Teaching Hospital.

## 🎯 Project Overview

**Tech Stack:** Pure HTML + CSS + Vanilla JavaScript  
**Hosting:** Firebase Hosting
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
├── index.html               # Homepage
├── about.html               # About page
├── contact.html             # Contact page
├── donate.html              # Donation & Payment page
├── project.html             # Project / Portfolio page
├── css/
│   ├── styles.css           # Global styles shared across pages
│   ├── home.css             # Styles specific to index.html
│   ├── about.css            # Styles specific to about.html
│   ├── contact.css          # Styles specific to contact.html
│   ├── donate.css           # Styles specific to donate.html
│   └── project.css          # Styles specific to project.html
├── js/
│   ├── main.js              # Shared JS across pages
│   ├── home.js              # JS specific to index.html
│   ├── about.js             # JS specific to about.html
│   ├── contact.js           # JS specific to contact.html
│   ├── donate.js            # JS specific to donate.html
│   └── project.js           # JS specific to project.html
├── images/
│   ├── logo.png             # Logo
│   ├── favicon.ico          # Favicon
│   ├── hero-bg.jpg          # Homepage hero image
│   └── other images...      # Any other images for pages
├── firebase.json            # Firebase Hosting config
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation

```

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

## 🌍 Deployment Environments

### Test Environment
- **URL:** `https://judah-praise-test.web.app`
- **Paystack:** Test keys
- **Purpose:** Testing payments and features

### Production Environment
- **URL:** `https://cmfjudahpraise.com`
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
