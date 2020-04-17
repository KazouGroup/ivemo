<?php


Route::group(['prefix' => 'dashboard/premium'], function () {


    Route::get(
        '{user:slug}/blogs/annonce_reservations',
        'PremiumblogannoncereservationController@index'
    )->name('blogannoncereservations_premium.dashboard');

    Route::get(
        '{user:slug}/blogs/annonce_reservations/create',
        'PremiumblogannoncereservationController@create'
    )->name('blogannoncereservations_premium_create.dashboard');

    Route::get(
        '{user:slug}/blogs/annonce_reservations/{blogannoncereservation}/edit',
        'PremiumblogannoncereservationController@edit'
    )->name('blogannoncereservations_premium_edit.dashboard');

    Route::get(
        '{user:slug}/blogs/annonce_reservations/{categoryannoncereservation:slug}',
        'PremiumblogannoncereservationController@category'
    )->name('blogannoncereservations_premium_categoryannoncereservation.dashboard');

});



Route::group(['prefix' => 'api'], function () {


    Route::get(
        '{user:slug}/premiumblogannoncereservation',
        'PremiumblogannoncereservationController@data'
    )->name('api.blogannoncereservations_premium');

    Route::get(
        '{user:slug}/premiumblogannoncereservation_count',
        'PremiumblogannoncereservationController@datacount'
    )->name('api.blogannoncereservations_premium_count');

    Route::get(
        '{user:slug}/premiumblogannoncereservationsactive_count',
        'PremiumblogannoncereservationController@dataactivecount'
    )->name('api.blogannoncereservations_premiumactive_count');

    Route::get(
        '{user:slug}/premiumblogannoncereservationsunactive_count',
        'PremiumblogannoncereservationController@dataunactivecount'
    )->name('api.blogannoncereservations_premiumunactive_count');

    Route::get(
        '{user:slug}/v/{categoryannoncereservation}/premiumblogannoncereservation_count',
        'PremiumblogannoncereservationController@datacategorycount'
    )->name('api.blogannoncereservations_premium_category_count');

    Route::get(
        '{user:slug}/v/{categoryannoncereservation}/premiumblogannoncereservationsactive_count',
        'PremiumblogannoncereservationController@datacategoryactivecount'
    )->name('api.blogannoncereservations_premiumactive_category_count');

    Route::get(
        '{user:slug}/v/{categoryannoncereservation}/premiumblogannoncereservationsunactive_count',
        'PremiumblogannoncereservationController@datacategoryunactivecount'
    )->name('api.blogannoncereservations_premiumunactive_category_count');

});
