<?php


Route::get(
    '@{user}',
    'ProfilepublicController@public_profile'
)->name('public_profile.site');

Route::post(
    '@{user}/send_message',
    'ProfilepublicController@public_profile_send_message'
)->name('public_profile_send_message.site');

Route::get(
    '@{user}/annonces_locations',
    'ProfilepublicController@publicprofilannoncelocations'
)->name('public_profile_annoncelocations.site');

Route::get(
    '@{user}/annonces_reservations',
    'ProfilepublicController@publicprofilannoncereservations'
)->name('public_profile_annoncereservations.site');

Route::get(
    '@{user}/annonces_ventes',
    'ProfilepublicController@publicprofilannonceventes'
)->name('public_profile_annonceventes.site');

Route::get(
    '@{user}/blogs/annonce_locations/',
    'ProfilepublicController@publicprofilarticleslocations'
)->name('public_profile_articleslocations.site');

Route::get(
    '@{user}/blogs/annonce_reservations/',
    'ProfilepublicController@profilblogannoncereservations'
)->name('public_profile_articlesreservation.site');

Route::get(
    '@{user}/blogs/annonce_ventes/',
    'ProfilepublicController@profilblogannonceventes'
)->name('public_profile_articlesventes.site');
