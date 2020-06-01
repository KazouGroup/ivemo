<?php

Route::get(
    'categoryemployments',
    'EmploymentController@apicategoryemploymentcount'
)->name('api.categoryemployment_site');

Route::get(
    'categoryemploymentsbycity/{city}',
    'EmploymentController@apicategoryemploymentcitycount'
)->name('api.categoryemploymentcitycount_site');

Route::get(
    'cityemployments',
    'EmploymentController@apicityemployment'
)->name('api.cityemployment_site');

Route::get(
    'categoryemployments/{categoryemployment}',
    'EmploymentController@apiemploymentbycategorybycount'
)->name('api.employmentbycategorybycount_site');

Route::get(
    'employments',
    'EmploymentController@apiemployments'
)->name('api.employments_site');

Route::get(
    'employments/{categoryemployment}',
    'EmploymentController@apiemploymentsbycategory'
)->name('api.employmentscategory_site');

Route::get(
    'employment/{city}',
    'EmploymentController@apiemploymentbycity'
)->name('api.employmentcity_site');

Route::get(
    'employments/{categoryemployment}/{city}',
    'EmploymentController@apiemploymentsbycategorybycity'
)->name('api.employmentscategorybycity_site');

Route::get(
    'employments_interesses/{categoryemployment}',
    'EmploymentController@apiemploymentsinteresse'
)->name('api.employmentsinteresse_site');

Route::get(
    'employments/{categoryemployment}/{city}/{employment}',
    'EmploymentController@apiemploymentsbycategoryslug'
)->name('api.employmentsbycategorybycityslug_site');

Route::get(
    'pro{user}/employments',
    'EmploymentController@apiemploymentsuserpublique'
)->name('api.employmentsuserpublique');
