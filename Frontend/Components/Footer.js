// Definimos la función que generará la estructura del Footer
function renderFooter() {
  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-container">
        
        <div class="footer-column brand-col">
          <div class="footer-logo">sneakers</div>
          <p class="footer-desc">Academic interface implementation structured under Model-Service-Controller architecture.</p>
        </div>

        <div class="footer-column">
          <h3>MAIN SECTIONS</h3>
          <ul>
            <li><a href="#">Shop Lookbook</a></li>
            <li><a href="#">Collections 2026</a></li>
            <li><a href="#">Release Calendar</a></li>
            <li><a href="#">Site Map View</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>ADDITIONAL ELEMENTS</h3>
          <ul>
            <li><a href="#">User Register</a></li>
            <li><a href="#">Account Login</a></li>
            <li><a href="#">Password Recovery</a></li>
            <li><a href="#">Secure Mailbox</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>INTERACTION & HELP</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Live Chat AI</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 SNEAKERS ARCHITECTURE PROJECT FOR UNIVERSITY EVALUATION.</p>
      </div>
    </footer>
  `;

  // Buscamos el final del body y añadimos el Footer dinámicamente
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Ejecutamos la función automáticamente al cargar este archivo script
renderFooter();