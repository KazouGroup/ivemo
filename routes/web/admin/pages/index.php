<?php

Route::group(['namespace' => 'Pages'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'faqs.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'dashboardactivitycity.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'conditionutilisations.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'dashboardemployement.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'policyprivacies.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'licencesites.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'testimonials.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'terms_conditions.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'workwithuses.php');
});
