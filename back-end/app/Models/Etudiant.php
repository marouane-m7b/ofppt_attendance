<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $fillable = [
        'cin',
        'nom',
        'prenom',
        'email',
        'numero_stagiaire',
        'numero_parent',
        'group_id',
    ];

    public function absences()
    {
        return $this->hasMany(Absence::class);
    }

    public function alerts()
    {
        return $this->hasMany(Alert::class);
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }
}
