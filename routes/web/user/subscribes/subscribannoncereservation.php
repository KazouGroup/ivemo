<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'subscribes/annoncereservations',
        'SubscribannoncereservationController@apiusersubscribes'
    )->name('api.usersubscribes');

    Route::get(
        'subscribed/annoncereservations',
        'SubscribannoncereservationController@apiusersubscribed'
    )->name('api.usersubscribed');

    Route::get(
        'subscribes_count/annoncereservations',
        'SubscribannoncereservationController@apiusersubscribes_count'
    )->name('api.usersubscribes_count');

    Route::get(
        'subscribed_count/annoncereservations',
        'SubscribannoncereservationController@apiusersubscribed_count'
    )->name('api.usersubscribed_count');

});


Route::post(
    '/annoncereservations_subscribe/{user:id}/subscribe',
    'SubscribannoncereservationController@subscribe'
)->name('annoncereservations_subscribe.subscribe');

Route::post(
    '/annoncereservations_unsubscribe/{user:id}/unsubscribe',
    'SubscribannoncereservationController@unsubscribe'
)->name('annoncereservations_unsubscribe.unsubscribe');
