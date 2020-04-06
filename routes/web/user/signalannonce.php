<?php

Route::post(
    'signalannoncelocations',
    'SignalannonceController@signalannoncelocation'
)->name('signalannoncelocations.site');

Route::post(
    'signalannoncereservations',
    'SignalannonceController@signalannoncereservation'
)->name('signalannoncereservations.site');

Route::post(
    'signalannonceventes',
    'SignalannonceController@signalannoncevente'
)->name('signalannonceventes.site');
