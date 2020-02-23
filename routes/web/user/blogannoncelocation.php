<?php

Route::get(
    'blogs/annonce_locations/',
    'BlogannoncelocationController@annoncebloglocation'
)->name('blogannoncelocation_site');

Route::get(
    'blogs/annonce_locations/{categoryannoncelocation}',
    'BlogannoncelocationController@annonceblogcategorylocation'
)->name('blogannoncecategorylocation_site');

Route::get(
    'blogs/annonce_locations/{blogannoncelocation}/edit',
    'BlogannoncelocationController@edit'
)->name('blogannoncecategorylocationedit_site');

Route::get(
    'blogs/annonce_locations/{categoryannoncelocation}/{date}/{blogannoncelocation}',
    'BlogannoncelocationController@annonceblogcategorylocationslug'
)->name('blogannoncecategorylocationslug_site');

Route::get(
    'blogs/annonce_locations/{blogannoncelocation}',
    'BlogannoncelocationController@update'
)->name('blogannoncecategorylocationupdate_site');

Route::get(
    'api/blogs/annonce_location/{blogannoncelocation}',
    'BlogannoncelocationController@show'
)->name('api.blogannonceblogcategorylocationslugin_site');



Route::get(
    'profile/{user}/personal_settings/blogs/annonce_locations',
    'BlogannoncelocationController@blogannonceslocationsbyuser'
)->name('blogannonceslocationsbyuser_site');

Route::get(
    'api/profile/{user}/personal_settings/blogs/annonce_locations/',
    'BlogannoncelocationController@apiblogannonceslocationsbyuser'
)->name('api.blogannonceslocationsbyuser_site');

Route::get(
    'blogs/annonce_locations_active/{id}',
    'BlogannoncelocationController@activated'
)->name('blogannoncecategorylocationactive_site.site');

Route::get(
    'blogs/annonce_locations_unactive/{id}',
    'BlogannoncelocationController@unactivated'
)->name('blogannoncecategorylocationunactive_site.site');

Route::delete(
    'blogs/annonce_locations_delete/{id}',
    'BlogannoncelocationController@destroy'
)->name('blogannoncecategorylocationdelete_site');
