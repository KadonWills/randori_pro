<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "title" => fake()->jobTitle(),
            "description" => fake()->realText(),
            "active" => fake()->boolean(),
            "image" => fake()->imageUrl(),
            "capacity" => fake()->random_int(20, 40)
        ];
    }
}