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
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{date}/{annoncevente}',
    'AnnonceventeController@apiannonceventebycategoryannonceventeslug'
)->name('api.annonceventebycategoryannonceventeslug_site');


Route::get(
    'annonces_ventes_by_city_count/{categoryannoncevente}',
    'AnnonceventeController@apiannonceventebycategorycount'
)->name('api.annonceventebycategorycitycount_site');

Route::get(
    'annonces_ventes_by_city_count/{categoryannoncevente}/{city}',
    'AnnonceventeController@apiannonceventebycategorycitycount'
)->name('api.annonceventebycategorycitycount_site');

Route::get(
    'annonces_ventes_interesses/{annoncetype}/{categoryannoncevente}/{city}',
    'AnnonceventeController@apiannonceventeinteresse'
)->name('api.annonceventeinteresse_site');

Route::get(
    'annonces_ventes_interesses/{categoryannoncevente}',
    'AnnonceventeController@apiannonceventeinteresseslug'
)->name('api.annonceventeinteressebycategory_site');
