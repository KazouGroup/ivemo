<?php



Route::post(
    'ars/{annoncetype}/{categoryannoncereservation:slug}/{city:slug}/{user:slug}/{annoncereservation}/reservations',
    'ReservationsannoncereservationController@sendcontactserviceannonce'
)->name('annoncereservationsendreservations_site');


Route::post(
    'reservations/ars/{user:slug}/{annoncetype}/{annoncereservation:slugin}/reservations/',
    'ReservationsannoncereservationController@sendsendcommentcontact'
)->name('reservationsarssendcomment_site');

Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::get(
            'reservations/ars/send',
            'ReservationsannoncereservationController@personalmessagesdatassend'
        )->name('personal_mails_annoncereservationssend.site');

        Route::get(
            'reservations/ars',
            'ReservationsannoncereservationController@personalmessagesdatas'
        )->name('personal_mails_annoncereservations.site');

    });


    Route::get(
        'reservations/ars/{user:slug}/{annoncetype}/{annoncereservation:slugin}',
        'ReservationsannoncereservationController@contactservice_statistiqueshow'
    )->name('reservation_annoncereservationsbyuserbystatistiqueshow_site');

    Route::get(
        'api/reservations/ars/{user:slug}/{annoncetype}/{annoncereservation:slugin}',
        'ReservationsannoncereservationController@apicontactservice_statistique'
    )->name('api.reservation_annoncereservationsbyuserbystatistiqueshow_site');

});
