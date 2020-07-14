<?php

//Route::resource('dashboard/contactusersadverts','AdvertController');
Route::get(
    'api/dashboard/contactusersforadverts',
    'ContactusersadvertController@api'
)->name('api.contactusersforadverts_dashboard');

Route::get(
    'api/dashboardcontactforadverts_count',
    'ContactusersadvertController@contactforadvertscount'
)->name('api.contactforadverts_dashboard_count');

Route::get(
    'api/dashboardcontactforadvertsred_count',
    'ContactusersadvertController@contactforadvertsredcount'
)->name('api.contactforadverts_dashboardred_count');

Route::get(
    'api/dashboardcontactforadvertsunred_count',
    'ContactusersadvertController@contactforadvertsunredcount'
)->name('api.contactforadverts_dashboardunred_count');

Route::get('/dashboard/contactusersforadverts','ContactusersadvertController@index')->name('contactusersadverts.index');

Route::get('dashboard/active_contactusersforadverts/{id}',
    'ContactusersadvertControllerController@activated'
)->name('activated_contactusersforadverts.dashboard');

Route::get('dashboard/unactive_contactusersforadverts/{id}',
    'ContactusersadvertController@unactivated'
)->name('unactivated_contactusersforadverts.dashboard');

Route::delete('dashboard/contactusersforadverts/{id}','ContactusersadvertController@destroy')->name('contactusersadverts.destroy');
