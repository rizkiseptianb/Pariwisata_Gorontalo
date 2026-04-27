document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Reveal Animation
    const reveals = document.querySelectorAll(".reveal-fade, .reveal-slide-up");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // Trigger point

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger on initial load

    // 2. Animated Counters
    const counters = document.querySelectorAll(".counter");
    let hasCounted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            
            // Speed of counting
            const speed = 200; 
            
            const updateCounter = () => {
                const c = +counter.innerText;
                const increment = target / speed;
                
                if (c < target) {
                    counter.innerText = Math.ceil(c + increment);
                    setTimeout(updateCounter, 10);
                } else {
                    // Add formatting (e.g., 15,420)
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCounter();
        });
    };

    // Intersection Observer to trigger counter only when section is visible
    const trackerSection = document.getElementById("tracker");
    if(trackerSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                runCounters();
                hasCounted = true;
            }
        }, { threshold: 0.5 });
        
        observer.observe(trackerSection);
    }

    // 3. Interactive Checklist (Save state to LocalStorage)
    const checkboxes = document.querySelectorAll(".check-item input[type='checkbox']");
    
    // Load saved states
    checkboxes.forEach(box => {
        const savedState = localStorage.getItem(box.id);
        if (savedState === "true") {
            box.checked = true;
        }
        
        // Listen for changes
        box.addEventListener("change", (e) => {
            localStorage.setItem(e.target.id, e.target.checked);
        });
    });

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Back to Top Button
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 6. Card Hover Tilt Effect (Optional JS Enhancement for Cards)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Simple subtle tilt
            const xOffset = (x - rect.width / 2) / 20;
            const yOffset = (y - rect.height / 2) / 20;
            
            card.style.transform = `translateY(-10px) rotateX(${-yOffset}deg) rotateY(${xOffset}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });
});