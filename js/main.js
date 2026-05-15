'use strict';

const TEAM = [
  { name: 'Felipe Ribeiro', rm: '573818', role: 'Front-End' },
  { name: 'Luiz Alberto', rm: '573843', role: 'UX Design' },
  { name: 'Milena Kubo', rm: '572590', role: 'Pesquisa' },
  { name: 'Yasmim Kim', rm: '571494', role: 'Estratégia' },
];

const FEATURES = [
  { icon: '⚡', title: 'Captura Inteligente', desc: 'A IA sugere o momento ideal e reduz tentativas.' },
  { icon: '📐', title: 'Correção Automática', desc: 'Ajuste de inclinação e alinhamento em tempo real.' },
  { icon: '🙂', title: 'Reconhecimento Facial', desc: 'Prioriza rostos e melhora composição com suavidade.' },
  { icon: '🖼️', title: 'Enquadramento Adaptativo', desc: 'Mantém o assunto no centro, sem cortes indesejados.' },
  { icon: '🧠', title: 'IA Contextual', desc: 'Entende cenário (documento, quadro, pessoa) e adapta o modo.' },
  { icon: '👁️', title: 'Assistente Visual', desc: 'Overlays discretos para orientar o usuário sem poluir a tela.' },
];

const SLIDES = [
  { badge: 'Real‑time', title: 'Guias inteligentes na tela', text: 'Linhas e cantos sutis orientam o ângulo perfeito em segundos.' },
  { badge: 'Auto‑fix', title: 'Correção automática de inclinação', text: 'Menos pós‑edição. Mais fotos prontas no primeiro clique.' },
  { badge: 'Framing', title: 'Enquadramento que se adapta', text: 'A JOVI ajusta a composição para reduzir cortes e distrações.' },
];

const VALID_USERS = [
  { email: 'jovi@opticfusion.com', password: 'jovi2025' },
  { email: 'admin@jovi.com', password: 'admin123' },
];

const DOM = {
  navbar: null,
  navToggle: null,
  navLinks: null,
  revealItems: null,
};

const qs = (selector, context = document) => context.querySelector(selector);
const qsa = (selector, context = document) => [...context.querySelectorAll(selector)];

function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function showAlert(targetEl, type, message) {
  if (!targetEl) return;
  targetEl.className = `alert ${type}`;
  targetEl.textContent = message;
}

function clearFieldError(inputEl, errorEl) {
  if (!inputEl) return;
  inputEl.classList.remove('invalid');
  if (errorEl) errorEl.textContent = '';
}

function setFieldError(inputEl, errorEl, msg) {
  if (!inputEl) return;
  inputEl.classList.add('invalid');
  if (errorEl) errorEl.textContent = msg;
}

