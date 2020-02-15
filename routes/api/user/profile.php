<?php


Route::get(
    '@{user}',
    'ProfileController@apiprofilepublique'
)->name('api.profilpublique');

Route::get(
    '@{user}/annonces_locations',
    'ProfileController@apiprofilannoncelocations'
)->name('api.profilpublique_annoncelocations');

Route::get(
    '@{user}/annonces_reservations',
    'ProfileController@apiprofilannoncereservations'
)->name('api.profilpublique_annoncereservations');

Route::get(
    '@{user}/annonces_ventes',
    'ProfileController@apiprofilannoncereserventes'
)->name('api.profilpublique_annonceventes');

