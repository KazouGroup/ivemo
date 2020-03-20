<?php

Route::get(
    'api/{user}/personal_mails/contacts',
    'ContactusersController@apipersonalmessagescontacts'
)->name('api.personal_mails_contacts.site');

Route::get(
    'api/{user}/personal_mails/contacts/{contactuser}',
    'ContactusersController@apipersonalmessagescontactsshow'
)->name('api.personal_mails_contacts_show.site');

Route::get(
    'api/personal_mails/annonces_reservations',
    'ProfileController@apipersonalmessagesannonces_reservations'
)->name('api.personal_mails_annonces_reservations.site');

Route::get(
    'profile/{user}/personal_mails/contacts',
    'ProfileController@personalmessagescontacts'
)->name('personal_mails_contacts.site');

Route::get(
    'profile/{user}/personal_mails/contacts/{contactuser}',
    'ContactusersController@personalmessagescontactsshow'
)->name('personal_mails_contacts_show.site');

Route::get(
    'profile/personal_mails/contactsuser_active_mail/{id}',
    'ContactusersController@personalmessagescontactsactive'
)->name('personal_contactusers_mails_active.site');

Route::delete(
    'profile/personal_mails/contactsuser_delete_mail/{id}',
    'ContactusersController@personalmessagesdelete'
)->name('personal_contactusers_mails_delete.site');

