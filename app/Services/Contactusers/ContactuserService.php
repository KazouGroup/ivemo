<?php
namespace App\Services\Contactusers;



use App\Jobs\Contacts\ContactuserJob;
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
}
