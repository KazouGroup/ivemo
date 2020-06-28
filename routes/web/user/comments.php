<?php

Route::post(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments',
    'CommentController@annoncereservationsendcomment'
)->name('annoncereservationsendcomment_site');

Route::put(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments/{comment}',
    'CommentController@annoncereservationupdatecomment'
)->name('annoncereservationupdatecomment_site');

Route::post(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments/{comment}/responses',
    'CommentController@annoncesreservationssendresponsecomment'
)->name('annoncesreservationssendresponsecomment_site');

Route::put(
    'comments_responsecomment_update/{responsecomment}',
    'CommentController@responses_update'
)->name('comments.responsecomment_update');

Route::get(
    'comments_responsecomment_unactive/{responsecomment}',
    'CommentController@responses_unactive'
)->name('comments.responsecomment_unactive');

Route::get(
    'comments_unactive/{comment}',
    'CommentController@unactive'
)->name('comments.unactive');

Route::delete(
    'comments/{comment}',
    'CommentController@destroy'
)->name('comments.destroy');

Route::delete(
    'comments_responses/{responsecomment}',
    'CommentController@destroyresponse'
)->name('comments_responses.destroy');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments',
        'CommentController@annoncereservationgetcomment'
    )->name('api.annoncereservationgetcomment_site');
});
