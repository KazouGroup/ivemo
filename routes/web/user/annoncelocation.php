<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'annonces_locations/{annoncetype}',
        'AnnoncelocationController@apiannoncelocationbyannoncetype'
    )->name('api.annoncelocationbyannoncetype_site');

    Route::get(
        'annonces_locationscount/{annoncetype}/{categoryannoncelocation}',
        'AnnoncelocationController@apiannoncelocationbycategoryannoncelocationcount'
    )->name('api.annoncelocationbycategoryannoncelocationscount_site');

    Route::get(
        'annonces_locations/{annoncetype}/{categoryannoncelocation}',
        'AnnoncelocationController@apiannoncelocationbycategoryannoncelocation'
    )->name('api.annoncelocationbycategoryannoncelocations_site');

    Route::get(
        'annonces_locationscount/{annoncetype}/{categoryannoncelocation}/{city}',
        'AnnoncelocationController@apiannoncelocationbycitycount'
    )->name('api.annoncelocationbycitiescount_site');

    Route::get(
        'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}',
        'AnnoncelocationController@apiannoncelocationbycity'
    )->name('api.annoncelocationbycities_site');

    Route::get(
        'annonce_locationscount/{annoncetype}/{city}',
        'AnnoncelocationController@apiannoncelocationsbyannoncetypebycitycount'
    )->name('api.annoncelocationsbyannoncetypebycitycount_site');

    Route::get(
        'annonce_locations/{annoncetype}/{city}',
        'AnnoncelocationController@apiannoncelocationsbyannoncetypebycity'
    )->name('api.annoncelocationsbyannoncetypebycity_site');

    Route::get(
        'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}/{annoncelocation}',
        'AnnoncelocationController@apiannoncelocationbycategoryannoncelocationslug'
    )->name('api.annoncelocationbycategoryannoncelocationslug_site');

    Route::get(
        'categoryannoncelocations_by_user',
        'AnnoncelocationController@apicategoryannoncelocations_by_user'
    )->name('api.categoryannoncelocations_by_user_site');

    Route::get(
        'profile/{user}/personal_settings/annonces_locations',
        'AnnoncelocationController@apiannonceslocationsbyuser'
    )->name('api.annonceslocationsbyuser_site');

    Route::get(
        'annonce_location/{annoncetype}/{annoncelocation:slugin}',
        'AnnoncelocationController@apiannoncelocationsbyannoncetypebyannoncelocation'
    )->name('api.annoncelocationsbyannoncetypebyannoncelocation_site');

    Route::get(
        'annonces_locations_interesses/{annoncetype}/{categoryannoncelocation}/{city}',
        'AnnoncelocationController@apiannoncelocationinteressebycity'
    )->name('api.annoncelocationinteresse_by_city_site');

});

Route::get(
    'annonces_locations/{annoncetype}',
    'AnnoncelocationController@index'
)->name('annoncelocationbyannoncetypes_site');

Route::get(
    'annonce_locations/{annoncetype}/{city}',
    'AnnoncelocationController@annoncelocationsbyannoncetypebycity'
)->name('annoncelocationsbyannoncetypebycity_site');

Route::get(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}',
    'AnnoncelocationController@annoncelocationbycategoryannoncelocation'
)->name('annoncelocationbycategoryannoncelocations_site');

Route::get(
    'profile/{user}/personal_settings/annonces_locations',
    'AnnoncelocationController@annonceslocationsbyuser'
)->name('annonceslocationsbyuser_site');

Route::get(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}',
    'AnnoncelocationController@annoncelocationnbycity'
)->name('annoncelocationbycities_site');

Route::get(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}/{annoncelocation}',
    'AnnoncelocationController@annoncelocationbycategoryannoncelocationslug'
)->name('annoncelocationbycategoryannoncereservationslug.site');

Route::get(
    'annonces_locations_status/{id}',
    'AnnoncelocationController@statusitem'
)->name('annonces_locations_status.site');

Route::get(
    'annonces_locations_status_comments/{id}',
    'AnnoncelocationController@statuscomments'
)->name('annonces_locations_status_comments.site');

Route::get(
    'annonces_locations_admin_status/{id}',
    'AnnoncelocationController@adminstatusitem'
)->name('annonces_locations_admin_status.dashboard');

Route::delete(
    'annonces_locations_delete/{id}',
    'AnnoncelocationController@destroy'
)->name('annonces_locations_delete.site');

Route::get(
    'annonce_location/{annoncetype}/{annoncelocation:slugin}/edit',
    'AnnoncelocationController@edit'
)->name('annoncelocationsedit_site');

Route::put(
    'annonce_location/{annoncetype}/{annoncelocation:slugin}',
    'AnnoncelocationController@update'
)->name('annoncelocationsupdate_site');

Route::get(
    'annonce_location/{annoncetype}/new',
    'AnnoncelocationController@create'
)->name('annoncelocationsnew_site');

Route::post(
    'annonce_location/{annoncetype}/new',
    'AnnoncelocationController@store'
)->name('annoncelocationsstore_site');
