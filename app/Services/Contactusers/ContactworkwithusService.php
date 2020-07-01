<?php
namespace App\Services\Contactusers;



use App\Jobs\Contacts\ContactworkwithusJob;
use App\Model\user;

class ContactworkwithusService
{

    public static function newEmailTocontactworkwithus($request,$workwithus)
    {

        $fromFullnameUser = $request->get('full_name');
        $fromPhoneUser = $request->get('phone');
        $fromEmailUser = $request->get('email');

        $toAdminUser = user::where('status_user',1)->get();

        $emailToUser = (new ContactworkwithusJob($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$toAdminUser,$workwithus));

        dispatch($emailToUser);
    }
}
