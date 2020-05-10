<?php

Route::resource('dashboard/policyprivacies','PolicyprivacyController');
Route::get('dashboard/active_policyprivacies/{id}', 'PolicyprivacyController@activated')->name('activated_policyprivacies');
Route::get('dashboard/unactive_policyprivacies/{id}', 'PolicyprivacyController@unactivated')->name('unactivated_policyprivacies');
