<?php



Route::group(['middleware' => 'auth','prefix' => 'profile'], function () {

    Route::get(
        '{user}/personal_settings/blogs/annonce_reservations/',
        'BlogannoncereservationController@blogannoncesreservationsbyuser'
    )->name('blogannoncesreservationsbyuser_site');

    Route::get(
        '{user}/personal_settings/blogs/annonce_reservations/{categoryannoncereservation}',
        'BlogannoncereservationController@blogannoncesreservationscategoryannoncereservationbyuser'
    )->name('blogannoncesreservationscategoryannoncereservationbyuser_site');


});

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'blogs/annonce_reservations/',
        'BlogannoncereservationController@apiannonceblogreservation'
    )->name('api.blogannoncereservations_site');

    Route::get(
        'blogs/annonce_reservations/{categoryannoncereservation}',
        'BlogannoncereservationController@apiannonceblogcategoryreservation'
    )->name('api.blogannoncecategoryreservations_site');

    Route::get(
        'blogs/annonce_reservationscount/{categoryannoncereservation}',
        'BlogannoncereservationController@apiannonceblogcategoryreservationcount'
    )->name('api.blogannoncecategoryreservationscount_site');

    Route::get(
        'blogs/annonce_reservations_interesses/{categoryannoncereservation}/{user}',
        'BlogannoncereservationController@apiblogannoncereservationinteresse'
    )->name('api.blogannoncereservationinteresse_site');

    Route::get(
        'blogs/annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}',
        'BlogannoncereservationController@apiannonceblogcategoryreservationslug'
    )->name('api.blogannoncecategoryreservationslug_site');

    Route::get(
        'pro{user}/blogs_annonce_reservations',
        'BlogannoncereservationController@apiblogsannoncereservationspublique'
    )->name('api.blogs_annonce_reservationspublique');

    Route::get(
        'blogs/annonce_reservation/{blogannoncereservation}',
        'BlogannoncereservationController@show'
    )->name('api.blogannonceblogcategoryreservationslugin_site');

    Route::get(
        '{user}/personal_settings/blogs/annonce_reservations/',
        'BlogannoncereservationController@apiblogannoncesreservationsbyuser'
    )->name('api.blogannoncesreservationsbyuser_site');

    Route::get(
        '{user}/personal_settings/blogs/annonce_reservations/{categoryannoncereservation}',
        'BlogannoncereservationController@apiblogannoncesreservationscategoryannoncereservationbyuser'
    )->name('api.blogannoncesreservationscategoryannoncereservationbyuser_site');

});

Route::group(['prefix' => 'blogs'], function () {

    Route::get(
        'annonce_reservations/',
        'BlogannoncereservationController@annonceblogreservation'
    )->name('blogannoncereservations_site');

    Route::get(
        'annonce_reservations/ab/new',
        'BlogannoncereservationController@create'
    )->name('blogannoncereservationabnew_site');

    Route::post(
        'annonce_reservations/save',
        'BlogannoncereservationController@store'
    )->name('blogannoncecategoryreservationtore_site');

    Route::get(
        'annonce_reservations/{categoryannoncereservation}',
        'BlogannoncereservationController@annonceblogcategoryreservation'
    )->name('blogannoncecategoryreservation_site');

    Route::get(
        'annonce_reservations/{categoryannoncereservation}/{date}/{blogannoncereservation}',
        'BlogannoncereservationController@annonceblogcategoryreservationslug'
    )->name('blogannoncecategoryreservationslug_site');

    Route::get(
        'annonce_reservations/{blogannoncereservation}/edit',
        'BlogannoncereservationController@edit'
    )->name('blogannoncecategoryreservationedit_site');

    Route::put(
        'annonce_reservations/{blogannoncereservation}',
        'BlogannoncereservationController@update'
    )->name('blogannoncecategoryreservationupdate_site');

    Route::get(
        'annonce_reservations_activated/{id}',
        'BlogannoncereservationController@activated'
    )->name('blogannoncecategoryreservationactivated_site');

    Route::get(
        'annonce_reservations_unactivated/{id}',
        'BlogannoncereservationController@unactivated'
    )->name('blogannoncecategoryreservationunactivated_site');

    Route::delete(
        'annonce_reservations_delete/{id}',
        'BlogannoncereservationController@destroy'
    )->name('blogannoncecategoryreservationdelete_site');
});
