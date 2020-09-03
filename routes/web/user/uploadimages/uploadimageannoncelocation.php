<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'als/{annoncetype}/{categoryannoncelocation}/{city}/{user:slug}/{annoncelocation}/uploadimages',
        'UploadimageannoncelocationController@getuploadimage'
    )->name('api.annoncelocationgetuploadimage_site');
});


Route::post(
    'uploadimages/{annoncelocation:slugin}/save',
    'UploadimageannoncelocationController@storeuploadimage'
)->name('annoncelocationsenduploadimage_site');

Route::put(
    'uploadimages/{annoncelocation:slugin}/{uploadimage}/update',
    'UploadimageannoncelocationController@updateuploadimage'
)->name('annoncelocationupdateuploadimage_site');
