<?php



Route::put(
    'comments_responsecomment_update/{responsecomment}',
    'CommentAndResponsecommentController@responses_update'
)->name('comments.responsecomment_update');

Route::get(
    'comments_responsecomment_unactive/{responsecomment}',
    'CommentAndResponsecommentController@responses_unactive'
)->name('comments.responsecomment_unactive');

Route::get(
    'comments_unactive/{comment}/unactive',
    'CommentAndResponsecommentController@unactive'
)->name('comments.unactive');

Route::delete(
    'comments/{comment}/delete',
    'CommentAndResponsecommentController@destroy'
)->name('comments.destroy');

Route::delete(
    'comments_responses/{responsecomment}',
    'CommentAndResponsecommentController@destroyresponse'
)->name('comments_responses.destroy');
