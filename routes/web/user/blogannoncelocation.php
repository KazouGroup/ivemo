<?php
Route::get(
    'blogs/annonce_locations/{categoryannoncelocation}',
    'BlogannoncelocationController@annonceblogcategorylocation'
)->name('blogannoncecategorylocation_site');

Route::get(
    'blogs/annonce_locations/{categoryannoncelocation}/{date}/{blogannoncelocation}',
    'BlogannoncelocationController@annonceblogcategorylocationslug'
)->name('blogannoncecategorylocationslug_site');

Route::delete(
    'blogs/annonce_locations_delete/{id}',
    'BlogannoncelocationController@destroy'
)->name('blogannoncecategorylocationdelete_site');
