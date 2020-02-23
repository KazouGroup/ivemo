<?php

Route::get(
    'blogs/annonce_reservations/',
    'BlogannoncereservationController@apiannonceblogreservation'
)->name('api.blogannoncereservations_site');

Route::get(
    'blogs/annonce_reservations/{categoryannoncereservation}',
    'BlogannoncereservationController@apiannonceblogcategoryreservation'
)->name('api.blogannoncecategoryreservations_site');

Route::get(
    'blogs/annonce_reservations_interesses/{categoryannoncereservation}',
    'BlogannoncereservationController@apiblogannoncereservationinteresse'
)->name('api.blogannoncereservationinteresse_site');

Route::get(
    'blogs/annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}',
    'BlogannoncereservationController@apiannonceblogcategoryreservationslug'
)->name('api.blogannoncecategoryreservationslug_site');

Route::get(
    '@{user}/blogs_annonce_reservations',
    'BlogannoncereservationController@apiblogsannoncereservationspublique'
)->name('api.blogs_annonce_reservationspublique');
