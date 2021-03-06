<?php

Route::group(['middleware' => 'auth:web'], function(){

    Route::group(['middleware' => 'verified'],function (){

        Route::group(['middleware' => 'verified_status_admin'],function (){

            Route::get(
                '/dashboard',
                'AdminController@index'
            )->name('dashboard.index');
    
            /** C'est route son dans le directory categories */
            require(__DIR__ . DIRECTORY_SEPARATOR . 'categories'. DIRECTORY_SEPARATOR . 'index.php');
    
            require(__DIR__ . DIRECTORY_SEPARATOR . 'blog'. DIRECTORY_SEPARATOR . 'index.php');
    
            require(__DIR__ . DIRECTORY_SEPARATOR . 'contacts'. DIRECTORY_SEPARATOR . 'index.php');
    
            /** C'est route son dans le directory pages */
            require(__DIR__ . DIRECTORY_SEPARATOR . 'pages'. DIRECTORY_SEPARATOR . 'index.php');
    
            /** C'est route son dans le directory partials */
            require(__DIR__ . DIRECTORY_SEPARATOR . 'partials'. DIRECTORY_SEPARATOR . 'index.php');
    
            /** C'est route son dans le directory signal */
            require(__DIR__ . DIRECTORY_SEPARATOR .'signal'. DIRECTORY_SEPARATOR . 'signalannoncelocation.php');
    
            require(__DIR__ . DIRECTORY_SEPARATOR .'signal'. DIRECTORY_SEPARATOR . 'signalannoncereservation.php');
    
            require(__DIR__ . DIRECTORY_SEPARATOR .'signal'. DIRECTORY_SEPARATOR . 'signalannoncevente.php');
    
            require(__DIR__ . DIRECTORY_SEPARATOR .'user'. DIRECTORY_SEPARATOR . 'index.php');
    
            require(__DIR__ . DIRECTORY_SEPARATOR . 'profiles.php');
    
    
        });


    });

});
