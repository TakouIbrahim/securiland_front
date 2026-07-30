export type ProfessionalType = 'NOTAIRE' | 'GEOMETRE' | 'HUISSIER';

export interface Professional {
  id: string;
  name: string;
  type: ProfessionalType;
  city: string;
  latitude: number;
  longitude: number;
  certifiedFlag: boolean;
  subscriptionActive: boolean;
  rating: number;
  ratingCount: number;
}
