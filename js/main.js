/* ============================================================
   NOVA GREEN FOUNDATION — Main JavaScript
   Shared across all pages
   ============================================================ */

// ── Navbar scroll behavior ──────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const heroSection = document.querySelector('.hero, .page-hero');
  const isHeroPage = !!heroSection;

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else if (isHeroPage) {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  // Active link highlighting
  const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  const links = document.querySelectorAll('.nav-link[data-page], .nav-mobile-link[data-page]');
  links.forEach(link => {
    const page = link.getAttribute('data-page');
    if (
      (currentPage === 'index' && page === 'home') ||
      (currentPage === page)
    ) {
      link.classList.add('active');
    }
  });
}

// ── Mobile menu toggle ──────────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  if (!toggle || !mobile) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    mobile.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !mobile.contains(e.target)) {
      toggle.classList.remove('open');
      mobile.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── Scroll reveal animations ────────────────────────────────
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger by index within parent
        const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal, .reveal-left, .reveal-right') || []);
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// ── Hero background parallax ────────────────────────────────
function initParallax() {
  const heroImage = document.querySelector('.hero-bg');
  if (!heroImage) return;

  // Trigger zoom animation
  heroImage.classList.add('loaded');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroImage.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
  }, { passive: true });
}

// ── Animated counters ───────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const decimals = el.getAttribute('data-decimals') || 0;
        let start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
          const current = eased * target;
          el.textContent = prefix + current.toFixed(decimals) + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = prefix + target.toFixed(decimals) + suffix;
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ── Progress bars ───────────────────────────────────────────
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = width + '%'; }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}

// ── Accordion ───────────────────────────────────────────────
function initAccordion() {
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const body = item.querySelector('.accordion-body');
    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : '0';
      const icon = header.querySelector('.accordion-icon');
      if (icon) icon.textContent = isOpen ? '−' : '+';
    });
  });
}

// ── Blog Filter ─────────────────────────────────────────────
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.blog-card[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = '';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });
}

// ── Contact Form & Involvement Tabs ──────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  const tabs = document.querySelectorAll('.tab-btn');
  const typeSelect = document.getElementById('contact-type');
  const wayBtns = document.querySelectorAll('[data-target-tab]');

  const tabToValueMap = {
    'tab-general': 'programme',
    'tab-volunteer': 'volunteer',
    'tab-partner': 'partner',
    'tab-media': 'media',
    'tab-donate': 'donate'
  };

  function activateTab(tabId, scrollDown = false) {
    tabs.forEach(t => t.classList.toggle('active', t.id === tabId));
    const val = tabToValueMap[tabId];
    if (typeSelect && val) {
      typeSelect.value = val;
    }
    if (scrollDown) {
      const targetEl = document.getElementById('contact-form-heading') || form;
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(tab.id, false);
    });
  });

  wayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.getAttribute('data-target-tab');
      activateTab(targetTab, true);
    });
  });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async submission
    setTimeout(() => {
      btn.textContent = '✅ Message Sent!';
      btn.style.background = '#2e7d52';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 1500);
  });
}

// ── Newsletter Form ──────────────────────────────────────────
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = '✅ Subscribed!';
    btn.style.background = '#2e7d52';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 3000);
  });
}

// ── SDG hover tooltips ───────────────────────────────────────
function initSDGBadges() {
  const badges = document.querySelectorAll('.sdg-badge[data-tooltip]');
  badges.forEach(badge => {
    badge.setAttribute('title', badge.getAttribute('data-tooltip'));
  });
}

// ── Smooth page transitions ──────────────────────────────────
function initPageTransitions() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto') ||
        href.startsWith('tel') || link.target === '_blank') return;

    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.2s ease';
    setTimeout(() => window.location = href, 200);
  });

  // Fade in on load
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.4s ease';
    document.body.style.opacity = '1';
  });
}

// ── Back to Top ──────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 400 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Theme Management (Light & Dark) ─────────────────────────
(function initThemeEngine() {
  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem('nova-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  function updateToggleButtons(theme) {
    const isDark = theme === 'dark';
    const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    document.querySelectorAll('.theme-toggle, .mobile-theme-btn').forEach(btn => {
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    });
  }

  function applyTheme(theme, save = false) {
    const validTheme = (theme === 'dark') ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', validTheme);
    if (save) {
      try {
        localStorage.setItem('nova-theme', validTheme);
      } catch (e) {}
    }
    updateToggleButtons(validTheme);
  }

  // Global toggle function
  window.toggleTheme = function() {
    const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    const next = (current === 'dark') ? 'light' : 'dark';
    applyTheme(next, true);
    return next;
  };

  // Immediate execution on parse so attribute is set
  const initialTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  applyTheme(initialTheme, false);

  // Attach click listener ONLY ONCE to document
  if (!window.__novaThemeListenerAttached) {
    window.__novaThemeListenerAttached = true;
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.theme-toggle, .mobile-theme-btn');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      window.toggleTheme();
    });
  }

  // Watch system preference changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      try {
        if (!localStorage.getItem('nova-theme')) {
          applyTheme(e.matches ? 'dark' : 'light', false);
        }
      } catch (err) {}
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
    updateToggleButtons(current);
  });
})();

