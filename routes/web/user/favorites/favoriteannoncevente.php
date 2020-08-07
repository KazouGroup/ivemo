<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_annonces_ventes',
        'FavoriteannonceventeController@apiuserdatafavoriteannoncevente'
    )->name('api.userdatafavoriteannoncevente');

});

Route::get(
    'profile/{user}/personal_settings/favorite_annonces_ventes',
    'FavoriteannonceventeController@favoriteannoncevente'
)->name('userfavoritfavoritegannoncevente_site');
