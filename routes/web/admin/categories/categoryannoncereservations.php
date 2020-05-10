<?php
Route::resource('dashboard/categoryannoncereservations','CategoryannoncereservationController');
Route::get('dashboard/active_categoryannoncereservations/{id}', 'CategoryannoncereservationController@activated')->name('activated_categoryannoncereservations');
Route::get('dashboard/unactive_categoryannoncereservations/{id}', 'CategoryannoncereservationController@unactivated')->name('unactivated_categoryannoncereservations');

