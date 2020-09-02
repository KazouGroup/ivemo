<?php
namespace App\Services\Contactusers;



use App\Jobs\Contacts\ContactadminsActivitycityJob;
use App\Jobs\Contacts\ContactadminsJob;
use App\Jobs\Contacts\ContactuserJob;
use App\Jobs\Contacts\ContactusersadvertsJob;
use App\Jobs\Contacts\ContactadminsfaqsJob;
use App\Model\profileadmin;
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

    public static function newEmailcontactusersadvertsUser($request)
    {
        $fromFullnameUser = $request->get('full_name');
        $fromEmailUser = $request->get('email');
        $fromPhoneUser = $request->get('phone');
        $fromMessageUser = $request->get('message');


        $toAdminUser =  profileadmin::where(['status_user' => 1])
            ->with('user')->get();

        $emailToUser = (new ContactusersadvertsJob($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$toAdminUser));

        dispatch($emailToUser);
    }

    public static function newEmailcontactadminsfaqs($request)
    {
        $fromFullnameUser = $request->get('full_name');
        $fromEmailUser = $request->get('email');
        $fromMessageUser = $request->get('message');

        $toAdminUser = profileadmin::where(['status_user' => 1])
            ->with('user')->get();

        $emailToUser = (new ContactadminsfaqsJob($fromFullnameUser,$fromEmailUser,$fromMessageUser,$toAdminUser));

        dispatch($emailToUser);
    }

    public static function newEmailToativitycitypageShow($request,$activitycity)
    {
        $fromFullnameUser = $request->get('full_name');
        $fromPhoneUser = $request->get('phone');
        $fromEmailUser = $request->get('email');
        $fromMessageUser = $request->get('message');

        $toAdminUser = profileadmin::where(['status_user' => 1])
            ->with('user')->get();

        $emailToUser = (new ContactadminsActivitycityJob($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromMessageUser,$activitycity,$toAdminUser));

        dispatch($emailToUser);
    }

    public static function newEmailcontactadmins($request)
    {
        $fromFirstnameUser = $request->get('first_name');
        $fromLastnameUser = $request->get('last_name');
        $fromEmailUser = $request->get('email');
        $fromSubjectUser = $request->get('subject');
        $fromMessageUser = $request->get('message');


        $toAdminUser = profileadmin::where(['status_user' => 1])
            ->with('user')->get();

        $emailToUser = (new ContactadminsJob($fromFirstnameUser,$fromLastnameUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$toAdminUser));

        dispatch($emailToUser);
    }
}
