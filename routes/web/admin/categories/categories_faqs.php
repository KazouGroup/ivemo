<?php
Route::resource('dashboard/categories_faqs','CategoryFaqController');
Route::get('dashboard/active_categories_faqs/{id}', 'CategoryFaqController@activated')->name('activated_categories_faqs');
Route::get('dashboard/unactive_categories_faqs/{id}', 'CategoryFaqController@unactivated')->name('unactivated_categories_faqs');
