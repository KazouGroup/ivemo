<?php
namespace App\Services\Contactusers;



use App\Jobs\Contacts\ContactuseremploymentJob;
use App\Model\contactuseremployment;


class ContactusersemploymentService
{


    public static function apipersonalmessagesemployments_show($user,$contactuseremployment)
    {
        $contactuseremployment = contactuseremployment::with('user','employment')
            ->with([
            'employment.categoryemployment' => function ($q){
                $q->select('id','name','slug','user_id');},
            'employment.city' => function ($q){
                $q->select('id','name','slug','user_id');},
            'employment.user' => function ($q){
                $q->distinct()->get()->toArray();},
        ])->whereIn('user_id',[$user->id])
            ->whereSlug($contactuseremployment->slug)
            ->first();;

        return $contactuseremployment;
    }

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
