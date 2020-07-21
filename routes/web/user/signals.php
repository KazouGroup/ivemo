<?php

Route::post(
    'forums/{categoryforum:slug}/{forum:slugin}/signals',
    'SignalController@sendforumsignal'
)->name('forumsendsignal_site');

Route::post(
    'employments/{categoryemployment}/{city}/{employment}/signals',
    'SignalController@sendemploymentsignal'
)->name('employmentsendsignal_site');

Route::post(
        'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}/{annoncelocation}',
        'SignalController@annoncelocationsignal'
)->name('annoncelocationsignal_site');

Route::post(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}',
    'SignalController@annonceventesignal'
)->name('annonceventesignal_site');    

    
    




