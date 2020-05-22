<?php

Route::group(['prefix' => 'dashboard/premium'], function () {


    Route::get(
        '{user:slug}/employments',
        'PremiumemploymentController@index'
    )->name('employments_premium.dashboard');

    Route::get(
        '{user:slug}/employments/create',
        'PremiumemploymentController@create'
    )->name('employments_premium_create.dashboard');

    Route::get(
        '{user:slug}/employments/{employment}/edit',
        'PremiumemploymentController@edit'
    )->name('employments_premium_edit.dashboard');

    Route::get(
        '{user:slug}/employments/{categoryemployment:slug}',
        'PremiumemploymentController@category'
    )->name('employments_premium_categoryemployment.dashboard');

});



Route::group(['prefix' => 'api'], function () {


    Route::get(
        '{user:slug}/premiumemployment',
        'PremiumemploymentController@data'
    )->name('api.employments_premium');

    Route::get(
        '{user:slug}/premiumemployment_count',
        'PremiumemploymentController@datacount'
    )->name('api.employments_premium_count');

    Route::get(
        '{user:slug}/premiumemploymentsactive_count',
        'PremiumemploymentController@dataactivecount'
    )->name('api.employments_premiumactive_count');

    Route::get(
        '{user:slug}/premiumemploymentsunactive_count',
        'PremiumemploymentController@dataunactivecount'
    )->name('api.employments_premiumunactive_count');

    Route::get(
        '{user:slug}/v/{categoryemployment}/premiumemployment_count',
        'PremiumemploymentController@datacategorycount'
    )->name('api.employments_premium_category_count');

    Route::get(
        '{user:slug}/v/{categoryemployment}/premiumemploymentsactive_count',
        'PremiumemploymentController@datacategoryactivecount'
    )->name('api.employments_premiumactive_category_count');

    Route::get(
        '{user:slug}/v/{categoryemployment}/premiumemploymentsunactive_count',
        'PremiumemploymentController@datacategoryunactivecount'
    )->name('api.employments_premiumunactive_category_count');

});
