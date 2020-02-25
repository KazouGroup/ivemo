<?php

Route::get(
    'blogs/annonce_ventes/',
    'BlogannonceventeController@apiannonceblogresevente'
)->name('api.blogannonceventes_site');

Route::get(
    'blogs/annonce_ventes/{categoryannoncevente}',
    'BlogannonceventeController@apiannonceblogcategoryvente'
)->name('api.blogannoncecategoryventes_site');

Route::get(
    'blogs/annonce_ventes_interesses/{categoryannoncevente}',
    'BlogannonceventeController@apiblogannonceventeinteresse'
)->name('api.blogannonceventeinteresse_site');

Route::get(
    'blogs/annonce_ventes/{categoryannoncevente}/{date}/{blogannoncevente}',
    'BlogannonceventeController@apiannonceblogcategoryventeslug'
)->name('api.blogannoncecategoryventeslug_site');

Route::get(
    '@{user}/blogs_annonce_ventes',
    'BlogannonceventeController@apiblogsannonceventespublique'
)->name('api.blogs_annonce_ventespublique');
