import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';
import { ApiResponse } from '../models/api-response.model';
import { Payment, PaymentProvider, PaymentReferenceType } from '../models/payment.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}

  initiate(
    referenceId: string,
    referenceType: PaymentReferenceType,
    amount: number,
    provider: PaymentProvider
  ): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(`${API_BASE_URL}/payments`, {
      referenceId,
      referenceType,
      amount,
      provider,
    });
  }

  mine(): Observable<ApiResponse<Payment[]>> {
    return this.http.get<ApiResponse<Payment[]>>(`${API_BASE_URL}/payments/mine`);
  }
}
