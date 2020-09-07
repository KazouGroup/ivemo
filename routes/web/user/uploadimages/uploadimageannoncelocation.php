<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'als/{annoncetype}/{categoryannoncelocation}/{city}/{user:slug}/{annoncelocation}/uploadimages',
        'UploadimageannoncelocationController@getuploadimage'
    )->name('api.annoncelocationgetuploadimage_site');
});


Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::post(
            'als_uploadimages/{annoncelocation:slugin}/save',
            'UploadimageannoncelocationController@storeuploadimage'
        )->name('annoncelocationsenduploadimage_site');

    });

});
