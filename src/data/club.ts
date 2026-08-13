type Practice = {
  day: string;
  time: string;
  place: string;
  level: string;
};

const summerPractices: Practice[] = [
  { day: 'Wed', time: '6:00 PM', place: 'MNP Community & Sports Centre', level: 'Intermediate / Advanced' },
  { day: 'Fri', time: '6:00 PM', place: 'MNP Community & Sports Centre', level: 'All levels' },
  { day: 'Sun', time: '9:00 AM', place: 'Bowview Outdoor Pool', level: 'All levels' },
];

const winterPractices: Practice[] = [
  { day: 'Fri', time: '6:00 PM', place: 'MNP Community & Sports Centre', level: 'Beginners' },
  { day: 'Fri', time: '7:30 PM', place: 'Killarney Aquatic & Recreation Centre', level: 'Intermediate / Advanced' },
  { day: 'Sun', time: '6:00 PM', place: 'MNP Community & Sports Centre', level: 'All levels' },
];

const scheduleSeasons = [
  {
    label: 'Summer · July–August 2026',
    validityLabel: 'valid through August 31, 2026',
    startsOn: '2026-07-01',
    endsOn: '2026-08-31',
    practices: summerPractices,
  },
  {
    label: 'Winter · September 2025–June 2026',
    validityLabel: 'valid through June 30, 2026',
    startsOn: '2025-09-01',
    endsOn: '2026-06-30',
    practices: winterPractices,
  },
] as const;

const membershipSeason = {
  label: 'September 2025–August 2026',
  validityLabel: 'valid through August 31, 2026',
  startsOn: '2025-09-01',
  endsOn: '2026-08-31',
};

const getCalgaryDateKey = (date: Date) => {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Edmonton',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const isDateInRange = (date: Date, startsOn: string, endsOn: string) => {
  const day = getCalgaryDateKey(date);
  return day >= startsOn && day <= endsOn;
};

export const club = {
  calendarEmbedUrl: 'https://calendar.google.com/calendar/embed?mode=AGENDA&src=differentstrokesyyc%40gmail.com&ctz=America%2FEdmonton&color=%230087E2&bgcolor=%23FFFFFF&showTitle=0&showPrint=0&showCalendars=0&showTz=0',
  calendarOpenUrl: 'https://calendar.google.com/calendar/u/1?cid=ZGlmZmVyZW50c3Ryb2tlc3l5Y0BnbWFpbC5jb20',
  joinUrl: 'https://clubbots.wlabscode.com/different-strokes-calgary/join',
  contactUrl: 'https://clubbots.wlabscode.com/different-strokes-calgary/contact',
  instagramUrl: 'https://www.instagram.com/differentstrokescalgary/',
  merchStoreUrl: 'https://stores.freshbrandgear.com/Different_Strokes_Calgary/shop/home',
  practices: summerPractices,
  winterPractices,
  fees: [
    { name: 'Annual pass', price: '$380', detail: 'Swim Alberta registration included.' },
    { name: '10-practice pass', price: '$169', detail: 'Use within 12 months. Later 10-practice passes in the same season cost $110.' },
    { name: 'Student annual pass', price: '$220', detail: 'For current students with valid ID. Swim Alberta registration included.' },
  ],
};

export const getPracticeSchedule = (date = new Date()) => {
  const current = scheduleSeasons.find((season) => isDateInRange(date, season.startsOn, season.endsOn));

  if (!current) {
    // Never publish an expired practice list as if it were actionable. The
    // live calendar remains the source of truth between scheduled updates.
    return {
      label: 'Practice schedule needs updating',
      validityLabel: '',
      startsOn: '',
      endsOn: '',
      practices: [] as Practice[],
      isCurrent: false,
    };
  }

  return {
    ...current,
    isCurrent: true,
  };
};

export const getMembershipSeason = (date = new Date()) => ({
  ...membershipSeason,
  isCurrent: isDateInRange(date, membershipSeason.startsOn, membershipSeason.endsOn),
});

export const isConfigured = (url: string) => /^https?:\/\//.test(url);
