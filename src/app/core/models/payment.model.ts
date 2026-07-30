export type PaymentReferenceType = 'AUDIT' | 'LISTING_BOOST' | 'SUBSCRIPTION' | 'PROFESSIONAL_DIRECTORY';
export type PaymentProvider = 'STRIPE' | 'MTN_MOMO' | 'ORANGE_MONEY';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  referenceId: string;
  referenceType: PaymentReferenceType;
  amount: number;
  currency: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  paidAt?: string;
}
