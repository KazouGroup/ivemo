<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_employments',
        'FavoritemploymentController@apiuserdatafavoritemployment'
    )->name('api.userdatafavoritemployment');

});

Route::get(
    'profile/{user}/personal_settings/favorite_employments',
    'FavoritemploymentController@favoritemployment'
)->name('userfavoritemployment_site');

Route::get(
    '/employments_favorite/{id}',
     'FavoritemploymentController@favorite'
)->name('employments_favorite.favorite');
