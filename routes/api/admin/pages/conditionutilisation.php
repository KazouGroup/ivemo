<?php

Route::get(
    'conditionutilisations',
    'ConditionutilisationController@api'
)->name('api.conditionutilisations');

Route::get(
    'sites_conditionutilisations',
    'ConditionutilisationController@apisitesconditionutilisations'
)->name('api.sites_conditionutilisations');
