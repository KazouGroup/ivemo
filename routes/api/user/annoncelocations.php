<?php
Route::get(
    'annonceslocations',
    'AnnoncelocationController@api'
)->name('api.annoncelocations');

Route::get(
    'annonces',
    'AnnoncelocationController@apiannoncelocations'
)->name('api.annoncelocations_site');

Route::get(
    'categoryannoncelocations',
    'AnnoncelocationController@apicategoryannoncelocation'
)->name('api.categoryannoncelocation_site');

Route::get(
    'categoryannoncelocations/{city}',
    'AnnoncelocationController@apicategoryannoncelocationbycity'
)->name('api.categoryannoncelocationbycity_site');

Route::get(
    'annonces_locations_by_city_count/{categoryannoncelocation}',
    'AnnoncelocationController@apiannoncelocationbycategorycitycount'
)->name('api.annoncelocationbycategorycitycount_site');

Route::get(
    'annonces_locations_by_city_count/{categoryannoncelocation}/{city}',
    'AnnoncelocationController@apiannoncelocationcategorybycitycount'
)->name('api.annoncelocationcategorybycitycount_site');

Route::get(
    'annonces_locations_by_cities',
    'AnnoncelocationController@apicitiesannonces'
)->name('api.citiesannoncelocations_site');

Route::get(
    'annonces_locations_categoryannoncelocation_interesses/{categoryannoncelocation}',
    'AnnoncelocationController@apiannoncelocationinteressebycategoryannoncelocation'
)->name('api.annoncelocationinteresse_by_categoryannoncelocation_site');
