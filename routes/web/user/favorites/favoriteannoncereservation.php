<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_annonces_reservations',
        'FavoriteannoncereservationController@apiuserdatafavoriteannoncereservation'
    )->name('api.userdatafavoriteannoncereservation');

});

Route::get(
    'profile/{user}/personal_settings/favorite_annonces_reservations',
    'FavoriteannoncereservationController@favoriteannoncereservation'
)->name('userfavoritegannoncereservations_site');

Route::get(
    '/favoriteannoncereservations_favorite/{id}',
    'FavoriteannoncereservationController@favorite'
)->name('favoriteannoncereservations_favorite.favorite');
