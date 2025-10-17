// Portfolio Detail Page Script
document.addEventListener('DOMContentLoaded', () => {
    // Get portfolio ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const portfolioId = parseInt(urlParams.get('id'));
    
    // Load portfolio data
    const portfolio = portfolioData.find(item => item.id === portfolioId);
    
    if (!portfolio) {
        window.location.href = 'index.html';
        return;
    }
    
    // Render portfolio details
    renderPortfolioDetails(portfolio);
    
    // Initialize lightbox
    initLightbox(portfolio.images);
});

function renderPortfolioDetails(portfolio) {
    // Title
    document.getElementById('portfolio-title').textContent = portfolio.title;
    
    // Meta information
    const metaHTML = `
        <div class="meta-item">
            <i class="far fa-calendar"></i>
            <span>${portfolio.date}</span>
        </div>
        <div class="meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${portfolio.location}</span>
        </div>
        <div class="meta-item">
            <i class="fas fa-tag"></i>
            <span>${getCategoryName(portfolio.category)}</span>
        </div>
    `;
    document.getElementById('portfolio-meta').innerHTML = metaHTML;
    
    // Description
    const descriptionHTML = `
        <p class="description-text">${portfolio.description}</p>
        <div class="description-full">${portfolio.fullDescription.replace(/\n/g, '<br><br>')}</div>
    `;
    document.getElementById('portfolio-description').innerHTML = descriptionHTML;
    
    // Gallery
    const galleryHTML = portfolio.images.map((img, index) => `
        <div class="gallery-item" data-index="${index}">
            <img src="${img}" alt="${portfolio.title} ${index + 1}" loading="lazy">
        </div>
    `).join('');
    document.getElementById('gallery-grid').innerHTML = galleryHTML;
    
    // Add click event to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            openLightbox(index);
        });
    });
}

function getCategoryName(category) {
    const categories = {
        'indoor': '室内',
        'outdoor': '户外',
        'floral': '花艺'
    };
    
    if (category.includes(',')) {
        return category.split(',').map(cat => categories[cat] || cat).join(' · ');
    }
    
    return categories[category] || category;
}

let currentImageIndex = 0;
let images = [];

function initLightbox(portfolioImages) {
    images = portfolioImages;
    
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const image = document.getElementById('lightbox-image');
    const counter = document.getElementById('lightbox-counter');
    
    image.src = images[currentImageIndex];
    counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const image = document.getElementById('lightbox-image');
    const counter = document.getElementById('lightbox-counter');
    
    image.style.opacity = '0';
    
    setTimeout(() => {
        image.src = images[currentImageIndex];
        counter.textContent = `${currentImageIndex + 1} / ${images.length}`;
        image.style.opacity = '1';
    }, 200);
}
