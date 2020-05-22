<?php

Route::post(
    'employments/{categoryemployment}/{city}/{employment}/send_message_user',
    'ContactusersemploymentController@contactuseremployment'
)->name('employmentsendcontactmessageuser_site');

Route::post(
    'employments/contactusersemployments',
    'ContactusersemploymentController@contactuserslocaction'
)->name('contactusersemployments.site');

Route::group(['prefix' => 'api'], function () {

    Route::get(
        '{user}/personal_mails/annonces_locations',
        'ContactuserslocationController@apipersonalmessagesannonces_locations'
    )->name('api.personal_mails_annonces_locations.site');

    Route::get(
        '{user}/personal_mails/archvement_annonces_locations',
        'ContactuserslocationController@apipersonalmessagesarchvement_annonces_locations'
    )->name('api.personal_mails_archvement_annonces_locations.site');

    Route::get(
        '{user}/personal_mails/favorite_annonces_locations',
        'ContactuserslocationController@apipersonalmessagesfavorite_annonces_locations'
    )->name('api.personal_mails_favorite_annonces_locations.site');

    Route::get(
        '{user}/personal_mails/annonces_ventes_by_annonces',
        'ContactuserslocationController@apipersonalmessagesannonces_by_locations'
    )->name('api.personal_mails_annonces_by_locations.site');

    Route::get(
        '{user}/personal_mails/annonces_locations/{contactuserslocation:slug}',
        'ContactuserslocationController@apipersonalmessagesannonces_locations_show'
    )->name('api.personal_mails_annonces_locations_show.site');

});

Route::group(['prefix' => 'profile'], function () {

    Route::get(
        'personal_mails/personal_contactuserslocation_unfavorite/{id}',
        'ContactuserslocationController@personalmessagescontactsunfavorite'
    )->name('personal_contactuserslocation_mails_unfavorite.site');

    Route::get(
        'personal_mails/personal_contactuserslocation_favorite/{id}',
        'ContactuserslocationController@personalmessagescontactsfavorite'
    )->name('personal_contactuserslocation_mails_favorite.site');

    Route::get(
        'personal_mails/personal_contactuserslocation_unarchvement/{id}',
        'ContactuserslocationController@personalmessagescontactsunarchvement'
    )->name('personal_contactuserslocation_mails_unarchvement.site');

    Route::get(
        'personal_mails/personal_contactuserslocation_archvement/{id}',
        'ContactuserslocationController@personalmessagescontactsarchvement'
    )->name('personal_contactuserslocation_mails_archvement.site');

    Route::get(
        'personal_mails/personal_contactuserslocation_active/{id}',
        'ContactuserslocationController@personalmessagescontactsactive'
    )->name('personal_contactuserslocation_mails_active.site');

    Route::get(
        'personal_mails/personal_contactuserslocation_unactive/{id}',
        'ContactuserslocationController@personalmessagescontactsunactive'
    )->name('personal_contactuserslocation_mails_unactive.site');

    Route::get(
        '{user}/personal_mails/annonces_locations/',
        'ContactuserslocationController@personalmessagesannonces_locations'
    )->name('personal_mails_annonces_locations.site');

    Route::get(
        '{user}/personal_mails/archvement_annonces_locations/',
        'ContactuserslocationController@personalmessagesarchvement_annonces_locations'
    )->name('personal_mails_archvement_annonces_locations.site');

    Route::get(
        '{user}/personal_mails/favorite_annonces_locations/',
        'ContactuserslocationController@personalmessagesfavorite_annonces_locations'
    )->name('personal_mails_favorite_annonces_locations.site');

    Route::get(
        '{user}/personal_mails/annonces_ventes_by_annonces/',
        'ContactuserslocationController@personalmessagesannonces_by_locations'
    )->name('personal_mails_annonces_by_locations.site');

    Route::get(
        '{user}/personal_mails/annonces_locations/{contactuserslocation:slug}',
        'ContactuserslocationController@personalmessagesannonces_locations_show'
    )->name('personal_mails_annonces_locations_show.site');

    Route::delete(
        'personal_mails/annonces_locations_delete_mail/{id}',
        'ContactuserslocationController@personalmessagesdelete'
    )->name('personal_annonces_locations_mails_delete.site');

});
