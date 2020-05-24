<?php

Route::get(
    'api/categoryannoncelocations_by_user',
    'AnnoncelocationController@apicategoryannoncelocations_by_user'
)->name('api.categoryannoncelocations_by_user_site');

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
    'api/profile/{user}/personal_settings/annonces_locations',
    'AnnoncelocationController@apiannonceslocationsbyuser'
)->name('api.annonceslocationsbyuser_site');

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
)->name('annoncelocationbycategoryannoncereservationslug_site');

Route::get(
    'annonces_locations_active/{id}',
    'AnnoncelocationController@activated'
)->name('annonces_locations_active.site');

Route::get(
    'annonces_locations_unactive/{id}',
    'AnnoncelocationController@unactivated'
)->name('annonces_locations_unactivated.site');

Route::delete(
    'annonces_locations_delete/{id}',
    'AnnoncelocationController@destroy'
)->name('annonces_locations_delete.site');
