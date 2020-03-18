<?php

Route::post(
    '@{user}/avisuser_public_save',
    'AvisuserController@avisuser_public_save'
)->name('avisuser_public_save.site');

Route::put(
    '@{user}/avisuser_public_update/{id}',
    'AvisuserController@avisuser_public_update'
)->name('avisuser_public_update.site');

Route::put(
    '@{user}/avisuser_public_response/{id}',
    'AvisuserController@avisuser_public_response'
)->name('avisuser_public_response.site');

Route::delete(
    'profile/personal_settings/delete_avisusers/{id}',
    'AvisuserController@destroy'
)->name('profile_avis_users_destroy.site');

Route::get(
    'profile/personal_settings/active_avisusers/{id}',
    'AvisuserController@activated'
)->name('profile_avis_users_active.site');

Route::get(
    'profile/personal_settings/unactive_avisusers/{id}',
    'AvisuserController@unactivated'
)->name('profile_avis_users_unactivated.site');
