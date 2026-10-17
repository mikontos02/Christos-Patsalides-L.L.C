/* Christos Patsalides LLC — shared site interactions */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const CONTACT_FALLBACK = 'Please email <a href="mailto:info@patsalides.com.cy">info@patsalides.com.cy</a> or call <a href="tel:+35722677677">+357 22 677 677</a>.';

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-menu]');
    const header = document.querySelector('[data-header]');
    if (!toggle || !menu) return;

    const label = toggle.querySelector('.menu-toggle__label');
    const outside = [document.getElementById('main'), document.querySelector('.site-footer')];
    const desktop = window.matchMedia('(min-width: 1181px)');

    // Submenus (Our People, Our Expertise) expand in place; they never navigate
    menu.querySelectorAll('[data-submenu-toggle]').forEach((button) => {
      const list = document.getElementById(button.getAttribute('aria-controls'));
      if (!list) return;
      list.hidden = button.getAttribute('aria-expanded') !== 'true';
      button.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(open));
        list.hidden = !open;
      });
    });

    function setOpen(open, { restoreFocus = true } = {}) {
      toggle.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Close' : 'Menu';
      menu.hidden = !open;
      document.body.classList.toggle('is-menu-open', open);
      outside.forEach((el) => { if (el) el.inert = open; });
      if (header) header.classList.remove('is-hidden');

      if (open) {
        const first = menu.querySelector('a');
        if (first) first.focus();
      } else if (restoreFocus) {
        toggle.focus();
      }
    }

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false, { restoreFocus: false });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !menu.hidden) setOpen(false);
    });

    desktop.addEventListener('change', (event) => {
      if (event.matches && !menu.hidden) setOpen(false, { restoreFocus: false });
    });
  }

  /* ---------- Desktop dropdowns: hover for mouse, click/keyboard for everyone ---------- */
  function initDropdowns() {
    const items = [...document.querySelectorAll('[data-dropdown]')];
    if (!items.length) return;

    const CLOSE_DELAY = 180;

    items.forEach((item) => {
      const trigger = item.querySelector('.site-nav__trigger');
      const links = () => [...item.querySelectorAll('.site-nav__sublink')];
      let closeTimer = 0;
      let hoverOpened = false;

      item.setOpen = (open) => {
        clearTimeout(closeTimer);
        if (open) items.forEach((other) => { if (other !== item) other.setOpen(false); });
        item.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', String(open));
        if (!open) hoverOpened = false;
      };

      trigger.addEventListener('click', () => {
        // A mouse click on a menu that hover just opened keeps it open rather than closing it
        if (hoverOpened) { hoverOpened = false; return; }
        item.setOpen(trigger.getAttribute('aria-expanded') !== 'true');
      });

      item.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse') return;
        clearTimeout(closeTimer);
        if (!item.classList.contains('is-open')) { item.setOpen(true); hoverOpened = true; }
      });
      item.addEventListener('pointerleave', (event) => {
        if (event.pointerType !== 'mouse') return;
        closeTimer = setTimeout(() => {
          const active = document.activeElement;
          const keyboardInside = item.contains(active) && active.matches(':focus-visible');
          if (!keyboardInside) item.setOpen(false);
        }, CLOSE_DELAY);
      });

      item.addEventListener('focusout', (event) => {
        if (event.relatedTarget && !item.contains(event.relatedTarget)) item.setOpen(false);
      });

      item.addEventListener('keydown', (event) => {
        const list = links();
        const index = list.indexOf(document.activeElement);
        if (event.key === 'Escape' && item.classList.contains('is-open')) {
          item.setOpen(false);
          trigger.focus();
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          if (!item.classList.contains('is-open')) item.setOpen(true);
          list[(index + 1) % list.length].focus();
        } else if (event.key === 'ArrowUp' && index !== -1) {
          event.preventDefault();
          if (index === 0) trigger.focus(); else list[index - 1].focus();
        }
      });
    });

    document.addEventListener('click', (event) => {
      items.forEach((item) => { if (!item.contains(event.target)) item.setOpen(false); });
    });
  }

  /* ---------- Profile panels: card links open a <dialog>; the link remains the fallback ---------- */
  function initProfiles() {
    const links = document.querySelectorAll('[data-profile]');
    if (!links.length || typeof HTMLDialogElement !== 'function') return;

    const root = document.documentElement;

    links.forEach((link) => {
      const dialog = document.getElementById(link.dataset.profile);
      if (!dialog) return;
      link.setAttribute('aria-haspopup', 'dialog');
      link.setAttribute('aria-controls', dialog.id);

      const show = () => {
        dialog.showModal();
        root.classList.add('has-dialog');
        dialog.scrollTop = 0;
      };

      link.addEventListener('click', (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        show();
      });

      // Deep link, e.g. lawyers/index.html#profile-george-panayides (used by the Industries page)
      if (location.hash === '#' + dialog.id) {
        link.scrollIntoView({ block: 'center' });
        show();
      }

      dialog.addEventListener('close', () => {
        root.classList.remove('has-dialog');
        link.focus();
      });

      // Close on the backdrop (clicks outside the panel land on the dialog element itself)
      dialog.addEventListener('click', (event) => {
        if (event.target === dialog) dialog.close();
      });
      dialog.querySelector('[data-profile-close]').addEventListener('click', () => dialog.close());
    });
  }

  /* ---------- Team section strip: keep the current page's tab in view on small screens ---------- */
  function initSectionNav() {
    const strip = document.querySelector('.section-nav ul');
    const current = strip && strip.querySelector('[aria-current="page"]');
    if (!current || strip.scrollWidth <= strip.clientWidth) return;
    const item = current.parentElement;
    strip.scrollLeft = item.offsetLeft - (strip.clientWidth - item.offsetWidth) / 2;
  }

  /* ---------- News archive: search, topic filters and "show more" over the static list ---------- */
  function initArchive() {
    const root = document.querySelector('[data-archive]');
    if (!root) return;

    const PAGE = 10;
    const rows = [...root.querySelectorAll('.archive-row')];
    const tools = root.querySelector('[data-archive-tools]');
    const search = root.querySelector('[data-archive-search]');
    const chips = [...root.querySelectorAll('[data-filter]')];
    const more = root.querySelector('[data-archive-more]');
    const empty = root.querySelector('[data-archive-empty]');
    const status = root.querySelector('[data-archive-status]');
    let filter = 'all';
    let limit = PAGE;

    function matches(row, query) {
      const inFilter = filter === 'all' || row.dataset.filters.split(' ').includes(filter);
      return inFilter && (!query || query.every((word) => row.dataset.search.includes(word)));
    }

    function render({ announce = true } = {}) {
      const query = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      const hits = rows.filter((row) => matches(row, query));
      rows.forEach((row) => { row.hidden = true; });
      hits.slice(0, limit).forEach((row) => { row.hidden = false; });

      const remaining = hits.length - Math.min(limit, hits.length);
      more.hidden = remaining <= 0;
      more.textContent = `Show more (${remaining} remaining)`;
      empty.hidden = hits.length > 0;
      if (announce) {
        const filtered = filter !== 'all' || query.length;
        status.textContent = filtered ? `${hits.length} of ${rows.length} entries` : `${rows.length} entries`;
      }
    }

    chips.forEach((chip) => chip.addEventListener('click', () => {
      filter = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      limit = PAGE;
      render();
    }));

    let timer = 0;
    search.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => { limit = PAGE; render(); }, 120);
    });

    more.addEventListener('click', () => {
      const firstNew = rows.filter((r) => !r.hidden).length;
      limit += PAGE;
      render({ announce: false });
      // Move focus to the first newly revealed entry so keyboard users keep their place
      const visible = rows.filter((r) => !r.hidden);
      const target = visible[firstNew] && visible[firstNew].querySelector('a');
      if (target) target.focus();
    });

    root.querySelector('[data-archive-reset]').addEventListener('click', () => {
      search.value = '';
      filter = 'all';
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === 'all')));
      limit = PAGE;
      render();
      search.focus();
    });

    tools.hidden = false;
    render({ announce: false });
  }

  /* ---------- Article contents: mark the section being read ---------- */
  function initToc() {
    const links = [...document.querySelectorAll('.article-toc a[href^="#"]')];
    if (!links.length || !('IntersectionObserver' in window)) return;

    // On small screens the contents start collapsed
    const details = document.querySelector('.article-toc__details');
    if (details && window.matchMedia('(max-width: 1024px)').matches) details.open = false;

    const byId = new Map(links.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        const link = byId.get(entry.target.id);
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    byId.forEach((_, id) => { const h = document.getElementById(id); if (h) observer.observe(h); });
  }

  /* ---------- Header: hide on scroll down, reveal on scroll up ---------- */
  function initHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    let lastY = window.scrollY;
    let ticking = false;

    function update() {
      const y = window.scrollY;
      const threshold = header.offsetHeight * 2;
      const menuOpen = document.body.classList.contains('is-menu-open');

      header.classList.toggle('is-scrolled', y > 4);
      const dropdownOpen = header.querySelector('.site-nav__item.is-open');
      if (!menuOpen && !dropdownOpen) {
        header.classList.toggle('is-hidden', y > threshold && y > lastY && !header.contains(document.activeElement));
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });

    header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
    update();
  }

  /* ---------- Hero title: word-by-word reveal ---------- */
  function initSplitTitle() {
    const title = document.querySelector('[data-split]');
    if (!title || reduceMotion.matches) return;

    const words = title.textContent.trim().split(/\s+/);
    title.setAttribute('aria-label', title.textContent.trim());
    title.textContent = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.setAttribute('aria-hidden', 'true');
      span.style.setProperty('--i', i);
      span.textContent = word;
      title.append(span, i < words.length - 1 ? ' ' : '');
    });
    title.classList.add('is-splitting');
  }

  /* ---------- Ticker: stop animating while off-screen ---------- */
  function initTicker() {
    const ticker = document.querySelector('[data-ticker]');
    if (!ticker) return;

    if ('IntersectionObserver' in window) {
      const track = ticker.querySelector('.ticker__track');
      new IntersectionObserver(([entry]) => {
        track.style.animationPlayState = entry.isIntersecting ? '' : 'paused';
      }).observe(ticker);
    }
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- Forms: shared validation; never claims to send without a configured endpoint ---------- */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const PHONE_RE = /^[+()\d\s.-]{6,20}$/;

  const commonRules = {
    name: (v) => (v.trim().length < 2 ? 'Please enter your full name.' : ''),
    email: (v) => {
      if (!v.trim()) return 'Please enter your email address.';
      return EMAIL_RE.test(v.trim()) ? '' : 'Please enter a valid email address, for example name@example.com.';
    },
    consent: (_, form) => (form.elements.consent.checked ? '' : 'Please confirm that you agree to the Privacy Policy.'),
  };

  const optionalPhone = (v) => (!v.trim() || PHONE_RE.test(v.trim()) ? '' : 'Please enter a valid telephone number, including the country code if outside Cyprus.');

  function validateField(form, name, rules) {
    const field = form.elements[name];
    const message = rules[name](field.value || '', form, field);
    const error = document.getElementById(field.getAttribute('aria-describedby').split(' ').pop());

    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    error.textContent = message;
    error.hidden = !message;
    return !message;
  }

  function showStatus(box, type, html) {
    box.className = 'form__status form__status--' + type;
    box.innerHTML = html;
  }

  function setupForm(form, { rules, text, onReset }) {
    const status = form.querySelector('[data-status]');
    const submit = form.querySelector('[data-submit]');
    const submitLabel = form.querySelector('[data-submit-label]');
    const touched = new Set();
    const check = (name) => validateField(form, name, rules);

    // Validate on blur, then live once a field has been visited
    Object.keys(rules).forEach((name) => {
      const field = form.elements[name];
      const evt = ['checkbox', 'file'].includes(field.type) || field.tagName === 'SELECT' ? 'change' : 'blur';
      field.addEventListener(evt, () => { touched.add(name); check(name); });
      field.addEventListener('input', () => { if (touched.has(name)) check(name); });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.innerHTML = '';

      const invalid = Object.keys(rules).filter((name) => !check(name));
      invalid.forEach((name) => touched.add(name));
      if (invalid.length) {
        form.elements[invalid[0]].focus();
        showStatus(status, 'error', invalid.length === 1
          ? 'Please correct the highlighted field.'
          : 'Please correct the ' + invalid.length + ' highlighted fields.');
        return;
      }

      // No delivery service configured: never pretend the message was sent.
      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        showStatus(status, 'notice', text.notConnected);
        return;
      }

      submit.disabled = true;
      submitLabel.textContent = 'Sending…';
      try {
        const response = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        form.reset();
        touched.clear();
        form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
        if (onReset) onReset();
        showStatus(status, 'success', text.sent);
      } catch (err) {
        showStatus(status, 'error', text.failed);
      } finally {
        submit.disabled = false;
        submitLabel.textContent = text.label;
      }
    });
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    const rules = {
      ...commonRules,
      phone: (v, f) => (!v.trim() && f.elements.contact_method.value === 'phone' ? 'Please enter a telephone number so we can call you.' : optionalPhone(v)),
      area: (v) => (v ? '' : 'Please choose the area your matter relates to.'),
      message: (v) => (v.trim().length < 10 ? 'Please add a short description of your matter (at least 10 characters).' : ''),
    };
    form.querySelectorAll('input[name="contact_method"]').forEach((radio) => {
      radio.addEventListener('change', () => validateField(form, 'phone', rules));
    });
    setupForm(form, {
      rules,
      text: {
        label: 'Send enquiry',
        notConnected: '<strong>Your enquiry has not been sent.</strong> This form is not yet connected to a delivery service. ' + CONTACT_FALLBACK,
        sent: '<strong>Thank you — your enquiry has been sent.</strong> We will reply using the contact details you provided.',
        failed: '<strong>Your enquiry could not be sent.</strong> Please try again later. ' + CONTACT_FALLBACK,
      },
    });
  }

  /* ---------- Contact Us page: enquiry form, copy address, map on request ---------- */
  function initEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    if (!form) return;

    const hint = form.querySelector('[data-area-hint]');
    form.elements.area.addEventListener('change', () => { hint.hidden = form.elements.area.value !== 'Careers'; });

    setupForm(form, {
      rules: {
        ...commonRules,
        phone: optionalPhone,
        area: (v) => (v ? '' : 'Please choose the area your enquiry relates to.'),
        subject: (v) => (v.trim().length < 3 ? 'Please add a short subject.' : ''),
        message: (v) => (v.trim().length < 10 ? 'Please add a short message (at least 10 characters).' : ''),
      },
      onReset: () => { hint.hidden = true; },
      text: {
        label: 'Send enquiry',
        notConnected: '<strong>Your enquiry has not been sent.</strong> This form is not yet connected to a delivery service. Your message is still in the form. ' + CONTACT_FALLBACK,
        sent: '<strong>Thank you — your enquiry has been sent.</strong> We will reply using the contact details you provided.',
        failed: '<strong>Your enquiry could not be sent.</strong> Your message is still in the form, so you can try again. ' + CONTACT_FALLBACK,
      },
    });
  }

  function initCopy() {
    document.querySelectorAll('[data-copy]').forEach((button) => {
      if (!navigator.clipboard) return; // the address stays selectable as plain text
      const status = button.closest('dd').querySelector('[data-copy-status]');
      button.hidden = false;
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(button.dataset.copy);
          status.textContent = 'Address copied.';
        } catch (err) {
          status.textContent = 'Copy is not available. Please select the address to copy it.';
        }
        setTimeout(() => { status.textContent = ''; }, 4000);
      });
    });
  }

  function initMap() {
    const box = document.querySelector('[data-map]');
    if (!box) return;
    const consent = box.querySelector('[data-map-consent]');
    consent.hidden = false;
    box.querySelector('[data-map-load]').addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = box.dataset.src;
      frame.title = 'Map showing the office of Christos Patsalides LLC in Nicosia';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      frame.className = 'location__frame';
      box.replaceChildren(frame);
      frame.focus();
    });
  }

  /* ---------- Careers application (CV upload checked in the browser; the server must re-check) ---------- */
  function initApplicationForm() {
    const form = document.getElementById('application-form');
    if (!form) return;

    const input = form.elements.cv;
    const MAX = Number(input.dataset.maxBytes);
    const TYPES = input.accept.split(',').map((t) => t.trim().toLowerCase());
    const drop = form.querySelector('[data-dropzone]');
    const chosen = form.querySelector('[data-file-chosen]');
    const chosenName = form.querySelector('[data-file-name]');
    const clear = form.querySelector('[data-file-clear]');

    const rules = {
      ...commonRules,
      phone: optionalPhone,
      area: (v) => (v ? '' : 'Please choose the area you are interested in.'),
      cv: (_, f, field) => {
        const file = field.files[0];
        if (!file) return 'Please attach your CV.';
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!TYPES.includes(ext)) return 'Please upload your CV as a PDF, DOC or DOCX file.';
        if (file.size > MAX) return 'Your CV is larger than 5 MB. Please upload a smaller file.';
        return '';
      },
    };

    function showChosen() {
      const file = input.files[0];
      chosen.hidden = !file;
      drop.classList.toggle('has-file', Boolean(file));
      if (file) chosenName.textContent = `${file.name} · ${(file.size / 1048576).toFixed(file.size < 104858 ? 2 : 1)} MB`;
    }

    input.addEventListener('change', showChosen);
    clear.addEventListener('click', () => {
      input.value = '';
      showChosen();
      validateField(form, 'cv', rules);
      input.focus();
    });

    ['dragenter', 'dragover'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add('is-dragging'); }));
    ['dragleave', 'drop'].forEach((t) => drop.addEventListener(t, () => drop.classList.remove('is-dragging')));
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!e.dataTransfer.files.length) return;
      const dt = new DataTransfer();
      dt.items.add(e.dataTransfer.files[0]);
      input.files = dt.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const RECRUIT = 'Please email your CV to <a href="mailto:info@patsalides.com.cy?subject=Career%20application">info@patsalides.com.cy</a> instead, or call <a href="tel:+35722677677">+357 22 677 677</a>.';
    setupForm(form, {
      rules,
      onReset: showChosen,
      text: {
        label: 'Submit application',
        notConnected: '<strong>Your application has not been sent.</strong> This form is not yet connected to a delivery service, and your CV has not been uploaded anywhere. ' + RECRUIT,
        sent: '<strong>Thank you — your application has been sent.</strong> We will contact you using the details you provided.',
        failed: '<strong>Your application could not be sent.</strong> Please try again later. ' + RECRUIT,
      },
    });
  }

  initMenu();
  initDropdowns();
  initProfiles();
  initSectionNav();
  initArchive();
  initToc();
  initHeader();
  initSplitTitle();
  initTicker();
  initReveal();
  initContactForm();
  initApplicationForm();
  initEnquiryForm();
  initCopy();
  initMap();
})();
