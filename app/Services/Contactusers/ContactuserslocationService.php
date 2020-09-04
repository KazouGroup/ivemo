<?php
namespace App\Services\Contactusers;



use App\Jobs\Adminaction\AdminactionAnnoncelocationJob;
use App\Jobs\Contacts\ContactuserlocationJob;
use App\Model\contactuserslocation;
use App\Services\HelpersService;

class ContactuserslocationService
{


    public static function newEmailToannoncelocationpageShow($request,$annoncelocation)
    {
        $fromFullnameUser = $request->get('full_name');
        $fromPhoneUser = $request->get('phone');
        $fromEmailUser = $request->get('email');
        $fromMessageUser = $request->get('message');


        $emailToUser = (new ContactuserlocationJob($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$annoncelocation));

        dispatch($emailToUser);
    }

    public static function adminsendMessageToUser($annoncelocation)
    {
        $emailToUser = (new AdminactionAnnoncelocationJob($annoncelocation));

        dispatch($emailToUser);
    }
}
