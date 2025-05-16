import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/departments`);
  }

  getDepartment(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/departments/${id}`);
  }

  downloadExcel(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/departments/excel`, {
      responseType: 'blob',
    });
  }
}
