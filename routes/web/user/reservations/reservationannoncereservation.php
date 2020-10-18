<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'ars/{annoncetype}/{categoryannoncereservation}/{city}/{user:slug}/{annoncereservation}/uploadimages',
        'UploadimageannoncereservationController@getuploadimage'
    )->name('api.annoncereservationgetuploadimage_site');
});

Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){




    });

});

Route::post(
    'ars/{annoncetype}/{categoryannoncereservation}/{city}/{user:slug}/{annoncereservation}/reservations',
    'ReservationannoncereservationController@sendannoncereservation'
)->name('sendannoncereservation_site');
