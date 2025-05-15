<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = file_get_contents(database_path('seeders/data/cities.csv'));
        $cities = explode("\n", $cities);

        foreach ($cities as $city) {
            if (!empty($city)) {
                [$department_id, $name] = explode(", ", $city);
                DB::table('cities')->insert([
                    'department_id' => (int) $department_id,
                    'name' => $name,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
