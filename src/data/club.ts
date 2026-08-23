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
  label: 'September 2026–August 2027',
  validityLabel: 'valid through August 31, 2027',
  startsOn: '2026-08-01',
  endsOn: '2027-08-31',
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

export type AnnualMembershipPeriod = {
  period: number;
  label: string;
  startDate: string;
  endDate: string;
  clubDues: string;
  swimmingCanadaDues: string;
  totalCost: string;
  studentCost: string;
};

export type PunchPassOption = {
  tier: string;
  bookletQuantity: number;
  passQuantity: number;
  clubDues: string;
  swimmingCanadaDues: string;
  totalCost: string;
  notes?: string;
};

export const annualMembershipPeriods: AnnualMembershipPeriod[] = [
  {
    period: 1,
    label: 'Period 1',
    startDate: 'Sep 1',
    endDate: 'Aug 31',
    clubDues: '$339.75',
    swimmingCanadaDues: '$60.25',
    totalCost: '$400.00',
    studentCost: '$230.00',
  },
  {
    period: 2,
    label: 'Period 2',
    startDate: 'Jan 1',
    endDate: 'Aug 31',
    clubDues: '$254.75',
    swimmingCanadaDues: '$60.25',
    totalCost: '$315.00',
    studentCost: '$187.00',
  },
];

export const punchPassOptions: PunchPassOption[] = [
  {
    tier: '1st Booklet',
    bookletQuantity: 1,
    passQuantity: 10,
    clubDues: '$135.75',
    swimmingCanadaDues: '$60.25',
    totalCost: '$196.00',
    notes: '$135.75 club + $60.25 Swimming Canada',
  },
  {
    tier: 'Subsequent Booklets',
    bookletQuantity: 1,
    passQuantity: 10,
    clubDues: '$135.75',
    swimmingCanadaDues: '$0.00',
    totalCost: '$135.75',
    notes: '$135.75 club (Swimming Canada paid)',
  },
];

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
    { name: 'Annual membership (Period 1)', price: '$400.00', detail: '$339.75 club dues + $60.25 Swimming Canada dues. 109 scheduled swims.' },
    { name: 'Student annual membership (Period 1)', price: '$230.00', detail: '50% student discount on annual dues ($169.75 club + $60.25 Swimming Canada).' },
    { name: '10 Punch Pass (1st booklet)', price: '$196.00', detail: '10 swims. $135.75 club dues + $60.25 Swimming Canada dues. Valid through Aug 31, 2027.' },
    { name: '10 Punch Pass (subsequent booklets)', price: '$135.75', detail: '10 swims. $135.75 club dues. Swimming Canada registration already paid.' },
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
