<?php

Route::get('terms_conditions', 'TermsConditionController@api');
Route::get('terms_conditions/v/{slug}','TermsConditionController@view');
