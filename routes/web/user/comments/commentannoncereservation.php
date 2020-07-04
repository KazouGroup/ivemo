<?php

Route::post(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments',
    'CommentannoncereservationController@sendcomment'
)->name('annoncereservationsendcomment_site');

Route::put(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments/{comment}',
    'CommentannoncereservationController@updatecomment'
)->name('annoncereservationupdatecomment_site');

Route::post(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments/{comment}/responses',
    'CommentannoncereservationController@sendresponsecomment'
)->name('annoncesreservationssendresponsecomment_site');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments',
        'CommentannoncereservationController@getcomment'
    )->name('api.annoncereservationgetcomment_site');
});
