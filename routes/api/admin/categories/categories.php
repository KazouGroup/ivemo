<?php
Route::get('categories_faqs','CategoryFaqController@api')->name('api.categories_faqs');
Route::get('all_categoryannoncelocations','CategoryannoncelocationController@api')->name('api.category_annonce_locations');
Route::get('all_categoryannoncereservations','CategoryannoncereservationController@api')->name('api.category_annonce_reservations');
Route::get('all_categoryannonceventes','CategoryannonceventeController@api')->name('api.category_annonce_ventes');
Route::get('categoryprofiles','CategoryFaqController@apicategoryprofiles')->name('api.categoryprofiles');
Route::get('categoryusers','CategoryFaqController@apicategoryusers')->name('api.categoryusers');
Route::get('categoryobjets','CategoryFaqController@apicategoryobjets')->name('api.categoryobjets');
