<?php


Route::get('dashboard/contacts','ContactController@index')->name('contacts.dashboard');
Route::get('dashboard/contacts/{slug}','ContactController@vector')->name('contacts.vector');
Route::get('api/contacts','ContactController@api')->name('contacts.api');
Route::get('api/contacts/{slug}','ContactController@show')->name('contacts.show');
Route::post('contacts','ContactController@create')->name('contacts.store');
Route::delete('dashboard/contacts/{contact}','ContactController@destroy')->name('contacts.destroy');
