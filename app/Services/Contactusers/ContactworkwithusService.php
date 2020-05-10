<?php
namespace App\Services\Contactusers;



use App\Jobs\ContactuserJob;
use App\Jobs\ContactworkwithusJob;
use App\Model\user;
use App\Services\HelpersService;

class ContactworkwithusService
{

    public static function newEmailTocontactworkwithus($request)
    {

        $to = $request->get('email');

        $from = ['address' => config('app.email') , 'name' => config('app.name')];

        $emailToUser = (new ContactworkwithusJob($to,$from));

        dispatch($emailToUser);
    }
}
