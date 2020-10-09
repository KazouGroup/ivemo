<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'ars/{annoncetype}',
        'AnnoncereservationController@apiannoncereservationbyannoncetype'
    )->name('api.annoncereservationbyannoncetype_site');

    Route::get(
        'ars/{annoncetype}/{categoryannoncereservation}',
        'AnnoncereservationController@apiannoncereservationbycategoryannoncereservation'
    )->name('api.annoncereservationbycategoryannoncereservations_site');

    Route::get(
        'annonces_reservationscount/{annoncetype}/{categoryannoncereservation}',
        'AnnoncereservationController@apiannoncereservationbycategoryannoncereservationcount'
    )->name('api.annoncereservationbycategoryannoncereservationscount_site');

    Route::get(
        'ars/{annoncetype}/{categoryannoncereservation}/{city}',
        'AnnoncereservationController@apiannoncereservationbycity'
    )->name('api.annoncereservationbycities_site');

    Route::get(
        'annonces_reservationscount/{annoncetype}/{categoryannoncereservation}/{city}',
        'AnnoncereservationController@apiannoncereservationbycitycount'
    )->name('api.annoncereservationbycitiescount_site');

    Route::get(
        'ars/{annoncetype}/{categoryannoncereservation}/{city}/{user:slug}/{annoncereservation}',
        'AnnoncereservationController@apiannoncereservationbycategoryannoncereservationslug'
    )->name('api.annoncereservationbycategoryannoncereservationslug_site');

    Route::get(
        'ar/{annoncetype}/{city}',
        'AnnoncereservationController@apiannoncereservationbyannoncetypebycity'
    )->name('api.annoncereservationsbyannoncetypebycity_site');

    Route::get(
        'arscount/{annoncetype}/{city}',
        'AnnoncereservationController@apiannoncereservationbyannoncetypebycitycount'
    )->name('api.annoncereservationsbyannoncetypebycitycount_site');

    Route::get(
        'annonces_interesses/{annoncetype}/{user}',
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
    'ars/{annoncetype}',
    'AnnoncereservationController@index'
)->name('annoncereservationbyannoncetype_site');

Route::get(
    'ar/{annoncetype}/{city}',
    'AnnoncereservationController@annoncereservationsbyannoncetypebycity'
)->name('annoncereservationsbyannoncetypebycity_site');

Route::get(
    'profile/{user}/personal_settings/annonces_reservations',
    'AnnoncereservationController@annoncesreservationsbyuser'
)->name('annoncesreservationsbyuser_site');

Route::get(
    'ars/{annoncetype}/{categoryannoncereservation}',
    'AnnoncereservationController@annoncereservationbycategoryannoncereservation'
)->name('annoncereservationbycategoryannoncereservations_site');

Route::get(
    'ars/{annoncetype}/{categoryannoncereservation}/{city}',
    'AnnoncereservationController@annoncereservationbycity'
)->name('annoncereservationbycities_site');

Route::get(
    'ars/{annoncetype}/{categoryannoncereservation}/{city}/{user:slug}/{annoncereservation}',
    'AnnoncereservationController@annoncereservationbycategoryannoncereservationslug'
)->name('annoncereservationbycategoryannoncereservationslug_site');

Route::post(
    'ars/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/send_reservation',
    'AnnoncereservationController@sendannoncereservation'
)->name('sendannoncereservation_site');

Route::post(
    'ars/{annoncetype}/{categoryannoncereservation}/{city}/{user}/{annoncereservation}/send_contact_message_user',
    'AnnoncereservationController@sendcontactmessageuser'
)->name('annoncereservationsendcontactmessageuser_site');

Route::get(
    'annonces_reservations_status_comments/{id}',
    'AnnoncereservationController@statuscomments'
)->name('annonces_reservations_status_comments.site');

Route::delete(
    'annonces_reservations_delete/{id}',
    'AnnoncereservationController@destroy'
)->name('annonces_reservations_delete.site');

Route::get(
    'annonce_reservation/{annoncetype}/new',
    'AnnoncereservationController@create'
)->name('annoncereservationsnew_site');


Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){

        Route::get(
            'profile/{user}/personal_settings/ars/{annoncetype}',
            'AnnoncereservationController@annonceslocationsbyuser'
        )->name('profilprivate_annoncereservations');

        Route::get(
            'ars_status/{id}/status',
            'AnnoncereservationController@statusitem'
        )->name('annonces_reservations_status.site');

        Route::get(
            'ars_active_comments/{annoncereservation:id}/active',
            'AnnoncereservationController@activecomments'
        )->name('annoncereservations_active_comments_site');

        Route::get(
            'ars_active_comments/{annoncereservation:id}/desactive',
            'AnnoncereservationController@desactivecomments'
        )->name('annoncereservations_desactive_comments_site');

        Route::get(
            'ar_data/{annoncetype}/{annoncereservation:slugin}/edit',
            'AnnoncereservationController@edit'
        )->name('annoncereservationsedit_site');

        Route::put(
            'ar/{annoncetype}/{annoncereservation:slugin}',
            'AnnoncereservationController@update'
        )->name('annoncereservationsupdate_site');

        Route::get(
            'ar_data/{annoncetype}/new',
            'AnnoncereservationController@create'
        )->name('annoncereservationsnew_site');

        Route::post(
            'ar_data/{annoncetype}/new',
            'AnnoncereservationController@store'
        )->name('annoncereservationsstore_site');

        Route::delete(
            'ars_delete/{id}/delete',
            'AnnoncereservationController@destroy'
        )->name('annonces_reservations_delete.site');

    });

});
