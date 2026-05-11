/* main.js — lightweight, no dependencies */
(function () {
  'use strict';

  /* ============================================================
     NAV: add .scrolled class on scroll
     ============================================================ */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     MOBILE MENU TOGGLE
     ============================================================ */
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      })
    );
  }

  /* ============================================================
     REVEAL ON SCROLL — IntersectionObserver, no layout thrash
     ============================================================ */
  const revealItems = document.querySelectorAll('.reveal-up');
  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealItems.forEach(el => observer.observe(el));
  }

  /* ============================================================
     POST CARDS — add reveal-up dynamically
     ============================================================ */
  const autoReveal = document.querySelectorAll(
    '.post-card, .project-item, .writing-row, .cv-item, .skill-group'
  );
  const delayStep = 80;
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, _i) => {
        if (entry.isIntersecting) {
          // stagger siblings in same parent
          const siblings = [...entry.target.parentElement.children];
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = (idx * delayStep) + 'ms';
          entry.target.classList.add('is-visible');
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );
  autoReveal.forEach(el => {
    el.classList.add('reveal-up');
    revealObs.observe(el);
  });

  /* ============================================================
     FILTER TABS (writings page)
     ============================================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const writingRows = document.querySelectorAll('.writing-row');

  if (filterBtns.length && writingRows.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        writingRows.forEach(row => {
          const cat = row.dataset.category;
          const show = filter === 'all' || cat === filter;
          row.classList.toggle('hidden', !show);
        });
      });
    });
  }

  /* ============================================================
     READING PROGRESS BAR (post page)
     ============================================================ */
  const progressBar = document.getElementById('readingProgress');
  if (progressBar) {
    const article = document.querySelector('.post-content');
    const update = () => {
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = rect.height + rect.top;
      const progress = Math.min(100, Math.max(0,
        ((window.scrollY - (article.offsetTop - window.innerHeight)) /
          (article.offsetHeight)) * 100
      ));
      progressBar.style.width = progress + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ============================================================
     SMOOTH ANCHOR SCROLL
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ============================================================
     AUTO UPDATE LATEST WRITINGS ON HOMEPAGE
     ============================================================ */
  const writingsPreview = document.getElementById('writings-preview');
  if (writingsPreview) {
    fetch('writings.html?t=' + Date.now()) // Cache önleme
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const writingRows = doc.querySelectorAll('.writing-row:not(.hidden)');

        const postsGrid = writingsPreview.querySelector('.posts-grid');
        if (postsGrid) {
          // Mevcut içeriği temizle
          postsGrid.innerHTML = '';

          if (writingRows.length === 0) {
            // Hiç yazı yoksa mesaj göster
            postsGrid.innerHTML = `
              <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--ink-3);">
                <p>📝 No posts yet. They are on their way!</p>
              </div>
            `;
          } else {
            // En fazla 3 yazıyı göster
            const latestPosts = Array.from(writingRows).slice(0, 3);
            latestPosts.forEach(post => {
              const tag = post.querySelector('.post-tag')?.innerText || 'General';
              const date = post.querySelector('.post-date')?.innerText || '';
              const title = post.querySelector('.writing-title')?.innerText || '';
              const excerpt = post.querySelector('.writing-excerpt')?.innerText || '';
              const link = post.getAttribute('href') || 'post.html';

              const card = document.createElement('a');
              card.className = 'post-card';
              card.href = link;
              card.innerHTML = `
                <div class="post-meta">
                  <span class="post-tag">${tag}</span>
                  <span class="post-date">${date}</span>
                </div>
                <h3 class="post-title">${title}</h3>
                <p class="post-excerpt">${excerpt.substring(0, 120)}${excerpt.length > 120 ? '...' : ''}</p>
                <span class="post-read">Read more →</span>
              `;
              postsGrid.appendChild(card);
            });
          }
        }
      })
      .catch(error => {
        console.log('Auto update failed:', error);
        // Hata durumunda mevcut içeriği temizleme (isteğe bağlı)
      });
  }
})();
