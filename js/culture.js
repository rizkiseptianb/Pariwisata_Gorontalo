document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Reveal Animation
    const sections = document.querySelectorAll(".section-reveal");
    
    const revealOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (sectionTop < window.innerHeight - revealPoint) {
                section.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run once on load

    // 3. Back to Top Button
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 4. Parallax Effect for Hero
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * 0.5) + "px";
    });
});