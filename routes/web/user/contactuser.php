<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        '{user}/personal_mails/contacts',
        'ContactusersController@apipersonalmessagescontacts'
    )->name('api.personal_mails_contacts.site');

    Route::get(
        '{user}/personal_mails/archvement_contacts',
        'ContactusersController@apipersonalmessagesarchvementcontacts'
    )->name('api.personal_mails_archvement_contacts.site');

    Route::get(
        '{user}/personal_mails/favorite_contacts',
        'ContactusersController@apipersonalmessagesfavoritecontacts'
    )->name('api.personal_mails_favorite_contacts.site');

    Route::get(
        '{user}/personal_mails/contacts/{contactuser}',
        'ContactusersController@apipersonalmessagescontactsshow'
    )->name('api.personal_mails_contacts_show.site');

    Route::get(
        'personal_mails/annonces_reservations',
        'ProfileController@apipersonalmessagesannonces_reservations'
    )->name('api.personal_mails_annonces_reservations.site');

});


Route::group(['middleware' => 'verified'], function(){

    Route::group(['middleware' => 'verified_status_user'],function (){



        Route::group(['prefix' => 'profile'], function () {

            Route::get(
                '{user}/personal_mails/contacts',
                'ContactusersController@personalmessagescontacts'
            )->name('personal_mails_contacts.site');

            Route::get(
                '{user}/personal_mails/favorite_contacts',
                'ContactusersController@personalmessagesfavoritecontacts'
            )->name('personal_mails_favorite_contacts.site');

            Route::get(
                '{user}/personal_mails/archvement_contacts',
                'ContactusersController@personalmessagesarchvementcontacts'
            )->name('personal_mails_archvement_contacts.site');

            Route::get(
                '{user}/personal_mails/contacts/{contactuser}',
                'ContactusersController@personalmessagescontactsshow'
            )->name('personal_mails_contacts_show.site');

            Route::post(
                'personal_mails/contactsuser_active_mail/{id}/active',
                'ContactusersController@personalmessagescontactsactive'
            )->name('personal_contactusers_mails_active.site');

            Route::post(
                'personal_mails/contactsuser_unactive_mail/{id}/unactive',
                'ContactusersController@personalmessagescontactsunactive'
            )->name('personal_contactusers_mails_unactive.site');

            Route::post(
                'personal_mails/contactsuser_archvement_mail/{id}/archvement',
                'ContactusersController@personalmessagescontactsarchvement'
            )->name('personal_contactusers_mails_archvement.site');

            Route::post(
                'personal_mails/contactsuser_unarchvement_mail/{id}/unarchvement',
                'ContactusersController@personalmessagescontactsunararchvement'
            )->name('personal_contactusers_mails_unarchvement.site');

            Route::post(
                'personal_mails/contactsuser_favorite_mail/{id}/favorite',
                'ContactusersController@personalmessagescontactsfavorite'
            )->name('personal_contactusers_mails_favorite.site');

            Route::post(
                'personal_mails/contactsuser_unfavorite_mail/{id}/unfavorite',
                'ContactusersController@personalmessagescontactsunfavorite'
            )->name('personal_contactusers_mails_unfavorite.site');

            Route::delete(
                'personal_mails/contactsuser_delete_mail/{id}/delete',
                'ContactusersController@personalmessagesdelete'
            )->name('personal_contactusers_mails_delete.site');

        });


    });

});
