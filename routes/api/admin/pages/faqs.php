<?php
//Route Faqs
Route::get('faqs', 'FaqController@api');
Route::get('faqs/v1', 'FaqController@apibystatus');
Route::get('faqs/v/{slug}','FaqController@view');
Route::get('faqs/c/{categoryfaq}','FaqController@faqbycatagoryapi');
