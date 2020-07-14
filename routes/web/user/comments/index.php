<?php

Route::group(['namespace' => 'Comments'], function(){


    require(__DIR__ . DIRECTORY_SEPARATOR . 'commentannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'commentannoncelocation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'commentannoncevente.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'commentblogannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'commentandresponsecomment.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'commentblogannoncevente.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'commentemployment.php');

});
