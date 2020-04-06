<?php

//Route::resource('dashboard/contactusersadverts','AdvertController');
Route::get('dashboard/contactusersadverts','ContactusersadvertController@index')->name('contactusersadverts.index');
Route::delete('dashboard/contactusersadverts/{id}','ContactusersadvertController@destroy')->name('contactusersadverts.destroy');
