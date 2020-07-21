<?php

Route::get(
    'work_with_us',
    'WorkwithusController@work_with_us'
)->name('work_with_us.site');

Route::get(
    'work_with_us/{categoryworkwithus:slug}',
    'WorkwithusController@work_with_uscategoryworkwithus'
)->name('work_with_uscategoryworkwithus.site');

Route::get(
    'work_with_us/{categoryworkwithus:slug}/{workwithus}',
    'WorkwithusController@work_with_us_show'
)->name('work_with_us_show.site');

Route::post(
    'work_with_us/{categoryworkwithus:slug}/{workwithus}/save',
    'WorkwithusController@sendcontactservice'
)->name('work_with_us_store.site');
