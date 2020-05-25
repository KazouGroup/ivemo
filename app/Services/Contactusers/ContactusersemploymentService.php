<?php
namespace App\Services\Contactusers;



use App\Jobs\ContactuserlocationJob;
use App\Model\contactuseremployment;
use App\Model\user;
use App\Services\HelpersService;

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
            ->whereSlug($contactuseremployment->slug)->first();;

        return $contactuseremployment;
    }

}
