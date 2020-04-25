<?php

Route::group(['namespace' => 'Blogs'], function(){

    Route::get(
        'b/blogs_annonces_locations',
        'BlogannonceController@apiblogs_annonces_locations'
    )->name('api.blogs_annonces_locations');

    Route::get(
        'b/blogs_annonces_reservations',
        'BlogannonceController@apiblogs_annonces_reservations'
    )->name('api.blogs_annonces_reservations');

    Route::get(
        'b/blogs_annonces_ventes',
        'BlogannonceController@apiblogs_annonces_ventes'
    )->name('api.blogs_annonces_ventes');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'blogannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'blogannoncelocation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'blogannoncevente.php');

});
