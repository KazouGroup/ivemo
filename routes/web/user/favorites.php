<?php


Route::get(
    'forums_favorites/{forum}/favorite',
    'FavoriteController@favoriteforum'
)->name('forums_favorites.active');

Route::get(
    'forums_unfavorites/{forum}/unfavorites',
    'FavoriteController@unfavoriteforum'
)->name('forums_favorites.unactive');

