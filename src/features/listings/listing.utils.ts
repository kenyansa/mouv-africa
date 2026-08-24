import type { Listing, ListingCategory } from './listing.types';

export const LISTING_CATEGORIES: ListingCategory[] = [
  'All stays',
  'Apartments',
  'Villas',
  'Beachfront',
  'Workspaces',
];

const CATEGORY_TYPE_MAP: Record<Exclude<ListingCategory, 'All stays'>, string> = {
  Apartments: 'Apartment',
  Villas: 'Villa',
  Beachfront: 'Beachfront',
  Workspaces: 'Workspace',
};

export function filterByCategory(listings: Listing[], category: ListingCategory): Listing[] {
  if (category === 'All stays') return listings;
  return listings.filter((place) => place.type === CATEGORY_TYPE_MAP[category]);
}
