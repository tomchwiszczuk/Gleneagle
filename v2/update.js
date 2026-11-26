const header = document.querySelector('.v-header');
const concertVideo = document.querySelector('.v-media video');
const videoToggle = document.querySelector('.v-video-toggle');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

function playConcertPreview() {
  concertVideo.play().catch(() => {
    videoToggle.hidden = false;
  });
}

videoToggle.hidden = !reducedMotion.matches;
videoToggle.addEventListener('click', playConcertPreview);
concertVideo.addEventListener('playing', () => {
  videoToggle.hidden = true;
});
concertVideo.addEventListener('error', () => {
  videoToggle.hidden = true;
});
reducedMotion.addEventListener('change', event => {
  if (event.matches) {
    concertVideo.pause();
    videoToggle.hidden = false;
  }
});
if (!reducedMotion.matches) {
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    if (!reducedMotion.matches) playConcertPreview();
  }, {threshold:0.2});
  observer.observe(concertVideo);
}

function updateHeader() {
  header.classList.toggle('scrolled', scrollY > 8);
}
updateHeader();
window.addEventListener('scroll', updateHeader, {passive:true});

const menu = document.querySelector('#arena-menu');
const opener = document.querySelector('#menu-open');
opener.addEventListener('click', () => {
  menu.showModal();
  opener.setAttribute('aria-expanded','true');
  document.querySelector('#menu-close').focus();
});
document.querySelector('#menu-close').addEventListener('click', () => menu.close());
menu.addEventListener('close', () => opener.setAttribute('aria-expanded','false'));
matchMedia('(min-width:1024px)').addEventListener('change', e => {
  if (e.matches && menu.open) menu.close();
});

for (const branch of document.querySelectorAll('.v-branch')) {
  const button = branch.querySelector('button');
  const panel = branch.querySelector('.v-sub');
  const open = value => {
    panel.hidden = !value;
    button.setAttribute('aria-expanded',String(value));
  };
  button.addEventListener('click', () => open(panel.hidden));
  if (!branch.closest('dialog')) {
    branch.addEventListener('mouseenter', () => open(true));
    branch.addEventListener('mouseleave', () => {
      if (!branch.contains(document.activeElement)) open(false);
    });
  }
  branch.addEventListener('focusout', e => {
    if (!branch.contains(e.relatedTarget)) open(false);
  });
  branch.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) {
      e.preventDefault();
      open(false);
      button.focus();
    }
  });
  document.addEventListener('pointerdown', e => {
    if (!branch.contains(e.target)) open(false);
  });
}
const logos = document.querySelector('#affiliation-logos');
for (const [index,button] of [...document.querySelectorAll('.v-aff-row button')].entries()) {
  button.addEventListener('click', () => {
    const max = logos.scrollWidth - logos.clientWidth;
    const start = logos.firstElementChild.getBoundingClientRect().left;
    const positions = [...logos.children].map(item =>
      Math.min(max, item.getBoundingClientRect().left - start)
    );
    const left = index === 1
      ? positions.find(position => position > logos.scrollLeft + 1) ?? 0
      : positions.findLast(position => position < logos.scrollLeft - 1) ?? max;
    logos.scrollTo({left, behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
  });
}


const fieldButtons = [...document.querySelectorAll('#top_banner label')].map(label => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'v-search-toggle';
  button.textContent = label.textContent;
  button.setAttribute('aria-expanded', 'false');
  const control = document.getElementById(label.htmlFor);
  const field = control.closest('.category') || control;
  field.id ||= 'search-category-field';
  button.setAttribute('aria-controls', field.id);
  label.after(button);
  return button;
});
for (const button of fieldButtons) {
  button.addEventListener('click', () => {
    const opening = button.getAttribute('aria-expanded') === 'false';
    for (const item of fieldButtons) {
      const active = item === button && opening;
      item.parentElement.classList.toggle('v-active', active);
      item.setAttribute('aria-expanded', String(active));
    }
  });
}
