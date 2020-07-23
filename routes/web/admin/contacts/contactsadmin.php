<?php


Route::get(
    'api/dashboard/contacts',
    'ContactController@api'
)->name('api.contacts_dashboard');

Route::get(
    'api/dashboarcontacts_count',
    'ContactController@datacount'
)->name('api.contacts_dashboard_count');

Route::get(
    'api/dashboardcontactsactive_count',
    'ContactController@dataactivecount'
)->name('api.contacts_dashboardred_count');

Route::get(
    'api/dashboardcontactsunactive_count',
    'ContactController@dataunactivecount'
)->name('api.contacts_dashboardunred_count');

Route::get(
    'dashboard/contacts',
    'ContactController@index'
)->name('contacts.dashboard');

Route::delete(
    'dashboard/contacts/{id}',
    'ContactController@destroy'
)->name('contacts.destroy');
