<?php
namespace App\Services;


use App\Http\Resources\BlogannoncereservationResource;
use App\Model\blogannoncereservation;
use App\Model\user;

class BlogannoncereservationService
{

    public static function show($blogannoncereservation)
    {
        $blogannoncereservation = new BlogannoncereservationResource(blogannoncereservation::whereSlugin($blogannoncereservation)->first());

        return $blogannoncereservation;
    }

    public static function apiblogannoncesreservationsbyuser($user)
    {
        $blogannoncereservations = user::whereSlug($user->slug)
            ->with(['blogannoncereservations' => function ($q) use ($user){
                $q->with('user','categoryannoncereservation')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()->toArray()
                ;},
            ])->withCount(['subscriberusers' => function ($q){
                $q->whereIn('user_id',[auth()->user()->id]);
            }])->withCount(['teamusers' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncelocations' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->withCount(['annoncereservations' => function ($q) use ($user){
                $q ->whereIn('user_id',[$user->id]);
            }])->withCount(['annonceventes' => function ($q) use ($user){
                $q ->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncelocations' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannoncereservations' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->withCount(['blogannonceventes' => function ($q) use ($user){
                $q->whereIn('user_id',[$user->id]);
            }])->first();

        return $blogannoncereservations;
    }



}
