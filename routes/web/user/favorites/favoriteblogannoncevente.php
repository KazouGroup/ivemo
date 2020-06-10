<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_blogannonceventes',
        'FavoriteblogannonceventeController@apiuserdatafavoritfavoriteblogannoncevente'
    )->name('api.userdatafavoritfavoriteblogannoncevente');

});

Route::get(
    'profile/{user}/personal_settings/favorite_blogannonceventes',
    'FavoriteblogannonceventeController@favoritfavoriteblogannoncevente'
)->name('userfavoritfavoriteblogannoncevente_site');

Route::get(
    '/favoriteblogannonceventes_favorite/{id}',
    'FavoriteblogannonceventeController@favorite'
)->name('favoriteblogannonceventes_favorite.favorite');

Route::get(
    '/favoriteblogannonceventes_unfavorite/{id}',
    'FavoriteblogannonceventeController@unfavorite'
)->name('favoriteblogannonceventes_unfavorite.unfavorite');

Route::get(
    '/favoriteannonceventes_favorite/{id}',
    'FavoriteannonceventeController@favorite'
)->name('favoriteannonceventes_favorite.favorite');

Route::get(
    '/favoriteannonceventes_unfavorite/{id}',
    'FavoriteannonceventeController@unfavorite'
)->name('favoriteannonceventes_unfavorite.unfavorite');
