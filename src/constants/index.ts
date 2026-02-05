import { Mutawif } from '@/types';

// Mock Mutawif data for demos
export const MOCK_MUTAWIFS: Mutawif[] = [
  {
    id: '1',
    name: 'Mutawif Ahmad Hafiz',
    rating: 4.9,
    reviews: 120,
    languages: ['Malay', 'Arabic', 'English'],
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA90ZcMwPFfzvL2purVvTWeTxPAuxS0bHFafJ-wUmi4rQJIXDFDrR3s9dxruWwqJoO2S-SjhvRRdFLnh7a27lCF_pe0YTk94Ib64ouRZ2mAjhQQxWrfHL9-77Q3MLEtKmL1GuwqotrQ4J5g_QLraH5dHeLquh_3lfVOMFG5hnKkTPSgL799j6FxtQgiqgj-FSS4-Cau4BQ-ySB10S5AQHqshlXNiiEzYuy7zyRJz98Nb4RdRj016yu1cXlbK8oeAHmxsLCKc-8OOb0T',
    estimatedArrival: '5 mins',
    distance: '1.2 km',
    isOfficial: true,
  },
  {
    id: '2',
    name: 'Sheikh Abdullah',
    rating: 4.8,
    reviews: 98,
    languages: ['Arabic', 'English', 'Urdu'],
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARLVH5dF4q-0v5YvBGuBrZlLb8ZdmLjldt_Vkxnk-zHe3L4UCzlWUNjA9U3E1GHC-MDoKy12ZhAo9W3jTEZ8D4nKUJVTotjVOnUyTIM5zmFrwpe-0_Eq7RVXJM9EXEQUrdm5lxsfMKdkGs2ZU8ib2tec-PuHY9YJagjPXwwpZ5x4LuHBXycDzZmFW1jbcdE042ruzDvjaqUj5HyH6r2zi3klVzozSVzZ_7s3gAldFSS95auIFKGqNF9x3BT8V8hSsau5E4zQ1BkAhk',
    estimatedArrival: '8 mins',
    distance: '2.1 km',
    isOfficial: true,
  },
  {
    id: '3',
    name: 'Ustaz Ibrahim',
    rating: 4.95,
    reviews: 215,
    languages: ['Arabic', 'English', 'Turkish'],
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeJYY3W9gGhP1qvwsSOLCrn75O8plTzCLZV7X6Ev8mUGmNCLkEDR92n1oaOx_z2KE4Amx8NYh5trwTYCpSI6Hune5G7-qRpIh1-xgnBFoxDMumOXG74KGmRWTctuLHriZLIqnH52i23dzUbsIsb1QYhYFBwM1sshIMGiqqPrnAX-GqBQLEWBl580z8TPjmbWWNtuuMiCIMs1z-qKDG714xwq7ZZbh9eU60ctZfFCev2Am4EXVl2y7EDXs4pNObll6T9PcmbJ6VRfLb',
    estimatedArrival: '3 mins',
    distance: '0.8 km',
    isOfficial: true,
  },
];

// Cancellation reason labels
export const CANCELLATION_REASONS = {
  TOO_FAR: 'Mutawif is too far away',
  CHANGE_OF_PLANS: 'Change of plans',
  FOUND_ALTERNATIVE: 'Found another service',
  PRICE_ISSUE: 'Price is too high',
  OTHER: 'Other reason',
};

// Available languages
export const AVAILABLE_LANGUAGES = [
  'Arabic',
  'English',
  'Malay',
  'Indonesian',
  'Urdu',
  'Turkish',
  'French',
  'Bengali',
];

// Special assistance options
export const SPECIAL_ASSISTANCE_OPTIONS = [
  'Wheelchair assistance',
  'Elderly care',
  'First-time pilgrim guidance',
  'Medical support nearby',
  'Child-friendly pace',
];

// Quick actions for dashboard
export const QUICK_ACTIONS = [
  { icon: 'calendar_month', label: 'Set Availability', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: 'event_available', label: 'Schedule', color: 'text-sky-500', bg: 'bg-sky-500/10' },
  { icon: 'analytics', label: 'Performance', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: 'support_agent', label: 'Support', color: 'text-amber-500', bg: 'bg-amber-500/10' },
];

// Google Maps custom styling (dark theme)
export const MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#102219' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#102219' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#7aa08d' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1a2c22' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8ab5a0' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#07100c' }] },
];
