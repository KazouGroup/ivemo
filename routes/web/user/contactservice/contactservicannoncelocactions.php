<?php



Route::post(
    'als/{annoncetype}/{categoryannoncelocation}/{city}/{user:slug}/{annoncelocation}/contactservices',
    'ContactservicannoncelocationController@sendcontactserviceannonce'
)->name('annoncelocationsendcontactservice_site');




Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::get(
            'messages/als',
            'ContactservicannoncelocationController@personalmessagesdatas'
        )->name('personal_mails_annoncelocations.site');

        Route::get(
            'messages/als/{contactservice:slug}',
            'ContactservicannoncelocationController@personalmessages_show'
        )->name('personal_mails_annoncelocations_show.site');

        Route::get(
            'statistics/als/{annoncetype}/{annoncelocation:slugin}',
            'ContactservicannoncelocationController@contactservice_statistique'
        )->name('contactservice_annoncelocationsbyuserbystatistique_site');

        Route::get(
            'statistics/als_export/{annoncetype}/{annoncelocation:slugin}/exports',
            'ContactservicannoncelocationController@contactservice_export'
        )->name('contactservice_annoncelocationsbyuserbyexport_site');


        Route::group(['prefix' => 'api'], function () {

            Route::get(
                'statistics/als/{annoncetype}/{annoncelocation:slugin}',
                'ContactservicannoncelocationController@apicontactservice_statistique'
            )->name('api.contactservice_annoncelocationsbyuserbystatistique_site');

            Route::get(
                'messages/als/{contactservice:slug}',
                'ContactservicannoncelocationController@apicontactservice_statistiqueshow'
            )->name('api.contactservice_annoncelocationsbyuserbystatistiqueshow_site');


        });


    });

});
