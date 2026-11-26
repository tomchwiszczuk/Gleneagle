const host = document.querySelector('#offline-cookie-view');
const selected = new Set(JSON.parse(localStorage.getItem('arena-preview-preferences') || '[]'));

function show(name) {
  host.replaceChildren(document.querySelector('#view-' + name).content.cloneNode(true));
  for (const input of host.querySelectorAll('input[role="switch"]')) {
    input.checked = input.disabled || selected.has(input.getAttribute('aria-label'));
    input.setAttribute('aria-checked', String(input.checked));
  }
}

function finish() {
  localStorage.setItem('arena-preview-preferences', JSON.stringify([...selected]));
  show('badge');
  host.querySelector('[role="button"]').focus({preventScroll:true});
}

host.addEventListener('change', ({target}) => {
  if (!target.matches('input[role="switch"]')) return;
  const key = target.getAttribute('aria-label');
  if (target.checked) selected.add(key);
  else selected.delete(key);
  target.setAttribute('aria-checked', String(target.checked));
});

host.addEventListener('click', (event) => {
  const control = event.target.closest('button, a, [role="button"]');
  if (!control) return;
  if (control.id === 'cookiescript_badge') show('compact');
  else if (control.id === 'cookiescript_manage') show('details');
  else if (control.matches('[role="tab"]')) {
    event.preventDefault();
    const key = control.id.replace('cookiescript_tab_', '');
    show(key === 'cookie_declaration' ? 'details' : key);
  } else if (control.matches('.cookiescript_fsd_declaration_item_action_btn')) {
    const id = control.getAttribute('aria-controls');
    const section = host.querySelector('#' + id);
    const expanded = control.getAttribute('aria-expanded') !== 'true';
    if (expanded) {
      const content = document.querySelector('#view-' + id).content.cloneNode(true);
      if (section) section.replaceWith(content);
      else control.parentElement.after(content);
    } else if (section) section.hidden = true;
    control.setAttribute('aria-expanded', String(expanded));
  } else if (control.matches('#cookiescript_accept,#cookiescript_reject,#cookiescript_save,.cookiescript_close_btn')) {
    if (control.id === 'cookiescript_accept') {
      for (const input of host.querySelectorAll('input:not(:disabled)')) selected.add(input.getAttribute('aria-label'));
    }
    if (control.id === 'cookiescript_reject') selected.clear();
    finish();
  }
});
host.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[role="button"]:not(button)')) {
    e.preventDefault();
    e.target.click();
  }
  if (e.key === 'Escape') finish();
});
// The supplied saved homepage shows the compact settings badge.
show('badge');
