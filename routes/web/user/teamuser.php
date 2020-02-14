<?php


Route::get(
    'api/profile/personal_settings/teams',
    'TeamuserController@apiteamuserprivate'
)->name('api.teamuserprivate');

Route::get(
    'profile/personal_settings/teams',
    'TeamuserController@teamuserprivate'
)->name('profile_team_users.site');

Route::delete(
    'profile/personal_settings/teams/{id}',
    'TeamuserController@destroy'
)->name('profile_team_users_destroy.site');

Route::get(
    'profile/personal_settings/active_teams/{id}',
    'TeamuserController@activated'
)->name('profile_team_users_active.site');

Route::get(
    'profile/personal_settings/unactive_teams/{id}',
    'TeamuserController@unactivated'
)->name('profile_team_users_unactivated.site');
