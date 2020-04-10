<?php



Route::get(
    'api/dashboardblogannoncelocations',
    'DashboardblogannoncelocationController@api'
)->name('api.blogannoncelocations_dashboard');

Route::get(
    'api/dashboardblogannoncelocation_count',
    'DashboardblogannoncelocationController@blogannoncecount'
)->name('api.blogannoncelocations_dashboard_count');

Route::get(
    'api/dashboardblogannoncelocationsactive_count',
    'DashboardblogannoncelocationController@blogannonceactivecount'
)->name('api.blogannoncelocations_dashboardactive_count');

Route::get(
    'api/dashboardblogannoncelocationsunactive_count',
    'DashboardblogannoncelocationController@blogannonceunactivecount'
)->name('api.blogannoncelocations_dashboardunactive_count');

Route::get(
    'api/dashboardblogannoncelocations/{annoncelocation:slug}',
    'DashboardblogannoncelocationController@annonce'
)->name('api.blogannoncelocations_dashboard_show');

Route::get(
    'dashboard/blogannoncelocations',
    'DashboardblogannoncelocationController@index'
)->name('blogannoncelocations.dashboard');

Route::get(
    'dashboard/blogannoncelocations/{annoncelocation:slug}',
    'DashboardblogannoncelocationController@show'
)->name('blogannoncelocations.dashboard');

Route::get('dashboard/active_blogannoncelocations/{id}',
    'DashboardblogannoncelocationController@activated'
)->name('activated_blogannoncelocations.dashboard');

Route::get('dashboard/unactive_blogannoncelocations/{id}',
    'DashboardblogannoncelocationController@unactivated'
)->name('unactivated_blogannoncelocations.dashboard');

