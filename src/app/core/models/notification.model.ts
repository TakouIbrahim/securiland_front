export interface AppNotification {
  id: string;
  type: string;
  message: string;
  readFlag: boolean;
  channel: 'EMAIL' | 'SMS' | 'EMAIL_SMS';
  sentAt: string;
}
