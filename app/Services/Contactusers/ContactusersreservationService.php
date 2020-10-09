<?php
namespace App\Services\Contactusers;



use App\Jobs\Adminaction\AdminactionAnnoncelocationJob;
use App\Jobs\Contacts\ContactuserlocationJob;
use App\Jobs\Contacts\ContactuserreservationJob;
use App\Models\contactuserslocation;
use App\Services\HelpersService;
use Illuminate\Support\Facades\Auth;

class ContactusersreservationService
{


    public static function newEmailToannoncereservationpageShow($request,$annoncereservation)
    {
        $fromPhoneUser = $request->get('phone');
        $fromMessageUser = $request->get('message');
        $userFrom = Auth::user();


        $emailToUser = (new ContactuserreservationJob($userFrom,$fromPhoneUser,$fromMessageUser,$annoncereservation));

        dispatch($emailToUser);
    }

    public static function adminsendMessageToUser($annoncelocation)
    {
        $emailToUser = (new AdminactionAnnoncelocationJob($annoncelocation));

        dispatch($emailToUser);
    }
}
