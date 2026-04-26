document.addEventListener('DOMContentLoaded', () => {

    // 1. Accordion Logic (Off-the-beaten-path)
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close others
            accordions.forEach(other => {
                if(other !== acc) other.classList.remove('active');
            });
            // Toggle current
            acc.classList.toggle('active');
        });
    });

    // 2. Trip Cost Calculator Logic
    const calcDays = document.getElementById('calc-days');
    const calcPeople = document.getElementById('calc-people');
    const calcStyle = document.getElementById('calc-style');
    
    const resHotel = document.getElementById('res-hotel');
    const resFood = document.getElementById('res-food');
    const resTrans = document.getElementById('res-trans');
    const resTotal = document.getElementById('res-total');

    // Base costs per person per day (Dummy Data)
    const costs = {
        budget: { hotel: 15, food: 15, trans: 10 },
        mid: { hotel: 50, food: 35, trans: 25 },
        luxury: { hotel: 150, food: 80, trans: 60 }
    };

    const calculateCost = () => {
        if(!calcDays || !calcPeople || !calcStyle) return;

        const days = parseInt(calcDays.value) || 0;
        const people = parseInt(calcPeople.value) || 0;
        const style = calcStyle.value;

        const rate = costs[style];
        
        // Math
        const totalHotel = rate.hotel * days * Math.ceil(people / 2); // Assuming 2 pax per room
        const totalFood = rate.food * days * people;
        const totalTrans = rate.trans * days * people;
        const grandTotal = totalHotel + totalFood + totalTrans;

        // Animate numbers (simple UI update)
        resHotel.innerText = `$${totalHotel.toLocaleString()}`;
        resFood.innerText = `$${totalFood.toLocaleString()}`;
        resTrans.innerText = `$${totalTrans.toLocaleString()}`;
        resTotal.innerText = `$${grandTotal.toLocaleString()}`;
    };

    // Event listeners for calculator
    if(calcDays) {
        calcDays.addEventListener('input', calculateCost);
        calcPeople.addEventListener('input', calculateCost);
        calcStyle.addEventListener('change', calculateCost);
        calculateCost(); // Initialize
    }

    // 3. Scroll Reveal Animation
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

    // 4. Counter Stats Animation
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // Lower is faster
            
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
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

    // 5. Smooth Scroll for Buttons
    const smoothBtns = document.querySelectorAll('.smooth-scroll');
    smoothBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});