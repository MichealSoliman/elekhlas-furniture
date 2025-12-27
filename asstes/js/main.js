// Main JavaScript for Al-Ikhlas Furniture Moving Website

// ==========================================
// 1. Smooth Scroll Functionality
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// ==========================================
// 2. Mobile Menu Toggle
// ==========================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Open mobile menu
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
}

// Close mobile menu
if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
}

// Close mobile menu when clicking on a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// ==========================================
// 3. Header Scroll Effect
// ==========================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// 4. Scroll Reveal Animation
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ==========================================
// 5. Counter Animation
// ==========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = '+' + target;
            clearInterval(timer);
        } else {
            element.textContent = '+' + Math.floor(start);
        }
    }, 16);
}

// Start counter animation when in viewport
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const counters = entry.target.querySelectorAll('.text-4xl');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace('+', '').replace('%', ''));
                if (!isNaN(target)) {
                    counter.textContent = '0';
                    animateCounter(counter, target);
                }
            });
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

// Observe trust indicators section
const trustIndicators = document.querySelector('.grid.grid-cols-3.gap-6');
if (trustIndicators) {
    counterObserver.observe(trustIndicators);
}

// ==========================================
// 6. Gallery Lightbox (Simple Version)
// ==========================================
const galleryImages = document.querySelectorAll('#gallery .image-overlay img');

galleryImages.forEach(img => {
    img.addEventListener('click', function() {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
        lightbox.style.cursor = 'pointer';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = this.src;
        lightboxImg.className = 'max-w-full max-h-full rounded-lg shadow-2xl';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.className = 'absolute top-8 right-8 text-white text-4xl hover:text-primary transition';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Close on click
        lightbox.addEventListener('click', function() {
            document.body.removeChild(lightbox);
            document.body.style.overflow = 'auto';
        });
        
        // Close on escape key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
});

// ==========================================
// 7. Form Validation (if forms are added later)
// ==========================================
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// ==========================================
// 8. WhatsApp Float Button Animation
// ==========================================
const whatsappFloat = document.querySelector('.whatsapp-float');

if (whatsappFloat) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.visibility = 'visible';
        } else {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.visibility = 'hidden';
        }
    });
    
    // Initial state
    if (window.pageYOffset <= 300) {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.visibility = 'hidden';
    }
}

// ==========================================
// 9. Testimonial Slider (Enhanced)
// ==========================================
const testimonials = document.querySelectorAll('#testimonials .scale-on-hover');

testimonials.forEach((testimonial, index) => {
    testimonial.style.animationDelay = `${index * 0.2}s`;
});

// ==========================================
// 10. Service Card Interactions
// ==========================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==========================================
// 11. Blog Post Cards Hover Effect
// ==========================================
const blogCards = document.querySelectorAll('#blog article');

blogCards.forEach(card => {
    const link = card.querySelector('h3 a');
    
    card.addEventListener('mouseenter', function() {
        if (link) {
            link.style.color = '#eb1a32';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (link) {
            link.style.color = '';
        }
    });
});

// ==========================================
// 12. Lazy Loading Images Enhancement
// ==========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// 13. Active Section Highlight in Navigation
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function highlightNavigation() {
    let current = '';
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-primary');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-primary');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ==========================================
// 14. Performance Optimization
// ==========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightNavigation, 100);
window.addEventListener('scroll', debouncedHighlight);

// ==========================================
// 15. Print Friendly Functionality
// ==========================================
window.addEventListener('beforeprint', () => {
    // Expand all collapsed sections before printing
    document.querySelectorAll('.mobile-menu').forEach(menu => {
        menu.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    // Restore normal state after printing
    document.querySelectorAll('.mobile-menu').forEach(menu => {
        menu.style.display = '';
    });
});

// ==========================================
// 16. Accessibility Enhancements
// ==========================================
// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

if (mobileMenu) {
    trapFocus(mobileMenu);
}

// ==========================================
// 17. Console Welcome Message
// ==========================================
console.log('%c🚚 شركة الإخلاص لنقل الأثاث', 'color: #eb1a32; font-size: 24px; font-weight: bold;');
console.log('%cموقع مصمم باحترافية عالية', 'color: #333; font-size: 14px;');
console.log('%cللتواصل: 0551314872 | واتساب: 0557844548', 'color: #25d366; font-size: 12px;');

// ==========================================
// 18. Page Load Complete
// ==========================================
window.addEventListener('load', () => {
    // Remove any loading overlays
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Initialize all animations
    document.body.classList.add('loaded');
    
    // Trigger initial scroll reveal
    window.dispatchEvent(new Event('scroll'));
    
    console.log('✅ الموقع جاهز بالكامل');
});

// ==========================================
// 19. Error Handling
// ==========================================
window.addEventListener('error', (e) => {
    console.error('خطأ في تحميل المورد:', e.target);
});

// ==========================================
// 20. Service Worker Registration (PWA Ready)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is ready
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker مسجل'))
        //     .catch(err => console.log('خطأ في تسجيل Service Worker:', err));
    });
}
