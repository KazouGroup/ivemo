<?php


Route::resource('dashboard/faqs','FaqController');
Route::get('dashboard/faqs/v1/all','FaqController@v1');
Route::get('dashboard/faqs/c/{categoryfaq}','FaqController@v1');
Route::get('dashboard/faqs/v/{slug}','FaqController@vector')->name('faqs.vector');
Route::get('/dashboard/active_faqs/{id}', 'FaqController@active')->name('active_faqs');
Route::get('/dashboard/disable_faqs/{id}', 'FaqController@disable')->name('disable_faqs');
