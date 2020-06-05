<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_settings/favorite_employments',
        'FavoritemploymentController@apifavoritemployment'
    )->name('api.userfavoritemployment');

    Route::get(
        'profile/{user}/personal_settings/favorite_employments_count',
        'FavoritemploymentController@apifavoritemployment_count'
    )->name('api.userfavoritemployment_count');

});

Route::get(
    'profile/{user}/personal_settings/favorite_employments',
    'FavoritemploymentController@favoritemployment'
)->name('userfavoritemployment_site');

Route::get(
    '/employments_favorite/{id}',
     'FavoritemploymentController@favorite'
)->name('employments_favorite.favorite');

Route::get(
    '/employments_unfavorite/{id}',
     'FavoritemploymentController@unfavorite'
)->name('employments_unfavorite.unfavorite');
