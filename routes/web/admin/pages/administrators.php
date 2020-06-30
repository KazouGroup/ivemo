<?php
//Route Administrator
Route::resource('/dashboard/administrators','AdministratorController');
Route::get('/dashboard/administrators/u/datatables','AdministratorController@index');
Route::get('/dashboard/active_administrators/{id}', 'OccupationController@active')->name('active_occupations');
Route::get('/dashboard/disable_occupations/{id}', 'OccupationController@disable')->name('disable_occupations');
