<?php


Route::get(
    'pro/{user}',
    'ProfilepublicController@apiprofilepublique'
)->name('api.profilpublique');

Route::get(
    'pro/{user}/annonces_locations',
    'ProfilepublicController@apiprofilannoncelocations'
)->name('api.profilpublique_annoncelocations');

Route::get(
    'pro/{user}/annonces_reservations',
    'ProfilepublicController@apiprofilannoncereservations'
)->name('api.profilpublique_annoncereservations');

Route::get(
    'pro/{user}/annonces_ventes',
    'ProfilepublicController@apiprofilannoncereserventes'
)->name('api.profilpublique_annonceventes');

Route::get(
    'pro/{user}/articles_locations',
    'ProfilepublicController@apiprofilarticleslocations'
)->name('api.profilpublique_articleslocations');

Route::get(
    'pro/{user}/articles_reservations',
    'ProfilepublicController@apiprofilarticlesreservations'
)->name('api.profilpublique_articlesreservations');

Route::get(
    'pro/{user}/blogs/annonce_locations',
    'ProfilepublicController@apiprofilblogannoncelocations'
)->name('api.profilpublique_blogannoncelocations');

Route::get(
    'pro/{user}/blogs/annonce_reservations',
    'ProfilepublicController@apiprofilblogannoncereservations'
)->name('api.profilpublique_blogannoncerewservations');

Route::get(
    'pro/{user}/blogs/annonce_ventes',
    'ProfilepublicController@apiprofilblogannonceventes'
)->name('api.profilpublique_blogannonceventes');
