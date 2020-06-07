<?php


Route::get(
    'api/dashboard/contactusersfaqs',
    'ContactusersfaqController@api'
)->name('api.contactusersfaqs_dashboard');

Route::get(
    'dashboard/contactusersfaqs',
    'ContactusersfaqController@index'
)->name('contactusersfaqs.dashboard');

Route::get(
    'api/dashboarcontactusersfaqs_count',
    'ContactusersfaqController@datacount'
)->name('apicontactusersfaqs_dashboard_count');

Route::get(
    'api/dashboardcontactusersfaqsactive_count',
    'ContactusersfaqController@dataactivecount'
)->name('apicontactusersfaqs_dashboardactive_count');

Route::get(
    'api/dashboardcontactusersfaqsunactive_count',
    'ContactusersfaqController@dataunactivecount'
)->name('apicontactusersfaqs_dashboardunactive_count');

Route::delete(
    'dashboard/contactusersfaqs/{id}',
    'ContactusersfaqController@destroy'
)->name('contactusersfaqs.destroy');
