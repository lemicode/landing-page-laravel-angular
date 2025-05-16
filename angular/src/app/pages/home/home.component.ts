import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../services/customer/customer.service';
import { DepartmentService } from '../../services/department/department.service';
import { CityService } from '../../services/city/city.service';
import { Department } from '../../interfaces/department.interface';
import { City } from '../../interfaces/city.interface';
import { Observable } from 'rxjs';
import { notZeroValidator } from '../../utils/validators';
import { CustomerModel } from '../../models/customer.model';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  [key: string]: any;

  departments: Department[] = [];
  cities: City[] = [];
  customerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ]),
    identityNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
    ]),
    departmentId: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
      notZeroValidator,
    ]),
    cityId: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
      notZeroValidator,
    ]),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    habeasDataConsent: new FormControl(false, [Validators.requiredTrue]),
  });

  constructor(
    private customerService: CustomerService,
    private departmentService: DepartmentService,
    private cityService: CityService
  ) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data.departments ?? [];
        console.log('Departments loaded successfully', this.departments);
      },
      error: (err) => {
        console.error('Error loading departments', err);
        this.departments = [];
      },
    });
  }

  getCities() {
    if (!this.customerForm.value.departmentId) {
      return;
    }
    this.departmentService
      .getDepartment(this.customerForm.value.departmentId)
      .subscribe({
        next: (data) => {
          this.cities = data.department.cities ?? [];
          console.log('Cities loaded successfully', data.department.cities);
        },
        error: (err) => {
          console.error('Error loading cities', err);
        },
      });
  }

  downloadExcel() {
    const fileNames = ['customers.xlsx', 'departments.xlsx', 'cities.xlsx'];
    const serviceNames = [
      'customerService',
      'departmentService',
      'cityService',
    ];

    for (let serviceName of serviceNames) {
      (this[serviceName] as { downloadExcel: () => Observable<Blob> })
        .downloadExcel()
        .subscribe({
          next: (blob: Blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileNames[serviceNames.indexOf(serviceName)];
            a.click();
            window.URL.revokeObjectURL(url);
          },
          error: (err: any) => {
            console.error('Error al descargar el archivo Excel:', err);
          },
        });
    }
  }

  handleSubmit() {
    if (this.customerForm.valid) {
      const customer = new CustomerModel(this.customerForm.getRawValue());
      this.customerService.createCustomer(customer).subscribe({
        next: () => {
          console.log('Customer created successfully');
        },
        error: (error) => {
          console.error('Error creating customer:', error);
        },
      });
      this.customerForm.reset();
      this.cities = [];
      this.customerForm.get('departmentId')?.setValue(0);
      this.customerForm.get('cityId')?.setValue(0);
    } else {
      this.customerForm.markAllAsTouched();
      console.error('Form is invalid');
    }
  }

  selectWinner() {
    this.customerService.selectWinner().subscribe({
      next: (data) => {
        console.log('Winner selected successfully', data);
      },
      error: (error) => {
        console.error('Error selecting winner:', error);
      },
    });
  }
}
