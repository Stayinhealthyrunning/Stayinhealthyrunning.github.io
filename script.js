const races = [
  {
    key: 'ultravasan',
    name: 'Ultravasan',
    description: 'Djupanalys av UV90 och UV45 med resultat, pacing, replay, banprofil och historik.',
    url: '/ultravasan-analys/',
    image: 'https://stayinhealthyrunning.github.io/ultravasan-analys/assets/salen-mora-header.png',
    imageAlt: 'Ultralöpare i naturmiljö längs Ultravasan',
    status: 'Tillgänglig',
    available: true
  },
  {
    key: 'gotaleden',
    name: 'Gotaleden',
    description: 'Interaktiv analys av Gotaleden Stafett & Ultra med delsträckor, banprofil, kartor och replay.',
    url: '/gotaleden-splits/',
    image: 'https://stayinhealthyrunning.github.io/gotaleden-splits/assets/social/gotaleden-splits-share.png',
    imageAlt: 'Gotaleden genom grön natur',
    status: 'Tillgänglig',
    available: true
  },
  {
    key: 'future',
    name: 'Fler lopp på väg',
    description: 'Österlen Spring Trail och fler lopp kan läggas till utan att portalen behöver byggas om.',
    url: null,
    image: null,
    imageAlt: '',
    status: 'Kommer snart',
    available: false
  }
];

const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
  '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
}[char]));

function raceCard(race){
  const media = race.image
    ? `<img src="${esc(race.image)}" alt="${esc(race.imageAlt)}" loading="lazy" decoding="async">`
    : '';
  const action = race.available
    ? `<a class="race-card-link" href="${esc(race.url)}" aria-label="Öppna analysen för ${esc(race.name)}">→</a>`
    : `<span class="race-card-link" aria-hidden="true">→</span>`;

  return `<article class="race-card ${race.available ? 'available' : 'coming'}">
    <div class="race-card-media">
      ${media}
      <span class="status-pill ${race.available ? 'available' : ''}">${esc(race.status)}</span>
    </div>
    <div class="race-card-body">
      <div>
        <h3>${esc(race.name)}</h3>
        <p>${esc(race.description)}</p>
      </div>
      ${action}
    </div>
  </article>`;
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
}
