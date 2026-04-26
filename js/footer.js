// js/footer.js
document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById('footer-container');

  if (footerContainer) {
    // 1. Template HTML Footer
    const footerHTML = `
    <footer class="premium-footer" id="main-footer">
      <div class="footer-motif"></div>
        <i class="fas fa-chevron-up"></i>
      </button>
      <div class="footer-container">
        <div class="footer-col fade-up delay-1">
          <h3 class="footer-logo">Explore<span>Gorontalo</span></h3>
          <p class="footer-desc">Menghadirkan pesona surga tropis Pulau Saronde dan kekayaan mahakarya budaya Karawo ke mata dunia.</p>
          <p class="footer-tagline">"Explore Beauty, Culture, and Paradise"</p>
          <div class="footer-newsletter">
            <form id="newsletter-form">
              <input type="email" placeholder="Email Anda..." required>
              <button type="submit" class="btn-subscribe">Subscribe</button>
            </form>
          </div>
        </div>
        <div class="footer-col fade-up delay-2">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#culture">Culture</a></li>
            <li><a href="#culinary">Culinary</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col fade-up delay-3">
          <h4 class="footer-heading">Contact Info</h4>
          <ul class="footer-contact">
            <li><i class="fas fa-map-marker-alt"></i><span>Jl. Pariwisata No. 8, Gorontalo, Indonesia</span></li>
            <li><i class="fas fa-envelope"></i><span>hello@saronde-explore.com</span></li>
            <li><i class="fas fa-phone-alt"></i><span>+62 811 2345 6789</span></li>
            <li><i class="fas fa-clock"></i><span>Senin - Sabtu: 08.00 - 17.00 WITA</span></li>
          </ul>
        </div>
        <div class="footer-col fade-up delay-4">
          <h4 class="footer-heading">Follow Us</h4>
          <p class="social-desc">Bagikan momen liburan Anda bersama kami.</p>
          <div class="footer-socials">
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-tiktok"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
            <a href="#"><i class="fab fa-x-twitter"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 Explore Tourism. All Rights Reserved. Designed with elegance and culture.</p>
      </div>
    </footer>`;

    // 2. Masukkan template ke dalam kontainer
    footerContainer.innerHTML = footerHTML;

    // 3. Jalankan Fungsi Interaktif (Back to Top & Fade Animation)
    initFooterInteractions();
  }
});

function initFooterInteractions() {
  // Animasi Fade-Up
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));



  // Newsletter Alert
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      alert("Terima kasih telah berlangganan!");
      form.reset();
    };
  }
}