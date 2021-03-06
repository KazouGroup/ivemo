<?php

Route::group(['prefix' => 'api'], function () {

    Route::get(
        'administrators',
        'UserController@apiadministrator'
    )->name('api.administrators');

    Route::get(
        'users',
        'UserController@api'
    )->name('api.users');

    Route::get(
        'users_count',
        'UserController@apicount'
    )->name('api.users_count');

    Route::get(
        'users/pro',
        'UserController@apiuserpro'
    )->name('api.users_pro');

    Route::get(
        'users/par',
        'UserController@apiuserpar'
    )->name('api.users_par');

    Route::get(
        'users/mod',
        'UserController@apiusermod'
    )->name('api.users_mod');

    Route::get(
        'users_procount',
        'UserController@apiprocount'
    )->name('api.users_procount');

    Route::get(
        'users_parcount',
        'UserController@apiparcount'
    )->name('api.users_parcount');

    Route::get(
        'users_modcount',
        'UserController@apimodcount'
    )->name('api.users_modcount');

    Route::get(
        'users/{user}',
        'UserController@show'
    )->name('api.users_show');



    Route::get(
        'users_last_month',
        'UserController@dataLastMonth'
    );

    Route::get(
        'users_current_month',
        'UserController@dataCurrentMonth'
    );

});

Route::group(['prefix' => 'dashboard'], function () {

    Route::get(
        'users/',
        'UserController@index'
    )->name('users.index');

    Route::get(
        'users/professionnels',
        'UserController@userspro'
    )->name('users.userspro');

    Route::get(
        'users/particuliers',
        'UserController@userspar'
    )->name('users.userspar');

    Route::get(
        'users/moderators',
        'UserController@usersmod'
    )->name('users.usersmod');

    Route::delete(
        'users/delete/{id}',
        'UserController@destroy'
    )->name('users.destroy');
});

Route::get('/account/user', 'UserController@user')->name('users.user');

Route::get('dashboard/profile/','UserController@admin_profile');
Route::put('/profile/users','UserController@updateUser');
Route::get('dashboard/profile/edit','UserController@admin_profile_edit')->name('admin_profile_edit');

//Route::resource('/dashboard/users', 'UserController');
Route::get('/account/users/{user}', 'UserController@show')->name('account_users.show');
