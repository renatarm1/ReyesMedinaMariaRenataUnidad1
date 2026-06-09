function renderErrorView() {
  const errorHTML = `
    <section class="error-container">
      <div class="error-box">
        <div class="error-header">
          <div class="error-dot red"></div>
          <div class="error-dot yellow"></div>
          <div class="error-dot green"></div>
          <span class="error-server-title">SYSTEM_CORE_TERMINAL // USER_LOG</span>
        </div>
        
        <div class="error-content">
          <h1 class="error-code">404</h1>
          <h2 class="error-title">// EXCEPTION: PAGE_NOT_FOUND</h2>
          
          <p class="error-message">
            The requested pointer reference addresses a null memory space or the architectural route has been unlinked from the main domain tree.
          </p>

          <div class="error-terminal-logs">
            <p class="log-line"><span class="log-timestamp">[11:31:08]</span> <span class="log-status error">[FAIL]</span> HTTP GET /api/WebSite/unknown_route</p>
            <p class="log-line"><span class="log-timestamp">[11:31:08]</span> <span class="log-status warning">[WARN]</span> StackTrace: Object reference not set to an instance of an object.</p>
            <p class="log-line"><span class="log-timestamp">[11:31:09]</span> <span class="log-status info">[INFO]</span> Solution: Redirecting entity back to the application roots...</p>
          </div>

          <a href="index.html" class="btn-error-return">
            &lt; RETURN_TO_SYSTEM_BASE_&gt;
          </a>
        </div>
      </div>
    </section>
  `;

  const mainContent = document.getElementById("mainContent") || document.body;
  mainContent.innerHTML = errorHTML;
}