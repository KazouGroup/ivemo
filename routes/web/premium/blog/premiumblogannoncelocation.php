<?php

Route::get(
    'dashboard/premium/{user:slug}/blogs/annonce_locations/',
    'PremiumblogannoncelocationController@index'
)->name('blogannoncelocations_premium.dashboard');

Route::get(
    'dashboard/premium/{user:slug}/blogs/annonce_locations/create',
    'PremiumblogannoncelocationController@create'
)->name('blogannoncelocations_premium_create.dashboard');

Route::get(
    'dashboard/premium/{user:slug}/blogs/annonce_locations/{blogannoncelocation}/edit',
    'PremiumblogannoncelocationController@edit'
)->name('blogannoncelocations_premium_edit.dashboard');

Route::get(
    'dashboard/premium/{user:slug}/blogs/annonce_locations/{categoryannoncelocation:slug}',
    'PremiumblogannoncelocationController@category'
)->name('blogannoncelocations_premium_categoryannoncelocation.dashboard');

Route::get(
    'api/{user:slug}/premiumblogannoncelocation',
    'PremiumblogannoncelocationController@data'
)->name('api.blogannoncelocations_premium');

Route::get(
    'api/{user:slug}/premiumblogannoncelocation_count',
    'PremiumblogannoncelocationController@datacount'
)->name('api.blogannoncelocations_premium_count');

Route::get(
    'api/{user:slug}/premiumblogannoncelocationsactive_count',
    'PremiumblogannoncelocationController@dataactivecount'
)->name('api.blogannoncelocations_premiumactive_count');

Route::get(
    'api/{user:slug}/premiumblogannoncelocationsunactive_count',
    'PremiumblogannoncelocationController@dataunactivecount'
)->name('api.blogannoncelocations_premiumunactive_count');

Route::get(
    'api/{user:slug}/v/{categoryannoncelocation}/premiumblogannoncelocation_count',
    'PremiumblogannoncelocationController@datacategorycount'
)->name('api.blogannoncelocations_premium_category_count');

Route::get(
    'api/{user:slug}/v/{categoryannoncelocation}/premiumblogannoncelocationsactive_count',
    'PremiumblogannoncelocationController@datacategoryactivecount'
)->name('api.blogannoncelocations_premiumactive_category_count');

Route::get(
    'api/{user:slug}/v/{categoryannoncelocation}/premiumblogannoncelocationsunactive_count',
    'PremiumblogannoncelocationController@datacategoryunactivecount'
)->name('api.blogannoncelocations_premiumunactive_category_count');

