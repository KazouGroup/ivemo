<?php
namespace App\Services;



use App\Jobs\ContactuserJob;

class ContactuserService
{
    public static function newEmail($request,$annoncereservation)
    {
        $full_name = $request->get('full_name');
        $phone = $request->get('phone');
        $email = $request->get('email');
        $subject = $request->get('subject');
        $message = $request->get('message');
        $to = $annoncereservation->user->email;


        $from = ['address' => $request->get('email') , 'name' => $request->get('full_name')];

        $emailToUser = (new ContactuserJob($full_name,$phone,$email,$subject,$message,$to,$from));


        dispatch($emailToUser);
    }
}
