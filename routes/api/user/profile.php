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

Route::get(
    '@{user}/articles_locations',
    'ProfileController@apiprofilarticleslocations'
)->name('api.profilpublique_articleslocations');

Route::get(
    '@{user}/articles_reservations',
    'ProfileController@apiprofilarticlesreservations'
)->name('api.profilpublique_articlesreservations');

Route::get(
    '@{user}/blogs/annonce_locations',
    'ProfileController@apiprofilblogannoncelocations'
)->name('api.profilpublique_blogannoncelocations');
