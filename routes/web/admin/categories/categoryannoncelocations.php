<?php
Route::resource('dashboard/categoryannoncelocations','CategoryannoncelocationController');
Route::get('dashboard/active_categoryannoncelocations/{id}', 'CategoryannoncelocationController@activated')->name('activated_categoryannoncelocations');
Route::get('dashboard/unactive_categoryannoncelocations/{id}', 'CategoryannoncelocationController@unactivated')->name('unactivated_categoryannoncelocations');
