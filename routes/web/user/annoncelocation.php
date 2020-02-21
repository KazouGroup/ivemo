<?php


Route::get(
    'annonces_locations/{annoncetype}',
    'AnnoncelocationController@index'
)->name('annoncelocationbyannoncetypes_site');

Route::get(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}',
    'AnnoncelocationController@annoncelocationbycategoryannoncelocation'
)->name('annoncelocationbycategoryannoncelocations_site');

Route::get(
    'api/profile/personal_settings/annonces_locations',
    'AnnoncelocationController@apiannonceslocationsbyuser'
)->name('api.annonceslocationsbyuser_site');

Route::get(
    'profile/personal_settings/annonces_locations',
    'AnnoncelocationController@annonceslocationsbyuser'
)->name('annonceslocationsbyuser_site');

Route::get(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}',
    'AnnoncelocationController@annoncelocationnbycity'
)->name('annoncelocationbycities_site');

Route::get(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}/{date}/{annoncelocation}',
    'AnnoncelocationController@annoncelocationbycategoryannoncelocationslug'
)->name('annoncelocationbycategoryannoncereservationslug_site');

Route::post(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}/{date}/{annoncelocation}/send_contact_message_user',
    'AnnoncelocationController@sendcontactmessageuser'
)->name('annoncelocationsendcontactmessageuser_site');

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
