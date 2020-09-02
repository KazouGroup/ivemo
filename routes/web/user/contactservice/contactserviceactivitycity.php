<?php



Route::post(
    'city/{city:slug}/a/{activitycity:slug}/contactservices',
    'ContactserviceactivitycityController@sendcontactservice'
)->name('activitycitysendcontactservice_site');




Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){







        Route::group(['prefix' => 'api'], function () {




        });


    });

});
