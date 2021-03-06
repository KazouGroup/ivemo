<?php
namespace App\Services;



use App\Http\Resources\AnnoncereservationResource;
use App\Jobs\NewannoncersJob;
use App\Models\abonne\subscribeannonce;
use App\Models\annoncereservation;
use App\Models\categoryannoncereservation;
use App\Models\city;
use Illuminate\Support\Facades\Cache;

class AnnoncereservationService
{


    public static function show($annoncetype,$annoncereservation)
    {
        $data = annoncereservation::whereSlugin($annoncereservation)
            ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce','uploadimages')
            ->withCount('uploadimages')
            ->first();

        return $data;
    }

    public static function apiannoncereservationbyannoncetype($annoncetype)
    {
       $annonces = AnnoncereservationResource::collection($annoncetype->annoncereservations()
           ->where(['status' => 1,'status_admin' => 1])
           ->whereIn('annoncetype_id',[$annoncetype->id])
           ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce')
           ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
           ->whereHas('city', function ($q) {$q->where('status',1);})
           ->orderBy('created_at','DESC')->distinct()->paginate(40));

        return $annonces;
    }

    public static function apiannoncereservationbycategoryannoncereservation($annoncetype,$categoryannoncereservation)
    {
        $annonces = AnnoncereservationResource::collection($categoryannoncereservation->annoncereservations()
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce')
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->paginate(40));

        return $annonces;
    }

    public static function apiannoncereservationbycity($annoncetype,$categoryannoncereservation,$city)
    {
        $annonces = AnnoncereservationResource::collection($city->annoncereservations()
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
            ->whereIn('city_id',[$city->id])
            ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce')            ->with(['user.profile' => function ($q){$q->distinct()->get();}])
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')->distinct()->paginate(40));

        return $annonces;
    }

    public static function apiannoncereservationbycategoryannoncereservationcount($annoncetype,$categoryannoncereservation)
    {
        $annonces = categoryannoncereservation::whereSlug($categoryannoncereservation->slug)
            ->withCount([
                'annoncereservations' => function ($q) use ($annoncetype,$categoryannoncereservation){
                    $q->where(['status' => 1,'status_admin' => 1])
                        ->whereIn('annoncetype_id',[$annoncetype->id])
                        ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
                        ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce','imagereservations')
                        ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                        ->whereHas('city', function ($q) {$q->where('status',1);});
                }])->first();

        return $annonces;
    }

    public static function apiannoncereservationinteresse($annoncetype,$user)
    {
        $annonces = AnnoncereservationResource::collection($user->annoncereservations()
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce')
            //->with(['user.profile' => function ($q){$q->distinct()->get();}])
            ->whereIn('user_id',[$user->id])
            ->orderByRaw('created_at','RAND()')
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->where(['status' => 1,'status_admin' => 1])
            ->take(20)->distinct()->get());

        return $annonces;
    }

    public static function apiannoncereservationbycategorycount($categoryannoncereservation)
    {
        $annoncereservations = city::with('user')
            ->withCount(['annoncereservations' => function ($q) use ($categoryannoncereservation){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])->orderBy('annoncereservations_count','desc')
            ->take(6)->distinct()->get();

        return $annoncereservations;
    }


    public static function apiannoncereservationcategorybycitycount($categoryannoncereservation,$city)
    {
        $annoncereservations = categoryannoncereservation::with('user')
            ->withCount(['annoncereservations' => function ($q) use ($categoryannoncereservation,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])->orderBy('annoncereservations_count','desc')
            ->take(6)->distinct()->get();

        return $annoncereservations;
    }

    public static function apiannoncereservationbycitycount($annoncetype,$categoryannoncereservation,$city)
    {
        $annoncereservations = city::whereSlug($city->slug)
            ->where(['status' => 1])
            ->withCount([
                'annoncereservations' => function ($q) use ($annoncetype,$categoryannoncereservation,$city){
                    $q->where(['status' => 1,'status_admin' => 1])
                        ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce','imagereservations')
                        ->whereIn('categoryannoncereservation_id',[$categoryannoncereservation->id])
                        ->whereIn('city_id',[$city->id])
                        ->whereIn('annoncetype_id',[$annoncetype->id])
                        ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                        ->whereHas('city', function ($q) {$q->where('status',1);})
                        ->orderBy('created_at','DESC')->where('status',1);},
            ])->first();

        return $annoncereservations;
    }


    public static function apiannoncereservationbyannoncetypebycity($annoncetype,$city)
    {
        $annonces = AnnoncereservationResource::collection($city->annoncereservations()
            ->where(['status' => 1,'status_admin' => 1])
            ->whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('city_id',[$city->id])
            ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce','imagereservations')
            ->with(['user.profile' => function ($q){$q->distinct()->get();}])
            ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
            ->whereHas('city', function ($q) {$q->where('status',1);})
            ->orderBy('created_at','DESC')
            ->distinct()->paginate(40));

        return $annonces;

    }

    public static function apiannoncereservationbyannoncetypebycitycount($annoncetype,$city)
    {
        $annoncereservations = city::whereSlug($city->slug)
            ->where(['status' => 1])
            ->withCount([
                'annoncereservations' => function ($q) use ($annoncetype,$city){
                    $q->where(['status' => 1,'status_admin' => 1])
                        ->with('user','categoryannoncereservation','city','annoncetype','periodeannonce','imagereservations')
                        ->whereIn('annoncetype_id',[$annoncetype->id])
                        ->whereIn('city_id',[$city->id])
                        ->whereHas('categoryannoncereservation', function ($q) {$q->where('status',1);})
                        ->whereHas('city', function ($q) {$q->where('status',1);})->where('status',1);},
            ])->first();

        return $annoncereservations;
    }

    public static function apiannoncesreservationsbyuser($user)
    {
        $annoncesreservations = HelpersService::helpersannonceteamcount($user)
            ->with(['annoncereservations' => function ($q) use ($user){
                $q->with('user','categoryannoncereservation','city','annoncetype','periodeannonce','imagereservations')
                    ->whereIn('user_id',[$user->id])
                    ->orderBy('created_at','DESC')
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->distinct()->get()->toArray()
                ;},
            ])->first();;

        return $annoncesreservations;
    }

    public static function sendMessageToUser($request,$annoncetype)
    {
        $fromUser = auth()->user();

        $emailsubscribannonce = subscribeannonce::with('user','member')
            ->whereIn('member_id',[$fromUser->id])
            ->distinct()->get();

        $emailuserJob = (new NewannoncersJob($emailsubscribannonce,$fromUser,$annoncetype));

        dispatch($emailuserJob);

    }

}
