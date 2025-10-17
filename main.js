// 作品渲染函数
function renderPortfolio(filter = 'all') {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filteredData = filter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filter);
    
    filteredData.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.style.animationDelay = `${index * 0.1}s`;
        portfolioItem.innerHTML = `
            <img src="${item.coverImage}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h3 class="font-serif text-2xl text-white mb-2">${item.title}</h3>
                <p class="text-white/80 text-sm font-light">${item.description}</p>
            </div>
        `;
        
        // 点击跳转到作品详情页
        portfolioItem.addEventListener('click', () => {
            window.location.href = `portfolio-detail.html?id=${item.id}`;
        });
        
        grid.appendChild(portfolioItem);
    });
}

// 初始化作品筛选
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的 active 类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的 active 类
            button.classList.add('active');
            
            // 获取筛选类别并渲染
            const filter = button.getAttribute('data-filter');
            renderPortfolio(filter);
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // 向下滚动
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // 向上滚动
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// 返回顶部按钮
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.pointerEvents = 'auto';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.pointerEvents = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 表单提交处理
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // 这里可以添加实际的表单提交逻辑
        console.log('表单数据:', data);
        
        // 显示成功消息
        alert('感谢您的预约！我们会尽快与您联系。');
        form.reset();
    });
}

// 移动端菜单切换
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // 点击菜单项后关闭菜单
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 渲染作品
    renderPortfolio();
    
    // 初始化各种功能
    initPortfolioFilter();
    initSmoothScroll();
    initNavbarScroll();
    initBackToTop();
    initContactForm();
    initMobileMenu();
    
    // 添加页面加载动画
    document.body.classList.add('loaded');
});

// 图片懒加载
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // 观察所有需要懒加载的图片
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}
