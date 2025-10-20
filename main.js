// 作品渲染函数
async function renderPortfolio(filter = 'all') {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filteredData = filter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filter);
    
    // 检查WebP支持
    const webPSupported = await WebPSupport.supportsWebP();
    
    filteredData.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.style.animationDelay = `${index * 0.1}s`;
        
        // 根据WebP支持选择图片路径
        const imagePath = webPSupported 
            ? item.coverImage.replace(/\.(jpg|jpeg|png)$/i, '.webp')
            : item.coverImage;
        
        portfolioItem.innerHTML = `
            <img src="${imagePath}" alt="${item.title}" loading="lazy" 
                 onerror="if(this.src !== '${item.coverImage}') this.src='${item.coverImage}'">
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
    const messageDiv = document.getElementById('form-message');
    if (!form || !messageDiv) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // 显示加载状态
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = '发送中...';
        submitButton.disabled = true;
        messageDiv.className = 'mt-4 text-sm hidden';
        
        try {
            // 发送到API
            const response = await fetch('https://sukipartners.com/api/v1/contact-messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    topic: data.topic,
                    message: data.message,
                    timestamp: new Date().toISOString(),
                    source: 'website-form'
                })
            });
            
            if (response.ok) {
                // 成功提交
                messageDiv.textContent = '感谢您的分享！我们会认真阅读您的留言。';
                messageDiv.className = 'mt-4 text-sm text-green-600';
                form.reset();
            } else {
                // 服务器错误
                throw new Error(`服务器错误: ${response.status}`);
            }
        } catch (error) {
            console.error('表单提交错误:', error);
            messageDiv.textContent = '发送失败，请稍后重试或直接发送邮件至 siqinnn@foxmail.com';
            messageDiv.className = 'mt-4 text-sm text-red-600';
        } finally {
            // 恢复按钮状态
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // 3秒后隐藏消息
            setTimeout(() => {
                messageDiv.className = 'mt-4 text-sm hidden';
            }, 3000);
        }
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
