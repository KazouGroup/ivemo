<?php

Route::post(
    'employments/{categoryemployment}/{city}/{user:slug}/{employment}/comments',
    'CommentemploymentController@sendcomment'
)->name('employmentsendcomment_site');

Route::put(
    'employments/{categoryemployment}/{city}/{user:slug}/{employment}/comments/{comment}',
    'CommentemploymentController@updatecomment'
)->name('employmentupdatecomment_site');

Route::post(
    'employments/{categoryemployment}/{city}/{user:slug}/{employment}/comments/{comment}/responses',
    'CommentemploymentController@sendresponsecomment'
)->name('employmentssendresponsecomment_site');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'employments/{categoryemployment}/{city}/{user:slug}/{employment}/comments',
        'CommentemploymentController@getcomment'
    )->name('api.employmentgetcomment_site');
});
