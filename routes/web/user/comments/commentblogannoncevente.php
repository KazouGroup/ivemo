<?php

Route::post(
    'blogs/annonce_ventes/{categoryannoncevente}/{date}/{blogannoncevente}/comments',
    'CommentblogannonceventeController@sendcomment'
)->name('blogannoncesventesendcomment_site');

Route::put(
    'blogs/annonce_ventes/{categoryannoncevente}/{date}/{blogannoncevente}/comments/{comment}',
    'CommentblogannonceventeController@updatecomment'
)->name('blogannoncesventeupdatecomment_site');

Route::post(
    'blogs/annonce_ventes/{categoryannoncevente}/{date}/{blogannoncevente}/comments/{comment}/responses',
    'CommentblogannonceventeController@sendresponsecomment'
)->name('blogannoncesventessendresponsecomment_site');


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'blogs/annonce_ventes/{categoryannoncevente}/{date}/{blogannoncevente}/comments',
        'CommentblogannonceventeController@getcomment'
    )->name('api.blogannoncesventegetcomment_site');
});
