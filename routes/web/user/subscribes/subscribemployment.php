<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'subscribes/employments',
        'SubscribemploymentController@apiusersubscribes'
    )->name('api.usersubscribes');

    Route::get(
        'subscribed/employments',
        'SubscribemploymentController@apiusersubscribed'
    )->name('api.usersubscribed');

    Route::get(
        'subscribes_count/employments',
        'SubscribemploymentController@apiusersubscribes_count'
    )->name('api.usersubscribes_count');

    Route::get(
        'subscribed_count/employments',
        'SubscribemploymentController@apiusersubscribed_count'
    )->name('api.usersubscribed_count');

});


Route::get(
    '/employments_subscribe/{id}',
    'SubscribemploymentController@subscribe'
)->name('employments_subscribe.subscribe');

Route::get(
    '/employments_unsubscribe/{id}',
    'SubscribemploymentController@unsubscribe'
)->name('employments_unsubscribe.unsubscribe');