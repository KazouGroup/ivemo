<?php


Route::get(
    '@{user}',
    'ProfileController@apiprofilepublique'
)->name('api.profilpublique');

Route::get(
    'profile/{user}/r/{annoncetype}',
    'ProfileController@apiannoncereservationbyprofilpublique'
)->name('api.annoncereservationbyprofilpublique');

Route::get(
    'profile/{user}/l/{annoncetype}',
    'ProfileController@apiannoncelocationbyprofilpublique'
)->name('api.annoncelocationbyprofilpublique');
