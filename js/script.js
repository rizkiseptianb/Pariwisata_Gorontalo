document.addEventListener('DOMContentLoaded', () => {

    // 3. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 4. Animated Statistics Counter
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let currentCount = 0;
            const updateCounter = () => {
                currentCount += increment;
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Trigger counters when stats section is in view
    const statsSection = document.getElementById('stats');
    window.addEventListener('scroll', () => {
        if (!hasCounted) {
            const sectionPos = statsSection.getBoundingClientRect().top;
            if (sectionPos < window.innerHeight - 50) {
                startCounters();
                hasCounted = true;
            }
        }
    });

    // 6. Event Countdown Timer (Festival Karawo)
    // Set target date to next month for demonstration
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 15).getTime();

    const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const distance = targetDate - currentTime;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = "<h4>Event Has Started!</h4>";
        }
    }, 1000);

    // 7. Search Form Interaction (Prevent Default)
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Here you would normally redirect or filter content
        alert('Mencari destinasi sesuai kriteria Anda...');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('submitSearch');
    const interestSelect = document.getElementById('interestSelect');
    const travelerSelect = document.getElementById('travelerSelect');

    searchBtn.addEventListener('click', () => {
        const interest = interestSelect.value;
        const traveler = travelerSelect.value;
        
        let recommendationText = "";
        let targetId = "";

        // Logika Rekomendasi Spesifik
        if (interest === 'beach') {
            if (traveler === 'family') {
                recommendationText = "Untuk liburan keluarga, kami sangat merekomendasikan Pulau Saronde dengan fasilitas resort yang lengkap dan aman!";
            } else {
                recommendationText = "Pulau Saronde adalah surga pasir putih yang tenang, cocok untuk Anda.";
            }
            targetId = "destinations"; // ID section galeri destinasi
        } 
        else if (interest === 'culture') {
            recommendationText = "Jelajahi warisan budaya Gorontalo di Benteng Otanaha yang bersejarah.";
            targetId = "culture";
        }
        else if (interest === 'adventure') {
            recommendationText = "Uji nyali Anda dengan berenang bersama Hiu Paus di Botubarani!";
            targetId = "destinations";
        }
        else if (interest === 'culinary') {
            recommendationText = "Waktunya mencicipi Binte Biluhuta dan Ilabulo di pusat kuliner kota.";
            targetId = "culinary";
        }

        // Eksekusi jika ada rekomendasi
        if (recommendationText) {
            alert(recommendationText);
            
            // Gulir otomatis ke section terkait
            const section = document.getElementById(targetId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});