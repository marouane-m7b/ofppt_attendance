<?php

use App\Http\Controllers\DesignerController;
use App\Http\Controllers\FiliereController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SecteurController;
use App\Http\Controllers\ValidatorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:admin'])->group(function () {
    Route::get('/filieres', [FiliereController::class, 'index']);
    Route::post('/filieres', [FiliereController::class, 'store']);
    Route::put('/filieres/{filiere}', [FiliereController::class, 'update']);
    Route::delete('/filieres/{filiere}', [FiliereController::class, 'destroy']);
    Route::get('/secteurs', [SecteurController::class, 'index']);
    Route::post('/secteurs', [SecteurController::class, 'store']);
    Route::put('/secteurs/{secteur}', [SecteurController::class, 'update']);
    Route::delete('/secteurs/{secteur}', [SecteurController::class, 'destroy']);
    Route::delete('/delete-question/{id}', [QuestionController::class, 'destroy']);
    Route::get('/get-questions', [QuestionController::class, 'getAdminQuestions']);
    Route::get('/get-questions/{id}', [QuestionController::class, 'getQuestions']);
    Route::get('/download-questions/{id}', [QuestionController::class, 'downloadQuestions']);
    Route::put('/reset-validator/{id}', [ValidatorController::class, 'resetPassword']);
    Route::put('/reset-designer/{id}', [DesignerController::class, 'resetPassword']);
    Route::apiResources([
        'designers' => \App\Http\Controllers\DesignerController::class,
        'validators' => \App\Http\Controllers\ValidatorController::class
    ]);
});
