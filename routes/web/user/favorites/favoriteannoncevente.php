<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_annonceventes',
        'FavoriteannonceventeController@apiuserdatafavoritfavoriteannoncevente'
    )->name('api.userdatafavoritfavoriteannoncevente');

    Route::get(
        'profile/{user}/personal_settings/favorite_annonceventes_count',
        'FavoriteannonceventeController@apifavoritfavoriteannoncevente_count'
    )->name('api.userfavoritfavoriteannoncevente_count');

});

Route::get(
    'profile/{user}/personal_settings/favorite_annonceventes',
    'FavoriteannonceventeController@favoritfavoriteannoncevente'
)->name('userfavoritfavoritegannoncevente_site');

Route::get(
    '/favoriteannonceventes_favorite/{id}',
    'FavoriteannonceventeController@favorite'
)->name('favoriteannonceventes_favorite.favorite');

Route::get(
    '/favoriteannonceventes_unfavorite/{id}',
    'FavoriteannonceventeController@unfavorite'
)->name('favoriteannonceventes_unfavorite.unfavorite');
