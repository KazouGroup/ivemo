<?php



Route::post(
    'avs/{annoncetype}/{categoryannoncevente}/{city}/{user:slug}/{annoncevente}/contactservices',
    'ContactservicannonceventeController@sendcontactserviceannonce'
)->name('annonceventesendcontactservice_site');


Route::group(['middleware' => 'verified'], function(){


});
