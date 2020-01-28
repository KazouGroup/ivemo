<?php

Route::get('dashboard/profile/add_info/{profile}/edit','ProfileController@admin_edit')->name('admin_profile.edit');
Route::get('dashboard/profile/add_info/{profile}','ProfileController@show');
Route::get('dashboard/profile/change_password','ProfileController@changePassword');
Route::put('dashboard/profile/change_password','ProfileController@updatePassword');
Route::post('profile/add_info/{profile}','ProfileController@update')->name('profiles');
Route::post('profile/user/{profile}/follow','ProfileController@followUser')->name('user.follow');
Route::post('profile/user/{profile}/unfollow','ProfileController@unFollowUser')->name('user.unfollow');
