<?php
namespace App\Services;



use App\Http\Resources\AnnoncelocationResource;
use App\Model\annoncelocation;
use App\Model\categoryannoncelocation;
use App\Model\city;

class AnnoncelocationService
{


    public static function apiannoncelocationbycategorycitycount($categoryannoncelocation)
    {
        $annoncesbycities = city::with('user')
            ->withCount(['annoncelocations' => function ($q) use ($categoryannoncelocation){
                $q->where('status',1)
                    ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id]);
            }])->orderBy('annoncelocations_count','desc')
            ->take(6)
            ->distinct()->get();

        return $annoncesbycities;
    }

    public static function apiannoncelocationcategorybycitycount($categoryannoncelocation,$city)
    {
        $annoncesbycities = categoryannoncelocation::with('user')
            ->withCount(['annoncelocations' => function ($q) use ($categoryannoncelocation,$city){
                $q->where('status',1)
                    ->whereIn('city_id',[$city->id]);
            }])->orderBy('annoncelocations_count','desc')
            ->take(6)->distinct()->get();

        return $annoncesbycities;
    }

    public static function apiannoncelocationbycity($annoncetype,$categoryannoncelocation,$city)
    {
        $annoncesbycities = city::whereSlug($city->slug)
            ->with([
                'annoncelocations' => function ($q) use ($annoncetype,$categoryannoncelocation,$city){
                    $q->where('status',1)
                        ->with('user','categoryannoncelocation','city','annoncetype')
                        ->whereIn('annoncetype_id',[$annoncetype->id])
                        ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
                        ->whereIn('city_id',[$city->id])
                        ->orderBy('created_at','DESC')
                        ->distinct()->paginate(30)->toArray();},
            ])->first();

        return $annoncesbycities;
    }

    public static function apiannoncelocationbycategoryannoncelocationslug($annoncetype,$categoryannoncelocation,$city,$date,$annoncelocation)
    {
        $annoncelocation = new AnnoncelocationResource(annoncelocation::whereIn('annoncetype_id',[$annoncetype->id])
            ->whereIn('city_id',[$city->id])
            ->whereIn('categoryannoncelocation_id',[$categoryannoncelocation->id])
            ->where('status',1)
            ->with(['user.profile' => function ($q){$q->distinct()->get();},])
            ->whereDate('created_at',$date)
            ->whereSlug($annoncelocation)->firstOrFail());

        return $annoncelocation;
    }
}