<?php


Route::get(
    'categoryannonceventes',
    'AnnonceventeController@apicategoryannoncevente'
)->name('api.categoryannoncevente_site');

Route::get(
    'categoryannonceventes/{city}',
    'AnnonceventeController@apicategoryannonceventebycity'
)->name('api.categoryannonceventebycity_site');

Route::get(
    'annonces_ventes_by_cities',
    'AnnonceventeController@apicitiesannonces'
)->name('api.citiesannonceventes_site');

Route::get(
    'annonces_ventes_by_city_count/{categoryannoncevente}',
    'AnnonceventeController@apiannonceventebycategorycount'
)->name('api.annonceventebycategorycitycount_site');

Route::get(
    'annonces_ventes_by_city_count/{categoryannoncevente}/{city}',
    'AnnonceventeController@apiannonceventecategorybycitycount'
)->name('api.annonceventecategorybycitycount_site');


Route::get(
    'annonces_ventes_interesses_categoryannoncevente/{categoryannoncevente}',
    'AnnonceventeController@apiannonceventeinteresseslug'
)->name('api.annonceventeinteressebycategory_site');
