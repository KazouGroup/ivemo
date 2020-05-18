<?php

Route::resource('dashboard/workwithuses','WorkwithusController');

Route::get(
    'dashboard/workwithuses/c/{categoryworkwithus:slug}',
    'WorkwithusController@workwithusescategoryworkwithus'
)->name('work_with_uscategoryworkwithus.dashboard');

Route::get(
    'dashboard/workwithuses/c/{categoryworkwithus:slug}/{workwithus:slug}',
    'WorkwithusController@workwithusesworkwithusshow'
)->name('work_with_usworkwithus.show');

Route::get(
    'dashboard/active_workwithuses/{id}',
    'WorkwithusController@activated'
)->name('activated_workwithuses');

Route::get(
    'dashboard/unactive_workwithuses/{id}',
    'WorkwithusController@unactivated'
)->name('unactivated_workwithuses');

Route::get(
    'dashboard/active_contactworkwithus/{id}',
    'WorkwithusController@activatedcontactworkwithus'
)->name('activated_contactworkwithus');

Route::get(
    'dashboard/unactive_contactworkwithus/{id}',
    'WorkwithusController@unactivatedcontactworkwithus'
)->name('unactivated_contactworkwithus');
