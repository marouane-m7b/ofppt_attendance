<?php

namespace Database\Seeders;

use App\Models\Classe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClasseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classes = [
            [
                'class_name' => 'Mathematics',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'class_name' => 'Physics',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'class_name' => 'Chemistry',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Classe::insert($classes);
    }
}
