<?php


Route::get(
    '@{user}/team_users',
    'TeamuserController@apiteamuserpublique'
)->name('api.teamuserpublique');
