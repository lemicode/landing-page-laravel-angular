import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CustomerModel } from '../../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/customers`);
  }

  createCustomer(customer: CustomerModel): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/customers`,
      JSON.stringify(customer),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  selectWinner(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/customers/winner`);
  }

  downloadExcel(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/departments/excel`, {
      responseType: 'blob',
    });
  }
}
