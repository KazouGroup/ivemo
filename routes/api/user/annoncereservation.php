<?php

Route::get(
    'categoryannoncereservations',
    'AnnoncereservationController@apicategoryannoncereservation'
)->name('api.categoryannoncereservation_site');

Route::get(
    'annonces_reservations_by_cities',
    'AnnoncereservationController@apicitiesannonces'
)->name('api.citiesannonces_reservations_site');

Route::get(
    'annonces_reservations_by_cities/{categoryannoncereservation}',
    'AnnoncereservationController@apiannoncereservationbycategorycount'
)->name('api.annoncereservationbycategorycount_site');

Route::get(
    'annonces_reservations_by_cities/{categoryannoncereservation}/{city}',
    'AnnoncereservationController@apiannoncereservationcategorybycitycount'
)->name('api.annoncereservationcategorybycitycount_site');

Route::get(
    'annonces_interesses/{annoncetype}/{categoryannoncereservation}/{city}',
    'AnnoncereservationController@apiannoncereservationinteresse'
)->name('api.annoncereservationintersse_site');

Route::get(
    'annonces_interesses/{categoryannoncereservation}/',
    'AnnoncereservationController@apiannoncereservationinteresseslug'
)->name('api.annoncereservationintersse_site');

Route::get(
    'annonces_reservations/{annoncetype}',
    'AnnoncereservationController@apiannoncereservationbyannoncetype'
)->name('api.annoncereservationbyannoncetype_site');

Route::get(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}',
    'AnnoncereservationController@apiannoncelocationbycategoryannoncereservation'
)->name('api.annoncelocationbycategoryannoncereservations_site');

Route::get(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}',
    'AnnoncereservationController@apiannoncereservationbycity'
)->name('api.annoncereservationbycities_site');

Route::get(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}',
    'AnnoncereservationController@apiannoncelocationbycategoryannoncereservationslug'
)->name('api.annoncelocationbycategoryannoncereservationslug_site');
