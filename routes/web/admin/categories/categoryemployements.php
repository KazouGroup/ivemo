<?php
Route::resource('dashboard/categoryemployements','CategoryemployementController');
Route::get('dashboard/active_categoryemployements/{id}', 'CategoryemployementController@activated')->name('activated_categoryemployements');
Route::get('dashboard/unactive_categoryemployements/{id}', 'CategoryemployementController@unactivated')->name('unactivated_categoryemployements');

