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
        $personnalreservations = HelpersService::helpersdatabyuseractive($user)
            ->with(['annoncereservations' => function ($q) use ($user){
                $q->with('user','categoryannoncereservation','city','annoncetype','imagereservations')
                    ->whereIn('annoncetype_id',[3])
                    ->whereIn('user_id',[$user->id])
                    ->where(['status' => 1,'status_admin' => 1])->distinct()->get()->toArray()
                ;},
            ])->first();

        return $personnalreservations;
    }

    public static function apiprofilblogannoncereservations($user)
    {
        $personnalblogannonces = HelpersService::helpersdatabyuseractive($user)
            ->with(['blogannoncereservations' => function ($q) use ($user){
                $q->with('user','categoryannoncereservation')
                    ->whereIn('user_id',[$user->id])
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return $personnalblogannonces;
    }

    public static function apiprofilblogannonceventes($user)
    {
        $personnalblogannonces = HelpersService::helpersdatabyuseractive($user)
            ->with(['blogannonceventes' => function ($q) use ($user){
                $q->with('user','categoryannoncevente')
                    ->whereIn('user_id',[$user->id])
                    ->where(['status' => 1,'status_admin' => 1])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return $personnalblogannonces;
    }


    public static function apiprofilblogannoncelocations($user)
    {
        $personnalblogannonces = HelpersService::helpersdatabyuseractive($user)
            ->with(['blogannoncelocations' => function ($q) use ($user){
                $q->with('user','categoryannoncelocation')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return $personnalblogannonces;
    }


    public static function apiprofilannoncelocations($user)
    {
        $personnalreservations = HelpersService::helpersdatabyuseractive($user)
            ->with(['annoncelocations' => function ($q) use ($user){
                $q->with('user','categoryannoncelocation','city','annoncetype')
                    ->whereIn('annoncetype_id',[1])
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])->distinct()->get()->toArray()
                ;},
            ])->first();

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
        $employments = HelpersService::helpersdatabyuseractive($user)
            ->with(['employments' => function ($q) use ($user){
                $q->with('user','city','categoryemployment','member')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('categoryemployment', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->where(['status' => 1,'status_admin' => 1])->distinct()->get()->toArray()
                ;},
            ])
            ->first();

        return $employments;
    }

}
