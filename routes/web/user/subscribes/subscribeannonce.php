<?php



Route::post(
    'annonces_subscribe/{user:id}/subscribe',
    'SubscribeannonceController@subscribe'
)->name('annonces_subscribe.subscribe');
