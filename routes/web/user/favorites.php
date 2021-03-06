<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'personal_settings/favoritesuses',
        'FavoriteController@apipersonalfavoritesuses'
    )->name('api.personal_settings_favoritesuses_site');

});

Route::get(
    'profile/{user}/personal_settings/favorite_forums',
    'FavoriteController@sitefavoritforum'
)->name('userfavoriteforum_site');

Route::get(
    'forums_favorites/{forum}/favorite',
    'FavoriteController@favoriteforum'
)->name('forums_favorites.active');

Route::get(
    'forums_unfavorites/{forum}/unfavorites',
    'FavoriteController@unfavoriteforum'
)->name('forums_favorites.unactive');

Route::get(
    'profile/{user}/personal_settings/favorite_employments',
    'FavoriteController@sitefavoritemployment'
)->name('userfavoritemployment_site');

Route::post(
    'employments_favorite/{employment:id}/favorite',
    'FavoriteController@favoritemployment'
)->name('employments_favorites.favorite');

Route::post(
    'employments_unfavorites/{employment:id}/unfavorites',
    'FavoriteController@unfavoritemployment'
)->name('employments_favorites.unactive');

Route::post(
    'annoncelocations_favorite/{annoncelocation:id}/favorite',
    'FavoriteController@favoritannoncelocation'
)->name('annoncelocations_favorites.favorite');

Route::post(
    'annoncelocations_unfavorites/{annoncelocation:id}/unfavorites',
    'FavoriteController@unfavoritannoncelocation'
)->name('annoncelocations_favorites.unactive');

Route::post(
    'activitycities_favorite/{activitycity:id}/favorite',
    'FavoriteController@favoritactivitycity'
)->name('activitycities_favorites.favorite');

Route::post(
    'activitycities_unfavorites/{activitycity:id}/unfavorites',
    'FavoriteController@unfavoritactivitycity'
)->name('activitycities_favorites.unactive');

Route::post(
    'annonceventes_favorite/{annoncevente:id}/favorite',
    'FavoriteController@favoritannoncevente'
)->name('annonceventes_favorites.favorite');

Route::post(
    'annonceventes_unfavorites/{annoncevente:id}/unfavorites',
    'FavoriteController@unfavoritannoncevente'
)->name('annonceventes_favorites.unactive');

Route::post(
    'annoncereservations_favorite/{annoncereservation:id}/favorite',
    'FavoriteController@favoritannoncereservation'
)->name('annoncereservations_favorites.favorite');

Route::post(
    'annoncereservations_unfavorites/{annoncereservation:id}/unfavorites',
    'FavoriteController@unfavoritannoncereservation'
)->name('annoncereservations_favorites.unactive');

Route::post(
    'blogannoncelocations_favorite/{blogannoncelocation:id}/favorite',
    'FavoriteController@favoritblogannoncelocation'
)->name('blogannoncelocations_favorites.favorite');

Route::post(
    'blogannoncelocations_unfavorites/{blogannoncelocation:id}/unfavorites',
    'FavoriteController@unfavoritblogannoncelocation'
)->name('blogannoncelocations_favorites.unactive');

Route::post(
    'blogannonceventes_favorite/{blogannoncevente:id}/favorite',
    'FavoriteController@favoritblogannoncevente'
)->name('blogannonceventes_favorites.favorite');

Route::post(
    'blogannonceventes_unfavorites/{blogannoncevente:id}/unfavorites',
    'FavoriteController@unfavoritblogannoncevente'
)->name('blogannonceventes_favorites.unactive');

Route::post(
    'blogannoncereservations_favorite/{blogannoncereservation:id}/favorite',
    'FavoriteController@favoritblogannoncereservation'
)->name('blogannoncereservations_favorites.favorite');

Route::post(
    'blogannoncereservations_unfavorites/{blogannoncereservation:id}/unfavorites',
    'FavoriteController@unfavoritblogannoncereservation'
)->name('blogannoncereservations_favorites.unactive');

Route::delete(
    'favorites/favorites_delete/{id}/delete',
    'FavoriteController@destroy'
)->name('personal_favorites_delete.site');
