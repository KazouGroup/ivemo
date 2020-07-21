<?php

Route::group(['namespace' => 'Contactservice'], function(){


    Route::group(['middleware' => 'verified'], function(){

        Route::group(['middleware' => 'verified_status_user'],function (){
    
         
            require(__DIR__ . DIRECTORY_SEPARATOR . 'contactservices.php');
            require(__DIR__ . DIRECTORY_SEPARATOR . 'contactservicemployments.php');
    
           
            
        });
    
    });
    


});
