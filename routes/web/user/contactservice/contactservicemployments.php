<?php



Route::post(
    'employments/{categoryemployment}/{city}/{employment}/contactservices',
    'ContactservicemploymentController@sendcontactservice'
)->name('employmentsendcontactservice_site');

Route::get(
    'profile/{user}/personal_mails/employments',
    'ContactservicemploymentController@contactservice'
)->name('contactservice_employments.site');

Route::get(
    'profile/{user}/personal_mails/employments/{employment:slugin}',
    'ContactservicemploymentController@contactservice_statistique'
)->name('contactservice_employmentsbyuserbystatistique_site');

Route::get(
    'profile/{user}/personal_mails/employments_export/{employment:slugin}',
    'ContactservicemploymentController@contactservice_export'
)->name('contactservice_employmentsbyuserbyexport_site');

Route::get(
    'profile/{user}/personal_mails/employments/{employment:slugin}/{contactservice:slug}',
    'ContactservicemploymentController@contactservice_statistiqueshow'
)->name('contactservice_employmentsbyuserbystatistiqueshow_site');


Route::group(['prefix' => 'api'], function () {

    Route::get(
        'profile/{user}/personal_mails/employments',
        'ContactservicemploymentController@apicontactservice'
    )->name('api.contactservice_employments_site');

    Route::get(
        'profile/{user}/personal_mails/employments/{employment:slugin}',
        'ContactservicemploymentController@apicontactservice_statistique'
    )->name('api.contactservice_employmentsbyuserbystatistique_site');

    Route::get(
        'profile/{user}/personal_mails/employments/{employment:slugin}/{contactservice:slug}',
        'ContactservicemploymentController@apicontactservice_statistiqueshow'
    )->name('api.contactservice_employmentsbyuserbystatistiqueshow_site');


    Route::get(
        '{user}/personal_mails/archvement_employments',
        'ContactservicemploymentController@apicontactservicearchvment'
    )->name('api.contactservice_archvement_employment.site');

    Route::get(
        '{user}/personal_mails/favorite_employments',
        'ContactservicemploymentController@apicontactservicefavorite'
    )->name('api.contacteservice_favorite_employments.site');

});
