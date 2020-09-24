<?php
namespace App\Services;




use App\Http\Resources\AnnoncelocationResource;
use App\Http\Resources\AnnonceventeResource;
use App\Http\Resources\Profile\PrivateAnnonceventeResource;
use App\Jobs\NewannonceJob;
use App\Model\abonne\subscribeannonce;
use App\Model\annoncelocation;
use App\Model\annoncetype;
use App\Model\annoncevente;
use App\Model\categoryannoncevente;
use App\Model\city;

class AnnonceventeService
{

    public static function apiannonceventesbyannoncetypebyannoncevente(annoncetype $annoncetype,$annoncevente)
    {
        $data = annoncevente::whereSlugin($annoncevente)
            ->with('user','city','annoncetype','uploadimages','categoryannoncevente')
            ->first();

        return $data;
    }


    public static function apiannonceventebycategoryannoncevente($annoncetype,$categoryannoncevente)
    {
        $annonceventes = AnnonceventeResource::collection($categoryannoncevente->annonceventes()
            ->where(['status' => 1,'status_admin' => 1])
            ->with('user','city','annoncetype','uploadimages','categoryannoncevente')
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->paginate(40));

        return $annonceventes;
    }

    public static function apiannonceventebycategoryannonceventecount($annoncetype,$categoryannoncevente)
    {
        $annonceventes = categoryannoncevente::whereSlug($categoryannoncevente->slug)->where(['status' => 1])
            ->withCount(['annonceventes' => function ($q) use ($annoncetype,$categoryannoncevente){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','city','annoncetype','uploadimages','categoryannoncevente')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);});
            }])->first();


        return $annonceventes;
    }

    public static function apiannonceventebycity($annoncetype,$categoryannoncevente,$city)
    {
        $annonceventes = AnnonceventeResource::collection($city->annonceventes()
            ->where(['status' => 1,'status_admin' => 1])
            ->with('user','city','annoncetype','uploadimages','categoryannoncevente')
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
            ->whereIn('city_id',[$city->id])
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->paginate(40));


        return $annonceventes;
    }

    public static function apiannonceventebycitycount($annoncetype,$categoryannoncevente,$city)
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
            }])->first();


        return $annonceventes;
    }

    public static function apiannonceventesbyannoncetypebycitycount($annoncetype,$city)
    {
        $annonceventes = city::whereSlug($city->slug)->where('status',1)
            ->withCount(['annonceventes' => function ($q) use ($annoncetype,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncevente','city','annoncetype','uploadimages')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);});
            }])->first();


        return $annonceventes;
    }

    public static function apiannonceventesbyannoncetypebycity($annoncetype,$city)
    {
        $annonceventes = AnnonceventeResource::collection($city->annonceventes()
            ->where(['status' => 1,'status_admin' => 1])
            ->with('user','categoryannoncevente','city','annoncetype','uploadimages')
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('city_id',[$city->id])
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->paginate(40));

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


    public static function apiannoncesventesbyusercategoryannoncevente($user,$categoryannoncevente)
    {
        $blogannoncereseventes = HelpersService::helpersannonceteamcount($user)
            ->with(['annonceventes' => function ($q) use ($user,$categoryannoncevente){
                $q->with('user','categoryannoncevente','city','annoncetype','uploadimages')
                    ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereIn('user_id',[$user->id])
                    ->whereIn('categoryannoncevente_id',[$categoryannoncevente->id])
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()
                ;},
            ])->first();

        return $blogannoncereseventes;
    }

    public static function apiannoncesventesbyuser($user,$annoncetype)
    {
        $personnals = AnnonceventeResource::collection($user->annonceventes()
            ->with('user','categoryannoncevente','city','annoncetype','uploadimages')
            ->whereIn('user_id',[$user->id])
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('user_id',[$user->id])
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->whereHas('categoryannoncevente', function ($q) {$q->where('status',1);})
            ->distinct()->get());

        return $personnals;
    }


    public static function sendMessageToUser($request,$annoncetype)
    {
        $fromUser = auth()->user();

        $emailsubscribannonce = subscribeannonce::with('user','member')
            ->whereIn('member_id',[$fromUser->id])
            ->distinct()->get();

        $emailuserJob = (new NewannonceJob($emailsubscribannonce,$fromUser,$annoncetype));

        dispatch($emailuserJob);

    }
}
