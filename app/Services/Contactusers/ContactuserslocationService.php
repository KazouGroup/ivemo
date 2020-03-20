<?php
namespace App\Services\Contactusers;



use App\Jobs\ContactuserJob;
use App\Model\contactuserslocation;
use App\Model\user;
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
                    })->distinct()->get()->toArray();},
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
        $full_name = $request->get('full_name');
        $phone = $request->get('phone');
        $email = $request->get('email');
        $subject = $request->get('subject');
        $message = $request->get('message');
        $to = $annoncelocation->user->email;


        $from = ['address' => $request->get('email') , 'name' => $request->get('full_name')];

        $emailToUser = (new ContactuserJob($full_name,$phone,$email,$subject,$message,$to,$from));


        dispatch($emailToUser);
    }
}
