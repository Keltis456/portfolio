document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        scrollIndicator?.classList.toggle('hidden', currentScroll > 80);

        lastScroll = currentScroll;
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });

    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.2
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });

    const educationCards = document.querySelectorAll('.education-card');
    const educationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2
    });

    educationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        educationObserver.observe(card);
    });

    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 2000 + (index * 100));
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    class Carousel {
        constructor(container) {
            this.container = container;
            this.currentIndex = 0;
            this.images = container.querySelectorAll('.carousel-image');
            this.indicators = container.querySelectorAll('.indicator');
            this.track = container.querySelector('.carousel-track');
            this.autoplay = null;
            
            const carouselId = container.closest('[data-carousel]')?.getAttribute('data-carousel');
            if (carouselId) {
                this.prevBtn = document.querySelector(`[data-carousel="${carouselId}"].carousel-btn-prev`);
                this.nextBtn = document.querySelector(`[data-carousel="${carouselId}"].carousel-btn-next`);
            } else {
                this.prevBtn = container.querySelector('.carousel-btn-prev');
                this.nextBtn = container.querySelector('.carousel-btn-next');
            }

            this.init();
        }

        init() {
            if (this.images.length === 0) return;

            this.prevBtn?.addEventListener('click', () => this.prev());
            this.nextBtn?.addEventListener('click', () => this.next());

            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goTo(index));
            });

            this.autoplay = setInterval(() => this.next(), 5000);

            this.container.addEventListener('mouseenter', () => {
                clearInterval(this.autoplay);
            });

            this.container.addEventListener('mouseleave', () => {
                this.autoplay = setInterval(() => this.next(), 5000);
            });
        }

        goTo(index) {
            if (this.images[this.currentIndex]) {
                this.images[this.currentIndex].classList.remove('active');
            }
            if (this.indicators[this.currentIndex]) {
                this.indicators[this.currentIndex].classList.remove('active');
            }

            this.currentIndex = index;

            if (this.images[this.currentIndex]) {
                this.images[this.currentIndex].classList.add('active');
            }
            if (this.indicators[this.currentIndex]) {
                this.indicators[this.currentIndex].classList.add('active');
            }
        }

        next() {
            const nextIndex = (this.currentIndex + 1) % this.images.length;
            this.goTo(nextIndex);
        }

        prev() {
            const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.goTo(prevIndex);
        }
    }

    const carouselContainers = document.querySelectorAll('.carousel-container');
    carouselContainers.forEach(container => {
        new Carousel(container);
    });
});
