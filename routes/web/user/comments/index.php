<?php

Route::group(['namespace' => 'Comments'], function(){


    require(__DIR__ . DIRECTORY_SEPARATOR . 'commentannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'commentblogannoncereservation.php');

});
