<?php
namespace App\Services\Contactusers;



use App\Jobs\ContactuserJob;
use App\Model\user;
use App\Services\HelpersService;

class ContactuserService
{


    public static function apipersonalmessagescontacts($user)
    {
        $contactusers = HelpersService::helperscontactuserscount($user)
            ->with(['contactusers' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id])
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return $contactusers;

    }

    public static function apipersonalmessagesarchvementcontacts($user)
    {
        $contactusers = HelpersService::helperscontactuserscount($user)
            ->with(['contactusers' => function ($q) use ($user){
                $q->where(['status_archvement' => 1])->whereIn('user_id',[$user->id])
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return $contactusers;
    }

    public static function apipersonalmessagesfavoritecontacts($user)
    {
        $contactusers = HelpersService::helperscontactuserscount($user)
            ->with(['contactusers' => function ($q) use ($user){
                $q->where(['status_favorite' => 1])->whereIn('user_id',[$user->id])
                    ->latest()->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return $contactusers;
    }


    public static function newEmailToprofileUser($request,$user)
    {
        $fromFullnameUser = $request->get('full_name');
        $fromEmailUser = $request->get('email');
        $fromSubjectUser = $request->get('subject');
        $fromMessageUser = $request->get('message');


        $emailToUser = (new ContactuserJob($fromFullnameUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$user));

        dispatch($emailToUser);
    }

    public static function newEmailToannoncereservationpageShow($request,$annoncereservation)
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

    public static function newEmailToannonceventepageShow($request,$annoncevente)
    {
        $full_name = $request->get('full_name');
        $phone = $request->get('phone');
        $email = $request->get('email');
        $subject = $request->get('subject');
        $message = $request->get('message');
        $to = $annoncevente->user->email;


        $from = ['address' => $request->get('email') , 'name' => $request->get('full_name')];

        $emailToUser = (new ContactuserJob($full_name,$phone,$email,$subject,$message,$to,$from));


        dispatch($emailToUser);
    }
}
