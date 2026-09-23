const races = [
  {
    key: 'ultravasan',
    name: 'Ultravasan',
    description: 'Djupanalys av UV90 och UV45 med resultat, pacing, replay, banprofil och historik.',
    url: '/ultravasan-analys/',
    image: 'assets/ultravasan-card.jpg',
    imageAlt: 'Löpare på spång genom skogslandskap i varmt kvällsljus',
    imagePosition: 'center center',
    status: 'Tillgänglig',
    available: true
  },
  {
    key: 'gotaleden',
    name: 'Gotaleden',
    description: 'Interaktiv analys av Gotaleden Stafett & Ultra med delsträckor, banprofil, kartor och replay.',
    url: '/gotaleden-splits/',
    image: 'assets/gotaleden-card.jpg',
    imageAlt: 'Stig genom grön lövskog med vita vitsippor',
    imagePosition: 'center center',
    status: 'Tillgänglig',
    available: true
  },
  {
    key: 'future',
    name: 'Fler lopp på väg',
    description: 'Österlen Spring Trail och fler spännande lopp kommer snart till Loppanalys.',
    url: null,
    image: 'assets/future-card.jpg',
    imageAlt: '',
    imagePosition: 'center center',
    status: 'Kommer snart',
    available: false
  }
];

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

  if (race.available) {
    return '<article class="race-card available">' +
      '<a class="race-card-hit" href="' + esc(race.url) + '" aria-label="Öppna analysen för ' + esc(race.name) + '">' +
        inner +
      '</a>' +
    '</article>';
  }

  return '<article class="race-card coming" aria-label="' + esc(race.name) + ' – ' + esc(race.status) + '">' +
    inner +
  '</article>';
}

const grid = document.querySelector('[data-race-grid]');
if (grid) grid.innerHTML = races.map(raceCard).join('');

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
    }
  });
}
