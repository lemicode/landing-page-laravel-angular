import { AbstractControl, ValidationErrors } from '@angular/forms';

// Custom validator to ensure the value is not 0
export function notZeroValidator(control: AbstractControl): ValidationErrors | null {
  return control.value === 0 ? { notZero: true } : null;
}