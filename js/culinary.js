document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);

    // 2. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counter when visible
    let counterStarted = false;
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-section');
        const pos = statsSection.getBoundingClientRect().top;
        if (pos < window.innerHeight && !counterStarted) {
            startCounters();
            counterStarted = true;
        }
    });

// 3. Restaurant Filter dengan Animasi Re-reveal
const filterBtns = document.querySelectorAll('.filter-btn');
const resCards = document.querySelectorAll('.res-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Ganti class active pada tombol
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        resCards.forEach(card => {
            // Hilangkan class active dulu agar bisa memicu animasi ulang
            card.classList.remove('active');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex'; // Gunakan flex sesuai struktur card premium
                    
                    // Trigger animasi muncul kembali
                    setTimeout(() => {
                        card.classList.add('active');
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300); // Waktu tunggu sesuai durasi transisi keluar
        });
    });
});

    // 4. Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});