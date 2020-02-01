<?php
Route::get(
    'annonceslocations',
    'AnnoncelocationController@api'
)->name('api.annoncelocations');

Route::get(
    'annonces',
    'AnnoncelocationController@apiannoncelocations'
)->name('api.annoncelocations_site');

Route::get(
    'annonces/{annoncetype}',
    'AnnoncelocationController@apiannoncelocationbyannoncetype'
)->name('api.annoncelocationbyannoncetype_site');

Route::get(
    'annonces/{annoncetype}/{categoryannoncelocation}',
    'AnnoncelocationController@apiannoncelocationbycategoryannoncelocation'
)->name('api.annoncelocationbycategoryannoncelocations_site');

Route::get(
    'annonces/{annoncetype}/{categoryannoncelocation}/{city}',
    'AnnoncelocationController@apiannoncelocationbycity'
)->name('api.annoncelocationbycities_site');


Route::get(
    'annonces/{annoncetype}/{categoryannoncelocation}/{city}/{annoncelocation}',
    'AnnoncelocationController@apiannoncelocationbycategoryannoncelocationslug'
)->name('api.annoncelocationbycategoryannoncelocationslug_site');