// ── Interactive Scroll-driven Milestones Timeline ───────────
function initMilestoneTimeline() {
  const timeline = document.getElementById('milestones-timeline');
  if (!timeline) return;

  const items = Array.from(timeline.querySelectorAll('.timeline-item'));
  const progressLine = document.getElementById('timeline-progress-line');
  const stepIndicator = document.getElementById('milestone-step-indicator');
  const currentYear = document.getElementById('milestone-current-year');
  const currentTitle = document.getElementById('milestone-current-title');
  const trackerBar = document.getElementById('milestone-tracker-bar');
  const chips = document.querySelectorAll('.tracker-chip');

  if (!items.length || !progressLine) return;

  // Click chips to scroll smoothly to that milestone
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const idx = parseInt(chip.getAttribute('data-target'), 10);
      if (items[idx]) {
        const itemRect = items[idx].getBoundingClientRect();
        const absoluteTop = window.scrollY + itemRect.top - (window.innerHeight * 0.35);
        window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
      }
    });
  });

  let ticking = false;

  function updateTimeline() {
    ticking = false;
    const timelineRect = timeline.getBoundingClientRect();
    const dots = items.map(item => {
      const dot = item.querySelector('.timeline-dot');
      return dot ? dot.getBoundingClientRect() : null;
    });

    if (!dots[0] || !dots[dots.length - 1]) return;

    // Viewport trigger line: 52% down the viewport (user's direct eye gaze)
    const triggerY = window.innerHeight * 0.52;

    // Distance of dots relative to top of the timeline container
    const firstDotCenterRel = (dots[0].top + dots[0].height / 2) - timelineRect.top;
    const lastDotCenterRel = (dots[dots.length - 1].top + dots[dots.length - 1].height / 2) - timelineRect.top;
    const totalSpan = Math.max(1, lastDotCenterRel - firstDotCenterRel);

    // Trigger position relative to timeline container
    const currentTriggerRel = triggerY - timelineRect.top;

    let fillHeight = 0;
    if (currentTriggerRel >= firstDotCenterRel) {
      fillHeight = Math.min(currentTriggerRel - firstDotCenterRel, totalSpan);
    }

    progressLine.style.top = firstDotCenterRel + 'px';
    progressLine.style.height = fillHeight + 'px';
    progressLine.style.opacity = fillHeight > 4 ? '1' : '0';

    const currentLineTipY = firstDotCenterRel + fillHeight;

    let latestActiveIndex = 0;
    items.forEach((item, index) => {
      const dot = dots[index];
      if (!dot) return;
      const dotCenterRel = (dot.top + dot.height / 2) - timelineRect.top;

      // Milestone becomes active when the scroll line reaches its dot
      if (currentLineTipY >= dotCenterRel - 8) {
        item.classList.add('active');
        latestActiveIndex = index;
      } else {
        item.classList.remove('active');
      }
    });

    // Mark currently highlighted item (the leading active item)
    items.forEach((item, index) => {
      if (index === latestActiveIndex && fillHeight > 0) {
        item.classList.add('current');
      } else {
        item.classList.remove('current');
      }
    });

    // Update left tracker card
    const activeItem = items[latestActiveIndex];
    if (activeItem) {
      const yearText = activeItem.querySelector('.timeline-year')?.textContent.split('•')[0].trim() || '';
      const titleText = activeItem.querySelector('.timeline-title')?.textContent.trim() || '';

      if (stepIndicator) stepIndicator.textContent = `${latestActiveIndex + 1} of ${items.length}`;
      if (currentYear) currentYear.textContent = yearText;
      if (currentTitle) currentTitle.textContent = titleText;

      const pct = Math.round(((latestActiveIndex) / (items.length - 1)) * 100);
      if (trackerBar) trackerBar.style.width = Math.max(16, pct) + '%';

      chips.forEach((c, idx) => {
        c.classList.toggle('active', idx === latestActiveIndex);
      });
    }
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateTimeline);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  // Initial calculation after load
  setTimeout(updateTimeline, 100);
}

