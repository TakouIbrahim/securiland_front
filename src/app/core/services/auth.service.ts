import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_BASE_URL } from '../api.config';
import { ApiResponse } from '../models/api-response.model';
import { AuthResponse, Role } from '../models/user.model';

const ACCESS_TOKEN_KEY = 'sl_access_token';
const REFRESH_TOKEN_KEY = 'sl_refresh_token';
const EMAIL_KEY = 'sl_email';
const ROLE_KEY = 'sl_role';

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  diaspora?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Authentification JWT. L'etat de connexion est expose via des signaux Angular
 * afin que toute l'UI (header, sidebar, guards) reagisse instantanement.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly emailSignal = signal<string | null>(localStorage.getItem(EMAIL_KEY));
  private readonly roleSignal = signal<Role | null>(localStorage.getItem(ROLE_KEY) as Role | null);

  readonly isAuthenticated = computed(() => !!this.emailSignal());
  readonly currentEmail = computed(() => this.emailSignal());
  readonly currentRole = computed(() => this.roleSignal());

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: RegisterPayload): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${API_BASE_URL}/auth/register`, payload);
      // .pipe(tap((res) => this.persistSession(res.data)));
  }

  login(payload: LoginPayload): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${API_BASE_URL}/auth/login`, payload)
      .pipe(tap((res) => this.persistSession(res.data)));
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(ROLE_KEY);
    this.emailSignal.set(null);
    this.roleSignal.set(null);
    this.router.navigateByUrl('/');
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  private persistSession(auth: AuthResponse): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, auth.refreshToken);
    localStorage.setItem(EMAIL_KEY, auth.email);
    localStorage.setItem(ROLE_KEY, auth.role);
    this.emailSignal.set(auth.email);
    this.roleSignal.set(auth.role);
  }
}
