<?php

Route::get(
    'comments_likes/{comment}/like',
    'LikeController@likecomment'
)->name('comments_likes.active');

Route::get(
    'comments_unlikes/{comment}/unlikes',
    'LikeController@unlikecomment'
)->name('comments_likes.unactive');

Route::get(
    'responsecomments_likes/{responsecomment}/like',
    'LikeController@likeresponsecomment'
)->name('responsecomments_likes.active');

Route::get(
    'responsecomments_unlikes/{responsecomment}/unlikes',
    'LikeController@unlikeresponsecomment'
)->name('responsecomments_likes.unactive');
