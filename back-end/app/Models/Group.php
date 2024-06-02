<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    public function designers()
    {
        return $this->belongsToMany(Designer::class, 'designer_group');
    }

    public function etudiants()
    {
        return $this->hasMany(Etudiant::class);
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }
}
