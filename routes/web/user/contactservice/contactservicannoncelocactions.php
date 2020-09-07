<?php



Route::post(
    'als/{annoncetype}/{categoryannoncelocation}/{city}/{user:slug}/{annoncelocation}/contactservices',
    'ContactservicannoncelocationController@sendcontactserviceannonce'
)->name('annoncelocationsendcontactservice_site');




Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::get(
            'profile/{user}/personal_mails/als',
            'ContactservicannoncelocationController@personalmessagesdatas'
        )->name('personal_mails_annoncelocations.site');

        Route::get(
            'profile/{user}/personal_mails/als/{contactservice:slug}',
            'ContactservicannoncelocationController@personalmessages_show'
        )->name('personal_mails_annoncelocations_show.site');

        Route::get(
            'profile/{user}/statistics/als',
            'ContactservicannoncelocationController@contactservice'
        )->name('contactservice_annoncelocations.site');

        Route::get(
            'profile/{user}/statistics/als/{annoncelocation:slugin}',
            'ContactservicannoncelocationController@contactservice_statistique'
        )->name('contactservice_annoncelocationsbyuserbystatistique_site');

        Route::get(
            'profile/{user}/statistics/als_export/{annoncelocation:slugin}',
            'ContactservicannoncelocationController@contactservice_export'
        )->name('contactservice_annoncelocationsbyuserbyexport_site');

        Route::get(
            'profile/{user}/statistics/als_contactservice_show/{contactservice:slug}',
            'ContactservicannoncelocationController@contactservice_statistiqueshow'
        )->name('contactservice_annoncelocationsbyuserbystatistiqueshow_site');




        Route::group(['prefix' => 'api'], function () {


            Route::get(
                'profile/{user}/statistics/als',
                'ContactservicannoncelocationController@apicontactservice'
            )->name('api.contactservice_annoncelocations_site');

            Route::get(
                'profile/{user}/statistics/als/{annoncelocation:slugin}',
                'ContactservicannoncelocationController@apicontactservice_statistique'
            )->name('api.contactservice_annoncelocationsbyuserbystatistique_site');

            Route::get(
                'profile/{user}/statistics/als_contactservice_show/{contactservice:slug}',
                'ContactservicannoncelocationController@apicontactservice_statistiqueshow'
            )->name('api.contactservice_annoncelocationsbyuserbystatistiqueshow_site');


        });


    });

});
