<?php

Route::post(
    'pro/{user}/avisuser_public_save',
    'AvisuserController@avisuser_public_save'
)->name('avisuser_public_save.site');

Route::put(
    'pro/{user}/avisuser_public_update/{id}',
    'AvisuserController@avisuser_public_update'
)->name('avisuser_public_update.site');

Route::put(
    'pro/{user}/avisuser_public_response/{id}',
    'AvisuserController@avisuser_public_response'
)->name('avisuser_public_response.site');

Route::delete(
    'profile/personal_settings/delete_avisusers/{id}',
    'AvisuserController@destroy'
)->name('profile_avis_users_destroy.site');

Route::delete(
    'profile/personal_settings/delete_response_avisusers/{id}',
    'AvisuserController@responsedestroy'
)->name('profile_avis_users_responsedestroy.site');

Route::get(
    'profile/personal_settings/active_avisusers/{id}',
    'AvisuserController@activated'
)->name('profile_avis_users_active.site');

Route::get(
    'profile/personal_settings/unactive_avisusers/{id}',
    'AvisuserController@unactivated'
)->name('profile_avis_users_unactivated.site');

Route::post(
    'pro/{user}/avisuserresponse_public_save/{id}',
    'AvisuserController@avisuserresponse_public_save'
)->name('avisuserresponse_public_save.site');

Route::put(
    'pro/{user}/avisuserresponse_public_update/{id}',
    'AvisuserController@avisuserresponse_public_update'
)->name('avisuserresponse_public_update.site');

Route::get(
    'profile/personal_settings/active_responseavisusers/{id}',
    'AvisuserController@responseactivated'
)->name('profile_avis_users_responseactive.site');

Route::get(
    'profile/personal_settings/unactive_responseavisusers/{id}',
    'AvisuserController@responseunactivated'
)->name('profile_avis_users_responseunactivated.site');
