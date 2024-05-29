<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::create([
            'first_name' => 'ofppt',
            'last_name' => 'ofppt',
            'email' => 'admin@ofppt.ma',
            'password' => Hash::make('ofppt'),
        ]);
    }
}
