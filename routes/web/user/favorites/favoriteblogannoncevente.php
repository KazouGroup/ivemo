<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_blogannonceventes',
        'FavoriteblogannonceventeController@apiuserdatafavoriteblogannoncevente'
    )->name('api.userdatafavoriteblogannoncevente');

});

Route::get(
    'profile/{user}/personal_settings/favorite_blogannonceventes',
    'FavoriteblogannonceventeController@favoriteblogannoncevente'
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
    '/likedatablogannonceventes_likedata/{id}',
    'FavoriteblogannonceventeController@likedata'
)->name('likeblogannonceventes_likedata.likedata');

Route::get(
    '/likedatablogannonceventes_unlikedata/{id}',
    'FavoriteblogannonceventeController@unlikedata'
)->name('likeblogannonceventes_unlikedata.unlikedata');
