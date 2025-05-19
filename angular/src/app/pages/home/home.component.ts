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
import { WinnerComponent } from '../../shared/components/winner/winner.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    WinnerComponent,
    NgbToastModule,
    NgbTooltipModule,
    ToastComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  [key: string]: any;

  /** List of departments loaded from the backend. */
  departments: Department[] = [];

  /** List of cities based on the selected department. */
  cities: City[] = [];

  /** Reactive form for customer registration. */
  customerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
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
    private cityService: CityService,
    private toastService: ToastService
  ) {}

  /** Initializes the component by loading departments. */
  ngOnInit() {
    this.getDepartments();
  }

  /** Fetches the list of departments from the backend. */
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

  /** Fetches the list of cities based on the selected department. */
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

  /** Downloads Excel files for customers, departments, and cities. */
  downloadExcel() {
    const services = {
      customers: this.customerService,
      departments: this.departmentService,
      cities: this.cityService,
    };
    Object.entries(services).forEach(([key, service]) => {
      service.downloadExcel().subscribe({
        next: (blob: Blob) => {
          this.restoreFile(blob, `${key}.xlsx`);
        },
        error: (err: any) => {
          console.error(`Error al descargar el archivo ${key}.xlsx:`, err);
        },
      });
    });
  }

  /** Restores a file from a Blob object. */
  restoreFile(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /** Handles form submission to create a new customer. */
  handleSubmit() {
    if (this.customerForm.valid) {
      const customer = new CustomerModel(this.customerForm.getRawValue());
      this.customerService.createCustomer(customer).subscribe({
        next: () => {
          this.showToast();
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

  showToast(message: string = '¡Concursante registrado con éxito!') {
    this.toastService.show(message, 'bg-success text-light');
  }
}
