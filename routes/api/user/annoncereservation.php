<?php

Route::get(
    'annonces/{annoncetype}',
    'AnnoncereservationController@apiannoncereservationbyannoncetype'
)->name('api.annoncereservationbyannoncetype_site');

Route::get(
    'annonces/{annoncetype}/{categoryannoncereservation}',
    'AnnoncereservationController@apiannoncelocationbycategoryannoncereservation'
)->name('api.annoncelocationbycategoryannoncereservations_site');

Route::get(
    'annonces/{annoncetype}/{categoryannoncereservation}/{city}',
    'AnnoncereservationController@apiannoncereservationbycity'
)->name('api.annoncereservationbycities_site');

Route::get(
    'annonces/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}',
    'AnnoncereservationController@apiannoncelocationbycategoryannoncereservationslug'
)->name('api.annoncelocationbycategoryannoncereservationslug_site');
