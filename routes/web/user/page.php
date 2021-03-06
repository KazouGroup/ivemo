<?php

Route::get('about','PageController@about')->name('about.site');
Route::get('faqs','PageController@faqs')->name('faqs.site');
Route::post('contactusersfaq_site','PageController@contactusersfaqs')->name('contactusersfaq_site');

Route::get('city/{city}','PageController@city')->name('city.site');
Route::get('api/city/{city}','PageController@apicity')->name('api.city_site');
Route::get('api/periodeannonces','PageController@apiperiodeannonce')->name('api.periodeannonces');

//Route contact
Route::get('contact','PageController@contact')->name('contact_us.site');
Route::post('contact/send','PageController@contactadmins')->name('contactadmins_save.store');


Route::get('advertisement','PageController@fairelapublicite')->name('faire_la_publicite.site');
Route::post('contactusersadverts_save','PageController@contactusersadverts')->name('contactusersadverts_save.store');
Route::get('policy_privacy','PageController@policyprivacy')->name('policyprivacy.site');
Route::get('condition_utilisation','PageController@conditionutilisation')->name('conditionutilisation.site');
Route::get('licence_site','PageController@licencesite')->name('licencesite.site');
Route::get('annonce','PageController@annonce')->name('annonce.site');
Route::get('annonce/show','PageController@annonceshow')->name('annonce_show.site');
Route::get('annonce/show/create','PageController@annonceshowcreate')->name('annonce_show_create.site');
Route::get('annonce/show/vendre/create','PageController@annonceshowvendrecreate')->name('annonce_show_vendre_create.site');

