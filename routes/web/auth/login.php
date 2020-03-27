<?php

Route::get('oauth/{driver}', 'SocialAuthController@redirectToProvider')->name('social.oauth');
Route::get('oauth/{driver}/callback', 'SocialAuthController@handleProviderCallback')->name('social.callback');
