<?php

Route::get(
    'api/profile_account',
    'ProfileController@api_profile_account'
)->name('api_profile_account.site');

Route::get(
    'api/profile/{profile}/account',
    'ProfileController@api_profile_add_info_account'
)->name('api_profile_add_info_account.site');


Route::get(
    'profile/account',
    'ProfileController@profile_account'
)->name('profile_add_info_account.site');

Route::get(
    'profile/{profile}/account',
    'ProfileController@profile_add_info_account'
)->name('profile_add_info_account.site');

Route::put(
    'profile/{profile}',
    'ProfileController@profile_add_info_account_update'
)->name('profile_add_info_account.update');

Route::get(
    'api/personal_reservations',
    'ProfileController@apipersonalreservations'
)->name('api.profile_personal_reservations.site');

Route::get(
    'api/annonces_reservations_booked',
    'ProfileController@apiannoncereservationbookeds'
)->name('api.annonces_bookeds.site');

Route::get(
    'profile/personal_reservations',
    'ProfileController@personal_reservations'
)->name('profile_personal_reservations.site');

Route::get(
    'profile/annonces_reservations_booked',
    'ProfileController@annonces_reservations_booked'
)->name('annonces_reservations_booked.site');

Route::get(
    'api/user_profile/{user}',
    'ProfileController@api_user_account'
)->name('api_user_profile_account.site');

Route::get(
    'profile/annonces_reservations_booked/confirmed/{id}',
    'ProfileController@annonces_reservations_booked_confirmed'
)->name('annonces_reservations_booked_confirmed.site');

Route::get(
    'profile/annonces_reservations_booked/unconfirmed/{id}',
    'ProfileController@annonces_reservations_booked_unconfirmed'
)->name('annonces_reservations_booked_unconfirmed.site');

Route::get(
    'profile/change_password',
    'ProfileController@change_password'
)->name('change_password.site');

Route::put('profile/change_password/update_password',
    'ProfileController@updatePassword'
)->name('update_password.site');

Route::delete(
    'profile/personal_mails/delete_mail/{id}',
    'ProfileController@personalmessagesdelete'
)->name('personal_mails_delete.site');