// ── Interactive Partners Catalog, Filters & Modal ───────────
function initPartnersPage() {
  const container = document.getElementById('partners-catalog');
  if (!container) return;

  const filterBtns = document.querySelectorAll('.partner-filter-btn');
  const cards = Array.from(document.querySelectorAll('.partner-card'));
  const searchInput = document.getElementById('partner-search-input');
  const clearSearchBtn = document.getElementById('partner-search-clear');
  const emptyState = document.getElementById('partner-empty-state');
  const countBadge = document.getElementById('partner-visible-count');

  let currentCategory = 'all';
  let currentSearch = '';

  function applyFilters() {
    let visibleCount = 0;
    const term = currentSearch.toLowerCase().trim();

    cards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const text = card.textContent.toLowerCase();

      const matchesCat = (currentCategory === 'all' || category === currentCategory);
      const matchesSearch = !term || text.includes(term);

      if (matchesCat && matchesSearch) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 20);
        visibleCount++;
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        setTimeout(() => { card.style.display = 'none'; }, 200);
      }
    });

    if (countBadge) countBadge.textContent = `${visibleCount} Organizations`;
    if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-partner-filter') || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      if (clearSearchBtn) clearSearchBtn.style.display = currentSearch ? 'flex' : 'none';
      applyFilters();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearch = '';
      clearSearchBtn.style.display = 'none';
      applyFilters();
    });
  }

  // Quick-View Dossier Modal
  const modal = document.getElementById('partner-dossier-modal');
  const modalClose = document.getElementById('partner-modal-close');
  const modalBackdrop = document.getElementById('partner-modal-backdrop');

  if (modal) {
    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // Attach click to cards with data-partner-details
    cards.forEach(card => {
      const detailsBtn = card.querySelector('.partner-dossier-trigger') || card;
      detailsBtn.addEventListener('click', (e) => {
        // Prevent opening if clicking an external link inside card
        if (e.target.closest('a') && !e.target.closest('.partner-dossier-trigger')) return;

        const name = card.getAttribute('data-name') || '';
        const tier = card.getAttribute('data-tier-label') || '';
        const categoryLabel = card.getAttribute('data-category-label') || '';
        const year = card.getAttribute('data-year') || '2020';
        const focus = card.getAttribute('data-focus') || '';
        const desc = card.getAttribute('data-desc') || '';
        const initiative = card.getAttribute('data-initiative') || '';
        const impact = card.getAttribute('data-impact') || '';
        const logoSvg = card.querySelector('.partner-emblem-svg')?.outerHTML || '';

        const mLogo = document.getElementById('modal-partner-logo');
        const mName = document.getElementById('modal-partner-name');
        const mTier = document.getElementById('modal-partner-tier');
        const mCategory = document.getElementById('modal-partner-category');
        const mYear = document.getElementById('modal-partner-year');
        const mFocus = document.getElementById('modal-partner-focus');
        const mDesc = document.getElementById('modal-partner-desc');
        const mInitiative = document.getElementById('modal-partner-initiative');
        const mImpact = document.getElementById('modal-partner-impact');

        if (mLogo) mLogo.innerHTML = logoSvg;
        if (mName) mName.textContent = name;
        if (mTier) mTier.textContent = tier;
        if (mCategory) mCategory.textContent = categoryLabel;
        if (mYear) mYear.textContent = year;
        if (mFocus) mFocus.textContent = focus;
        if (mDesc) mDesc.textContent = desc;
        if (mInitiative) mInitiative.textContent = initiative;
        if (mImpact) mImpact.textContent = impact;

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  // Partner Inquiry Modal
  const inquiryModal = document.getElementById('partner-inquiry-modal');
  const inquiryOpenBtns = document.querySelectorAll('.open-partner-inquiry-btn');
  const inquiryCloseBtn = document.getElementById('partner-inquiry-close');
  const inquiryBackdrop = document.getElementById('partner-inquiry-backdrop');
  const inquiryForm = document.getElementById('partner-inquiry-form');

  if (inquiryModal) {
    function closeInquiry() {
      inquiryModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    inquiryOpenBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const preselect = btn.getAttribute('data-preselect-tier');
        if (preselect && inquiryForm) {
          const selectEl = inquiryForm.querySelector('select[name="tier"]');
          if (selectEl) selectEl.value = preselect;
        }
        inquiryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    if (inquiryCloseBtn) inquiryCloseBtn.addEventListener('click', closeInquiry);
    if (inquiryBackdrop) inquiryBackdrop.addEventListener('click', closeInquiry);

    if (inquiryForm) {
      inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = inquiryForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting Application…';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.textContent = 'Application Received!';
          submitBtn.style.background = '#2e7d52';
          inquiryForm.reset();
          setTimeout(() => {
            closeInquiry();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
          }, 1800);
        }, 1200);
      });
    }
  }
}

// ── Footer Watermark Animation ──────────────────────────────
function initFooterWatermark() {
  const watermarkText = document.querySelector('.footer-watermark-text');
  if (!watermarkText) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        watermarkText.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(watermarkText);
}

// ── INIT ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initParallax();
  initCounters();
  initProgressBars();
  initAccordion();
  initBlogFilter();
  initContactForm();
  initNewsletterForm();
  initSDGBadges();
  initPageTransitions();
  initBackToTop();
  initMilestoneTimeline();
  initPartnersPage();
  initFooterWatermark();
});
