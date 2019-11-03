<?php
//Route Faqs
Route::get('faqs', 'FaqController@api');
Route::get('faqs/v/{slug}','FaqController@view');
