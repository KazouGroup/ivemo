<?php

Route::get(
    'annonces_reservations/{annoncetype}',
    'AnnoncereservationController@index'
)->name('annoncereservationbyannoncetype_site');

Route::get(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}',
    'AnnoncereservationController@annoncelocationbycategoryannoncereservation'
)->name('annoncelocationbycategoryannoncereservations_site');

Route::get(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}',
    'AnnoncereservationController@annoncereservationbycity'
)->name('annoncereservationbycities_site');

Route::get(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}',
    'AnnoncereservationController@annoncelocationbycategoryannoncereservationslug'
)->name('annoncelocationbycategoryannoncereservationslug_site');
