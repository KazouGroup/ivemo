<?php

Route::resource('dashboard/licencesites','LicencesiteController');

Route::get(
    'dashboard/active_licencesites/{id}',
    'LicencesiteController@activated'
)->name('activated_licencesites');

Route::get(
    'dashboard/unactive_licencesites/{id}',
    'LicencesiteController@unactivated'
)->name('unactivated_licencesites');
