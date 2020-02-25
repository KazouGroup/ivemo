<?php

Route::get(
    'blogs/annonce_ventes/',
    'BlogannonceventeController@annonceblogvente'
)->name('blogannonceventes_site');

Route::get(
    'blogs/annonce_ventes/{categoryannoncevente}',
    'BlogannonceventeController@annonceblogcategoryvente'
)->name('blogannoncecategoryvente_site');

Route::get(
    'blogs/annonce_ventes/{categoryannoncevente}/{date}/{blogannoncevente}',
    'BlogannonceventeController@annonceblogcategoryventeslug'
)->name('blogannoncecategoryventeslug_site');

Route::get(
    'blogs/annonce_ventes/{blogannoncevente}/edit',
    'BlogannonceventeController@edit'
)->name('blogannoncecategoryventeedit_site');

Route::get(
    'api/blogs/annonce_vente/{blogannoncevente}',
    'BlogannonceventeController@show'
)->name('api.blogannonceblogcategoryventeslugin_site');

Route::get(
    'profile/{user}/personal_settings/blogs/annonce_ventes/',
    'BlogannonceventeController@blogannoncesventesbyuser'
)->name('blogannoncesventesbyuser_site');

Route::get(
    'api/profile/{user}/personal_settings/blogs/annonce_ventes/',
    'BlogannonceventeController@apiblogannoncesventesbyuser'
)->name('api.blogannoncesventesbyuser_site');

Route::get(
    'blogs/annonce_ventes_activated/{id}',
    'BlogannonceventeController@activated'
)->name('blogannoncecategoryventeactivated_site');

Route::get(
    'blogs/annonce_ventes_unactivated/{id}',
    'BlogannonceventeController@unactivated'
)->name('blogannoncecategoryventeunactivated_site');

Route::delete(
    'blogs/annonce_ventes_delete/{id}',
    'BlogannonceventeController@destroy'
)->name('blogannoncecategoryventedelete_site');
