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

Route::get(
    '/likedatablogannoncereservations_likedata/{id}',
    'FavoriteblogannoncereservationController@likedata'
)->name('likeblogannoncereservations_likedata.likedata');

Route::get(
    '/likedatablogannoncereservations_unlikedata/{id}',
    'FavoriteblogannoncereservationController@unlikedata'
)->name('likeblogannoncereservations_unlikedata.unlikedata');
