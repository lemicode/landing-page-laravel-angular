import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  downloadExcel(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/cities/excel`, {
      responseType: 'blob',
    });
  }
}
