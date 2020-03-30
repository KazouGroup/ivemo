<?php
namespace App\Services;



use App\Http\Resources\AnnoncelocationResource;
use App\Model\annoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\city;
use App\Model\user;

class AnnoncelocationService
{

    public static function apiannoncelocationbycategorycitycount($categoryannoncelocation)
    {
        $annoncesbycities = city::with('user')
            ->withCount(['annoncelocations' => function ($q) use ($categoryannoncelocation){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])->orderBy('annoncelocations_count','desc')
            ->take(6)
            ->distinct()->get();

        return $annoncesbycities;
    }

    public static function apiannoncelocationcategorybycitycount($categoryannoncelocation,$city)
    {
        $annoncesbycities = categoryannoncelocation::with('user')
            ->withCount(['annoncelocations' => function ($q) use ($categoryannoncelocation,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);});
            }])->orderBy('annoncelocations_count','desc')
            ->take(6)->distinct()->get();

        return $annoncesbycities;
    }

    public static function apiannoncelocationbycategoryannoncelocation($annoncetype,$categoryannoncelocation)
    {
        $annoncesbycities = categoryannoncelocation::whereSlug($categoryannoncelocation->slug)
            ->where(['status' => 1])
            ->withCount([ 'annoncelocations' => function ($q) use ($annoncetype,$categoryannoncelocation){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncelocation','city','annoncetype')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                    ->whereHas('city', function ($q) {$q->where('status',1);});
            }])
            ->with([
                'annoncelocations' => function ($q) use ($annoncetype,$categoryannoncelocation){
                    $q->where(['status' => 1,'status_admin' => 1])
                        ->with('user','categoryannoncelocation','city','annoncetype')
                        ->whereIn('annoncetype_id',[$annoncetype->id])
                        ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
                        ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                        ->whereHas('city', function ($q) {$q->where('status',1);})
                        ->orderBy('created_at','DESC')->distinct()->paginate(30)->toArray();},
            ])->first();

        return $annoncesbycities;
    }

    public static function apiannoncelocationbycity($annoncetype,$categoryannoncelocation,$city)
    {
        $annoncesbycities = city::whereSlug($city->slug)
            ->where(['status' => 1])
            ->withCount(['annoncelocations' => function ($q) use ($annoncetype,$categoryannoncelocation,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncelocation','city','annoncetype')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);});
            }])
            ->with([
                'annoncelocations' => function ($q) use ($annoncetype,$categoryannoncelocation,$city){
                    $q->where(['status' => 1,'status_admin' => 1])->with('user','categoryannoncelocation','city','annoncetype')
                        ->whereIn('annoncetype_id',[$annoncetype->id])
                        ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
                        ->whereIn('city_id',[$city->id])
                        ->whereHas('city', function ($q) {$q->where('status',1);})
                        ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                        ->orderBy('created_at','DESC')
                        ->distinct()->paginate(30)->toArray();},
            ])->first();

        return $annoncesbycities;
    }

    public static function apiannoncelocationsbyannoncetypebycity($annoncetype,$city)
    {
        $annoncesbycities = city::whereSlug($city->slug)
            ->where(['status' => 1])
            ->withCount(['annoncelocations' => function ($q) use ($annoncetype,$city){
                $q->where(['status' => 1,'status_admin' => 1])
                    ->with('user','categoryannoncelocation','city','annoncetype')
                    ->whereIn('annoncetype_id',[$annoncetype->id])
                    ->whereIn('city_id',[$city->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);});
            }])
            ->with(['annoncelocations' => function ($q) use ($annoncetype,$city){
                    $q->where(['status' => 1,'status_admin' => 1])->with('user','categoryannoncelocation','city','annoncetype')
                        ->whereIn('annoncetype_id',[$annoncetype->id])
                        ->whereIn('city_id',[$city->id])
                        ->whereHas('city', function ($q) {$q->where('status',1);})
                        ->whereHas('categoryannoncelocation', function ($q) {$q->where('status',1);})
                        ->orderBy('created_at','DESC')
                        ->distinct()->paginate(30)->toArray();},
            ])->first();

        return $annoncesbycities;
    }

    public static function apiannonceslocationsbyuser($user)
    {
        $annonceslocations = HelpersService::helpersannonceteamcount($user)
            ->with(['annoncelocations' => function ($q) use ($user){
                $q->with('user','categoryannoncelocation','city','annoncetype')
                    ->whereIn('user_id',[$user->id])
                    ->whereHas('city', function ($q) {$q->where('status',1);})
                    ->orderBy('created_at','DESC')
                    ->distinct()->get()->toArray()
                ;},
            ])->first();

        return $annonceslocations;
    }

    public static function apiannoncelocationbycategoryannoncelocationslug($annoncetype,$categoryannoncelocation,$city,$annoncelocation)
    {
        $annoncelocation = new AnnoncelocationResource(annoncelocation::whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->where(['status' => 1,'status_admin' => 1])
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])
            ->whereSlug($annoncelocation)->firstOrFail());

        return $annoncelocation;
    }
}
