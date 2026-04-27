document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservationForm');
    const applyPromoBtn = document.getElementById('applyPromo');
    const inputs = form.querySelectorAll('input, select');
    
    // Base Pricing Configuration
    const pricing = {
        services: { tour: 500, hotel: 300, transfer: 50, island: 200, culinary: 100 },
        accom: { budget: 20, standard: 50, premium: 120, luxury: 300 }
    };

    let isPromoApplied = false;

    // --- 1. Real-time Price Estimator ---
    const calculatePrice = () => {
        const service = document.getElementById('serviceType').value;
        const accom = document.getElementById('accommodation').value;
        const adults = parseInt(document.getElementById('adults').value) || 0;
        const children = parseInt(document.getElementById('children').value) || 0;
        
        // Calculate days from dates
        const dateIn = new Date(document.getElementById('checkIn').value);
        const dateOut = new Date(document.getElementById('checkOut').value);
        let days = 1;
        if (dateIn && dateOut && dateOut > dateIn) {
            days = Math.ceil((dateOut - dateIn) / (1000 * 60 * 60 * 24));
        }

        const baseVal = pricing.services[service] * (adults + (children * 0.5));
        const accomVal = pricing.accom[accom] * days;
        const taxVal = (baseVal + accomVal) * 0.1;
        
        let grandTotal = baseVal + accomVal + taxVal;
        let discountVal = 0;

        if (isPromoApplied) {
            discountVal = grandTotal * 0.1;
            grandTotal -= discountVal;
            document.getElementById('promoRow').classList.remove('hidden');
        }

        // Update UI
        document.getElementById('basePrice').innerText = `$${baseVal.toFixed(2)}`;
        document.getElementById('accomPrice').innerText = `$${accomVal.toFixed(2)}`;
        document.getElementById('taxPrice').innerText = `$${taxVal.toFixed(2)}`;
        document.getElementById('promoDiscount').innerText = `-$${discountVal.toFixed(2)}`;
        document.getElementById('totalPrice').innerText = `$${grandTotal.toFixed(2)}`;
    };

    // --- 2. Promo Code Logic ---
    applyPromoBtn.addEventListener('click', () => {
        const code = document.getElementById('promoCode').value;
        if (code === 'PAKTAUFIQGANTENG') {
            isPromoApplied = true;
            alert('Promo Code Applied! 10% Discount active.');
            calculatePrice();
        } else {
            alert('Invalid Promo Code');
            isPromoApplied = false;
            document.getElementById('promoRow').classList.add('hidden');
            calculatePrice();
        }
    });

    // --- 3. Form Submission ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const bookingId = 'WG-' + Math.floor(1000 + Math.random() * 9000);
        const bookingData = {
            id: bookingId,
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            service: document.getElementById('serviceType').options[document.getElementById('serviceType').selectedIndex].text,
            total: document.getElementById('totalPrice').innerText,
            date: document.getElementById('checkIn').value
        };

        // Save to LocalStorage
        localStorage.setItem('lastBooking', JSON.stringify(bookingData));

        // Show Success Popup
        const summaryHtml = `
            <strong>Booking ID:</strong> ${bookingData.id}<br>
            <strong>Name:</strong> ${bookingData.name}<br>
            <strong>Service:</strong> ${bookingData.service}<br>
            <strong>Date:</strong> ${bookingData.date}<br>
            <strong>Total Amount:</strong> ${bookingData.total}
        `;
        document.getElementById('bookingSummary').innerHTML = summaryHtml;
        document.getElementById('successPopup').classList.add('active');
    });

    // Close Popup
    document.getElementById('closePopup').addEventListener('click', () => {
        document.getElementById('successPopup').classList.remove('active');
        form.reset();
        calculatePrice();
    });

    // Listen to changes for auto-calculation
    inputs.forEach(input => {
        input.addEventListener('change', calculatePrice);
        input.addEventListener('keyup', calculatePrice);
    });

    // Scroll reveal animation
    const reveal = () => {
        const items = document.querySelectorAll('.reveal');
        items.forEach(item => {
            const top = item.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) item.classList.add('active');
        });
    };
    window.addEventListener('scroll', reveal);
    reveal(); // init

    calculatePrice(); // init pricing
});

// Ambil elemen tombol dan elemen tujuan
const startBookingBtn = document.querySelector('.btn-gold.smooth-scroll');
const targetSection = document.getElementById('booking-main');

// Tambahkan fungsi klik
if (startBookingBtn && targetSection) {
    startBookingBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Mencegah perilaku default link jika ada
        
        targetSection.scrollIntoView({ 
            behavior: 'smooth', // Efek scroll halus (tidak melompat)
            block: 'start'      // Berhenti di bagian atas elemen
        });
    });
}