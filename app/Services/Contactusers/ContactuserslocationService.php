<?php
namespace App\Services\Contactusers;



use App\Jobs\Adminaction\AdminactionAnnoncelocationJob;
use App\Jobs\Contacts\ContactuserlocationJob;
use App\Model\contactuserslocation;
use App\Services\HelpersService;

class ContactuserslocationService
{

    public static function apipersonalmessagesannonces_locations($user)
    {
        $contactusers = HelpersService::helperscontactuserscount($user)
            ->with(['contactuserslocations' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id])
                    ->with('annoncelocation','user')
                    ->orderBy('created_at','DESC')
                    ->with([
                        'annoncelocation.categoryannoncelocation' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncelocation.city' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncelocation.annoncetype' => function ($q){
                            $q->select('id','name','slug');},
                        'annoncelocation.user' => function ($q){
                            $q->distinct()->get();}
                    ])->whereHas('annoncelocation', function ($q) use ($user) {
                        $q->whereIn('user_id',[$user->id])
                          ->where('status_admin',1);
                    })->latest()->distinct()->get()->toArray();},
            ])->first();


        return $contactusers;
    }

    public static function apipersonalmessagesarchvement_annonces_locations($user)
    {
        $contactusers = HelpersService::helperscontactuserscount($user)
            ->with(['contactuserslocations' => function ($q) use ($user){
                $q->where('status_archvement',1)
                    ->whereIn('user_id',[$user->id])
                    ->with('annoncelocation','user')
                    ->orderBy('created_at','DESC')
                    ->with([
                        'annoncelocation.categoryannoncelocation' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncelocation.city' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncelocation.annoncetype' => function ($q){
                            $q->select('id','name','slug');},
                        'annoncelocation.user' => function ($q){
                            $q->distinct()->get();}
                    ])->whereHas('annoncelocation', function ($q) use ($user) {
                        $q->whereIn('user_id',[$user->id])
                          ->where('status_admin',1);
                    })->latest()->distinct()->get()->toArray();},
            ])->first();


        return $contactusers;
    }

    public static function apipersonalmessagesfavorite_annonces_locations($user)
    {
        $contactusers = HelpersService::helperscontactuserscount($user)
            ->with(['contactuserslocations' => function ($q) use ($user){
                $q->where('status_favorite',1)
                    ->whereIn('user_id',[$user->id])
                    ->with('annoncelocation','user')
                    ->orderBy('created_at','DESC')
                    ->with([
                        'annoncelocation.categoryannoncelocation' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncelocation.city' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncelocation.annoncetype' => function ($q){
                            $q->select('id','name','slug');},
                        'annoncelocation.user' => function ($q){
                            $q->distinct()->get();}
                    ])->whereHas('annoncelocation', function ($q) use ($user) {
                        $q->whereIn('user_id',[$user->id])
                          ->where('status_admin',1);
                    })->latest()->distinct()->get()->toArray();},
            ])->first();


        return $contactusers;
    }


    public static function apipersonalmessagesannonces_locations_show($user,$contactuserslocation)
    {
        $contactuserslocation = contactuserslocation::with('user','annoncelocation')
            ->with([
            'annoncelocation.categoryannoncelocation' => function ($q){
                $q->select('id','name','slug','user_id');},
            'annoncelocation.city' => function ($q){
                $q->select('id','name','slug','user_id');},
            'annoncelocation.annoncetype' => function ($q){
                $q->select('id','name','slug');},
            'annoncelocation.user' => function ($q){
                $q->distinct()->get()->toArray();},
        ])->whereSlug($contactuserslocation->slug)->first();;

        return $contactuserslocation;
    }

    public static function newEmailToannoncelocationpageShow($request,$annoncelocation)
    {
        $fromFullnameUser = $request->get('full_name');
        $fromPhoneUser = $request->get('phone');
        $fromEmailUser = $request->get('email');
        $fromSubjectUser = $request->get('subject');
        $fromMessageUser = $request->get('message');


        $emailToUser = (new ContactuserlocationJob($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$annoncelocation));

        dispatch($emailToUser);
    }

    public static function adminsendMessageToUser($annoncelocation)
    {
        $emailToUser = (new AdminactionAnnoncelocationJob($annoncelocation));

        dispatch($emailToUser);
    }
}
