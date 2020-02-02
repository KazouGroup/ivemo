<?php

Route::get(
    'api/profile_account',
    'ProfileController@api_profile_account'
)->name('api_profile_account.site');

Route::get(
    'profile/account',
    'ProfileController@profile_account'
)->name('profile_account.site');

Route::get(
    'api/personal_reservations',
    'ProfileController@apipersonalreservations'
)->name('api.profile_personal_reservations.site');

Route::get(
    'api/annonces_booked',
    'ProfileController@apiannoncesbookeds'
)->name('api.annonces_bookeds.site');

Route::get(
    'profile/personal_reservations',
    'ProfileController@personal_reservations'
)->name('profile_personal_reservations.site');

Route::get(
    'profile/change_password',
    'ProfileController@change_password'
)->name('change_password.site');

Route::put('profile/update_password',
    'ProfileController@update_password'
)->name('update_password.site');
