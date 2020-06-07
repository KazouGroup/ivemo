<?php




Route::group(['namespace' => 'Signale'], function(){

    Route::get(
        'api/signalannonceventes',
        'SignalannonceventeController@api'
    )->name('api.signalannonceventes');

    Route::get(
        'api/signalannonceventes/{annoncevente:slug}',
        'SignalannonceventeController@annoncevente'
    )->name('api.signalannonceventes_annonceventes');

    Route::get(
        'dashboard/signalannonceventes',
        'SignalannonceventeController@index'
    )->name('signalannonceventes.index');

    Route::get(
        'dashboard/signalannonceventes/{annoncevente:slug}',
        'SignalannonceventeController@show'
    )->name('signalannonceventes.show');


    Route::get('dashboard/active_signalannonceventes/{id}',
        'SignalannonceventeController@activated')
        ->name('activated_signalannonceventes');

    Route::get('dashboard/unactive_signalannonceventes/{id}',
        'SignalannonceventeController@unactivated')
        ->name('unactivated_signalannonceventes');

});
