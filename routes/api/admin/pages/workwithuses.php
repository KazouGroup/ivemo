<?php

Route::get(
    'workwithuses',
    'WorkwithusController@api'
)->name('api.workwithuses');

Route::get(
    'work_with_us',
    'WorkwithusController@apiwork_with_us'
)->name('api.work_with_us_site');

Route::get(
    'work_with_us/{categoryworkwithus:slug}',
    'WorkwithusController@apiwork_with_uscategoryworkwithus'
)->name('api.work_with_uscategoryworkwithus_site');

Route::get(
    'work_with_us/{categoryworkwithus:slug}/{workwithus}',
    'WorkwithusController@apiwork_with_us_show'
)->name('api.work_with_us_show_site');
