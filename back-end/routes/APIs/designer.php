<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DesignerController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\ValidatorController;

Route::middleware(['auth:designer'])->group(function () {
    Route::post('/upload-questions', [DesignerController::class, 'sendQuestions']);
    Route::get('/get-questions', [DesignerController::class, 'getQuestions']);
    Route::get('/download-questions/{id}', [DesignerController::class, 'downloadQuestions']);
    Route::get('/get-questions/{id}', [QuestionController::class, 'getQuestionsDetails']);
});
