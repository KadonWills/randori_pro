<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Classroom>
 */
class ClassroomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "name" => fake()->randomElement(["Level 1", "Level 2", "Level 3","Level 4", "Level 5"]),
            "description" => fake()->realText(),
            "image" => fake()->imageUrl(),
            "space" => fake()->randomNumber(2, true)
        ];
    }
}
