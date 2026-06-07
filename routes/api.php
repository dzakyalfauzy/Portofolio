<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PortfolioController;
use App\Http\Controllers\API\ContactController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::get('/portfolio-data', [PortfolioController::class, 'index']);
Route::get('/projects/{id}', [PortfolioController::class, 'show']);
Route::post('/contact', [ContactController::class, 'store']);

// Authentication route (Sanctum Session-based login)
Route::post('/login', [AuthController::class, 'login']);

// Protected Admin routes (Requires Sanctum SPA auth cookie)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/admin/me', [AuthController::class, 'me']);

    // Admin Panel resource routes
    Route::apiResource('admin/projects', \App\Http\Controllers\API\Admin\ProjectController::class);
    Route::apiResource('admin/certificates', \App\Http\Controllers\API\Admin\CertificateController::class);
    Route::apiResource('admin/experiences', \App\Http\Controllers\API\Admin\ExperienceController::class);
    Route::apiResource('admin/skills', \App\Http\Controllers\API\Admin\SkillController::class);
    Route::apiResource('admin/messages', \App\Http\Controllers\API\Admin\MessageController::class)->only(['index', 'destroy']);
});
