<?php

Route::post(
    'als/{annoncetype}/{categoryannoncelocation}/{city}/{user:slug}/{annoncelocation}/comments',
    'CommentannoncelocationController@sendcomment'
)->name('annoncelocationsendcomment_site');

Route::put(
    'als/{annoncetype}/{categoryannoncelocation}/{city}/{user:slug}/{annoncelocation}/comments/{comment}',
    'CommentannoncelocationController@updatecomment'
)->name('annoncelocationupdatecomment_site');

Route::post(
    'als/{annoncetype}/{categoryannoncelocation}/{city}/{user:slug}/{annoncelocation}/comments/{comment}/responses',
    'CommentannoncelocationController@sendresponsecomment'
)->name('annoncelocationssendresponsecomment_site');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'als/{annoncetype}/{categoryannoncelocation}/{city}/{user:slug}/{annoncelocation}/comments',
        'CommentannoncelocationController@getcomment'
    )->name('api.annoncelocationgetcomment_site');
});
