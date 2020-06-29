<?php
namespace App\Services\Contactusers;



use App\Jobs\ContactuserventeJob;
use App\Model\contactusersvente;
use App\Services\HelpersService;

class ContactusersventeService
{

    public static function methodName($user)
    {

    }


    public static function apipersonalmessagesannonces($user)
    {
        $contactusers = HelpersService::helperscontactuserscount($user)
            ->with(['contactusersventes' => function ($q) use ($user){
                $q->whereIn('user_id',[auth()->user()->id])
                    ->with('annoncevente','user')
                    ->orderBy('created_at','DESC')
                    ->with([
                        'annoncevente.categoryannoncevente' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncevente.city' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncevente.annoncetype' => function ($q){
                            $q->select('id','name','slug');},
                        'annoncevente.user' => function ($q){
                            $q->distinct()->get();}
                    ])->whereHas('annoncevente', function ($q) {
                        $q->whereIn('user_id',[auth()->user()->id])
                          ->where('status_admin',1);
                    })->distinct()->get()->toArray();},
            ])->first();


        return $contactusers;
    }

    public static function apipersonalmailsarchvementannoncesventes($user)
    {
        $contactusers = HelpersService::helperscontactuserscount($user)
            ->with(['contactusersventes' => function ($q) use ($user){
                $q->where(['status_archvement' => 1])
                    ->whereIn('user_id',[auth()->user()->id])
                    ->with('annoncevente','user')
                    ->orderBy('created_at','DESC')
                    ->with([
                        'annoncevente.categoryannoncevente' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncevente.city' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncevente.annoncetype' => function ($q){
                            $q->select('id','name','slug');},
                        'annoncevente.user' => function ($q){
                            $q->distinct()->get();}
                    ])->whereHas('annoncevente', function ($q) {
                        $q->whereIn('user_id',[auth()->user()->id])
                          ->where('status_admin',1);
                    })->distinct()->get()->toArray();},
            ])->first();


        return $contactusers;
    }

    public static function apipersonalmailsfavoriteannoncesventes($user)
    {
        $contactusers = HelpersService::helperscontactuserscount($user)
            ->with(['contactusersventes' => function ($q) use ($user){
                $q->where(['status_favorite' => 1])
                    ->whereIn('user_id',[auth()->user()->id])
                    ->with('annoncevente','user')
                    ->orderBy('created_at','DESC')
                    ->with([
                        'annoncevente.categoryannoncevente' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncevente.city' => function ($q){
                            $q->select('id','name','slug','user_id');},
                        'annoncevente.annoncetype' => function ($q){
                            $q->select('id','name','slug');},
                        'annoncevente.user' => function ($q){
                            $q->distinct()->get();}
                    ])->whereHas('annoncevente', function ($q) {
                        $q->whereIn('user_id',[auth()->user()->id])
                          ->where('status_admin',1);
                    })->distinct()->get()->toArray();},
            ])->first();


        return $contactusers;
    }

    public static function apipersonalmailsannoncesventesbyannonce($user)
    {
        $contactusers = HelpersService::helperscontactuserscount($user)
            ->with(['annonceventes' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id])
                    ->withCount(['contactusersventes' => function ($q) use ($user){
                        $q->whereIn('user_id',[$user->id])
                            ->with('annoncevente','user')
                            ->whereHas('annoncevente', function ($q) use ($user) {
                                $q->whereIn('user_id',[$user->id]);
                            });},
                    ])->with(['contactusersventes' => function ($q) use ($user){
                        $q->whereIn('user_id',[$user->id])
                            ->with('annoncevente','user')
                            ->whereHas('annoncevente', function ($q) use ($user) {
                                $q->whereIn('user_id',[$user->id]);
                            });},
                    ])->orderBy('created_at','DESC')
                    ->distinct()->get()->toArray();},
            ])->first();


        return $contactusers;
    }


    public static function apipersonalmessagesannonces_show($user,$contactusersvente)
    {
        $contactusersvente = contactusersvente::with('user','annoncevente')
            ->with([
            'annoncevente.categoryannoncevente' => function ($q){
                $q->select('id','name','slug');},
            'annoncevente.city' => function ($q){
                $q->select('id','name','slug');},
            'annoncevente.annoncetype' => function ($q){
                $q->select('id','name','slug');},
            'annoncevente.user' => function ($q){
                $q->distinct()->get()->toArray();},
        ])->whereSlug($contactusersvente->slug)->first();;

        return $contactusersvente;
    }

    public static function newEmailToannoncelocationpageShow($request,$annoncevente)
    {
        $fromFullnameUser = $request->get('full_name');
        $fromPhoneUser = $request->get('phone');
        $fromEmailUser = $request->get('email');
        $fromSubjectUser = $request->get('subject');
        $fromMessageUser = $request->get('message');


        $emailToUser = (new ContactuserventeJob($fromFullnameUser,$fromPhoneUser,$fromEmailUser,$fromSubjectUser,$fromMessageUser,$annoncevente));


        dispatch($emailToUser);
    }
}
