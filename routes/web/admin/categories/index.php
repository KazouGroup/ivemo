<?php

Route::group(['namespace' => 'Categories'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'categories_faqs.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'categoryforums.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'categoryannoncelocations.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'categoryemployements.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'categoryworkwithuses.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'categoryannoncereservations.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'categoryannonceventes.php');


});
