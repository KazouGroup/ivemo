<?php

Route::post(
    'blogs/annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}/comments',
    'CommentblogannoncereservationController@sendcomment'
)->name('blogannoncereservationsendcomment_site');

Route::put(
    'blogs/annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}/comments/{comment}',
    'CommentblogannoncereservationController@updatecomment'
)->name('blogannoncereservationupdatecomment_site');

Route::post(
    'blogs/annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}/comments/{comment}/responses',
    'CommentblogannoncereservationController@sendresponsecomment'
)->name('blogannoncesreservationssendresponsecomment_site');


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'blogs/annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}/comments',
        'CommentblogannoncereservationController@getcomment'
    )->name('api.blogannoncereservationgetcomment_site');
});
