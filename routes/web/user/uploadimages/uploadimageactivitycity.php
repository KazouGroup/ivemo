<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'city/{city:slug}/a/{activitycity:slug}/uploadimages',
        'UploadimageactivitycityController@getuploadimage'
    )->name('api.citygetuploadimage_site');
});


Route::post(
    'uploadimages/{activitycity:slugin}/save',
    'UploadimageactivitycityController@storeuploadimage'
)->name('activitycitysenduploadimage_site');
