export type InterestStatus = 'ACTIF' | 'RETIRE';

export interface Interest {
  id: string;
  listingId: string;
  buyerId: string;
  status: InterestStatus;
  withdrawalReason?: string;
  createdAt: string;
}
