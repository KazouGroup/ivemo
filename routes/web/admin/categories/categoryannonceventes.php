<?php
Route::resource('dashboard/categoryannonceventes','CategoryannonceventeController');
Route::get('dashboard/active_categoryannonceventes/{id}', 'CategoryannonceventeController@activated')->name('activated_categoryannonceventes');
Route::get('dashboard/unactive_categoryannonceventes/{id}', 'CategoryannonceventeController@unactivated')->name('unactivated_categoryannonceventes');

