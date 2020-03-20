<?php

Route::get(
    'api/categoryannonceventes_by_user',
    'AnnonceventeController@apicategoryannonceventes_by_user'
)->name('api.categoryannonceventes_by_user_site');

Route::get(
    'annonces_ventes/{annoncetype}',
    'AnnonceventeController@index'
)->name('annonceventebyannoncetypes_site');

Route::get(
    'annonces_ventes_active/{id}',
    'AnnonceventeController@activated'
)->name('annonces_ventes_active.site');

Route::get(
    'annonces_ventes_unactive/{id}',
    'AnnonceventeController@unactivated'
)->name('annonces_ventes_unactivated.site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}',
    'AnnonceventeController@annonceventebycategoryannoncevente'
)->name('annonceventebycategoryannonceventes_site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}',
    'AnnonceventeController@annonceventebycity'
)->name('annonceventecities_site');

Route::get(
    'api/profile/{user}/personal_settings/annonces_ventes',
    'AnnonceventeController@apiannoncesventesbyuser'
)->name('api.annoncesventesbyuser_site');

Route::get(
    'profile/{user}/personal_settings/annonces_ventes',
    'AnnonceventeController@annoncesventesbyuser'
)->name('annoncesventesbyuser_site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}',
    'AnnonceventeController@annonceventebycategoryannonceventeslug'
)->name('annonceventebycategoryannonceventeslug_site');

