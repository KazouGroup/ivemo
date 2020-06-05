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
    'pro{user}/employments',
    'EmploymentController@apiemploymentsuserpublique'
)->name('api.employmentsuserpublique');
