<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;

$fortifyGuard = config('fortify.guard');

Route::middleware("guest:$fortifyGuard")->group(static function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('authenticated_session.create');
    Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('authenticated_session.store');
});

Route::middleware("auth:$fortifyGuard")->group(static function () {
    Route::delete('logout', [AuthenticatedSessionController::class, 'destroy'])->name('authenticated_session.destroy');

    Route::get('', DashboardController::class)->name('dashboard');

    Route::get('users', [UsersController::class, 'index'])->name('users.index');
    Route::get('users/create', [UsersController::class, 'create'])->name('users.create');
    Route::post('users', [UsersController::class, 'store'])->name('users.store');
    Route::get('users/{user}', [UsersController::class, 'edit'])->name('users.edit');
    Route::put('users/{user}', [UsersController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UsersController::class, 'destroy'])->name('users.destroy');
});

