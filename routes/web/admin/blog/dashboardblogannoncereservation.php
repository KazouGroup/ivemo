<?php



Route::get(
    'api/dashboardblogannoncereservations',
    'DashboardblogannoncereservationController@api'
)->name('api.blogannoncereservations_dashboard');

Route::get(
    'api/dashboardblogannoncereservations_count',
    'DashboardblogannoncereservationController@blogannoncecount'
)->name('api.blogannoncereservations_dashboard_count');

Route::get(
    'api/dashboardblogannoncereservationsactive_count',
    'DashboardblogannoncereservationController@blogannonceactivecount'
)->name('api.blogannoncereservations_dashboardactive_count');

Route::get(
    'api/dashboardblogannoncereservationsunactive_count',
    'DashboardblogannoncereservationController@blogannonceunactivecount'
)->name('api.blogannoncereservations_dashboardunactive_count');

Route::get(
    'api/dashboardblogannoncelocations/{annoncereservation:slug}',
    'DashboardblogannoncereservationController@annonce'
)->name('api.blogannoncereservations_dashboard_show');

Route::get(
    'dashboard/blogannoncereservations',
    'DashboardblogannoncereservationController@index'
)->name('blogannoncereservations.dashboard');

Route::get(
    'dashboard/blogannoncereservations/{annoncereservation:slug}',
    'DashboardblogannoncereservationController@show'
)->name('blogannoncereservations.dashboard');

Route::get('dashboard/active_blogannoncereservations/{id}',
    'DashboardblogannoncereservationController@activated'
)->name('activated_blogannoncereservations.dashboard');

Route::get('dashboard/unactive_blogannoncereservations/{id}',
    'DashboardblogannoncereservationController@unactivated'
)->name('unactivated_blogannoncereservations.dashboard');
