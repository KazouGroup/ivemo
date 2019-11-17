<?php

Route::group(['namespace' => 'Partials'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'categories_faqs.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'links.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'roles.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'permissions.php');

});
