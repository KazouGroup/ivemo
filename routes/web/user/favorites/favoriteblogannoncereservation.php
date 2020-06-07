<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_blogannoncereservations',
        'FavoriteblogannoncereservationController@apiuserdatafavoritfavoriteblogannoncereservation'
    )->name('api.userdatafavoritfavoriteblogannoncereservation');

});

Route::get(
    'profile/{user}/personal_settings/favorite_blogannoncereservations',
    'FavoriteblogannoncereservationController@favoritfavoriteblogannoncereservation'
)->name('userfavoritfavoriteblogannoncereservation_site');

Route::get(
    '/favoriteblogannoncereservations_favorite/{id}',
    'FavoriteblogannoncereservationController@favorite'
)->name('favoriteblogannoncereservations_favorite.favorite');

Route::get(
    '/favoriteblogannoncereservations_unfavorite/{id}',
    'FavoriteblogannoncereservationController@unfavorite'
)->name('favoriteblogannoncereservations_unfavorite.unfavorite');
