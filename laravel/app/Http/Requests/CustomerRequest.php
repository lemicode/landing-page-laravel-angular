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
            'name.required' => 'El campo nombre es obligatorio.',
            'last_name.required' => 'El campo apellido es obligatorio.',
            'identity_number.required' => 'El número de identificación es obligatorio.',
            'identity_number.integer' => 'El número de identificación debe ser un número entero.',
            'department_id.required' => 'El departamento es obligatorio.',
            'department_id.exists' => 'El departamento seleccionado no existe.',
            'city_id.required' => 'La ciudad es obligatoria.',
            'city_id.exists' => 'La ciudad seleccionada no existe.',
            'phone_number.required' => 'El número de teléfono es obligatorio.',
            'phone_number.integer' => 'El número de teléfono debe ser un número entero.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'email.unique' => 'Este correo electrónico ya está registrado.',
            'habeas_data_consent.required' => 'Debe proporcionar su consentimiento para el tratamiento de datos.',
            'habeas_data_consent.boolean' => 'El campo de consentimiento debe ser verdadero o falso.',
        ];
    }
}
