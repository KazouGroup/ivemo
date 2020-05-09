<?php


Route::get(
    'pro/{user}/team_users',
    'TeamuserController@apiteamuserpublique'
)->name('api.teamuserpublique');
