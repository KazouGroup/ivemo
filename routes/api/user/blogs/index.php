<?php

Route::group(['namespace' => 'Blogs'], function(){


    Route::group(['prefix' => 'one'], function () {

        Route::get(
            'blogs_annonces_locations',
            'BlogannonceController@apiblogs_annonces_one_locations'
        )->name('api.blogs_annonces_one_locations');

        Route::get(
            'blogs_annonces_reservations',
            'BlogannonceController@apiblogs_annonces_one_reservations'
        )->name('api.blogs_annonces_one_reservations');

        Route::get(
            'blogs_annonces_ventes',
            'BlogannonceController@apiblogs_annonces_one_ventes'
        )->name('api.blogs_annonces_one_ventes');
    });

    Route::group(['prefix' => 'four'], function () {

        Route::get(
            'blogs_annonces_locations',
            'BlogannonceController@apiblogs_annonces_four_locations'
        )->name('api.blogs_annonces_four_locations');

        Route::get(
            'blogs_annonces_reservations',
            'BlogannonceController@apiblogs_annonces_four_reservations'
        )->name('api.blogs_annonces_four_reservations');

        Route::get(
            'blogs_annonces_ventes',
            'BlogannonceController@apiblogs_annonces_four_ventes'
        )->name('api.blogs_annonces_four_ventes');
    });


    require(__DIR__ . DIRECTORY_SEPARATOR . 'blogannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'blogannoncelocation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'blogannoncevente.php');

});
