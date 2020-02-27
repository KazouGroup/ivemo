<?php
namespace App\Services;




use App\Http\Resources\AnnoncelocationResource;
use App\Model\annoncelocation;
use App\Model\categoryannoncevente;
use App\Model\city;
use App\Model\user;

class AnnonceventeService
{

    public static function apiannonceventebycategorycitycount($categoryannoncevente)
    {
        $annoncesbycities = city::with('user')
            ->withCount(['annonceventes' => function ($q) use ($categoryannoncevente){
                $q->where('status',1)
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id]);
            }])->orderBy('annonceventes_count','desc')
            ->take(6)
            ->distinct()->get();

        return $annoncesbycities;
    }

    public static function apiannonceventecategorybycitycount($categoryannoncevente,$city)
    {
        $annoncesbycities = categoryannoncevente::with('user')
            ->withCount(['annonceventes' => function ($q) use ($categoryannoncevente,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id]);
            }])->orderBy('annonceventes_count','desc')
            ->take(6)
            ->distinct()->get();

        return $annoncesbycities;
    }

    public static function apiannonceslocationsbyuser($user)
    {
        $annonceslocations = user::whereSlug($user->slug)
            ->with(['annoncelocations' => function ($q) use ($user){
                $q->with('user','categoryannoncelocation','city','annoncetype')
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
            }])->first();;

        return $annonceslocations;
    }

    public static function apiannoncelocationbycategoryannoncelocationslug($annoncetype,$categoryannoncelocation,$city,$date,$annoncelocation)
    {
        $annoncelocation = new AnnoncelocationResource(annoncelocation::whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])
            ->whereDate('created_at',$date)
            ->whereSlug($annoncelocation)->firstOrFail());

        return $annoncelocation;
    }

    public static function apiannoncesventesbyuser($user)
    {
        $annoncelocations = user::whereSlug($user->slug)
            ->with(['annonceventes' => function ($q) use ($user){
                $q->with('user','categoryannoncevente','city','annoncetype')
                    ->whereIn('user_id',[$user->id])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()->toArray()
                ;},
            ])
            ->withCount(['teamusers' => function ($q) use ($user){
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

        return $annoncelocations;
    }
}
