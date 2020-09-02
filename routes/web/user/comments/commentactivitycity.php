<?php

Route::post(
    'city/{city:slug}/a/{activitycity:slug}/comments',
    'CommentactivitycityController@sendcomment'
)->name('activitycitysendcomment_site');

Route::put(
    'city/{city:slug}/a/{activitycity:slug}/comments/{comment}',
    'CommentactivitycityController@updatecomment'
)->name('activitycityupdatecomment_site');

Route::post(
    'city/{city:slug}/a/{activitycity:slug}/comments/{comment}/responses',
    'CommentactivitycityController@sendresponsecomment'
)->name('activitycitysendresponsecomment_site');


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'city/{city:slug}/a/{activitycity:slug}/comments',
        'CommentactivitycityController@getcomment'
    )->name('api.activitycitygetcomment_site');
});
