export const races = [
  {
    key: 'ultravasan',
    name: 'Ultravasan',
    description: 'Djupanalys av UV90 och UV45 med resultat, pacing, replay, banprofil och historik.',
    url: '/ultravasan-analys/',
    image: '/assets/hero-approved.jpg',
    imageAlt: 'Löpare på spång genom skogslandskap i varmt kvällsljus',
    imagePosition: '84% 16%',
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
    image: '/assets/gotaleden-card-sharp.jpg?v=20260930-sharp5',
    imageAlt: 'Kvinnlig traillöpare i gul tröja, korta löpartajts och löparryggsäck, sedd bakifrån på stig genom grön lövskog',
    imagePosition: 'center center',
    status: 'Tillgänglig',
    available: true,
    terrain: 'trail',
    distances: ['stafett', 'ultra'],
    years: []
  },
  {
    key: 'osterlen-spring-trail',
    name: 'Österlen Spring Trail',
    description: 'Interaktiv analys av Österlen Spring Trail med resultat, pacing, banor, kartor och historik.',
    url: '/osterlen-spring-trail-analys/',
    image: '/assets/osterlen-spring-trail-card.webp?v=20260930-ost1',
    imageAlt: 'Löpare på kuststig vid havet på Österlen med blommande träd och kustlandskap',
    imagePosition: 'center 56%',
    status: 'Tillgänglig',
    available: true,
    terrain: 'trail',
    distances: ['5 km', '13–14 km', '21–22 km', '60 km'],
    years: []
  },
  {
    key: 'future',
    name: 'Fler lopp på väg',
    description: 'Fler spännande lopp kommer snart till Loppanalys.',
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