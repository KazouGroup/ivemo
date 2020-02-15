<?php


namespace App\Services;


use App\Http\Resources\FaqResource;
use App\Jobs\ConfirmreservationJob;
use App\Model\categoryfaq;
use App\Model\contactuser;
use App\Model\faq;
use App\Model\reservation;
use Illuminate\Support\Facades\Auth;

class ProfileService
{

    public static function apipersonalmessagesannonces_locations()
    {
        $contactusers =  contactuser::with('annoncelocation','user')
            ->whereIn('user_id',[auth()->user()->id])
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
            })->distinct()->get()->toArray();;

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

}
