document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Mulai animasi 100px sebelum elemen masuk

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };
    
    // Trigger sekali saat load
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);


    // --- 2. BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- 3. INTERACTIVE MAP DATA & LOGIC ---
    // Data dummy untuk region, lengkapi dengan data asli Gorontalo
    const regionData = {
        kota: {
            name: "Kota Gorontalo",
            attraction: "Masjid Hunto Sultan Amay",
            activity: "Culinary Tour & Heritage Walk",
            distance: "0 km (Center)",
            img: "assets/images/kota.jpg"
        },
        kabgor: {
            name: "Kabupaten Gorontalo",
            attraction: "Danau Limboto & Menara Keagungan",
            activity: "Photography & Sunset Viewing",
            distance: "15 km",
            img: "assets/images/kabgor.jpg"
        },
        gorut: {
            name: "Gorontalo Utara",
            attraction: "Pulau Saronde",
            activity: "Island Hopping & Snorkeling",
            distance: "65 km",
            img: "assets/images/saronde.jpg"
        },
        bonebol: {
            name: "Bone Bolango",
            attraction: "Whale Shark Point Botubarani",
            activity: "Swimming with Whale Sharks",
            distance: "12 km",
            img: "assets/images/dest-whaleshark.jpg"
        },
        pohuwato: {
            name: "Pohuwato",
            attraction: "Pohon Cinta Beach",
            activity: "Mangrove Exploring",
            distance: "150 km",
            img: "assets/images/pohuwato.jpg"
        },
        boalemo: {
            name: "Boalemo",
            attraction: "Pantai Bolihutuo",
            activity: "Relaxing on Pine-Fringed Beach",
            distance: "105 km",
            img: "assets/images/boalemo.jpg"
        }
    };

    const mapRegions = document.querySelectorAll('.map-region');
    const tooltip = document.getElementById('map-tooltip');
    
    // Element Popup
    const popupOverlay = document.getElementById('region-popup');
    const closePopupBtn = document.getElementById('close-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupImg = document.getElementById('popup-img');
    const popupAttraction = document.getElementById('popup-attraction');
    const popupActivity = document.getElementById('popup-activity');
    const popupDistance = document.getElementById('popup-distance');

    // Hover Effect untuk Tooltip
    mapRegions.forEach(region => {
        region.addEventListener('mousemove', (e) => {
            const regionName = region.getAttribute('data-name');
            tooltip.textContent = regionName;
            tooltip.style.opacity = '1';
            
            // Posisikan tooltip mengikuti cursor
            const mapContainerRect = document.querySelector('.map-container').getBoundingClientRect();
            tooltip.style.left = (e.clientX - mapContainerRect.left + 15) + 'px';
            tooltip.style.top = (e.clientY - mapContainerRect.top + 15) + 'px';
        });

        region.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        // Click Effect untuk Popup
        region.addEventListener('click', () => {
            const regionId = region.getAttribute('data-id');
            const data = regionData[regionId];

            if (data) {
                popupTitle.textContent = data.name;
                popupImg.src = data.img;
                popupAttraction.textContent = data.attraction;
                popupActivity.textContent = data.activity;
                popupDistance.textContent = data.distance;
                
                popupOverlay.classList.add('active');
            }
        });
    });

    // Menutup Popup panel
    closePopupBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('active');
    });

    // Klik overlay luar untuk menutup popup
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    });
});