<?php

Route::resource('dashboard/conditionutilisations','ConditionutilisationController');
Route::get('dashboard/active_conditionutilisations/{id}', 'ConditionutilisationController@activated')->name('activated_conditionutilisations');
Route::get('dashboard/unactive_conditionutilisations/{id}', 'ConditionutilisationController@unactivated')->name('unactivated_conditionutilisations');
