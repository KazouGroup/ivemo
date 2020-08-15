<?php

Route::group(['namespace' => 'Favorites'], function(){


    require(__DIR__ . DIRECTORY_SEPARATOR . 'favoriteannoncelocation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'favoriteannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'favoriteannoncevente.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'favoriteblogannoncelocation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'favoriteblogannoncereservation.php');
    require(__DIR__ . DIRECTORY_SEPARATOR . 'favoriteblogannoncevente.php');

});
