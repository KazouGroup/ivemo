<?php

Route::group(['middleware' => 'auth:web'], function(){

    Route::group(['middleware' => 'verified'],function (){

        Route::get(
            'api/dashboard/premium/{user:slug}',
            'UserpremiumController@apipremiumindex'
        )->name('api.premium_user_index.site');


        Route::get(
            'dashboard/premium/{user:slug}',
            'UserpremiumController@premiumindex'
        )->name('premium_user_index.site');

        Route::get(
            'dashboard/premium/{user:slug}/blogs/annonce_reservations/',
            'UserpremiumController@premiumannoncereservations'
        )->name('premium_user_annonce_reservations.site');

        Route::get(
            'dashboard/premium/{user:slug}/blogs/annonce_ventes/',
            'UserpremiumController@premiumannonceventes'
        )->name('premium_user_annonce_ventes.site');

    });

    require(__DIR__ . DIRECTORY_SEPARATOR . 'premiumteamuser.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'blog'. DIRECTORY_SEPARATOR . 'index.php');
});
