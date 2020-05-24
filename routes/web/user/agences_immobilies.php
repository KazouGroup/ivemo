<?php

Route::get(
    'agences_immobilies',
    'AgencesimmobilieController@agencesimmobilie'
)->name('agencesimmobilie.site');

Route::get(
    'api/agences_immobilies',
    'AgencesimmobilieController@apiagencesimmobilie'
)->name('api.agencesimmobilie.site');
