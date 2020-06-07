<?php

Route::get('/account/user', 'UserController@user')->name('users.user');

Route::get('dashboard/profile/','UserController@admin_profile');
Route::put('/profile/users','UserController@updateUser');
Route::get('dashboard/profile/edit','UserController@admin_profile_edit')->name('admin_profile_edit');


Route::resource('/dashboard/users', 'UserController');
Route::get('/dashboard/users/p/datatables', 'UserController@datatablesusers');
Route::get('/dashboard/administrators/p/datatables', 'UserController@datatablesadministrators');

Route::get('/dashboard/administrators', 'UserController@administrator');
Route::get('/account/users/{user}', 'UserController@show')->name('account_users.show');
