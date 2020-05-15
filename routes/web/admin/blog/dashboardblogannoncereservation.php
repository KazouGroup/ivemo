<?php


Route::group(['prefix' => 'api'], function () {


    Route::get(
        'dashboardblogannoncereservations',
        'DashboardblogannoncereservationController@api'
    )->name('api.blogannoncereservations_dashboard');

    Route::get(
        'dashboardblogannoncereservations_count',
        'DashboardblogannoncereservationController@blogannoncecount'
    )->name('api.blogannoncereservations_dashboard_count');

    Route::get(
        'dashboardblogannoncereservations_count/{categoryannoncereservation:slug}',
        'DashboardblogannoncereservationController@blogannoncebycategorycount'
    )->name('api.blogannoncereservationsbycategory_dashboard_count');

    Route::get(
        'dashboardblogannoncereservationsactive_count',
        'DashboardblogannoncereservationController@blogannonceactivecount'
    )->name('api.blogannoncereservations_dashboardactive_count');

    Route::get(
        'dashboardblogannoncereservationsactive_count/{categoryannoncereservation:slug}',
        'DashboardblogannoncereservationController@blogannonceactivebycategorycount'
    )->name('api.blogannoncereservationsbycategory_dashboardactive_count');

    Route::get(
        'dashboardblogannoncereservationsactive_count',
        'DashboardblogannoncereservationController@blogannonceactivecount'
    )->name('api.blogannoncereservations_dashboardactive_count');

    Route::get(
        'dashboardblogannoncereservationsunactive_count',
        'DashboardblogannoncereservationController@blogannonceunactivebycategorycount'
    )->name('api.blogannoncereservationsbycategory_dashboardunactive_count');

    Route::get(
        'dashboardblogannoncereservations/{categoryannoncereservation:slug}',
        'DashboardblogannoncereservationController@categoryannoncereservation'
    )->name('api.blogannoncereservations_dashboard_show');
});


Route::get(
    'dashboard/blogannoncereservations',
    'DashboardblogannoncereservationController@index'
)->name('blogannoncereservations.dashboard');

Route::get(
    'dashboard/blogannoncereservations/{categoryannoncereservation:slug}',
    'DashboardblogannoncereservationController@show'
)->name('blogannoncereservations_show.dashboard');

Route::get('dashboard/active_blogannoncereservations/{id}',
    'DashboardblogannoncereservationController@activated'
)->name('activated_blogannoncereservations.dashboard');

Route::get('dashboard/unactive_blogannoncereservations/{id}',
    'DashboardblogannoncereservationController@unactivated'
)->name('unactivated_blogannoncereservations.dashboard');
