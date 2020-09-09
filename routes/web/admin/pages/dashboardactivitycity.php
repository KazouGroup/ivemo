<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'dashboard/activitycities',
        'DashboardactivitycityController@apiactivitycities'
    )->name('api.apiactivitycities_dashboard');

    Route::get(
        'dashboardactivitycities_count',
        'DashboardactivitycityController@datacount'
    )->name('api.activitycities_dashboard_count');

    Route::get(
        'dashboardactivitycityactive_count',
        'DashboardactivitycityController@dataactivecount'
    )->name('api.activitycities_dashboardactive_count');

    Route::get(
        'dashboardactivitycityunactive_count',
        'DashboardactivitycityController@dataunactivecount'
    )->name('api.activitycities_dashboardunactive_count');


    Route::get(
        'dashboard/activitycities/city/{city}',
        'DashboardactivitycityController@apiactivitycitiesbycity'
    )->name('api.apiactivitycitiesbycity_dashboard');

    Route::get(
        'dashboard/activitycities/data/{activitycity:slugin}/edit',
        'DashboardactivitycityController@apiactivitycityshow'
    )->name('api.activitycity_edit_dashboard');

});


Route::get(
    'dashboard/activitycities',
    'DashboardactivitycityController@activitycities'
)->name('activitycities.dashboard');

Route::get(
    'dashboard/activitycities/city/{city:slug}',
    'DashboardactivitycityController@activitycitiesbycity'
)->name('activitycitiesbycity_dashboard.dashboard');

Route::get(
    'dashboard/activitycities/data/new',
    'DashboardactivitycityController@activitycitynew'
)->name('activitycitiesnew_dashboard.dashboard');

Route::post(
    'dashboard/activitycities/data/store',
    'DashboardactivitycityController@storeactivitycity'
)->name('activitycitiesstore_dashboard.dashboard');

Route::get(
    'dashboard/activitycities/data/{activitycity:slugin}/edit',
    'DashboardactivitycityController@activitycityshow'
)->name('activitycityshow.dashboard');

Route::put(
    'dashboard/activitycities/data/{activitycity:slugin}/update',
    'DashboardactivitycityController@updateactivitycity'
)->name('activitycitiesupdate_dashboard.dashboard');

Route::get('dashboard/active_activitycities/{activitycity}/active',
    'DashboardactivitycityController@activated'
)->name('activated_activitycities.dashboard');

Route::get('dashboard/unactive_activitycities/{activitycity}/unactive',
    'DashboardactivitycityController@unactivated'
)->name('unactivated_activitycities.dashboard');

Route::delete('dashboard/delete_activitycities/{activitycity}/delete',
    'DashboardactivitycityController@destroy'
)->name('activitycitiesdelete_dashboard.dashboard');
