<?php


Route::resource('dashboard/faqs','FaqController');
Route::get('dashboard/faqs/v1/all','FaqController@v1');
Route::get('dashboard/faqs/c/{categoryfaq}','FaqController@v1');
Route::get('dashboard/faqs/v/{slug}','FaqController@vector')->name('faqs.vector');
Route::get('/dashboard/change_status_faqs/{id}', 'FaqController@status');
