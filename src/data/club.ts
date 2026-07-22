export const club = {
  calendarEmbedUrl: 'https://calendar.google.com/calendar/embed?src=differentstrokesyyc%40gmail.com&ctz=America%2FEdmonton&color=%230087E2&bgcolor=%23FFFFFF&showTitle=0&showPrint=0&showCalendars=0&showTz=0',
  calendarOpenUrl: 'https://calendar.google.com/calendar/u/1?cid=ZGlmZmVyZW50c3Ryb2tlc3l5Y0BnbWFpbC5jb20',
  joinUrl: '',
  contactUrl: '',
  merchStoreUrl: 'https://stores.freshbrandgear.com/Different_Strokes_Calgary/shop/home',
  practices: [
    { day: 'Wed', time: '6:00 PM', place: 'MNP Community & Sports Centre', level: 'Intermediate / Advanced' },
    { day: 'Fri', time: '6:00 PM', place: 'MNP Community & Sports Centre', level: 'All levels' },
    { day: 'Sun', time: '9:00 AM', place: 'Bowview Outdoor Pool', level: 'All levels' },
  ],
  winterPractices: [
    { day: 'Fri', time: '6:00 PM', place: 'MNP Community & Sports Centre', level: 'Beginners' },
    { day: 'Fri', time: '7:30 PM', place: 'Killarney Aquatic & Recreation Centre', level: 'Intermediate / Advanced' },
    { day: 'Sun', time: '6:00 PM', place: 'MNP Community & Sports Centre', level: 'All levels' },
  ],
  fees: [
    { name: 'Annual pass', price: '$380', detail: 'September 2025–August 2026 · Swim Alberta registration and GST included.' },
    { name: '10-practice pass', price: '$169', detail: 'Use within 12 months. Later 10-practice passes in the same season cost $110.' },
    { name: 'Student annual pass', price: '$220', detail: 'For current students with valid ID. Swim Alberta registration and GST included.' },
  ],
};

export const isConfigured = (url: string) => /^https?:\/\//.test(url);
