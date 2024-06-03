<?php

namespace Database\Seeders;

use App\Models\Classe;
use App\Models\Designer;
use App\Models\Etudiant;
use App\Models\Filiere;
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
                'cin' => 'ABC123456',
                'nom' => 'Dupont',
                'prenom' => 'Jean',
                'numero_stagiaire' => 1001,
                'numero_parent' => 2001,
                'filiere_id' => Filiere::where('nom', 'Automatisation et Instrumentation Industrielle')->first()->id,
                'classe_id' => Classe::inRandomOrder()->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cin' => 'DEF789012',
                'nom' => 'Martin',
                'prenom' => 'Marie',
                'numero_stagiaire' => 1002,
                'numero_parent' => 2002,
                'filiere_id' => Filiere::where('nom', 'Electromécanique des Systèmes Automatisées')->first()->id,
                'designer_id' => Designer::inRandomOrder()->first()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Ajoutez autant d'étudiants que nécessaire ici
        ];

        Etudiant::insert($etudiants);
    }
}
