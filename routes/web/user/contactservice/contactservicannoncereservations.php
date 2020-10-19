<?php



Route::post(
    'ars/{annoncetype}/{categoryannoncereservation:slug}/{city:slug}/{user:slug}/{annoncereservation}/contactservices',
    'ContactservicannoncereservationController@sendcontactserviceannonce'
)->name('annoncereservationsendcontactservice_site');


Route::post(
    'messages/ars/{user:slug}/{annoncetype}/{annoncereservation:slugin}/contactservices/{contactservice}/responses',
    'ContactservicannoncereservationController@sendresponsecommentcotact'
)->name('contactservicesarssendresponsecomment_site');

Route::post(
    'messages/ars/{user:slug}/{annoncetype}/{annoncereservation:slugin}/contactservices/',
    'ContactservicannoncereservationController@sendsendcommentcontact'
)->name('contactservicesarssendcomment_site');

Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::get(
            'messages/ars/send',
            'ContactservicannoncereservationController@personalmessagesdatassend'
        )->name('personal_mails_annoncereservationssend.site');

        Route::get(
            'messages/ars',
            'ContactservicannoncereservationController@personalmessagesdatas'
        )->name('personal_mails_annoncereservations.site');

        Route::get(
            'statistics/ars/{annoncetype}/{annoncereservation:slugin}',
            'ContactservicannoncereservationController@contactservice_statistique'
        )->name('contactservice_annoncereservationsbyuserbystatistique_site');

        Route::get(
            'statistics/ars_export/{annoncetype}/{annoncereservation:slugin}/',
            'ContactservicannoncereservationController@contactservice_export'
        )->name('contactservice_annoncereservationsbyuserbyexport_site');



        Route::group(['prefix' => 'api'], function () {

            Route::get(
                'statistics/ars/{annoncetype}/{annoncereservation:slugin}',
                'ContactservicannoncereservationController@apicontactservice_statistique'
            )->name('api.contactservice_annoncereservationsbyuserbystatistique_site');

        });


    });


    Route::get(
        'messages/ars/{user:slug}/{annoncetype}/{annoncereservation:slugin}',
        'ContactservicannoncereservationController@contactservice_statistiqueshow'
    )->name('contactservice_annoncereservationsbyuserbystatistiqueshow_site');

    Route::get(
        'api/messages/ars/{user:slug}/{annoncetype}/{annoncereservation:slugin}',
        'ContactservicannoncereservationController@apicontactservice_statistiqueshow'
    )->name('api.contactservice_annoncereservationsbyuserbystatistiqueshow_site');

});
