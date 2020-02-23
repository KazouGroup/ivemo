<?php

Route::get(
    'blogs/annonce_reservations/',
    'BlogannoncereservationController@annonceblogreservation'
)->name('blogannoncereservations_site');

Route::get(
    'blogs/annonce_reservations/{categoryannoncereservation}',
    'BlogannoncereservationController@annonceblogcategoryreservation'
)->name('blogannoncecategoryreservation_site');

Route::get(
    'blogs/annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}',
    'BlogannoncereservationController@annonceblogcategoryreservationslug'
)->name('blogannoncecategoryreservationslug_site');

Route::get(
    'blogs/annonce_reservations/{blogannoncereservation}/edit',
    'BlogannoncereservationController@edit'
)->name('blogannoncecategoryreservationedit_site');

Route::get(
    'api/blogs/annonce_reservation/{blogannoncereservation}',
    'BlogannoncereservationController@show'
)->name('api.blogannonceblogcategoryreservationslugin_site');

Route::get(
    'profile/{user}/personal_settings/blogs/annonce_reservations/',
    'BlogannoncereservationController@blogannoncesreservationsbyuser'
)->name('blogannoncesreservationsbyuser_site');

Route::get(
    'api/profile/{user}/personal_settings/blogs/annonce_reservations/',
    'BlogannoncereservationController@apiblogannoncesreservationsbyuser'
)->name('api.blogannoncesreservationsbyuser_site');

Route::get(
    'blogs/annonce_reservations_activated/{id}',
    'BlogannoncereservationController@activated'
)->name('blogannoncecategoryreservationactivated_site');

Route::get(
    'blogs/annonce_reservations_unactivated/{id}',
    'BlogannoncereservationController@unactivated'
)->name('blogannoncecategoryreservationunactivated_site');

Route::delete(
    'blogs/annonce_reservations_delete/{id}',
    'BlogannoncereservationController@destroy'
)->name('blogannoncecategoryreservationdelete_site');
