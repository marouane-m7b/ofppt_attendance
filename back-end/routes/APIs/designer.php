<?php

use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\AlertController;
use App\Http\Controllers\ClasseController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantController;

Route::middleware(['auth:designer'])->group(function () {
    Route::get('/etudiants', [EtudiantController::class, 'index']);
    Route::get('/absences', [AbsenceController::class, 'index']);
    Route::post('/absences', [AbsenceController::class, 'store']);
    Route::get('/absences/{id}', [AbsenceController::class, 'show']);
    Route::put('/absences/{id}', [AbsenceController::class, 'update']);
    Route::delete('/absences/{id}', [AbsenceController::class, 'destroy']);
    Route::get('/classes', [ClasseController::class, 'listClasses']);
    Route::get('/classe/{id}', [ClasseController::class, 'show']);
});
