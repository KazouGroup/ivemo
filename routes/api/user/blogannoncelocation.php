<?php

Route::get(
    'blogs/annonce_locations/{categoryannoncelocation}',
    'BlogannoncelocationController@apiannonceblogcategorylocations'
)->name('api.blogannonceblogcategorylocations_site');

Route::get(
    'blogs/annonce_locations_interesses/{categoryannoncelocation}',
    'BlogannoncelocationController@apiblogannoncelocationinteresse'
)->name('api.blogannoncelocationinteresse_site');

Route::get(
    'blogs/annonce_locations/{categoryannoncelocation}/{date}/{blogannoncelocation}',
    'BlogannoncelocationController@apiannonceblogcategorylocationslug'
)->name('api.blogannonceblogcategorylocationslug_site');

Route::get(
    '@{user}/blogs_annonce_locations',
    'BlogannoncelocationController@apiblogsannoncelocationspublique'
)->name('api.blogs_annonce_locationspublique');
