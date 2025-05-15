<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = file_get_contents(database_path('seeders/data/departments.csv'));
        $departments = explode("\n", $departments);

        foreach ($departments as $department) {
            if (!empty($department)) {
                [$id, $name] = explode(", ", $department);
                DB::table('departments')->insert([
                    'id' => (int) $id,
                    'name' => $name,
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }
    }
}
