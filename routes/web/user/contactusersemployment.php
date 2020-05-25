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
        '{user}/personal_mails/employments',
        'ContactusersemploymentController@apipersonalmessagesemployments'
    )->name('api.personal_mails_employments.site');

    Route::get(
        '{user}/personal_mails/archvement_employments',
        'ContactusersemploymentController@apipersonalmessagesarchvement_employments'
    )->name('api.personal_mails_archvement_employments.site');

    Route::get(
        '{user}/personal_mails/favorite_employments',
        'ContactusersemploymentController@apipersonalmessagesfavorite_employments'
    )->name('api.personal_mails_favorite_employments.site');

    Route::get(
        '{user}/personal_mails/employments/{contactuseremployment}',
        'ContactusersemploymentController@apipersonalmessagesemployments_show'
    )->name('api.personal_mails_employments_show.site');

});

Route::group(['prefix' => 'profile'], function () {

    Route::get(
        'personal_mails/personal_contactusersemployment_unfavorite/{id}',
        'ContactusersemploymentController@personalmessagescontactsunfavorite'
    )->name('personal_contactusersemployments_mails_unfavorite.site');

    Route::get(
        'personal_mails/personal_contactusersemployment_favorite/{id}',
        'ContactusersemploymentController@personalmessagescontactsfavorite'
    )->name('personal_contactusersemployments_mails_favorite.site');

    Route::get(
        'personal_mails/personal_contactusersemployment_unarchvement/{id}',
        'ContactusersemploymentController@personalmessagescontactsunarchvement'
    )->name('personal_contactusersemployment_mails_unarchvement.site');

    Route::get(
        'personal_mails/personal_contactusersemployment_archvement/{id}',
        'ContactusersemploymentController@personalmessagescontactsarchvement'
    )->name('personal_contactusersemployment_mails_archvement.site');

    Route::get(
        'personal_mails/personal_contactusersemployment_active/{id}',
        'ContactusersemploymentController@personalmessagescontactsactive'
    )->name('personal_contactusersemployment_mails_active.site');

    Route::get(
        'personal_mails/personal_contactusersemployment_unactive/{id}',
        'ContactusersemploymentController@personalmessagescontactsunactive'
    )->name('personal_contactusersemployment_mails_unactive.site');

    Route::get(
        '{user}/personal_mails/employments/',
        'ContactusersemploymentController@personalmessagesemployments'
    )->name('personal_mails_employments.site');

    Route::get(
        '{user}/personal_mails/archvement_employments/',
        'ContactusersemploymentController@personalmessagesarchvement_employments'
    )->name('personal_mails_archvement_employments.site');

    Route::get(
        '{user}/personal_mails/favorite_employments/',
        'ContactusersemploymentController@personalmessagesfavorite_employments'
    )->name('personal_mails_favorite_employments.site');

    Route::get(
        '{user}/personal_mails/annonces_ventes_by_annonces/',
        'ContactusersemploymentController@personalmessages_by_employments'
    )->name('personal_mails_annonces_by_employments.site');

    Route::get(
        '{user}/personal_mails/employments/{contactuseremployment:slug}',
        'ContactusersemploymentController@personalmessagesemployments_show'
    )->name('personal_mails_employments_show.site');

    Route::delete(
        'personal_mails/employments_delete_mail/{id}',
        'ContactusersemploymentController@personalmessagesdelete'
    )->name('personal_employments_mails_delete.site');

});
