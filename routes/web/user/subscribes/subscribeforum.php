<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'subscribes/employments',
        'SubscribemploymentController@apiusersubscribes'
    )->name('api.usersubscribes_forums');

    Route::get(
        'subscribed/forums',
        'SubscribemploymentController@apiusersubscribed'
    )->name('api.usersubscribed_forums');

    Route::get(
        'subscribes_count/forums',
        'SubscribemploymentController@apiusersubscribes_count'
    )->name('api.usersubscribes_forums_count');

    Route::get(
        'subscribed_count/forums',
        'SubscribemploymentController@apiusersubscribed_count'
    )->name('api.usersubscribed_forums_count');

});


Route::post(
    '/forums_subscribe/{user:id}/subscribe',
    'SubscribeforumController@subscribe'
)->name('forums_subscribe.subscribe');
