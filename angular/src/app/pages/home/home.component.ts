import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
    identityNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    departmentId: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    cityId: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    habeasDataConsent: new FormControl(false, [Validators.requiredTrue])
  });

  handleSubmit() {}

  downloadExcel() {}

  selectWinner() {}
}
