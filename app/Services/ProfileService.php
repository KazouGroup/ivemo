<?php


namespace App\Services;


use App\Http\Resources\AnnoncelocationResource;
use App\Http\Resources\AnnoncereservationResource;
use App\Http\Resources\BlogannoncelocationResource;
use App\Http\Resources\BlogannoncereservationResource;
use App\Http\Resources\BlogannonceventeResource;
use App\Http\Resources\EmploymentResource;
use App\Http\Resources\FaqResource;
use App\Http\Resources\ForumResource;
use App\Jobs\ConfirmreservationJob;
use App\Model\blogannoncelocation;
use App\Model\blogannoncereservation;
use App\Model\blogannoncevente;
use App\Model\categoryfaq;
use App\Model\contactuser;
use App\Model\employment;
use App\Model\faq;
use App\Model\reservation;
use App\Model\user;
use Illuminate\Support\Facades\Auth;

class ProfileService
{


    public static function newEmailConfirmationreservation($reservation,$user)
    {

        $to = $reservation->user->email;

        $from = ['address' => $user->email , 'name' => $user->first_name];

        $emailToUser = (new ConfirmreservationJob($to,$from));

        dispatch($emailToUser);

    }


    public static function apiprofilepublique($user)
    {
        $user =  user::whereSlug($user->slug)
            ->withCount(['annoncelocations' => function ($q) use ($user){
                $q ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['annoncereservations' => function ($q) use ($user){
                $q ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['annonceventes' => function ($q) use ($user){
                $q ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['employments' => function ($q) use ($user){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['forums' => function ($q) use ($user){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryforum', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['blogannoncelocations' => function ($q) use ($user){
                $q ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['blogannoncereservations' => function ($q) use ($user){
                $q ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['blogannonceventes' => function ($q) use ($user){
                $q ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->first();

        return $user;
    }


    public static function apiprofileprivate($user)
    {
        $user =  user::whereSlug($user->slug)
            ->withCount(['subscriberusers' => function ($q){
                $q->whereIn('user_id',[auth()->user()->id]);
            }])
            ->withCount(['teamusers' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['annoncelocations' => function ($q) use ($user){
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['annoncereservations' => function ($q) use ($user){
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['annonceventes' => function ($q) use ($user){
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['employments' => function ($q) use ($user){
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['forums' => function ($q) use ($user){
                $q->where(['status_admin' => 1])
                    ->whereHas('categoryforum', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['blogannoncelocations' => function ($q) use ($user){
                $q ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['blogannoncereservations' => function ($q) use ($user){
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->withCount(['blogannonceventes' => function ($q) use ($user){
                $q ->where(['status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id]);
            }])
            ->first();

        return $user;
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
        $personnalreservations = AnnoncereservationResource::collection($user->annoncereservations()
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('annoncetype_id',[3])
            ->with('user','categoryannoncereservation','city','annoncetype','imagereservations')
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->distinct()->paginate(10));

        return $personnalreservations;
    }

    public static function apiprofilblogannoncereservations($user)
    {
        $personnalblogannonces = BlogannoncereservationResource::collection(blogannoncereservation::with('user','categoryannoncereservation')
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->distinct()->get());

        return $personnalblogannonces;
    }

    public static function apiprofilblogannonceventes($user)
    {
        $personnalblogannonces = BlogannonceventeResource::collection(blogannoncevente::with('user','categoryannoncevente')
            ->whereIn('user_id',[$user->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->distinct()->get());

        return $personnalblogannonces;
    }


    public static function apiprofilblogannoncelocations($user)
    {
        $personnalblogannonces = BlogannoncelocationResource::collection(blogannoncelocation::with('user','categoryannoncelocation')
            ->whereIn('user_id',[$user->id])
            ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
            ->where(['status' => 1,'status_admin' => 1])->distinct()->get());

        return $personnalblogannonces;
    }


    public static function apiprofilannoncelocations($user,$annoncetype)
    {
        $personnalreservations = AnnoncelocationResource::collection($user->annoncelocations()
                    ->with('user','categoryannoncelocation','city','annoncetype','uploadimages')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])->distinct()->get());

        return $personnalreservations;
    }

    public static function apiprofilannoncereserventes($user)
    {
        $personnalblogannonces = HelpersService::helpersdatabyuseractive($user)
            ->with(['annonceventes' => function ($q) use ($user){
                $q->with('user','categoryannoncevente','city','annoncetype')
                    ->whereIn('annoncetype_id',[2])
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return $personnalblogannonces;
    }

    public static function apiprofilemployments($user)
    {

        $employments = EmploymentResource::collection($user->employments()
            ->with('user','city','categoryemployment','member')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('user_id',[$user->id])
            ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            //->distinct()->paginate(40));
            ->orderByDesc('created_at')
            ->distinct()->get());

        return $employments;
    }

    public static function apiprofilforums($user)
    {

        $forums = ForumResource::collection($user->forums()
            ->with('user','categoryforum')
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('user_id',[$user->id])
            ->whereHas('categoryforum', function ($q) {$q->where('status',1);})
           // ->distinct()->paginate(40));
            ->distinct()->get());

        return $forums;
    }

}
