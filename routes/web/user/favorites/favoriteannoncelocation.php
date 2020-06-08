<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_annoncelocations',
        'FavoriteannoncelocationController@apiuserdatafavoritfavoriteannoncelocation'
    )->name('api.userdatafavoritfavoriteannoncelocation');

    Route::get(
        'profile/{user}/personal_settings/favorite_annoncelocations_count',
        'FavoriteannoncelocationController@apifavoritfavoriteannoncelocation_count'
    )->name('api.userfavoritfavoriteannoncelocation_count');

});

Route::get(
    'profile/{user}/personal_settings/favorite_annoncelocations',
    'FavoriteannoncelocationController@favoritfavoriteannoncelocation'
)->name('userfavoritfavoritegannoncelocation_site');

Route::get(
    '/favoriteannoncelocations_favorite/{id}',
    'FavoriteannoncelocationController@favorite'
)->name('favoriteannoncelocations_favorite.favorite');

Route::get(
    '/favoriteannoncelocations_unfavorite/{id}',
    'FavoriteannoncelocationController@unfavorite'
)->name('favoriteannoncelocations_unfavorite.unfavorite');
