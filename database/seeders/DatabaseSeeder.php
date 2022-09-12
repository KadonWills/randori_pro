<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Role::factory()->create([
            "name" => "Admin",
            "description" => "Administrator of the system."
        ]);
        Role::factory()->create([
            "name" => "Student",
            "description" => "Can subscribe and view scheduled courses ."
        ]);
        Role::factory()->create([
            "name" => "Tutor",
            "description" => "Is incharge of one or many students as legal tutor"
        ]);

        \App\Models\User::factory(5)->create();

        $this->call([
            ClassroomSeeder::class,
            CourseSeeder::class,
        ]);


        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
