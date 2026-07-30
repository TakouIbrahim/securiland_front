export type Role =
  | 'ROLE_USER'
  | 'ROLE_PREMIUM'
  | 'ROLE_SELLER'
  | 'ROLE_PRO'
  | 'ROLE_TECHNICIAN'
  | 'ROLE_ADMIN';

export type SubscriptionPlan = 'GRATUIT' | 'PREMIUM_ACHETEUR' | 'PREMIUM_PRO';
export type KycStatus = 'NON_SOUMIS' | 'EN_ATTENTE' | 'VERIFIE' | 'REJETE';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  diaspora: boolean;
  role: Role;
  subscriptionPlan: SubscriptionPlan;
  kycStatus: KycStatus;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  email: string;
  role: Role;
}
