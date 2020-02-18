<?php



Route::get(
    'api/personal_mails/contacts',
    'ProfileController@apipersonalmessagescontacts'
)->name('api.personal_mails_contacts.site');

Route::get(
    'api/personal_mails/contacts/{contactuser}',
    'ProfileController@apipersonalmessagescontactsshow'
)->name('api.personal_mails_contacts_show.site');

Route::get(
    'api/personal_mails/annonces_locations',
    'ProfileController@apipersonalmessagesannonces_locations'
)->name('api.personal_mails_annonces_locations.site');

Route::get(
    'api/personal_mails/annonces_locations/{contactuser}',
    'ProfileController@apipersonalmessagesannonces_locations_show'
)->name('api.personal_mails_annonces_locations_show.site');

Route::get(
    'api/personal_mails/annonces_reservations',
    'ProfileController@apipersonalmessagesannonces_reservations'
)->name('api.personal_mails_annonces_reservations.site');

Route::get(
    'profile/personal_mails/annonces_locations',
    'ProfileController@personalmessagesannonces_locations'
)->name('personal_mails_annonces_locations.site');

Route::get(
    'profile/personal_mails/annonces_locations/{contactuser}',
    'ProfileController@personalmessagesannonces_locations_show'
)->name('personal_mails_annonces_locations_show.site');

Route::get(
    'profile/personal_mails/contacts',
    'ProfileController@personalmessagescontacts'
)->name('personal_mails_contacts.site');

Route::get(
    'profile/personal_mails_active/{id}',
    'ProfileController@personalmessagescontactsactive'
)->name('personal_mails_contacts_active.site');

Route::get(
    'profile/personal_mails/contacts/{contactuser}',
    'ProfileController@personalmessagescontactsshow'
)->name('personal_mails_contacts_show.site');


