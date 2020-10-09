<?php

Route::group(['namespace' => 'Uploadimages'], function(){


    require(__DIR__ . DIRECTORY_SEPARATOR . 'uploadimageactivitycity.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'uploadimageannoncelocation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'uploadimageannoncevente.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'uploadimageannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'uploadimages.php');

});
