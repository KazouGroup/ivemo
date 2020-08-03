<?php

Route::group(['namespace' => 'Subscribes'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'subscribemployment.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'subscribeforum.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'subscribannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'subscribeblogannonce.php');

});
