<?php

Route::group(['namespace' => 'Blogs'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'dashboardblogannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'dashboardblogannoncelocation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'dashboardblogannoncevente.php');

});
