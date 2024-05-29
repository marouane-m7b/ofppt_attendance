<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EtudiantController;

Route::middleware(['auth:designer'])->group(function () {
    Route::get('/etudiants', [EtudiantController::class, 'index']);
});
