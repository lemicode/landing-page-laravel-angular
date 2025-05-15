<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition()
    {
        return [
            'name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'identity_number' => $this->faker->unique()->numerify('#########'),
            'phone_number' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'habeas_data_consent' => true,
            'department_id' => 1, // Replace with valid department ID in tests
            'city_id' => 1 // Replace with valid city ID in tests
        ];
    }
}
