<?php

Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){

        Route::post(
            'uploadimages/{uploadimage}/status',
            'UploadimageController@statusuploadimage'
        )->name('statusuploadimage_site');

        Route::delete(
            'uploadimages/{uploadimage}/delete',
            'UploadimageController@destroy'
        )->name('destroyuploadimage_site');

    });

});
