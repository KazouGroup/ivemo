<?php
namespace App\Services\Contactusers;



use App\Jobs\ContactuserJob;
use App\Model\contactuserslocation;
use App\Model\contactusersvente;
use App\Model\user;
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
