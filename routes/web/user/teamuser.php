<?php


Route::get(
    'api/team_users',
    'TeamuserController@apiteamuserprivate'
)->name('api.teamuserprivate');

Route::get(
    'profile/team_users',
    'TeamuserController@team_users'
)->name('profile_team_users.site');
