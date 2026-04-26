document.addEventListener('DOMContentLoaded', () => {

    // 1. Visa Requirement Checker Logic
    const checkVisaBtn = document.getElementById('checkVisaBtn');
    
    if (checkVisaBtn) {
        checkVisaBtn.addEventListener('click', () => {
            const nationality = document.getElementById('nationality').value;
            const passport = document.getElementById('passport').value;
            const stay = document.getElementById('stay').value;
            
            const resultBox = document.getElementById('visa-result');
            const vTitle = document.getElementById('v-title');
            const vDesc = document.getElementById('v-desc');
            
            resultBox.classList.remove('hidden');
            resultBox.style.opacity = '0';
            
            // Dummy Logic
            setTimeout(() => {
                if (passport === 'diplomatic') {
                    vTitle.innerText = "Visa Free (Diplomatic)";
                    vTitle.style.color = "var(--leaf-green)";
                    vDesc.innerText = "Pemegang paspor diplomatik mendapatkan bebas visa untuk kunjungan dinas.";
                } else if (nationality === 'asean') {
                    vTitle.innerText = "Visa Free Entry";
                    vTitle.style.color = "var(--leaf-green)";
                    vDesc.innerText = `Anda bebas visa untuk kunjungan ${stay === 'short' ? 'hingga 30 hari' : 'maksimal 30 hari (harus keluar untuk perpanjang)'}.`;
                } else if (nationality === 'voa') {
                    vTitle.innerText = "Visa on Arrival (VoA)";
                    vTitle.style.color = "var(--ocean-blue)";
                    vDesc.innerText = "Anda dapat membeli VoA di Bandara kedatangan (sekitar $35) berlaku 30 hari.";
                } else {
                    vTitle.innerText = "eVisa / Embassy Application Required";
                    vTitle.style.color = "#d9534f";
                    vDesc.innerText = "Silakan ajukan eVisa secara online melalui portal Imigrasi RI sebelum keberangkatan.";
                }
                
                resultBox.style.opacity = '1';
            }, 300);
        });
    }

    // 2. Currency Converter Logic
    const amountInput = document.getElementById('amount');
    const currencyFrom = document.getElementById('currency-from');
    const resultIdr = document.getElementById('result-idr');
    
    // Dummy Exchange Rates (Simulation)
    const rates = {
        USD: 17308,
        EUR: 20223,
        SGD: 13470,
        MYR: 4351
    };

    const calculateCurrency = () => {
        if (!amountInput || !resultIdr) return;
        const amount = parseFloat(amountInput.value) || 0;
        const currency = currencyFrom.value;
        const rate = rates[currency];
        
        // Format to IDR Rupiah style
        const total = amount * rate;
        resultIdr.value = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(total);
    };

    if (amountInput && currencyFrom) {
        amountInput.addEventListener('input', calculateCurrency);
        currencyFrom.addEventListener('change', calculateCurrency);
        calculateCurrency(); // Init calculation
    }

    // 3. Travel Essentials FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            // Close others (optional)
            faqItems.forEach(other => {
                if(other !== item) other.classList.remove('active');
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });

    // 4. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 5. Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower
    let animated = false;

    const runCounters = () => {
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

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        window.addEventListener('scroll', () => {
            const sectionPos = statsSection.getBoundingClientRect().top;
            if (!animated && sectionPos < window.innerHeight) {
                runCounters();
                animated = true;
            }
        });
    }

    // 6. Smooth Scroll for CTA buttons
    const smoothScrollBtns = document.querySelectorAll('.smooth-scroll');
    smoothScrollBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 7. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});