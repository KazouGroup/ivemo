<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_annonces_locations',
        'FavoriteannoncelocationController@apiuserdatafavoriteannoncelocation'
    )->name('api.userdatafavoriteannoncelocation');

});

Route::get(
    'profile/{user}/personal_settings/favorite_annonces_locations',
    'FavoriteannoncelocationController@favoriteannoncelocation'
)->name('userfavoritegannoncelocation_site');

Route::get(
    '/favoriteannoncelocations_favorite/{id}',
    'FavoriteannoncelocationController@favorite'
)->name('favoriteannoncelocations_favorite.favorite');
