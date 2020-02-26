<?php

Route::get(
    'annonces_ventes/{annoncetype}',
    'AnnonceventeController@index'
)->name('annonceventebyannoncetypes_site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}',
    'AnnonceventeController@apiannonceventebycategoryannoncevente'
)->name('annonceventebycategoryannonceventes_site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}',
    'AnnonceventeController@apiannonceventecategorybycitycount'
)->name('annonceventecities_site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{date}/{slug}',
    'AnnonceventeController@annonceventebycategoryannonceventeslug'
)->name('annonceventebycategoryannonceventeslug_site');

Route::post(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{date}/{annoncevente}/send_contact_message_user',
    'AnnonceventeController@sendcontactmessageuser'
)->name('annonceventesendcontactmessageuser_site');

