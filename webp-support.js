// WebP格式支持检测和图片加载工具

// 检测浏览器是否支持WebP格式
function supportsWebP() {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = function() {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
}

// 获取WebP格式的图片路径
function getWebPImagePath(originalPath) {
    if (!originalPath) return originalPath;
    
    // 替换文件扩展名为.webp
    return originalPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
}

// 获取最佳图片路径（支持WebP的浏览器使用WebP，否则使用原格式）
async function getOptimalImagePath(originalPath) {
    if (!originalPath) return originalPath;
    
    const webPSupported = await supportsWebP();
    if (webPSupported) {
        return getWebPImagePath(originalPath);
    }
    return originalPath;
}

// 预加载图片
function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// 批量预加载图片
async function preloadImages(imagePaths) {
    const promises = imagePaths.map(path => preloadImage(path).catch(() => null));
    return Promise.all(promises);
}

// 创建图片元素（支持WebP）
async function createImageElement(originalPath, alt = '', className = '') {
    const optimalPath = await getOptimalImagePath(originalPath);
    const img = document.createElement('img');
    img.src = optimalPath;
    img.alt = alt;
    if (className) img.className = className;
    
    // 添加错误处理：如果WebP加载失败，回退到原格式
    img.onerror = function() {
        if (optimalPath !== originalPath) {
            this.src = originalPath;
        }
    };
    
    return img;
}

// 设置背景图片（支持WebP）
async function setBackgroundImage(element, originalPath) {
    const optimalPath = await getOptimalImagePath(originalPath);
    
    // 预加载图片
    const img = new Image();
    img.onload = function() {
        element.style.backgroundImage = `url('${optimalPath}')`;
    };
    img.onerror = function() {
        // 如果WebP加载失败，回退到原格式
        if (optimalPath !== originalPath) {
            img.src = originalPath;
        }
    };
    img.src = optimalPath;
}

// 导出函数
window.WebPSupport = {
    supportsWebP,
    getWebPImagePath,
    getOptimalImagePath,
    preloadImage,
    preloadImages,
    createImageElement,
    setBackgroundImage
};