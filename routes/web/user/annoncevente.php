<?php

Route::group(['prefix' => 'api'], function () {


    Route::get(
        'avs/{annoncetype}',
        'AnnonceventeController@apiannonceventebyannoncetype'
    )->name('api.annonceventebyannoncetype_site');

    Route::get(
        'av/{annoncetype}/{city}',
        'AnnonceventeController@apiannonceventesbyannoncetypebycity'
    )->name('api.annonceventesbyannoncetypebycity_site');

    Route::get(
        'avscount/{annoncetype}/{city}',
        'AnnonceventeController@apiannonceventesbyannoncetypebycitycount'
    )->name('api.annonceventesbyannoncetypebycitycount_site');

    Route::get(
        'avscount/{annoncetype}/{categoryannoncevente}',
        'AnnonceventeController@apiannonceventebycategoryannonceventecount'
    )->name('api.annonceventebycategoryannonceventescount_site');

    Route::get(
        'avs/{annoncetype}/{categoryannoncevente}',
        'AnnonceventeController@apiannonceventebycategoryannoncevente'
    )->name('api.annonceventebycategoryannonceventes_site');

    Route::get(
        'avs/{annoncetype}/{categoryannoncevente}/{city}',
        'AnnonceventeController@apiannonceventebycity'
    )->name('api.annonceventebycities_site');

    Route::get(
        'avscount/{annoncetype}/{categoryannoncevente}/{city}',
        'AnnonceventeController@apiannonceventebycitycount'
    )->name('api.annonceventebycitiescount_site');

    Route::get(
        'avs/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}',
        'AnnonceventeController@apiannonceventebycategoryannonceventeslug'
    )->name('api.annonceventebycategoryannonceventeslug_site');

    Route::get(
        'categoryannonceventes_by_user',
        'AnnonceventeController@apicategoryannonceventes_by_user'
    )->name('api.categoryannonceventes_by_user_site');

    Route::get(
        'profile/{user}/personal_settings/annonces_ventes',
        'AnnonceventeController@apiannoncesventesbyuser'
    )->name('api.annoncesventesbyuser_site');

    Route::get(
        'profile/{user}/personal_settings/annonces_ventes/{categoryannoncevente}',
        'AnnonceventeController@apiannoncesventesbyusercategoryannoncevente'
    )->name('api.annoncesventesbyusercategoryannoncevente_site');

    Route::get(
        'avs_interesses/{annoncetype}/{city}',
        'AnnonceventeController@apiannonceventeinteresse'
    )->name('api.annonceventeinteresse_site');

    Route::get(
        'av_show/{annoncetype}/{annoncevente:slugin}',
        'AnnonceventeController@apiannonceventesbyannoncetypebyannoncevente'
    )->name('api.annonceventesbyannoncetypebyannoncevente_site');


});


Route::get(
    'avs/{annoncetype}',
    'AnnonceventeController@index'
)->name('annonceventebyannoncetypes_site');

Route::get(
    'av/{annoncetype}/{city}',
    'AnnonceventeController@annonceventesbyannoncetypebycity'
)->name('annonceventesbyannoncetypebycity_site');

Route::get(
    'avs/{annoncetype}/{categoryannoncevente}',
    'AnnonceventeController@annonceventebycategoryannoncevente'
)->name('annonceventebycategoryannonceventes_site');

Route::get(
    'avs/{annoncetype}/{categoryannoncevente}/{city}',
    'AnnonceventeController@annonceventebycity'
)->name('annonceventecities_site');

Route::get(
    'avs/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}',
    'AnnonceventeController@annonceventebycategoryannonceventeslug'
)->name('annonceventebycategoryannonceventeslug_site');



Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::get(
            'profile/{user}/personal_settings/avs',
            'AnnonceventeController@annoncesventesbyuser'
        )->name('annoncesventesbyuser_site');

        Route::get(
            'avs_status/{id}/status',
            'AnnonceventeController@statusitem'
        )->name('annonces_ventes_status.site');

        Route::get(
            'als_active_comments/{annoncelocation:id}/active',
            'AnnoncelocationController@activecomments'
        )->name('annoncelocations_active_comments_site');

        Route::get(
            'avs_status_comments/{id}/comment_status',
            'AnnonceventeController@statuscomments'
        )->name('annonces_ventes_status_comments.site');

        Route::get(
            'av_data/{annoncetype}/new',
            'AnnonceventeController@create'
        )->name('annonceventesnew_site');

        Route::post(
            'av_data/{annoncetype}/new',
            'AnnonceventeController@store'
        )->name('annonceventesstore_site');

        Route::get(
            'av_data/{annoncetype}/{annoncevente:slugin}/edit',
            'AnnonceventeController@edit'
        )->name('annonceventesedit_site');

        Route::put(
            'av_data/{annoncetype}/{annoncevente:slugin}',
            'AnnonceventeController@update'
        )->name('annonceventesupdate_site');

        Route::delete(
            'als_delete/{id}/delete',
            'AnnonceventeController@destroy'
        )->name('annonces_ventes_delete.site');

    });

});

Route::get(
    'avs_admin_status/{id}/status_admin',
    'AnnonceventeController@adminstatusitem'
)->name('annonces_ventes_admin_status.dashboard');
