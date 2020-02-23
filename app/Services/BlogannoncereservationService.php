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
                    ->orderBy('created_at','DESC')
                    ->distinct()->paginate(40)->toArray()
                ;},
            ])
            ->withCount(['annoncelocations' => function ($q) use ($user){
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
