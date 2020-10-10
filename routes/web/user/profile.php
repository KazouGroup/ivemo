<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile_account',
        'ProfileController@api_profile_account'
    )->name('api_profile_account.site');

    Route::get(
        'user/private',
        'ProfileController@apiprofileprivate'
    )->name('api.profilprivate');

    Route::get(
        'profile/{profile:slug}/account',
        'ProfileController@api_profile_add_info_account'
    )->name('api_profile_add_info_account.site');

    Route::get(
        'personal_reservations',
        'ProfileController@apipersonalreservations'
    )->name('api.profile_personal_reservations.site');

    Route::get(
        'annonces_reservations_booked',
        'ProfileController@apiannoncereservationbookeds'
    )->name('api.annonces_bookeds.site');

    Route::get(
        'profile/{user}/personal_settings/user_favorites',
        'ProfileController@apiuserfavorites'
    )->name('api.userfavorites');

    Route::get(
        'profile/{user}/personal_settings/user_blogs_and_annonces',
        'ProfileController@apiuserblogsannonces'
    )->name('api.userblogs_and_annonces');

    Route::get(
        'user_profile/private',
        'ProfileController@api_user_account'
    )->name('api_user_profile_account.site');

});

Route::get(
    'profile/account',
    'ProfileController@profile_account'
)->name('profile_add_info_account.site');

Route::put(
    'profile/account',
    'ProfileController@profile_account_update'
)->name('profile_add_info_account_update.site');

Route::delete(
    'profile/account_delete/{id}',
    'ProfileController@profile_account_delete'
)->name('profile_add_info_account_delete.site');

Route::get(
    'profile/{profile:slug}/account',
    'ProfileController@profile_add_info_account'
)->name('profile_profile_account_account.site');

Route::put(
    'profile/{profile}',
    'ProfileController@profile_add_info_account_update'
)->name('profile_add_info_account.update');


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
    'profile/change_password',
    'ProfileController@change_password'
)->name('change_password.site');

Route::put('profile/change_password/update_password',
    'ProfileController@updatePassword'
)->name('update_password.site');
