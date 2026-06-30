/**
 * Main application — navigation, i18n, theme, modals
 */
(function () {
  'use strict';

  let currentLang = 'ar';

  const langToggle = () => document.getElementById('lang-toggle');
  const langText = () => document.getElementById('lang-text');
  const themeToggle = () => document.getElementById('theme-toggle');
  const themeIcon = () => document.getElementById('theme-icon');
  const mobileToggle = () => document.getElementById('mobile-toggle');
  const navMenu = () => document.getElementById('nav-menu');
  const navbar = () => document.getElementById('navbar');

  function initializeLanguage() {
    const savedLang = localStorage.getItem('language');
    currentLang = savedLang || 'ar';
    if (!savedLang) localStorage.setItem('language', 'ar');
    applyLanguage();
  }

  function applyLanguage() {
    const html = document.documentElement;
    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');

    const text = langText();
    const tr = window.PortfolioData.translations[currentLang];

    if (text) text.textContent = tr.languageToggle;

    if (window.PortfolioRender) {
      window.PortfolioRender.renderAll(currentLang);
    }
  }

  function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('language', currentLang);
    applyLanguage();
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    const icon = themeIcon();
    const btn = themeToggle();
    if (!icon) return;
    const name = theme === 'dark' ? 'fa-sun' : 'fa-moon';
    icon.innerHTML = `<i class="fa-solid ${name}" aria-hidden="true"></i>`;
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = target.offsetTop - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
          closeMobileMenu();
        }
      });
    });

    window.addEventListener('scroll', debounce(updateActiveNavLink, 10), { passive: true });
  }

  function toggleMobileMenu() {
    navMenu()?.classList.toggle('active');
    mobileToggle()?.classList.toggle('active');
    const expanded = mobileToggle()?.classList.contains('active');
    mobileToggle()?.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  function closeMobileMenu() {
    navMenu()?.classList.remove('active');
    mobileToggle()?.classList.remove('active');
    mobileToggle()?.setAttribute('aria-expanded', 'false');
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    let current = 'home';

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.id;
      }
    });

    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    const nav = navbar();
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }
  }

  function initializeSplash() {
    const splash = document.getElementById('splash');
    if (!splash) return;

    const forceShow = new URLSearchParams(location.search).has('splash');
    let skip = false;
    try {
      skip = sessionStorage.getItem('skipSplash') === '1' && !forceShow;
    } catch (e) {
      /* ignore */
    }

    if (skip) {
      splash.remove();
      return;
    }

    document.body.classList.add('no-scroll');

    const hide = () => {
      splash.classList.add('hide');
      splash.setAttribute('aria-busy', 'false');
      splash.addEventListener(
        'transitionend',
        () => {
          document.body.classList.remove('no-scroll');
          splash.remove();
          try {
            sessionStorage.setItem('skipSplash', '1');
          } catch (e) {
            /* ignore */
          }
        },
        { once: true }
      );
    };

    setTimeout(hide, 2200);
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();

    modal.onclick = (e) => {
      if (e.target === modal) closeModal(modalId);
    };
  }

  function closeImageLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (!lightbox?.classList.contains('open')) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    const img = document.getElementById('image-lightbox-img');
    if (img) {
      img.src = '';
      img.alt = '';
    }
    const caption = document.getElementById('image-lightbox-caption');
    if (caption) caption.textContent = '';
  }

  function openImageLightbox(src, alt, caption) {
    const lightbox = document.getElementById('image-lightbox');
    const img = document.getElementById('image-lightbox-img');
    const captionEl = document.getElementById('image-lightbox-caption');
    const closeBtn = document.getElementById('image-lightbox-close');
    if (!lightbox || !img) return;

    img.src = src;
    img.alt = alt || '';
    if (captionEl) {
      captionEl.textContent = caption || '';
      captionEl.hidden = !caption;
    }

    const tr = window.PortfolioData?.translations?.[currentLang];
    if (closeBtn && tr?.close) closeBtn.setAttribute('aria-label', tr.close);

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    closeBtn?.focus();
  }

  function initializeImageLightbox() {
    const lightbox = document.getElementById('image-lightbox');
    if (!lightbox) return;

    document.addEventListener('click', (e) => {
      const zoomBtn = e.target.closest('.modal-gallery-zoom');
      if (zoomBtn) {
        e.preventDefault();
        const img = zoomBtn.querySelector('img');
        const figcaption = zoomBtn.closest('figure')?.querySelector('figcaption');
        openImageLightbox(
          zoomBtn.dataset.lightboxSrc || img?.src || '',
          img?.alt || '',
          figcaption?.textContent?.trim() || ''
        );
        return;
      }

      if (e.target.closest('#image-lightbox-close') || e.target === lightbox) {
        closeImageLightbox();
      }
    });
  }

  function closeModal(modalId) {
    closeImageLightbox();
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initializeModals() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.modal-close');
      if (btn?.dataset.modal) closeModal(btn.dataset.modal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const lightbox = document.getElementById('image-lightbox');
        if (lightbox?.classList.contains('open')) {
          closeImageLightbox();
          return;
        }
        document.querySelectorAll('.modal.open').forEach((m) => closeModal(m.id));
      }
    });
  }

  function initializeLazyImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      img.addEventListener('error', () => {
        img.alt = img.alt || 'Image unavailable';
        img.style.opacity = '0.4';
      });
    });
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    initializeNavigation();
    initializeSplash();
    initializeModals();
    initializeImageLightbox();
    initializeLazyImages();

    langToggle()?.addEventListener('click', toggleLanguage);
    themeToggle()?.addEventListener('click', toggleTheme);
    mobileToggle()?.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      const nav = navbar();
      if (nav && !nav.contains(e.target)) closeMobileMenu();
    });
  });

  window.openModal = openModal;
  window.closeModal = closeModal;
})();
