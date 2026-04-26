document.addEventListener('DOMContentLoaded', () => {
    
    // Inisialisasi variabel untuk tombol filter dan kartu pengalaman
    const filterButtons = document.querySelectorAll('.filter-btn');
    const experienceCards = document.querySelectorAll('.experience-card');

    // Tambahkan event listener pada setiap tombol filter
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // 1. Hapus kelas 'active' dari semua tombol, lalu tambahkan ke tombol yang diklik
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Ambil nilai kategori dari tombol yang diklik
            const filterValue = button.getAttribute('data-filter');

            // 3. Tampilkan atau sembunyikan kartu berdasarkan kecocokan kategori
            experienceCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');
                
                // Reset animasi dengan menghapus dan menambahkan kembali
                card.style.animation = 'none';
                card.offsetHeight; // trigger reflow
                card.style.animation = null;

                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});