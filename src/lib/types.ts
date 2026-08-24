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

export interface RawListing {
  _id?: string;
  name?: string;
  description?: string;

  status?: string;
  rating?: number;
  product?: string;
  listingStatus?: string;

  listingType?: {
    product?: string;
    productType?: string;
    productStatus?: string;
  };

  propertyType?: {
    _id?: string;
    name?: string;
    listingType?: {
      _id?: string;
      name?: string;
      description?: string;
      _timestamp?: number;
    };
  };

  loadingAmounts?: Array<{
    name?: string;
    isAmount?: boolean;
    amount?: number;
  }>;

  statutoryPremiums?: Array<{
    name?: string;
    isAmount?: boolean;
    amount?: number;
  }>;

  premium?: {
    amenities?: Array<{
      group?: string;
      name?: string;
      amount?: number;
      isAmount?: boolean;
      pricingPeriod?: string;
      isFree?: boolean;
    }>;

    discounts?: Array<{
      name?: string;
      value?: string;
      isAmount?: boolean;
      amount?: number;
      isWeekendOnly?: boolean;
    }>;

    loadingAmounts?: Array<{
      name?: string;
      isAmount?: boolean;
      amount?: number;
    }>;

    statutoryPremiums?: Array<{
      name?: string;
      isAmount?: boolean;
      amount?: number;
    }>;

    basicPremium?: number;
  };

  organisationId?: string;

  _timestamp?: number;
  _utimestamp?: number;

  internalCode?: string;

  landSize?: string;
  soilType?: string;
  totalArea?: string;

  geoLocation?: {
    type?: string;
    coordinates?: number[];
  };

  location?: {
    streetAddress?: string;
    buildingName?: string;
    totalFloors?: string;
    cityTown?: string;
    neighborhood?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    countyState?: string;
    subCounty?: string;
    ward?: string;

    locationFeatures?: string[];

    locationUpdateCount?: number;
  };

  details?: {
    bedrooms?: number;
    bathrooms?: number;
    halfBathrooms?: number;

    garages?: string;
    maxGuests?: number;

    listingFloor?: number;
    elevatorAccess?: string;
    wheelchairAccessible?: string;

    privateBathroom?: boolean;
    outdoorSpace?: boolean;

    spaceType?: string;
    guestCapacity?: string;
    stageAvailability?: string;
    lightingType?: string;
    soundSystem?: string;
    wifi?: string;
    parkingSpace?: string;
    powerSupply?: string;
    powerBackup?: string;
    waterSupply?: string;
    noiseLevelCompliance?: string;
    airConditioning?: string;
    security?: string;
    partitioning?: string;
    washroom?: string;
    carAccess?: string;
    storageSecurity?: string;
    landingBay?: string;
    unitSize?: string;
    accessibilityHours?: string;
    insurance?: string;
    restrooms?: string;
    storageAirConditioning?: string;

    petsAllowed?: string;
    smokingAllowed?: string;
    eventsAllowed?: string;
    noCommercialPhotography?: string;

    houseRules?: string[];
  };

  freeAmenities?: Array<{
    group?: string;
    data?: string[];
    bedType?: string;
  }>;

  currency?: {
    _id?: string;
    currencyCode?: string;
    name?: string;
    prefix?: string;
    conversionRate?: number;
  };

  refundPolicy?: {
    policy?: string;

    partialOptions?: {
      seventyFive?: boolean;
      fifty?: boolean;
      twentyFive?: boolean;
    };
  };

  checkIn?: string;
  checkOut?: string;

  pricing?: {
    nightlyPrice?: number;
    weekendPrice?: number;
    taxIncluded?: boolean;
  };

  remarks?: string;

  approvalBy?: {
    email?: string;
    firstName?: string;
    username?: string;
    lastName?: string;
    telephone1?: string;
    telephone2?: string | null;
    organisationId?: string | null;
  };

  approvalByfeduid?: string;
  approvalByid?: string;

  organisation?: {
    _id?: string;
    status?: string;
    remarks?: string;
    accountType?: string;
    firstName?: string;
    postalAddress?: string;
    telephone1?: string;
    telephone2?: string | null;
    username?: string;
    lastName?: string;
    email?: string;
    uid?: string;

    location?: {
      _id?: string | null;
      name?: string;
      locationName?: string | null;
      imageUrl?: string | null;
    };

    active?: boolean;
    approved?: boolean;
    feduid?: string;
    _timestamp?: number;
    accountVerified?: boolean;
    verificationMedium?: string;
    language?: string;
    phoneNumber?: string;
    countryOfResidence?: string;
    dob?: string;
    documentType?: string;

    faceCaptureImageUrl?: string;
    idNumber?: string;
    idPhotoBack?: string;
    idPhotoFront?: string;

    name?: string;
    organisationId?: string;

    isActive?: boolean;

    founder?: {
      email?: string;
      firstName?: string;
      username?: string;
      lastName?: string;
      telephone1?: string;
      telephone2?: string | null;
      idNumber?: string;
    };

    founderfeduid?: string;
    founderid?: string;
    _utimestamp?: number;
  };

  images?: Array<{
    _id?: string;
    listingId?: string;
    name?: string;
    url?: string;
    organisationId?: string;
  }>;
}
//API envelope
export interface ListingsPayload {
  Status: number;
  Message: string;
  Payload: RawListing[];
}

export interface AuthPayload {
  error?: {
    message?: string;
  };
  email?: string;
  idToken?: string;
  localId?: string;
}
