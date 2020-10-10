<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'messages/contacts',
        'ContactusersController@apipersonalmessagescontacts'
    )->name('api.personal_mails_contacts.site');

    Route::get(
        'messages/contacts/{contactuser}',
        'ContactusersController@apipersonalmessagescontactsshow'
    )->name('api.personal_mails_contacts_show.site');

});

Route::group(['middleware' => 'verified'], function () {

    Route::group(['middleware' => 'verified_status_user'], function () {

        Route::group(['prefix' => 'messages/contacts'], function () {

            Route::get(
                '/',
                'ContactusersController@personalmessagescontacts'
            )->name('personal_mails_contacts.site');

            Route::get(
                '{contactuser}',
                'ContactusersController@personalmessagescontactsshow'
            )->name('personal_mails_contacts_show.site');

            Route::post(
                '{id}/unactive',
                'ContactusersController@personalmessagescontactsunactive'
            )->name('personal_contactusers_mails_unactive.site');

            Route::post(
                '{id}/active',
                'ContactusersController@personalmessagescontactsactive'
            )->name('personal_contactusers_mails_active.site');

            Route::delete(
                '{id}/delete',
                'ContactusersController@personalmessagesdelete'
            )->name('personal_contactusers_mails_delete.site');

            Route::post(
                '{id}/archvement',
                'ContactusersController@personalmessagescontactsarchvement'
            )->name('personal_contactusers_mails_archvement.site');

            Route::post(
                '{id}/unarchvement',
                'ContactusersController@personalmessagescontactsunararchvement'
            )->name('personal_contactusers_mails_unarchvement.site');

            Route::post(
                '{id}/favorite',
                'ContactusersController@personalmessagescontactsfavorite'
            )->name('personal_contactusers_mails_favorite.site');

            Route::post(
                '{id}/unfavorite',
                'ContactusersController@personalmessagescontactsunfavorite'
            )->name('personal_contactusers_mails_unfavorite.site');

        });


    });

});
