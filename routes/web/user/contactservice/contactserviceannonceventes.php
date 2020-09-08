<?php



Route::post(
    'avs/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/contactservices',
    'ContactservicannonceventeController@sendcontactserviceannonce'
)->name('annonceventesendcontactservice_site');


Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::get(
            'profile/{user}/personal_mails/avs',
            'ContactservicannonceventeController@personalmessagesdatas'
        )->name('personal_mails_annonceventes.site');

        Route::get(
            'profile/{user}/personal_mails/avs/{contactservice:slug}',
            'ContactservicannonceventeController@personalmessages_show'
        )->name('personal_mails_annonceventes_show.site');

        Route::get(
            'profile/{user}/statistics/avs',
            'ContactservicannonceventeController@contactservice'
        )->name('contactservice_annonceventes.site');

        Route::get(
            'profile/{user}/statistics/als/{annoncevente:slugin}',
            'ContactservicannonceventeController@contactservice_statistique'
        )->name('contactservice_annonceventesbyuserbystatistique_site');

        Route::get(
            'profile/{user}/statistics/als_export/{annoncevente:slugin}',
            'ContactservicannonceventeController@contactservice_export'
        )->name('contactservice_annonceventesbyuserbyexport_site');

        Route::get(
            'profile/{user}/statistics/avs_contactservice_show/{contactservice:slug}',
            'ContactservicannonceventeController@contactservice_statistiqueshow'
        )->name('contactservice_annonceventesbyuserbystatistiqueshow_site');




        Route::group(['prefix' => 'api'], function () {


            Route::get(
                'profile/{user}/statistics/avs',
                'ContactservicannonceventeController@apicontactservice'
            )->name('api.contactservice_annonceventes_site');

            Route::get(
                'profile/{user}/statistics/als/{annoncevente:slugin}',
                'ContactservicannonceventeController@apicontactservice_statistique'
            )->name('api.contactservice_annonceventesbyuserbystatistique_site');

            Route::get(
                'profile/{user}/statistics/avss_contactservice_show/{contactservice:slug}',
                'ContactservicannonceventeController@apicontactservice_statistiqueshow'
            )->name('api.contactservice_annonceventesbyuserbystatistiqueshow_site');


        });


    });

});
