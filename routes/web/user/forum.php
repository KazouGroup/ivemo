<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'categoryforums',
        'ForumController@apicategoryforumcount'
    )->name('api.categoryforum_site');

    Route::get(
        'categoryforums_byuser',
        'ForumController@apicategoryforumbyusercount'
    )->name('api.categoryforum_byuser_site');

    Route::get(
        'forums',
        'ForumController@apiforums'
    )->name('api.forums_site');

    Route::get(
        'forums/{categoryforum:slug}',
        'ForumController@apiforumscategory'
    )->name('api.forumscategory_site');

    Route::get(
        'forums/ab/{forum:slugin}',
        'ForumController@apiforumslugin'
    )->name('api.forumslugin_site');

    Route::get(
        'forums_count/{categoryforum:slug}',
        'ForumController@apiforumscategorycount'
    )->name('api.forumscategorycount_site');

    Route::get(
        'forums/{categoryforum:slug}/{user:slug}/{forum:slugin}',
        'ForumController@apiforumscategoryslugin'
    )->name('api.forumscategoryslugin_site');

    Route::get(
        'forums_interesse/{categoryforum:slug}',
        'ForumController@apiforumscategoryinteresse'
    )->name('api.forumscategoryinteresse_site');

    Route::get(
        'statistics/forums',
        'ForumController@apiforumsbyuser'
    )->name('api.forumbyuser_site');

});


Route::get(
    'forums',
    'ForumController@index'
)->name('forums_site');

Route::get(
    'forums/ab/new',
    'ForumController@create'
)->name('forums_site.create');

Route::post(
    'forums/ab/save',
    'ForumController@store'
)->name('forums_site.store');

Route::get(
    'forums/ab/{forum:slugin}/edit',
    'ForumController@edit'
)->name('forums_site.edit');

Route::put(
    'forums/ab/{forum:slugin}',
    'ForumController@update'
)->name('forums_site.update');

Route::get(
    'forums/{categoryforum:slug}',
    'ForumController@forumscategory'
)->name('forumscategory_site');

Route::get(
    'forums/{categoryforum:slug}/{user:slug}/{forum:slugin}',
    'ForumController@forumscategoryslugin'
)->name('forumscategoryslugin_site');

Route::get(
    'forums_status_comments/{id}',
    'ForumController@statuscomments'
)->name('forums_status_comments_site');

Route::delete(
    'forums_delete/{forum:id}/delete',
    'ForumController@destroy'
)->name('forumsdelete_site');

Route::get(
    'statistics/forums',
    'ForumController@forumsbyuser'
)->name('forumbyuser_site');

