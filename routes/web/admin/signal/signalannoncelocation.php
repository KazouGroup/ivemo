<?php




Route::group(['namespace' => 'Signale'], function(){

    Route::get(
        'api/signalannoncelocations',
        'SignalannoncelocationController@api'
    )->name('api.signalannoncelocations');

    Route::get(
        'api/signalannoncelocations/{annoncelocation:slug}',
        'SignalannoncelocationController@annoncelocation'
    )->name('api.signalannoncelocations_annoncelocation');

    Route::get(
        'dashboard/signalannoncelocations',
        'SignalannoncelocationController@index'
    )->name('signalannoncelocations.index');

    Route::get(
        'dashboard/signalannoncelocations/{annoncelocation:slug}',
        'SignalannoncelocationController@show'
    )->name('signalannoncelocations.show');


    Route::get('dashboard/active_signalannoncelocations/{id}',
        'SignalannoncelocationController@activated')
        ->name('activated_signalannoncelocations');

    Route::get('dashboard/unactive_signalannoncelocations/{id}',
        'SignalannoncelocationController@unactivated')
        ->name('unactivated_signalannoncelocations');

});
