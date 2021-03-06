<?php

Route::group(['middleware' => 'auth','prefix' => 'profile'], function () {

    Route::get(
        '{user}/personal_settings/blogs/annonce_locations',
        'BlogannoncelocationController@blogannonceslocationsbyuser'
    )->name('blogannonceslocationsbyuser_site');

    Route::get(
        '{user}/personal_settings/blogs/annonce_locations/{categoryannoncelocation}',
        'BlogannoncelocationController@blogannonceslocationscategoryannoncelocationbyuser'
    )->name('blogannonceslocationscategoryannoncelocationbyuser_site');

    Route::get(
        '{user}/personal_settings/blogs/annonce_location/statistique/{blogannoncelocation}',
        'BlogannoncelocationController@statistique'
    )->name('blogannonceslocationsstatistiquebyuser_site');

});

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'blogs/annonce_locations',
        'BlogannoncelocationController@apiannoncebloglocation'
    )->name('api.blogannoncelocations_site');

    Route::get(
        'blogs/annonce_locations/{categoryannoncelocation}',
        'BlogannoncelocationController@apiannonceblogcategorylocations'
    )->name('api.blogannonceblogcategorylocations_site');

    Route::get(
        'blogs/annonce_locationscount/{categoryannoncelocation}',
        'BlogannoncelocationController@apiannonceblogcategorylocationscount'
    )->name('api.blogannonceblogcategorylocationscount_site');

    Route::get(
        'blogs/annonce_locations_interesses/{categoryannoncelocation}',
        'BlogannoncelocationController@apiblogannoncelocationinteresse'
    )->name('api.blogannoncelocationinteresse_site');

    Route::get(
        'blogs/annonce_locations/{categoryannoncelocation}/{date}/{blogannoncelocation}',
        'BlogannoncelocationController@apiannonceblogcategorylocationslug'
    )->name('api.blogannonceblogcategorylocationslug_site');

    Route::get(
        'pro{user}/blogs_annonce_locations',
        'BlogannoncelocationController@apiblogsannoncelocationspublique'
    )->name('api.blogs_annonce_locationspublique');

    Route::get(
        'blogs/annonce_location/{blogannoncelocation}',
        'BlogannoncelocationController@show'
    )->name('api.blogannonceblogcategorylocationslugin_site');

    Route::get(
        '{user}/personal_settings/blogs/annonce_locations/',
        'BlogannoncelocationController@apiblogannonceslocationsbyuser'
    )->name('api.blogannonceslocationsbyuser_site');

    Route::get(
        '{user}/personal_settings/blogs/annonce_locations/{categoryannoncelocation}',
        'BlogannoncelocationController@apiblogannonceslocationscategoryannoncelocationbyuser'
    )->name('api.blogannonceslocationscategoryannoncelocationbyuser_site');

    Route::get(
        '{user}/personal_settings/blogs/annonce_location/statistique/{blogannoncelocation}',
        'BlogannoncelocationController@apistatistique'
    )->name('api.blogannonceslocationsstatistiquebyuser_site');

});

Route::group(['prefix' => 'blogs'], function () {

    Route::get(
        'annonce_locations/',
        'BlogannoncelocationController@annoncebloglocation'
    )->name('blogannoncelocation_site');

    Route::get(
        'annonce_locations/{categoryannoncelocation}',
        'BlogannoncelocationController@annonceblogcategorylocation'
    )->name('blogannoncecategorylocation_site');

    Route::get(
        'annonce_locations/{categoryannoncelocation}/{date}/{blogannoncelocation}',
        'BlogannoncelocationController@annonceblogcategorylocationslug'
    )->name('blogannoncecategorylocationslug_site');

    Route::get(
        'annonce_locations/ab/new',
        'BlogannoncelocationController@create'
    )->name('blogannoncelocationabnew_site');

    Route::post(
        'annonce_locations/save',
        'BlogannoncelocationController@store'
    )->name('blogannoncecategorylocationstore_site');

    Route::get(
        'annonce_locations/{blogannoncelocation}/edit',
        'BlogannoncelocationController@edit'
    )->name('blogannoncecategorylocationedit_site');

    Route::put(
        'annonce_locations/{blogannoncelocation}',
        'BlogannoncelocationController@update'
    )->name('blogannoncecategorylocationupdate_site');

    Route::get(
        'annonce_locations_active/{blogannoncelocation:id}/active',
        'BlogannoncelocationController@activated'
    )->name('blogannoncecategorylocationactive_site.site');

    Route::get(
        'annonce_locations_unactive/{blogannoncelocation:id}/unactive',
        'BlogannoncelocationController@unactivated'
    )->name('blogannoncecategorylocationunactive_site.site');

    Route::delete(
        'annonce_locations_delete/{blogannoncelocation:id}/delete',
        'BlogannoncelocationController@destroy'
    )->name('blogannoncecategorylocationdelete_site');

});
