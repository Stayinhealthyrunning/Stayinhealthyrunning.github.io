export const races = [
  {
    key: 'ultravasan',
    name: 'Ultravasan',
    description: 'Djupanalys av UV90 och UV45 med resultat, pacing, replay, banprofil och historik.',
    url: '/ultravasan-analys/',
    image: '/assets/hero-approved.jpg',
    imageAlt: 'Löpare på spång genom skogslandskap i varmt kvällsljus',
    imagePosition: '62% 16%',
    status: 'Tillgänglig',
    available: true,
    terrain: 'trail',
    distances: ['45 km', '90 km'],
    years: []
  },
  {
    key: 'gotaleden',
    name: 'Gotaleden',
    description: 'Interaktiv analys av Gotaleden Stafett & Ultra med delsträckor, banprofil, kartor och replay.',
    url: '/gotaleden-splits/',
    image: '/assets/gotaleden-card-female.jpg',
    imageAlt: 'Kvinnlig traillöpare i gul tröja och löparryggsäck på stig genom grön lövskog',
    imagePosition: 'center 46%',
    status: 'Tillgänglig',
    available: true,
    terrain: 'trail',
    distances: ['stafett', 'ultra'],
    years: []
  },
  {
    key: 'future',
    name: 'Fler lopp på väg',
    description: 'Österlen Spring Trail och fler spännande lopp kommer snart till Loppanalys.',
    url: null,
    image: '/assets/future-card.jpg',
    imageAlt: '',
    imagePosition: 'center center',
    status: 'Kommer snart',
    available: false,
    terrain: 'trail',
    distances: [],
    years: []
  }
];