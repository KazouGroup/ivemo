<?php




Route::post(
    '/users_followeuser/{user:id}/follow',
    'FolloweruserController@followeruser'
)->name('users_followeuser.follow');
