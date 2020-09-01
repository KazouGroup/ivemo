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

Route::post(
    'employments_likes/{employment:id}/like',
    'LikeController@likemployment'
)->name('employments_likes.active');

Route::post(
    'employments_unlikes/{employment:id}/unlikes',
    'LikeController@unlikemployment'
)->name('employments_likes.unactive');

Route::post(
    'annoncelocations_likes/{annoncelocation:id}/like',
    'LikeController@likannoncelocation'
)->name('annoncelocations_likes.active');

Route::post(
    'annoncelocations_unlikes/{annoncelocation:id}/unlikes',
    'LikeController@unlikannoncelocation'
)->name('annoncelocations_likes.unactive');

Route::post(
    'annoncereservations_likes/{annoncereservation:id}/like',
    'LikeController@likannoncereservation'
)->name('annoncereservations_likes.active');

Route::post(
    'annoncereservations_unlikes/{annoncereservation:id}/unlikes',
    'LikeController@unlikannoncereservation'
)->name('annoncereservations_likes.unactive');

Route::post(
    'annonceventes_likes/{annoncevente:id}/like',
    'LikeController@likannoncevente'
)->name('annonceventes_likes.active');

Route::post(
    'annonceventes_unlikes/{annoncevente:id}/unlikes',
    'LikeController@unlikannoncevente'
)->name('annonceventes_likes.unactive');

Route::post(
    'cities_likes/{city:id}/like',
    'LikeController@likecity'
)->name('cities_likes.active');

Route::post(
    'cities_unlikes/{city:id}/unlikes',
    'LikeController@unlikecity'
)->name('cities_likes.unactive');

Route::get(
    'blogannoncelocations_likedata/{id}/like',
    'LikeController@likblogannoncelocation'
)->name('likeblogannoncelocations_likedata.likedata');

Route::get(
    'blogannoncelocations_unlikedata/{id}/unlike',
    'LikeController@unlikablognnoncelocation'
)->name('likeblogannoncelocations_unlikedata.unlikedata');

Route::get(
    'blogannonceventes_likedata/{id}/like',
    'LikeController@likblogannoncevente'
)->name('likeblogannonceventes_likedata.likedata');

Route::get(
    'blogannonceventes_unlikedata/{id}/unlike',
    'LikeController@unlikblognnoncevente'
)->name('likeblogannonceventes_unlikedata.unlikedata');

Route::get(
    'blogannoncereservations_likedata/{id}/like',
    'LikeController@likblogannoncereservation'
)->name('likeblogannoncereservations_likedata.likedata');

Route::get(
    'blogannoncereservations_unlikedata/{id}/unlike',
    'LikeController@unlikblogannoncereservation'
)->name('likeblogannoncereservations_unlikedata.unlikedata');

Route::get(
    'responsecomments_likes/{responsecomment}/like',
    'LikeController@likeresponsecomment'
)->name('responsecomments_likes.active');

Route::get(
    'responsecomments_unlikes/{responsecomment}/unlikes',
    'LikeController@unlikeresponsecomment'
)->name('responsecomments_likes.unactive');
