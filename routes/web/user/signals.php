<?php

Route::post(
    'forums/{categoryforum:slug}/{forum:slugin}/signals',
    'SignalController@sendforumsignal'
)->name('forumsendsignal_site');

Route::post(
    'employments/{categoryemployment}/{city}/{employment}/signals',
    'SignalController@sendemploymentsignal'
)->name('employmentsendsignal_site');




