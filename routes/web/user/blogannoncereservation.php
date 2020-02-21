<?php
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
    'api/blogs/annonce_reservations/{blogannoncereservation}',
    'BlogannoncereservationController@show'
)->name('api.blogannonceblogcategoryreservationslugin_site');
