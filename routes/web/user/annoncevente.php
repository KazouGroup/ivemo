<?php

Route::group(['prefix' => 'api'], function () {


    Route::get(
        'annonces_ventes/{annoncetype}',
        'AnnonceventeController@apiannonceventebyannoncetype'
    )->name('api.annonceventebyannoncetype_site');

    Route::get(
        'annonce_ventes/{annoncetype}/{city}',
        'AnnonceventeController@apiannonceventesbyannoncetypebycity'
    )->name('api.annonceventesbyannoncetypebycity_site');

    Route::get(
        'annonce_ventescount/{annoncetype}/{city}',
        'AnnonceventeController@apiannonceventesbyannoncetypebycitycount'
    )->name('api.annonceventesbyannoncetypebycitycount_site');

    Route::get(
        'annonces_ventescount/{annoncetype}/{categoryannoncevente}',
        'AnnonceventeController@apiannonceventebycategoryannonceventecount'
    )->name('api.annonceventebycategoryannonceventescount_site');

    Route::get(
        'annonces_ventes/{annoncetype}/{categoryannoncevente}',
        'AnnonceventeController@apiannonceventebycategoryannoncevente'
    )->name('api.annonceventebycategoryannonceventes_site');

    Route::get(
        'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}',
        'AnnonceventeController@apiannonceventebycity'
    )->name('api.annonceventebycities_site');

    Route::get(
        'annonces_ventescount/{annoncetype}/{categoryannoncevente}/{city}',
        'AnnonceventeController@apiannonceventebycitycount'
    )->name('api.annonceventebycitiescount_site');

    Route::get(
        'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}',
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
        'annonces_ventes_interesses/{annoncetype}/{categoryannoncevente}/{city}',
        'AnnonceventeController@apiannonceventeinteresse'
    )->name('api.annonceventeinteresse_site');

    Route::get(
        'annonce_vente/{annoncetype}/{annoncevente:slugin}',
        'AnnonceventeController@apiannonceventesbyannoncetypebyannoncevente'
    )->name('api.annonceventesbyannoncetypebyannoncevente_site');


});


Route::get(
    'annonces_ventes/{annoncetype}',
    'AnnonceventeController@index'
)->name('annonceventebyannoncetypes_site');

Route::get(
    'annonce_ventes/{annoncetype}/{city}',
    'AnnonceventeController@annonceventesbyannoncetypebycity'
)->name('annonceventesbyannoncetypebycity_site');

Route::get(
    'annonces_ventes_active/{id}',
    'AnnonceventeController@activated'
)->name('annonces_ventes_active.site');

Route::get(
    'annonces_ventes_unactive/{id}',
    'AnnonceventeController@unactivated'
)->name('annonces_ventes_unactivated.site');

Route::get(
    'annonces_ventes_admin_active/{id}',
    'AnnonceventeController@adminactivated'
)->name('annonces_ventes_admin_active.dashboard');

Route::get(
    'annonces_ventes_admin_unactive/{id}',
    'AnnonceventeController@adminunactivated'
)->name('annonces_ventes_admin_unactivated.dashboard');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}',
    'AnnonceventeController@annonceventebycategoryannoncevente'
)->name('annonceventebycategoryannonceventes_site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}',
    'AnnonceventeController@annonceventebycity'
)->name('annonceventecities_site');

Route::get(
    'profile/{user}/personal_settings/annonces_ventes',
    'AnnonceventeController@annoncesventesbyuser'
)->name('annoncesventesbyuser_site');

Route::get(
    'profile/{user}/personal_settings/annonces_ventes/{categoryannoncevente}',
    'AnnonceventeController@annoncesventesbyusercategory'
)->name('annoncesventesbyusercategory_site');

Route::get(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}',
    'AnnonceventeController@annonceventebycategoryannonceventeslug'
)->name('annonceventebycategoryannonceventeslug_site');

Route::get(
    'annonce_vente/{annoncetype}/{annoncevente:slugin}/edit',
    'AnnonceventeController@edit'
)->name('annonceventesedit_site');

Route::put(
    'annonce_vente/{annoncetype}/{annoncevente:slugin}',
    'AnnonceventeController@update'
)->name('annonceventesupdate_site');

Route::get(
    'annonce_vente/{annoncetype}/new',
    'AnnonceventeController@create'
)->name('annonceventesnew_site');

Route::post(
    'annonce_vente/{annoncetype}/new',
    'AnnonceventeController@store'
)->name('annonceventesstore_site');
