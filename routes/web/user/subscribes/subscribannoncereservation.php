<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'subscribes/annoncereservations',
        'SubscribannoncereservationController@apiusersubscribes'
    )->name('api.annoncereservationsusersubscribes');

    Route::get(
        'subscribed/annoncereservations',
        'SubscribannoncereservationController@apiusersubscribed'
    )->name('api.annoncereservationsusersubscribed');

    Route::get(
        'subscribes_count/annoncereservations',
        'SubscribannoncereservationController@apiusersubscribes_count'
    )->name('api.annoncereservationsusersubscribes_count');

    Route::get(
        'subscribed_count/annoncereservations',
        'SubscribannoncereservationController@apiusersubscribed_count'
    )->name('api.annoncereservationsusersubscribed_count');

});


Route::post(
    '/annoncereservations_subscribe/{user:id}/subscribe',
    'SubscribannoncereservationController@subscribe'
)->name('annoncereservations_subscribe.subscribe');

Route::post(
    '/annoncereservations_unsubscribe/{user:id}/unsubscribe',
    'SubscribannoncereservationController@unsubscribe'
)->name('annoncereservations_unsubscribe.unsubscribe');
