<?php

Route::post(
    'annonces_ventes/{annoncetype}/{categoryannoncevente}/{city}/{annoncevente}/send_contact_message_user',
    'ContactusersventeController@sendcontactmessageuser'
)->name('annonceventesendcontactmessageuser_site');

Route::get(
    'api/{user}/personal_mails/annonces_ventes',
    'ContactusersventeController@apipersonalmailsannoncesventes'
)->name('api.personal_mails_annonces_ventes.site');

Route::get(
    'api/{user}/personal_mails/annonces_ventes/{contactusersvente:slug}',
    'ContactusersventeController@apipersonalmessagesannonces_show'
)->name('api.personal_mails_annonces_ventes_show.site');

Route::get(
    'profile/personal_mails/personal_contactusersvente_active/{id}',
    'ContactusersventeController@personalmessagescontactsactive'
)->name('personal_contactusersvente_mails_active.site');

Route::get(
    'profile/{user}/personal_mails/annonces_ventes/',
    'ContactusersventeController@personalmessagesannonces_ventes'
)->name('personal_mails_annonces_ventes.site');

Route::get(
    'profile/{user}/personal_mails/annonces_ventes/{contactusersvente:slug}',
    'ContactusersventeController@personalmessagesannonces_ventes_show'
)->name('personal_mails_annonces_ventes_show.site');

Route::delete(
    'profile/personal_mails/annonces_ventes_delete_mail/{id}',
    'ContactusersventeController@personalmessagesdelete'
)->name('personal_annonces_ventes_mails_delete.site');
