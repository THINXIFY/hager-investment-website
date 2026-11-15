/* HAGER Investment — interactions (no dependencies) */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero entrance ---------- */
  const markLoaded = () => requestAnimationFrame(() => root.classList.add('is-loaded'));
  if (document.readyState === 'complete') markLoaded();
  else window.addEventListener('load', markLoaded, { once: true });

  /* ---------- Header: solid on scroll, hide on scroll-down ---------- */
  const header = document.querySelector('[data-header]');
  let lastY = window.scrollY;
  let ticking = false;

  const updateHeader = () => {
    const y = window.scrollY;
    const menuOpen = header.classList.contains('menu-active');
    header.classList.toggle('is-scrolled', y > 24);
    if (!menuOpen) {
      const goingDown = y > lastY;
      header.classList.toggle('is-hidden', goingDown && y > window.innerHeight * 0.8);
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateHeader); ticking = true; }
  }, { passive: true });
  updateHeader();

  // Reveal header when keyboard focus moves into it
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector('[data-nav-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const toggleLabel = toggle.querySelector('.sr-only');

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggleLabel.textContent = open ? 'Close menu' : 'Open menu';
    header.classList.toggle('menu-active', open);
    header.classList.remove('is-hidden');
    document.body.classList.toggle('menu-open', open);
    if (open) {
      mobileNav.hidden = false;
      requestAnimationFrame(() => mobileNav.classList.add('is-open'));
    } else {
      mobileNav.classList.remove('is-open');
      const done = () => { if (!header.classList.contains('menu-active')) mobileNav.hidden = true; };
      reduceMotion ? done() : setTimeout(done, 400);
    }
  };

  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  mobileNav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1025px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- Active section in primary nav ---------- */
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          a.toggleAttribute('aria-current', a.getAttribute('href') === `#${entry.target.id}`);
          if (a.hasAttribute('aria-current')) a.setAttribute('aria-current', 'true');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ---------- Scroll reveal with sibling stagger ---------- */
  const reveals = [...document.querySelectorAll('.reveal')];
  reveals.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 0.09}s`);
  });

  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Figures counter ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const formatter = (decimals) => new Intl.NumberFormat('en-GB', {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  });

  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const fmt = formatter(decimals);
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = fmt.format(target * eased);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && !reduceMotion) {
    const countObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { runCounter(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => {
      el.textContent = formatter(parseInt(el.dataset.decimals || '0', 10)).format(0);
      countObserver.observe(el);
    });
  }

  /* ---------- Strategies: accordion + image crossfade ---------- */
  const strategiesRoot = document.querySelector('[data-strategies]');
  if (strategiesRoot) {
    const items = [...strategiesRoot.querySelectorAll('[data-strategy]')];
    const frames = [...strategiesRoot.querySelectorAll('[data-strategy-media]')];

    const activate = (index) => {
      items.forEach((item, i) => {
        const active = i === index;
        item.classList.toggle('is-active', active);
        item.querySelector('.strategy-trigger').setAttribute('aria-expanded', String(active));
      });
      frames.forEach((f, i) => f.classList.toggle('is-active', i === index));
    };

    items.forEach((item, i) => {
      item.querySelector('.strategy-trigger').addEventListener('click', () => activate(i));
    });
  }

  /* ---------- Contact form (client-side validation; wire to backend) ---------- */
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstInvalid = null;

      form.querySelectorAll('[required]').forEach((input) => {
        const value = input.value.trim();
        const valid = value !== '' && (input.type !== 'email' || emailRe.test(value));
        input.closest('.field').classList.toggle('has-error', !valid);
        input.setAttribute('aria-invalid', String(!valid));
        if (!valid && !firstInvalid) firstInvalid = input;
      });

      if (firstInvalid) {
        status.classList.add('is-error');
        status.textContent = 'Please complete the highlighted fields.';
        firstInvalid.focus();
        return;
      }

      status.classList.remove('is-error');
      status.textContent = 'Thank you. A member of our team will be in touch shortly.';
      form.reset();
    });

    form.addEventListener('input', (e) => {
      const field = e.target.closest('.field');
      if (field && field.classList.contains('has-error')) {
        field.classList.remove('has-error');
        e.target.removeAttribute('aria-invalid');
      }
    });
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
