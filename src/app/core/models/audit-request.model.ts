export type AuditStatus =
  | 'BROUILLON'
  | 'SOUMIS'
  | 'EN_ATTENTE_PAIEMENT'
  | 'PAYE'
  | 'ASSIGNE'
  | 'EN_TRAITEMENT'
  | 'EN_ATTENTE_COMPLEMENT'
  | 'COMPLETE'
  | 'RAPPORT_EN_COURS'
  | 'RAPPORT_GENERE'
  | 'CLOTURE'
  | 'ANNULE';

export interface AuditRequest {
  id: string;
  titleNumber: string;
  ownerName: string;
  buyerName: string;
  landCity: string;
  landDistrict: string;
  status: AuditStatus;
  technicianId?: string;
  complementReason?: string;
  bornageRequested: boolean;
  neighborhoodSurveyRequested: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubmitAuditRequest {
  titleNumber: string;
  ownerName: string;
  buyerName: string;
  buyerCity?: string;
  landCity: string;
  landDistrict: string;
  gpsLatitude?: number;
  gpsLongitude?: number;
  additionalInfo?: string;
  bornageRequested: boolean;
  neighborhoodSurveyRequested: boolean;
  surveillanceSubscribed: boolean;
}
