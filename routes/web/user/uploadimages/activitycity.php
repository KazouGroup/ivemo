<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'city/{city:slug}/a/{activitycity:slug}/uploadimages',
        'UploadimageactivitycityController@getuploadimage'
    )->name('api.citygetuploadimage_site');
});
