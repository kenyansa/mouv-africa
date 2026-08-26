import { getStoredSession, setStoredSession } from './token';
import type { AuthPayload, Listing, ListingsPayload, RawListing } from './types';

const API_BASE = import.meta.env.PROD ? '/api/core' : import.meta.env.VITE_CORE_URL || '/api/core';
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDJOxxdZLjMIzPhJPIhGtM6BQE0TQ53ZA0';

const AUTH_REFRESH_BUFFER_MS = 60_000;

async function authHeaders(): Promise<HeadersInit> {
  const session = await refreshSessionIfNeeded();
  const skey = session?.token || import.meta.env.VITE_SKEY;
  return {
    'Content-Type': 'application/json',
    ...(skey ? { SKEY: skey } : {}),
  };
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80';

export async function getListings(): Promise<Listing[]> {
  try {
    const response = await fetch(`${API_BASE}/listClientListings`, {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify({ status: 'ACTIVE' }),
    });

    if (!response.ok) {
      throw new Error('Listings unavailable');
    }

    const payload = (await response.json()) as ListingsPayload;
    const records = Array.isArray(payload.Payload) ? payload.Payload : [];

    return records.map((item, index) => normalizeListing(item, index));
  } catch (err) {
    console.error('getListings failed:', err);
    return [];
  }
}

export async function searchListings(searchTerm: string): Promise<Listing[]> {
  if (!searchTerm.trim()) return getListings();

  try {
    const response = await fetch(`${API_BASE}/listClientListings`, {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify({
        fieldsToSearchFor: [
          { field: 'description' },
          { field: 'furnishStatus' },
          { field: 'listingStatus' },
          { field: 'name' },
          { field: 'city' },
          { field: 'location' },
          { field: 'type' },
        ],
        searchTerm: searchTerm.trim(),
      }),
    });

    if (!response.ok) {
      throw new Error('Search unavailable');
    }

    const payload = (await response.json()) as ListingsPayload;
    const records = Array.isArray(payload.Payload) ? payload.Payload : [];
    const normalized = records.map((item, index) => normalizeListing(item, index));
    const term = searchTerm.trim().toLowerCase();

    return filterListings(normalized, term);
  } catch (error) {
    console.error('searchListings failed:', error);
    return [];
  }
}

export async function getListingDetails(id: string): Promise<Listing> {
  try {
    const response = await fetch(`${API_BASE}/listClientListings`, {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify({ _id: id }),
    });

    if (!response.ok) {
      throw new Error('Listing unavailable');
    }

    const payload = (await response.json()) as ListingsPayload;
    const record = payload.Payload?.[0];

    if (!record) {
      return createGenericListing(id);
    }

    return normalizeListing(record, 0);
  } catch (err) {
    console.error('getListingDetails failed:', err);
    return createGenericListing(id);
  }
}

export async function getUserDetails(): Promise<unknown> {
  const response = await fetch(`${API_BASE}/getuserdetails`, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify({}),
  });
  if (!response.ok) throw new Error('Unable to fetch user details');
  return response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    }
  );
  const payload = (await response.json()) as AuthPayload;
  if (!response.ok) {
    throw new Error(
      payload.error?.message?.replaceAll('_', ' ').toLowerCase() || 'Unable to sign in'
    );
  }

  if (!payload.idToken) {
    throw new Error('Firebase did not return a session token');
  }

  const session = {
    email: payload.email,
    token: payload.idToken,
    id: payload.localId,
    refreshToken: payload.refreshToken,
    expiresAt: Date.now() + Number(payload.expiresIn || 3600) * 1000,
  };
  setStoredSession(session);
  return session;
}

async function refreshSessionIfNeeded() {
  const session = getStoredSession();
  if (!session?.refreshToken || !session.expiresAt) return session;
  if (session.expiresAt - Date.now() > AUTH_REFRESH_BUFFER_MS) return session;

  const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: session.refreshToken,
    }),
  });

  if (!response.ok) {
    setStoredSession(null);
    return null;
  }

  const payload = (await response.json()) as {
    id_token: string;
    refresh_token: string;
    expires_in: string;
    user_id?: string;
  };
  const refreshedSession = {
    ...session,
    token: payload.id_token,
    refreshToken: payload.refresh_token,
    id: payload.user_id || session.id,
    expiresAt: Date.now() + Number(payload.expires_in || 3600) * 1000,
  };
  setStoredSession(refreshedSession);
  return refreshedSession;
}

export async function logout() {
  setStoredSession(null);
  return Promise.resolve();
}

function normalizeListing(item: RawListing, index: number): Listing {
  return {
    id: item._id || `listing-${index}`,

    name: item.name?.trim() || 'Mouv stay',

    city: item.location?.cityTown || item.location?.neighborhood || 'Africa',

    type: item.propertyType?.name || item.listingType?.productType || 'Apartment',

    tag:
      item.listingStatus === 'RENT'
        ? 'For rent'
        : item.status === 'ACTIVE'
          ? 'Featured stay'
          : 'Stay',

    price: item.pricing?.nightlyPrice ?? item.premium?.basicPremium ?? 85,

    rating: item.rating !== undefined ? String(item.rating) : '4.8',

    guests: item.details?.maxGuests ?? 2,

    beds: item.details?.bedrooms ?? 1,

    image: item.images?.find((image) => image.url)?.url || FALLBACK_IMAGE,

    description:
      item.description || 'A considered place to land, with everything you need for a good stay.',
  };
}

function createGenericListing(id: string): Listing {
  return {
    id,
    name: 'Mouv stay',
    city: 'Africa',
    type: 'Apartment',
    tag: 'Featured stay',
    price: 85,
    rating: '4.8',
    guests: 2,
    beds: 1,
    image: FALLBACK_IMAGE,
    description: 'A considered place to land, with everything you need for a good stay.',
  };
}

function filterListings(listings: Listing[], term: string): Listing[] {
  return listings.filter((listing) =>
    `${listing.name} ${listing.city} ${listing.type} ${listing.tag} ${listing.description}`
      .toLowerCase()
      .includes(term)
  );
}
