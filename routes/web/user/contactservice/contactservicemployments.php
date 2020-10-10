<?php



Route::post(
    'employments/{categoryemployment}/{city}/{employment}/contactservices',
    'ContactservicemploymentController@sendcontactservice'
)->name('employmentsendcontactservice_site');




Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::get(
            'messages/employments',
            'ContactservicemploymentController@personalmessagesemployments'
        )->name('personal_mails_employments.site');

        Route::get(
            'messages/employments/{contactservice:slug}',
            'ContactservicemploymentController@contactservice_statistiqueshow'
        )->name('contactservice_employmentsbyuserbystatistiqueshow_site');

        Route::get(
            'statistics/employments/{employment:slugin}',
            'ContactservicemploymentController@contactservice_statistique'
        )->name('contactservice_employmentsbyuserbystatistique_site');

        Route::get(
            '/statistics/employments/{employment:slugin}/exports',
            'ContactservicemploymentController@contactservice_export'
        )->name('contactservice_employmentsbyuserbyexport_site');



        Route::group(['prefix' => 'api'], function () {

            Route::get(
                'statistics/employments/{employment:slugin}',
                'ContactservicemploymentController@apicontactservice_statistique'
            )->name('api.contactservice_employmentsbyuserbystatistique_site');

            Route::get(
                'messages/employments/{contactservice:slug}',
                'ContactservicemploymentController@apicontactservice_statistiqueshow'
            )->name('api.contactservice_employmentsbyuserbystatistiqueshow_site');

        });


    });

});
