<?php


Route::get(
    'categoryannonceventes',
    'AnnonceventeController@apicategoryannoncevente'
)->name('api.categoryannoncevente_site');

Route::get(
    'annonces_ventes/{annoncetype}',
    'AnnonceventeController@apiannonceventebyannoncetype'
)->name('api.annonceventebyannoncetype_site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}',
    'AnnonceventeController@apiannonceventebycategoryannoncevente'
)->name('api.annonceventebycategoryannonceventes_site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}',
    'AnnonceventeController@apiannonceventebycity'
)->name('api.annonceventebycities_site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}',
    'AnnonceventeController@apiannonceventebycategoryannonceventeslug'
)->name('api.annoncelocationbycategoryannonceventeslug_site');

Route::get(
    'annonces_ventes_by_city_count/{categoryannoncevente}',
    'AnnonceventeController@apiannonceventebycategorycitycount'
)->name('api.annonceventebycategorycitycount_site');

Route::get(
    'annonces_ventes_by_city_count/{categoryannoncevente}/{city}',
    'AnnonceventeController@apiannonceventebycategorycitycount'
)->name('api.annonceventebycategorycitycount_site');
