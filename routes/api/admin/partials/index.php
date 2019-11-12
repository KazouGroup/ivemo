<?php

Route::group(['namespace' => 'Partials'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'colors.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'permissions.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'roles.php');

});
