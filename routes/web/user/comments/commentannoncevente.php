<?php

Route::post(
    'avs/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/comments',
    'CommentannonceventeController@sendcomment'
)->name('annonceventesendcomment_site');

Route::put(
    'avs/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/comments/{comment}',
    'CommentannonceventeController@updatecomment'
)->name('annonceventeupdatecomment_site');

Route::post(
    'avs/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/comments/{comment}/responses',
    'CommentannonceventeController@sendresponsecomment'
)->name('annonceventessendresponsecomment_site');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'avs/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/comments',
        'CommentannonceventeController@getcomment'
    )->name('api.annonceventegetcomment_site');
});
