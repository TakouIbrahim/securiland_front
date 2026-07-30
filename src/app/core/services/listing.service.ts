import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../api.config';
import { ApiResponse, Page } from '../models/api-response.model';
import { CreateListingRequest, Listing, ListingSearchParams } from '../models/listing.model';

@Injectable({ providedIn: 'root' })
export class ListingService {
  constructor(private http: HttpClient) {}

  search(params: ListingSearchParams): Observable<ApiResponse<Page<Listing>>> {
    let httpParams = new HttpParams()
      .set('page', params.page ?? 0)
      .set('size', params.size ?? 20)
      .set('certifiedOnly', params.certifiedOnly ?? false);

    if (params.city) httpParams = httpParams.set('city', params.city);
    if (params.district) httpParams = httpParams.set('district', params.district);
    if (params.minPrice != null) httpParams = httpParams.set('minPrice', params.minPrice);
    if (params.maxPrice != null) httpParams = httpParams.set('maxPrice', params.maxPrice);

    return this.http.get<ApiResponse<Page<Listing>>>(`${API_BASE_URL}/listings`, { params: httpParams });
  }

  getOne(id: string): Observable<ApiResponse<Listing>> {
    return this.http.get<ApiResponse<Listing>>(`${API_BASE_URL}/listings/${id}`);
  }

  mine(): Observable<ApiResponse<Listing[]>> {
    return this.http.get<ApiResponse<Listing[]>>(`${API_BASE_URL}/listings/mine`);
  }

  create(payload: CreateListingRequest): Observable<ApiResponse<Listing>> {
    return this.http.post<ApiResponse<Listing>>(`${API_BASE_URL}/listings`, payload);
  }

  deactivate(id: string): Observable<ApiResponse<Listing>> {
    return this.http.post<ApiResponse<Listing>>(`${API_BASE_URL}/listings/${id}/deactivate`, {});
  }

  boost(id: string, days: number): Observable<ApiResponse<Listing>> {
    return this.http.post<ApiResponse<Listing>>(`${API_BASE_URL}/listings/${id}/boost?days=${days}`, {});
  }
}
