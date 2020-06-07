<?php

Route::post(
    'signalblogannoncelocation_for_all',
    'SignalblogannonceController@signalblogannoncelocation'
)->name('signalblogannoncelocations.site');

Route::post(
    'signalblogannoncereservations',
    'SignalblogannonceController@signalblogannoncereservation'
)->name('signalblogannoncereservations.site');

Route::post(
    'signalblogannonceventes',
    'SignalblogannonceController@signalblogannoncevente'
)->name('signalblogannonceventes.site');
