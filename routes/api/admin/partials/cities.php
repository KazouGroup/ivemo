<?php

Route::get('all_cities','CityController@apiexterne')->name('api.all_cities');
Route::get('dashboard/cities','CityController@api')->name('api.cities');

