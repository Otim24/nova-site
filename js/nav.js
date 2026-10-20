/* ============================================================
   NOVA GREEN FOUNDATION — Navigation Component
   Shared across all pages
   ============================================================ */

const NAV_HTML = `
<nav class="navbar transparent" id="navbar" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="../index.html" class="nav-logo" aria-label="Nova Green Foundation Home">
      <img src="../assets/images/logo.jpg" alt="Nova Green Foundation Logo">
    </a>

    <div class="nav-links" role="menubar">
      <a href="../index.html"           class="nav-link" role="menuitem" data-page="home">Home</a>
      <a href="about.html"              class="nav-link" role="menuitem" data-page="about">About Us</a>
      <a href="programmes.html"         class="nav-link" role="menuitem" data-page="programmes">Programmes</a>
      <a href="board.html"              class="nav-link" role="menuitem" data-page="board">Board & Leadership</a>
      <a href="sdgs.html"               class="nav-link" role="menuitem" data-page="sdgs">SDGs & Impact</a>
      <a href="partners.html"           class="nav-link" role="menuitem" data-page="partners">Partners</a>
      <a href="news.html"               class="nav-link" role="menuitem" data-page="news">News & Updates</a>
      <a href="contact.html"            class="nav-link" role="menuitem" data-page="contact">Contact</a>
    </div>

    <div class="nav-actions">
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle light or dark theme" title="Toggle theme">
        <span class="theme-icon sun-icon" aria-hidden="true">☀️</span>
        <span class="theme-icon moon-icon" aria-hidden="true">🌙</span>
      </button>
      <a href="contact.html" class="btn btn-accent nav-cta" id="nav-donate-btn">Get Involved</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Navigation Drawer -->
<div class="nav-mobile" id="nav-mobile" role="dialog" aria-label="Mobile navigation">
  <a href="../index.html"       class="nav-mobile-link" data-page="home">🏠 Home</a>
  <a href="about.html"          class="nav-mobile-link" data-page="about">🌿 About Us</a>
  <a href="programmes.html"     class="nav-mobile-link" data-page="programmes">🌱 Programmes</a>
  <a href="board.html"          class="nav-mobile-link" data-page="board">👥 Board & Leadership</a>
  <a href="sdgs.html"           class="nav-mobile-link" data-page="sdgs">🌍 SDGs & Impact</a>
  <a href="partners.html"       class="nav-mobile-link" data-page="partners">🤝 Partners</a>
  <a href="news.html"           class="nav-mobile-link" data-page="news">📰 News & Updates</a>
  <a href="contact.html"        class="nav-mobile-link" data-page="contact">✉️ Contact</a>
  <div class="nav-mobile-actions">
    <button class="mobile-theme-btn" id="mobile-theme-btn" aria-label="Toggle theme">
      <span class="theme-icon sun-icon">☀️ Light Mode</span>
      <span class="theme-icon moon-icon">🌙 Dark Mode</span>
    </button>
    <a href="contact.html" class="btn btn-accent" style="text-align:center;width:100%">Get Involved</a>
  </div>
</div>
`;

// For home page (different relative paths)
const NAV_HTML_HOME = `
<nav class="navbar transparent" id="navbar" role="navigation" aria-label="Main navigation">
  <div class="nav-inner">
    <a href="index.html" class="nav-logo" aria-label="Nova Green Foundation Home">
      <img src="assets/images/logo.jpg" alt="Nova Green Foundation Logo">
    </a>

    <div class="nav-links" role="menubar">
      <a href="index.html"                class="nav-link" role="menuitem" data-page="home">Home</a>
      <a href="pages/about.html"          class="nav-link" role="menuitem" data-page="about">About Us</a>
      <a href="pages/programmes.html"     class="nav-link" role="menuitem" data-page="programmes">Programmes</a>
      <a href="pages/board.html"          class="nav-link" role="menuitem" data-page="board">Board & Leadership</a>
      <a href="pages/sdgs.html"           class="nav-link" role="menuitem" data-page="sdgs">SDGs & Impact</a>
      <a href="pages/partners.html"       class="nav-link" role="menuitem" data-page="partners">Partners</a>
      <a href="pages/news.html"           class="nav-link" role="menuitem" data-page="news">News & Updates</a>
      <a href="pages/contact.html"        class="nav-link" role="menuitem" data-page="contact">Contact</a>
    </div>

    <div class="nav-actions">
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle light or dark theme" title="Toggle theme">
        <span class="theme-icon sun-icon" aria-hidden="true">☀️</span>
        <span class="theme-icon moon-icon" aria-hidden="true">🌙</span>
      </button>
      <a href="pages/contact.html" class="btn btn-accent nav-cta" id="nav-donate-btn">Get Involved</a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle mobile menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<div class="nav-mobile" id="nav-mobile" role="dialog" aria-label="Mobile navigation">
  <a href="index.html"              class="nav-mobile-link" data-page="home">🏠 Home</a>
  <a href="pages/about.html"        class="nav-mobile-link" data-page="about">🌿 About Us</a>
  <a href="pages/programmes.html"   class="nav-mobile-link" data-page="programmes">🌱 Programmes</a>
  <a href="pages/board.html"        class="nav-mobile-link" data-page="board">👥 Board & Leadership</a>
  <a href="pages/sdgs.html"         class="nav-mobile-link" data-page="sdgs">🌍 SDGs & Impact</a>
  <a href="pages/partners.html"     class="nav-mobile-link" data-page="partners">🤝 Partners</a>
  <a href="pages/news.html"         class="nav-mobile-link" data-page="news">📰 News & Updates</a>
  <a href="pages/contact.html"      class="nav-mobile-link" data-page="contact">✉️ Contact</a>
  <div class="nav-mobile-actions">
    <button class="mobile-theme-btn" id="mobile-theme-btn" aria-label="Toggle theme">
      <span class="theme-icon sun-icon">☀️ Light Mode</span>
      <span class="theme-icon moon-icon">🌙 Dark Mode</span>
    </button>
    <a href="pages/contact.html" class="btn btn-accent" style="text-align:center;width:100%">Get Involved</a>
  </div>
</div>
`;
