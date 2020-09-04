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
    'annonces_locations_categoryannoncelocation_interesses/{categoryannoncelocation}',
    'AnnoncelocationController@apiannoncelocationinteressebycategoryannoncelocation'
)->name('api.annoncelocationinteresse_by_categoryannoncelocation_site');
