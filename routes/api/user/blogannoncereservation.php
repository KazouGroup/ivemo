<?php
Route::get(
    'blogs/annonce_reservations/{categoryannoncereservation}',
    'BlogannoncereservationController@apiannonceblogcategoryreservation'
)->name('api.annonceblogcategoryreservation');

Route::get(
    'blogs/annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}',
    'BlogannoncereservationController@apiannonceblogcategoryreservationslug'
)->name('api.annonceblogcategoryreservationslug');
