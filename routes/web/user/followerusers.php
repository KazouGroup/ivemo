<?php

Route::post(
    '/users_followeuser/{user:id}/follow',
    'FolloweruserController@followeruser'
)->name('users_followeuser.follow');


Route::get(
    'api/user/{user}/following/',
    'FolloweruserController@apifilfollowing'
)->name('api.public_profile_following_user');

Route::get(
    'api/user/{user}/followers/',
    'FolloweruserController@apifilfollowers'
)->name('api.public_profile_followers_site');


Route::get(
    'pro/{user}/followers/',
    'FolloweruserController@profilfollowers'
)->name('public_profile_followers.pro');

Route::get(
    'user/{user}/followers/',
    'FolloweruserController@userprofilfollowers'
)->name('public_profile_followers.user');

Route::get(
    'pro/{user}/following/',
    'FolloweruserController@profilfollowing'
)->name('public_profile_following.pro');

Route::get(
    'user/{user}/following/',
    'FolloweruserController@userprofilfollowing'
)->name('public_profile_following.user');
