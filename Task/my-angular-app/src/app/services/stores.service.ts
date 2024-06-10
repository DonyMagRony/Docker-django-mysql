import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  BASE_URL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}


  getStores(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/app/stores/`);}

  getStore(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/app/stores/${id}/`);}
  
  createStore(data: { name: string; location: number | null }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/app/stores/`, data)}
  
  updateStore(id: number, data: any): Observable<any> {
    return this.http.put(`${this.BASE_URL}/app/stores/${id}/`, data);}
  
  deleteStore(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/app/stores/${id}/`);}

}
