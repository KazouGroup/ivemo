<?php

Route::get('about','PageController@about')->name('about.site');
Route::get('contact','PageController@contact')->name('contact_us.site');
Route::get('annonce','PageController@annonce')->name('annonce.site');
Route::get('annonce/show','PageController@annonceshow')->name('annonce_show.site');
Route::get('annonce/show/create','PageController@annonceshowcreate')->name('annonce_show_create.site');
Route::get('annonce/show/vendre/create','PageController@annonceshowvendrecreate')->name('annonce_show_vendre_create.site');