function initNavbar() {
  DOM.navbar = qs('#navbar');
  DOM.navToggle = qs('#navToggle');
  DOM.navLinks = qs('#navLinks');

  if (!DOM.navbar) return;

  const onScroll = () => {
    DOM.navbar.classList.toggle('nav--scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (DOM.navToggle && DOM.navLinks) {
    DOM.navToggle.addEventListener('click', () => {
      const isOpen = DOM.navLinks.classList.toggle('open');
      DOM.navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    DOM.navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        DOM.navLinks.classList.remove('open');
        DOM.navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

let revealObserver = null;

function initReveal() {
  const items = qsa('.reveal');
  if (!items.length) return;

  if (revealObserver) {
    items.forEach(el => {
      if (!el.classList.contains('visible')) revealObserver.observe(el);
    });
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => revealObserver.observe(el));
}

function buildFeatures() {
  const list = qs('#featuresList');
  if (!list || list.children.length > 0) return;

  const fragment = document.createDocumentFragment();

  FEATURES.forEach((f) => {
    const card = createEl('article', 'feature-card reveal');
    const icon = createEl('div', 'feature-icon', f.icon);
    const title = createEl('h3', 'feature-title', f.title);
    const desc = createEl('p', 'muted', f.desc);

    card.append(icon, title, desc);
    fragment.appendChild(card);
  });

  list.appendChild(fragment);
}

function initSlideshow() {
  const stage = qs('#slides');
  const dotsWrap = qs('#slideDots');
  const prevBtn = qs('#prevSlide');
  const nextBtn = qs('#nextSlide');

  if (!stage || !dotsWrap || !prevBtn || !nextBtn) return;

  let current = 0;

  dotsWrap.innerHTML = '';
  SLIDES.forEach((_, i) => {
    const dot = createEl('button', 'dot', '');
    dot.setAttribute('aria-label', `Ir para o highlight ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function update() {
    const s = SLIDES[current];
    stage.innerHTML = '';

    const slide = createEl('div', 'slide fade-in');
    const visual = createEl('div', 'slide-visual');
    const top = createEl('div', 'slide-top');
    
    top.append(
      createEl('span', 'slide-badge', s.badge),
      createEl('span', 'muted', `${current + 1}/${SLIDES.length}`)
    );

    slide.append(visual, top, createEl('h3', null, s.title), createEl('p', 'muted', s.text));
    stage.appendChild(slide);

    qsa('.dot', dotsWrap).forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });

    initReveal();
  }

  const goTo = (index) => {
    current = index;
    update();
  };

  prevBtn.addEventListener('click', () => goTo((current - 1 + SLIDES.length) % SLIDES.length));
  nextBtn.addEventListener('click', () => goTo((current + 1) % SLIDES.length));

  update();
}

function initCompare() {
  const box = qs('#compareBox');
  const after = qs('#compareAfter');
  const handle = qs('#compareHandle');
  const range = qs('#compareRange');
  if (!box || !after || !handle || !range) return;

  const setPos = (value) => {
    const pos = `${value}%`;
    box.style.setProperty('--pos', pos);
    after.style.width = pos;
    handle.style.left = pos;
  };

  range.addEventListener('input', () => setPos(range.value));
  setPos(range.value);
}

function initModal() {
  const modals = qsa('.modal');
  const openLoginBtn = qs('#openLogin');
  const loginModal = qs('#loginModal');

  const openModal = (m) => {
    if (!m) return;
    m.classList.add('open');
    const firstInput = qs('input', m);
    firstInput?.focus();
  };

  const closeModal = (m) => m.classList.remove('open');

  openLoginBtn?.addEventListener('click', () => openModal(loginModal));

  modals.forEach((modal) => {
    qsa('[data-close-modal]', modal).forEach((el) => {
      el.addEventListener('click', () => closeModal(modal));
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(closeModal);
    }
  });

  return { openModal, closeModal };
}

function initContactForm() {
  const form = qs('#contactForm');
  if (!form) return;

  const alertEl = qs('#contactAlert');
  const fields = {
    name: { el: qs('#contactName'), err: qs('#contactNameError') },
    email: { el: qs('#contactEmail'), err: qs('#contactEmailError') },
    subject: { el: qs('#contactSubject'), err: qs('#contactSubjectError') },
    msg: { el: qs('#contactMsg'), err: qs('#contactMsgError') },
  };

  const validate = () => {
    let ok = true;
    const { name, email, subject, msg } = fields;

    if (!name.el.value.trim() || name.el.value.trim().length < 2) {
      setFieldError(name.el, name.err, 'Informe seu nome.');
      ok = false;
    } else clearFieldError(name.el, name.err);

    if (!validateEmail(email.el.value.trim())) {
      setFieldError(email.el, email.err, 'Informe um e-mail válido.');
      ok = false;
    } else clearFieldError(email.el, email.err);

    if (!subject.el.value) {
      setFieldError(subject.el, subject.err, 'Selecione uma opção.');
      ok = false;
    } else clearFieldError(subject.el, subject.err);

    if (!msg.el.value.trim() || msg.el.value.trim().length < 8) {
      setFieldError(msg.el, msg.err, 'Escreva uma mensagem curtinha (mín. 8 caracteres).');
      ok = false;
    } else clearFieldError(msg.el, msg.err);

    return ok;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) {
      showAlert(alertEl, 'error', 'Revise os campos destacados.');
      return;
    }
    
    alert('Formulário enviado com sucesso! Verifique seu e-mail.');
    
    showAlert(alertEl, 'success', 'Pedido enviado! Em breve você recebe o acesso no e-mail.');
    form.reset();
  });
}