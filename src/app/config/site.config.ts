export type Theme = 'dark' | 'light';
export type Culture = 'el' | 'en';

export const SITE_CONFIG = {
  api: {
    baseUrl: 'https://cafebarrestaurantapi-gjagh7csarhjaxd7.italynorth-01.azurewebsites.net',
    market: 'CoffeeMinimal',
  },
  theme: {
    default: 'dark' as Theme,
    colors: {
      dark: {
        background: '#1a0f0a',
        surface: '#261710',
        surfaceAlt: '#33200f',
        text: '#f5e6d3',
        textMuted: 'rgba(245,230,211,0.5)',
        accent: '#c8a060',
        accentHover: '#e0b870',
        border: 'rgba(200,160,96,0.2)',
        navBg: 'rgba(26,15,10,0.97)',
        overlay: 'rgba(26,15,10,0.65)',
      },
      light: {
        background: '#faf5ef',
        surface: '#ffffff',
        surfaceAlt: '#f0e8da',
        text: '#1a0f0a',
        textMuted: 'rgba(26,15,10,0.5)',
        accent: '#8b5e3c',
        accentHover: '#6b4020',
        border: 'rgba(139,94,60,0.2)',
        navBg: 'rgba(250,245,239,0.97)',
        overlay: 'rgba(250,245,239,0.65)',
      },
    },
  },
  images: {
    hero: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80',
    about: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=70',
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=70',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=70',
    ],
  },
  business: {
    name: 'Coffee Minimal',
    address: 'Εφέσου 12, Κεφαλάρι, Αθήνα',
    addressEn: '12 Efesou St, Kefalari, Athens',
    phone: '+30 210 623 4567',
    email: 'hello@coffeeminimal.gr',
    hours: 'Δευτ–Παρ 07:00–22:00 · Σαββ–Κυρ 08:00–22:00',
    hoursEn: 'Mon–Fri 07:00–22:00 · Sat–Sun 08:00–22:00',
    social: { instagram: 'https://www.instagram.com/coffeeminimal.athens', facebook: 'https://www.facebook.com/coffeeminimal' },
  },
  reservation: {
    defaultTime: '09:00',
    defaultPartySize: 2,
  },
  location: {
    lat: 37.8890,
    lng: 23.7441,
    zoom: 15,
    mapsUrl: 'https://www.google.com/maps?q=37.8890,23.7441',
  },
};
