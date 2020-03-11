<?php


Route::get(
    '@{user}/avis_users',
    'AvisuserController@apiavisuserpublique'
)->name('api.avisuserpublique');
