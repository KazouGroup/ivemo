<?php

Route::get(
    'annonces/{annoncetype}',
    'AnnonceventeController@apiannonceventebyannoncetype'
)->name('api.annonceventebyannoncetype_site');

Route::get(
    'annonces/{annoncetype}/{categoryannoncevente}',
    'AnnonceventeController@apiannonceventebycategoryannoncevente'
)->name('api.annonceventebycategoryannonceventes_site');

Route::get(
    'annonces/{annoncetype}/{categoryannoncevente}/{city}',
    'AnnonceventeController@apiannonceventebycity'
)->name('api.annonceventebycities_site');
