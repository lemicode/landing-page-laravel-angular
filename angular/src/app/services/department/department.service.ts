import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Department } from '../../interfaces/department.interface';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.apiUrl}/departments`);
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${environment.apiUrl}/departments/${id}`);
  }

  downloadExcel(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/departments/excel`, {
      responseType: 'blob',
    });
  }
}
