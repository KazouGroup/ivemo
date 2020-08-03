<?php

Route::post(
    'forums/{categoryforum:slug}/{user:slug}/{forum:slugin}/comments',
    'CommentforumController@sendcomment'
)->name('forumsendcomment_site');

Route::put(
    'forums/{categoryforum:slug}/{user:slug}/{forum:slugin}/comments/{comment}',
    'CommentforumController@updatecomment'
)->name('forumupdatecomment_site');

Route::post(
    'forums/{categoryforum:slug}/{user:slug}/{forum:slugin}/comments/{comment}/responses',
    'CommentforumController@sendresponsecomment'
)->name('forumssendresponsecomment_site');


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'forums/{categoryforum:slug}/{user:slug}/{forum:slugin}/comments',
        'CommentforumController@getcomment'
    )->name('api.forumgetcomment_site');
});
