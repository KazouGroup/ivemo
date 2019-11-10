<?php

Route::get('administrators', 'UserController@apiadministrator');
Route::get('users/{user}', 'UserController@show');
Route::get('users', 'UserController@api');
Route::get('users/datatables', 'UserController@apidatatables');

