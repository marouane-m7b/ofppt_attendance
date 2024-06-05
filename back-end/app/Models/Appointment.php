<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = ['etudiant_id', 'validator_id', 'date', 'status'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function validator()
    {
        return $this->belongsTo(Validator::class);
    }
}
