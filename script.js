document.addEventListener('DOMContentLoaded', () => {
    
    // 1. STICKY NAVBAR
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. COUNTER ANIMATION
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Intersection Observer for Statistics Section
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect(); // Only animate once
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // 3. TESTIMONIAL SLIDER
    const track = document.getElementById('testimonialTrack');
    const cards = document.querySelectorAll('.testimonial-card');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    let currentIndex = 0;
    const maxIndex = cards.length - 1;

    // Create dots
    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSlider();
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
        updateSlider();
    });

    // Auto-slide every 5 seconds
    setInterval(() => {
        currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
        updateSlider();
    }, 5000);

    // 4. BOOKING MODAL
    const modal = document.getElementById('bookingModal');
    const openBtn = document.getElementById('openPopupBtn');
    const heroOpenBtn = document.getElementById('heroBookBtn');
    const closeBtn = document.getElementById('closeModal');

    const openModal = () => modal.classList.add('active');
    const closeModal = () => modal.classList.remove('active');

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (heroOpenBtn) heroOpenBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle Mock Form Submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your request has been received. Our team will contact you shortly.');
            form.reset();
            closeModal(); // Close modal if it was the booking form
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Quick inline mobile menu logic
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            const isVisible = navLinks.style.display === 'flex';
            if(isVisible) {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'var(--white)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = 'var(--shadow-md)';
                
                // Color override for mobile links
                const links = navLinks.querySelectorAll('a');
                links.forEach(l => l.style.color = 'var(--primary-blue)');
            }
        });
    }
});
