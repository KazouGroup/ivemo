<?php

Route::post(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}/send_contact_message_user',
    'ContactusersventeController@sendcontactmessageuser'
)->name('annonceventesendcontactmessageuser_site');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        '{user}/personal_mails/annonces_ventes',
        'ContactusersventeController@apipersonalmailsannoncesventes'
    )->name('api.personal_mails_annonces_ventes.site');

    Route::get(
        '{user}/personal_mails/archvement_annonces_ventes',
        'ContactusersventeController@apipersonalmailsarchvementannoncesventes'
    )->name('api.personal_mails_archvement_annonces_ventes.site');

    Route::get(
        '{user}/personal_mails/favorite_annonces_ventes',
        'ContactusersventeController@apipersonalmailsfavoriteannoncesventes'
    )->name('api.personal_mails_favorite_annonces_ventes.site');

    Route::get(
        '{user}/personal_mails/annonces_ventes_by_mail/',
        'ContactusersventeController@apipersonalmailsannoncesventesbyannonce'
    )->name('api.personal_mails_annonces_ventes_by_annonces.site');

    Route::get(
        '{user}/personal_mails/annonces_ventes/{contactusersvente:slug}',
        'ContactusersventeController@apipersonalmessagesannonces_show'
    )->name('api.personal_mails_annonces_ventes_show.site');

});


Route::group(['prefix' => 'profile'], function () {

    Route::get(
        'personal_mails/personal_contactusersvente_unfavorite/{id}',
        'ContactusersventeController@personalmessagescontactsunfavorite'
    )->name('personal_contactusersvente_mails_unfavorite.site');

    Route::get(
        'personal_mails/personal_contactusersvente_favorite/{id}',
        'ContactusersventeController@personalmessagescontactsfavorite'
    )->name('personal_contactusersvente_mails_favorite.site');

    Route::get(
        'personal_mails/personal_contactusersvente_active/{id}',
        'ContactusersventeController@personalmessagescontactsactive'
    )->name('personal_contactusersvente_mails_active.site');

    Route::get(
        'personal_mails/personal_contactusersvente_unactive/{id}',
        'ContactusersventeController@personalmessagescontactsunactive'
    )->name('personal_contactusersvente_mails_unactive.site');

    Route::get(
        'personal_mails/personal_contactusersvente_unarchvement/{id}',
        'ContactusersventeController@personalmessagescontactsunarchvement'
    )->name('personal_contactusersvente_mails_unarchvement.site');

    Route::get(
        'personal_mails/personal_contactusersvente_archvement/{id}',
        'ContactusersventeController@personalmessagescontactsarchvement'
    )->name('personal_contactusersvente_mails_archvement.site');

    Route::get(
        '{user}/personal_mails/annonces_ventes/',
        'ContactusersventeController@personalmessagesannonces_ventes'
    )->name('personal_mails_annonces_ventes.site');

    Route::get(
        '{user}/personal_mails/favorite_annonces_ventes/',
        'ContactusersventeController@personalmessagesfavannonces_ventes'
    )->name('personal_mails_favorite_annonces_ventes.site');

    Route::get(
        '{user}/personal_mails/archvement_annonces_ventes/',
        'ContactusersventeController@personalmessagesarchvement_annonces_ventes'
    )->name('personal_mails_archvement_annonces_ventes.site');

    Route::get(
        '{user}/personal_mails/annonces_ventes_by_mail/',
        'ContactusersventeController@personalmessagesannonces_ventes_by_mail'
    )->name('personal_mails_annonces_ventes_by_annonces.site');

    Route::get(
        '{user}/personal_mails/annonces_ventes/{contactusersvente:slug}',
        'ContactusersventeController@personalmessagesannonces_ventes_show'
    )->name('personal_mails_annonces_ventes_show.site');

    Route::delete(
        'personal_mails/annonces_contactusersvente_delete_mail/{id}',
        'ContactusersventeController@personalmessagesdelete'
    )->name('personal_annonces_ventes_mails_delete.site');

});
