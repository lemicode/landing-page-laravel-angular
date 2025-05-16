import { Customer } from '../interfaces/customer.interface';

export class CustomerModel {
  constructor(
    public name: string,
    public lastName: string,
    public identityNumber: number,
    public departmentId: number,
    public cityId: number,
    public phoneNumber: number,
    public email: string,
    public habeasDataConsent: boolean = false
  ) {}

  toJSON(): Customer {
    return {
      name: this.name,
      last_name: this.lastName,
      identity_number: this.identityNumber,
      department_id: this.departmentId,
      city_id: this.cityId,
      phone_number: this.phoneNumber,
      email: this.email,
      habeas_data_consent: this.habeasDataConsent,
    };
  }
}
