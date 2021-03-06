<?php

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

//Artisan::call('storage:link', [] );
/** Dashboard */
require(__DIR__ . DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . 'index.php');

/** Auth */
Route::mixin(new \Laravel\Ui\AuthRouteMethods());
Auth::routes(['verify' => true]);

Route::get('/', 'HomeController@welcome')->name('welcome');
Route::get('/home', 'HomeController@index')->name('home');
