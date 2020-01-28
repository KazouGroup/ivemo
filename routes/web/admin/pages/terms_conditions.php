<?php

Route::resource('dashboard/terms_conditions','TermsConditionController');
Route::get('dashboard/change_status_terms_conditions/{id}', 'TermsConditionController@status');
Route::get('dashboard/terms_conditions/v/{slug}','TermsConditionController@vector')->name('terms_conditions.vector');
Route::get('terms_conditions/v/{slug}','TermsConditionController@site')->name('terms_conditions.site');
