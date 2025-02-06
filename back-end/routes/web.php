<?php

use App\Http\Controllers\BeachesController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\ContinentsController;
use App\Http\Controllers\HomeListController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\NationsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/api/products', [ProductsController::class, 'index']);
Route::delete('/api/products/{id}', [ProductsController::class, 'destroy']);
Route::post('/api/products', [ProductsController::class, 'store']);
Route::put('/api/products/{id}', [ProductsController::class, 'update']);

Route::get('/api/beach', [BeachesController::class, 'index']);

Route::post('api/beach', [BeachesController::class, 'store']);

Route::get('/api/beach/{id}', [BeachesController::class, 'show']);

Route::get('/api/nations', [NationsController::class, 'index']);

Route::get('/api/home', [HomeListController::class, 'index_Home']);

Route::get('/api/beachimg/{id}', [BeachesController::class, 'show_library']);

Route::get('/api/continent', [BeachesController::class, 'continent_index']);

Route::get('/api/continent/{continent}', [BeachesController::class, 'continent_filter']);

Route::get('/api/beachjoin', [BeachesController::class, 'beachjoin']);
//Route::get('/api/login', [LoginController::class, 'index']);
Route::put('/api/beach/{id}', [BeachesController::class, 'update']);

Route::post('/api/continent', [ContinentsController::class, 'store']);
Route::get('/api/continent', [ContinentsController::class, 'index']);

Route::post('api/comments', [CommentsController::class, 'store']);

Route::get('api/comments/{beachid}', [CommentsController::class, 'findByBeachId']);

Route::get('api/beachbynation/{nationid}', [BeachesController::class, 'beach_by_nation_id']);

Route::post('api/upload', [ImageController::class, 'uploader']);
Route::get('api/reviews/{beachid}', [ImageController::class, 'findByBeachId']);

Route::get('api/beach_re/{id}', [BeachesController::class, 'showRe']);
Route::get('api/limit/{id}', [BeachesController::class, 'limit']);
Route::get('api/test', [BeachesController::class, 'noParamTest']);
