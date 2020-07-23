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
    'forums_likes/{forum}/like',
    'LikeController@likeforum'
)->name('forums_likes.active');

Route::get(
    'forums_unlikes/{forum}/unlikes',
    'LikeController@unlikeforum'
)->name('forums_likes.unactive');

Route::get(
    'employments_likes/{employment:id}/like',
    'LikeController@likemployment'
)->name('employments_likes.active');

Route::get(
    'employments_unlikes/{employment:id}/unlikes',
    'LikeController@unlikemployment'
)->name('employments_likes.unactive');

Route::get(
    'responsecomments_likes/{responsecomment}/like',
    'LikeController@likeresponsecomment'
)->name('responsecomments_likes.active');

Route::get(
    'responsecomments_unlikes/{responsecomment}/unlikes',
    'LikeController@unlikeresponsecomment'
)->name('responsecomments_likes.unactive');
