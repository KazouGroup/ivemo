<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'annonces_reservations/{annoncetype}',
        'AnnoncereservationController@apiannoncereservationbyannoncetype'
    )->name('api.annoncereservationbyannoncetype_site');

    Route::get(
        'annonces_reservations/{annoncetype}/{categoryannoncereservation}',
        'AnnoncereservationController@apiannoncelocationbycategoryannoncereservation'
    )->name('api.annoncelocationbycategoryannoncereservations_site');

    Route::get(
        'annonces_reservationscount/{annoncetype}/{categoryannoncereservation}',
        'AnnoncereservationController@apiannoncelocationbycategoryannoncereservationcount'
    )->name('api.annoncelocationbycategoryannoncereservationscount_site');

    Route::get(
        'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}',
        'AnnoncereservationController@apiannoncereservationbycity'
    )->name('api.annoncereservationbycities_site');

    Route::get(
        'annonces_reservationscount/{annoncetype}/{categoryannoncereservation}/{city}',
        'AnnoncereservationController@apiannoncereservationbycitycount'
    )->name('api.annoncereservationbycitiescount_site');

    Route::get(
        'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}',
        'AnnoncereservationController@apiannoncelocationbycategoryannoncereservationslug'
    )->name('api.annoncelocationbycategoryannoncereservationslug_site');

    Route::get(
        'annonce_reservations/{annoncetype}/{city}',
        'AnnoncereservationController@apiannoncereservationbyannoncetypebycity'
    )->name('api.annoncereservationsbyannoncetypebycity_site');

    Route::get(
        'annonce_reservationscount/{annoncetype}/{city}',
        'AnnoncereservationController@apiannoncereservationbyannoncetypebycitycount'
    )->name('api.annoncereservationsbyannoncetypebycitycount_site');

    Route::get(
        'annonces_interesses/{annoncetype}/{categoryannoncereservation}/{city}',
        'AnnoncereservationController@apiannoncereservationinteresse'
    )->name('api.annoncereservationintersse_site');

    Route::get(
        'profile/{user}/personal_settings/annonces_reservations',
        'AnnoncereservationController@apiannoncesreservationsbyuser'
    )->name('api.annoncesreservationsbyuser_site');


});


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

Route::get(
    'annonce_reservation/{annoncetype}/new',
    'AnnoncereservationController@create'
)->name('annoncereservationsnew_site');
