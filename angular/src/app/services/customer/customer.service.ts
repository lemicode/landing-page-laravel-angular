import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Customer } from '../../interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}/customers`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.apiUrl}/customers`, customer);
  }

  selectWinner(): Observable<Customer> {
    return this.http.get<Customer>(`${environment.apiUrl}/customers/winner`);
  }

  downloadExcel(): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/customers/excel`, {
      responseType: 'blob',
    });
  }
}
