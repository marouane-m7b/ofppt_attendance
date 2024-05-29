<?php

namespace App\Models;

use App\Models\Designer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use HasFactory, SoftDeletes;

    protected $with = ['secteur', 'designer', 'filiere', 'criteres', 'validator'];
    protected $fillable = [
        'file_name',
        'description',
        'commentaire',
        'file_path',
        'is_visible',
        'is_accepted',
        'points',
        'secteur_id',
        'filiere_id',
        'designer_id',
        'validator_id',
    ];


    public function designer()
    {
        return $this->belongsTo(Designer::class);
    }

    public function secteur()
    {
        return $this->belongsTo(Secteur::class);
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function criteres()
    {
        return $this->hasMany(Critere::class);
    }

    public function validator()
    {
        return $this->belongsTo(Validator::class);
    }
}
