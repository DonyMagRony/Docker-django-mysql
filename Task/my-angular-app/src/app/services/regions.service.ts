import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../models';
@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  BASE_URL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<any> {
    return this.http.get<Region[]>(`${this.BASE_URL}/app/regions/`);
  }

  getRegion(id: number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/app/regions/${id}/`);
  }

  createRegion(data: { name: string; location: number | null }): Observable<any> { // Adjusted parameter type
    return this.http.post(`${this.BASE_URL}/app/regions/`, data);
  }

  updateRegion(id:number,data: { name: string; location: number | null }): Observable<any> {
    return this.http.put(`${this.BASE_URL}/app/regions/${id}/`, data);
  }

  deleteRegion(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/app/regions/${id}/`);
  }
}
