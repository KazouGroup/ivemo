<?php

Route::get('/account/user', 'UserController@user')->name('users.user');
Route::get('/account/users/{user}', 'UserController@show')->name('users.show');

