<?php



Route::post(
    'avs/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/contactservices',
    'ContactservicannonceventeController@sendcontactserviceannonce'
)->name('annonceventesendcontactservice_site');


Route::group(['middleware' => 'verified'], function(){


    Route::get(
        'messages/avs',
        'ContactservicannonceventeController@personalmessagesdatas'
    )->name('personal_mails_annonceventes.site');

    Route::get(
        'messages/avs/{contactservice:slug}',
        'ContactservicannonceventeController@personalmessages_show'
    )->name('personal_mails_annonceventes_show.site');

    Route::get(
        'statistics/avs/{annoncetype}/{annoncevente:slugin}',
        'ContactservicannonceventeController@contactservice_statistique'
    )->name('contactservice_annonceventesbyuserbystatistique_site');

    Route::get(
        'statistics/als_export/{annoncetype}/{annoncevente:slugin}/exports',
        'ContactservicannonceventeController@contactservice_export'
    )->name('contactservice_annonceventesbyuserbyexport_site');


    Route::group(['prefix' => 'api'], function () {

        Route::get(
            'statistics/avs/{annoncetype}/{annoncevente:slugin}',
            'ContactservicannonceventeController@apicontactservice_statistique'
        )->name('api.contactservice_annonceventesbyuserbystatistique_site');

        Route::get(
            'messages/avs/{contactservice:slug}',
            'ContactservicannonceventeController@apicontactservice_statistiqueshow'
        )->name('api.contactservice_annonceventesbyuserbystatistiqueshow_site');


    });

});
