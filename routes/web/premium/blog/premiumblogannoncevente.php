<?php


Route::get(
    'api/dashboardblogannonceventes',
    'DashboardblogannonceventeController@api'
)->name('api.blogannonceventes_dashboard');

Route::get(
    'api/dashboardblogannonceventes_count',
    'DashboardblogannonceventeController@blogannonceventescount'
)->name('api.blogannonceventes_dashboard_count');

Route::get(
    'api/dashboardblogannonceventesactive_count',
    'DashboardblogannonceventeController@blogannonceventesactivecount'
)->name('api.blogannonceventes_dashboardactive_count');

Route::get(
    'api/dashboardblogannonceventesunactive_count',
    'DashboardblogannonceventeController@blogannonceventesunactivecount'
)->name('api.blogannonceventes_dashboardunactive_count');

Route::get(
    'api/dashboardblogannonceventes/{categoryannoncevente:slug}',
    'DashboardblogannonceventeController@categoryannoncevente'
)->name('api.blogannonceventes_dashboard_show');

Route::get(
    'dashboard/blogannonceventes',
    'DashboardblogannonceventeController@index'
)->name('blogannonceventes.dashboard');

Route::get(
    'dashboard/blogannonceventes/{categoryannoncevente:slug}',
    'DashboardblogannonceventeController@show'
)->name('blogannonceventes_show.dashboard');

Route::get('dashboard/active_blogannonceventes/{id}',
    'DashboardblogannonceventeController@activated'
)->name('activated_blogannonceventes.dashboard');

Route::get('dashboard/unactive_blogannonceventes/{id}',
    'DashboardblogannonceventeController@unactivated'
)->name('unactivated_blogannonceventes.dashboard');
