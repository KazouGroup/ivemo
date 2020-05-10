<?php
//Route Faqs
Route::get('faqs', 'FaqController@api')->name('faqs.api');
Route::get('sites_faqs', 'FaqController@apisitesfaqs')->name('api.sites_faqs');
Route::get('faqs/v1', 'FaqController@apibystatus');
Route::get('faqs/v/{slug}','FaqController@view');
Route::get('faqs/c/{categoryfaq}','FaqController@faqbycatagoryapi');
