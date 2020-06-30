<?php

Route::get('abouts', 'AboutController@api');
Route::get('abouts_members', 'AboutController@aboutmember')->name('api_active.aboutmember');