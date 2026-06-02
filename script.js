document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    let touchStartX = 0;
    let touchEndX = 0;

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    navMenu.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    navMenu.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.08)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentCard = this.closest('.video-card, .product-video');
            parentCard.style.position = 'relative';
            
            const videoOverlay = document.createElement('div');
            videoOverlay.className = 'video-overlay';
            videoOverlay.innerHTML = `
                <div class="overlay-content">
                    <p>视频播放演示</p>
                    <span class="overlay-close">关闭</span>
                </div>
            `;
            videoOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
                cursor: pointer;
            `;
            
            parentCard.appendChild(videoOverlay);
            
            videoOverlay.addEventListener('click', function(e) {
                if (e.target.classList.contains('video-overlay') || e.target.classList.contains('overlay-close')) {
                    videoOverlay.remove();
                }
            });
        });
    });

    const productItems = document.querySelectorAll('.product-item, .product-image-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    productItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('span').textContent;
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    const cards = document.querySelectorAll('.story-card, .video-card, .copy-card, .poster-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    const aiCards = document.querySelectorAll('.ai-card');
    aiCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.src;
            const title = this.querySelector('h3')?.textContent || '';
            const desc = this.querySelector('p')?.textContent || '';
            
            const lightbox = document.createElement('div');
            lightbox.className = 'ai-lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${imgSrc}" alt="${title}">
                    <div class="lightbox-info">
                        <h3>${title}</h3>
                        <p>${desc}</p>
                    </div>
                </div>
            `;
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 40px;
            `;
            
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                max-width: 900px;
                width: 100%;
                position: relative;
            `;
            
            const lightboxClose = lightbox.querySelector('.lightbox-close');
            lightboxClose.style.cssText = `
                position: absolute;
                top: -50px;
                right: 0;
                color: white;
                font-size: 3rem;
                cursor: pointer;
                transition: opacity 0.3s ease;
            `;
            lightboxClose.addEventListener('mouseenter', function() {
                this.style.opacity = '0.7';
            });
            lightboxClose.addEventListener('mouseleave', function() {
                this.style.opacity = '1';
            });
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                width: 100%;
                height: auto;
                border-radius: 15px;
            `;
            
            const lightboxInfo = lightbox.querySelector('.lightbox-info');
            lightboxInfo.style.cssText = `
                text-align: center;
                color: white;
                margin-top: 20px;
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            const closeLightbox = function() {
                lightbox.remove();
                document.body.style.overflow = '';
            };
            
            lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            document.addEventListener('keydown', function handler(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handler);
                }
            });
        });
    });
});