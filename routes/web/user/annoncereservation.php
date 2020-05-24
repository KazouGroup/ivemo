<?php


Route::get(
    'api/categoryannoncereservations_by_user',
    'AnnoncereservationController@apicategoryannoncereservations_by_user'
)->name('api.categoryannoncereservations_by_user_site');

Route::get(
    'annonces_reservations/{annoncetype}',
    'AnnoncereservationController@index'
)->name('annoncereservationbyannoncetype_site');

Route::get(
    'annonce_reservations/{annoncetype}/{city}',
    'AnnoncereservationController@annoncereservationsbyannoncetypebycity'
)->name('annoncereservationsbyannoncetypebycity_site');

Route::get(
    'api/profile/{user}/personal_settings/annonces_reservations',
    'AnnoncereservationController@apiannoncesreservationsbyuser'
)->name('api.annoncesreservationsbyuser_site');

Route::get(
    'profile/{user}/personal_settings/annonces_reservations',
    'AnnoncereservationController@annoncesreservationsbyuser'
)->name('annoncesreservationsbyuser_site');

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

Route::post(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/send_reservation',
    'AnnoncereservationController@sendannoncereservation'
)->name('sendannoncereservation_site');

Route::post(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/send_contact_message_user',
    'AnnoncereservationController@sendcontactmessageuser'
)->name('annoncereservationsendcontactmessageuser_site');

Route::get(
    'annonces_reservations_active/{id}',
    'AnnoncereservationController@activated'
)->name('annonces_reservations_active.site');

Route::get(
    'annonces_reservations_unactive/{id}',
    'AnnoncereservationController@unactivated'
)->name('annonces_reservations_unactivated.site');

Route::delete(
    'annonces_reservations_delete/{id}',
    'AnnoncereservationController@destroy'
)->name('annonces_reservations_delete.site');
