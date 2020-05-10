<?php

Route::group(['namespace' => 'Blogs'], function(){

    Route::group(['prefix' => 'blogs'], function () {

        Route::get(
            '/',
            'BlogannonceController@index'
        )->name('blogannonce.index');

    });

    require(__DIR__ . DIRECTORY_SEPARATOR . 'blogannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'blogannoncelocation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'blogannoncevente.php');

});
