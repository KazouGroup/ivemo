<?php
namespace App\Services;




use App\Http\Resources\AnnoncelocationResource;
use App\Http\Resources\AnnonceventeResource;
use App\Model\annoncelocation;
use App\Model\annoncetype;
use App\Model\annoncevente;
use App\Model\categoryannoncevente;
use App\Model\city;

class AnnonceventeService
{

    public static function apiannonceventesbyannoncetypebyannoncevente(annoncetype $annoncetype,$annoncevente)
    {
        $data = new AnnonceventeResource(annoncevente::whereSlugin($annoncevente)->first());

        return $data;
    }


    public static function apiannonceventebycategoryannoncevente($annoncetype,$categoryannoncevente)
    {
        $annonceventes = categoryannoncevente::whereSlug($categoryannoncevente->slug)->where(['status' => 1])
            ->withCount(['annonceventes' => function ($q) use ($annoncetype,$categoryannoncevente){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncevente','city','annoncetype')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);});
            }])
            ->with([
                'annonceventes' => function ($q) use ($annoncetype,$categoryannoncevente){
                    $q->where(['status' => 1,'status_admin' => 1])
                        ->with('user','categoryannoncevente','city','annoncetype')
                        ->whereIn('annoncetype_id',[$annoncetype->id])
                        ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                        ->whereHas('city', function ($q) {$q->where('status',1);})
                        ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                        ->orderBy('created_at','DESC')->distinct()->paginate(40)->toArray();},
            ])->first();


        return $annonceventes;
    }

    public static function apiannonceventebycity($annoncetype,$categoryannoncevente,$city)
    {
        $annonceventes = city::whereSlug($city->slug)->where('status',1)
            ->withCount(['annonceventes' => function ($q) use ($annoncetype,$categoryannoncevente,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncevente','city','annoncetype')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);});
            }])
        ->with([
            'annonceventes' => function ($q) use ($annoncetype,$categoryannoncevente,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncevente','city','annoncetype')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->orderBy('created_at','DESC')->distinct()->paginate(40)->toArray();},
        ])->first();


        return $annonceventes;
    }

    public static function apiannonceventesbyannoncetypebycity($annoncetype,$city)
    {
        $annonceventes = city::whereSlug($city->slug)->where('status',1)
            ->withCount(['annonceventes' => function ($q) use ($annoncetype,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncevente','city','annoncetype')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);});
            }])
        ->with([
            'annonceventes' => function ($q) use ($annoncetype,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncevente','city','annoncetype')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->orderBy('created_at','DESC')->distinct()->paginate(40)->toArray();},
        ])->first();


        return $annonceventes;
    }

    public static function apiannonceventebycategorycount($categoryannoncevente)
    {
        $annoncesbycities = city::with('user')
            ->withCount(['annonceventes' => function ($q) use ($categoryannoncevente){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
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
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])->orderBy('annonceventes_count','desc')
            ->take(6)
            ->distinct()->get();

        return $annoncesbycities;
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
        $annoncelocations = HelpersService::helpersannonceteamcount($user)
            ->with(['annonceventes' => function ($q) use ($user){
                $q->with('user','categoryannoncevente','city','annoncetype')
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id])
                    ->withCount(['contactusersventes' => function ($q) use ($user){
                        $q->whereIn('user_id',[$user->id])
                            ->with('annoncevente','user')
                            ->whereHas('annoncevente', function ($q) use ($user) {
                                $q->whereIn('user_id',[$user->id]);
                            });},
                    ])
                    ->with(['contactusersventes' => function ($q) use ($user){
                        $q->whereIn('user_id',[$user->id])
                            ->with('annoncevente','user')
                            ->whereHas('annoncevente', function ($q) use ($user) {
                                $q->whereIn('user_id',[$user->id]);
                            })->distinct()->get()->toArray();},
                    ])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()->toArray()
                ;},
            ])->first();

        return $annoncelocations;
    }
}
