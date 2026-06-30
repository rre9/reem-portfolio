/**
 * Dynamic section rendering — Studio layout
 */
(function () {
  'use strict';

  function gallerySrc(item) {
    return typeof item === 'string' ? item : item?.src || '';
  }

  function galleryItems(p) {
    if (p.gallery?.length) return p.gallery;
    if (p.cover) return [p.cover];
    return [];
  }

  function renderTechChips(tech, className) {
    return (tech || [])
      .map((label) => `<span class="${className}">${escapeHtml(label)}</span>`)
      .join('');
  }

  function renderCardGallery(p, lang) {
    const images = galleryItems(p);
    if (images.length <= 1) return '';

    const slides = images
      .map(
        (item, i) =>
          `<img src="${escapeHtml(gallerySrc(item))}" class="work-card-slide${i === 0 ? ' is-active' : ''}" alt="${escapeHtml(t(p.cardTitle, lang))}" loading="${i === 0 ? 'eager' : 'lazy'}" width="800" height="500">`
      )
      .join('');

    const dots = images
      .map(
        (_, i) =>
          `<button type="button" class="work-card-dot${i === 0 ? ' is-active' : ''}" data-slide="${i}" aria-label="${i + 1} / ${images.length}"></button>`
      )
      .join('');

    return `<div class="work-card-gallery" data-gallery="${p.id}">${slides}<div class="work-card-dots">${dots}</div></div>`;
  }

  function renderCardTags(p) {
    const labels = p.cardTags || (p.tech || []).slice(0, 2);
    const tones = ['cyan', 'purple'];
    return labels
      .map(
        (label, i) =>
          `<span class="showcase-tag showcase-tag--${tones[i % tones.length]}">${escapeHtml(label)}</span>`
      )
      .join('');
  }

  function renderShowcaseCard(p, lang, tr, index) {
    const identityClass = p.coverClass ? ` ${p.coverClass}` : '';
    const tags = renderCardTags(p);

    const primaryAction = p.url
      ? `<a href="${escapeHtml(p.url)}" class="showcase-cta" target="_blank" rel="noopener noreferrer">${escapeHtml(tr.visitSite)}</a>`
      : p.modal
        ? `<button type="button" class="showcase-cta project-detail-btn" data-modal="${escapeHtml(p.modal)}">${escapeHtml(tr.viewDetails)}</button>`
        : '';

    const secondaryAction =
      p.modal && (p.url || (p.gallery?.length || 0) > 0)
        ? `<button type="button" class="showcase-gallery-link project-detail-btn" data-modal="${escapeHtml(p.modal)}">${escapeHtml(tr.viewGallery)}</button>`
        : '';

    return `
      <article class="showcase-card" data-index="${index}" data-modal="${p.modal || ''}" tabindex="-1">
        <div class="showcase-card-visual showcase-card-identity${identityClass}" role="img" aria-label="${escapeHtml(t(p.cardTitle, lang))}">
          <div class="showcase-card-pattern" aria-hidden="true"></div>
          <i class="fas ${p.icon || 'fa-code'} showcase-card-icon" aria-hidden="true"></i>
          ${tags ? `<div class="showcase-card-tags">${tags}</div>` : ''}
        </div>
        <div class="showcase-card-body">
          <h3 class="showcase-card-title">${escapeHtml(t(p.cardTitle, lang))}</h3>
          <p class="showcase-card-desc">${escapeHtml(t(p.cardDesc, lang))}</p>
          <div class="showcase-card-actions">
            ${primaryAction}
            ${secondaryAction}
          </div>
        </div>
      </article>`;
  }

  function getShowcaseOffset(index, active, total) {
    let diff = index - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }

  function applyShowcasePositions(root, active) {
    const cards = [...root.querySelectorAll('.showcase-card')];
    const total = cards.length;
    const rtl = document.documentElement.getAttribute('dir') === 'rtl';

    cards.forEach((card, index) => {
      const offset = getShowcaseOffset(index, active, total);
      card.classList.remove(
        'showcase-card--active',
        'showcase-card--prev1',
        'showcase-card--next1',
        'showcase-card--prev2',
        'showcase-card--next2',
        'showcase-card--hidden'
      );

      let posClass = 'showcase-card--hidden';
      if (offset === 0) posClass = 'showcase-card--active';
      else if (offset === -1) posClass = 'showcase-card--prev1';
      else if (offset === 1) posClass = 'showcase-card--next1';
      else if (offset === -2) posClass = 'showcase-card--prev2';
      else if (offset === 2) posClass = 'showcase-card--next2';

      card.classList.add(posClass);
      card.dataset.offset = String(offset);
      card.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
      card.tabIndex = offset === 0 ? 0 : -1;

      const dir = rtl ? -1 : 1;
      card.style.setProperty('--showcase-x', String(offset * dir));
    });

    root.dataset.active = String(active);
  }

  function initFeaturedCarousel(startIndex) {
    const root = document.getElementById('projects-bento');
    if (!root?.classList.contains('projects-showcase')) return;

    const cards = [...root.querySelectorAll('.showcase-card')];
    if (!cards.length) return;

    let active = Math.max(0, Math.min(startIndex ?? parseInt(root.dataset.active || '0', 10), cards.length - 1));
    const prevBtn = root.querySelector('.showcase-nav--prev');
    const nextBtn = root.querySelector('.showcase-nav--next');

    const go = (index) => {
      active = (index + cards.length) % cards.length;
      applyShowcasePositions(root, active);
    };

    applyShowcasePositions(root, active);

    if (root.dataset.carouselBound !== 'true') {
      prevBtn?.addEventListener('click', () => go(active - 1));
      nextBtn?.addEventListener('click', () => go(active + 1));

      cards.forEach((card, index) => {
        card.addEventListener('click', () => {
          const offset = parseInt(card.dataset.offset || '0', 10);
          if (offset !== 0) go(index);
        });
      });

      root.querySelectorAll('.showcase-cta, .showcase-gallery-link').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (btn.classList.contains('project-detail-btn')) {
            const modalId = btn.dataset.modal;
            if (modalId && window.openModal) window.openModal(modalId);
          }
        });
      });

      root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(active + (document.documentElement.dir === 'rtl' ? 1 : -1));
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(active + (document.documentElement.dir === 'rtl' ? -1 : 1));
        }
      });

      root.dataset.carouselBound = 'true';
    }
  }

  function renderProjectCard(p, lang, tr, compact) {
    const tags = (p.showcaseTags || [])
      .map((tag) => `<span class="work-tag work-tag--${tag.tone}">${escapeHtml(tag.label)}</span>`)
      .join('');

    const hasGallery = (p.gallery?.length || 0) > 1;
    const bgStyle = p.cover && !hasGallery ? `style="--cover-url: url('${escapeHtml(p.cover)}')"` : '';
    const coverMod = p.cover && !hasGallery ? ' has-cover' : '';
    const galleryMod = hasGallery ? ' work-card-visual--gallery' : '';
    const slotClass = p.bentoSlot ? `work-card--slot-${p.bentoSlot}` : '';
    const compactClass = compact ? 'work-card--compact' : '';
    const linkedClass = p.url ? ' work-card--linked' : '';
    const modalAttr = p.modal && !p.url ? ` data-modal="${p.modal}" tabindex="0" role="button"` : '';
    const modalLabel = (p.gallery?.length || 0) > 1 ? tr.viewGallery : tr.viewDetails;
    const modalActionBtn = p.modal
      ? `<button type="button" class="work-card-link project-detail-btn" data-modal="${p.modal}">${escapeHtml(modalLabel)}</button>`
      : '';
    const siteLink = p.url
      ? `<a href="${escapeHtml(p.url)}" class="work-card-site-link" target="_blank" rel="noopener noreferrer">${escapeHtml(tr.visitSite)} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
      : '';

    const icon = p.icon && !p.cover && !hasGallery
      ? `<i class="fas ${p.icon} work-card-icon" aria-hidden="true"></i>`
      : '';

    const galleryHtml = renderCardGallery(p, lang);
    const visualInner = `
          ${galleryHtml}
          <div class="work-card-shine" aria-hidden="true"></div>
          ${icon}`;

    let visualBlock;
    if (hasGallery) {
      visualBlock = `<div class="work-card-visual ${p.coverClass || ''}${coverMod}${galleryMod}">${visualInner}
        ${p.url ? `<a href="${escapeHtml(p.url)}" class="work-card-ext-badge" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(tr.visitSite)}"><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : ''}
      </div>`;
    } else if (p.url) {
      visualBlock = `<a href="${escapeHtml(p.url)}" class="work-card-visual-link" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(t(p.cardTitle, lang))} — ${escapeHtml(tr.visitSite)}">
        <div class="work-card-visual ${p.coverClass || ''}${coverMod}" ${bgStyle}>${visualInner}</div>
      </a>`;
    } else {
      visualBlock = `<div class="work-card-visual ${p.coverClass || ''}${coverMod}" ${bgStyle} role="img" aria-label="${escapeHtml(t(p.cardTitle, lang))}">${visualInner}</div>`;
    }

    return `
      <article class="work-card${linkedClass} ${slotClass} ${compactClass} reveal" data-category="${p.category}"${modalAttr}>
        ${visualBlock}
        <div class="work-card-body">
          ${tags ? `<div class="work-card-tags">${tags}</div>` : ''}
          <h3 class="work-card-title">${p.url ? `<a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t(p.cardTitle, lang))}</a>` : escapeHtml(t(p.cardTitle, lang))}</h3>
          <p class="work-card-desc">${escapeHtml(t(p.cardDesc, lang))}</p>
          <div class="work-card-actions">
            ${siteLink}
            ${modalActionBtn}
          </div>
        </div>
      </article>`;
  }

  function renderProjects(lang) {
    const tr = window.PortfolioData.translations[lang];
    const sec = window.PortfolioData.projectsSection;
    const projects = window.PortfolioData.projects;

    const label = document.getElementById('projects-label');
    const heading = document.getElementById('projects-heading');

    if (label) label.textContent = t(sec.label, lang);
    if (heading) heading.textContent = t(sec.heading, lang);

    const showcaseProjects = projects;
    const bentoEl = document.getElementById('projects-bento');
    const prevActive = parseInt(bentoEl?.dataset.active || '0', 10);

    if (bentoEl) {
      const cards = showcaseProjects.map((p, i) => renderShowcaseCard(p, lang, tr, i)).join('');
      bentoEl.className = 'projects-showcase';
      bentoEl.innerHTML = `
        <button type="button" class="showcase-nav showcase-nav--prev" aria-label="${escapeHtml(tr.prevProject)}">
          <i class="fas fa-chevron-left" aria-hidden="true"></i>
        </button>
        <div class="showcase-stage">
          <div class="showcase-track" role="list">${cards}</div>
        </div>
        <button type="button" class="showcase-nav showcase-nav--next" aria-label="${escapeHtml(tr.nextProject)}">
          <i class="fas fa-chevron-right" aria-hidden="true"></i>
        </button>`;
      bentoEl.dataset.carouselBound = 'false';
      initFeaturedCarousel(Math.min(prevActive, showcaseProjects.length - 1));
    }
  }

  function renderProjectModals(lang) {
    const root = document.getElementById('project-modals');
    if (!root) return;

    const tr = window.PortfolioData.translations[lang];

    root.innerHTML = window.PortfolioData.projects
      .filter((p) => p.modal)
      .map((p) => {
        const titleId = `modal-${p.id}-title`;
        const images = galleryItems(p).map((item) =>
          typeof item === 'string' ? { src: item } : item
        );
        const features = t(p.features, lang);
        const featureList = Array.isArray(features) ? features : [];

        const galleryHtml = images.length
          ? `<div class="modal-gallery modal-gallery--featured">${images
              .map((img) => {
                const caption = img.caption ? t(img.caption, lang) : '';
                return `
            <figure>
              <img src="${escapeHtml(img.src)}" alt="${escapeHtml(t(p.cardTitle, lang))}" loading="lazy" width="800" height="500">
              ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}
            </figure>`;
              })
              .join('')}
          </div>`
          : '';

        const techHtml = (p.tech || []).length
          ? `<div class="modal-tech-tags">
            <span class="modal-tech-label">${escapeHtml(tr.technologies)}</span>
            ${renderTechChips(p.tech, 'modal-tech-chip')}
          </div>`
          : '';

        const featuresHtml = featureList.length
          ? `<ul class="modal-features">${featureList.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}</ul>`
          : '';

        const visitBtn = p.url
          ? `<a href="${escapeHtml(p.url)}" class="btn btn-primary modal-site-btn" target="_blank" rel="noopener noreferrer">${escapeHtml(tr.visitSite)} <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>`
          : '';

        const typeLine = p.type
          ? `<p class="modal-type">${escapeHtml(t(p.type, lang))}</p>`
          : '';

        return `
      <div id="${escapeHtml(p.modal)}" class="modal" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="${titleId}">
        <div class="modal-dialog modal-dialog--wide">
          <button type="button" class="modal-close" data-modal="${escapeHtml(p.modal)}" aria-label="${escapeHtml(tr.close)}">&times;</button>
          <h3 id="${titleId}">${escapeHtml(t(p.name, lang) || t(p.cardTitle, lang))}</h3>
          <div class="modal-body">
            ${typeLine}
            <p>${escapeHtml(t(p.description, lang))}</p>
            ${galleryHtml}
            ${featuresHtml}
            ${techHtml}
            ${visitBtn}
          </div>
        </div>
      </div>`;
      })
      .join('');
  }

  function t(obj, lang) {
    if (!obj) return '';
    return typeof obj === 'object' && obj[lang] !== undefined ? obj[lang] : obj;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderHeroStats(lang) {
    const container = document.getElementById('hero-stats');
    if (!container) return;
    const stats = window.PortfolioData.site.hero.stats;
    container.innerHTML = stats
      .map(
        (s) => `
      <div class="terminal-line">
        <span class="t-prompt">›</span>
        <i class="fas ${s.icon}" aria-hidden="true"></i>
        <span>${escapeHtml(t(s.label, lang))}</span>
      </div>`
      )
      .join('');
  }

  function renderAboutFeatures(lang) {
    const container = document.getElementById('about-highlights');
    if (!container) return;
    const features = window.PortfolioData.site.about.features;

    container.innerHTML = features
      .map(
        (f, i) => `
      <div class="about-feature about-feature--${f.accent} reveal" data-delay="${i * 60}">
        <div class="about-feature-icon"><i class="fas ${f.icon}" aria-hidden="true"></i></div>
        <h3 class="about-feature-title">${escapeHtml(t(f.title, lang))}</h3>
        <p class="about-feature-desc">${escapeHtml(t(f.description, lang))}</p>
      </div>`
      )
      .join('');
  }

  function renderExperience(lang) {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    const tr = window.PortfolioData.translations[lang];

    timeline.innerHTML = window.PortfolioData.experiences
      .map((exp, index) => {
        const bullets = t(exp.bullets, lang)
          .map((b) => `<li>${escapeHtml(b)}</li>`)
          .join('');
        const tags = (exp.tags || [])
          .map((tag) => `<span class="exp-tag">${escapeHtml(tag)}</span>`)
          .join('');
        const currentBadge = exp.current
          ? `<span class="exp-badge">${escapeHtml(tr.present)}</span>`
          : '';
        const gridClass = t(exp.bullets, lang).length > 4 ? ' exp-bullets--grid' : '';

        return `
        <article class="exp-card reveal" data-delay="${index * 70}">
          <div class="exp-node" aria-hidden="true">
            <span class="exp-node-dot${exp.current ? ' is-active' : ''}"></span>
          </div>
          <div class="exp-card-inner">
            <header class="exp-card-head">
              <div class="exp-card-icon"><i class="fas ${exp.icon || 'fa-briefcase'}" aria-hidden="true"></i></div>
              <div class="exp-card-meta">
                <div class="exp-card-meta-row">
                  <time class="exp-date" datetime="">${escapeHtml(t(exp.date, lang))}</time>
                  ${currentBadge}
                </div>
                <span class="exp-loc"><i class="fas fa-location-dot" aria-hidden="true"></i> ${escapeHtml(t(exp.location, lang))}</span>
              </div>
            </header>
            <div class="exp-card-body">
              <h3 class="exp-title">${escapeHtml(t(exp.title, lang))}</h3>
              <p class="exp-company">${escapeHtml(t(exp.company, lang))}</p>
              ${tags ? `<div class="exp-tags">${tags}</div>` : ''}
              <ul class="exp-bullets${gridClass}">${bullets}</ul>
            </div>
          </div>
        </article>`;
      })
      .join('');

    renderFreelanceBadge(lang);
  }

  function renderFreelanceBadge(lang) {
    const container = document.getElementById('freelance-badge');
    if (!container) return;
    const cert = window.PortfolioData.site.freelanceCert;
    const tr = window.PortfolioData.translations[lang];
    container.innerHTML = `
      <aside class="exp-cert-card reveal">
        <div class="exp-cert-icon"><i class="fas fa-id-badge" aria-hidden="true"></i></div>
        <div class="exp-cert-content">
          <span class="exp-cert-label">${escapeHtml(tr.freelanceBadge)}</span>
          <strong class="exp-cert-title">${escapeHtml(t(cert.title, lang))}</strong>
          <span class="exp-cert-meta">${escapeHtml(t(cert.org, lang))} · ${escapeHtml(t(cert.date, lang))}</span>
        </div>
      </aside>`;
  }

  function renderServices(lang) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;

    grid.innerHTML = window.PortfolioData.services
      .map(
        (s, index) => `
      <div class="service-tile reveal" data-delay="${index * 50}">
        <div class="service-tile-icon"><i class="fas ${s.icon}" aria-hidden="true"></i></div>
        <h3>${escapeHtml(t(s.title, lang))}</h3>
        <p>${escapeHtml(t(s.description, lang))}</p>
      </div>`
      )
      .join('');
  }

  function renderSkillGroup(g, lang, index, full) {
    return `
        <div class="skill-group${full ? ' skill-group--full' : ''} reveal" data-delay="${index * 35}">
          <h3 class="skill-group-label"><i class="fas ${g.icon}" aria-hidden="true"></i> ${escapeHtml(t(g.title, lang))}</h3>
          <div class="skill-group-tags">
            ${g.items.map((item) => `<span class="skill-chip">${escapeHtml(item)}</span>`).join('')}
          </div>
        </div>`;
  }

  function renderSkills(lang) {
    const container = document.getElementById('skills-container');
    if (!container) return;

    const skills = window.PortfolioData.skills;
    const techGroups = skills.filter((g) => g.id !== 'soft');
    const softGroup = skills.find((g) => g.id === 'soft');
    const row1 = techGroups.slice(0, 3);
    const row2 = techGroups.slice(3, 6);

    const renderRow = (groups, baseIndex) => `
      <div class="skills-row" role="list">
        ${groups.map((g, i) => renderSkillGroup(g, lang, baseIndex + i, false)).join('')}
      </div>`;

    container.innerHTML = `
      <div class="skills-panel reveal">
        ${renderRow(row1, 0)}
        ${renderRow(row2, 3)}
        ${softGroup ? renderSkillGroup(softGroup, lang, 6, true) : ''}
      </div>`;
  }

  function renderCertifications(lang) {
    const grid = document.getElementById('certifications-grid');
    if (!grid) return;

    grid.innerHTML = window.PortfolioData.certifications
      .map(
        (c, index) => `
      <div class="cert-pill reveal" data-delay="${index * 30}" title="${escapeHtml(t(c.org, lang))}">
        <i class="fas ${c.icon}" aria-hidden="true"></i>
        <span>${escapeHtml(t(c.title, lang))}</span>
      </div>`
      )
      .join('');
  }

  function renderEducation(lang) {
    const container = document.getElementById('education-card');
    if (!container) return;
    const edu = window.PortfolioData.site.education;
    const tr = window.PortfolioData.translations[lang];
    container.innerHTML = `
      <div class="edu-strip reveal">
        <i class="fas fa-graduation-cap" aria-hidden="true"></i>
        <div>
          <span class="edu-label">${escapeHtml(tr.educationTitle)}</span>
          <strong>${escapeHtml(t(edu.degree, lang))}</strong>
          <span>${escapeHtml(t(edu.institution, lang))} · ${lang === 'ar' ? 'تخرج ' : ''}${escapeHtml(edu.graduated)}</span>
        </div>
      </div>`;
  }

  function renderContact(lang) {
    const c = window.PortfolioData.site.contact;
    const tr = window.PortfolioData.translations[lang];

    const cta = document.getElementById('contact-cta');
    if (cta) cta.textContent = t(c.cta, lang);

    const cards = document.getElementById('contact-cards');
    if (!cards) return;

    const row = (href, iconClass, iconMod, label, value, extraAttrs = '', valueDir = '') => {
      const valueDirAttr = valueDir ? ` dir="${valueDir}"` : '';
      const inner = `
        <span class="contact-row-icon contact-row-icon--${iconMod}" aria-hidden="true"><i class="${iconClass}"></i></span>
        <span class="contact-row-text">
          <span class="contact-row-label">${escapeHtml(label)}</span>
          <span class="contact-row-value"${valueDirAttr}>${escapeHtml(value)}</span>
        </span>`;
      if (href) {
        return `<a href="${href}" class="contact-row"${extraAttrs}>${inner}</a>`;
      }
      return `<div class="contact-row"${extraAttrs}>${inner}</div>`;
    };

    cards.innerHTML = `
      ${row(`mailto:${c.email}`, 'fas fa-envelope', 'email', tr.email, c.email, '', 'ltr')}
      ${row('', 'fas fa-location-dot', 'location', tr.location, t(c.location, lang))}
      ${row(c.linkedin, 'fab fa-linkedin', 'social', 'LinkedIn', 'reem-nawaf', ' target="_blank" rel="noopener noreferrer"')}`;
  }

  function renderStaticContent(lang) {
    const site = window.PortfolioData.site;
    const tr = window.PortfolioData.translations[lang];

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    set('hero-name', t(site.owner.name, lang));
    set('hero-title', t(site.owner.title, lang));
    set('hero-desc', t(site.hero.description, lang));
    set('hero-tagline', t(site.owner.tagline, lang));
    const about = window.PortfolioData.site.about;
    set('about-label', t(about.label, lang));
    set('about-heading', t(about.heading, lang));
    set('about-desc', t(about.description, lang));
    set('about-quote', t(about.quote, lang));

    document.querySelectorAll('[data-translate]').forEach((el) => {
      const key = el.getAttribute('data-translate');
      if (tr[key]) el.textContent = tr[key];
    });

    const cvBtn = document.getElementById('download-cv');
    if (cvBtn) {
      cvBtn.href = site.cvPath;
      if (site.cvDownloadName) cvBtn.setAttribute('download', site.cvDownloadName);
    }

    const linkedinBtn = document.getElementById('hero-linkedin');
    if (linkedinBtn) linkedinBtn.href = site.contact.linkedin;

    document.title = site.seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', site.seo.description);
  }

  function renderAll(lang) {
    renderStaticContent(lang);
    renderHeroStats(lang);
    renderAboutFeatures(lang);
    renderExperience(lang);
    renderProjects(lang);
    renderProjectModals(lang);
    renderServices(lang);
    renderSkills(lang);
    renderCertifications(lang);
    renderEducation(lang);
    renderContact(lang);
    initWorkCardGalleries();
    initFeaturedCarousel();
    initRevealObserver();
    bindProjectModals();
  }

  function initWorkCardGalleries() {
    document.querySelectorAll('.work-card-gallery').forEach((gallery) => {
      if (gallery.dataset.bound === 'true') return;

      const slides = [...gallery.querySelectorAll('.work-card-slide')];
      const dots = [...gallery.querySelectorAll('.work-card-dot')];
      if (slides.length < 2) return;

      let current = 0;
      let timer = null;

      const show = (index) => {
        current = index;
        slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      };

      const next = () => show((current + 1) % slides.length);

      const start = () => {
        if (timer) clearInterval(timer);
        timer = setInterval(next, 4500);
      };

      const stop = () => {
        if (timer) clearInterval(timer);
        timer = null;
      };

      dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          show(parseInt(dot.dataset.slide, 10));
          start();
        });
      });

      gallery.addEventListener('mouseenter', stop);
      gallery.addEventListener('mouseleave', start);
      gallery.addEventListener('focusin', stop);
      gallery.addEventListener('focusout', start);

      start();
      gallery.dataset.bound = 'true';
    });
  }

  function initRevealObserver() {
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add('visible'), parseInt(entry.target.dataset.delay || '0', 10));
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06 }
      );
      obs.observe(el);
    });
  }

  function bindProjectModals() {
    const section = document.getElementById('projects');
    if (!section || section.dataset.modalBound === 'true') return;
    section.addEventListener('click', (e) => {
      const btn = e.target.closest('.project-detail-btn');
      if (btn?.dataset.modal && window.openModal) {
        e.preventDefault();
        window.openModal(btn.dataset.modal);
        return;
      }
      const card = e.target.closest('.work-card[data-modal]');
      const modalId = card?.dataset.modal;
      if (modalId && window.openModal) window.openModal(modalId);
    });
    section.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.work-card[data-modal]');
      if (card?.dataset.modal && window.openModal) {
        e.preventDefault();
        window.openModal(card.dataset.modal);
      }
    });
    section.dataset.modalBound = 'true';
  }

  window.PortfolioRender = { renderAll, t };
})();
