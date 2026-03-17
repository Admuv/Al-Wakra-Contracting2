// ========== متغيرات عامة ==========
const header = document.querySelector('.main-header');
const backToTop = document.getElementById('back-to-top');
const sections = document.querySelectorAll('.full-page-section');
const statNumbers = document.querySelectorAll('.stat-number');
const heroText = document.querySelector('.welcome-text');
const navLinks = document.querySelectorAll('.nav-link');

// ========== 1. تأثير شريط التنقل عند التمرير ==========
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(5, 10, 20, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0, 168, 255, 0.2)';
    } else {
        header.style.background = 'rgba(10, 15, 30, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    }
    
    // ظهور/اختفاء زر العودة للأعلى
    if (window.scrollY > 500) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

// ========== 2. زر العودة للأعلى ==========
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== 3. تأثير ظهور العناصر عند التمرير (Intersection Observer) ==========
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // إذا كان القسم يحتوي على أرقام إحصائية، شغّل العداد
            if (entry.target.querySelector('.stat-number')) {
                animateNumbers(entry.target);
            }
        }
    });
}, observerOptions);

// تطبيق المراقب على كل الأقسام وبطاقات الخدمات
document.querySelectorAll('.full-page-section, .service-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ========== 4. عداد الأرقام المتحرك ==========
function animateNumbers(container) {
    const numbers = container.querySelectorAll('.stat-number');
    numbers.forEach(num => {
        const target = parseInt(num.innerText);
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 50; // تقسيم الحركة على 50 خطوة
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                num.innerText = target + (num.innerText.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                num.innerText = Math.floor(current) + (num.innerText.includes('+') ? '+' : '');
            }
        }, 20);
    });
}

// ========== 5. تأثير الكتابة (Typing Effect) ==========
const phrases = [
    'Welcome to Al Wakra Contracting',
    'الوكرة للمقاولات الكهربائية',
    'Your Trusted Electrical Partner',
    'Powering Your Future'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        heroText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        heroText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1000; // توقف قبل المسح
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 300;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// بدأ تأثير الكتابة بعد تحميل الصفحة
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// ========== 6. قائمة هامبورغر للجوال ==========
// إنشاء زر القائمة وإضافته للهيدر
const menuBtn = document.createElement('button');
menuBtn.classList.add('menu-toggle');
menuBtn.innerHTML = '☰';
menuBtn.setAttribute('aria-label', 'القائمة');
header.querySelector('.button-container').before(menuBtn); // وضعه قبل الأزرار

// إضافة حدث النقر
menuBtn.addEventListener('click', () => {
    const nav = document.querySelector('.button-container');
    nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
    menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
});

// إغلاق القائمة عند النقر على رابط
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.button-container').classList.remove('active');
        menuBtn.classList.remove('active');
        menuBtn.innerHTML = '☰';
    });
});

// ========== 7. تأثير بارالاكس بسيط للخلفية ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelector('.hero-section').style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// ========== 8. رسالة ترحيب في الكونسول (للمطورين) ==========
console.log('%c✨ Al Wakra Contracting ✨\nتم تطوير الموقع باحترافية بواسطة مساعدك الذكي', 'color: #00a8ff; font-size: 16px; font-weight: bold;');