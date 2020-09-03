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

Route::put(
    'uploadimages/{activitycity:slugin}/{uploadimage}/update',
    'UploadimageactivitycityController@updateuploadimage'
)->name('activitycityupdateuploadimage_site');

Route::post(
    'uploadimages/{uploadimage}/status',
    'UploadimageactivitycityController@statusuploadimage'
)->name('statusuploadimage_site');
