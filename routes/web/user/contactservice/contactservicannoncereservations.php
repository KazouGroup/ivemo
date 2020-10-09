<?php



Route::post(
    'ars/{annoncetype}/{categoryannoncereservation:slug}/{city:slug}/{user:slug}/{annoncereservation}/contactservices',
    'ContactservicannoncereservationController@sendcontactserviceannonce'
)->name('annoncereservationsendcontactservice_site');




Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::get(
            'profile/{user}/personal_mails/ars',
            'ContactservicannoncereservationController@personalmessagesdatas'
        )->name('personal_mails_annoncereservations.site');

        Route::get(
            'profile/{user}/personal_mails/ars/{contactservice:slug}',
            'ContactservicannoncereservationController@personalmessages_show'
        )->name('personal_mails_annoncereservations_show.site');

        Route::get(
            'profile/{user}/statistics/ars',
            'ContactservicannoncereservationController@contactservice'
        )->name('contactservice_annoncereservations.site');

        Route::get(
            'profile/{user}/statistics/ars/{annoncetype}/{annoncereservation:slugin}',
            'ContactservicannoncereservationController@contactservice_statistique'
        )->name('contactservice_annoncereservationsbyuserbystatistique_site');

        Route::get(
            'profile/{user}/statistics/ars_export/{annoncereservation:slugin}',
            'ContactservicannoncereservationController@contactservice_export'
        )->name('contactservice_annoncereservationsbyuserbyexport_site');

        Route::get(
            'profile/{user}/statistics/ars_contactservice_show/{contactservice:slug}',
            'ContactservicannoncereservationController@contactservice_statistiqueshow'
        )->name('contactservice_annoncereservationsbyuserbystatistiqueshow_site');




        Route::group(['prefix' => 'api'], function () {


            Route::get(
                'profile/{user}/statistics/ars',
                'ContactservicannoncereservationController@apicontactservice'
            )->name('api.contactservice_annoncereservations_site');

            Route::get(
                'profile/{user}/statistics/ars/{annoncetype}/{annoncereservation:slugin}',
                'ContactservicannoncereservationController@apicontactservice_statistique'
            )->name('api.contactservice_annoncereservationsbyuserbystatistique_site');

            Route::get(
                'profile/{user}/statistics/ars_contactservice_show/{contactservice:slug}',
                'ContactservicannoncereservationController@apicontactservice_statistiqueshow'
            )->name('api.contactservice_annoncereservationsbyuserbystatistiqueshow_site');


        });


    });

});
