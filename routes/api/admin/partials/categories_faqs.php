<?php
Route::get('categories_faqs','CategoryFaqController@api');
Route::get('categoryprofiles','CategoryFaqController@apicategoryprofiles')->name('api.categoryprofiles');
Route::get('categoryusers','CategoryFaqController@apicategoryusers')->name('api.categoryusers');
Route::get('categoryobjets','CategoryFaqController@apicategoryobjets')->name('api.categoryobjets');
