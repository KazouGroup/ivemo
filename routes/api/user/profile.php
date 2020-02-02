<?php


Route::get(
    'profile/{user}',
    'ProfileController@apiprofilepublique'
)->name('api.profilpublique');

Route::get(
    'profile/{user}/{annoncetype}',
    'ProfileController@apiannoncereservationbyprofilpublique'
)->name('api.annoncebyprofilpublique');
