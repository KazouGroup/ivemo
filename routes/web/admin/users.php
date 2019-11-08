<?php

Route::get('/account/user', 'UserController@user')->name('users.user');

Route::get('dashboard/profile/','UserController@admin_profile');
Route::get('dashboard/profile/edit','UserController@admin_profile_edit');

Route::resource('/dashboard/users', 'UserController');

Route::get('/dashboard/administrators', 'UserController@administrator');
Route::get('/account/users/{user}', 'UserController@show')->name('users.show');
