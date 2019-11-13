<?php

Route::group(['middleware' => 'auth:web'], function(){

    Route::group(['middleware' => 'verified'],function (){

        Route::get(
            '/dashboard',
            'AdminController@index'
        )->name('dashboard.index');

        /** C'est route son dans le directory pages */
        require(__DIR__ . DIRECTORY_SEPARATOR . 'pages'. DIRECTORY_SEPARATOR . 'index.php');

        /** C'est route son dans le directory partials */
        require(__DIR__ . DIRECTORY_SEPARATOR . 'partials'. DIRECTORY_SEPARATOR . 'index.php');

        require(__DIR__ . DIRECTORY_SEPARATOR . 'users.php');

        require(__DIR__ . DIRECTORY_SEPARATOR . 'profiles.php');

    });

});
