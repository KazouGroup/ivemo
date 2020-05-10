<?php


Route::get(
    'pro/{user}/avis_users',
    'AvisuserController@apiavisuserpublique'
)->name('api.avisuserpublique');
