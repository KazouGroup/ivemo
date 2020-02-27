<?php
Route::get('categories_faqs','CategoryFaqController@api');
Route::get('categoryprofiles','CategoryFaqController@apicategoryprofiles')->name('api.categoryprofiles');
