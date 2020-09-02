<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'activitycity_interesses/{city}',
        'ActivitycityController@apiactivitycityinteresse'
    )->name('api.activitycityinteresse_site');

    Route::get(
        'city/{city}/a/{activitycity:slug}',
        'ActivitycityController@apiactivitycityshow'
    )->name('api.activitycity_show_site');


});


Route::get(
    'city/{city}/a/{activitycity:slug}',
    'ActivitycityController@activitycityshow'
)->name('activitycity_show_site');
