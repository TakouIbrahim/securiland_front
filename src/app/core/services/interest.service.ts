import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';
import { ApiResponse } from '../models/api-response.model';
import { Interest } from '../models/interest.model';

@Injectable({ providedIn: 'root' })
export class InterestService {
  constructor(private http: HttpClient) {}

  express(listingId: string): Observable<ApiResponse<Interest>> {
    return this.http.post<ApiResponse<Interest>>(`${API_BASE_URL}/interests/listings/${listingId}`, {});
  }

  withdraw(listingId: string, reason?: string): Observable<ApiResponse<Interest>> {
    const q = reason ? `?reason=${encodeURIComponent(reason)}` : '';
    return this.http.post<ApiResponse<Interest>>(`${API_BASE_URL}/interests/listings/${listingId}/withdraw${q}`, {});
  }

  mine(): Observable<ApiResponse<Interest[]>> {
    return this.http.get<ApiResponse<Interest[]>>(`${API_BASE_URL}/interests/mine`);
  }
}
