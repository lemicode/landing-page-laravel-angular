<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Department;
use App\Models\City;

class DepartmentControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the index method.
     *
     * @return void
     */
    public function testIndexReturnsAllDepartments()
    {
        // Arrange: Create some departments
        Department::factory()->count(3)->create();

        // Act: Make a GET request to the index endpoint
        $response = $this->getJson('/api/v1/departments');

        // Assert: Check the response status and structure
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'departments' => [
                         '*' => [
                             'id', 'name'
                         ]
                     ]
                 ]);
    }

    /**
     * Test the show method.
     *
     * @return void
     */
    public function testShowReturnsSpecificDepartmentWithCities()
    {
        // Arrange: Create a department with related cities
        $department = Department::factory()
            ->has(City::factory()->count(2))
            ->create();

        // Act: Make a GET request to the show endpoint
        $response = $this->getJson("/api/v1/departments/{$department->id}");

        // Assert: Check the response status and structure
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'department' => [
                         'id', 'name',
                         'cities' => [
                             '*' => [
                                 'id', 'name'
                             ]
                         ]
                     ]
                 ]);
    }
}
