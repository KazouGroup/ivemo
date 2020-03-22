<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        '{user}/personal_mails/contacts',
        'ContactusersController@apipersonalmessagescontacts'
    )->name('api.personal_mails_contacts.site');

    Route::get(
        '{user}/personal_mails/contacts/{contactuser}',
        'ContactusersController@apipersonalmessagescontactsshow'
    )->name('api.personal_mails_contacts_show.site');

    Route::get(
        'personal_mails/annonces_reservations',
        'ProfileController@apipersonalmessagesannonces_reservations'
    )->name('api.personal_mails_annonces_reservations.site');

});

Route::group(['prefix' => 'profile'], function () {

    Route::get(
        '{user}/personal_mails/contacts',
        'ProfileController@personalmessagescontacts'
    )->name('personal_mails_contacts.site');

    Route::get(
        '{user}/personal_mails/contacts/{contactuser}',
        'ContactusersController@personalmessagescontactsshow'
    )->name('personal_mails_contacts_show.site');

    Route::get(
        'personal_mails/contactsuser_active_mail/{id}',
        'ContactusersController@personalmessagescontactsactive'
    )->name('personal_contactusers_mails_active.site');

    Route::delete(
        'personal_mails/contactsuser_delete_mail/{id}',
        'ContactusersController@personalmessagesdelete'
    )->name('personal_contactusers_mails_delete.site');

});
