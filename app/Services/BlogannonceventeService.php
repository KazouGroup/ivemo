<?php
namespace App\Services;


use App\Http\Resources\BlogannoncereservationResource;
use App\Model\blogannoncereservation;
use App\Model\categoryannoncevente;
use App\Model\user;

class BlogannonceventeService
{


    public static function apiannonceblogcategoryvente($categoryannoncevente)
    {
        $blogannoncereseventes = categoryannoncevente::whereSlug($categoryannoncevente->slug)
            ->with(['blogannonceventes' => function ($q) use ($categoryannoncevente){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncevente')
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->orderBy('created_at','DESC')->distinct()->paginate(40)->toArray();},
            ])->first();

        return $blogannoncereseventes;
    }

    public static function apiblogsannonceventespublique($user)
    {
        $blogannoncereseventes = user::whereSlug($user->slug)
            ->with(['blogannonceventes' => function ($q) use ($user){
                $q->with('user','categoryannoncevente')
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
            }])->withCount(['blogannonceventes' => function ($q){
                $q->where(['status' => 1,'status_admin' => 1]);
            }])
            ->first();

        return $blogannoncereseventes;
    }



}
