<?php
Route::resource('dashboard/categoryworkwithuses','CategoryWorkwithusController');
Route::get('dashboard/active_categoryworkwithuses/{id}', 'CategoryWorkwithusController@activated')->name('activated_categoryworkwithuses');
Route::get('dashboard/unactive_categoryworkwithuses/{id}', 'CategoryWorkwithusController@unactivated')->name('unactivated_categoryworkwithuses');
