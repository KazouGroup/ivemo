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

Route::put(
    'comments_responsecomment_update/{responsecomment}',
    'CommentblogannoncereservationController@responses_update'
)->name('comments.responsecomment_update');

Route::get(
    'comments_responsecomment_unactive/{responsecomment}',
    'CommentblogannoncereservationController@responses_unactive'
)->name('comments.responsecomment_unactive');

Route::get(
    'comments_unactive/{comment}',
    'CommentblogannoncereservationController@unactive'
)->name('comments.unactive');

Route::delete(
    'comments/{comment}',
    'CommentblogannoncereservationController@destroy'
)->name('comments.destroy');

Route::delete(
    'comments_responses/{responsecomment}',
    'CommentblogannoncereservationController@destroyresponse'
)->name('comments_responses.destroy');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'blogs/annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}/comments',
        'CommentblogannoncereservationController@getcomment'
    )->name('api.blogannoncereservationgetcomment_site');
});
