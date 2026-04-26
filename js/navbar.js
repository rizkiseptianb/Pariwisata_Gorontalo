document.addEventListener('DOMContentLoaded', function() {
    // 1. Inject Navbar HTML
    const navbarContainer = document.getElementById('navbar-container');
    
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
            initNavbarLogic(); // Jalankan logika setelah HTML di-inject
        });

    function initNavbarLogic() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const navbar = document.getElementById('navbar');
        const navOverlay = document.getElementById('navOverlay');
        const progressBar = document.getElementById('progressBar');
        const navLinks = document.querySelectorAll('.nav-link');

        // Toggle Mobile Menu
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });

        // Close menu when clicking outside or on a link
// Tutup menu jika klik overlay
navOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
});

// Saat klik link menu: pindah halaman dulu, lalu menu tertutup
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
    });
});

        // Highlight Active Page Automatically
        const currentPath = window.location.pathname.split("/").pop();
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === "" && href === "index.html")) {
                link.classList.add('active');
            }
        });

        // Scroll Effects
        window.addEventListener('scroll', () => {
            // Navbar Background Change
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Progress Bar Calculation
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }
});