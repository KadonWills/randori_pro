<?php

use App\Http\Controllers\BundleController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\ClassroomCourseController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use App\Models\Classroom;
use App\Models\Role;
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

Route::get('/profile', fn() => Inertia::render('Profile',[
    "roles" => Role::all(),
    "classrooms" => Classroom::all()
]) )->middleware(['auth', 'verified'])->name('profile');

Route::get('/dashboard', [DashboardController::class, 'index'] )->middleware(['auth', 'verified'])->name('dashboard');

/**
 * User Routes
 */
Route::get('/users', [UserController::class, 'index'])->middleware(['auth', 'verified'])->name('users');
// Route::get('/users/{id}', [UserController::class, 'show'])->middleware(['auth', 'verified'])->name('users.view');
// Route::get('/users/{id}/edit', [UserController::class, 'edit'])->middleware(['auth', 'verified'])->name('users.edit');
Route::post('/users', [UserController::class, 'store'])->middleware(['auth'])->name('users.create');
Route::put('/users/{id}', [UserController::class, 'update'])->middleware(['auth'])->name('users.update');
Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware(['auth'])->name('users.delete');

/**
 * Classroom Routes
 */
Route::get('/classrooms', [ClassroomController::class, 'index'])->middleware(['auth', 'verified'])->name('classrooms');
Route::post('/classrooms', [ClassroomController::class, 'store'])->middleware(['auth'])->name('classrooms.create');
Route::put('/classrooms/{id}', [ClassroomController::class, 'update'])->middleware(['auth'])->name('classrooms.update');
Route::delete('/classrooms/{id}', [ClassroomController::class, 'destroy'])->middleware(['auth'])->name('classrooms.delete');

/**
 * Course Routes
 */
Route::get('/courses', [CourseController::class, 'index'])->middleware(['auth', 'verified'])->name('courses');
Route::post('/courses', [CourseController::class, 'store'])->middleware(['auth'])->name('courses.create');
Route::put('/courses/{id}', [CourseController::class, 'update'])->middleware(['auth'])->name('courses.update');
Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->middleware(['auth'])->name('courses.delete');

/**
 * Events (classroom courses) Routes
 */
Route::get('/course-events', [ClassroomCourseController::class, 'index'])->middleware(['auth', 'verified'])->name('course_events');

/**
 * Bundle Routes
 */
Route::get('/bundles', [BundleController::class, 'index'])->middleware(['auth', 'verified'])->name('bundles');
Route::post('/bundles', [BundleController::class, 'store'])->middleware(['auth'])->name('bundles.create');
Route::put('/bundles/{id}', [BundleController::class, 'update'])->middleware(['auth'])->name('bundles.update');
Route::delete('/bundles/{id}', [BundleController::class, 'destroy'])->middleware(['auth'])->name('bundles.delete');

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
