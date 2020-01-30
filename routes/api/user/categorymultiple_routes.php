<?php

Route::get(
    'conseillocations',
    'ConseillocationController@api'
)->name('api.conseillocations');
Route::get(
    'conseils_pour_vos_locations',
    'ConseillocationController@apiconseillocations'
)->name('api.conseillocations_site');
Route::get(
    'conseils_pour_vos_locations/{categoryannoncelocation}',
    'ConseillocationController@apiconseillocationbycategoryannoncelocation'
)->name('api.conseillocationbycategoryannoncelocations_site');
Route::get(
    'conseils_pour_vos_locations/{categoryannoncelocation}/{conseillocation}',
    'ConseillocationController@apiconseillocationbycategoryannoncelocationslug'
)->name('api.conseillocationbycategoryannoncelocationslug_site');


Route::get(
    'conseils_pour_vos_ventes_et_achat',
    'ConseilventeController@apiconseilventes'
)->name('api.conseilventes_site');
Route::get(
    'conseils_pour_vos_ventes_et_achat/{categoryannoncevente}',
    'ConseilventeController@apiconseillocationbycategoryannoncevente'
)->name('api.conseilventebycategoryannonceventes_site');
Route::get(
    'conseils_pour_vos_ventes_et_achat/{categoryannoncevente}/{conseilvente}',
    'ConseilventeController@apiconseillocationbycategoryannonceventeslug'
)->name('api.conseilventebycategoryannonceventeslug_site');

