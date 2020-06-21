<?php



Route::get(
    '/employments_subscribe/{id}',
    'SubscribemploymentController@subscribe'
)->name('employments_subscribe.subscribe');

Route::get(
    '/employments_unsubscribe/{id}',
    'SubscribemploymentController@unsubscribe'
)->name('employments_unsubscribe.unsubscribe');
