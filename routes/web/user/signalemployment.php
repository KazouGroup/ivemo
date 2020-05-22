<?php

Route::post(
    'signalblogannoncelocation_for_all',
    'SignalblogannonceController@signalblogannoncelocation'
)->name('signalblogannoncelocations.site');

Route::post(
    'signalemployments',
    'SignalemploymentController@signalemployment'
)->name('signalemployments.site');

Route::post(
    'employments/{categoryemployment}/{city}/{employment}/signal_employments',
    'SignalemploymentController@signalemploymentbyslug'
)->name('signalemploymentbyslug_site');

