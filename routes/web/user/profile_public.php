<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'pro/{user}',
        'ProfilepublicController@apiprofilepublique'
    )->name('api.profilpublique');

    Route::get(
        'pro/{user}/als/{annoncetype}',
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

    Route::get(
        'pro/{user}/employments',
        'ProfilepublicController@apiprofilemployments'
    )->name('api.profilpublique_employments');

    Route::get(
        'pro/{user}/forums',
        'ProfilepublicController@apiprofilforums'
    )->name('api.profilpublique_forums');

});


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
    'pro/{user}/als/{annoncetype}',
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

Route::get(
    'pro/{user}/forums',
    'ProfilepublicController@profilforums'
)->name('public_profile_forums.site');

