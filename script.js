const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  $('.progress').style.width = pct + '%';
});

const cursor = $('.cursor-glow');
window.addEventListener('pointermove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

const modal = $('#modal');
$$('[data-open]').forEach(btn => btn.addEventListener('click', () => {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}));
$$('[data-close]').forEach(btn => btn.addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal.classList.remove('open');
});

$('#lead-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.currentTarget.querySelector('button');
  btn.innerHTML = 'Заявка подготовлена ✓';
  btn.disabled = true;
  setTimeout(() => {
    modal.classList.remove('open');
    e.currentTarget.reset();
    btn.innerHTML = 'Отправить заявку <span>→</span>';
    btn.disabled = false;
  }, 1400);
});
