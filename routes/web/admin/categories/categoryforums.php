<?php

Route::resource('dashboard/categoryforums','CategoryforumController');

Route::get(
    'dashboard/active_categoryforums/{id}/active',
    'CategoryforumController@activated'
)->name('activated_categoryforums');

Route::get(
    'dashboard/unactive_categoryforums/{id}/unactive',
    'CategoryforumController@unactivated'
)->name('unactivated_categoryforums');
