const races = [
  {
    key: 'ultravasan',
    name: 'Ultravasan',
    subtitle: 'UV90 & UV45',
    description: 'Resultat, pacing, replay, banprofil och historik för Ultravasan.',
    url: '/ultravasan-analys/',
    image: 'https://stayinhealthyrunning.github.io/ultravasan-analys/assets/oxberg-mora-header.png',
    imageAlt: 'Ultralöpare på träspång genom myr och tallskog',
    status: 'Tillgänglig',
    available: true
  },
  {
    key: 'gotaleden',
    name: 'Gotaleden',
    subtitle: 'Stafett & Ultra',
    description: 'Delsträckor, banprofil, kartor, replay och resultat längs Gotaleden.',
    url: '/gotaleden-splits/',
    image: 'https://stayinhealthyrunning.github.io/gotaleden-splits/assets/social/gotaleden-splits-share.png',
    imageAlt: 'Smal stig genom grön lövskog och vita vitsippor',
    status: 'Tillgänglig',
    available: true
  },
  {
    key: 'future',
    name: 'Fler lopp på väg',
    subtitle: 'Nästa analyser',
    description: 'Portalen är byggd för fler lopp. Österlen Spring Trail är redan förberett för nästa steg.',
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
    : `<div class="race-placeholder" aria-hidden="true"><span>+</span></div>`;

  const cardInner = `<div class="race-card-media">
      ${media}
      <span class="status-pill ${race.available ? 'available' : ''}">${esc(race.status)}</span>
    </div>
    <div class="race-card-body">
      <div class="race-card-copy">
        <p class="race-card-subtitle">${esc(race.subtitle)}</p>
        <h3>${esc(race.name)}</h3>
        <p>${esc(race.description)}</p>
      </div>
      <span class="race-card-action" aria-hidden="true">${race.available ? '→' : '+'}</span>
    </div>`;

  if (race.available) {
    return `<article class="race-card available">
      <a class="race-card-hit" href="${esc(race.url)}" aria-label="Öppna analysen för ${esc(race.name)}">
        ${cardInner}
      </a>
    </article>`;
  }

  return `<article class="race-card coming" aria-label="${esc(race.name)} – ${esc(race.status)}">
    ${cardInner}
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

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });
}
