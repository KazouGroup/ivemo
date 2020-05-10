<?php


Route::get(
    'dashboard/premium/{user:slug}/teams/',
    'PremiumteamuserController@index'
)->name('teams.dashboard');

Route::get(
    'dashboard/premium/{user:slug}/teams/create',
    'PremiumteamuserController@create'
)->name('teams_create.dashboard');

Route::get(
    'dashboard/premium/{user:slug}/teams/{teamuser}/edit',
    'PremiumteamuserController@edit'
)->name('teams_edit.site');

Route::get(
    'api/{user:slug}/premiumteams',
    'PremiumteamuserController@data'
)->name('api.teams_premium');

Route::get(
    'api/{user:slug}/premiumteams_count',
    'PremiumteamuserController@datacount'
)->name('api.teams_premium_count');

Route::get(
    'api/{user:slug}/premiumteamsactive_count',
    'PremiumteamuserController@dataactivecount'
)->name('api.teams_premiumactive_count');

Route::get(
    'api/{user:slug}/premiumteamsunactive_count',
    'PremiumteamuserController@dataunactivecount'
)->name('api.teams_premiumunactive_count');
