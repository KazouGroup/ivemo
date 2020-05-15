<?php



Route::group(['prefix' => 'api'], function () {

    Route::get(
        'dashboardblogannoncelocations',
        'DashboardblogannoncelocationController@api'
    )->name('api.blogannoncelocations_dashboard');

    Route::get(
        'dashboardblogannoncelocation_count',
        'DashboardblogannoncelocationController@blogannoncecount'
    )->name('api.blogannoncelocations_dashboard_count');

    Route::get(
        'dashboardblogannoncelocation_count/{categoryannoncelocation:slug}',
        'DashboardblogannoncelocationController@blogannoncebycategorycount'
    )->name('api.blogannoncelocationsbycategory_dashboard_count');

    Route::get(
        'dashboardblogannoncelocationsactive_count',
        'DashboardblogannoncelocationController@blogannonceactivecount'
    )->name('api.blogannoncelocations_dashboardactive_count');

    Route::get(
        'dashboardblogannoncelocationsactive_count/{categoryannoncelocation:slug}',
        'DashboardblogannoncelocationController@blogannonceactivebycategorycount'
    )->name('api.blogannoncelocationsbycategory_dashboardactive_count');

    Route::get(
        'dashboardblogannoncelocationsunactive_count',
        'DashboardblogannoncelocationController@blogannonceunactivecount'
    )->name('api.blogannoncelocations_dashboardunactive_count');

    Route::get(
        'dashboardblogannoncelocationsunactive_count/{categoryannoncelocation:slug}',
        'DashboardblogannoncelocationController@blogannonceunactivebycategorycount'
    )->name('api.blogannoncelocationsbycategory_dashboardunactive_count');

    Route::get(
        'dashboardblogannoncelocations/{categoryannoncelocation:slug}',
        'DashboardblogannoncelocationController@categoryannoncelocation'
    )->name('api.blogannoncelocations_dashboard_show');

});

Route::get(
    'dashboard/blogannoncelocations',
    'DashboardblogannoncelocationController@index'
)->name('blogannoncelocations.dashboard');

Route::get(
    'dashboard/blogannoncelocations/{categoryannoncelocation:slug}',
    'DashboardblogannoncelocationController@show'
)->name('blogannoncelocations_show.dashboard');

Route::get('dashboard/active_blogannoncelocations/{id}',
    'DashboardblogannoncelocationController@activated'
)->name('activated_blogannoncelocations.dashboard');

Route::get('dashboard/unactive_blogannoncelocations/{id}',
    'DashboardblogannoncelocationController@unactivated'
)->name('unactivated_blogannoncelocations.dashboard');

