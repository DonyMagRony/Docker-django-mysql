import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  BASE_URL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}


  getUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/app/users/`);
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/app/users/${id}/`);
  }

  createUser(data: User): Observable<any> {
    return this.http.post(`${this.BASE_URL}/app/users/`,data);  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/app/users/${id}/`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/app/users/${id}/`);
    
  }

  getUserStores(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}stores/${id}/`);
  }
}
