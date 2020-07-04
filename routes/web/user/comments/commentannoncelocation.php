<?php

Route::post(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}/{annoncelocation}/comments',
    'CommentannoncelocationController@sendcomment'
)->name('annoncelocationsendcomment_site');

Route::put(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}/{annoncelocation}/comments/{comment}',
    'CommentannoncelocationController@updatecomment'
)->name('annoncelocationupdatecomment_site');

Route::post(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}/{annoncelocation}/comments/{comment}/responses',
    'CommentannoncelocationController@sendresponsecomment'
)->name('annoncelocationssendresponsecomment_site');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}/{annoncelocation}/comments',
        'CommentannoncelocationController@getcomment'
    )->name('api.annoncelocationgetcomment_site');
});
