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
    'profile/annonces_reservations_booked/confirmed/{id}',
    'ProfileController@annonces_reservations_booked_confirmed'
)->name('annonces_reservations_booked_confirmed.site');

Route::get(
    'profile/annonces_reservations_booked/unconfirmed/{id}',
    'ProfileController@annonces_reservations_booked_unconfirmed'
)->name('annonces_reservations_booked_unconfirmed.site');

Route::get(
    '@{user}',
    'ProfileController@public_profile'
)->name('public_profile.site');

Route::post(
    '@{user}/send_message',
    'ProfileController@public_profile_send_message'
)->name('public_profile_send_message.site');

Route::get(
    '@{user}/annonces_reservations',
    'ProfileController@publicprofilannoncereservations'
)->name('public_profile_annoncereservations.site');

Route::get(
    '@{user}/annonces_locations',
    'ProfileController@publicprofilannoncelocations'
)->name('public_profile_annoncelocations.site');

Route::get(
    'profile/change_password',
    'ProfileController@change_password'
)->name('change_password.site');

Route::put('profile/update_password',
    'ProfileController@update_password'
)->name('update_password.site');

Route::delete(
    'profile/personal_mails/delete_mail/{id}',
    'ProfileController@personalmessagesdelete'
)->name('personal_mails_delete.site');
