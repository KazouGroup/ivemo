<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'employments',
        'EmploymentController@apiemployments'
    )->name('api.employments_site');

    Route::get(
        'employments/{categoryemployment}',
        'EmploymentController@apiemploymentsbycategory'
    )->name('api.employmentscategory_site');

    Route::get(
        'employmentscount/{categoryemployment}',
        'EmploymentController@apiemploymentsbycategorycount'
    )->name('api.employmentscategorycount_site');

    Route::post(
        'employments/{categoryemployment}/{city}',
        'EmploymentController@apiemploymentsbycategorybycity'
    )->name('api.employmentscategorybycity_site');

    Route::get(
        'employmentscount/{categoryemployment}/{city}',
        'EmploymentController@apiemploymentsbycategorybycitycount'
    )->name('api.employmentscategorybycitycount_site');

    Route::get(
        'employmentcount/{city}',
        'EmploymentController@apiemploymentbycitycount'
    )->name('api.employmentcitycount_site');

    Route::post(
        'employment/{city}',
        'EmploymentController@apiemploymentbycity'
    )->name('api.employmentcity_site');

    Route::get(
        'employments_interesses/{user}',
        'EmploymentController@apiemploymentsinteresse'
    )->name('api.employmentsinteresse_site');

    Route::get(
        'employment/ab/{employment}',
        'EmploymentController@show'
    )->name('api.employmentlugin_site');

    Route::get(
        'profile/{user}/personal_settings/employments',
        'EmploymentController@apiemploymentsbyuser'
    )->name('api.employmentsbyuser_site');

    Route::get(
        'profile/{user}/personal_settings/employments/{categoryemployment}',
        'EmploymentController@apiemploymentsbyusercategoryemployment'
    )->name('api.employmentsbyuserbycategoryemployment_site');

    Route::get(
        'employments/{categoryemployment}/{city}/{user:slug}/{employment}',
        'EmploymentController@apiemploymentsbycategoryslug'
    )->name('api.employmentsbycategorybycityslug_site');

    Route::get(
        'categoryemployments_by_user',
        'EmploymentController@apicategoryemployments_by_user'
    )->name('api.categoryemployments_by_user_site');


});

Route::get(
    'employments',
    'EmploymentController@employment'
)->name('employments_site');

Route::get(
    'employments/{categoryemployment}',
    'EmploymentController@employmentbycategory'
)->name('employmentcategory_site');

Route::get(
    'employments/{categoryemployment}/{city}',
    'EmploymentController@employmentbycategorybycity'
)->name('employmentbycategorybycity_site');

Route::get(
    'employments/{categoryemployment}/{city}/{user:slug}/{employment}',
    'EmploymentController@employmentslug'
)->name('employmentslug_site');

Route::get(
    'employment/{city}',
    'EmploymentController@employmentbycity'
)->name('employmentcity_site');

Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){


        Route::get(
            'profile/{user}/personal_settings/employments',
            'EmploymentController@employmentsbyuser'
        )->name('employmentsbyuser_site');

        Route::get(
            'profile/{user}/personal_settings/employments/{categoryemployment}',
            'EmploymentController@employmentsbyusercategoryemployment'
        )->name('employmentsbyuserbycategoryemployment_site');

        Route::get(
            'employment/ab/new',
            'EmploymentController@create'
        )->name('employmentabnew_site');

        Route::post(
            'employment/save',
            'EmploymentController@store'
        )->name('employmentstore_site');

        Route::get(
            'employment/ab/{employment}/edit',
            'EmploymentController@edit'
        )->name('employmentsedit_site');

        Route::put(
            'employment/{employment}',
            'EmploymentController@update'
        )->name('employmentsupdate_site');

        Route::get(
            'employments_active_comments/{employment:id}/active',
            'EmploymentController@activecomments'
        )->name('employments_active_comments_site');

        Route::get(
            'employments_active_comments/{employment:id}/desactive',
            'EmploymentController@desactivecomments'
        )->name('employments_desactive_comments_site');

        Route::get(
            'employments_activated/{employment:id}/activated',
            'EmploymentController@activated'
        )->name('employmentsactivated_site');

        Route::get(
            'employments_unactivated/{employment:id}/unactivated',
            'EmploymentController@unactivated'
        )->name('employmentsunactivated_site');

        Route::delete(
            'employments_delete/{id}/destroy',
            'EmploymentController@destroy'
        )->name('employmentsdelete_site');

    });

});

