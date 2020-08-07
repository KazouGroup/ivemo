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
