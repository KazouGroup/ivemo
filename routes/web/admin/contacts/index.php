<?php

Route::group(['namespace' => 'Contacts'], function(){

    require(__DIR__ . DIRECTORY_SEPARATOR . 'contactsadmin.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'contactusersadverts.php');

    require(__DIR__ . DIRECTORY_SEPARATOR . 'contactusersfaqs.php');
});
