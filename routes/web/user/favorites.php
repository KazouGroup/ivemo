<?php


Route::get(
    'forums_favorites/{forum}/favorite',
    'FavoriteController@favoriteforum'
)->name('forums_favorites.active');

Route::get(
    'forums_unfavorites/{forum}/unfavorites',
    'FavoriteController@unfavoriteforum'
)->name('forums_favorites.unactive');

Route::post(
    '/employments_favorite/{employment:id}/favorite',
    'FavoriteController@favoritemployment'
)->name('employments_favorites.favorite');

Route::post(
    'employments_unfavorites/{employment:id}/unfavorites',
    'FavoriteController@unfavoritemployment'
)->name('employments_favorites.unactive');
