<?php



Route::post(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/contactservices',
    'ContactservicannonceventeController@sendcontactservice'
)->name('annonceventesendcontactservice_site');


Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){



        Route::get(
            'profile/{user}/statistics/annonceventes',
            'ContactservicannonceventeController@contactservice'
        )->name('contactservice_annonceventes.site');

        Route::get(
            'profile/{user}/statistics/annonceventes/{annoncevente:slugin}',
            'ContactservicannonceventeController@contactservice_statistique'
        )->name('contactservice_annonceventesbyuserbystatistique_site');

        Route::get(
            'profile/{user}/statistics/annonceventes_export/{annoncevente:slugin}',
            'ContactservicannonceventeController@contactservice_export'
        )->name('contactservice_annonceventesbyuserbyexport_site');

        Route::get(
            'profile/{user}/statistics/annonceventes/{annoncevente:slugin}/{contactservice:slug}',
            'ContactservicannonceventeController@contactservice_statistiqueshow'
        )->name('contactservice_annonceventesbyuserbystatistiqueshow_site');


        Route::group(['prefix' => 'api'], function () {

            Route::get(
                'profile/{user}/statistics/annonceventes',
                'ContactservicannonceventeController@apicontactservice'
            )->name('api.contactservice_annonceventes_site');

            Route::get(
                'profile/{user}/statistics/annonceventes/{annoncevente:slugin}',
                'ContactservicannonceventeController@apicontactservice_statistique'
            )->name('api.contactservice_annonceventesbyuserbystatistique_site');

            Route::get(
                'profile/{user}/statistics/annonceventes/{annoncevente:slugin}/{contactservice:slug}',
                'ContactservicannonceventeController@apicontactservice_statistiqueshow'
            )->name('api.contactservice_annonceventesbyuserbystatistiqueshow_site');


            Route::get(
                '{user}/statistics/archvement_annonceventes',
                'ContactservicannonceventeController@apicontactservicearchvment'
            )->name('api.contactservice_archvement_annoncevente.site');

            Route::get(
                '{user}/statistics/favorite_annonceventes',
                'ContactservicannonceventeController@apicontactservicefavorite'
            )->name('api.contacteservice_favorite_annonceventes.site');

        });



    });

});

