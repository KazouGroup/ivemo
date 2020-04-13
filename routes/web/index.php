<?php

Route::group(['namespace' => 'Admin'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'admin'. DIRECTORY_SEPARATOR . 'index.php');

});

Route::group(['namespace' => 'Premium'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'premium'. DIRECTORY_SEPARATOR . 'index.php');

});

Route::group(['namespace' => 'Auth'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'auth'. DIRECTORY_SEPARATOR . 'index.php');

});

Route::group(['namespace' => 'User'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'user'. DIRECTORY_SEPARATOR . 'index.php');

});


