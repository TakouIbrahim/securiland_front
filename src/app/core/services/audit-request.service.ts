import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';
import { ApiResponse } from '../models/api-response.model';
import { AuditRequest, SubmitAuditRequest } from '../models/audit-request.model';

@Injectable({ providedIn: 'root' })
export class AuditRequestService {
  constructor(private http: HttpClient) {}

  submit(payload: SubmitAuditRequest): Observable<ApiResponse<AuditRequest>> {
    return this.http.post<ApiResponse<AuditRequest>>(`${API_BASE_URL}/audits`, payload);
  }

  mine(): Observable<ApiResponse<AuditRequest[]>> {
    return this.http.get<ApiResponse<AuditRequest[]>>(`${API_BASE_URL}/audits/mine`);
  }

  getOne(id: string): Observable<ApiResponse<AuditRequest>> {
    return this.http.get<ApiResponse<AuditRequest>>(`${API_BASE_URL}/audits/${id}`);
  }

  cancel(id: string, reason?: string): Observable<ApiResponse<AuditRequest>> {
    const q = reason ? `?reason=${encodeURIComponent(reason)}` : '';
    return this.http.post<ApiResponse<AuditRequest>>(`${API_BASE_URL}/audits/${id}/cancel${q}`, {});
  }
}
