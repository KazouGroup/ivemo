<?php
Route::resource('dashboard/categories_faqs','CategoryFaqController');
Route::get('dashboard/change_status_categories_faqs/{id}', 'CategoryFaqController@status')->name('active_categories_faqs');
