<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'identity_number' => 'required|integer',
            'department_id' => 'required|exists:departments,id',
            'city_id' => 'required|exists:cities,id',
            'phone_number' => 'required|integer',
            'email' => 'required|email|unique:customers,email',
            'habeas_data_consent' => 'required|boolean'
        ];
    }

    /**
     * Get the custom messages for validation errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'last_name.required' => 'The last name field is required.',
            'identity_number.required' => 'The identity number is required.',
            'identity_number.integer' => 'The identity number must be an integer.',
            'department_id.required' => 'The department is required.',
            'department_id.exists' => 'The selected department does not exist.',
            'city_id.required' => 'The city is required.',
            'city_id.exists' => 'The selected city does not exist.',
            'phone_number.required' => 'The phone number is required.',
            'phone_number.integer' => 'The phone number must be an integer.',
            'email.required' => 'The email is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'This email is already registered.',
            'habeas_data_consent.required' => 'You must provide consent for data processing.',
            'habeas_data_consent.boolean' => 'The consent field must be true or false.',
        ];
    }
}
