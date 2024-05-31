<?php

namespace Database\Seeders;

use App\Models\Designer;
use App\Models\Etudiant;
use App\Models\Filiere;
use App\Models\Group;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EtudiantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $etudiants = [
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Mahboub',
                'prenom' => 'Marouane',
                'numero_stagiaire' => 1001,
                'numero_parent' => 2001,
                'group_id' => Group::where('nom', 'DD202')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Asraoui',
                'prenom' => 'Saad',
                'numero_stagiaire' => 1001,
                'numero_parent' => 2001,
                'group_id' => Group::where('nom', 'DD202')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Laziz',
                'prenom' => 'Wiam',
                'numero_stagiaire' => 1001,
                'numero_parent' => 2001,
                'group_id' => Group::where('nom', 'DD202')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Rakik',
                'prenom' => 'Salma',
                'numero_stagiaire' => 1001,
                'numero_parent' => 2001,
                'group_id' => Group::where('nom', 'DD202')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'El Houmidi',
                'prenom' => 'Zakaria',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD202')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Hamdy',
                'prenom' => 'Yahya',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD202')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Khalidi',
                'prenom' => 'Zouhair',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD202')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Laassi',
                'prenom' => 'Abdelhadi',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD201')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Houmani',
                'prenom' => 'Reda',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD201')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Ibdrane',
                'prenom' => 'Ayoub',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD201')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Abouraja',
                'prenom' => 'Salma',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD201')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Adiab',
                'prenom' => 'Abderahmane',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD201')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Smoughen',
                'prenom' => 'Oussama',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD201')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Latifi',
                'prenom' => 'Salah',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD201')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'BA' . mt_rand(10000, 99999),
                'nom' => 'Katane',
                'prenom' => 'Souhaib',
                'numero_stagiaire' => 2000,
                'numero_parent' => 3001,
                'group_id' => Group::where('nom', 'DD201')->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Etudiant::insert($etudiants);
    }
}
