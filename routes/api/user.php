<?php


Route::get('administrators', 'UserController@apiadministrator');
Route::get('users/{user}', 'UserController@show');
Route::get('users', 'UserController@api');
Route::get('users_last_month', 'UserController@dataLastMonth');
Route::get('users_current_month', 'UserController@dataCurrentMonth');
Route::get('followers', 'UserController@apifollowers');
Route::get('users/datatables', 'UserController@apidatatables');

