<?php




Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::post(
            'contactservices/{contactservice:id}/statusarchvement',
            'ContactserviceController@statusarchvement'
        )->name('contactservice_statusarchvement');

        Route::post(
            'contactservices/{contactservice:id}/statusred',
            'ContactserviceController@statuscontacts'
        )->name('contactservice_statusred');

        Route::post(
            'contactservices/{contactservice:id}/dashstatusred',
            'ContactserviceController@statuscontactsisadmin'
        )->name('contactservice_dashstatusred');

        Route::post(
            'contactservices/{contactservice:id}/favorite',
            'ContactserviceController@favorite'
        )->name('contactservice_favorite');

        Route::post(
            'contactservices/{contactservice:id}/unfavorite',
            'ContactserviceController@unfavorite'
        )->name('contactservice_unfavorite');

        Route::get(
            'contactservices/{contactservice:id}/red',
            'ContactserviceController@contactred'
        )->name('contactservice_red');

        Route::delete(
            'contactservices/{contactservice:id}/delete',
            'ContactserviceController@destroy'
        )->name('contactservicedelete');


    });

});
