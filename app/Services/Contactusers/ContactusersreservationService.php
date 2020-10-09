<?php
namespace App\Services\Contactusers;



use App\Jobs\Adminaction\AdminactionAnnoncelocationJob;
use App\Jobs\Contacts\ContactuserlocationJob;
use App\Jobs\Contacts\ContactuserreservationJob;
use App\Models\contactuserslocation;
use App\Services\HelpersService;

class ContactusersreservationService
{


    public static function newEmailToannoncereservationpageShow($request,$annoncereservation)
    {
        $fromFullnameUser = $request->get('full_name');
        $fromPhoneUser = $request->get('phone');
        $fromEmailUser = $request->get('email');
        $fromMessageUser = $request->get('message');


        $emailToUser = (new ContactuserreservationJob($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$annoncereservation));

        dispatch($emailToUser);
    }

    public static function adminsendMessageToUser($annoncelocation)
    {
        $emailToUser = (new AdminactionAnnoncelocationJob($annoncelocation));

        dispatch($emailToUser);
    }
}
