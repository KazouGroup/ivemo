<?php
Route::get(
    'blogs/annonce_reservations/{categoryannoncereservation}',
    'BlogannoncereservationController@aannonceblogcategoryreservation'
)->name('blogannoncecategoryreservation_site');

Route::get(
    'blogs/annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}',
    'BlogannoncereservationController@annonceblogcategoryreservationslug'
)->name('blogannoncecategoryreservationslug_site');