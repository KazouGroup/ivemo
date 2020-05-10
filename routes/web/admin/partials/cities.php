<?php



Route::get(
    'dashboard/cities',
    'CityController@index'
)->name('cities.index');

Route::post(
    'dashboard/cities',
    'CityController@store'
)->name('cities.store');

Route::put(
    'dashboard/cities/{id}',
    'CityController@update'
)->name('cities.update');

Route::delete(
    'dashboard/cities/{id}',
    'CityController@destroy'
)->name('cities.destroy');

Route::get(
    'dashboard/active_cities/{id}',
    'CityController@activated'
)->name('activated_cities');

Route::get(
    'dashboard/unactive_cities/{id}',
    'CityController@unactivated'
)->name('unactivated_cities');
