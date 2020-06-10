<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_blogannoncelocations',
        'FavoriteblogannoncelocationController@apiuserdatafavoritfavoriteblogannoncelocation'
    )->name('api.userdatafavoritfavoriteblogannoncelocation');

});

Route::get(
    'profile/{user}/personal_settings/favorite_blogannoncelocations',
    'FavoriteblogannoncelocationController@favoritfavoriteblogannoncelocation'
)->name('userfavoritfavoriteblogannoncelocation_site');

Route::get(
    '/favoriteblogannoncelocations_favorite/{id}',
    'FavoriteblogannoncelocationController@favorite'
)->name('favoriteblogannoncelocations_favorite.favorite');

Route::get(
    '/favoriteblogannoncelocations_unfavorite/{id}',
    'FavoriteblogannoncelocationController@unfavorite'
)->name('favoriteblogannoncelocations_unfavorite.unfavorite');
