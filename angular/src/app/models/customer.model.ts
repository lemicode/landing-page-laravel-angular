import { Customer } from '../interfaces/customer.interface';

export class CustomerModel {
  private name: string;
  private lastName: string;
  private identityNumber: number;
  private departmentId: number;
  private cityId: number;
  private phoneNumber: number;
  private email: string;
  private habeasDataConsent: boolean;

  constructor(data: {
    name: string | null;
    lastName: string | null;
    identityNumber: number | null;
    departmentId: number | null;
    cityId: number | null;
    phoneNumber: number | null;
    email: string | null;
    habeasDataConsent: boolean | null;
  }) {
    this.name = data.name as string;
    this.lastName = data.lastName as string;
    this.identityNumber = data.identityNumber as number;
    this.departmentId = data.departmentId as number;
    this.cityId = data.cityId as number;
    this.phoneNumber = data.phoneNumber as number;
    this.email = data.email as string;
    this.habeasDataConsent = data.habeasDataConsent as boolean;
  }

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
