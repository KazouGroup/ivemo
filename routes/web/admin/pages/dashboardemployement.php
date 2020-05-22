<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'dashboardemployments',
        'DashboardemployementController@api'
    )->name('api.employments_dashboard');

    Route::get(
        'dashboardemployments_count',
        'DashboardemployementController@employmentcount'
    )->name('api.employments_dashboard_count');

    Route::get(
        'dashboardemployments_count/{categoryemployment:slug}',
        'DashboardemployementController@employmentbycategorycount'
    )->name('api.employmentsbycategory_dashboard_count');

    Route::get(
        'dashboardemploymentsactive_count',
        'DashboardemployementController@employmentactivecount'
    )->name('api.employments_dashboardactive_count');

    Route::get(
        'dashboardemploymentsactive_count/{categoryemployment:slug}',
        'DashboardemployementController@employmentactivebycategorycount'
    )->name('api.employmentsbycategory_dashboardactive_count');

    Route::get(
        'dashboardemploymentsunactive_count',
        'DashboardemployementController@employmentunactivecount'
    )->name('api.employments_dashboardunactive_count');

    Route::get(
        'dashboardemploymentsunactive_count/{categoryemployment:slug}',
        'DashboardemployementController@employmentunactivebycategorycount'
    )->name('api.employmentsbycategory_dashboardunactive_count');

    Route::get(
        'dashboardemployments/{categoryemployment:slug}',
        'DashboardemployementController@categoryemployment'
    )->name('api.employments_dashboard_show');
});


Route::get(
    'dashboard/employments',
    'DashboardemployementController@index'
)->name('employments.dashboard');

Route::get(
    'dashboard/employments/{categoryemployment:slug}',
    'DashboardemployementController@show'
)->name('employments_show.dashboard');

Route::get('dashboard/active_employments/{id}',
    'DashboardemployementController@activated'
)->name('activated_employments.dashboard');

Route::get('dashboard/unactive_employments/{id}',
    'DashboardemployementController@unactivated'
)->name('unactivated_employments.dashboard');
