<?php
Route::get(
    'blogs/annonce_locations/{categoryannoncelocation}',
    'BlogannoncelocationController@annonceblogcategorylocation'
)->name('blogannoncecategorylocation_site');

Route::get(
    'blogs/annonce_locations/{categoryannoncelocation}/{date}/{blogannoncelocation}',
    'BlogannoncelocationController@annonceblogcategorylocationslug'
)->name('blogannoncecategorylocationslug_site');
