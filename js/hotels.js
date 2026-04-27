document.addEventListener("DOMContentLoaded", function() {
    /* =====================================
       DATABASE HOTEL (12 TEMPAT LENGKAP)
    ===================================== */
    const hotels = [
    // HIGH BUDGET ($$$)
    { 
        name: "Saronde Ocean Resort", 
        type: "resort", area: "island", budget: "high", price: 250, stars: "⭐⭐⭐⭐⭐", 
        img: "../assets/image/acc1.png" 
    },
    { 
        name: "Pulo Cinta Eco Resort", 
        type: "resort", area: "island", budget: "high", price: 300, stars: "⭐⭐⭐⭐⭐", 
        img: "../assets/image/acc2.png" 
    },
    { 
        name: "Grand Gorontalo Luxury", 
        type: "hotel", area: "city", budget: "high", price: 180, stars: "⭐⭐⭐⭐⭐", 
        img: "../assets/image/acc3.png" 
    },
    { 
        name: "Limbongo Royal Villa", 
        type: "hotel", area: "nature", budget: "high", price: 150, stars: "⭐⭐⭐⭐⭐", 
        img: "../assets/image/acc4.png" 
    },

    // MID BUDGET ($$)
    { 
        name: "Otanaha Boutique Hotel", 
        type: "hotel", area: "city", budget: "mid", price: 85, stars: "⭐⭐⭐⭐", 
        img: "../assets/image/acc5.png" 
    },
    { 
        name: "Blue Bay Resort", 
        type: "resort", area: "island", budget: "mid", price: 95, stars: "⭐⭐⭐⭐", 
        img: "../assets/image/acc6.png" 
    },
    { 
        name: "Lombongo Nature Lodge", 
        type: "resort", area: "nature", budget: "mid", price: 60, stars: "⭐⭐⭐⭐", 
        img: "../assets/image/acc7.png" 
    },
    { 
        name: "City Garden Stay", 
        type: "homestay", area: "city", budget: "mid", price: 55, stars: "⭐⭐⭐⭐", 
        img: "../assets/image/acc8.png" 
    },

    // LOW BUDGET ($)
    { 
        name: "Karawo Heritage Stay", 
        type: "homestay", area: "city", budget: "low", price: 35, stars: "⭐⭐⭐", 
        img: "../assets/image/acc9.png" 
    },
    { 
        name: "Green Hill Village", 
        type: "homestay", area: "nature", budget: "low", price: 25, stars: "⭐⭐⭐", 
        img: "../assets/image/acc10.png" 
    },
    { 
        name: "Backpacker Island Hut", 
        type: "homestay", area: "island", budget: "low", price: 20, stars: "⭐⭐", 
        img: "../assets/image/acc11.png" 
    },
    { 
        name: "Eco Jungle Camp", 
        type: "resort", area: "nature", budget: "low", price: 30, stars: "⭐⭐⭐", 
        img: "../assets/image/lombongo.png" 
    }
];

    /* =====================================
       LOGIKA SMART FINDER
    ===================================== */
    const searchBtn = document.getElementById("btn-search-stay");
    const resultBox = document.getElementById("finder-results");

    if (searchBtn) {
        searchBtn.addEventListener("click", function() {
            const budgetVal = document.getElementById("sf-budget").value;
            const areaVal = document.getElementById("sf-area").value;
            const typeVal = document.getElementById("sf-type").value;

            // Memfilter hotel berdasarkan 3 kriteria sekaligus
            const filtered = hotels.filter(hotel => {
                const matchBudget = (budgetVal === "all" || hotel.budget === budgetVal);
                const matchArea = (areaVal === "all" || hotel.area === areaVal);
                const matchType = (typeVal === "all" || hotel.type === typeVal);
                return matchBudget && matchArea && matchType;
            });

            renderResults(filtered);
            
            // Scroll ke hasil agar pengguna tahu data muncul
            resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
    }

    function renderResults(data) {
        resultBox.innerHTML = "";
        resultBox.classList.remove("hidden");

        if (data.length === 0) {
            resultBox.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 50px; background: #fff; border-radius: 18px;">
                    <p style="color: #777; font-size: 1.1rem;">Maaf, tidak ada tempat yang sesuai dengan kombinasi kriteria tersebut.</p>
                </div>`;
            return;
        }

        data.forEach(item => {
            resultBox.innerHTML += `
            <div class="hotel-card reveal show" style="background: white; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
                <div style="height: 200px; overflow: hidden;">
                    <img src="${item.img}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="padding: 20px;">
                    <span style="color: #FFD700; font-size: 0.9rem;">${item.stars}</span>
                    <h3 style="color: #2D0B59; margin: 8px 0; font-size: 1.25rem;">${item.name}</h3>
                    <p style="color: #777; font-size: 0.9rem; text-transform: capitalize;">${item.area} • ${item.type}</p>
                    <hr style="margin: 15px 0; border: 0; border-top: 1px solid #eee;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span style="display: block; font-size: 0.8rem; color: #aaa;">Price from</span>
                            <span style="font-weight: 700; color: #2D0B59; font-size: 1.1rem;">$${item.price} <small style="font-weight: 400; font-size: 0.7rem;">/ night</small></span>
                        </div>
                        <button class="btn btn-gold" style="padding: 10px 20px; font-size: 0.85rem; border-radius: 12px;">Book Now</button>
                    </div>
                </div>
            </div>`;
        });
    }

    // Fungsi Scroll Reveal Sederhana
    window.addEventListener("scroll", function() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add("show");
            }
        });
    });
});
