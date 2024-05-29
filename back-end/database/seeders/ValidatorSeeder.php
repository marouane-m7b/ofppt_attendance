<?php

namespace Database\Seeders;

use App\Models\Secteur;
use App\Models\Validator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ValidatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            // Communication & Soft Skills
            ['first_name' => 'Kaoutar', 'last_name' => 'Meddri', 'email' => 'kaoutar.meddri@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Communication & Soft Skills')->first()->id, 'password' => Hash::make('ofppt')],
            ['first_name' => 'Khadija', 'last_name' => 'Traf', 'email' => 'khadija.traf@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Communication & Soft Skills')->first()->id, 'password' => Hash::make('ofppt')],
            ['first_name' => 'Khadija', 'last_name' => 'Chekrani', 'email' => 'khadija.chekrani@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Communication & Soft Skills')->first()->id, 'password' => Hash::make('ofppt')],
            // Génie électrique
            ['first_name' => 'Faical', 'last_name' => 'Essaiydy', 'email' => 'faical.essaiydy@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Génie électrique')->first()->id, 'password' => Hash::make('ofppt')],
            ['first_name' => 'Mohammed', 'last_name' => 'Salahi', 'email' => 'mohammed.salahi@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Génie électrique')->first()->id, 'password' => Hash::make('ofppt')],
            ['first_name' => 'Said', 'last_name' => 'Fallah', 'email' => 'said.fallah@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Génie électrique')->first()->id, 'password' => Hash::make('ofppt')],
            ['first_name' => 'Abdelhadi', 'last_name' => 'Souda', 'email' => 'abdelhadi.souda@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Génie électrique')->first()->id, 'password' => Hash::make('ofppt')],
            ['first_name' => 'Ilham', 'last_name' => 'Barhdadi', 'email' => 'ilham.barhdadi@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Génie électrique')->first()->id, 'password' => Hash::make('ofppt')],
            // Génie Mécanique
            ['first_name' => 'Badr-eddine', 'last_name' => 'Aaqil', 'email' => 'badr-eddine.aaqil@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Génie Mécanique')->first()->id, 'password' => Hash::make('ofppt')],
            ['first_name' => 'Ahmed', 'last_name' => 'Eddanguir', 'email' => 'ahmed.eddanguir@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Génie Mécanique')->first()->id, 'password' => Hash::make('ofppt')],
            // Métiers de l’Automobile
            ['first_name' => 'Ayoub', 'last_name' => 'Rajil', 'email' => 'ayoub.rajil@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Métiers de l’Automobile')->first()->id, 'password' => Hash::make('ofppt')],
            ['first_name' => 'Khalid', 'last_name' => 'Naji', 'email' => 'khalid.naji@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Métiers de l’Automobile')->first()->id, 'password' => Hash::make('ofppt')],
            ['first_name' => 'Salaheddine', 'last_name' => 'Bahri', 'email' => 'salaheddine.bahri@ofppt.ma', 'secteur_id' => Secteur::where('nom', 'Métiers de l’Automobile')->first()->id, 'password' => Hash::make('ofppt')],
        ];

        foreach ($data as $validatorData) {
            Validator::create($validatorData);
        }
    }
}
