import { races } from '/races.js';

const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
  '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
}[char]));

function raceCard(race){
  const media = '<img src="' + esc(race.image) + '" alt="' + esc(race.imageAlt) + '" loading="lazy" decoding="async" style="object-position:' + esc(race.imagePosition) + '">';
  const status = '<span class="status-pill' + (race.available ? ' available' : '') + '">' + esc(race.status) + '</span>';
  const inner =
    '<div class="race-card-media">' +
      media +
      status +
    '</div>' +
    '<div class="race-card-body">' +
      '<div class="race-card-copy">' +
        '<h3>' + esc(race.name) + '</h3>' +
        '<p>' + esc(race.description) + '</p>' +
      '</div>' +
      '<span class="race-card-action" aria-hidden="true">→</span>' +
    '</div>';

  const attributes = ' data-race="' + esc(race.key) + '" data-status="' + (race.available ? 'available' : 'coming') + '" data-terrain="' + esc(race.terrain) + '" data-distances="' + esc(race.distances.join(',')) + '" data-years="' + esc(race.years.join(',')) + '"';

  if (race.available) {
    return '<article class="race-card available"' + attributes + '>' +
      '<a class="race-card-hit" href="' + esc(race.url) + '" aria-label="Öppna analysen för ' + esc(race.name) + '">' +
        inner +
      '</a>' +
    '</article>';
  }

  return '<article class="race-card coming"' + attributes + ' aria-label="' + esc(race.name) + ' – ' + esc(race.status) + '">' +
    inner +
  '</article>';
}

document.querySelectorAll('[data-race-grid]').forEach(grid => {
  const limit = Number.parseInt(grid.dataset.limit || '', 10);
  const visibleRaces = Number.isFinite(limit) ? races.slice(0, limit) : races;
  grid.innerHTML = visibleRaces.map(raceCard).join('');
});

const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      toggle.focus({ preventScroll: true });
    }
  });
}