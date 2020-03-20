<?php

Route::post(
    'annonces_locations/{annoncetype}/{categoryannoncelocation}/{city}/{annoncelocation}/send_contact_message_user',
    'ContactuserslocationController@sendcontactmessageuser'
)->name('annoncelocationsendcontactmessageuser_site');

Route::get(
    'api/{user}/personal_mails/annonces_locations',
    'ContactuserslocationController@apipersonalmessagesannonces_locations'
)->name('api.personal_mails_annonces_locations.site');

Route::get(
    'api/{user}/personal_mails/annonces_ventes_by_annonces',
    'ContactuserslocationController@apipersonalmessagesannonces_by_locations'
)->name('api.personal_mails_annonces_by_locations.site');

Route::get(
    'api/{user}/personal_mails/annonces_locations/{contactuserslocation:slug}',
    'ContactuserslocationController@apipersonalmessagesannonces_locations_show'
)->name('api.personal_mails_annonces_locations_show.site');

Route::get(
    'profile/personal_mails/personal_contactuserslocation_active/{id}',
    'ContactuserslocationController@personalmessagescontactsactive'
)->name('personal_contactuserslocation_mails_active.site');

Route::get(
    'profile/{user}/personal_mails/annonces_locations/',
    'ContactuserslocationController@personalmessagesannonces_locations'
)->name('personal_mails_annonces_locations.site');

Route::get(
    'profile/{user}/personal_mails/annonces_ventes_by_annonces/',
    'ContactuserslocationController@personalmessagesannonces_by_locations'
)->name('personal_mails_annonces_by_locations.site');

Route::get(
    'profile/{user}/personal_mails/annonces_locations/{contactuserslocation:slug}',
    'ContactuserslocationController@personalmessagesannonces_locations_show'
)->name('personal_mails_annonces_locations_show.site');

Route::delete(
    'profile/personal_mails/annonces_locations_delete_mail/{id}',
    'ContactuserslocationController@personalmessagesdelete'
)->name('personal_annonces_locations_mails_delete.site');
