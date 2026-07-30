export type CertificationStatus = 'CERTIFIEE' | 'EXPIREE' | 'REVOQUEE' | 'NON_CERTIFIEE';
export type ListingStatus =
  | 'BROUILLON'
  | 'EN_ATTENTE_VALIDATION'
  | 'EN_MODERATION'
  | 'ACTIVE'
  | 'REJETEE'
  | 'DESACTIVEE'
  | 'SUSPENDUE';

export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  titleType: string;
  surfaceArea?: number;
  certificationStatus: CertificationStatus;
  status: ListingStatus;
  boosted: boolean;
  viewCount: number;
  createdAt: string;
  imageUrl?: string;
}

export interface CreateListingRequest {
  title: string;
  description: string;
  price: number;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  titleType: string;
  surfaceArea?: number;
  videoUrl?: string;
}

export interface ListingSearchParams {
  city?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
  certifiedOnly?: boolean;
  page?: number;
  size?: number;
}
