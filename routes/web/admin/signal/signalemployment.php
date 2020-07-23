<?php




Route::group(['namespace' => 'Signale'], function(){

    Route::get(
        'api/signalemployments',
        'SignalemploymentController@api'
    )->name('api.signalemployments');

    Route::get(
        'api/signalemployments/{employment:slug}',
        'SignalemploymentController@apiemployment'
    )->name('api.signalemployments');

    Route::get(
        'dashboard/signalemployments',
        'SignalemploymentController@index'
    )->name('signalemployments.index');

    Route::get(
        'dashboard/signalemployments/{employment:slug}',
        'SignalemploymentController@show'
    )->name('signalemployments.show');


    Route::get('dashboard/active_signalemployments/{id}',
        'SignalemploymentController@activated')
        ->name('activated_signalemployments');

});
