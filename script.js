// ==================== 
// 导航栏功能
// ==================== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const enBtn = document.getElementById('enBtn');
const zhBtn = document.getElementById('zhBtn');

// 移动端导航切换
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接时关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== 
// 语言切换功能
// ==================== 
let currentLang = 'en'; // 默认英文

// 语言切换函数
function switchLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    updateContent();
    updateLangButton();
    
    // 保存语言偏好到本地存储
    localStorage.setItem('preferred-language', currentLang);
}

// 更新页面内容
function updateContent() {
    const elements = document.querySelectorAll('[data-en][data-zh]');
    
    elements.forEach(element => {
        const text = currentLang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-zh');
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            // 处理表单元素的placeholder
            const placeholderAttr = currentLang === 'en' ? 'data-placeholder-en' : 'data-placeholder-zh';
            const placeholder = element.getAttribute(placeholderAttr);
            if (placeholder) {
                element.placeholder = placeholder;
            }
        } else {
            // 处理普通元素的文本内容
            if (text) {
                element.innerHTML = text;
            }
        }
    });
    
    // 更新HTML lang属性
    document.documentElement.lang = currentLang === 'en' ? 'en' : 'zh-CN';
    
    // 更新页面标题
    document.title = currentLang === 'en' ? 'Weixi Lin - Personal Homepage' : '林炜希 - 个人主页';
}

// 更新语言切换按钮
function updateLangButton() {
    if (enBtn && zhBtn) {
        if (currentLang === 'en') {
            enBtn.classList.add('active');
            zhBtn.classList.remove('active');
        } else {
            zhBtn.classList.add('active');
            enBtn.classList.remove('active');
        }
    }
}

// 语言切换按钮事件
if (enBtn && zhBtn) {
    enBtn.addEventListener('click', function() {
        if (currentLang !== 'en') {
            currentLang = 'en';
            updateContent();
            updateLangButton();
            localStorage.setItem('preferred-language', currentLang);
        }
    });
    
    zhBtn.addEventListener('click', function() {
        if (currentLang !== 'zh') {
            currentLang = 'zh';
            updateContent();
            updateLangButton();
            localStorage.setItem('preferred-language', currentLang);
        }
    });
}

// 页面加载时检查保存的语言偏好
function initLanguage() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang !== currentLang) {
        currentLang = savedLang;
        updateContent();
        updateLangButton();
    }
}

// 初始化语言设置
initLanguage();

// 调试：确保语言切换按钮存在
if (enBtn && zhBtn) {
    console.log('语言切换按钮已找到');
    updateLangButton(); // 初始化按钮状态
} else {
    console.error('未找到语言切换按钮');
}

// ==================== 
// 平滑滚动
// ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 
// 导航栏滚动效果
// ==================== 
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 添加滚动样式
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // 自动隐藏/显示导航栏（向下滚动时隐藏，向上滚动时显示）
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// ==================== 
// 滚动动画观察器
// ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .award-card, .stat-item, .contact-item, .exp-item').forEach(item => {
    observer.observe(item);
});

// ==================== 
// 打字机效果
// ==================== 
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 页面加载完成后启动打字机效果
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// ==================== 
// 滚动进度条
// ==================== 
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

createScrollProgress();

// ==================== 
// 联系表单处理
// ==================== 
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // 简单验证
        if (!name || !email || !message) {
            const message = currentLang === 'en' ? 'Please fill in all required fields' : '请填写所有必填字段';
            showNotification(message, 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            const message = currentLang === 'en' ? 'Please enter a valid email address' : '请输入有效的邮箱地址';
            showNotification(message, 'error');
            return;
        }
        
        // 模拟表单提交
        const successMessage = currentLang === 'en' ? 'Thank you for your message! I will reply as soon as possible.' : '感谢您的留言！我会尽快回复您。';
        showNotification(successMessage, 'success');
        this.reset();
    });
}

// 邮箱验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知显示
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动移除
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ==================== 
// 鼠标悬停效果
// ==================== 
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== 
// 按钮点击动画
// ==================== 
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        // 创建涟漪效果
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ==================== 
// 数字计数动画
// ==================== 
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000; // 2秒
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        // 当元素进入视口时开始动画
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    numberObserver.unobserve(entry.target);
                }
            });
        });
        
        numberObserver.observe(stat);
    });
}

animateNumbers();

// ==================== 
// 技能栏动画
// ==================== 
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-list li');
    
    skillItems.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateX(-20px)';
        skill.style.transition = `all 0.5s ease ${index * 0.1}s`;
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    skillObserver.unobserve(entry.target);
                }
            });
        });
        
        skillObserver.observe(skill);
    });
}

animateSkills();

// ==================== 
// 添加CSS动画样式
// ==================== 
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex !important;
        }
    }
`;

document.head.appendChild(style);

// ==================== 
// 页面加载完成处理
// ==================== 
window.addEventListener('load', () => {
    // 移除加载动画（如果有的话）
    document.body.classList.add('loaded');
    
    // 初始化所有动画
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
        });
    }, 100);
});

// ==================== 
// 防抖函数
// ==================== 
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

// 优化滚动性能
window.addEventListener('scroll', debounce(() => {
    // 滚动相关的性能敏感代码
}, 10));

console.log('🎉 个人主页已加载完成！');
console.log('👨‍💻 林炜希的个人主页 - 专注于AI与大模型开发'); 