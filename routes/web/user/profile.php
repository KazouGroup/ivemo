<?php

Route::get('api/profile/account','ProfileController@api_profile_account')->name('api_profile_account.site');
Route::get('profile/account','ProfileController@profile_account')->name('profile_account.site');
Route::get('profile/change_password','ProfileController@change_password')->name('change_password.site');
Route::put('profile/update_password','ProfileController@update_password')->name('update_password.site');