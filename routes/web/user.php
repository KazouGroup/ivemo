<?php

Route::get('/dashboard/users', 'UserController@index')->name('users.index');
Route::get('/dashboard/administrators', 'UserController@administrator');
Route::get('/account/user', 'UserController@user')->name('users.user');
Route::get('/account/users/{user}', 'UserController@show')->name('users.show');

