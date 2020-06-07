<?php


Route::get(
    'user/{user}',
    'ProfilepublicController@userpublic_profile'
)->name('userpublic_profile.site');

Route::get(
    'pro/{user}',
    'ProfilepublicController@public_profile'
)->name('public_profile.site');

Route::post(
    'pro/{user}/send_message',
    'ProfilepublicController@public_profile_send_message'
)->name('public_profile_send_message.site');

Route::post(
    '/agences_send_message',
    'ProfilepublicController@public_profile_agences_send_message'
)->name('public_profile_agences_send_message.site');

Route::get(
    'pro/{user}/annonces_locations',
    'ProfilepublicController@publicprofilannoncelocations'
)->name('public_profile_annoncelocations.site');

Route::get(
    'pro/{user}/annonces_reservations',
    'ProfilepublicController@publicprofilannoncereservations'
)->name('public_profile_annoncereservations.site');

Route::get(
    'pro/{user}/annonces_ventes',
    'ProfilepublicController@publicprofilannonceventes'
)->name('public_profile_annonceventes.site');

Route::get(
    'pro/{user}/blogs/annonce_locations/',
    'ProfilepublicController@publicprofilarticleslocations'
)->name('public_profile_articleslocations.site');

Route::get(
    'pro/{user}/blogs/annonce_reservations/',
    'ProfilepublicController@profilblogannoncereservations'
)->name('public_profile_articlesreservation.site');

Route::get(
    'pro/{user}/blogs/annonce_ventes/',
    'ProfilepublicController@profilblogannonceventes'
)->name('public_profile_articlesventes.site');

Route::get(
    'pro/{user}/employments/',
    'ProfilepublicController@profilemployments'
)->name('public_profile_employments.site');
