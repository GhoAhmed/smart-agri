import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'farmer' | 'admin';
  isActive: boolean;
}

export interface Valve {
  _id: string;
  name: string;
  location: string;
  isOpen: boolean;
  notes: string;
  owner: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly API = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) {}

  getUsers(filters?: {
    role?: string;
    isActive?: string;
    search?: string;
  }): Observable<User[]> {
    let params = new HttpParams();
    if (filters?.role) params = params.set('role', filters.role);
    if (filters?.isActive !== undefined)
      params = params.set('isActive', filters.isActive);
    if (filters?.search) params = params.set('search', filters.search);
    return this.http.get<User[]>(`${this.API}/users`, { params });
  }

  toggleActive(id: string): Observable<any> {
    return this.http.patch(`${this.API}/users/${id}/toggle-active`, {});
  }

  changeRole(id: string, role: string): Observable<any> {
    return this.http.patch(`${this.API}/users/${id}/role`, { role });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.API}/users/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class ValveService {
  private readonly API = 'http://localhost:3000/api/valves';

  constructor(private http: HttpClient) {}

  getValves(): Observable<Valve[]> {
    return this.http.get<Valve[]>(this.API);
  }

  createValve(data: Partial<Valve>): Observable<any> {
    return this.http.post(this.API, data);
  }

  toggleValve(id: string): Observable<any> {
    return this.http.patch(`${this.API}/${id}/toggle`, {});
  }

  updateValve(id: string, data: Partial<Valve>): Observable<any> {
    return this.http.put(`${this.API}/${id}`, data);
  }

  deleteValve(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
