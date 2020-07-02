<?php

Route::post(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}/comments',
    'CommentannonceventeController@sendcomment'
)->name('annonceventesendcomment_site');

Route::put(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}/comments/{comment}',
    'CommentannonceventeController@updatecomment'
)->name('annonceventeupdatecomment_site');

Route::post(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}/comments/{comment}/responses',
    'CommentannonceventeController@sendresponsecomment'
)->name('annonceventessendresponsecomment_site');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}/comments',
        'CommentannonceventeController@getcomment'
    )->name('api.annonceventegetcomment_site');
});
