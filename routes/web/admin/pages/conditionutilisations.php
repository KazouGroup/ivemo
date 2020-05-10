<?php

Route::resource('dashboard/conditionutilisations','LicencesiteController');
Route::get('dashboard/active_conditionutilisations/{id}', 'LicencesiteController@activated')->name('activated_conditionutilisations');
Route::get('dashboard/unactive_conditionutilisations/{id}', 'LicencesiteController@unactivated')->name('unactivated_conditionutilisations');
