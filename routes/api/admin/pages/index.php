<?php

Route::group(['namespace' => 'Pages'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'faqs.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'policyprivacies.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'testimonials.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'terms_conditions.php');
});
