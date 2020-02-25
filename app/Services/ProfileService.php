<?php


namespace App\Services;


use App\Http\Resources\FaqResource;
use App\Jobs\ConfirmreservationJob;
use App\Model\categoryfaq;
use App\Model\contactuser;
use App\Model\faq;
use App\Model\reservation;
use App\Model\user;
use Illuminate\Support\Facades\Auth;

class ProfileService
{

    public static function apipersonalmessagesannonces_locations($user)
    {
        $contactusers = user::whereSlug($user->slug)
            ->with(['contactusers' => function ($q) use ($user){
                $q->whereIn('user_id',[auth()->user()->id])
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
                    ])->whereHas('annoncelocation', function ($q) {
                        $q->whereIn('user_id',[auth()->user()->id]);
                    })->distinct()->get()->toArray();},
            ])->first();

        return $contactusers;
    }


    public static function newEmailConfirmationreservation($reservation,$user)
    {

        $to = $reservation->user->email;

        $from = ['address' => $user->email , 'name' => $user->first_name];

        $emailToUser = (new ConfirmreservationJob($to,$from));

        dispatch($emailToUser);

    }


    public static function apipersonalmessagesannonces_reservations()
    {
        $contactusers =  contactuser::with('user','annoncereservation')
            ->whereIn('user_id',[auth()->user()->id])
            ->orderBy('created_at','DESC')
            ->with([
                'annoncereservation.categoryannoncereservation' => function ($q){
                    $q->select('id','name','slug','user_id');},
                'annoncereservation.city' => function ($q){
                    $q->select('id','name','slug','user_id');},
                'annoncereservation.annoncetype' => function ($q){
                    $q->select('id','name','slug');},
                'annoncereservation.user' => function ($q){
                    $q->distinct()->get();}
            ])->whereHas('annoncereservation', function ($q) {
                $q->whereIn('user_id',[auth()->user()->id]);})->distinct()->get()->toArray();

        return $contactusers;
    }

    public static function apipersonalmessagesannonces_locations_show($contactuser)
    {
        $contactusers = contactuser::with('user','annoncelocation')->with([
                'annoncelocation.categoryannoncelocation' => function ($q){
                    $q->select('id','name','slug','user_id');},
                'annoncelocation.city' => function ($q){
                    $q->select('id','name','slug','user_id');},
                'annoncelocation.annoncetype' => function ($q){
                    $q->select('id','name','slug');},
            ])->whereSlug($contactuser->slug)->first();;

        return $contactusers;
    }

   public static function apiannoncereservationbookeds()
    {
        $personnalreservations = reservation::with('user','annoncereservation')
            ->orderBy('created_at','DESC')
            ->with([
                'annoncereservation.categoryannoncereservation' => function ($q){
                    $q->select('id','name','slug','user_id');},
                'annoncereservation.city' => function ($q){
                    $q->select('id','name','slug','user_id');},
                'annoncereservation.annoncetype' => function ($q){
                    $q->select('id','name','slug');},
                'annoncereservation.user' => function ($q){
                    $q->distinct()->get();}
            ])
            ->whereHas('annoncereservation', function ($q) {
                $q->whereIn('user_id',[auth()->user()->id]);
            })->distinct()->get()->toArray();

        return $personnalreservations;
    }

    public static function apiprofilannoncereservations($user)
    {
        $personnalreservations = user::whereSlug($user->slug)
            ->with(['annoncereservations' => function ($q) use ($user){
                $q->with('user','categoryannoncereservation','city','annoncetype','imagereservations')
                    ->whereIn('annoncetype_id',[3])
                    ->whereIn('user_id',[$user->id])
                    ->where(['status' => 1,'status_admin' => 1])
                    ->distinct()->paginate(40)->toArray()
                ;},
            ])
            ->withCount(['annoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['annoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['annonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])
            ->first();

        return $personnalreservations;
    }

    public static function apiprofilannoncelocations($user)
    {
        $personnalreservations = user::whereSlug($user->slug)
            ->with(['annoncelocations' => function ($q) use ($user){
                $q->with('user','categoryannoncelocation','city','annoncetype')
                    ->whereIn('annoncetype_id',[1])
                    ->whereIn('user_id',[$user->id])
                    ->where(['status' => 1,'status_admin' => 1])
                    ->distinct()->paginate(40)->toArray()
                ;},
            ])
            ->withCount(['annoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['annoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['annonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->first();

        return $personnalreservations;
    }

    public static function apiprofilblogannoncelocations($user)
    {
        $personnalblogannonces = user::whereSlug($user->slug)
            ->with(['blogannoncelocations' => function ($q) use ($user){
                $q->with('user','categoryannoncelocation')
                    ->whereIn('user_id',[$user->id])
                    ->where(['status' => 1,'status_admin' => 1])
                    ->distinct()->get()->toArray()
                ;},
            ])
            ->withCount(['annoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['annoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['annonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])
            ->first();

        return $personnalblogannonces;
    }

    public static function apiprofilblogannoncereservations($user)
    {
        $personnalblogannonces = user::whereSlug($user->slug)
            ->with(['blogannoncereservations' => function ($q) use ($user){
                $q->with('user','categoryannoncereservation')
                    ->whereIn('user_id',[$user->id])
                    ->where(['status' => 1,'status_admin' => 1])
                    ->distinct()->get()->toArray()
                ;},
            ])
            ->withCount(['annoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['annoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['annonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannoncelocations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])->withCount(['blogannoncereservations' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])
            ->first();

        return $personnalblogannonces;
    }

}
