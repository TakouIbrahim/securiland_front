export interface ChatMessage {
  id: string;
  listingId: string;
  senderId: string;
  receiverId: string;
  content: string;
  readFlag: boolean;
  sentAt: string;
}
