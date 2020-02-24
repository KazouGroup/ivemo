<?php
namespace App\Services;



use App\Http\Resources\AnnoncelocationResource;
use App\Model\annoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\categoryannoncereservation;
use App\Model\city;

class AnnoncereservationService
{


    public static function apiannoncereservationbycategorycount($categoryannoncereservation)
    {
        $annoncereservations = city::with('user')
            ->withCount(['annoncereservations' => function ($q) use ($categoryannoncereservation){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id]);
            }])->orderBy('annoncereservations_count','desc')
            ->take(6)->distinct()->get();

        return $annoncereservations;
    }


    public static function apiannoncereservationcategorybycitycount($categoryannoncereservation,$city)
    {
        $annoncereservations = categoryannoncereservation::with('user')
            ->withCount(['annoncereservations' => function ($q) use ($categoryannoncereservation,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('city_id',[$city->id]);
            }])->orderBy('annoncereservations_count','desc')
            ->take(6)->distinct()->get();

        return $annoncereservations;
    }


    public static function apiannoncereservationbycity($annoncetype,$categoryannoncereservation,$city)
    {
        $annoncereservations = city::whereSlug($city->slug)
            ->with([
                'annoncereservations' => function ($q) use ($annoncetype,$categoryannoncereservation,$city){
                    $q->where(['status' => 1,'status_admin' => 1])
                        ->with('user','categoryannoncereservation','city','annoncetype','imagereservations')
                        ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
                        ->whereIn('annoncetype_id',[$annoncetype->id])
                        ->orderBy('created_at','DESC')->where('status',1)
                        ->distinct()->paginate(40)->toArray();},
            ])->first();

        return $annoncereservations;
    }

}
