<?php

Route::group(['namespace' => 'Favorites'], function(){


    require(__DIR__ . DIRECTORY_SEPARATOR . 'favoritemployment.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'favoriteblogannoncelocation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'favoriteblogannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'favoriteblogannoncevente.php');

});
