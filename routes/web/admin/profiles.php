<?php

Route::get('dashboard/profile/add_info/{profile}/edit','ProfileController@admin_edit');
Route::get('dashboard/profile/add_info/{profile}','ProfileController@show');
Route::post('profile/add_info/{profile}','ProfileController@update');
