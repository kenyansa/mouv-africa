import { Listing, ListingsPayload, RawListing, AuthPayload } from './types';

const API_BASE = import.meta.env.VITE_CORE_URL || 'https://app.mconnect.africa/core';
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDJOxxdZLjMIzPhJPIhGtM6BQE0TQ53ZA0';

export const demoListings: Listing[] = [
  {
    id: '1',
    name: 'The Green Courtyard',
    city: 'Kigali, Rwanda',
    type: 'Villa',
    tag: 'Guest favorite',
    price: 84,
    rating: '4.94',
    guests: 4,
    beds: 2,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    description:
      'A sun-filled courtyard home tucked into one of Kigali’s quietest, greenest neighborhoods.',
  },
  {
    id: '2',
    name: 'Palm & Sea Studio',
    city: 'Dakar, Senegal',
    type: 'Apartment',
    tag: 'Near the ocean',
    price: 62,
    rating: '4.88',
    guests: 2,
    beds: 1,
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85',
    description: 'A calm, tactile studio where the city and Atlantic breeze meet at your doorstep.',
  },
  {
    id: '3',
    name: 'Little Baobab House',
    city: 'Accra, Ghana',
    type: 'Villa',
    tag: 'Design pick',
    price: 118,
    rating: '4.91',
    guests: 6,
    beds: 3,
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
    description:
      'An easygoing modern home with a private garden, warm materials, and room to gather.',
  },
  {
    id: '4',
    name: 'Safi House',
    city: 'Marrakech, Morocco',
    type: 'Apartment',
    tag: 'New on mouv',
    price: 97,
    rating: '4.86',
    guests: 3,
    beds: 2,
    image:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85',
    description:
      'A quiet riad-inspired retreat filled with light, texture, and the scent of citrus.',
  },
  {
    id: '5',
    name: 'The Coastline Room',
    city: 'Mombasa, Kenya',
    type: 'Apartment',
    tag: 'Beachfront',
    price: 76,
    rating: '4.9',
    guests: 2,
    beds: 1,
    image:
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85',
    description: 'Wake up to the Indian Ocean in this simple, breezy room steps from the sand.',
  },
  {
    id: '6',
    name: 'Kivu Slow House',
    city: 'Gisenyi, Rwanda',
    type: 'Villa',
    tag: 'Slow travel',
    price: 135,
    rating: '4.97',
    guests: 5,
    beds: 3,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    description: 'A lakeside hideaway made for long breakfasts, deep breaths, and slower mornings.',
  },
];

export async function getListings() {
  try {
    const response = await fetch(`${API_BASE}/listClientListings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(import.meta.env.VITE_SKEY ? { SKEY: import.meta.env.VITE_SKEY } : {}),
      },
      body: JSON.stringify({ status: 'ACTIVE' }),
    });
    if (!response.ok) throw new Error('Listings unavailable');
    const payload = (await response.json()) as ListingsPayload | RawListing[];
    const records = Array.isArray(payload) ? payload : payload.data || payload.listings || [];
    return Array.isArray(records) && records.length
      ? records.map((item, index) => normalizeListing(item, index))
      : demoListings;
  } catch {
    return demoListings;
  }
}

export async function login(email: string, password: string) {
  const response = await fetch(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );
  const payload = (await response.json()) as AuthPayload;
  if (!response.ok)
    throw new Error(
      payload.error?.message?.replaceAll('_', ' ').toLowerCase() || 'Unable to sign in'
    );
  return { email: payload.email, token: payload.idToken, id: payload.localId };
}

export async function logout() {
  return Promise.resolve();
}
function normalizeListing(item: RawListing, index: number): Listing {
  return {
    ...item,
    id: item._id || item.id || `listing-${index}`,
    name: item.name || item.title || 'Mouv stay',
    city: item.city || item.location || 'Africa',
    type: item.type || 'Apartment',
    tag: item.tag || 'Featured stay',
    price: item.price || item.pricePerNight || 85,
    rating: item.rating || '4.8',
    guests: item.guests || item.maxGuests || 2,
    beds: item.beds || 1,
    image: item.image || item.images?.[0] || demoListings[0].image,
    description:
      item.description || 'A considered place to land, with everything you need for a good stay.',
  };
}
