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


Route::post(
    '/employments_subscribe/{user:id}/subscribe',
    'SubscribemploymentController@subscribe'
)->name('employments_subscribe.subscribe');
