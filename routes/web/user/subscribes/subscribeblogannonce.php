<?php



Route::get(
    '/blogannonces_subscribe/{id}',
    'SubscribeblogannonceController@subscribe'
)->name('blogannonces_subscribe.subscribe');

Route::get(
    '/blogannonces_unsubscribe/{id}',
    'SubscribeblogannonceController@unsubscribe'
)->name('blogannonces_unsubscribe.unsubscribe');
