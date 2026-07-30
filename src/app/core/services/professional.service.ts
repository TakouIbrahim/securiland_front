import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';
import { ApiResponse } from '../models/api-response.model';
import { Professional, ProfessionalType } from '../models/professional.model';

@Injectable({ providedIn: 'root' })
export class ProfessionalService {
  constructor(private http: HttpClient) {}

  search(type?: ProfessionalType, city?: string): Observable<ApiResponse<Professional[]>> {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (city) params.set('city', city);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.http.get<ApiResponse<Professional[]>>(`${API_BASE_URL}/professionals${query}`);
  }
}
