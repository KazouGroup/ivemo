<?php


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'employment/{employment}',
        'EmploymentController@show'
    )->name('api.employmentlugin_site');

    Route::get(
        'categoryemployments_by_user',
        'EmploymentController@apicategoryemployments_by_user'
    )->name('api.categoryemployments_by_user_site');

    Route::get(
        'profile/{user}/personal_settings/employments/',
        'EmploymentController@apiblogannoncesventesbyuser'
    )->name('api.blogannoncesventesbyuser_site');

    Route::get(
        'profile/{user}/personal_settings/employments/{categoryannoncevente}',
        'EmploymentController@apiblogannoncesventescategoryannonceventebyuser'
    )->name('api.blogannoncesventescategoryannonceventebyuser_site');

});

Route::get(
    'employments',
    'EmploymentController@employment'
)->name('employments_site');

Route::get(
    'employment/ab/new',
    'EmploymentController@create'
)->name('employmentabnew_site');


Route::post(
    'employment/save',
    'EmploymentController@store'
)->name('employmentstore_site');

Route::get(
    'employments/{categoryemployment}',
    'EmploymentController@employmentbycategory'
)->name('employmentcategory_site');

Route::get(
    'employments/{categoryemployment}/{city}',
    'EmploymentController@employmentbycategorybycity'
)->name('employmentbycategorybycity_site');

Route::get(
    'employments/{categoryemployment}/{city}/{employment}',
    'EmploymentController@employmentslug'
)->name('employmentslug_site');

Route::get(
    'employment/{employment}/edit',
    'EmploymentController@edit'
)->name('employmentsedit_site');

Route::put(
    'employment/{employment}',
    'EmploymentController@update'
)->name('employmentsupdate_site');

Route::get(
    'employments_activated/{employment}',
    'EmploymentController@activated'
)->name('employmentsactivated_site');

Route::get(
    'employments_unactivated/{employment}',
    'EmploymentController@unactivated'
)->name('employmentsunactivated_site');

Route::delete(
    'employments_delete/{id}',
    'EmploymentController@destroy'
)->name('employmentsdelete_site');

