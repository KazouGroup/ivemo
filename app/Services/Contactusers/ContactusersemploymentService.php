<?php
namespace App\Services\Contactusers;



use App\Jobs\Contacts\ContactuseremploymentJob;
use App\Model\contactuseremployment;


class ContactusersemploymentService
{

    public static function newEmailToemploymentpageShow($request,$employment)
    {
        $fromFullnameUser = $request->get('full_name');
        $fromPhoneUser = $request->get('phone');
        $fromEmailUser = $request->get('email');
        $fromMessageUser = $request->get('message');


        $emailToUser = (new ContactuseremploymentJob($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$employment));

        dispatch($emailToUser);
    }

}
