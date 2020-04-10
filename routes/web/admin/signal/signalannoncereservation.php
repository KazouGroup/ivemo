<?php




Route::group(['namespace' => 'Signale'], function(){

    Route::get(
        'api/signalannoncereservations',
        'SignalannoncereservationController@api'
    )->name('api.signalannoncereservations');

    Route::get(
        'api/signalannoncereservations/{annoncereservation:slug}',
        'SignalannoncereservationController@annoncereservation'
    )->name('api.signalannoncereservations_annoncereservation');

    Route::get(
        'dashboard/signalannoncereservations',
        'SignalannoncereservationController@index'
    )->name('signalannoncereservations.index');

    Route::get(
        'dashboard/signalannoncelocations/{annoncereservation:slug}',
        'SignalannoncereservationController@show'
    )->name('signalannoncereservations.show');


    Route::get('dashboard/active_signalannoncereservations/{id}',
        'SignalannoncereservationController@activated')
        ->name('activated_signalannoncereservations');

    Route::get('dashboard/unactive_signalannoncereservations/{id}',
        'SignalannoncereservationController@unactivated')
        ->name('unactivated_signalannoncereservations');

});
