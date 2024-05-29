<?php

use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\EtudiantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ValidatorController;

Route::middleware(['auth:validator'])->group(function () {
    Route::get('/etudiants', [EtudiantController::class, 'index']);
    Route::apiResources([
        'absences' => AbsenceController::class
    ]);
});
