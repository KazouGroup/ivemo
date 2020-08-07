<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_blogannoncereservations',
        'FavoriteblogannoncereservationController@apiuserdatafavoritfavoriteblogannoncereservation'
    )->name('api.userdatafavoritfavoriteblogannoncereservation');

});

Route::get(
    'profile/{user}/personal_settings/favorite_blogannoncereservations',
    'FavoriteblogannoncereservationController@favoriteblogannoncereservation'
)->name('userfavoritfavoriteblogannoncereservation_site');
