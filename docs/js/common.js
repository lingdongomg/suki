/**
 * Common Scripts - Suki+Partners
 * 通用交互脚本
 */

(function() {
    'use strict';

    // ========================================
    // 导航栏滚动效果
    // ========================================
    function initNavbarScroll() {
        const navbar = document.querySelector('.nav-bar');
        if (!navbar) return;

        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.pageYOffset > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ========================================
    // 滚动触发动画 (Intersection Observer)
    // ========================================
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -5% 0px',
            threshold: 0.1
        };

        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 为需要动画的元素添加观察
        const animatableElements = document.querySelectorAll(
            '.content-section, .catalog-item, .intro-illustration'
        );
        
        animatableElements.forEach(el => {
            if (!el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
            }
            animateOnScroll.observe(el);
        });
    }

    // ========================================
    // 图片优化加载
    // ========================================
    function initImageLoading() {
        const images = document.querySelectorAll('.content-section img, .gallery img');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // 设置初始透明度
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.4s ease-out';
                    
                    // 图片加载完成后淡入
                    if (img.complete) {
                        requestAnimationFrame(() => {
                            img.style.opacity = '1';
                        });
                    } else {
                        img.addEventListener('load', () => {
                            requestAnimationFrame(() => {
                                img.style.opacity = '1';
                            });
                        }, { once: true });
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '100px' });

        images.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // 平滑滚动到锚点
    // ========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ========================================
    // 滚动提示点击
    // ========================================
    function initScrollHint() {
        const scrollHint = document.querySelector('.scroll-hint');
        if (!scrollHint) return;

        scrollHint.addEventListener('click', () => {
            const nextSection = document.querySelector('#about, .content-section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ========================================
    // 图片 Lightbox
    // ========================================
    function initLightbox() {
        // 检查是否已存在 lightbox
        let lightbox = document.querySelector('.lightbox');
        
        if (!lightbox) {
            // 创建 lightbox 结构
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <span class="close" aria-label="关闭">&times;</span>
                <img src="" alt="放大图片">
            `;
            document.body.appendChild(lightbox);
        }

        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.close');

        // 为可点击的图片添加事件
        document.querySelectorAll('.gallery img, .content-section img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        // 关闭 lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // ESC 键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('open')) {
                closeLightbox();
            }
        });
    }

    // ========================================
    // 页面加载完成时滚动到顶部（项目页面）
    // ========================================
    function initScrollToTop() {
        if (document.querySelector('.project-container')) {
            window.scrollTo(0, 0);
        }
    }

    // ========================================
    // 初始化
    // ========================================
    function init() {
        initNavbarScroll();
        initScrollAnimations();
        initImageLoading();
        initSmoothScroll();
        initScrollHint();
        initScrollToTop();
        
        // Lightbox 可选启用
        // initLightbox();
    }

    // DOM 加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 导出到全局（可选）
    window.SukiScripts = {
        initNavbarScroll,
        initScrollAnimations,
        initImageLoading,
        initSmoothScroll,
        initScrollHint,
        initLightbox,
        init
    };
})();
