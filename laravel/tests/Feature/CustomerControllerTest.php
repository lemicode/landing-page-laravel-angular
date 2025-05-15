<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Customer;
use App\Models\Department;
use App\Models\City;

class CustomerControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the index method.
     *
     * @return void
     */
    public function testIndexReturnsAllCustomers()
    {
        // Arrange: Create a department and city
        $department = Department::factory()->create();
        $city = City::factory()->create(['department_id' => $department->id]);

        // Create customers associated with the department and city
        Customer::factory()->count(3)->create([
            'department_id' => $department->id,
            'city_id' => $city->id
        ]);

        // Act: Make a GET request to the index endpoint
        $response = $this->getJson('/api/v1/customers');

        // Assert: Check the response status
        $response->assertStatus(200);
    }

    /**
     * Test the store method.
     *
     * @return void
     */
    public function testStoreCreatesNewCustomer()
    {
        // Arrange: Create a department and city
        $department = Department::factory()->create();
        $city = City::factory()->create(['department_id' => $department->id]);

        $customerData = [
            'name' => 'John',
            'last_name' => 'Doe',
            'identity_number' => '123456789',
            'phone_number' => '5551234',
            'email' => 'john.doe@example.com',
            'habeas_data_consent' => true,
            'department_id' => $department->id,
            'city_id' => $city->id
        ];

        // Act: Make a POST request to the store endpoint
        $response = $this->postJson('/api/v1/customers', $customerData);

        // Assert: Check the response status
        $response->assertStatus(201);

        // Assert: Check the database contains the customer
        $this->assertDatabaseHas('customers', [
            'name' => 'John',
            'last_name' => 'Doe',
            'identity_number' => '123456789'
        ]);
    }

    /**
     * Test the selectWinner method.
     *
     * @return void
     */
    public function testSelectWinnerReturnsRandomCustomer()
    {
        // Arrange: Create a department and city
        $department = Department::factory()->create();
        $city = City::factory()->create(['department_id' => $department->id]);

        // Create 5 customers associated with the department and city
        Customer::factory()->count(5)->create([
            'department_id' => $department->id,
            'city_id' => $city->id
        ]);

        // Act: Make a GET request to the selectWinner endpoint
        $response = $this->getJson('/api/v1/customers/winner');

        // Assert: Check the response status
        $response->assertStatus(200);
    }

    public function testSelectWinnerReturnsFalseIfNotEnoughCustomers()
    {
        // Arrange: Create a department and city
        $department = Department::factory()->create();
        $city = City::factory()->create(['department_id' => $department->id]);

        // Create less than 5 customers associated with the department and city
        Customer::factory()->count(3)->create([
            'department_id' => $department->id,
            'city_id' => $city->id
        ]);

        // Act: Make a GET request to the selectWinner endpoint
        $response = $this->getJson('/api/v1/customers/winner');

        // Assert: Check the response status and response content
        $response->assertStatus(200);
        $response->assertJson([
            'winner' => false
        ]);
    }
}
