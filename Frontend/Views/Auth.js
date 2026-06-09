// Variable de estado: true = Login, false = Registro
let isLoginMode = true; 

function renderAuthView() {
  const authHTML = `
    <section class="auth-container">
      <div class="auth-card">
        <h2 class="auth-title" id="authTitle">${isLoginMode ? 'USER LOGIN' : 'CREATE ACCOUNT'}</h2>
        <p class="auth-subtitle" id="authSubtitle">
          ${isLoginMode ? 'Welcome back to the alternative OOP network.' : 'Join the alternative OOP architecture network.'}
        </p>
        
        <form id="authForm" class="auth-form">
          <div class="form-group">
            <label for="email">EMAIL ADDRESS</label>
            <input type="email" id="email" required placeholder="user@domain.com">
          </div>
          
          <div class="form-group">
            <label for="password">PASSWORD</label>
            <input type="password" id="password" required placeholder="••••••••">
          </div>

          <div class="captcha-group" id="captchaGroup" style="display: ${isLoginMode ? 'none' : 'flex'}; margin-bottom: 15px;">
            <!-- Le asignamos un ID único al contenedor para que Google lo localice fácil -->
            <div id="html-recaptcha" class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAGG-v4_Ond0YpEw7FGI7b9g8aB1O" data-theme="dark"></div>
          </div>

          <button type="submit" class="btn-auth" id="btnAuthSubmit">
            ${isLoginMode ? 'ENTER SYSTEM' : 'SUBMIT REGISTRATION'}
          </button>
        </form>
        
        <p class="auth-toggle-text">
          <a href="#" id="authToggleLink">
            ${isLoginMode ? "¿Don't have an account? Sign Up" : 'Already have an account? Log In'}
          </a>
        </p>
        
        <div id="responseMessage" class="response-message"></div>
      </div>
    </section>
  `;

  const mainContent = document.getElementById("mainContent") || document.body;
  mainContent.innerHTML = authHTML;

  document.getElementById("authForm").addEventListener("submit", handleAuthSubmit);
  document.getElementById("authToggleLink").addEventListener("click", toggleAuthMode);

  // === NUEVO AJUSTE CRÍTICO ===
  // Si pasamos a modo registro, forzamos a Google a renderizar el widget en el contenedor recién creado
  // Busca este bloque al final de tu función renderAuthView() en Auth.js y cámbialo:
    if (!isLoginMode && window.grecaptcha) {
      try {
        grecaptcha.render('html-recaptcha', {
          'sitekey': '6LeIxAcTAAAAAJcZVRqySaGatnMpE5mdezo5s16H', // Llave de prueba universal
          'theme': 'dark'
        });
      } catch (error) {
        console.log("reCAPTCHA already instanced.");
      }
}
}

function toggleAuthMode(e) {
  e.preventDefault();
  isLoginMode = !isLoginMode; 
  renderAuthView(); 
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageElement = document.getElementById("responseMessage");
  
  const endpoint = isLoginMode 
    ? "http://localhost:5244/api/WebSite/login" 
    : "http://localhost:5244/api/WebSite/register";

  let captchaResponseToken = "";

  if (!isLoginMode) {
    captchaResponseToken = grecaptcha.getResponse();
    if (!captchaResponseToken) {
      messageElement.className = "response-message error";
      messageElement.innerText = "ERROR: Please verify that you are human via reCAPTCHA.";
      return;
    }
  }

  messageElement.className = "response-message info";
  messageElement.innerText = "Connecting with C# Backend...";

  const payload = {
    Email: email,
    Password: password,
    RecaptchaToken: captchaResponseToken 
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      messageElement.className = "response-message success";
      messageElement.innerText = `// SUCCESS: ${data.message || "Authorized access."}`;
    } else {
      messageElement.className = "response-message error";
      messageElement.innerText = `// BACKEND ERROR: ${data.error || "Authentication failed."}`;
    }
  } catch (error) {
    messageElement.className = "response-message error";
    messageElement.innerText = "// SERVER ERROR: Connection refused u 404 path mismatch.";
  }
}

// ESTA FUNCIÓN QUEDA COMPLETAMENTE GLOBAL Y DIRECTA PARA EL ONCLICK DEL HTML
function goToAuthView() {
  isLoginMode = true; 
  renderAuthView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}