export interface Listing {
  id: string;
  name: string;
  city: string;
  type: string;
  tag: string;
  price: number;
  rating: string;
  guests: number;
  beds: number;
  image: string;
  description: string;
}

export interface RawListing extends Partial<Listing> {
  _id?: string;
  title?: string;
  location?: string;
  pricePerNight?: number;
  maxGuests?: number;
  images?: string[];
}

export interface ListingsPayload {
  data?: RawListing[];
  listings?: RawListing[];
}

export interface AuthPayload {
  error?: { message?: string };
  email?: string;
  idToken?: string;
  localId?: string;
}
