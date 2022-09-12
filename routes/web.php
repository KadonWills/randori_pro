<?php

use App\Http\Controllers\BundleController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\ClassroomCourseController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/profile', fn() => Inertia::render('Profile') )->middleware(['auth', 'verified'])->name('profile');

Route::get('/dashboard', [DashboardController::class, 'index'] )->middleware(['auth', 'verified'])->name('dashboard');

/**
 * User Routes
 */
Route::get('/users', [UserController::class, 'index'])->middleware(['auth', 'verified'])->name('users');
Route::get('/users/{id}', [UserController::class, 'show'])->middleware(['auth', 'verified'])->name('users.view');
Route::get('/users/new', [UserController::class, 'create'])->middleware(['auth', 'verified'])->name('users.new');
Route::post('/users', [UserController::class, 'store'])->middleware(['auth', 'verified'])->name('users.create');
Route::get('/users/{id}/edit', [UserController::class, 'edit'])->middleware(['auth', 'verified'])->name('users.edit');
Route::post('/users/{id}', [UserController::class, 'update'])->middleware(['auth', 'verified'])->name('users.update');

/**
 * Classroom Routes
 */
Route::get('/classrooms', [ClassroomController::class, 'index'])->middleware(['auth', 'verified'])->name('classrooms');

/**
 * Course Routes
 */
Route::get('/courses', [CourseController::class, 'index'])->middleware(['auth', 'verified'])->name('courses');

/**
 * Events (classroom courses) Routes
 */
Route::get('/course-events', [ClassroomCourseController::class, 'index'])->middleware(['auth', 'verified'])->name('course_events');

/**
 * Bundle Routes
 */
Route::get('/bundles', [BundleController::class, 'index'])->middleware(['auth', 'verified'])->name('bundles');

/**
 * Bundle Routes
 */
Route::get('/subscriptions', [SubscriptionController::class, 'index'])->middleware(['auth', 'verified'])->name('subscriptions');


/**
 * ============
 * !DO NOT EDIT
 * Security Routes
 */
require __DIR__.'/auth.php';
