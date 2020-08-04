<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_blogannoncelocations',
        'FavoriteblogannoncelocationController@apiuserdatafavoriteblogannoncelocation'
    )->name('api.userdatafavoriteblogannoncelocation');

});

Route::get(
    'profile/{user}/personal_settings/favorite_blogannoncelocations',
    'FavoriteblogannoncelocationController@favoriteblogannoncelocation'
)->name('userfavoritfavoriteblogannoncelocation_site');

Route::get(
    '/favoriteblogannoncelocations_favorite/{id}',
    'FavoriteblogannoncelocationController@favorite'
)->name('favoriteblogannoncelocations_favorite.favorite');

Route::get(
    '/favoriteblogannoncelocations_unfavorite/{id}',
    'FavoriteblogannoncelocationController@unfavorite'
)->name('favoriteblogannoncelocations_unfavorite.unfavorite');


