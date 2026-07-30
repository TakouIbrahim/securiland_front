import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';
import { ApiResponse } from '../models/api-response.model';
import { ChatMessage } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  constructor(private http: HttpClient) {}

  send(listingId: string, receiverId: string, content: string): Observable<ApiResponse<ChatMessage>> {
    return this.http.post<ApiResponse<ChatMessage>>(`${API_BASE_URL}/messages`, { listingId, receiverId, content });
  }

  conversation(listingId: string, withUserId: string): Observable<ApiResponse<ChatMessage[]>> {
    return this.http.get<ApiResponse<ChatMessage[]>>(
      `${API_BASE_URL}/messages/conversation?listingId=${listingId}&withUserId=${withUserId}`
    );
  }

  unread(): Observable<ApiResponse<ChatMessage[]>> {
    return this.http.get<ApiResponse<ChatMessage[]>>(`${API_BASE_URL}/messages/unread`);
  }
}
