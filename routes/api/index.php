<?php

Route::group(['namespace' => 'Admin'], function(){


    require(__DIR__ . DIRECTORY_SEPARATOR . 'admin'. DIRECTORY_SEPARATOR . 'index.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'user.php');

});

Route::group(['namespace' => 'User'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'user'. DIRECTORY_SEPARATOR . 'index.php');

});

