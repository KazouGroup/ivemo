<?php

Route::group(['namespace' => 'Contactservice'], function(){


    require(__DIR__ . DIRECTORY_SEPARATOR . 'contactservicannoncelocactions.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'contactservicannoncereservations.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'contactservices.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'contactserviceactivitycity.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'contactserviceannonceventes.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'contactservicemployments.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'reservationsannonces.php');


});
