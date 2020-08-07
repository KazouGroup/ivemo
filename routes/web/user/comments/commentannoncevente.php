<?php

Route::post(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/comments',
    'CommentannonceventeController@sendcomment'
)->name('annonceventesendcomment_site');

Route::put(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/comments/{comment}',
    'CommentannonceventeController@updatecomment'
)->name('annonceventeupdatecomment_site');

Route::post(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/comments/{comment}/responses',
    'CommentannonceventeController@sendresponsecomment'
)->name('annonceventessendresponsecomment_site');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/comments',
        'CommentannonceventeController@getcomment'
    )->name('api.annonceventegetcomment_site');
});
