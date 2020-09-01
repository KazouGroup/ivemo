<?php

Route::post(
    'city/{city:slug}/comments',
    'CommentcityController@sendcomment'
)->name('citysendcomment_site');

Route::put(
    'city/{city:slug}/comments/{comment}',
    'CommentcityController@updatecomment'
)->name('cityupdatecomment_site');

Route::post(
    'city/{city:slug}/comments/{comment}/responses',
    'CommentcityController@sendresponsecomment'
)->name('citysendresponsecomment_site');


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'city/{city:slug}/comments',
        'CommentcityController@getcomment'
    )->name('api.citygetcomment_site');
});
