<?php

Route::get(
    'categoryannoncereservations',
    'AnnoncereservationController@apicategoryannoncereservation'
)->name('api.categoryannoncereservation_site');

Route::get(
    'categoryannoncereservations/{city}',
    'AnnoncereservationController@apicategoryannoncereservationbycity'
)->name('api.categoryannoncereservationbycity_site');

Route::get(
    'annonces_reservations_by_cities',
    'AnnoncereservationController@apicitiesannonces'
)->name('api.citiesannoncereservations_site');

Route::get(
    'annonces_reservations_by_cities/{categoryannoncereservation}',
    'AnnoncereservationController@apiannoncereservationbycategorycount'
)->name('api.annoncereservationbycategorycount_site');

Route::get(
    'annonces_reservations_by_cities/{categoryannoncereservation}/{city}',
    'AnnoncereservationController@apiannoncereservationcategorybycitycount'
)->name('api.annoncereservationcategorybycitycount_site');

Route::get(
    'annonces_reservations_interesses/{categoryannoncereservation}/',
    'AnnoncereservationController@apiannoncereservationinteresseslugin'
)->name('api.annoncereservationinteresse_site');
