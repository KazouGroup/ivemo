<?php

Route::post(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments',
    'CommentannoncereservationController@annoncereservationsendcomment'
)->name('annoncereservationsendcomment_site');

Route::put(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments/{comment}',
    'CommentannoncereservationController@annoncereservationupdatecomment'
)->name('annoncereservationupdatecomment_site');

Route::post(
    'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments/{comment}/responses',
    'CommentannoncereservationController@annoncesreservationssendresponsecomment'
)->name('annoncesreservationssendresponsecomment_site');

Route::put(
    'comments_responsecomment_update/{responsecomment}',
    'CommentannoncereservationController@responses_update'
)->name('comments.responsecomment_update');

Route::get(
    'comments_responsecomment_unactive/{responsecomment}',
    'CommentannoncereservationController@responses_unactive'
)->name('comments.responsecomment_unactive');

Route::get(
    'comments_unactive/{comment}',
    'CommentannoncereservationController@unactive'
)->name('comments.unactive');

Route::delete(
    'comments/{comment}',
    'CommentannoncereservationController@destroy'
)->name('comments.destroy');

Route::delete(
    'comments_responses/{responsecomment}',
    'CommentannoncereservationController@destroyresponse'
)->name('comments_responses.destroy');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'annonces_reservations/{annoncetype}/{categoryannoncereservation}/{city}/{annoncereservation}/comments',
        'CommentannoncereservationController@annoncereservationgetcomment'
    )->name('api.annoncereservationgetcomment_site');
});
