<?php

Route::get(
    'licencessites',
    'LicencesiteController@api'
)->name('api.licencesites');

Route::get(
    'sites_licencessites',
    'LicencesiteController@apisiteslicencesites'
)->name('api.sites_licencesites');
