// ========================================================
// 1. RENDERIZADO DEL COMPONENTE (HTML DEL CARRITO)
// ========================================================
function renderCart() {
  const cartHTML = `
    <div id="shopping-cart" class="cart-sidebar">
      <div class="cart-header">
        <h2>Tu Carrito</h2>
        <button id="close-cart-btn" class="close-cart-x">×</button>
      </div>
      
      <div id="cart-items-container" class="cart-items">
        <p style="color:#888; text-align:center;">Tu carrito está vacío.</p>
      </div>

      <div class="cart-footer">
        <div class="totals-labels">
          <div class="total-row">
            <span>Subtotal:</span>
            <span id="subtotal-val">$0.00</span>
          </div>
          <div class="total-row total-main">
            <span>Total a Pagar:</span>
            <span id="total-val">$0.00</span>
          </div>
        </div>
        <button class="checkout-btn">Proceder al Pago</button>
      </div>
    </div>
  `;
  
  // Insertamos el carrito al final del body
  document.body.insertAdjacentHTML('beforeend', cartHTML);
}

// Ejecutamos la creación del componente en el DOM inmediatamente
renderCart();


// ========================================================
// 2. LÓGICA DE CONTROL Y FUNCIONAMIENTO DEL CARRITO
// ========================================================

// Arreglo global para almacenar los productos agregados
let cart = [];

// Esperamos a que todo esté montado para registrar los eventos
document.addEventListener('DOMContentLoaded', () => {
  
  // Elementos del DOM del carrito
  const shoppingCart = document.getElementById('shopping-cart');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartCountLabel = document.getElementById('cart-count');
  const subtotalLabel = document.getElementById('subtotal-val');
  const totalLabel = document.getElementById('total-val');

  // Elemento de la Navbar (creado por navbar.js)
  const cartToggleBtn = document.getElementById('cart-toggle-btn');

  /* --- CONTROL DE APERTURA Y CIERRE --- */
  
  // Abrir / Cerrar alternando con el botón del Navbar
  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', () => {
      shoppingCart.classList.toggle('open');
    });
  }

  // Cerrar explícitamente con el botón X del carrito
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      shoppingCart.classList.remove('open');
    });
  }

  /* --- ESCUCHAR CLICS EN TUS CARDS DE LA TIENDA --- */
  
  // Usamos delegación de eventos en el documento para detectar los botones de "Agregar"
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart-btn')) {
      const button = event.target;
      
      // Capturamos los datos que tengan tus cards en sus atributos "data-"
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));

      if (name && !isNaN(price)) {
        addProductToCart(name, price);
      }
    }
  });

  // Función para meter el producto al arreglo
  function addProductToCart(name, price) {
    // ID único basado en milisegundos para poder borrar el elemento exacto después
    const product = { id: Date.now(), name, price };
    cart.push(product);
    
    // Actualizamos la interfaz del carrito
    updateCartUI();
  }

  // Función global para borrar un producto (se expone a window para que funcione el onclick)
  window.removeProductFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
  };

  // Función encargada de redibujar las cards internas y recalcular precios
  function updateCartUI() {
    // Limpiamos el contenedor
    cartItemsContainer.innerHTML = '';
    let accumulatedTotal = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p style="color:#888; text-align:center;">Tu carrito está vacío.</p>';
    } else {
      // Iteramos y creamos las micro-cards flotantes del carrito
      cart.forEach(product => {
        accumulatedTotal += product.price;

        const cardHTML = `
          <div class="product-card">
            <div class="product-info">
              <p class="product-name">${product.name}</p>
              <p class="product-price">$${product.price.toFixed(2)}</p>
            </div>
            <button class="remove-btn" onclick="removeProductFromCart(${product.id})">❌</button>
          </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', cardHTML);
      });
    }

    // Actualizamos los contadores de texto y el numerito de la Navbar
    if (cartCountLabel) cartCountLabel.textContent = cart.length;
    if (subtotalLabel) subtotalLabel.textContent = `$${accumulatedTotal.toFixed(2)}`;
    if (totalLabel) totalLabel.textContent = `$${accumulatedTotal.toFixed(2)}`;
  }
});