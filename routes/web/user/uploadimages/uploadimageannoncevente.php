<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'avs/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/uploadimages',
        'UploadimageannonceventeController@getuploadimage'
    )->name('api.annonceventegetuploadimage_site');
});


Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::post(
            'avs_uploadimages/{annoncevente:slugin}/save',
            'UploadimageannonceventeController@storeuploadimage'
        )->name('annonceventesenduploadimage_site');

    });

});
