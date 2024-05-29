<?php

use App\Http\Controllers\FiliereController;
use App\Http\Controllers\SecteurController;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'validator',
], function () {
    include 'Auth/validator.php';
    Route::middleware(['auth:validator'])->group(function () {
        include 'APIs/validator.php';
    });
});



Route::group([
    'prefix' => 'designer',
], function () {
    include 'Auth/designer.php';
    Route::middleware(['auth:designer'])->group(function () {
        include 'APIs/designer.php';
    });
});

Route::group([
    'prefix' => 'admin',
], function () {
    include 'Auth/admin.php';
    Route::middleware(['auth:admin'])->group(function () {
        include 'APIs/admin.php';
    });
});


Route::get('/filiere', [FiliereController::class, 'index']);
Route::get('/filiereList/{id}', [FiliereController::class, 'list']);
Route::get('/secteur', [SecteurController::class, 'index']);
