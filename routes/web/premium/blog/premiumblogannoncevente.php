<?php



Route::group(['prefix' => 'dashboard/premium'], function () {


    Route::get(
        '{user:slug}/blogs/annonce_ventes',
        'PremiumblogannonceventeController@index'
    )->name('blogannonceventes_premium.dashboard');

    Route::get(
        '{user:slug}/blogs/annonce_ventes/create',
        'PremiumblogannonceventeController@create'
    )->name('blogannonceventes_premium_create.dashboard');

    Route::get(
        '{user:slug}/blogs/annonce_ventes/{blogannoncevente}/edit',
        'PremiumblogannonceventeController@edit'
    )->name('blogannonceventes_premium_edit.dashboard');

    Route::get(
        '{user:slug}/blogs/annonce_ventes/{categoryannoncevente}',
        'PremiumblogannonceventeController@category'
    )->name('blogannonceventes_premium_categoryannoncevente.dashboard');

});



Route::group(['prefix' => 'api'], function () {


    Route::get(
        '{user:slug}/premiumblogannoncevente',
        'PremiumblogannonceventeController@data'
    )->name('api.blogannonceventes_premium');

    Route::get(
        '{user:slug}/premiumblogannoncevente_count',
        'PremiumblogannonceventeController@datacount'
    )->name('api.blogannonceventes_premium_count');

    Route::get(
        '{user:slug}/premiumblogannonceventesactive_count',
        'PremiumblogannonceventeController@dataactivecount'
    )->name('api.blogannonceventes_premiumactive_count');

    Route::get(
        '{user:slug}/premiumblogannonceventesunactive_count',
        'PremiumblogannonceventeController@dataunactivecount'
    )->name('api.blogannonceventes_premiumunactive_count');

    Route::get(
        '{user:slug}/v/{categoryannoncevente}/premiumblogannoncevente_count',
        'PremiumblogannonceventeController@datacategorycount'
    )->name('api.blogannonceventes_premium_category_count');

    Route::get(
        '{user:slug}/v/{categoryannoncevente}/premiumblogannonceventesactive_count',
        'PremiumblogannonceventeController@datacategoryactivecount'
    )->name('api.blogannonceventes_premiumactive_category_count');

    Route::get(
        '{user:slug}/v/{categoryannoncevente}/premiumblogannonceventesunactive_count',
        'PremiumblogannonceventeController@datacategoryunactivecount'
    )->name('api.blogannonceventes_premiumunactive_category_count');

});

