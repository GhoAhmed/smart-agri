import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  id: string;
  email: string;
  role: 'farmer' | 'admin';
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:3000/api';
  private readonly TOKEN_KEY = 'agri_token';

  private currentUserSubject = new BehaviorSubject<DecodedToken | null>(
    this.loadUser(),
  );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(data: {
    username: string;
    email: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${this.API}/register`, data);
  }

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<string>(`${this.API}/login`, { email, password })
      .pipe(tap((token) => this.saveToken(token)));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get currentUser(): DecodedToken | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    const user = this.currentUser;
    if (!user) return false;
    return user.exp * 1000 > Date.now();
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  get isFarmer(): boolean {
    return this.currentUser?.role === 'farmer';
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    const decoded = jwtDecode<DecodedToken>(token);
    this.currentUserSubject.next(decoded);
  }

  private loadUser(): DecodedToken | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) return null;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem(this.TOKEN_KEY);
        return null;
      }
      return decoded;
    } catch {
      return null;
    }
  }
}
