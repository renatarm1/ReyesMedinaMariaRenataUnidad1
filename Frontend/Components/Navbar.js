function renderNavbar() {
  const navbarHTML = `
    <nav class="navbar">
      <header class="site-header">
        
        <div class="header-left">
          <span class="nav-item">AYUDA</span>
          <span class="nav-item">CONTACTANOS</span>
        </div>
        
        <div class="site-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" width="45px" height="45px">
            <path d="M24 19.5L16.9 7.1l-2.8 1.6 5.3 9.3h4.6zm-7.6 0l-5.4-9.4-2.8 1.6 3.6 6.3 1.1 1.5h3.5zm-7.3 0L5.7 13.7l-2.8 1.6 2.4 4.2h3.8z"/>
          </svg>
        </div>
        
        <div class="header-right">
          <button id="cart-toggle-btn" class="gummy-jelly-btn">
            🛒 (<span id="cart-count">0</span>)
          </button>
        </div>

      </header>
    </nav>
  `;  
     // Buscamos el final del body y añadimos el Footer dinámicamente
  document.body.insertAdjacentHTML('beforeend', navbarHTML);
}
// Ejecutamos la función automáticamente al cargar este archivo script
renderNavbar();