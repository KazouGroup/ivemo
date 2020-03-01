<?php

Route::get(
    'api/profile/{user}/personal_settings/subscriber_users',
    'SubscriberuserController@apisubscriberusersbyuser'
)->name('api.subscriberusers');

Route::get(
    'profile/{user}/personal_settings/subscriber_users',
    'SubscriberuserController@subscriberuserprivate'
)->name('subscriberusers.site');

Route::post(
    '@{user}/subscriberuser_public_mail',
    'SubscriberuserController@subscriberuser_public_mail'
)->name('subscriberuser_public_mail.site');

Route::get(
    'subscriberuser_public_mail_export',
    'SubscriberuserController@export'
)->name('subscriberuser_public_mail.export');
