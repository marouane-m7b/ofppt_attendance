<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ValidatorController;

Route::middleware(['auth:validator'])->group(function () {
    Route::post('/accept', [QuestionController::class, 'accept']);
    Route::post('/reject', [QuestionController::class, 'reject']);
    Route::put('/validateQuestion/{id}', [QuestionController::class, 'validateQuestion']);
    Route::get('/download-questions/{id}', [ValidatorController::class, 'downloadQuestions']);
    Route::get('/questionsToValidate', [ValidatorController::class, 'questionsToValidate']);
    Route::get('/questionsValidated', [ValidatorController::class, 'questionsValidated']);
    Route::apiResources([
        'questions' => QuestionController::class,
    ]);
});
