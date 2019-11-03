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

Route::get('/', function () {
    return view('welcome');
});


/** Dashboard */
require(__DIR__ . DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . 'index.php');

/** Auth */
Auth::routes(['verify' => true]);
require(__DIR__ . DIRECTORY_SEPARATOR . 'web' .DIRECTORY_SEPARATOR . 'auth' . DIRECTORY_SEPARATOR . 'index.php');


Route::get('/home', 'HomeController@index')->name('home');
